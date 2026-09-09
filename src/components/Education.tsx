"use client";

import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
        <GraduationCap className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Education</h2>
      </div>

      <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-3 py-1 rounded-md border border-purple-800/40 inline-block font-semibold">
            Degree Program
          </span>
          <h3 className="text-xl font-bold text-white">Bachelor of Computer Science (B.Sc.)</h3>
          <p className="text-sm text-purple-300 font-medium">Egyptian Chinese University (ECU) — Cairo, Egypt</p>
          <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
            Coursework: Data Structures, Algorithms, Database Systems, Object-Oriented Programming (C++ & Python), Software Engineering.
          </p>
        </div>
        <div className="md:text-right shrink-0 space-y-1">
          <span className="text-xs font-mono bg-gray-800 text-gray-200 px-3 py-1.5 rounded-md border border-gray-700 block font-semibold">
            Expected Graduation: 2029
          </span>
          <span className="text-xs text-emerald-400 font-mono block">Status: Currently Enrolled</span>
        </div>
      </div>
    </section>
  );
}
