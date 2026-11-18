import { useEffect } from 'react'
import { site } from '../data/site.js'

// Busca una etiqueta <meta> en el <head> y le cambia el contenido (la crea si no existe)
function setMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

// Actualiza el título, la descripción, Open Graph y la URL canónica de cada página.
// Uso: <Seo title="Blog" description="..." path="/blog" />
export default function Seo({ title, description, path = '/', type = 'website' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.shortName}` : `${site.shortName} — ${site.role} y automatizaciones con IA`
    const url = `${site.url}${path}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, path, type])

  return null
}
