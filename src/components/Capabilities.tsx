"use client";

import React from "react";
import { Target } from "lucide-react";
import { valuePropositions } from "./data";

export default function Capabilities() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
        <Target className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Backend Engineering Capabilities</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {valuePropositions.map((item, idx) => (
          <div key={idx} className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-3 hover:border-purple-800/40 transition">
            <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{item.title}</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
