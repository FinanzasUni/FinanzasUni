// Genera web/data/noticias.json a partir de feeds RSS gratuitos de medios
// económicos en español. Pensado para ejecutarse a diario vía GitHub Actions
// (ver .github/workflows/actualizar-web.yml), pero también se puede correr a mano:
//
//   cd scripts && npm install && node fetch-noticias.js
//
// No reproduce el artículo completo de ninguna fuente — solo título, un resumen
// corto (recortado del feed) y el enlace a la fuente original. Ver la nota legal
// en wiki/estrategia/finanzasuni.md sobre por qué esto es así.

import Parser from 'rss-parser';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'web', 'data', 'noticias.json');
const MAX_POR_FEED = 3;
const MAX_TOTAL = 9;
const RESUMEN_MAX_CHARS = 180;

// Feeds RSS gratuitos y públicos de economía en español.
// Si alguno deja de funcionar (los medios cambian sus URLs de RSS de vez en
// cuando), quítalo de la lista o busca el nuevo endpoint en la web del medio.
const FEEDS = [
  { nombre: 'Expansión', url: 'https://e00-expansion.uecdn.es/rss/portada.xml' },
  { nombre: 'Cinco Días', url: 'https://cincodias.elpais.com/rss/economia/portada.xml' },
  { nombre: 'El Economista', url: 'https://www.eleconomista.es/rss/rss-economia.php' },
];

function limpiarResumen(texto) {
  if (!texto) return '';
  const sinHtml = texto.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return sinHtml.length > RESUMEN_MAX_CHARS
    ? sinHtml.slice(0, RESUMEN_MAX_CHARS).trim() + '…'
    : sinHtml;
}

async function main() {
  const parser = new Parser();
  const noticias = [];

  for (const feed of FEEDS) {
    try {
      const resultado = await parser.parseURL(feed.url);
      const items = (resultado.items || []).slice(0, MAX_POR_FEED);
      for (const item of items) {
        noticias.push({
          titulo: item.title || '(sin título)',
          resumen: limpiarResumen(item.contentSnippet || item.content || item.summary),
          fuente: feed.nombre,
          enlace: item.link,
          fecha: item.isoDate || item.pubDate || null,
        });
      }
      console.log(`OK  ${feed.nombre}: ${items.length} noticias`);
    } catch (err) {
      console.error(`FALLO ${feed.nombre}: ${err.message} — se omite esta fuente en esta ejecución`);
    }
  }

  // Ordena por fecha (más reciente primero) cuando hay fecha disponible.
  noticias.sort((a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0));

  const salida = {
    actualizado: new Date().toISOString().slice(0, 16).replace('T', ' '),
    noticias: noticias.slice(0, MAX_TOTAL),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(salida, null, 2), 'utf-8');
  console.log(`Escrito ${OUTPUT_PATH} con ${salida.noticias.length} noticias.`);
}

main().catch(err => {
  console.error('Error general en fetch-noticias.js:', err);
  process.exit(1);
});
