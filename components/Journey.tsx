"use client";

import { useTimelineAnimation, useScrollReveal } from "@/hooks/useScrollReveal";

export function Journey() {
  useTimelineAnimation();
  useScrollReveal();

  return (
    <section className="journey" id="journey">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Our journey</div>
          <h2>Building a movement for regenerative agriculture.</h2>
        </div>

        <div className="timeline" id="timeline">
          <div className="timeline-fill" id="timelineFill" />

          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">2020</div>
            <h4>Foundation established</h4>
            <p>
              NISARG Foundation launches with a mission to transform agriculture
              through regenerative practices, environmental stewardship, and
              community empowerment.
            </p>
          </div>

          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">2021</div>
            <h4>Grassroots engagement begins</h4>
            <p>
              First community initiatives launched, working with farmers and
              tribal communities to understand local challenges and co-create
              solutions for sustainable livelihoods.
            </p>
          </div>

          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">2022</div>
            <h4>Deepening impact and awareness</h4>
            <p>
              Programmes scale across regions with focus on farmer orientation,
              soil health restoration, and climate-resilient agriculture
              practices.
            </p>
          </div>

          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">2023</div>
            <h4>Change in Strategy</h4>
            <p>
              NISARG expands to new agricultural regions, bringing regenerative
              farming practices, soil testing initiatives, and organic farming
              programmes to more communities.
            </p>
          </div>

          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">Now</div>
            <h4>Active transformation and scaling</h4>
            <p>
              Running comprehensive farmer orientation programmes, soil testing
              labs, and organic farming initiatives across multiple regions with
              measurable impact on farmer incomes and environmental health.
            </p>
          </div>

          <div className="tl-item future">
            <div className="tl-dot" />
            <div className="tl-year">2026 – 2031</div>
            <h4>Implementation Scale-Up</h4>
            <p>
              Scaling regenerative agriculture practices to reach 10 lakh
              farmers across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
