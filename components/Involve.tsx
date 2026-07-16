'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Involve() {
  useScrollReveal()
  return (
    <section className="involve" id="involve">
      <div className="wrap">
        <div className="reveal">
          <h2>How you can get involved</h2>
          <p className="lead">
            Whether you&apos;re passionate about agriculture, women empowerment,
            or community development, there&apos;s a way for you to contribute.
          </p>
        </div>

        <div className="involve-grid reveal-stagger">
          <div className="involve-card">
            <div className="eyebrow">Donate</div>
            <h3>Fund a programme</h3>
            <p>
              Support soil testing, farmer orientation or women&apos;s enterprise
              work directly. 80G registered for tax benefits.
            </p>
            <a href="#contact" className="btn btn-primary">
              Get in touch to donate
            </a>
          </div>

          <div className="involve-card">
            <div className="eyebrow">Volunteer</div>
            <h3>Give your time</h3>
            <p>
              Field visits, training support, digital content, or documentation
              — we work with volunteers across skill sets.
            </p>
            <a href="#contact" className="btn btn-ghost">
              Volunteer with us
            </a>
          </div>

          <div className="involve-card">
            <div className="eyebrow">Partner</div>
            <h3>CSR &amp; institutions</h3>
            <p>
              Government bodies, NGOs and CSR teams — let&apos;s design a
              programme that fits your mandate.
            </p>
            <a href="#contact" className="btn btn-ghost">
              Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
