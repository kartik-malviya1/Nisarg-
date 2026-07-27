import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { NewsEvents } from '@/components/NewsEvents'

export const metadata: Metadata = {
  title: 'News & Events — NISARG Foundation',
  description: 'Latest news, upcoming events, workshops, campaigns, and announcements from NISARG Foundation.',
}

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Staying connected to the ground."
        description="Workshop announcements, event recaps, campaign updates, and field news from NISARG Foundation."
      />
      <NewsEvents />
    </>
  )
}
