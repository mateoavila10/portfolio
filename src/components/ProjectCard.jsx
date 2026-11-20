import { ArrowUpRight, GitHub, Lock } from './Icons.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import Tag from './Tag.jsx'

// Tarjeta de un proyecto. "index" viene de la lista y se muestra como 01, 02, 03...
export default function ProjectCard({ project, index }) {
  const number = String(index + 1).padStart(2, '0')
  const headingId = `proyecto-${number}`

  return (
    <article
      aria-labelledby={headingId}
      className="grid gap-8 rounded-2xl border border-line bg-surface p-6 md:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10"
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-5xl font-semibold leading-none text-accent md:text-6xl" aria-hidden="true">
            {number}
          </span>
          {project.private && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-[0.72rem] text-muted">
              <Lock width={13} height={13} />
              Código privado
            </span>
          )}
        </div>

        <h3 id={headingId} className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-1.5 text-lg text-ink">{project.pitch}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        {project.features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-[0.95rem] leading-snug">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ul>

        {/* Botones: sitio publicado (principal) y código en GitHub (secundario). Cada uno aparece solo si tiene link. */}
        {(project.url || project.repoUrl) && (
          <div className="mt-7 flex flex-wrap gap-3 lg:mt-auto lg:pt-7">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                {project.urlLabel || 'Visitar sitio'}
                <ArrowUpRight width={16} height={16} />
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
              >
                <GitHub width={16} height={16} />
                Ver código
                <span className="sr-only">en GitHub (se abre en una pestaña nueva)</span>
              </a>
            )}
          </div>
        )}
      </div>

      <ProjectMedia image={project.image} name={project.name} />
    </article>
  )
}
