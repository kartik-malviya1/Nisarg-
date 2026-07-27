import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Gallery } from '@/components/Gallery'

export const metadata: Metadata = {
  title: 'Gallery — NISARG Foundation',
  description: 'Explore visual stories, community moments, soil workshops, and field work highlighting NISARG Foundation\'s activities across rural Madhya Pradesh.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Photo Gallery"
        title="Visual stories from the field."
        description="Highlights and key moments from our workshops, village gatherings, agricultural demonstrations, and team activities."
      />
      <Gallery />
    </>
  )
}
