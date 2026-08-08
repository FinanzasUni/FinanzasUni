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

**Identidad visual — historial de iteraciones**:
- v1 (07:XX 2026-08-07): fondo navy/dorado, heredado 1:1 de Instagram.
- v2: Diego pidió alejarse de eso — fondo crema cálido, coral como acento principal,
  violeta/mostaza/menta como secundarios, tipografía Fraunces + Sora.
- **v3 (actual, 2026-08-07)**: Diego pidió "mezcla de las dos", elegante y cercano,
  moderno, con transiciones y vídeo de fondo. Fusión: vuelve la base oscura elegante de
  v1 (fondo casi negro-violeta `#0E0B18`) pero con la paleta multicolor de v2 como
  acentos (dorado `#D9AE64` como color líder, + coral `#FF6B4A`, violeta `#8B6DE0`,
  menta `#2FCBA0`, mostaza `#F0C24B` por categoría de artículo). Se mantiene
  Fraunces + Sora. Añadido:
  - **Scroll reveal**: las secciones y tarjetas aparecen con fade+slide al entrar en
    viewport (IntersectionObserver + CSS, script inline al final de `index.html`).
  - **Fondo animado en el hero simulando vídeo**: gradientes radiales multicolor con
    animación `drift` (18s, moviéndose y rotando lentamente) — placeholder hasta que
    Diego tenga grabación propia. El HTML incluye un comentario explicando exactamente
    cómo sustituirlo por un `<video>` real (autoplay/muted/loop) cuando exista el
    archivo.
  - Microinteracciones: brillo de color por categoría al hacer hover en las tarjetas,
    degradado dorado→coral en el título y la firma del manifiesto, pulso animado en el
    punto del eyebrow.

**Nota sobre el vídeo de fondo**: no existe todavía ningún archivo de vídeo — cuando
Diego grabe contenido propio (ver el reel en [[reel-fuck-you-money|../contenido/reel-fuck-you-money]]),
ese material es buen candidato para convertirse en el fondo real del hero.

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
