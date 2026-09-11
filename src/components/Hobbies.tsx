"use client";

import React from "react";
import { Heart } from "lucide-react";
import { personalHobbies } from "./data";

export default function Hobbies() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 light:border-gray-200 pb-3">
        <Heart className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white light:text-gray-900">Outside the Code</h2>
      </div>

      <p className="text-gray-300 light:text-gray-600 text-sm leading-relaxed max-w-3xl">
        {personalHobbies}
      </p>
    </section>
  );
}
