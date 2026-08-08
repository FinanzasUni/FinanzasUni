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

**Identidad visual (v2, 2026-08-07)**: Diego pidió explícitamente alejarse del navy/dorado
de Instagram — "algo más profesional y original", con más color. Paleta nueva,
independiente de la de Arquitectura Financiera: fondo crema cálido (#FBF3E6), acento
principal coral (#FF5A3C), violeta profundo (#4E2E8C) para secciones de contraste,
mostaza (#F5B942) y verde menta (#17A387) como acentos secundarios — cada categoría de
artículo tiene su propio color (violeta=psicología, menta=ahorro, coral=deuda,
mostaza=inversión) en vez de un único color genérico. Tipografía: Fraunces (serif
expresiva, con cursiva) para titulares + Sora (sans moderna) para cuerpo. Formas
orgánicas ("blobs") de fondo en hero, manifiesto y newsletter para dar personalidad.
**Nota**: esto desacopla la identidad visual de la web de la del Instagram — es una
decisión consciente de Diego, no un descuido; si en el futuro se decide el rebrand
completo (ver [[../estrategia/finanzasuni]]), habrá que decidir si Instagram adopta esta
paleta o si se mantienen como dos lenguajes visuales distintos dentro del mismo proyecto.

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
