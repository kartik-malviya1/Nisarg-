"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const stories = [
  {
    id: 1,
    quote:
      '"After the soil testing workshop, I reduced my fertiliser cost by nearly 30%. My wheat yield improved and I kept more of the money."',
    name: "Ramesh Patidar",
    role: "Farmer, Sehore",
    photo: "/photo1.png",
    tag: "Regenerative Agriculture",
  },
  {
    id: 2,
    quote:
      '"NISARG helped our SHG understand packaging and branding. Now we sell our products at three times the earlier price at the district market."',
    name: "Sunita Bai",
    role: "SHG Leader, Barwani",
    photo: "/photo3.png",
    tag: "Women Enterprise",
  },
  {
    id: 3,
    quote:
      '"The organic farming orientation showed us that we were actually spending too much on inputs. Natural farming gave us the same output at half the cost."',
    name: "Dinesh Yadav",
    role: "Farmer, Vidisha",
    photo: "/photo2.png",
    tag: "Organic Farming",
  },
];

export function SuccessStories() {
  useScrollReveal();
  return (
    <section className="success-stories" id="success-stories">
      <div className="wrap">
        <div
          className="section-head reveal"
          style={{ textAlign: "center", margin: "0 auto 56px" }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center", display: "flex" }}
          >
            Success Stories
          </div>
          <h2 style={{ color: "white" }}>Voices from the community.</h2>
          <p style={{ maxWidth: "540px", margin: "16px auto 0" }}>
            Real outcomes, in the words of those we work with — farmers, women
            entrepreneurs, and community leaders across Madhya Pradesh.
          </p>
        </div>

        <div className="ss-grid reveal-stagger">
          {stories.map((story) => (
            <div key={story.id} className="ss-card">
              <div className="ss-quote-icon">"</div>
              <p className="ss-quote">{story.quote}</p>
              <div className="ss-author">
                <img src={story.photo} alt={story.name} className="ss-avatar" />
                <div className="ss-author-info">
                  <strong>{story.name}</strong>
                  <span>{story.role}</span>
                  <span
                    className="ss-tag"
                    style={{
                      background: "rgba(84,166,51,0.1)",
                      color: "var(--leaf-700)",
                    }}
                  >
                    {story.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
