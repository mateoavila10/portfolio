import { Link } from 'react-router-dom'
import FlowDiagram from '../components/FlowDiagram.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import { site } from '../data/site.js'

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="container-page pb-20 pt-28 md:pb-28 md:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
        <div>
          <p className="mb-6 flex items-start gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className="mt-[0.3em] h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {site.location} · {site.availability.toLowerCase()}
          </p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.9rem,9vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.035em]"
          >
            Mateo
            <br />
            Andrés Avila
          </h1>

          <p className="mt-7 max-w-xl text-xl leading-snug text-muted md:text-2xl">
            Desarrollador Full-Stack que también{' '}
            <span className="text-ink underline decoration-accent decoration-2 underline-offset-4">
              automatiza procesos con IA
            </span>
            .
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to={{ pathname: '/', hash: '#proyectos' }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              Ver proyectos
              <ArrowRight width={17} height={17} />
            </Link>
            <Link
              to={{ pathname: '/', hash: '#contacto' }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-medium transition-colors hover:border-ink"
            >
              Contactame
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <FlowDiagram />
        </div>
      </div>
    </section>
  )
}
