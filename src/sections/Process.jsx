import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { processSteps } from '../data/services.js'

export default function Process() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="container-page py-20 md:py-28">
      <SectionHeading
        id="proceso-title"
        eyebrow="Cómo trabajo"
        title="Un proceso en cuatro pasos"
        intro="Simple y sin sorpresas: sabés en qué etapa estamos y qué viene después."
      />

      <ol className="grid gap-6 md:grid-cols-2">
        {processSteps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 80} className="rounded-2xl border border-line p-6 md:p-8">
            <p className="font-mono text-sm text-accent">Paso {index + 1}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
