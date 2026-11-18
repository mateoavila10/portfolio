import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/site.js'
import { Close, Menu } from './Icons.jsx'

// Navegación fija arriba. En mobile se convierte en un menú desplegable.
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Agrega un borde inferior cuando la página ya scrolleó un poco
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú mobile con la tecla Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-bg/85 backdrop-blur-md transition-colors ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Saltar al contenido
      </a>

      <nav aria-label="Principal" className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>

        {/* Enlaces en escritorio */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={{ pathname: '/', hash: `#${link.id}` }}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón del menú mobile */}
        <button
          type="button"
          className="-mr-2 rounded-md p-2 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <Close width={22} height={22} /> : <Menu width={22} height={22} />}
        </button>
      </nav>

      {/* Menú mobile */}
      {open && (
        <ul id="menu-mobile" className="container-page flex flex-col pb-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.id} className="border-t border-line">
              <Link
                to={{ pathname: '/', hash: `#${link.id}` }}
                className="block py-3.5 font-display text-xl"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
