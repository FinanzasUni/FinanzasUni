# Arquitectura Financiera — Agente IA

## Descripción
Agente de IA para gestionar el contenido de Instagram, newsletter y comunidad de la marca personal **Arquitectura Financiera** (@arquitecturafinanciera).

## Stack técnico
- **Backend**: Node.js + Express (ESModules)
- **IA**: Anthropic SDK con claude-sonnet-4-20250514
- **Frontend**: HTML/CSS/JS vanilla (sin frameworks)
- **Streaming**: Server-Sent Events (SSE)

## Estructura del proyecto
```
arquitectura-financiera-agent/
├── server.js          # Backend Express + todos los endpoints de IA
├── package.json
├── .env               # API key (no subir a git)
├── .env.example       # Template de variables de entorno
├── CLAUDE.md          # Este archivo
└── public/
    └── index.html     # Frontend completo (UI del agente)
```

## Endpoints disponibles
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/generar-post` | Genera slides + caption + hook completo |
| POST | `/api/generar-caption` | Solo la caption de Instagram |
| POST | `/api/responder-comentario` | Respuesta a comentario de seguidor |
| POST | `/api/ideas-contenido` | 5 ideas de posts para la semana |
| POST | `/api/hashtags` | Set de 10 hashtags optimizados |
| POST | `/api/analizar-post` | Feedback y puntuación del borrador |
| POST | `/api/generar-newsletter` | Newsletter semanal completa |

Todos los endpoints de generación usan **streaming SSE** excepto `/api/hashtags` que devuelve JSON directo.

## Setup inicial
```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env
cp .env.example .env
# Edita .env y añade tu ANTHROPIC_API_KEY

# 3. Arrancar el servidor
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

## Variables de entorno
```
ANTHROPIC_API_KEY=sk-ant-...   # Obligatorio
PORT=3000                        # Opcional, por defecto 3000
```

## Cómo añadir nuevas funcionalidades
1. Añadir el endpoint en `server.js` siguiendo el patrón de streaming existente
2. Añadir el panel HTML en `public/index.html` dentro de `.content`
3. Añadir el botón de navegación en el sidebar con `onclick="showPanel('nuevo-id')"`
4. Añadir la función JS en el bloque `<script>` del frontend
5. Añadir el título en el objeto `panelTitles`

## Contexto de la marca (para ajustar prompts)
- **Audiencia**: jóvenes españoles 18-35 años
- **Tono**: directo, honesto, sin jerga, contexto español siempre
- **Prohibido**: consejos de inversión directos, promesas de rentabilidad
- **Obligatorio**: contexto fiscal español, brokers españoles (DEGIRO, MyInvestor, Bit2Me)
- **Modelo**: claude-sonnet-4-20250514

## Ideas de mejoras futuras
- [ ] Guardar historial de posts generados en SQLite
- [ ] Integración con Instagram Graph API para ver métricas
- [ ] Programador de posts (con integración de scheduling)
- [ ] Generador de imágenes con prompt para Canva/Midjourney
- [ ] Dashboard de analytics (seguidores, alcance, guardados)
- [ ] Canal WhatsApp: generador de mensajes semanales
- [ ] Exportar newsletter a formato HTML para Beehiiv
