"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, Users, Handshake } from "lucide-react";

export function Involve() {
  useScrollReveal();
  return (
    <section
      className="involve py-16 md:py-24 bg-gradient-to-b from-emerald-50/40 to-white"
      id="involve"
    >
      <div className="wrap max-w-7xl mx-auto px-4 md:px-6">
        <div className="reveal text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2c5234] bg-emerald-100/60 px-3 py-1 rounded-full">
            Opportunities
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-100 mt-3 mb-4 tracking-tight">
            How you can get involved
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Whether you&apos;re passionate about agriculture, women empowerment,
            or community development, there&apos;s a way for you to contribute.
          </p>
        </div>

        <div className="involve-grid grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
          {/* Card 1: Donate */}
          <div className="involve-card bg-white p-8 rounded-3xl border border-emerald-900/10 shadow-lg shadow-emerald-950/5 hover:shadow-xl hover:border-[#2c5234]/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-[#2c5234] flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                Donate
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Fund a programme
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Support soil testing, farmer orientation or women&apos;s
                enterprise work directly. 80G registered for tax benefits.
              </p>
            </div>
            <a
              href="#contact"
              className="w-full bg-[#2c5234] hover:bg-[#1a3322] text-white font-bold py-3.5 px-6 rounded-2xl text-center shadow-md transition-all text-sm block"
            >
              Get in touch to donate
            </a>
          </div>

          {/* Card 2: Volunteer */}
          <div className="involve-card bg-white p-8 rounded-3xl border border-emerald-900/10 shadow-lg shadow-emerald-950/5 hover:shadow-xl hover:border-[#2c5234]/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-800 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                Volunteer
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Give your time
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Field visits, training support, digital content, or
                documentation — we work with volunteers across skill sets.
              </p>
            </div>
            <a
              href="#contact"
              className="w-full bg-[#2c5234] hover:bg-[#1a3322] text-white font-bold py-3.5 px-6 rounded-2xl text-center shadow-md transition-all text-sm block"
            >
              Volunteer with us
            </a>
          </div>

          {/* Card 3: Partner */}
          <div className="involve-card bg-white p-8 rounded-3xl border border-emerald-900/10 shadow-lg shadow-emerald-950/5 hover:shadow-xl hover:border-[#2c5234]/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100/70 text-sky-800 flex items-center justify-center mb-6">
                <Handshake className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-800 mb-2">
                Partner
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                CSR &amp; institutions
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Government bodies, NGOs and CSR teams — let&apos;s design a
                programme that fits your mandate.
              </p>
            </div>
            <a
              href="#contact"
              className="w-full bg-[#2c5234] hover:bg-[#1a3322] text-white font-bold py-3.5 px-6 rounded-2xl text-center shadow-md transition-all text-sm block"
            >
              Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
