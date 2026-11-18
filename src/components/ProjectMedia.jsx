// Captura del proyecto. Si todavía no hay imagen, muestra un placeholder
// (el archivo /public/projects/placeholder.svg) con el nombre del proyecto.
export default function ProjectMedia({ image, name }) {
  if (image) {
    return (
      <img
        src={image}
        alt={`Captura de pantalla de ${name}`}
        loading="lazy"
        className="aspect-[16/10] w-full rounded-xl border border-line object-cover object-top"
      />
    )
  }

  return (
    <div
      className="relative flex aspect-[16/10] w-full items-end overflow-hidden rounded-xl border border-dashed border-line bg-bg bg-cover bg-center p-5"
      style={{ backgroundImage: 'url(/projects/placeholder.svg)' }}
      role="img"
      aria-label={`Espacio reservado para una captura de ${name}`}
    >
      <p className="font-mono text-xs text-muted">Captura en preparación</p>
    </div>
  )
}
