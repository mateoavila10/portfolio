import { useState } from 'react'
import { Check, Copy } from './Icons.jsx'

// Botón que copia el email al portapapeles y avisa que se copió.
export default function CopyEmailButton({ email, className = '' }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Plan B para navegadores sin acceso al portapapeles
      window.prompt('Copiá el email:', email)
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <>
      <button type="button" onClick={handleCopy} className={className}>
        {copied ? <Check /> : <Copy />}
        {copied ? 'Email copiado' : 'Copiar email'}
      </button>
      {/* aria-live hace que los lectores de pantalla anuncien el cambio */}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email copiado al portapapeles' : ''}
      </span>
    </>
  )
}
