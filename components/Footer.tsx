import Link from 'next/link'

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="foot-brand" style={{ display: 'inline-block' }}>
              <img src="/nisarg-full-logo.png" alt="NISARG Foundation" style={{ height: '60px', objectFit: 'contain', width: 'auto' }} />
            </Link>
            <p className="foot-desc">
              Nurturing Innovations For Sustainable and Rapid Growth Foundation
              — a Section-8 non-profit working across rural India.
            </p>
          </div>

          <div className="foot-col">
            <h5>Quick Links</h5>
            <Link href="/about">About</Link>
            <Link href="/programs">Our Work</Link>
            <Link href="/impact">Impact</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="foot-col">
            <h5>Information</h5>
            <Link href="/#partners">Partners</Link>
            <Link href="/contact#involve">Get Involved</Link>
            <a href="mailto:info@nisargfoundation.org">Email Us</a>
          </div>

          <div className="foot-col">
            <h5>Details</h5>
            <p style={{ fontSize: '13px', margin: '0 0 8px' }}>PAN: AAHCN1070D</p>
            <p style={{ fontSize: '13px', margin: '0 0 8px' }}>12A · 80G Registered</p>
            <p style={{ fontSize: '13px', margin: '0' }}>Sehore, Madhya Pradesh</p>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 NISARG Foundation. All rights reserved.</span>
          <span>+91 99939 66218</span>
        </div>
      </div>
    </footer>
  )
}
