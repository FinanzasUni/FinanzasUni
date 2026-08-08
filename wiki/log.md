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

## [2026-08-07] revision | Rediseño visual de la web FinanzasUni
Diego rechazó la paleta navy/dorado (heredada de Instagram) por no sentirla profesional
ni original. Rediseño completo: fondo crema cálido, coral como acento principal,
violeta/mostaza/menta como acentos secundarios con color por categoría de artículo,
tipografía Fraunces (serif expresiva) + Sora (sans), formas orgánicas de fondo. Decisión
consciente de desacoplar la identidad visual de la web de la de Instagram.
→ [[tecnologia/web-finanzasuni]]

## [2026-08-07] revision | Fusion de estilos v3: oscuro elegante + color + movimiento
Diego pidio una mezcla de las dos versiones anteriores: elegante, cercano, moderno,
con transiciones y video de fondo. Se volvio a la base oscura casi negra-violeta (mas
elegante que el crema) pero manteniendo la paleta multicolor por categoria (dorado
como color lider + coral/violeta/menta/mostaza). Se anadio scroll-reveal real
(IntersectionObserver) y un fondo animado en el hero que simula movimiento tipo video
mediante gradientes animados, con el codigo ya preparado para sustituirse por un
video real cuando Diego tenga grabacion propia.
→ [[tecnologia/web-finanzasuni]]

## [2026-08-07] desarrollo | Infraestructura real de la web: articulos, noticias RSS, deploy
Diego pidio profundizar en el funcionamiento: publicar gratis, enlaces que funcionen,
noticias automaticas diarias, sincronizacion con Instagram y newsletter. Decisiones:
RSS gratuitos (no API de pago), Instagram manual por ahora (no automatizado), Beehiiv
para newsletter. Se construyo: CSS compartido, 4 articulos reales con contenido
completo, paginas legales borrador, sistema de noticias dinamico (noticias.json +
fetch JS + script Node de RSS + GitHub Action diaria), y el workflow de despliegue a
GitHub Pages. Pendiente de Diego: confirmar/crear cuenta de GitHub, crear el
repositorio remoto y activar Pages.
→ [[tecnologia/web-finanzasuni]], [[estrategia/finanzasuni]]

## [2026-08-07] publicacion | Post 05 confirmado — Bloque 01 completo
Diego confirma que el Post 05 (gastos hormiga) se publico correctamente a las 18:00.
Bloque 01 queda cerrado: 6/6 posts publicados. → [[contenido/bloque-01-cimientos]]

## [2026-08-07] diseno | Estructura del Bloque 03 — Inversion Indexada
Se disena la secuencia de 7 posts (11-17) combinando 4 conceptos ya ingeridos de
fuentes externas (tres escalones de ahorro, day trading, cartera 60/40 e indexacion,
mercado privado vs bolsa) con 3 temas nuevos por desarrollar (ETFs y fondos indexados,
comparativa DEGIRO vs MyInvestor, IRPF e inversiones). Orden pensado para ir de lo
psicologico (limpiar mitos de trading) a lo tecnico (vehiculos de inversion) a lo
practico (broker espanol, fiscalidad). Sin copy de posts todavia — siguiente paso es
crear las 3 paginas de concepto que faltan.
→ [[contenido/bloque-03-inversion-indexada]], [[estrategia/pilares-contenido]]

## [2026-08-08] fix | Feeds RSS rotos en la primera ejecucion real
Primera ejecucion del workflow en GitHub Actions revelo que 2 de los 3 feeds RSS
fallaban: Cinco Dias (404, URL ya no existe) y El Economista (403, bloqueo anti-bot).
Expansion funciono correctamente. Sustituidos los dos rotos por busquedas de Google
News (verificadas como validas), mas resistentes a bloqueos que depender de que cada
medio mantenga su URL de RSS estable. La ejecucion tambien mostro "Error: The
operation was canceled" tras escribir noticias.json — causa no confirmada, pendiente
de reintentar tras el fix y revisar el log completo si vuelve a pasar.
→ [[tecnologia/web-finanzasuni]]

## [2026-08-08] verificacion | Web publicada y confirmada funcionando en produccion
Verificado en vivo (fetch real a la URL publica, no solo revision de codigo):
https://diegomorenov44-dotcom.github.io/FinanzasUni/ carga correctamente. Home,
articulos/ (4 paginas completas con enlaces cruzados funcionando), legal/
(paginas con aviso de borrador visible) y data/noticias.json (9 noticias reales,
generadas automaticamente por el workflow) confirmados operativos. El sistema de
noticias automaticas diarias funciona en produccion, no solo en teoria.
→ [[tecnologia/web-finanzasuni]]

## [2026-08-08] contenido | Bloque 03 completo a nivel de concepto
Creados los 3 conceptos que faltaban: ETFs y fondos indexados (nivel basico, decidido
con Diego), comparativa DEGIRO/MyInvestor/Trade Republic (incluye Trade Republic por
decision de Diego, marcado para reutilizar tambien en la seccion Comparativas de la
web), e IRPF e inversiones (deliberadamente sin cifras/tramos exactos, decidido con
Diego para evitar publicar datos fiscales que caduquen). Los 7 posts del Bloque 03
tienen ya su concepto completo — el bloque esta listo para pasar a redactar copy y
generar slides, mismo proceso que Bloque 01/02.
→ [[contenido/bloque-03-inversion-indexada]], [[conceptos/etfs-y-fondos-indexados]],
[[conceptos/brokers-espana-comparativa]], [[conceptos/irpf-e-inversiones]]

