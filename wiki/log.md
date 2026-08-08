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

## [2026-07-29] publicacion | Post 04 — La regla 50/30/20
Confirmado publicado en Instagram por Diego. Siguiente en cola: Post 05 (gastos
hormiga). → [[contenido/bloque-01-cimientos]]

## [2026-07-29] ingesta | Entrevista a Ramiro (ex-Wall Street, Crescenta) — YouTube
Primera fuente externa (no producida por Diego) ingerida en el wiki. Se extrajeron dos
ideas reutilizables: por qué el day trading no funciona a largo plazo (testimonio
personal) y cómo funciona el ciclo privado→bolsa de una empresa (ejemplo SpaceX). Se
descartó explícitamente el tramo publicitario de la entrevista (fondo de private
equity Crescenta, ticket 10.000€) por no encajar con la audiencia ni con el principio
de "sin promesas de rentabilidad". → [[conceptos/por-que-no-funciona-el-day-trading]],
[[conceptos/mercado-privado-vs-bolsa]], [[fuentes/registro]]

## [2026-07-29] ingesta | Entrevista a economista "Joan" sobre dinero e inversión
Segunda fuente externa. Se extrajeron 5 conceptos reutilizables: "fuck you money"
(utilidad inversa del dinero), los tres escalones de ahorro 1.000/10.000/100.000€
(candidato fuerte como puente entre Bloque 02 y Bloque 03), deuda buena vs. mala (tema
nuevo, sin cubrir todavía), tipos de interés explicados, y cartera 60/40 con
indexación (ETFs, MSCI World, Bogle/Vanguard — muy directo para Bloque 03). Se descartó
el tramo publicitario de la app "Imagine" por la misma razón que con Crescenta.
→ [[conceptos/fuck-you-money]], [[conceptos/los-tres-escalones-de-ahorro]],
[[conceptos/deuda-buena-vs-deuda-mala]], [[conceptos/tipos-de-interes-explicados]],
[[conceptos/cartera-60-40-e-indexacion]], [[fuentes/registro]]

## [2026-07-29] ingesta | Entrevista a experto en Bitcoin/regulación cripto ("Sergi")
Tercera fuente externa, la primera enfocada en cripto — encaja con el Bloque 04 (Cripto
sin Hype). Se extrajeron 4 conceptos técnicos/educativos: Bitcoin como activo no
mutable (narrativa oro digital), el ciclo de adopción retail→institucional, la
regulación MiCA y stablecoins (UE vs. EE.UU.), y una señal práctica para detectar
exageraciones sobre compras tempranas de Bitcoin. ⚠️ Esta fuente es marcadamente
alcista/opinativa (predicciones de precio, framing de "momento de comprar") pese a
decir "no es consejo de inversión" — se descartó explícitamente todo ese framing por
contradecir el principio de marca "sin hype, sin promesas de rentabilidad". →
[[conceptos/bitcoin-activo-no-mutable]], [[conceptos/institucional-vs-retail-bitcoin]],
[[conceptos/mica-regulacion-cripto]], [[conceptos/como-detectar-estafas-cripto]],
[[fuentes/registro]]

## [2026-07-29] programacion | Post 05 — Los gastos hormiga
Programado para publicarse hoy a las 18:00. Es el último post del Bloque 01 — al
confirmarse en vivo, el bloque queda completo (6 de 6 posts). Siguiente decisión
pendiente con Diego: empezar a publicar el Bloque 02 (ya completo) o preparar primero
un reel corto a partir de un concepto de fuente externa (candidatos:
[[conceptos/fuck-you-money]] o [[conceptos/los-tres-escalones-de-ahorro]]).
→ [[contenido/bloque-01-cimientos]]

## [2026-07-29] entrega | Guion del reel "El dinero no es para comprar. Es para decir que no."
Diego eligió el ángulo de [[conceptos/fuck-you-money]] entre 4 opciones presentadas
(deuda buena/mala, fuck you money, tres escalones de ahorro, day trading) por conectar
mejor con la audiencia joven. Guion completo escrito con hook, estructura de 4 partes y
caption. Reencuadra el fondo de emergencia ya publicado como "tu no guardado en una
cuenta". Pendiente: grabar y decidir si lleva overlays de texto en HTML.
→ [[contenido/reel-fuck-you-money]], [[conceptos/fuck-you-money]]

## [2026-08-07] estrategia | Arranque de FinanzasUni (expansión a web)
Diego anuncia el siguiente paso: convertir el proyecto en una marca paraguas
"FinanzasUni" con varias ramas (Instagram + web), con blog de conceptos, sección de
actualidad económica (curación de medios + IA), comparativas de bancos con afiliación,
y AdSense a futuro. Posible cambio de nombre de la cuenta de Instagram — dejado como
decisión abierta, no ejecutada (los posts ya publicados llevan el handle actual grabado
en las imágenes). Se construyó un prototipo real de la home en `web/index.html`,
reutilizando 4 conceptos ya escritos en el wiki como artículos destacados. Pendiente:
recibir la presentación que Diego mencionó pero no llegó a compartir.
→ [[estrategia/finanzasuni]], [[tecnologia/web-finanzasuni]]
