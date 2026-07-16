import type { Metadata } from 'next'
import { Impact } from '@/components/Impact'
import { Gallery } from '@/components/Gallery'
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
      <Gallery />
    </>
  )
}
