"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const resourceGroups = [
  {
    title: "Legal & Registration",
    icon: "🏛️",
    color: "var(--leaf-700)",
    items: [
      {
        name: "Certificate of Incorporation",
        type: "PDF",
        desc: "Section-8 Company registration under Companies Act 2013",
      },
      {
        name: "12A Registration Certificate",
        type: "PDF",
        desc: "Income Tax exemption certificate for non-profit income",
      },
      {
        name: "80G Certificate",
        type: "PDF",
        desc: "Tax deduction certificate for donors — 50% deduction eligible",
      },
      {
        name: "CSR Eligibility Certificate",
        type: "PDF",
        desc: "Schedule VII CSR eligibility under Companies Act",
      },
    ],
  },
  {
    title: "Annual Reports",
    icon: "📊",
    color: "var(--water-600)",
    items: [
      {
        name: "Annual Report 2025–26",
        type: "PDF",
        desc: "Comprehensive report: programmes, financials, impact, and roadmap",
      },
      {
        name: "Annual Report 2024–25",
        type: "PDF",
        desc: "Year 4 report covering farmer orientation programme launch",
      },
      {
        name: "Annual Report 2023–24",
        type: "PDF",
        desc: "Year 3 report with women empowerment and WASH highlights",
      },
    ],
  },
  {
    title: "Financial Reports",
    icon: "💰",
    color: "#2d6b1f",
    items: [
      {
        name: "Audited Financials 2025–26",
        type: "PDF",
        desc: "Chartered Accountant audited balance sheet and P&L",
      },
      {
        name: "Audited Financials 2024–25",
        type: "PDF",
        desc: "CA audited financials for FY 2024–25",
      },
      {
        name: "Fund Utilisation Report — Farmer Orientation",
        type: "PDF",
        desc: "Detailed fund utilisation for the 8-district farmer orientation programme",
      },
    ],
  },
  // {
  //   title: 'Policies',
  //   icon: '📋',
  //   color: 'var(--turmeric-600)',
  //   items: [
  //     { name: 'Child Safeguarding Policy', type: 'PDF', size: '0.5 MB', desc: 'NISARG\'s policy on safeguarding children in programme areas' },
  //     { name: 'Gender Equality Policy', type: 'PDF', size: '0.4 MB', desc: 'Organisational commitment to gender equity and women\'s participation' },
  //     { name: 'Financial Management Policy', type: 'PDF', size: '0.7 MB', desc: 'Internal financial controls, procurement, and audit processes' },
  //     { name: 'Volunteer & Internship Policy', type: 'PDF', size: '0.3 MB', desc: 'Terms, expectations, and guidelines for volunteers and interns' },
  //   ],
  // },
  {
    title: "Brochures & Collateral",
    icon: "🗂️",
    color: "var(--primary-blue)",
    items: [
      {
        name: "NISARG Organisation Profile",
        type: "PDF",
        desc: "Overview of mission, programmes, impact, and team",
      },
      {
        name: "Regenerative Agriculture Brochure",
        type: "PDF",
        desc: "Programme brochure for the 8-district farmer orientation",
      },
      {
        name: "Women Enterprise Programme Brochure",
        type: "PDF",
        desc: "Barwani district women enterprise promotion overview",
      },
      {
        name: "CSR Opportunity Deck",
        type: "PDF",
        desc: "Presentation for CSR partners — impact, programmes, and opportunities",
      },
    ],
  },
];

const faqs = [
  {
    q: "Is NISARG Foundation eligible to receive CSR funds?",
    a: "Yes. NISARG Foundation is registered under Section 8 of the Companies Act and is eligible to receive CSR funds under Schedule VII categories including rural development, sustainable agriculture, women empowerment, and environmental sustainability.",
  },
  {
    q: "Are donations to NISARG tax deductible?",
    a: "Yes. NISARG Foundation has 80G certification from the Income Tax Department. Donors are eligible for 50% deduction on donations made to NISARG Foundation.",
  },
  {
    q: "How can I obtain financial statements?",
    a: "Audited financial statements are available for download from this page. You can also request documents by emailing info@nisargfoundation.org.",
  },
  {
    q: "Does NISARG accept international donations?",
    a: "NISARG is in the process of obtaining FCRA registration. Currently, we accept donations from Indian entities and NRIs through Indian bank accounts.",
  },
];

export function Resources() {
  useScrollReveal();
  return (
    <section className="resources-section" id="resources">
      <div className="wrap">
        {resourceGroups.map((group) => (
          <div key={group.title} className="resource-group reveal">
            <div className="rg-header">
              <span className="rg-icon">{group.icon}</span>
              <h3 style={{ color: group.color }}>{group.title}</h3>
            </div>
            <div className="rg-grid">
              {group.items.map((item, i) => (
                <div key={i} className="rg-item">
                  <div className="rg-item-info">
                    <strong>{item.name}</strong>
                    <span>{item.desc}</span>
                  </div>
                  <div className="rg-item-meta">
                    <span
                      className="rg-type"
                      style={{
                        background: `${group.color}15`,
                        color: group.color,
                      }}
                    >
                      {item.type}
                    </span>
                    <a
                      href="/contact"
                      className="rg-dl"
                      style={{ color: group.color }}
                    >
                      Request →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="faqs-section reveal">
          <div className="section-head" style={{ marginBottom: "36px" }}>
            <div className="eyebrow">FAQs</div>
            <h2>Common questions</h2>
          </div>
          <div className="faqs-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <h4>Q: {faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
