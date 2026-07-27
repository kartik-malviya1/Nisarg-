"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="foot-wrap">
        {/* Top grid */}
        <div className="foot-grid">
          {/* Col 1 — Brand */}
          <div className="foot-brand-col">
            <Link
              href="/"
              className="foot-brand"
              style={{ display: "inline-block" }}
            >
              <img
                src="/nisarg-full-logo.png"
                alt="NISARG Foundation"
                style={{ height: "60px", objectFit: "contain", width: "auto" }}
              />
            </Link>
            <p className="foot-desc">
              Nurturing Innovations For Sustainable and Rapid Growth Foundation
              — a Section-8 non-profit working across rural India to restore
              livelihoods and rebuild ecosystems.
            </p>
            <div className="foot-social">
              <a
                href="https://www.linkedin.com/company/nisarg-foundation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="foot-social-link"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/nisargfoundation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="foot-social-link"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
            </div>
            {/* <div className="foot-reg-nos">
              <span>CIN: U85300MP2020NPL050xxx</span>
              <span>12A · 80G Registered</span>
            </div> */}
          </div>

          {/* Col 2 — Quick Links */}
          <div className="foot-col">
            <h5>Quick Links</h5>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/programs">Programmes</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/impact">Impact</Link>
            <Link href="/team">Our Team</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Col 4 — Resources & Media */}
          <div className="foot-col">
            <h5>Resources</h5>
            <Link href="/resources">Annual Reports</Link>
            <Link href="/resources">12A & 80G Certificates</Link>
            <Link href="/resources">Financial Reports</Link>
            <Link href="/resources">Policies</Link>
            <Link href="/knowledge">Knowledge Centre</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/news">News & Events</Link>
          </div>

          {/* Col 5 — Get Involved*/}
          <div className="foot-col">
            <h5>Get Involved</h5>
            <Link href="/get-involved">Donate</Link>
            <Link href="/get-involved">Volunteer</Link>
            <Link href="/get-involved">CSR Partnership</Link>
            <Link href="/get-involved">Internship</Link>
            <Link href="/partners">Become a Partner</Link>
          </div>
          {/* col 4 -contact */}
          <div
            className="foot-col"
            style={{ alignContent: "start", textAlign: "start" }}
          >
            <h5 style={{ marginTop: "28px" }}>Contact</h5>
            <a href="mailto:info@nisargfoundation.org">
              info@nisargfoundation.org
            </a>
            <a href="tel:+919993966218">+91 99939 66218</a>
            <span
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                marginTop: "4px",
              }}
            >
              Sehore, Madhya Pradesh
            </span>
          </div>
        </div>

        {/* Newsletter strip */}
        <div className="foot-newsletter">
          <div className="fn-text">
            <strong>Stay updated</strong>
            <span>Get our latest news and programme updates.</span>
          </div>
          <form className="fn-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Email for newsletter"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="foot-bottom">
          <span>© 2026 NISARG Foundation. All rights reserved.</span>
          <div className="foot-bottom-links">
            <Link href="/resources">Privacy Policy</Link>
            <Link href="/resources">Terms of Use</Link>
            <Link href="/contact">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
