---
tipo: fuentes
fecha_creacion: 2026-07-29
fecha_actualizacion: 2026-07-29
---

# Registro de fuentes originales

Inventario de fuentes ya existentes al crear este wiki (2026-07-29), con lo que se
extrajo de cada una. Las fuentes no se mueven ni se editan — siguen en su ubicación
original.

| Fuente | Ubicación | Qué aporta | Páginas del wiki que la usan |
|--------|-----------|------------|-------------------------------|
| Plan estratégico 2026 | `Estrategia-Arquitectura-Financiera-2026.docx` | Fases, objetivos SMART, KPIs, principios, pilares | [[../estrategia/plan-2026]], [[../estrategia/kpis]], [[../estrategia/pilares-contenido]], [[../estrategia/principios]] |
| Perfil de Instagram | `branding/perfil-instagram.txt` | Bio, checklist de lanzamiento, caption del Post 0 | [[../marca/arquitectura-financiera]], [[../contenido/bloque-01-cimientos]] |
| Primeros 5 posts (Bloque 01) | `files/arquitectura-financiera-5posts.html` | Copy completo, hooks, hashtags de posts 01-05 | [[../contenido/bloque-01-cimientos]] y páginas de conceptos asociadas |
| Bloque 02 completo | `files/arquitectura-financiera-bloque02.html` | Copy completo de posts 06-10 (Ahorro Real) | [[../contenido/bloque-02-ahorro-real]] y páginas de conceptos asociadas |
| Post Cero corregido | `files/post-cero-corregido.html` | Versión corregida del carrusel de presentación | [[../contenido/bloque-01-cimientos]] (pendiente de leer en detalle en una próxima ingesta) |
| Agente IA | `arquitectura-financiera-agent/CLAUDE.md` | Stack técnico, endpoints, contexto de marca embebido, roadmap | [[../tecnologia/agente-ia]] |
| Assets de marca | `branding/logo-af-*.png` | Logo, avatar, versión horizontal | [[../marca/arquitectura-financiera]] |
| Imágenes finales de posts | `posts/`, `posts-instagram/` | Slides finales renderizados por post | [[../contenido/bloque-01-cimientos]] |
| Plantillas de slide | `slides/*.html` | Diseño HTML individual de cada slide | [[../contenido/formato-carrusel]] |
| Entrevista a Ramiro (ex-Wall Street, Crescenta) | YouTube: https://www.youtube.com/watch?v=vU7kzKIcpgo | Historia personal sobre por qué el day trading no funciona; explicación de cómo funciona el ciclo privado→bolsa de una empresa (ejemplo SpaceX) | [[../conceptos/por-que-no-funciona-el-day-trading]], [[../conceptos/mercado-privado-vs-bolsa]] |
| Entrevista a economista "Joan" sobre dinero/inversión | Transcripción pegada por Diego, sin URL de referencia (pendiente de conseguir el enlace para citarla mejor) | Psicología del dinero (fuck you money), escalones de ahorro 1.000/10.000/100.000€, deuda buena vs mala, tipos de interés, cartera 60/40 e indexación | [[../conceptos/fuck-you-money]], [[../conceptos/los-tres-escalones-de-ahorro]], [[../conceptos/deuda-buena-vs-deuda-mala]], [[../conceptos/tipos-de-interes-explicados]], [[../conceptos/cartera-60-40-e-indexacion]] |
| Entrevista a experto en Bitcoin/regulación cripto ("Sergi", abogado) | Transcripción pegada por Diego, sin URL de referencia | Bitcoin como activo no mutable/narrativa oro digital, ciclo institucional vs retail, regulación MiCA y stablecoins, cómo detectar a alguien mintiendo sobre compras de Bitcoin | [[../conceptos/bitcoin-activo-no-mutable]], [[../conceptos/institucional-vs-retail-bitcoin]], [[../conceptos/mica-regulacion-cripto]], [[../conceptos/como-detectar-estafas-cripto]] |

## Resuelto — `posts/` vs `posts-instagram/` (2026-07-29)

