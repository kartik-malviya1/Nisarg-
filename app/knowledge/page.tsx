import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { KnowledgeCentre } from '@/components/KnowledgeCentre'

export const metadata: Metadata = {
  title: 'Knowledge Centre — NISARG Foundation',
  description: 'Access NISARG Foundation\'s knowledge resources: agriculture guides, farmer manuals, research publications, policy briefs, and training toolkits.',
}

export default function KnowledgePage() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge Centre"
        title="Resources for sustainable agriculture."
        description="Practical guides, research publications, and training materials from NISARG's field work — freely available for farmers, researchers, and practitioners."
      />
      <KnowledgeCentre />
    </>
  )
}
