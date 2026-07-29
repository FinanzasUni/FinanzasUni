---
tipo: tecnologia
fecha_creacion: 2026-07-29
fecha_actualizacion: 2026-07-29
fuentes: [arquitectura-financiera-agent/CLAUDE.md]
---

# Agente IA de Arquitectura Financiera

Código en `arquitectura-financiera-agent/`. Node.js + Express + Anthropic SDK
(`claude-sonnet-4-20250514`), frontend vanilla con streaming SSE.

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
