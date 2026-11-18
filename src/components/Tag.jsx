// Etiqueta chica para tecnologías
export default function Tag({ children }) {
  return (
    <li className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.72rem] leading-none text-muted">
      {children}
    </li>
  )
}
