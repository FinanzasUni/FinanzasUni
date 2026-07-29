# Log

Registro cronológico, solo-escritura. `grep "^## \[" wiki/log.md | tail -5` para ver las últimas entradas.

## [2026-07-29] setup | Creación inicial del wiki (metodología Karpathy)
Se inicializó el repositorio git y la estructura `wiki/` + `CLAUDE.md`. Se hizo la
primera ingesta retroactiva de todo el trabajo previo de Diego, encontrado ya en la
carpeta al empezar: plan estratégico, perfil de Instagram, Bloque 01 (5 posts + Post 0,
con imágenes finales), Bloque 02 (5 posts, solo copy), y el agente IA. Se crearon 18
páginas de wiki cubriendo marca, estrategia, 8 conceptos financieros, 2 bloques de
contenido, tecnología y el registro de fuentes.

## [2026-07-29] ingesta | Estrategia-Arquitectura-Financiera-2026.docx
Plan de 3 fases (Lanzamiento, Crecimiento, Monetización), 15 objetivos SMART, KPIs y
4 principios rectores. → [[estrategia/plan-2026]], [[estrategia/kpis]], [[estrategia/principios]]

## [2026-07-29] ingesta | branding/perfil-instagram.txt
Bio, checklist de lanzamiento y caption del Post 0. → [[marca/arquitectura-financiera]]

## [2026-07-29] ingesta | files/arquitectura-financiera-5posts.html
Copy completo de Post 0 + Bloque 01 (posts 01-05). → [[contenido/bloque-01-cimientos]]
y 5 páginas de conceptos nuevas.

## [2026-07-29] ingesta | files/arquitectura-financiera-bloque02.html
Copy completo del Bloque 02 (posts 06-10, aunque solo se extrajeron en detalle 06-08).
→ [[contenido/bloque-02-ahorro-real]] y 3 páginas de conceptos nuevas. Pendiente:
extraer detalle de posts 09 y 10 en una próxima sesión.

## [2026-07-29] ingesta | arquitectura-financiera-agent/CLAUDE.md
Stack técnico, 7 endpoints, contexto de marca embebido en prompts, roadmap.
→ [[tecnologia/agente-ia]]

## [2026-07-29] revision | Resolución de huecos: posts/ vs posts-instagram/, estado Bloque 02
Diego confirmó que el último post publicado es "Ingresos vs Gastos" (Post 03). Se
comparó visualmente `posts/` vs `posts-instagram/` para el Post 04: `posts-instagram/`
es la versión canónica (tipografía coincide con el logo, handle grabado). Se corrigió
el estado del Bloque 02: SÍ tiene imágenes finales completas para los 10 posts, no
estaba a medias — la nota anterior de esta wiki era incorrecta. Se detectó una
contradicción real y sin resolver: el handle grabado en las imágenes
(`@arquitectura_financieralife`) no coincide con el de `branding/perfil-instagram.txt`
(`@arquitecturafinanciera`). Se crearon páginas de concepto para Posts 09 y 10
([[conceptos/dinero-muerto]], [[conceptos/plan-de-ahorro]]) que faltaban.
→ [[contenido/bloque-01-cimientos]], [[contenido/bloque-02-ahorro-real]], [[fuentes/registro]]

## [2026-07-29] resolucion | Handle de Instagram confirmado
Diego confirmó que el handle oficial de la cuenta es `@arquitectura_financieralife`.
Se corrigió `branding/perfil-instagram.txt` (tenía `@arquitecturafinanciera` por error)
y se actualizaron todas las páginas del wiki que señalaban la contradicción.
→ [[marca/arquitectura-financiera]], [[fuentes/registro]]

## [2026-07-29] entrega | Post 04 — La regla 50/30/20 (siguiente a publicar)
Empaquetado para publicar: 5 slides de `posts-instagram/post-04-regla-502030/`, caption
y hashtags de `files/arquitectura-financiera-5posts.html`. Es el siguiente post en la
cola tras "Ingresos vs Gastos" (Post 03). → [[contenido/bloque-01-cimientos]],
[[conceptos/regla-50-30-20]]
