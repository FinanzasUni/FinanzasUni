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

## ✅ Decisión de marca resuelta (2026-08-08)

Dos ramas **independientes**, no un rebrand único:

1. **Arquitectura Financiera** (Instagram, `@arquitectura_financieralife`) — marca
   personal de Diego en solitario. Sigue su propio plan de bloques (ver
   [[../estrategia/pilares-contenido]]).
2. **FinanzasUni** — proyecto **conjunto con un amigo** de Diego, de mayor ambición:
   web + newsletter + entrevistas/foros universitarios (ver sección siguiente). No es
   la cuenta de Instagram de Diego "con otro nombre" — es un proyecto distinto, con
   otro socio, aunque el contenido de fondo (educación financiera) sea similar y pueda
   haber reutilización de conceptos entre ambos.

Motivo del cambio de rumbo: FinanzasUni ha crecido en alcance (entrevistas, foro
universitario, un socio) hasta ser un proyecto propio, no una sombrilla para
Instagram. Los 6 posts ya publicados en `@arquitectura_financieralife` se quedan tal
cual, sin necesidad de rehacer nada — el problema de handle/hashtags grabados en las
imágenes (ver [[../fuentes/registro]]) ya no aplica porque no hay fusión de marcas.

## 🎓 FinanzasUni como foro universitario (nuevo alcance, 2026-08-08)

Diego quiere expandir el formato **FEEC (Foro Económico Empresarial Caminos)** de la
Escuela de Caminos a otras universidades/facultades de Madrid. Socio: un amigo de
Diego, con quien todavía está cerrando los detalles del proyecto conjunto.

**Piezas del proyecto**:
- Web (`web/`, ya publicada) + newsletter (Beehiiv, en configuración).
- Entrevistas/conversaciones con profesionales de distintos sectores (sanidad,
  finanzas/economía, ingeniería, derecho) para dar su visión de la actualidad a
  estudiantes universitarios.
- Contacto con profesores dentro de las universidades como vía de entrada
  institucional para poder lanzar el foro facultad a facultad — **pendiente de
  conseguir el primer contacto**.

Ver desarrollo completo (puntos a cerrar con el socio, candidatos a invitar, temas por
sector) en [[feec-finanzasuni]].

## ⚠️ Pendiente de definir con el socio

Diego va a hablar con su amigo todos los puntos del proyecto conjunto antes de
arrancar a trabajar codo con codo — **no hay todavía acuerdo de reparto de roles,
marca compartida ni modelo de decisión conjunta**. No asumir en contenido futuro que
esto ya está cerrado.

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

## Copy oficial — descripción de la newsletter/publicación (elegida 2026-08-08)

Diego eligió esta versión (de tres propuestas) como descripción oficial de FinanzasUni
para Beehiiv y cualquier otro perfil ("Sobre nosotros", bio larga):

> Nadie nos enseñó a manejar el dinero. En FinanzasUni lo aprendemos juntos: ahorro,
> inversión, cripto y actualidad económica explicados sin rodeos, sin promesas
> imposibles y siempre con contexto español real. No es una cátedra — es una comunidad
> de gente que está empezando, como tú, y que prefiere entender las cosas antes de
> lanzarse. Cada semana, una idea que puedes aplicar de verdad.

Reutilizar este texto (no reescribirlo) en cualquier sitio donde se necesite una
descripción larga de FinanzasUni — perfil de Beehiiv, página "Sobre mí" de la web
(ver [[../tecnologia/web-finanzasuni]]), futuras plataformas. Coherente con
[[../marca/voz-y-tono]] y con el logo de campus elegido en [[../marca/logo-finanzasuni]].

## Pendiente

- Diego mencionó una presentación propia sobre su visión de las finanzas y la
  actualidad económica — **no se ha recibido el archivo todavía**. Cuando llegue,
  ingerir como fuente nueva siguiendo el flujo habitual (ver `CLAUDE.md`).
- Decisión de rebrand (ver arriba).