Ambas carpetas contienen las mismas 11 subcarpetas de posts. Comparando visualmente
`post-04-regla-502030/slide-01`: `posts-instagram/` usa tipografía serif (coincide con
el logo de marca) y tiene el handle real grabado en la imagen; `posts/` es una iteración
de diseño anterior con sans-serif genérica y fondo de rejilla de puntos.
**`posts-instagram/` es la carpeta canónica** para publicar. `posts/` se conserva como
historial de diseño, no usar para publicar.

## Resuelto — estado del Bloque 02 (2026-07-29)

Se confirmó que sí existen imágenes finales para los 10 posts del Bloque 02 en
`posts-instagram/post-06-fondo-emergencia` … `post-10-plan-ahorro`. La nota anterior de
"copy listo, imágenes pendientes" era un error de esta wiki, no un hueco real. Ver
[[../contenido/bloque-02-ahorro-real]].

## Resuelto — handle de Instagram (2026-07-29)

El handle oficial confirmado por Diego es `@arquitectura_financieralife` (coincide con
lo grabado en las imágenes de `posts-instagram/`). `branding/perfil-instagram.txt` tenía
`@arquitecturafinanciera` por error — corregido directamente en el archivo.

## Nota sobre la entrevista a Ramiro/Crescenta (2026-07-29)

La entrevista incluye un tramo de publicidad integrada de Crescenta (fondos de private
equity, ticket mínimo 10.000€, liquidez bloqueada 5 años, con cifras de rentabilidad
que son marketing propio de la empresa, no dato independiente). **No usar ese producto
ni esas cifras de rentabilidad como referencia en contenido de la cuenta** — no encaja
con el público de 18-35 años empezando desde cero, y citar rentabilidades de un
anunciante rompe el principio de "sin promesas de rentabilidad" (ver
[[../marca/voz-y-tono]]). Se extrajeron únicamente dos ideas de valor general,
independientes del producto: [[../conceptos/por-que-no-funciona-el-day-trading]] y
[[../conceptos/mercado-privado-vs-bolsa]].

## Nota sobre la entrevista al economista "Joan" (2026-07-29)

También incluye un tramo de publicidad integrada (app "Imagine"/Imagine Academy, con
código promocional). Misma regla que con Crescenta: **no reutilizar la mención al
producto ni el código promocional** en contenido de la cuenta — las cinco páginas de
concepto creadas a partir de esta fuente son solo la parte educativa, independiente del
patrocinio.

> **Corrección 2026-08-08**: se añadió por error una tarjeta "Imagine" en la web
> asumiendo que Diego se refería a esta app del anuncio — error de esta sesión. Diego
> se refería en realidad a **"imagin"** (sin e final), la marca digital de CaixaBank
> para jóvenes, una entidad totalmente distinta y sin relación con el tramo publicitario
> de esta entrevista. Corregido en [[../tecnologia/web-finanzasuni]]. La restricción de
> "no reutilizar la mención a Imagine/Imagine Academy" de esta fuente sigue vigente tal
> cual estaba — no aplica a "imagin"/CaixaBank, que es información pública independiente
> del anuncio.

## Nota sobre la entrevista al experto en Bitcoin (2026-07-29)

⚠️ Esta fuente es la más alcista/con más carga de opinión de las tres ingeridas hasta
ahora. El entrevistado repite "no es consejo de inversión" pero da señales claras de
"ahora es buen momento para comprar" y hace predicciones de precio. Esto **contradice
directamente** el principio de marca "cripto sin hype, sin promesas de rentabilidad"
(ver [[../marca/voz-y-tono]]). Las 4 páginas de concepto creadas se limitan
estrictamente a la parte técnica/educativa (qué es Bitcoin, cómo funciona la adopción,
regulación MiCA, cómo detectar exageraciones) — **no usar ninguna cifra de precio,
predicción ni framing de "es el momento de comprar" de esta fuente** en contenido de la
cuenta.

## Pendiente de ingerir en detalle

- `files/post-cero-corregido.html` — solo se ha usado la caption vía `perfil-instagram.txt`, no se ha leído el HTML completo.
- Cualquier fuente nueva que Diego traiga a partir de ahora (artículos, ideas, feedback de la comunidad).
