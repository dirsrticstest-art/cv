"use client";

import React from "react";
import { MapPin, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="space-y-8 border-b border-gray-800/80 pb-14">
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
        <span className="flex items-center gap-1.5 bg-gray-800/90 text-gray-200 px-3 py-1 rounded-md border border-gray-700">
          <MapPin className="w-3.5 h-3.5 text-purple-400" /> Location: Cairo, Egypt
        </span>
        <span className="bg-purple-950/60 text-purple-300 px-3 py-1 rounded-md border border-purple-800/40">
          EG Nationality: Egyptian
        </span>
        <span className="bg-emerald-950/60 text-emerald-400 px-3 py-1 rounded-md border border-emerald-800/40">
          Graduation: 2029 (ECU)
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
          Building dependable <span className="text-purple-400">Python backend systems</span>, clean APIs, and real-world business automations.
        </h1>

        <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          Hello! I&apos;m Ahmed—a Computer Science student with hands-on experience engineering FastAPI backend services, managing PostgreSQL relational databases, setting up Redis task queues, and connecting business logic to external messaging APIs like Meta WhatsApp Cloud API.
        </p>
      </div>

      {/* Primary Tech Stack */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-gray-400 font-semibold uppercase tracking-wider">CORE ENGINEERING STACK:</div>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {["Python 3.11+", "FastAPI", "PostgreSQL", "Redis & RQ Queue", "REST Webhooks", "Docker", "ChromaDB", "Git"].map((tech, idx) => (
            <span key={idx} className="bg-gray-900 text-gray-300 px-3 py-1 rounded-md border border-gray-800 font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="pt-2 flex flex-wrap items-center gap-4">
        <a 
          href="#experience" 
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition text-sm shadow-lg shadow-purple-950/80"
        >
          Inspect Practical Experience <ChevronRight className="w-4 h-4" />
        </a>
        <a 
          href="#projects" 
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-6 py-3 rounded-lg border border-gray-700 transition text-sm"
        >
          Explore Built Projects
        </a>
      </div>
    </section>
  );
}
