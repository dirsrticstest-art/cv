"use client";

import React from "react";
import { User } from "lucide-react";
import { aboutText } from "./data";

export default function Profile() {
  const lines = aboutText.split("\n").filter((l) => l.trim());

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 light:border-gray-200 pb-3">
        <User className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white light:text-gray-900">About</h2>
      </div>

      <div className="space-y-4 max-w-3xl">
        {lines.map((line, idx) => (
          <p key={idx} className="text-gray-300 light:text-gray-600 text-sm leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
