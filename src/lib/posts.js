// Carga los artículos del blog desde /src/content/blog.
//
// import.meta.glob es una función de Vite: junta todos los .md de la carpeta
// en tiempo de build. Con query '?raw' obtenemos el texto tal cual.
// Para agregar un artículo nuevo basta con crear otro .md en esa carpeta.

const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Separa el bloque de datos del inicio (entre líneas ---) del resto del texto.
// Formato esperado:
// ---
// title: Mi título
// date: 2026-01-31
// category: Backend
// summary: Una línea de resumen
// ---
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':')
    if (separator === -1) continue
    const key = line.slice(0, separator).trim()
    // Quita comillas opcionales alrededor del valor
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '')
    data[key] = value
  }
  return { data, content: match[2] }
}

// Convierte "../content/blog/mi-articulo.md" en "mi-articulo"
function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

// Lista de artículos, del más nuevo al más viejo
export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: data.title || 'Sin título',
      date: data.date || '',
      category: data.category || 'General',
      summary: data.summary || '',
      content,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}

// "2026-11-10" → "10 de noviembre de 2026"
export function formatDate(isoDate) {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-').map(Number)
  // Se crea la fecha en hora local para evitar que se corra un día por la zona horaria
  return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
