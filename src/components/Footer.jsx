import { site } from '../data/site.js'
import { GitHub, LinkedIn, Mail } from './Icons.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = [
    { label: 'LinkedIn', href: site.linkedin, Icon: LinkedIn },
    { label: 'GitHub', href: site.github, Icon: GitHub },
    { label: 'Email', href: `mailto:${site.email}`, Icon: Mail },
  ]

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {site.role} · {site.location} · © {year}
          </p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
              >
                <Icon width={16} height={16} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
