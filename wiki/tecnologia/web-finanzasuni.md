---
tipo: tecnologia
fecha_creacion: 2026-08-07
fecha_actualizacion: 2026-08-07
fuentes: [web/index.html, [[../estrategia/finanzasuni]]]
---

# Web de FinanzasUni

Código real en `web/` (raíz del repositorio), no un mockup desechable — HTML/CSS puro,
sin dependencias de build, para poder iterar rápido en esta fase.

## Estado actual (2026-08-07)

`web/index.html` — prototipo de home con la arquitectura completa de secciones:
Hero → Aprende (artículos, con 4 tarjetas ya usando conceptos reales del wiki) →
Actualidad (estructura de ejemplo, marcada como "en construcción") → Comparativas
(con aviso de transparencia sobre afiliación ya integrado desde el diseño, no añadido
después) → Manifiesto → Newsletter → Footer con enlaces legales (placeholder).

**Identidad visual**: fondo azul marino oscuro (#0f1524), acento dorado (#c9a961),
titulares en serif (Source Serif 4) + cuerpo en sans (Inter) + detalles en monoespaciada
(JetBrains Mono) — mismo lenguaje visual que los posts de Instagram en
`posts-instagram/`, para que la web se sienta del mismo proyecto que la cuenta (ver
[[../marca/arquitectura-financiera]]).

Los 4 artículos destacados de la sección "Aprende" no son contenido de relleno: son
[[../conceptos/fuck-you-money]], [[../conceptos/gastos-hormiga]],
[[../conceptos/deuda-buena-vs-deuda-mala]] y [[../conceptos/los-tres-escalones-de-ahorro]]
— la idea es que cada tarjeta se convierta en un artículo real a partir de la página de
concepto correspondiente, sin partir de cero.

## Pendiente (explícitamente no hecho todavía, ver [[../estrategia/finanzasuni]])

- Contenido real de la sección Actualidad (ahora mismo son 3 noticias de ejemplo,
  inventadas para mostrar la estructura).
- Datos reales en Comparativas (ahora mismo son tarjetas vacías de ejemplo).
- Páginas legales (aviso legal, política de afiliados, cookies) — enlazadas en el
  footer pero sin contenido todavía. **Obligatorias antes de activar AdSense o
  afiliación real.**
- Formulario de newsletter sin backend conectado (ahora mismo no envía a ningún sitio).
- Decisión de hosting/dominio: no hay todavía dónde desplegar esto en producción.
- Decidir si el resto del sitio (artículos individuales, páginas de comparativa) se
  construye como HTML estático adicional o se pasa a un generador estático /
  CMS cuando haya más volumen de contenido.

## Cómo verlo

Abrir `web/index.html` directamente en el navegador (doble clic) — no necesita
servidor para esta fase de prototipo.
