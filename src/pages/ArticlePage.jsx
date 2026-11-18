import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from '../components/Icons.jsx'
import Seo from '../components/Seo.jsx'
import { formatDate, getPostBySlug } from '../lib/posts.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function ArticlePage() {
  // ":slug" de la ruta /blog/:slug (el nombre del archivo .md sin extensión)
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <NotFoundPage />

  return (
    <article className="container-page pb-24 pt-28 md:pt-36">
      <Seo title={post.title} description={post.summary} path={`/blog/${post.slug}`} type="article" />

      <div className="mx-auto max-w-[42rem]">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
          <ArrowLeft width={16} height={16} />
          Volver al blog
        </Link>

        <header className="mt-10 border-b border-line pb-10">
          <p className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted">
            <span className="text-accent">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{post.summary}</p>
        </header>

        {/* react-markdown convierte el texto Markdown en HTML; remark-gfm suma tablas y listas de tareas */}
        <div className="prose-article mt-10">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>

        <footer className="mt-16 border-t border-line pt-8">
          <p className="text-muted">¿Te interesa hablar de algo de esto?</p>
          <Link
            to={{ pathname: '/', hash: '#contacto' }}
            className="mt-2 inline-block font-medium underline decoration-accent decoration-2 underline-offset-4"
          >
            Escribime
          </Link>
        </footer>
      </div>
    </article>
  )
}
