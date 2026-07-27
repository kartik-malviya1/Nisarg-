import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { PartnersPage } from '@/components/PartnersPage'

export const metadata: Metadata = {
  title: 'Partners & Collaborators — NISARG Foundation',
  description: 'NISARG Foundation\'s partners include Solidaridad, tanX Innovations, Government Departments, CSR partners, FPOs, and academic institutions.',
}

export default function PartnersPageRoute() {
  return (
    <>
      <PageHero
        eyebrow="Partners & Collaborators"
        title="Working together for scale."
        description="NISARG collaborates with technology partners, government bodies, NGOs, CSR teams, and international organisations to amplify community impact."
      />
      <PartnersPage />
    </>
  )
}
