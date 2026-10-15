# Arquitectura Financiera — Agente IA

## Descripción
Agente de IA para preparar el contenido de Instagram y la newsletter de la marca personal **Arquitectura Financiera** (@arquitectura_financieralife).

## Stack técnico
- **Backend**: Node.js + Express (ESModules)
- **IA**: Anthropic SDK (`@anthropic-ai/sdk`), modelo `claude-opus-5-5` por defecto, configurable con `CLAUDE_MODEL` / `CLAUDE_EFFORT`
- **Frontend**: HTML/CSS/JS vanilla (sin frameworks)
- **Streaming**: Server-Sent Events (SSE)

## Contexto de marca
El agente **no tiene la marca escrita en el código**: en cada petición lee `../brand-profile.md` (raíz del repo) y lo usa como prompt de sistema. Para cambiar la voz, la audiencia o los límites, edita `brand-profile.md`; no hace falta reiniciar el servidor.

Todas las llamadas pasan por `streamClaude()` / `pedirTexto()` en `server.js`, que añaden el perfil, el modelo, el esfuerzo y la fallback del servidor (`fallbacks: "default"`, beta `server-side-fallback-2026-07-01`), y traducen los errores de la API a mensajes en español.

## Estructura del proyecto
```
arquitectura-financiera-agent/
├── server.js          # Backend Express + todos los endpoints
├── package.json
├── .env               # Claves (no subir a git)
├── .env.example       # Plantilla de variables de entorno
├── CLAUDE.md          # Este archivo
└── public/
    └── index.html     # Frontend completo (UI del agente)
```

## Endpoints disponibles
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/generar-post` | Slides + caption + gancho |
| POST | `/api/generar-caption` | Solo la caption |
| POST | `/api/responder-comentario` | Respuesta a un comentario (Diego la revisa antes de enviarla) |
| POST | `/api/ideas-contenido` | 5 ideas de posts para la semana |
| POST | `/api/hashtags` | 5 hashtags (JSON, sin streaming) |
| POST | `/api/analizar-post` | Puntuación y feedback de un borrador, incluida la voz y los límites |
| POST | `/api/generar-newsletter` | Borrador de la newsletter (Substack) |
| POST | `/api/pack-semana` | Pack para Meta Business Suite a partir del calendario más reciente de `wiki/contenido/` (`calendario-*.md`), los guiones (`serie-reels-*.md`) y las imágenes de `posts-instagram/post-NN-*/` |
| GET | `/api/ig/perfil`, `/api/ig/media`, `/api/ig/comentarios/:id` | Instagram Graph API (necesita token, fase 2) |
| POST | `/api/ig/responder` | Publica una respuesta a un comentario en Instagram |
| GET/POST | `/api/historial` | Historial local en `datos.json` |

Los endpoints de generación usan **streaming SSE**: `{text}` con cada fragmento, `{error}` si algo falla y `{done}` al terminar.

## Setup inicial
```bash
npm install
cp .env.example .env      # y pon tu ANTHROPIC_API_KEY
npm run dev
# http://localhost:3000
```

## Cómo añadir nuevas funcionalidades
1. Añadir el endpoint en `server.js` usando `streamClaude(res, prompt)` (o `pedirTexto` si no hace falta streaming)
2. Añadir el panel HTML en `public/index.html` dentro de `.content`
3. Añadir el botón de navegación en el sidebar con `onclick="showPanel('nuevo-id')"`
4. Añadir la función JS en el bloque `<script>` del frontend
5. Añadir el título en el objeto `panelTitles`

## Ideas de mejoras futuras (fase 2)
- [ ] Configurar la Instagram Graph API (cuenta profesional + app de Meta + token)
- [ ] Borradores de respuesta a comentarios que Diego aprueba con un clic
- [ ] Informe semanal de métricas (guardados, envíos, alcance)
- [ ] Programar y publicar posts desde el agente (las imágenes tienen que estar en una URL pública)
- [ ] Valorar pasar las tareas automáticas (informe semanal, revisión de comentarios) a un agente gestionado en platform.claude.com
