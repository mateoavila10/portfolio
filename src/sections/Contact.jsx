import CopyEmailButton from '../components/CopyEmailButton.jsx'
import { GitHub, LinkedIn, Mail } from '../components/Icons.jsx'
import { site } from '../data/site.js'

export default function Contact() {
  // Asunto prearmado para el mailto (encodeURIComponent convierte espacios y acentos)
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Consulta desde tu portfolio')}`

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-ink text-bg">
      <div className="container-page py-20 md:py-28">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] opacity-70">Contacto</p>
        <h2
          id="contacto-title"
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
        >
          ¿Tenés un proyecto o una búsqueda abierta? Hablemos.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-75">
          Busco mi primer trabajo como desarrollador y tomo proyectos freelance. {site.availability}. Escribime y te
          respondo a la brevedad.
        </p>

        <p className="mt-10 break-all font-display text-2xl font-medium md:text-3xl">{site.email}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            <Mail />
            Enviar email
          </a>
          <CopyEmailButton
            email={site.email}
            className="inline-flex items-center gap-2 rounded-full border border-bg/30 px-6 py-3 font-medium transition-colors hover:border-bg"
          />
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-bg/15 pt-8">
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
            >
              <GitHub /> GitHub
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
            >
              <LinkedIn /> LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
