"use client";

import React from "react";
import { MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="space-y-8 border-b border-gray-800/80 light:border-gray-200 pb-14">
      <div className="flex flex-col sm:flex-row items-start gap-8">
        {/* Profile Photo */}
        <div className="shrink-0">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-950/50">
            <Image
              src="/profile-photo.jpg"
              alt="Ahmed Mohamed Abdelatif - Python Backend Developer"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 176px, 176px"
            />
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 bg-gray-800/90 light:bg-gray-100 text-gray-200 light:text-gray-700 px-3 py-1 rounded-md border border-gray-700 light:border-gray-300">
              <MapPin className="w-3.5 h-3.5 text-purple-400" /> Location: Cairo, Egypt
            </span>
            <span className="bg-purple-950/60 light:bg-purple-50 text-purple-300 light:text-purple-700 px-3 py-1 rounded-md border border-purple-800/40 light:border-purple-200">
              EG Nationality: Egyptian
            </span>
            <span className="bg-emerald-950/60 light:bg-emerald-50 text-emerald-400 light:text-emerald-700 px-3 py-1 rounded-md border border-emerald-800/40 light:border-emerald-200">
              Graduation: 2029 (ECU)
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white light:text-gray-900 leading-tight tracking-tight">
              Building dependable <span className="text-purple-400">Python backend systems</span>, clean APIs, and real-world business automations.
            </h1>

            <p className="text-gray-300 light:text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              Hello! I&apos;m Ahmed—a Computer Science student with hands-on experience engineering FastAPI backend services, managing PostgreSQL relational databases, setting up Redis task queues, and connecting business logic to external messaging APIs like Meta WhatsApp Cloud API.
            </p>
          </div>

          {/* Primary Tech Stack */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-gray-400 light:text-gray-500 font-semibold uppercase tracking-wider">CORE ENGINEERING STACK:</div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {["Python 3.11+", "FastAPI", "PostgreSQL", "Redis & RQ Queue", "REST Webhooks", "Docker", "ChromaDB", "Git"].map((tech, idx) => (
                <span key={idx} className="bg-gray-900 light:bg-gray-100 text-gray-300 light:text-gray-700 px-3 py-1 rounded-md border border-gray-800 light:border-gray-300 font-medium">
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
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 light:bg-gray-100 light:hover:bg-gray-200 text-gray-200 light:text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-700 light:border-gray-300 transition text-sm"
            >
              Explore Built Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
