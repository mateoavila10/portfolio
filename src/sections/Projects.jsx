import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="container-page py-20 md:py-28">
      <SectionHeading
        id="proyectos-title"
        eyebrow="Proyectos"
        title="Lo que construí"
        intro="Varios son de código privado, así que no hay link. Igual te cuento qué resuelven y cómo están hechos."
      />

      <div className="space-y-6 md:space-y-8">
        {projects.map((project, index) => (
          <Reveal key={project.name}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
