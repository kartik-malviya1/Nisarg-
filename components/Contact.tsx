"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@nisargfoundation.org",
    sub: "We reply within 24 hours",
    href: "mailto:info@nisargfoundation.org",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 79873 00623",
    sub: "Mon – Sat, 9:30 AM – 6:00 PM IST",
    href: "tel:+917987300623",
  },
  {
    icon: MapPin,
    label: "Registered Office",
    value: "House No. 80, Gram Hirapur",
    sub: "Post Bilkisganj, Sehore, MP 466111",
    href: "https://maps.google.com/?q=Sehore+Madhya+Pradesh",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Monday – Saturday",
    sub: "9:30 AM – 6:00 PM IST",
    href: null,
  },
];

const subjects = [
  "General Inquiry",
  "Regenerative Agriculture Support",
  "Soil & Water Conservation",
  "Volunteering & Internship",
  "Donation & CSR Collaboration",
  "Partnership Request",
];

export function Contact() {
  useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phoneNumber: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact py-12 md:py-20" id="contact">
      <div className="wrap max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="section-head reveal text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow inline-block px-3 py-1 bg-[#fbf5ee] text-[#2c5234] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Contact & Outreach
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a3322] tracking-tight mb-4">
            Let&apos;s talk and grow together.
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Have questions about our initiatives, want to partner with NISARG
            Foundation, or support rural communities? Reach out to us.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 reveal">
          {contactInfo.map((item, i) => {
            const Wrapper = item.href ? "a" : "div";
            const wrapperProps = item.href
              ? {
                  href: item.href,
                  target: item.href.startsWith("http") ? "_blank" : undefined,
                  rel: item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined,
                }
              : {};

            return (
              <Wrapper
                key={i}
                {...(wrapperProps as any)}
                className="group relative p-6 rounded-2xl border border-emerald-900/10 bg-white/70 backdrop-blur-sm hover:bg-white hover:border-[#2c5234]/40 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[#fbf5ee] flex items-center justify-center mb-4 text-[#2c5234] group-hover:bg-[#2c5234] group-hover:text-white transition-all duration-300 shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800/70 mb-1">
                  {item.label}
                </p>
                <p className="text-sm md:text-base font-bold text-gray-900 leading-snug group-hover:text-[#2c5234] transition-colors mb-1">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.sub}
                </p>
              </Wrapper>
            );
          })}
        </div>

        {/* Grid: Form (Left) & Map/Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start reveal">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white border border-emerald-900/10 p-6 md:p-10 rounded-3xl shadow-xl shadow-emerald-950/5">
            <h3 className="text-2xl font-bold text-[#1a3322] mb-2">
              Send us a direct message
            </h3>
            <p className="text-sm text-gray-600 mb-8">
              Fill out the details below and our team will get back to you
              within 24 hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 px-6 rounded-2xl border border-emerald-200 bg-emerald-50/60">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-4 animate-bounce" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-gray-600 max-w-md leading-relaxed mb-6">
                  Thank you for connecting with NISARG Foundation. We have
                  received your inquiry and will reach back out to{" "}
                  <span className="font-semibold text-gray-900">
                    {form.email || form.phone}
                  </span>{" "}
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="w-full bg-[#2c5234] hover:bg-[#1a3322] text-white font-bold py-3.5 px-6 rounded-2xl text-center shadow-md transition-all text-sm block"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 font-medium placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5234]/20 focus:border-[#2c5234] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 font-medium placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5234]/20 focus:border-[#2c5234] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 font-medium placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5234]/20 focus:border-[#2c5234] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Topic / Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5234]/20 focus:border-[#2c5234] transition-all"
                    >
                      <option value="" className="text-gray-500">
                        Select a topic (optional)…
                      </option>
                      {subjects.map((sub) => (
                        <option
                          key={sub}
                          value={sub}
                          className="text-gray-900 bg-white"
                        >
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about how we can help or work together…"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 font-medium placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2c5234]/20 focus:border-[#2c5234] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2c5234] hover:bg-[#1a3322] text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer text-base"
                >
                  {loading ? (
                    <span className="w-full bg-[#2c5234] hover:bg-[#1a3322] text-white font-bold py-3.5 px-6 rounded-2xl text-center shadow-md transition-all text-sm block">
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <span className="w-full bg-[#2c5234] hover:bg-[#1a3322] text-white font-bold py-3.5 px-6 rounded-2xl text-center shadow-md transition-all text-sm block">
                        Send Message
                      </span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Map & Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-emerald-900/10 shadow-xl shadow-emerald-950/5 h-[340px] w-full bg-gray-100">
              <iframe
                title="NISARG Foundation Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29335.539114743846!2d77.06738452967159!3d23.208770058767595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397cf36a4bac0fb9%3A0xce6c687b989469e1!2sSehore%2C%20Madhya%20Pradesh%20466001!5e0!3m2!1sen!2sin!4v1785151343822!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Summary Box */}
            <div className="p-6 rounded-3xl bg-[#fbf5ee] border border-amber-900/10">
              <h4 className="font-bold text-[#1a3322] text-lg mb-2">
                Visit NISARG Field Offices
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                We welcome partners, researchers, and volunteers to visit our
                community demo plots and organic seed centers in Sehore
                district.
              </p>
              <div className="text-xs font-semibold text-[#2c5234] uppercase tracking-wider">
                Madhya Pradesh, India
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
