// Diagrama del hero: un flujo de automatización al estilo n8n.
// Mensaje → Flujo → IA → App y datos. Los nodos se "encienden" en orden
// y las líneas punteadas se mueven (todo se detiene con prefers-reduced-motion).

// Cada nodo: posición (x, y), título, detalle y el retraso de su animación
const nodes = [
  { x: 16, y: 16, step: '01', title: 'Mensaje', detail: 'WhatsApp · web', delay: '0s' },
  { x: 234, y: 104, step: '02', title: 'Flujo', detail: 'n8n · Make', delay: '1.2s' },
  { x: 16, y: 192, step: '03', title: 'IA', detail: 'clasifica · responde', delay: '2.4s', highlight: true },
  { x: 234, y: 280, step: '04', title: 'App y datos', detail: 'React · SQL', delay: '3.6s' },
]

const W = 150 // ancho de cada nodo
const H = 64 // alto de cada nodo

// Curvas que conectan los nodos (comandos de path SVG)
const links = [
  'M166 48 C200 48 200 136 234 136',
  'M309 168 C309 184 91 176 91 192',
  'M91 256 C91 312 170 312 234 312',
]

export default function FlowDiagram() {
  return (
    <figure className="relative">
      <svg
        viewBox="0 0 400 360"
        className="h-auto w-full max-w-[440px]"
        role="img"
        aria-labelledby="flow-title flow-desc"
      >
        <title id="flow-title">Diagrama de un flujo de automatización</title>
        <desc id="flow-desc">
          Un mensaje entra a un flujo de n8n o Make, pasa por un paso de inteligencia artificial y termina guardado en una
          aplicación con base de datos.
        </desc>

        {/* Conexiones */}
        <g fill="none" strokeWidth="1.5">
          {links.map((d) => (
            <g key={d}>
              <path d={d} stroke="var(--color-line)" />
              <path d={d} stroke="var(--color-accent)" className="flow-line" />
            </g>
          ))}
        </g>

        {/* Nodos */}
        {nodes.map((node) => (
          <g key={node.step} transform={`translate(${node.x} ${node.y})`}>
            <rect
              width={W}
              height={H}
              rx="12"
              fill="var(--color-surface)"
              stroke={node.highlight ? 'var(--color-accent)' : 'var(--color-line)'}
              strokeWidth="1.5"
              className={node.highlight ? '' : 'flow-node'}
              style={{ animationDelay: node.delay }}
            />
            <text x="14" y="22" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--color-muted)">
              {node.step} · {node.detail}
            </text>
            <text x="14" y="47" fontFamily="var(--font-display)" fontSize="19" fontWeight="600" fill="var(--color-ink)">
              {node.title}
            </text>
            {/* Puertos de entrada y salida, como en los editores de flujos */}
            <circle cx="0" cy={H / 2} r="3.5" fill="var(--color-bg)" stroke="var(--color-muted)" />
            <circle cx={W} cy={H / 2} r="3.5" fill="var(--color-bg)" stroke="var(--color-muted)" />
          </g>
        ))}
      </svg>
    </figure>
  )
}
