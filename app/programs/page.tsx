import type { Metadata } from 'next'
import { Programs } from '@/components/Programs'
import { StrategicGoal } from '@/components/StrategicGoal'
import { PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Our Work — NISARG Foundation',
  description: 'Explore NISARG Foundation\'s programmes and initiatives in regenerative agriculture, women empowerment, and community governance across Madhya Pradesh.',
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs & Initiatives"
        title="What this looks like on the ground."
        description="A running log of orientation drives, workshops, and community events across our intervention areas."
      />
      <Programs />
      <StrategicGoal />
    </>
  )
}
