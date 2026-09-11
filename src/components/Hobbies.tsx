"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { personalHobbies } from "./data";

export default function Hobbies() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 light:border-gray-200 pb-3">
        <Heart className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white light:text-gray-900">Personal Hobbies & Engineering Mindset</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {personalHobbies.map((item, idx) => (
          <div key={idx} className="bg-gray-900/70 light:bg-gray-50 border border-gray-800 light:border-gray-200 rounded-xl p-6 space-y-2">
            <h3 className="text-sm font-bold text-purple-300 light:text-purple-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> {item.title}
            </h3>
            <p className="text-xs text-gray-300 light:text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
