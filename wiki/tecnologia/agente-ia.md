---
tipo: tecnologia
fecha_creacion: 2026-07-29
fecha_actualizacion: 2026-07-29
fuentes: [arquitectura-financiera-agent/CLAUDE.md]
---

# Agente IA de Arquitectura Financiera

Código en `arquitectura-financiera-agent/`. Node.js + Express + Anthropic SDK
(`claude-sonnet-4-20250514`), frontend vanilla con streaming SSE.

## ✅ Fase 1 terminada (2026-10-15)

- **Lee `brand-profile.md` en cada petición** como prompt de sistema: ya no tiene la marca
  escrita en el código (adiós al handle equivocado y a la audiencia genérica).
- **Modelo actual**: `claude-opus-5-5` con esfuerzo `medium` por defecto, configurable en
  `.env` (`CLAUDE_MODEL`, `CLAUDE_EFFORT`). SDK actualizado de 0.39 a 0.134. Fallback del
  servidor activada para cuando el modelo rechaza una petición.
- **Nuevo panel "Pack de la semana"** (`/api/pack-semana`): lee el calendario más
  reciente de `wiki/contenido/`, el guion del reel y las imágenes del carrusel, y prepara
  todo para Meta Business Suite (orden de archivos, texto alternativo de cada slide mirando
  las imágenes, caption, música, historia y checklist del reel, más avisos de pendientes).
- Prompts ajustados al perfil: 5 hashtags, newsletter en Substack, sin inventar datos ni
  herramientas de Diego, el análisis de borradores revisa voz y límites legales.
- Errores en español y visibles en la interfaz (antes fallaban en silencio).
- Probado: arranca, lee bien el calendario de las 5 semanas y llega a la API de
  Anthropic. **No probado con una clave real** (no hay clave en el ordenador): la primera
  generación real la hará Diego al poner su clave en `.env`.

## Actualización (2026-10-15): el código tenía más de lo documentado

Revisando `server.js` (en el repo desde el primer commit): además de los 7 endpoints de
generación, ya incluye **conexión con la Instagram Graph API** y un historial local:

| Endpoint | Función |
|----------|---------|
| `GET /api/ig/perfil` | Datos del perfil (seguidores, posts, bio) |
| `GET /api/ig/media` | Últimos 12 posts con likes y nº de comentarios |
| `GET /api/ig/comentarios/:mediaId` | Comentarios de un post |
| `POST /api/ig/responder` | Publica una respuesta a un comentario |
| `POST /api/historial/guardar`, `GET /api/historial` | Historial de contenido generado (`datos.json`) |

Estado real: **no está configurado** (no hay `.env`: ni clave de Anthropic ni token de
Instagram), así que la parte de Instagram nunca se ha usado. Además, el prompt de marca
está desfasado respecto a `brand-profile.md` (handle `@arquitecturafinanciera`, audiencia
18-35 genérica) y usa un modelo antiguo (`claude-sonnet-4-20250514`). No tiene todavía:
programación/publicación de posts, mensajes directos ni métricas de rendimiento.

## Endpoints ya funcionando

| Endpoint | Función |
|----------|---------|
| `/api/generar-post` | Slides + caption + hook completo |
| `/api/generar-caption` | Solo la caption |
| `/api/responder-comentario` | Respuesta a comentario de seguidor |
| `/api/ideas-contenido` | 5 ideas de posts para la semana |
| `/api/hashtags` | Set de 10 hashtags (única respuesta JSON directa, sin streaming) |
| `/api/analizar-post` | Feedback y puntuación de un borrador |
| `/api/generar-newsletter` | Newsletter semanal completa |

## Contexto de marca ya embebido en los prompts del agente

Audiencia 18-35 España, tono directo/honesto/sin jerga, contexto fiscal español
obligatorio, prohibido dar consejos de inversión directos o prometer rentabilidad —
coincide exactamente con [[../marca/voz-y-tono]] y [[../marca/audiencia]]. Si se actualiza
la voz de marca en el wiki, actualizar también los prompts en `server.js`.

## Roadmap pendiente (del propio CLAUDE.md del agente + plan estratégico)

- Historial de posts en SQLite (evitar repetir temas) — Fase 3, objetivo 15
- Integración Instagram Graph API (métricas reales) — Fase 2, objetivo 09
- Programador de posts con scheduling
- Generador de prompts de imagen para Canva/Midjourney
- Dashboard de analytics
- Export de newsletter a HTML para Beehiiv — Fase 3, objetivo 15

Ver dependencias cruzadas en [[../estrategia/plan-2026]].
