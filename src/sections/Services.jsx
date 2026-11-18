import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { services } from '../data/services.js'

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="border-y border-line bg-surface">
      <div className="container-page py-20 md:py-28">
        <SectionHeading
          id="servicios-title"
          eyebrow="Servicios"
          title="En qué te puedo ayudar"
          intro="Desde una web a medida hasta automatizar las tareas que hoy hacés a mano."
        />

        {/* Lista con separadores en lugar de tarjetas, para darle otro ritmo a la página */}
        <ul className="grid gap-x-10 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal as="li" key={service.title} delay={index * 60} className="border-t border-line py-7">
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{service.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{service.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
