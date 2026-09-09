"use client";

import React from "react";
import { User } from "lucide-react";
import { personalDetails } from "./data";

export default function Profile() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
        <User className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Personal & Academic Profile</h2>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7 space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            I am a Computer Science student at the **Egyptian Chinese University (ECU)** in Cairo. My focus is on backend architecture, API engineering, relational database design, and asynchronous workflow processing.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            I build structured software using FastAPI, PostgreSQL, SQLAlchemy, Pydantic, and Redis/RQ queues. I pay close attention to backend fundamentals: separating API handlers from heavy background jobs, logging data cleanly, and creating separated AI service boundaries.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            During my 3-month on-site experience at **H2M**, I applied these practices to **MAXP Online**, developing internal financial calculators, campaign analytics, and Meta WhatsApp Cloud API webhook listeners and scheduled dispatches.
          </p>
        </div>

        <div className="md:col-span-5 bg-gray-900/90 border border-gray-800 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
            <h3 className="text-xs font-mono text-purple-400 uppercase tracking-wider font-bold">
              Candidate Fact Sheet
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Verified Info
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {personalDetails.map((item, idx) => (
              <div key={idx} className="flex flex-col space-y-0.5">
                <span className="text-gray-400 font-mono text-[11px]">{item.label}:</span>
                <span className="text-gray-200 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
