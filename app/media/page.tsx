import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Gallery } from '@/components/Gallery'

export const metadata: Metadata = {
  title: 'Media — NISARG Foundation',
  description: 'Photo gallery, event coverage, and visual stories from NISARG Foundation\'s field work, workshops, and community events across Madhya Pradesh.',
}

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Visual stories from the field."
        description="Photos and moments from workshops, village gatherings, agricultural demonstrations, tree plantations, and community events."
      />
      <Gallery />
    </>
  )
}
