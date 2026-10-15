# Arquitectura Financiera — Esquema del Wiki (segundo cerebro)

Este repositorio es el "segundo cerebro" de la marca personal **Arquitectura Financiera**
(@arquitecturafinanciera), siguiendo la metodología de wiki-LLM de Andrej Karpathy:
una wiki persistente en Markdown que un LLM lee, escribe y mantiene de forma incremental,
en lugar de redescubrir el conocimiento en cada consulta.

Tú (el LLM) eres el bibliotecario. Diego selecciona fuentes, dirige el análisis y hace
las preguntas. Tú resumes, cruzas referencias, señalas contradicciones y mantienes
`wiki/` coherente y actualizado.

## Las tres capas

1. **Fuentes originales (inmutables)** — nunca las edites, solo las lees:
   - `Estrategia-Arquitectura-Financiera-2026.docx` — plan estratégico maestro (fases, KPIs, objetivos SMART)
   - `branding/` — logo, avatar, `perfil-instagram.txt` (bio, checklist de lanzamiento)
   - `files/*.html` — borradores de posts con slides/captions/hashtags ya redactados
   - `posts/` y `posts-instagram/` — imágenes finales de cada carrusel, por carpeta `post-NN-slug/`
   - `slides/` — plantillas HTML individuales de cada slide (`pN-sN.html`)
   - `arquitectura-financiera-agent/` — código del agente Node.js que genera contenido
   - Cualquier fuente nueva que Diego añada (artículos, pantallazos, notas de voz transcritas, docs)

2. **`wiki/`** — Markdown generado y mantenido por ti. Estructura:
   - `wiki/index.md` — catálogo de todas las páginas, por categoría, con resumen de una línea
   - `wiki/log.md` — registro cronológico de ingestas, consultas y revisiones (`## [YYYY-MM-DD] tipo | título`)
   - `wiki/marca/` — identidad: propuesta de valor, fundador, audiencia, voz y tono
   - `wiki/estrategia/` — plan de fases, objetivos SMART, KPIs, pilares de contenido
   - `wiki/conceptos/` — una página por concepto financiero explicado en la cuenta
     (fondo de emergencia, regla 50/30/20, gastos hormiga...). Reutilizable entre posts.
   - `wiki/contenido/` — estado de cada bloque temático y cada post (publicado/pendiente, formato, rendimiento)
   - `wiki/tecnologia/` — el agente IA: qué hace, endpoints, roadmap
   - `wiki/fuentes/` — un registro (no una copia) de cada fuente original ingerida, con enlace y resumen

3. **Este archivo (`CLAUDE.md`)** — las reglas del juego. Se actualiza cuando Diego y tú
   descubráis una convención mejor.

## Flujo de ingesta

Cuando Diego traiga una fuente nueva (un artículo sobre inversión, una captura de un competidor,
una idea de post, feedback de la comunidad):

1. Léela por completo.
2. Coméntale con él los puntos clave — no asumas, pregunta qué destacar.
3. Crea o actualiza la página de `wiki/conceptos/` o `wiki/contenido/` que corresponda.
4. Actualiza cualquier página de `wiki/marca/` o `wiki/estrategia/` que la fuente contradiga
   o refuerce. Señala explícitamente las contradicciones (no las borres en silencio).
5. Añade/actualiza la entrada en `wiki/fuentes/` con enlace y resumen de una línea.
6. Actualiza `wiki/index.md`.
7. Añade una entrada a `wiki/log.md` con el formato `## [YYYY-MM-DD] ingesta | Título de la fuente`.

Prefiere ingerir fuentes de una en una y mantener a Diego involucrado en el proceso,
salvo que él pida procesar varias de golpe.

## Flujo de consulta

Cuando Diego pregunte algo (p. ej. "¿qué conceptos de Bloque 03 ya tenemos cubiertos?",
"dame ideas de post sobre ETFs que no repitan lo ya publicado"):

1. Lee primero `wiki/index.md` para localizar las páginas relevantes.
2. Lee esas páginas en detalle antes de responder.
3. Si el resultado es valioso y reutilizable (una comparación, un guion de post, un ángulo
   nuevo), ofrece archivarlo como página nueva en `wiki/` en vez de dejarlo solo en el chat.
