"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function About() {
  useScrollReveal();
  return (
    <section className="about-bg" id="about">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Who we are</div>
          <h2>An acronym that&apos;s also a mission statement.</h2>
        </div>

        <div className="acronym reveal-stagger">
          <div className="letter-card">
            <span className="L">N</span>
            <span className="word">Nurturing</span>
          </div>
          <div className="letter-card">
            <span className="L">I</span>
            <span className="word">Innovations</span>
          </div>
          <div className="letter-card">
            <span className="L">S</span>
            <span className="word">Sustainable</span>
          </div>
          <div className="letter-card">
            <span className="L">A</span>
            <span className="word">And</span>
          </div>
          <div className="letter-card">
            <span className="L">R</span>
            <span className="word">Rapid</span>
          </div>
          <div className="letter-card">
            <span className="L">G</span>
            <span className="word">Growth</span>
          </div>
        </div>

        <div className="about-copy reveal">
          <p>
            India&apos;s rural economy still runs on the shoulders of small and
            marginal farmers. But rising cultivation costs, declining soil
            health and climate variability are making conventional farming
            harder to sustain.
          </p>
          <p>
            NISARG Foundation was registered in 2020 as a Section-8 non-profit
            to respond to exactly this — by addressing Society, Economy and
            Environment together, rather than in isolation. We work on
            livelihoods, natural resource conservation, education and community
            participation, so that rural transformation is led by the
            communities it serves.
          </p>
        </div>

        <div className="vm-grid">
          <div className="vm-card vision reveal">
            <div className="eyebrow">Vision</div>
            <p>
              A dignified society where communities contribute towards a
              prosperous environment — ensuring harmony between human
              development and nature.
            </p>
          </div>
          <div className="vm-card mission reveal">
            <div className="eyebrow">Mission</div>
            <p>
              To promote sustainable rural development by strengthening
              livelihoods, empowering communities and conserving natural
              resources through environmentally responsible agriculture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
