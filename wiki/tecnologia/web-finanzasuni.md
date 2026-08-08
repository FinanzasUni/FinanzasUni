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

## Infraestructura añadida (2026-08-07, sesión de "profundizar en el funcionamiento")

Diego pidió: publicar gratis, que todos los enlaces funcionen, noticias que se
actualicen solas cada día, sincronización con Instagram, y newsletter. Decisiones
tomadas con él: RSS gratuitos para noticias, sincronización con Instagram **manual**
por ahora (no automatizada), Beehiiv para newsletter (pendiente de que cree la cuenta).

- **CSS extraído** a `web/styles.css`, compartido por todas las páginas (antes estaba
  duplicado inline en `index.html`).
- **Enlaces reales**: las 4 tarjetas de "Aprende" y "Ver todos los artículos" ya
  apuntan a páginas de artículo reales en `web/articulos/` (ya no van a `#`).
- **4 artículos completos escritos** (no teasers): `dinero-para-decir-que-no.html`,
  `gastos-hormiga.html`, `deuda-buena-vs-deuda-mala.html`,
  `tres-escalones-de-ahorro.html` — contenido original basado en
  [[../conceptos/fuck-you-money]], [[../conceptos/gastos-hormiga]],
  [[../conceptos/deuda-buena-vs-deuda-mala]] y [[../conceptos/los-tres-escalones-de-ahorro]],
  enlazados entre sí.
- **Páginas legales placeholder** en `web/legal/` (aviso legal, política de afiliados,
  cookies) — marcadas explícitamente como borrador, pendientes de revisión legal real
  antes de activar AdSense o afiliación.
- **Noticias dinámicas**: `web/data/noticias.json` + JS en `index.html` que lo carga
  por `fetch()`. Con fallback a los 3 ejemplos fijos si el fetch falla (pasa siempre
  que se abre el archivo con `file://` en vez de servido por HTTP — limitación del
  navegador, no un bug).
- **`scripts/fetch-noticias.js`**: script Node que lee RSS y regenera `noticias.json`.
  ⚠️ Primera ejecución real (2026-08-08) confirmó que Cinco Días (404) y El Economista
  (403, bloqueo anti-bot) no funcionaban — sustituidos por dos búsquedas de Google News
  (más resistentes a bloqueos). Expansión sí funcionó a la primera y se mantiene.
- **`.github/workflows/actualizar-web.yml`**: GitHub Action que corre cada día a las
  06:00 UTC — regenera `noticias.json`, lo commitea si cambió, y despliega `web/`
  entero a GitHub Pages. También se dispara en cada push a `master`.

## ✅ Publicada y verificada (2026-08-08)

**URL en vivo**: https://diegomorenov44-dotcom.github.io/FinanzasUni/

Verificado directamente (fetch real, no solo revisión de código): home carga con
contenido real, los 4 artículos de `web/articulos/` cargan completos y con sus enlaces
cruzados funcionando, las páginas legales cargan con su aviso de borrador visible, y
`data/noticias.json` en producción contiene 9 noticias reales generadas por el
workflow (actualizado 2026-08-08 14:17) — el sistema de noticias automáticas
**funciona de verdad**, no solo en teoría.

La ejecución que se había cancelado antes quedó superada por una ejecución posterior
(disparada automáticamente al hacer push del fix de los feeds RSS rotos).

## Pendiente (explícitamente no hecho todavía)

- **Publicar en GitHub**: el repositorio es local, no tiene remoto todavía. Ver
  instrucciones de despliegue más abajo.
- **Activar GitHub Pages** en la configuración del repositorio (Settings → Pages →
  Source: GitHub Actions) — paso manual único de Diego, una vez el repo esté en GitHub.
- Verificar que las URLs de RSS del script siguen siendo válidas (pueden cambiar).
- Datos reales en Comparativas (ahora mismo son tarjetas vacías de ejemplo).
- Conectar el formulario de newsletter a Beehiiv en cuanto Diego cree la cuenta.
- Revisión legal real de las páginas de `web/legal/`.
- Decisión de dominio propio (por ahora sería `<usuario>.github.io/<repo>`).

## Sincronización con Instagram — proceso manual (decidido 2026-08-07)

No hay automatización con la API de Instagram todavía (requiere crear una app en
Meta for Developers — Diego prefirió empezar simple). **Proceso actual**: cuando Diego
publica un post nuevo en Instagram, lo dice en la conversación y se actualiza a mano
el contenido correspondiente en `web/` (por ejemplo, añadiendo el artículo relacionado
o mencionándolo en la home). Revisar [[../estrategia/finanzasuni]] cuando se quiera
evaluar automatizarlo.

## Cómo verlo en local

Abrir `web/index.html` directamente en el navegador (doble clic). Nota: en local, la
sección de noticias muestra los 3 ejemplos fijos (el `fetch()` a `data/noticias.json`
no funciona bajo `file://`) — funcionará dinámicamente en cuanto esté publicada.
