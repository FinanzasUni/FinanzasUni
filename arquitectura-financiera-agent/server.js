import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

// ─── SYSTEM PROMPT BASE ───────────────────────────────────────────────────
const SYSTEM_BASE = `Eres el asistente de contenido de "Arquitectura Financiera", una marca personal de educación financiera para jóvenes españoles.

SOBRE LA MARCA:
- Nombre: Arquitectura Financiera
- Handle: @arquitecturafinanciera
- Creador: Diego, estudiante universitario e inversor desde los 18
- Audiencia: jóvenes españoles de 18-35 años
- Tono: directo, honesto, sin jerga innecesaria, cercano, en español de España
- Pilares: finanzas personales, inversión indexada, cripto sin hype, patrimonio desde cero
- SIEMPRE contexto español: IRPF, Hacienda, brokers españoles (DEGIRO, MyInvestor, Bit2Me), euros

REGLAS DE ESTILO:
- Nunca dar consejos de inversión directos ("deberías comprar X")
- Siempre decir "yo hago esto" o "esto es lo que existe"
- Sin anglicismos innecesarios cuando existe término en español
- Números reales y ejemplos concretos
- Honestidad sobre riesgos
- Lenguaje de igual a igual, no de gurú
- Siempre incluir un disclaimer cuando sea necesario: "Esto no es asesoramiento financiero"

FORMATOS:
- Carrusel Instagram: 5-8 slides, cada slide con título + subtexto corto
- Reel: guión de 30-60 segundos, párrafos muy cortos
- Caption: entre 150-300 palabras, emojis moderados, CTA al final, hashtags al final
- Hashtags: siempre incluir #arquitecturafinanciera + nicho + específicos`;

// ─── ENDPOINT: GENERADOR DE POST ─────────────────────────────────────────
app.post("/api/generar-post", async (req, res) => {
  const { tema, formato, bloque, nivel } = req.body;

  if (!tema) return res.status(400).json({ error: "El tema es obligatorio" });

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: SYSTEM_BASE,
      messages: [
        {
          role: "user",
          content: `Genera el contenido completo de un post de Instagram para Arquitectura Financiera.

TEMA: ${tema}
FORMATO: ${formato || "Carrusel"}
BLOQUE TEMÁTICO: ${bloque || "Cimientos"}
NIVEL: ${nivel || "Base"}

Devuelve el resultado en este formato EXACTO (no uses markdown extra, solo el formato indicado):

---SLIDES---
[Para carrusel: numera cada slide así]
SLIDE 1 - [etiqueta breve]
Título: [título impactante]
Subtexto: [1-2 líneas de apoyo]

SLIDE 2 - [etiqueta]
Título: [...]
Subtexto: [...]

[continúa hasta 6-7 slides, el último siempre es el CTA]

[Para Reel: escribe el guión completo dividido en bloques de 5-10 segundos]

---CAPTION---
[Caption completa lista para copiar en Instagram, con emojis, saltos de línea y hashtags al final]

---HOOK---
[El hook visual para la primera slide o los primeros 3 segundos del Reel — la frase que hace parar el scroll]`,
        },
      ],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error generando post:", error);
    res.status(500).json({ error: "Error al generar el contenido" });
  }
});

// ─── ENDPOINT: GENERADOR DE CAPTION ──────────────────────────────────────
app.post("/api/generar-caption", async (req, res) => {
  const { tema, formato, tono } = req.body;

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 800,
      system: SYSTEM_BASE,
      messages: [
        {
          role: "user",
          content: `Genera SOLO la caption de Instagram (sin slides) para este tema:

TEMA: ${tema}
TONO: ${tono || "educativo y directo"}
FORMATO DEL POST: ${formato || "Carrusel"}

La caption debe:
1. Empezar con una frase gancho potente (no empiece por "En este post...")
2. Desarrollar el tema en 150-250 palabras
3. Incluir una pregunta o CTA al final
4. Terminar con 8-10 hashtags relevantes

Devuelve SOLO la caption, lista para copiar y pegar.`,
        },
      ],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Error al generar la caption" });
  }
});

// ─── ENDPOINT: RESPONDER COMENTARIOS ─────────────────────────────────────
app.post("/api/responder-comentario", async (req, res) => {
  const { comentario, contextoPost } = req.body;

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: SYSTEM_BASE,
      messages: [
        {
          role: "user",
          content: `Alguien ha comentado en uno de mis posts de Instagram. Escríbeme una respuesta.

POST: ${contextoPost || "post educativo sobre finanzas personales"}
COMENTARIO: "${comentario}"

Responde como Diego, creador de Arquitectura Financiera:
- Tono cercano y genuino, no corporativo
- Entre 1-4 líneas
- Añade valor si puedes (un dato extra, una aclaración)
- Si es una pregunta, respóndela directamente o dile que va a ser tema de un próximo post
- Sin emojis excesivos (máximo 1-2)
- Termina invitando a seguir la conversación cuando tenga sentido

Devuelve SOLO la respuesta, lista para copiar.`,
        },
      ],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Error al generar la respuesta" });
  }
});

