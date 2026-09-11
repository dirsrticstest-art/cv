"use client";

import { GraduationCap } from "lucide-react";

interface EducationProps {
  onExplainItem?: (item: string) => void;
}

export default function Education({ onExplainItem }: EducationProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 light:border-gray-200 pb-3">
        <GraduationCap className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white light:text-gray-900">Education</h2>
      </div>

      <div 
        onClick={() => onExplainItem?.("education")}
        className="bg-gray-900/70 light:bg-gray-50 border border-gray-800 light:border-gray-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:border-purple-500 transition"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white light:text-gray-900">B.Sc. Computer Science</h3>
            <span className="text-[9px] font-mono text-purple-400 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40">tap to hear</span>
          </div>
          <p className="text-sm text-purple-300 light:text-purple-700 font-medium">Egyptian Chinese University (ECU) — Cairo</p>
          <p className="text-xs text-gray-300 light:text-gray-600 max-w-xl leading-relaxed">
            Currently enrolled · Expected Graduation: 2029
          </p>
          <p className="text-xs text-gray-400 light:text-gray-500 leading-relaxed">
            Relevant coursework: Data Structures · Algorithms · Databases · OOP · Software Engineering
          </p>
        </div>
      </div>
    </section>
  );
}
