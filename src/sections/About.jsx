import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Tag from '../components/Tag.jsx'
import { bio, education, languages, stack } from '../data/about.js'

export default function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="border-y border-line bg-surface">
      <div className="container-page py-20 md:py-28">
        <SectionHeading id="sobre-mi-title" eyebrow="Sobre mí" title="Código prolijo para problemas reales" />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Columna izquierda: bio, formación e idiomas */}
          <div>
            <div className="space-y-5 text-lg leading-relaxed">
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Formación</dt>
                {education.map((item) => (
                  <dd key={item.title} className="mt-3">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-muted">{item.place}</p>
                    <p className="font-mono text-sm text-muted">{item.detail}</p>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Idiomas</dt>
                {languages.map((language) => (
                  <dd key={language.name} className="mt-3">
                    <span className="font-semibold">{language.name}</span>{' '}
                    <span className="text-muted">— {language.level}</span>
                  </dd>
                ))}
              </div>
            </dl>
          </div>

          {/* Columna derecha: stack agrupado */}
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Stack</h3>
            <div className="mt-3 divide-y divide-line border-y border-line">
              {stack.map((group) => (
                <div key={group.group} className="grid gap-3 py-5 sm:grid-cols-[8.5rem_1fr]">
                  <p className="font-display font-semibold">{group.group}</p>
                  <ul className="flex flex-wrap gap-1.5" aria-label={group.group}>
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
