import { siteFooter } from "@/lib/config"

export function Footer() {
  const year = siteFooter.copyright.year ?? new Date().getFullYear()
  const parts: React.ReactNode[] = []

  // Copyright
  parts.push(
    <span key="copyright">
      © {year} {siteFooter.copyright.name}
    </span>
  )

  // Email
  if (siteFooter.contact.email) {
    parts.push(
      <a
        key="email"
        href={`mailto:${siteFooter.contact.email}`}
        className="hover:underline"
      >
        {siteFooter.contact.email}
      </a>
    )
  }

  // Social links
  for (const link of siteFooter.contact.links) {
    parts.push(
      <a
        key={link.label}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {link.label}
      </a>
    )
  }

  // ICP
  if (siteFooter.icp) {
    parts.push(<span key="icp">{siteFooter.icp}</span>)
  }

  return (
    <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t">
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && " · "}
          {part}
        </span>
      ))}
    </footer>
  )
}
