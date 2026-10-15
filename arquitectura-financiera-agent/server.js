import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// ─── CLAUDE ───────────────────────────────────────────────────────────────
const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";
const EFFORT = process.env.CLAUDE_EFFORT || "medium";
// La fallback por defecto del servidor solo existe en estos modelos.
const FALLBACK = /^claude-(opus-5|sonnet-5-5|fable-5)/.test(MODEL);

let client;
function cliente() {
  client ??= new Anthropic();
  return client;
}

// ─── PERSISTENCIA JSON ────────────────────────────────────────────────────
const DB_FILE = join(__dirname, "datos.json");

function cargarDB() {
  if (!existsSync(DB_FILE)) return { posts: [], comentarios: [] };
  try { return JSON.parse(readFileSync(DB_FILE, "utf8")); }
  catch { return { posts: [], comentarios: [] }; }
}

function guardarDB(data) {
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ─── INSTAGRAM GRAPH API ──────────────────────────────────────────────────
const IG_TOKEN = process.env.IG_ACCESS_TOKEN;
const IG_USER_ID = process.env.IG_USER_ID;

async function igGet(path, params = {}) {
  const url = new URL(`https://graph.instagram.com/v19.0${path}`);
  url.searchParams.set("access_token", IG_TOKEN);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url.toString());
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

// ─── CONTEXTO DE MARCA ────────────────────────────────────────────────────
function leerRepo(rel) {
  const p = join(REPO, rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

const INSTRUCCIONES = `Eres el asistente de contenido de Arquitectura Financiera, la marca personal de Diego. Escribes en español de España y con la voz de Diego.

El perfil de marca de abajo es la fuente única de verdad: identidad, audiencia, voz, palabras prohibidas y límites legales. Fíjate sobre todo en "We sound ___, never ___", "Words we ban", "Guardrails" y en los posts de referencia. Si una petición choca con esos límites (decir qué comprar, prometer rentabilidad, recomendar productos cripto), no la cumplas y explica en una frase por qué.

Formatos por defecto, salvo que te pidan otra cosa:
- Carrusel: 5 slides. Portada con gancho, problema o mito, explicación con pasos, ejemplo con euros reales, cierre con "guárdalo" y una pregunta.
- Reel: 30-40 segundos hablando a cámara, por tramos de tiempo, con el texto en pantalla de cada tramo.
- Caption: gancho en la primera línea, frases cortas, una idea por línea, pregunta al final y como mucho 5 hashtags.

No inventes datos personales de Diego más allá de los del perfil (sus números van siempre en porcentajes, nunca en euros). Si hace falta un dato que no tienes, deja un hueco entre corchetes, por ejemplo [tu cantidad].`;

function sistema() {
  const perfil = leerRepo("brand-profile.md");
  return [
    {
      type: "text",
      text: `${INSTRUCCIONES}\n\n<perfil_de_marca>\n${perfil}\n</perfil_de_marca>`,
      cache_control: { type: "ephemeral" },
    },
  ];
}

function parametros(content, maxTokens, effort) {
  return {
    model: MODEL,
    max_tokens: maxTokens,
    system: sistema(),
    output_config: { effort },
    ...(FALLBACK && { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" }),
    messages: [{ role: "user", content }],
  };
}

function describirError(e) {
  if (e instanceof Anthropic.AuthenticationError) {
    return "La clave de Anthropic no es válida. Revisa ANTHROPIC_API_KEY en el archivo .env.";
  }
  if (e instanceof Anthropic.RateLimitError) {
    return "Demasiadas peticiones seguidas. Espera un minuto y vuelve a intentarlo.";
  }
  if (e instanceof Anthropic.APIError && e.status) {
    return `Error de la API de Anthropic (${e.status}): ${e.message}`;
  }
  return `No se pudo conectar con Claude: ${e.message}. ¿Está la clave ANTHROPIC_API_KEY en el archivo .env?`;
}

function enviar(res, datos) {
  res.write(`data: ${JSON.stringify(datos)}\n\n`);
}

async function streamClaude(res, content, { maxTokens = 16000, effort = EFFORT } = {}) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  try {
    const stream = cliente().beta.messages.stream(parametros(content, maxTokens, effort));
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        enviar(res, { text: event.delta.text });
      }
    }
    const final = await stream.finalMessage();
    if (final.stop_reason === "refusal") {
      enviar(res, { error: "Claude ha rechazado esta petición. Reformúlala e inténtalo de nuevo." });
    } else if (final.stop_reason === "max_tokens") {
      enviar(res, { text: "\n\n[La respuesta se ha cortado por longitud]" });
    }
    enviar(res, { done: true });
  } catch (error) {
    console.error("Error de Claude:", error);
    enviar(res, { error: describirError(error) });
  }
  res.end();
}

async function pedirTexto(content, { maxTokens = 4000, effort = EFFORT } = {}) {
  const final = await cliente().beta.messages.create(parametros(content, maxTokens, effort));
  if (final.stop_reason === "refusal") throw new Error("Claude ha rechazado esta petición.");
  return final.content.find((b) => b.type === "text")?.text ?? "";
}

// ─── ENDPOINT: GENERADOR DE POST ─────────────────────────────────────────
app.post("/api/generar-post", (req, res) => {
  const { tema, formato, bloque, nivel } = req.body;
  if (!tema) return res.status(400).json({ error: "El tema es obligatorio" });

  streamClaude(res, `Genera el contenido completo de un post de Instagram.

TEMA: ${tema}
FORMATO: ${formato || "Carrusel"}
BLOQUE TEMÁTICO: ${bloque || "Cimientos"}
NIVEL: ${nivel || "Base"}

Devuelve el resultado en este formato exacto, sin markdown extra:

---SLIDES---
[Para carrusel, numera cada slide así]
SLIDE 1 - [etiqueta breve]
Título: [título]
Subtexto: [1-2 líneas de apoyo]

[continúa hasta la última slide, que siempre es el cierre]

[Para reel: el guion completo por tramos de tiempo]

---CAPTION---
[Caption completa lista para copiar en Instagram]

---HOOK---
[La frase de la primera slide o de los primeros 3 segundos del reel]`);
});

// ─── ENDPOINT: GENERADOR DE CAPTION ──────────────────────────────────────
app.post("/api/generar-caption", (req, res) => {
  const { tema, formato, tono } = req.body;
  if (!tema) return res.status(400).json({ error: "El tema es obligatorio" });

  streamClaude(res, `Escribe SOLO la caption de Instagram (sin slides) para este tema:

TEMA: ${tema}
TONO: ${tono || "educativo y directo"}
FORMATO DEL POST: ${formato || "Carrusel"}

Que empiece con un gancho (nunca "En este post..."), desarrolle el tema en 150-250 palabras, cierre con una pregunta o llamada a la acción y termine con un máximo de 5 hashtags.

Devuelve solo la caption, lista para copiar.`);
});

// ─── ENDPOINT: RESPONDER COMENTARIOS ─────────────────────────────────────
app.post("/api/responder-comentario", (req, res) => {
  const { comentario, contextoPost } = req.body;
  if (!comentario) return res.status(400).json({ error: "Falta el comentario" });

  streamClaude(res, `Alguien ha comentado en uno de mis posts de Instagram. Escríbeme una respuesta.

POST: ${contextoPost || "post educativo sobre finanzas personales"}
COMENTARIO: "${comentario}"

Responde como Diego: cercano y genuino, entre 1 y 4 líneas, aportando algo si puedes (un dato, una aclaración). Si es una pregunta, respóndela o dile que será tema de un próximo post. Como mucho 1-2 emojis. Si tiene sentido, invita a seguir la conversación. Si el comentario pide qué comprar o en qué invertir, no lo recomiendes: explica el concepto y por qué no das recomendaciones personalizadas.

Devuelve solo la respuesta, lista para copiar.`, { effort: "low" });
});

// ─── ENDPOINT: IDEAS DE CONTENIDO ────────────────────────────────────────
app.post("/api/ideas-contenido", (req, res) => {
  const { bloque, semana, postsPublicados } = req.body;

  streamClaude(res, `Propón 5 ideas de posts de Instagram para la semana ${semana || "próxima"}.

BLOQUE ACTUAL: ${bloque || "Ahorro Real"}
YA PUBLICADO O PROGRAMADO: ${postsPublicados || "Bloque 01 completo (presentación, por qué nadie te enseñó, qué son las finanzas personales, ingresos vs gastos, regla 50/30/20, gastos hormiga) y Bloque 02 (fondo de emergencia, págate a ti primero, cuentas remuneradas, dinero muerto, plan de ahorro)"}

Para cada idea: título, formato (carrusel o reel), gancho de apertura, ángulo diferencial y para qué segmento del perfil está pensada. No repitas temas ya publicados. Numera las 5 ideas y varía los formatos.`);
});

// ─── ENDPOINT: HASHTAGS ──────────────────────────────────────────────────
app.post("/api/hashtags", async (req, res) => {
  const { tema, formato } = req.body;
  if (!tema) return res.status(400).json({ error: "El tema es obligatorio" });

  try {
    const hashtags = await pedirTexto(`Elige los hashtags para este post.

TEMA: ${tema}
FORMATO: ${formato || "Carrusel"}

Devuelve exactamente 5 hashtags: 1-2 del tema concreto, #arquitecturafinanciera y 2 generales del nicho. Solo los hashtags separados por espacios, listos para copiar.`, { effort: "low" });
    res.json({ hashtags: hashtags.trim() });
  } catch (error) {
    console.error("Error en hashtags:", error);
    res.status(500).json({ error: describirError(error) });
  }
});

// ─── ENDPOINT: ANÁLISIS DE POST ───────────────────────────────────────────
app.post("/api/analizar-post", (req, res) => {
  const { contenido } = req.body;
  if (!contenido) return res.status(400).json({ error: "Falta el borrador" });

  streamClaude(res, `Analiza este borrador de post de Instagram y dame feedback concreto:

BORRADOR:
${contenido}

Puntúa del 1 al 10:
1. GANCHO: ¿para el scroll? ¿Por qué sí o no?
2. CLARIDAD: ¿lo entiende alguien sin conocimientos?
3. VALOR: ¿aprende algo el lector? ¿Es accionable?
4. VOZ: ¿suena a Diego según el perfil? Señala cualquier palabra prohibida.
5. LÍMITES: ¿respeta los guardrails legales del perfil?
6. CIERRE: ¿tiene una llamada a la acción clara?

Para cada punto, la puntuación y una mejora concreta. Al final, reescribe el gancho si lo mejorarías.`);
});

// ─── ENDPOINT: NEWSLETTER ────────────────────────────────────────────────
app.post("/api/generar-newsletter", (req, res) => {
  const { tema, numero, postsRelacionados } = req.body;
  if (!tema) return res.status(400).json({ error: "El tema es obligatorio" });

  streamClaude(res, `Escribe el borrador completo de la newsletter #${numero || "1"} de Arquitectura Financiera (va en Substack, cada dos semanas).

TEMA PRINCIPAL: ${tema}
POSTS DE INSTAGRAM RELACIONADOS: ${postsRelacionados || "sin especificar"}

Estructura:

ASUNTO: [que invite a abrir]
PREVIEW: [máximo 50 caracteres]

---

APERTURA PERSONAL (3-4 líneas): algo de la semana de Diego. Si no sabes qué le ha pasado, deja [qué te ha pasado esta semana].

EL CONCEPTO: el tema en 200-300 palabras, más a fondo que en Instagram.

UN NÚMERO QUE IMPORTA: un dato con contexto español. Si es una cifra que cambia (TAE, tramos fiscales), márcala con [verificar].

UNA HERRAMIENTA: solo algo que Diego use de verdad; si no lo sabes, deja [herramienta que uses].

LA PREGUNTA: una pregunta para que respondan al correo.

DE INSTAGRAM: resumen de los posts relacionados con [enlace].

CIERRE: 3-4 líneas cercanas, firmado por Diego.`);
});

// ─── ENDPOINT: PACK DE LA SEMANA ─────────────────────────────────────────
function masReciente(dir, prefijo) {
  const d = join(REPO, dir);
  if (!existsSync(d)) return null;
  const archivos = readdirSync(d)
    .filter((n) => n.startsWith(prefijo) && n.endsWith(".md"))
    .map((n) => ({ n, t: statSync(join(d, n)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  return archivos.length ? { nombre: archivos[0].n, texto: readFileSync(join(d, archivos[0].n), "utf8") } : null;
}

function seccion(texto, inicio, finales) {
  const i = texto.indexOf(inicio);
  if (i === -1) return "";
  let fin = texto.length;
  for (const f of finales) {
    const j = texto.indexOf(f, i + inicio.length);
    if (j !== -1 && j < fin) fin = j;
  }
  return texto.slice(i, fin).trim();
}

app.post("/api/pack-semana", (req, res) => {
  const semana = parseInt(req.body.semana, 10);
  if (!semana) return res.status(400).json({ error: "Indica el número de semana" });

  const calendario = masReciente("wiki/contenido", "calendario-");
  if (!calendario) return res.status(404).json({ error: "No hay ningún calendario en wiki/contenido" });

  const fila = calendario.texto.split("\n").find((l) => l.startsWith(`| ${semana} |`));
  if (!fila) {
    return res.status(404).json({ error: `La semana ${semana} no está en ${calendario.nombre}` });
  }

  const contenido = [];
  let caption = "";
  let archivos = [];
  const post = fila.match(/Post (\d{2})/)?.[1];
  if (post) {
    caption = seccion(calendario.texto, `### Post ${post}`, ["\n### ", "\n## "]);
    const base = join(REPO, "posts-instagram");
    const carpeta = existsSync(base) && readdirSync(base).find((n) => n.startsWith(`post-${post}-`));
    if (carpeta) {
      archivos = readdirSync(join(base, carpeta)).filter((n) => /\.(jpe?g|png)$/i.test(n)).sort();
      for (const a of archivos) {
        contenido.push({ type: "text", text: `Slide: posts-instagram/${carpeta}/${a}` });
        contenido.push({
          type: "image",
          source: {
            type: "base64",
            media_type: /\.png$/i.test(a) ? "image/png" : "image/jpeg",
            data: readFileSync(join(base, carpeta, a)).toString("base64"),
          },
        });
      }
      archivos = archivos.map((a) => `posts-instagram/${carpeta}/${a}`);
    }
  }

  const reelNum = fila.match(/Reel (\d+)/)?.[1];
  const reels = reelNum ? masReciente("wiki/contenido", "serie-reels-") : null;
  const reel = reels ? seccion(reels.texto, `## Reel ${reelNum} `, ["\n---", "\n## "]) : "";

  contenido.push({
    type: "text",
    text: `Prepara el pack de publicación de la semana ${semana} para cargarlo en Meta Business Suite.

Fila del calendario (${calendario.nombre}):
${fila}

${caption ? `Caption previsto para el carrusel:\n${caption}` : "No hay caption de carrusel en el calendario para esta semana."}

${archivos.length ? `Las imágenes adjuntas son las slides del carrusel, en este orden: ${archivos.join(", ")}.` : "No se han encontrado imágenes del carrusel."}

${reel ? `Guion del reel:\n${reel}` : "No hay guion de reel para esta semana."}

Devuelve, en markdown:

## Carrusel — [día y hora]
1. Archivos a subir, en orden.
2. Texto alternativo de cada slide: una línea por slide que describa lo que pone la imagen, pensada para lectores de pantalla.
3. Caption final: copia la del calendario tal cual. No la reescribas.
4. Música: ambiente y términos para buscar en la biblioteca de Instagram, sin nombrar canciones concretas.
5. Historia de apoyo: texto y sticker (encuesta o pregunta).

## Reel — [día y hora]
Checklist de grabación, texto en pantalla de cada tramo, caption (copiada del guion) y propuesta de portada.

## Antes de publicar
Pendientes y avisos: datos por completar o caducados ([X], ⚠️), más de 5 hashtags, o cualquier cosa de las imágenes que no cuadre con el caption. Si todo está bien, dilo.`,
  });

  streamClaude(res, contenido);
});

// ─── INSTAGRAM: PERFIL ───────────────────────────────────────────────────
app.get("/api/ig/perfil", async (req, res) => {
  if (!IG_TOKEN || !IG_USER_ID) return res.json({ conectado: false });
  try {
    const data = await igGet(`/${IG_USER_ID}`, {
      fields: "id,username,name,biography,followers_count,follows_count,media_count,profile_picture_url,website",
    });
    res.json({ conectado: true, ...data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── INSTAGRAM: ÚLTIMOS POSTS ────────────────────────────────────────────
app.get("/api/ig/media", async (req, res) => {
  if (!IG_TOKEN || !IG_USER_ID) return res.json({ conectado: false, data: [] });
  try {
    const data = await igGet(`/${IG_USER_ID}/media`, {
      fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count",
      limit: 12,
    });
    res.json({ conectado: true, ...data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── INSTAGRAM: COMENTARIOS DE UN POST ───────────────────────────────────
app.get("/api/ig/comentarios/:mediaId", async (req, res) => {
  if (!IG_TOKEN) return res.json({ conectado: false, data: [] });
  try {
    const data = await igGet(`/${req.params.mediaId}/comments`, {
      fields: "id,text,timestamp,username",
      limit: 50,
    });
    res.json({ conectado: true, ...data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── INSTAGRAM: ENVIAR RESPUESTA ─────────────────────────────────────────
app.post("/api/ig/responder", async (req, res) => {
  const { commentId, mensaje } = req.body;
  if (!IG_TOKEN) return res.status(400).json({ error: "Instagram no configurado" });
  if (!commentId || !mensaje) return res.status(400).json({ error: "Faltan datos" });
  try {
    const url = `https://graph.instagram.com/v19.0/${commentId}/replies`;
    const response = await fetch(url, {
      method: "POST",
      body: new URLSearchParams({ message: mensaje, access_token: IG_TOKEN }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const db = cargarDB();
    db.comentarios.push({ ig_comment_id: commentId, respuesta: mensaje, enviado: true, fecha: new Date().toISOString() });
    guardarDB(db);

    res.json({ ok: true, id: data.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── HISTORIAL: GUARDAR ───────────────────────────────────────────────────
app.post("/api/historial/guardar", (req, res) => {
  const { tema, formato, contenido } = req.body;
  if (!tema || !contenido) return res.status(400).json({ error: "Faltan datos" });
  const db = cargarDB();
  db.posts.unshift({
    id: Date.now(),
    tema,
    formato: formato || "Post",
    preview: contenido.slice(0, 200),
    contenido,
    fecha: new Date().toISOString(),
  });
  db.posts = db.posts.slice(0, 50);
  guardarDB(db);
  res.json({ ok: true });
});

// ─── HISTORIAL: LISTAR ────────────────────────────────────────────────────
app.get("/api/historial", (req, res) => {
  const db = cargarDB();
  res.json(db.posts || []);
});

// ─── SERVE FRONTEND ───────────────────────────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n🏗️  Arquitectura Financiera — Agente IA`);
  console.log(`✅  Servidor activo en http://localhost:${PORT}`);
  console.log(`🤖  Modelo: ${MODEL} (esfuerzo ${EFFORT})`);
  console.log(`📱  Abre el navegador en esa dirección\n`);
});
