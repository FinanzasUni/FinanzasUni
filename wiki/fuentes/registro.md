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

## ⚠️ Contradicción abierta — handle de Instagram

`branding/perfil-instagram.txt` especifica `@arquitecturafinanciera` como handle, pero
todas las imágenes finales en `posts-instagram/` tienen grabado
`@arquitectura_financieralife`. No resuelta — pendiente de que Diego confirme cuál es
el handle real/definitivo de la cuenta antes de publicar más contenido o corregir el
archivo de perfil.

## Pendiente de ingerir en detalle

- `files/post-cero-corregido.html` — solo se ha usado la caption vía `perfil-instagram.txt`, no se ha leído el HTML completo.
- Cualquier fuente nueva que Diego traiga a partir de ahora (artículos, ideas, feedback de la comunidad).
