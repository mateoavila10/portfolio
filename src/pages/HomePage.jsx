import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { site } from '../data/site.js'
import About from '../sections/About.jsx'
import BlogPreview from '../sections/BlogPreview.jsx'
import Contact from '../sections/Contact.jsx'
import Hero from '../sections/Hero.jsx'
import Process from '../sections/Process.jsx'
import Projects from '../sections/Projects.jsx'
import Services from '../sections/Services.jsx'

export default function HomePage() {
  const location = useLocation()

  // Cuando la URL trae un "#seccion" (por ejemplo desde la nav), scrolleamos hasta esa sección.
  // Usamos location.key para que funcione aunque se haga clic dos veces en el mismo enlace.
  // Esperamos a que carguen las tipografías: si no, el hero cambia de alto después del scroll y queda corto.
  useEffect(() => {
    if (!location.hash) return
    const scrollToSection = () => document.getElementById(location.hash.slice(1))?.scrollIntoView()
    scrollToSection()
    document.fonts?.ready.then(scrollToSection)
  }, [location.hash, location.key])

  return (
    <>
      <Seo
        description={`${site.name}, desarrollador Full-Stack en ${site.location}. Aplicaciones web con React, Node.js y SQL, y automatizaciones con IA (n8n, Make, ManyChat).`}
        path="/"
      />
      <Hero />
      <Projects />
      <Services />
      <Process />
      <About />
      <BlogPreview />
      <Contact />
    </>
  )
}
