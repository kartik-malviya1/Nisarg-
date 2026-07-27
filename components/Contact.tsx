"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Contact() {
  useScrollReveal();
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
                <dd>
                  <a href="tel:+917987300623">+91 7987300623</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:info@nisargfoundation.org">
                    info@nisargfoundation.org
                  </a>
                </dd>
              </div>
            </dl>
            <div className="map-frame">
              <iframe
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29335.539114743846!2d77.06738452967159!3d23.208770058767595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397cf36a4bac0fb9%3A0xce6c687b989469e1!2sSehore%2C%20Madhya%20Pradesh%20466001!5e0!3m2!1sen!2sin!4v1785151343822!5m2!1sen!2sin"
                title="Map of Sehore, Madhya Pradesh"
              />
            </div>
          </div>

          <form className="form-grid reveal" onSubmit={() => false}>
            <div className="form-row">
              <input type="text" placeholder="Full name" required />
              <input type="email" placeholder="Email address" required />
            </div>
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your message" />
            <button
              className="btn btn-dark"
              style={{ width: "fit-content" }}
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
  );
}
