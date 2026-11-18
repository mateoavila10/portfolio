import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFoundPage() {
  return (
    <div className="container-page pb-24 pt-36 md:pt-48">
      <Seo title="Página no encontrada" description="La página que buscás no existe." path="/404" />
      <p className="font-mono text-sm text-accent">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">Esta página no existe</h1>
      <p className="mt-4 max-w-lg text-lg text-muted">Puede que el enlace esté mal escrito o que el contenido se haya movido.</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-bg transition-transform hover:-translate-y-0.5"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
