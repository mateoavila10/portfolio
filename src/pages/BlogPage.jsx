import ArticleCard from '../components/ArticleCard.jsx'
import Seo from '../components/Seo.jsx'
import { posts } from '../lib/posts.js'

export default function BlogPage() {
  return (
    <div className="container-page pb-24 pt-28 md:pt-40">
      <Seo
        title="Blog"
        description="Casos de estudio de Mateo Avila: cómo resolví problemas reales de desarrollo web, bases de datos y seguridad."
        path="/blog"
      />

      <header className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">Blog</p>
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Casos de estudio
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Notas sobre problemas concretos que me tocó resolver: qué pasaba, qué opciones evalué y qué terminé haciendo.
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
