import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Team } from '@/components/Team'

export const metadata: Metadata = {
  title: 'Our Team — NISARG Foundation',
  description: 'Meet the leadership, directors, advisory committee, and field team behind NISARG Foundation\'s work in rural Madhya Pradesh.',
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="The people behind the mission."
        description="Directors, advisors, consultants and field staff who make NISARG's work possible — from Sehore to the districts we serve."
      />
      <Team />
    </>
  )
}
