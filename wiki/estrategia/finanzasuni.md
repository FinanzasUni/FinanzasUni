---
tipo: estrategia
fecha_creacion: 2026-08-07
fecha_actualizacion: 2026-08-07
fuentes: [conversación con Diego 2026-08-07]
---

# FinanzasUni — expansión a web

Nueva iniciativa anunciada por Diego el 2026-08-07: convertir el proyecto en "una
arquitectura firme" con varias ramas (Instagram + web), bajo el nombre **FinanzasUni**
— más cercano y pensado para jóvenes que empiezan a interesarse por las finanzas y
quieren compartirlo con amigos, no un nombre "de experto".

## ⚠️ Decisión abierta — ¿rebrand completo o marca nueva en paralelo?

Diego dijo explícitamente "quizás cambie el nombre de la cuenta de Instagram... para
que todo se convierta en un único proyecto". **No decidido todavía.** No se ha tocado
Instagram ni ningún asset de Arquitectura Financiera.

Pros/contras a poner sobre la mesa cuando se decida:
- **A favor del rebrand único**: coherencia total marca web + Instagram, un solo
  nombre que recordar, más fácil de posicionar como "un proyecto, varias ramas".
- **En contra**: los 5 posts ya publicados en Instagram llevan `@arquitectura_financieralife`
  grabado literalmente en las imágenes (no es solo el handle de la cuenta, está en el
  diseño de cada slide — ver [[../fuentes/registro]]) y los hashtags `#arquitecturafinanciera`
  están en todas las captions ya publicadas. Cambiar el handle de Instagram no reescribe
  esas imágenes ni esas captions — quedaría una inconsistencia visual salvo que se
  rehagan los posts ya publicados.
- **Alternativa intermedia**: FinanzasUni como nombre de la web/comunidad, Arquitectura
  Financiera se mantiene como el Instagram (incluso podría presentarse como "la cuenta
  de Instagram de FinanzasUni", igual que una empresa tiene marca corporativa y nombres
  de producto). Evita rehacer contenido ya publicado.

**No actuar sobre esto hasta que Diego lo decida explícitamente.**

## Modelo de contenido

Confirmado por Diego (2026-08-07): mezcla de las dos vías.
1. **Curación de noticias económicas de medios**: resumen + análisis propio + enlace a
   la fuente original. **Nunca reproducir el artículo completo** (riesgo legal de
   plagio/derechos de autor — misma lógica ya aplicada a las entrevistas de podcast en
   [[../fuentes/registro]]).
2. **Contenido generado con IA** (`arquitectura-financiera-agent`, ver
   [[../tecnologia/agente-ia]]), revisado por Diego antes de publicar.
3. Reutilización directa del banco de conceptos ya construido en `wiki/conceptos/` —
   son ~20 páginas listas para convertirse en artículos de blog sin partir de cero.

## Modelo de monetización

1. **Afiliación con bancos** (confirmado): comisión por alta a través de enlace.
   **Regla no negociable**: todo enlace de afiliado debe ir marcado como tal
   (ej. "enlace patrocinado" o "colaboración"), visible, no oculto en el texto — tanto
   por cumplimiento legal (normativa de publicidad encubierta en España/UE) como por
   coherencia con el principio de marca "sin gurús, sin hype" (ver
   [[../marca/voz-y-tono]]). Nunca recomendar un producto peor porque paga más comisión.
2. **Google AdSense**: requiere tráfico y contenido original mínimo — no es viable el
   día 1. Se activa en una fase posterior, cuando haya volumen de visitas.

## Fases de construcción (decidido 2026-08-07)

**Fase actual**: estructura y diseño de la web, sin conectar todavía monetización.
Código real en `web/` dentro de este mismo repositorio (no un mockup desechable).

**Fases futuras** (no empezadas):
- Páginas legales (aviso legal, política de afiliados, cookies) — obligatorias antes
  de activar AdSense o enlaces de afiliado.
- Conexión real con AdSense.
- Acuerdos de afiliación con bancos concretos.
- Sistema de publicación de artículos (por ahora, HTML estático; evaluar un CMS o
  generador estático cuando haya volumen de contenido).

## Pendiente

- Diego mencionó una presentación propia sobre su visión de las finanzas y la
  actualidad económica — **no se ha recibido el archivo todavía**. Cuando llegue,
  ingerir como fuente nueva siguiendo el flujo habitual (ver `CLAUDE.md`).
- Decisión de rebrand (ver arriba).
