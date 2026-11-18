import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { posts } from '../lib/posts.js'

// Muestra los últimos 3 artículos y un enlace al blog completo
export default function BlogPreview() {
  const latest = posts.slice(0, 3)

  return (
    <section id="blog" aria-labelledby="blog-title" className="container-page py-20 md:py-28">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading
          id="blog-title"
          eyebrow="Blog"
          title="Casos de estudio"
          intro="Problemas concretos que resolví, contados con el detalle técnico y las decisiones que tomé."
        />
        <Link
          to="/blog"
          className="mb-10 inline-flex shrink-0 items-center gap-2 font-medium underline decoration-accent decoration-2 underline-offset-4 md:mb-14"
        >
          Ver todos los artículos
          <ArrowRight width={16} height={16} />
        </Link>
      </div>

      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {latest.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
