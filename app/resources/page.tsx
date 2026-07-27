import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Resources } from '@/components/Resources'

export const metadata: Metadata = {
  title: 'Resources — NISARG Foundation',
  description: 'Download NISARG Foundation\'s annual reports, registration certificates (12A, 80G), financial reports, policies, and brochures.',
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Transparency in everything we do."
        description="Annual reports, registration documents, financial disclosures, and organisational policies — all available for download."
      />
      <Resources />
    </>
  )
}
