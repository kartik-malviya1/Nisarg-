'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import Link from 'next/link'

const programmes = [
  {
    id: 1,
    tag: 'Agriculture',
    title: 'Regenerative Agriculture',
    desc: 'Restoring soil health and reducing chemical inputs through bio-inputs, composting, and sustainable farming practices across 8 districts.',
    icon: '🌱',
    color: 'var(--leaf-700)',
    bg: 'rgba(61,133,26,0.06)',
    href: '/programs',
  },
  {
    id: 2,
    tag: 'Women',
    title: 'Women Enterprise Promotion',
    desc: 'Market-linkage, branding and enterprise skills for women-led SHGs in Barwani and surrounding blocks.',
    icon: '👩‍🌾',
    color: 'var(--turmeric-600)',
    bg: 'rgba(216,155,46,0.07)',
    href: '/programs',
  },
  {
    id: 3,
    tag: 'WASH',
    title: 'Water & Sanitation',
    desc: 'Community pledges on rainwater harvesting, water-recharge and hygiene awareness in partnership with local bodies.',
    icon: '💧',
    color: 'var(--water-600)',
    bg: 'rgba(45,15,128,0.06)',
    href: '/programs',
  },
  {
    id: 4,
    tag: 'Capacity Building',
    title: 'Farmer Training (ToT)',
    desc: 'Three-day Master Trainer programme with 30 participants across 4 states, building a field-level trainer network.',
    icon: '🏛️',
    color: 'var(--leaf-700)',
    bg: 'rgba(61,133,26,0.06)',
    href: '/programs',
  },
  {
    id: 5,
    tag: 'Environment',
    title: 'Tree Plantation Drive',
    desc: 'Annual plantation campaigns aligned with Earth Day and World Environment Day, supporting biodiversity and carbon sequestration.',
    icon: '🌳',
    color: '#2d6b1f',
    bg: 'rgba(45,107,31,0.06)',
    href: '/programs',
  },
  {
    id: 6,
    tag: 'Livelihoods',
    title: 'FPO Development',
    desc: 'Building robust Farmer Producer Organisations to enable collective bargaining, shared resources, and market access.',
    icon: '🤝',
    color: 'var(--water-700)',
    bg: 'rgba(32,5,99,0.05)',
    href: '/programs',
  },
]

export function FeaturedProgrammes() {
  useScrollReveal()
  return (
    <section className="featured-programmes" id="featured-programmes">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Featured Programmes</div>
          <h2>What we do on the ground.</h2>
          <p>
            Six flagship programme areas that define how NISARG works with
            communities — spanning agriculture, livelihoods, environment, and
            governance.
          </p>
        </div>

        <div className="fp-grid reveal-stagger">
          {programmes.map((p) => (
            <Link key={p.id} href={p.href} className="fp-card">
              <div
                className="fp-icon"
                style={{ background: p.bg, color: p.color }}
              >
                <span>{p.icon}</span>
              </div>
              <span
                className="fp-tag"
                style={{ color: p.color, background: p.bg }}
              >
                {p.tag}
              </span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
              <span className="fp-arrow" style={{ color: p.color }}>
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        <div className="fp-cta reveal" style={{ textAlign: 'center', marginTop: '52px' }}>
          <Link href="/programs" className="btn btn-dark">
            View All Programmes
          </Link>
        </div>
      </div>
    </section>
  )
}
