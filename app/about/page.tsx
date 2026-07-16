import type { Metadata } from 'next'
import { About } from '@/components/About'
import { Journey } from '@/components/Journey'
import { Team } from '@/components/Team'
import { InterventionSection } from '@/components/InterventionSection'
import { PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'About Us — NISARG Foundation',
  description: 'Learn about NISARG Foundation\'s mission, journey, leadership team, and our intervention areas across Madhya Pradesh.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Building a regenerative future for rural India."
        description="From a grassroots initiative in Sehore to a growing movement across Madhya Pradesh — here's who we are and how we got here."
      />
      <About />
      <Journey />
      <Team />
      <InterventionSection />
    </>
  )
}