## [2026-08-08] infraestructura | Traslado a organizacion de GitHub, URL sin usuario personal
Diego traslado el repositorio a la organizacion "finanzasuni". Nueva URL confirmada
en vivo: https://finanzasuni.github.io/FinanzasUni/ (ya no aparece el usuario
personal diegomorenov44-dotcom). Pendiente opcional: renombrar el repo dentro de la
organizacion a exactamente "finanzasuni.github.io" para eliminar tambien el sufijo
"/FinanzasUni/" y quedarse con la URL raiz limpia. Remoto de git local actualizado.
Bio de Instagram (branding/perfil-instagram.txt) actualizada con el enlace real.
→ [[tecnologia/web-finanzasuni]]

## [2026-08-08] diseno | Logos de FinanzasUni: monograma + 4 conceptos universitarios
Diego pidio logos para FinanzasUni con estetica de comunidad universitaria (aprender +
conocer gente, ambiente de jovenes emprendedores). Sin herramienta de generacion de
imagenes disponible, se construyeron en SVG (vectorial): primero un monograma "Fu" con
chispa (coral/dorado, conectado con la paleta de la web, ya usado como favicon en las
9 paginas), y despues 4 conceptos alternativos con paletas distintas e imagineria
universitaria real (birrete, libro con flecha de crecimiento, columnas clasicas,
skyline de campus con bandera). Sin decision tomada — pendiente de que Diego elija.
→ [[marca/logo-finanzasuni]]

## [2026-08-08] diseno | Elegido concepto 4 (Campus moderno), sin bandera
Diego elige el concepto 4 de los 4 propuestos (turquesa+coral, skyline de campus) y
pide quitar la bandera del edificio central. Aplicado. Pendiente: decidir si se
convierte en el logo/favicon definitivo (sustituyendo al monograma "Fu" actual).
→ [[marca/logo-finanzasuni]]

## [2026-08-08] diseno | Concepto 4 (Campus) confirmado como logo oficial definitivo
Diego confirma: el concepto 4 (campus turquesa+coral, sin bandera) sustituye al
monograma "Fu" como logo oficial de FinanzasUni. icon.svg y logo-horizontal.svg
actualizados a esta version; favicon de las 9 paginas de web/ reemplazado.
→ [[marca/logo-finanzasuni]]

## [2026-08-08] copy | Descripcion oficial de FinanzasUni elegida
Diego elige la version larga de las 3 propuestas para la descripcion de la
newsletter/publicacion en Beehiiv. Guardada como copy oficial reutilizable en
cualquier perfil futuro (web "Sobre mi", Beehiiv, etc.).
→ [[estrategia/finanzasuni]]

## [2026-08-08] tecnico | Anadidas etiquetas Open Graph / Twitter Card
La web no tenia meta tags de vista previa social — al compartir el enlace en
WhatsApp/Twitter/Facebook no aparecia tarjeta con imagen ni descripcion. Anadidas
etiquetas og:* y twitter:* en index.html, usando de imagen provisional el PNG del
logo que Diego ya habia exportado (web/social-preview.png, formato vertical, no
ideal 1200x630 pero funcional). Pendiente: crear una tarjeta social apaisada
propiamente dimensionada como mejora futura.
→ [[tecnologia/web-finanzasuni]]

## [2026-08-08] mantenimiento | Limpieza de wiki/tecnologia/web-finanzasuni.md
La pagina tenia informacion desactualizada (URL antigua, seccion "pendiente" que ya
no reflejaba el trabajo real hecho: traslado de organizacion, logo, favicon, OG tags,
fix de RSS). Consolidado en una seccion de estado actual y una lista de pendientes
real y vigente.
→ [[tecnologia/web-finanzasuni]]

## [2026-08-08] contenido | Comparativas de la web completadas con datos reales
Rellenada la seccion "Comparativas" de web/index.html con las 3 entidades ya
documentadas en wiki/conceptos/brokers-espana-comparativa.md (MyInvestor, DEGIRO,
Trade Republic), enlaces reales a cada web oficial (sin afiliacion todavia — texto de
transparencia corregido para no afirmar afiliacion que no existe), y el checklist de
que mirar antes de elegir. Tambien se confirmo que el sistema de noticias automaticas
si esta funcionando (commits del bot cada vez que se hace push; el cron diario aun no
ha tenido su primera ejecucion real porque el workflow se creo hoy).
→ [[tecnologia/web-finanzasuni]], [[conceptos/brokers-espana-comparativa]]

## [2026-08-08] contenido | Anadida Imagine a Comparativas (en evaluacion)
Diego pide anadir la app "Imagine" a las Comparativas de la web de cara a una posible
colaboracion de afiliacion futura. Anadida como 4a tarjeta, marcada explicitamente
"en evaluacion", sin reutilizar el codigo promocional del anuncio del podcast ni
cifras no verificadas de forma independiente — solo lo que se puede describir con
honestidad (que es una app de inversion con formacion previa). Actualizada la nota
de fuentes/registro.md que originalmente restringia reutilizar esta mencion.
→ [[tecnologia/web-finanzasuni]], [[fuentes/registro]]

## [2026-08-08] fix | Correccion: era "imagin" (CaixaBank), no "Imagine" (app del podcast)
Error de esta sesion: se anadio por error la tarjeta de Comparativas asumiendo que
Diego se referia a "Imagine", la app del anuncio patrocinado en una entrevista
ingerida. Diego se referia en realidad a "imagin" (sin e), la marca digital de
CaixaBank para jovenes — entidad real, publica, sin relacion con el anuncio.
Corregido el contenido de la tarjeta en web/index.html y la nota en
wiki/fuentes/registro.md que aplicaba mal la restriccion de esa fuente.
→ [[tecnologia/web-finanzasuni]], [[fuentes/registro]]
