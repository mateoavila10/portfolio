// Título de sección: una etiqueta chica arriba ("eyebrow"), el título y un texto opcional.
export default function SectionHeading({ id, eyebrow, title, intro }) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h2 id={id} className="font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  )
}
