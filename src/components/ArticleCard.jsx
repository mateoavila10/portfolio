import { Link } from 'react-router-dom'
import { formatDate } from '../lib/posts.js'
import { ArrowRight } from './Icons.jsx'

// Vista previa de un artículo del blog (se usa en la home y en /blog)
export default function ArticleCard({ post }) {
  return (
    <article className="group relative flex h-full flex-col border-t border-line pt-6">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
        <span className="text-accent">{post.category}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
        {/* El ::after hace que toda la tarjeta sea clickeable sin anidar enlaces */}
        <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{post.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium" aria-hidden="true">
        Leer artículo
        <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  )
}
