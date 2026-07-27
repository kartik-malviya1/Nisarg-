'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const allItems = [
  {
    type: 'News',
    date: 'Apr 15, 2026',
    category: 'Agriculture',
    title: 'NISARG Expands Regenerative Agriculture Training to Dewas District',
    excerpt: 'Following the success of the 8-district orientation programme, NISARG has begun planning Phase 2 expansion into Dewas, Harda, and Khandwa districts with a target of 500 additional farmers.',
    tag: 'Expansion',
  },
  {
    type: 'Event',
    date: 'Apr 22, 2026',
    category: 'Environment',
    title: 'Earth Day Plantation Drive — Register Now',
    excerpt: 'NISARG invites schools, colleges, and community groups to participate in our annual Earth Day plantation drive. Target: 1,000 saplings planted across 10 villages in one day.',
    tag: 'Upcoming',
  },
  {
    type: 'News',
    date: 'Mar 28, 2026',
    category: 'Women',
    title: 'Barwani SHG Women Showcase at State Enterprise Mela',
    excerpt: 'Sixteen self-help groups from Barwani district displayed their products at the MP State Enterprise Mela, securing forward contracts with 5 buyers.',
    tag: 'Achievement',
  },
  {
    type: 'Event',
    date: 'May 5, 2026',
    category: 'Agriculture',
    title: 'Organic Farming Workshop — Sehore Block',
    excerpt: 'One-day practical workshop on jeevamrit preparation, botanical pest management, and crop rotation for organic farming. Open to all registered farmers.',
    tag: 'Workshop',
  },
  {
    type: 'News',
    date: 'Mar 22, 2026',
    category: 'WASH',
    title: 'World Water Day — 200 Community Members Take Water Conservation Pledge',
    excerpt: 'NISARG marked World Water Day 2026 with a community pledge drive in Sehore, with over 200 participants committing to rainwater harvesting and water-recharge practices.',
    tag: 'Campaign',
  },
  {
    type: 'Event',
    date: 'Jun 5, 2026',
    category: 'Environment',
    title: 'World Environment Day Campaign Planning Meeting',
    excerpt: 'Internal planning meeting for the World Environment Day 2026 campaign. Partners, volunteers, and community representatives are invited to contribute ideas.',
    tag: 'Upcoming',
  },
  {
    type: 'News',
    date: 'Feb 10, 2026',
    category: 'Governance',
    title: 'NISARG Participates in National CSO Capacity-Building Workshop',
    excerpt: 'NISARG team attended FMSF Delhi\'s annual workshop on financial management, institutional governance, and accountability standards for civil society organisations.',
    tag: 'Learning',
  },
  {
    type: 'Event',
    date: 'May 20, 2026',
    category: 'Agriculture',
    title: 'FPO Development Workshop — Building Farmer Collectives',
    excerpt: 'Full-day workshop on Farmer Producer Organisation governance, member mobilisation, and financial management. Co-facilitated with Solidaridad and tanX Innovations.',
    tag: 'Workshop',
  },
]

export function NewsEvents() {
  useScrollReveal()
  const [active, setActive] = useState('All')

  const tabs = ['All', 'News', 'Events', 'Workshops', 'Campaigns']
  const displayed = active === 'All'
    ? allItems
    : active === 'Workshops'
    ? allItems.filter(i => i.tag === 'Workshop')
    : active === 'Campaigns'
    ? allItems.filter(i => i.tag === 'Campaign')
    : allItems.filter(i => i.type === active)

  const getTagColor = (tag: string) => {
    const map: Record<string, string> = {
      Upcoming: 'var(--water-600)',
      Workshop: 'var(--leaf-700)',
      Campaign: '#2d6b1f',
      Achievement: 'var(--turmeric-600)',
      Expansion: 'var(--leaf-700)',
      Learning: 'var(--water-600)',
    }
    return map[tag] || 'var(--ink-soft)'
  }

  return (
    <section className="news-section" id="news">
      <div className="wrap">
        <div className="filter-row reveal">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`filter-btn ${active === tab ? 'active' : ''}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="news-grid reveal-stagger">
          {displayed.map((item, i) => (
            <div key={i} className={`news-card ${item.type.toLowerCase()}`}>
              <div className="news-card-header">
                <span
                  className="news-type"
                  style={{
                    background: item.type === 'Event' ? 'rgba(32,5,99,0.08)' : 'rgba(84,166,51,0.1)',
                    color: item.type === 'Event' ? 'var(--water-600)' : 'var(--leaf-700)',
                  }}
                >
                  {item.type === 'Event' ? '📅' : '📰'} {item.type}
                </span>
                <span
                  className="news-tag"
                  style={{ color: getTagColor(item.tag), borderColor: getTagColor(item.tag) }}
                >
                  {item.tag}
                </span>
              </div>
              <div className="news-meta">
                <span className="news-date">{item.date}</span>
                <span className="news-category">{item.category}</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