// ─── ENDPOINT: IDEAS DE CONTENIDO ────────────────────────────────────────
app.post("/api/ideas-contenido", async (req, res) => {
  const { bloque, semana, postsPublicados } = req.body;

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_BASE,
      messages: [
        {
          role: "user",
          content: `Genera 5 ideas de posts de Instagram para la semana ${semana || "próxima"} de Arquitectura Financiera.

BLOQUE ACTUAL: ${bloque || "Cimientos — finanzas personales básicas"}
POSTS YA PUBLICADOS: ${postsPublicados || "Post Cero, Por qué nadie te enseñó, Qué son las finanzas personales, Ingresos vs Gastos, Regla 50/30/20"}

Para cada idea incluye:
- TÍTULO del post
- FORMATO sugerido (Carrusel / Reel / Post único)
- HOOK de apertura (la primera frase que para el scroll)
- ÁNGULO diferencial (por qué es interesante o diferente)
- MEJOR DÍA y HORA para publicar

Numera las 5 ideas claramente. Varía los formatos.`,
        },
      ],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Error al generar ideas" });
  }
});

// ─── ENDPOINT: HASHTAGS OPTIMIZADOS ──────────────────────────────────────
app.post("/api/hashtags", async (req, res) => {
  const { tema, formato } = req.body;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: SYSTEM_BASE,
      messages: [
        {
          role: "user",
          content: `Genera el set óptimo de hashtags para este post de Arquitectura Financiera.

TEMA: ${tema}
FORMATO: ${formato || "Carrusel"}

Devuelve exactamente 10 hashtags organizados en 3 grupos:

MARCA (2): siempre fijos
NICHO MEDIO (4-5): específicos del tema, 100K-2M posts
ESPECÍFICOS (3-4): muy concretos al contenido

Formato de respuesta: solo los hashtags separados por espacios, listos para copiar.`,
        },
      ],
    });

    const hashtags = message.content[0].text;
    res.json({ hashtags });
  } catch (error) {
    res.status(500).json({ error: "Error al generar hashtags" });
  }
});

// ─── ENDPOINT: ANÁLISIS DE POST ───────────────────────────────────────────
app.post("/api/analizar-post", async (req, res) => {
  const { contenido } = req.body;

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 800,
      system: SYSTEM_BASE,
      messages: [
        {
          role: "user",
          content: `Analiza este borrador de post de Instagram para Arquitectura Financiera y dame feedback concreto:

BORRADOR:
${contenido}

Analiza y puntúa del 1-10:
1. HOOK (primera frase): ¿Para el scroll? ¿Por qué sí o no?
2. CLARIDAD: ¿Es fácil de entender para alguien sin conocimientos?
3. VALOR: ¿Aprende algo el lector? ¿Es accionable?
4. TONO: ¿Suena a Diego / Arquitectura Financiera?
5. CTA: ¿Tiene llamada a la acción clara?

Para cada punto: puntuación + una frase de mejora concreta.
Al final: reescribe el hook si lo mejorarías.`,
        },
      ],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Error al analizar el post" });
  }
});

// ─── ENDPOINT: NEWSLETTER ────────────────────────────────────────────────
app.post("/api/generar-newsletter", async (req, res) => {
  const { tema, numero, postsRelacionados } = req.body;

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: SYSTEM_BASE,
      messages: [
        {
          role: "user",
          content: `Genera el borrador completo de la newsletter #${numero || "1"} de Arquitectura Financiera.

TEMA PRINCIPAL: ${tema}
POSTS RELACIONADOS ESTA SEMANA: ${postsRelacionados || "sin especificar"}

Estructura exacta a seguir:

ASUNTO: [línea de asunto del email — que genere apertura]
PREVIEW: [texto de previsualización — 50 caracteres máx]

---

APERTURA PERSONAL (3-4 líneas):
[Algo personal de la semana de Diego — qué ha aprendido, vivido o pensado]

EL CONCEPTO DE LA SEMANA:
[Desarrollo del tema en 200-300 palabras. Más profundo que el post de Instagram]

UN NÚMERO QUE IMPORTA:
[Un dato financiero con contexto español]

LA HERRAMIENTA DE LA SEMANA:
[App, web o recurso real + por qué lo recomienda]

LA PREGUNTA DE LA SEMANA:
[Una pregunta para que respondan por email o en comentarios de Instagram]

LO MEJOR DE INSTAGRAM ESTA SEMANA:
[Resumen de los 2-3 posts publicados con link placeholder]

CIERRE:
[3-4 líneas de cierre cercano, firma como Diego]`,
        },
      ],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Error al generar la newsletter" });
  }
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
  console.log(`📱  Abre el navegador en esa dirección\n`);
});
