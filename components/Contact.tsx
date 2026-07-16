'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Contact() {
  useScrollReveal()
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Contact</div>
          <h2>Let&apos;s talk.</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <dl>
              <div>
                <dt>Registered office</dt>
                <dd>
                  House No. 80, Gram Hirapur, Post Bilkisganj,
                  <br />
                  Sehore, Madhya Pradesh 466111, India
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd><a href="tel:+919993966218">+91 99939 66218</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:info@nisargfoundation.org">info@nisargfoundation.org</a></dd>
              </div>
            </dl>
            <div className="map-frame">
              <iframe
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.95%2C23.10%2C77.22%2C23.30&amp;layer=mapnik&amp;marker=23.2032%2C77.0844"
                title="Map of Sehore, Madhya Pradesh"
              />
            </div>
          </div>

          <form className="form-grid reveal" onSubmit={() => false}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Full name"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
            />
            <textarea placeholder="Your message" />
            <button
              className="btn btn-dark"
              style={{ width: 'fit-content' }}
              type="submit"
            >
              Send message
            </button>
            <p className="form-note">
              This form is a template — connect it to your email or CRM of
              choice to start receiving messages.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
