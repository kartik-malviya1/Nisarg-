'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import Link from 'next/link'

const initiatives = [
  {
    date: 'Mar 2026',
    category: 'Agriculture',
    categoryColor: 'var(--leaf-700)',
    title: 'Soil Health Card Distribution — Sehore Block',
    excerpt: 'NISARG and the Agriculture Department jointly distributed 45 soil health cards to marginal farmers in Sehore, enabling targeted nutrient management.',
    href: '/projects',
  },
  {
    date: 'Feb 2026',
    category: 'Women',
    categoryColor: 'var(--turmeric-600)',
    title: 'SHG Market Linkage Camp — Barwani',
    excerpt: 'Self-Help Group members showcased locally produced pickles, oils, and handicrafts at the district-level enterprise mela, connecting 80+ women to buyers.',
    href: '/projects',
  },
  {
    date: 'Jan 2026',
    category: 'Environment',
    categoryColor: '#2d6b1f',
    title: 'Earth Day Campaign — Tree Plantation Drive',
    excerpt: 'Students, farmers, and community members planted 500+ saplings across five villages in a single day, reviving local agroforestry corridors.',
    href: '/projects',
  },
  {
    date: 'Dec 2025',
    category: 'WASH',
    categoryColor: 'var(--water-600)',
    title: 'World Water Day — Community Water Pledge',
    excerpt: 'Collective pledges on rainwater harvesting and preventing wastage, paired with awareness on open defecation and groundwater recharge.',
    href: '/projects',
  },
]

export function LatestInitiatives() {
  useScrollReveal()
  return (
    <section className="latest-initiatives" id="latest-initiatives">
      <div className="wrap">
        <div className="li-header reveal">
          <div>
            <div className="eyebrow">Latest Initiatives</div>
            <h2>Fresh from the field.</h2>
          </div>
          <Link href="/projects" className="btn btn-dark li-view-all">
            All Initiatives →
          </Link>
        </div>

        <div className="li-grid reveal-stagger">
          {initiatives.map((item, i) => (
            <Link key={i} href={item.href} className="li-card">
              <div className="li-card-meta">
                <span
                  className="li-category"
                  style={{ color: item.categoryColor }}
                >
                  {item.category}
                </span>
                <span className="li-date">{item.date}</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.excerpt}</p>
              <span className="li-read-more">Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
