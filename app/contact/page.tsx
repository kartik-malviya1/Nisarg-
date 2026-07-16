import type { Metadata } from 'next'
import { Contact } from '@/components/Contact'
import { Involve } from '@/components/Involve'
import { PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Contact & Get Involved — NISARG Foundation',
  description: 'Get in touch with NISARG Foundation. Donate, volunteer, or partner with us to support regenerative agriculture and rural community development across India.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Connect With Us"
        title="Let's build this together."
        description="Whether you want to donate, volunteer, or explore a partnership — we'd love to hear from you."
      />
      <Involve />
      <Contact />
    </>
  )
}
