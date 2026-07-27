import type { Metadata } from 'next'
import { Impact } from '@/components/Impact'
import { PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Impact — NISARG Foundation',
  description: 'Discover the measurable impact of NISARG Foundation\'s work — farmers reached, districts covered, and communities transformed through regenerative agriculture.',
}

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Measuring Change"
        title="Impact that speaks for itself."
        description="Numbers, stories, and moments from the field — the proof that regenerative agriculture works."
      />
      <Impact />
      
      <section className="gallery-preview-cta" style={{ background: 'var(--white)', padding: '80px 0', borderTop: '1px solid rgba(84, 166, 51, 0.1)' }}>
        <div className="wrap">
          <div className="cta-content" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow" style={{ color: 'var(--primary-green)', marginBottom: '12px' }}>Visual Stories</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px', color: 'var(--ink)' }}>Field Work & Community Moments</h2>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '30px', fontSize: '15px' }}>
              Explore our complete collection of photo stories capturing on-the-ground interventions, soil workshops, self-help groups, and agricultural demonstrations.
            </p>
            <a href="/gallery" className="btn btn-primary">
              View Photo Gallery →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
