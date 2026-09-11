"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
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
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white light:text-gray-900 leading-tight tracking-tight">
              Ahmed Mohamed Abdelatif
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-purple-400 light:text-purple-600">
              Python Backend Developer & AI Automation Specialist
            </p>
            <p className="text-gray-300 light:text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              I build Python backend systems, APIs, and automations that solve real business problems.
            </p>
            <p className="text-sm text-gray-400 light:text-gray-500 font-mono">
              Cairo, Egypt · Computer Science Student · Open to Backend & AI Automation Opportunities
            </p>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a 
              href="#experience" 
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition text-sm shadow-lg shadow-purple-950/80"
            >
              Experience <ChevronRight className="w-4 h-4" />
            </a>
            <a 
              href="#projects" 
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 light:bg-gray-100 light:hover:bg-gray-200 text-gray-200 light:text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-700 light:border-gray-300 transition text-sm"
            >
              Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