4. Registra la consulta en `wiki/log.md` si generó una página nueva o un cambio relevante.

## Flujo de creación de contenido (el objetivo final del wiki)

Cuando toque producir un post/reel nuevo:

1. Revisa `wiki/estrategia/pilares-contenido.md` para ver qué bloque/tema toca.
2. Revisa `wiki/contenido/` para no repetir un concepto ya publicado (o para enlazarlo como
   parte de una serie).
3. Revisa `wiki/marca/voz-y-tono.md` antes de escribir cualquier copy.
4. Al terminar un post, documenta su estado en `wiki/contenido/bloque-XX-*.md` y enlaza los
   conceptos financieros que toca desde `wiki/conceptos/`.

## Convenciones de las páginas

- Cabecera YAML mínima en cada página: `tipo`, `fecha_creacion`, `fecha_actualizacion`,
  y `fuentes` (lista de fuentes originales o páginas de las que procede la info).
- Enlaces internos estilo wiki: `[[nombre-de-la-pagina]]` (compatible con backlinks/grafo de Obsidian).
- Nunca borres información directamente — si una fuente nueva contradice algo, dedica una
  sección "⚠️ Contradicción / actualización" explicando ambas versiones y la fecha.
- Español siempre, tono acorde a `wiki/marca/voz-y-tono.md`.

## Estado del proyecto (resumen para orientarte rápido)

Arquitectura Financiera ya tiene trabajo hecho antes de crear este wiki: Post 0 + Bloque 01
(5 posts, "Cimientos") listos, Bloque 02 (5 posts, "Ahorro Real") con contenido redactado
en `files/arquitectura-financiera-bloque02.html` pero pendiente de generar slides/imágenes
finales, y un agente de IA propio (Node + Anthropic SDK) para producir contenido. El plan
estratégico completo (fases, objetivos SMART, KPIs) está en la wiki bajo `wiki/estrategia/`.
Antes de sugerir contenido nuevo, comprueba en `wiki/contenido/` qué bloque toca ahora.


## Actualización [2026-10-15] - marca ampliada, plan de ingresos y herramientas

> Esta sección amplía lo anterior; no lo sustituye. Si algo de arriba choca con esto, manda esto.

### Alcance de la marca
- La marca nace de Arquitectura Financiera y se amplía más allá de las finanzas: crecimiento
  personal, "calidad humana", reflexiones de Diego y entrevistas a gente de su entorno que aporte valor.
- Prioridad: ayudar y "despertar" a la gente por encima de ganar dinero a corto plazo.
  Valores y fe presentes, pero nunca como titular.
- Canal principal Instagram; YouTube para vídeos largos; newsletter en Substack.
- Todo lo relacionado con la empresa familiar de construcción queda FUERA de la marca.
- Tiempo real disponible: 3-5 h/semana. Nada de planes que no quepan ahí.

### Documentos clave nuevos (léelos antes de planificar)
- `brand-profile.md` - fuente única de verdad de identidad, voz, audiencia y límites.
  Las habilidades de redes sociales lo leen antes de escribir. Si contradice
  `wiki/marca/voz-y-tono.md`, señálalo y propón cómo unificarlos.
- `sistema-ingresos-marca-personal.md` - plan de ingresos: decisiones, hoja de ruta por fases,
  catálogo de productos con precios y umbrales de validación, KPIs y plan de 6 meses.

### Herramientas disponibles en Claude Code
- Agente `director-marca`: coordina el trabajo de la marca (planificación semanal y mensual,
  producción en lote, revisión, métricas, avance del plan de ingresos).
- Habilidades globales de marca personal: brand-profile, voice-builder, content-pillars,
  content-calendar, batch-content-plan, hook-writer, caption-writer, carousel-writer,
  reels-script, story-writer, instagram-growth, instagram-seo, profile-optimization,
  analytics-and-reporting, content-audit, creator-monetization, lead-magnets-and-funnels,
  email-and-newsletter, youtube-long-form, brand-creator, entre otras.
- Al usarlas, respeta las convenciones de esta carpeta: los posts siguen en `posts/post-NN-slug/`
  y su estado se documenta en `wiki/contenido/`; los aprendizajes reutilizables van a `wiki/`
  y cada cambio relevante se registra en `wiki/log.md`.
