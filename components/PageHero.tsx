interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <div className="page-hero">
      <div className="page-hero-inner">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}
