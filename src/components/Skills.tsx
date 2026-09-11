"use client";

import { Wrench } from "lucide-react";
import { skillCategories } from "./data";

interface SkillsProps {
  onExplain?: (section: string) => void;
  onExplainItem?: (item: string) => void;
}

export default function Skills({ onExplain, onExplainItem }: SkillsProps) {
  return (
    <section className="space-y-6">
      <div 
        className="flex items-center gap-3 border-b border-gray-800 light:border-gray-200 pb-3 cursor-pointer hover:border-purple-500 transition"
        onClick={() => onExplain?.("skills")}
      >
        <Wrench className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white light:text-gray-900">Technical Skills</h2>
        <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">tap to hear</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => onExplainItem?.(cat.category)}
            className="bg-gray-900/70 light:bg-gray-50 border border-gray-800 light:border-gray-200 rounded-xl p-5 space-y-3 cursor-pointer hover:border-purple-500 transition"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-950/60 light:bg-purple-50 text-purple-400 border border-purple-800/40 light:border-purple-200">
                <cat.icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white light:text-gray-900">{cat.category}</h3>
              <span className="text-[9px] font-mono text-purple-400 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40 ml-auto">tap</span>
            </div>
            <p className="text-xs text-gray-400 light:text-gray-500 leading-relaxed">{cat.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((s, i) => (
                <span key={i} className="text-[11px] font-mono bg-gray-800 light:bg-gray-100 text-gray-300 light:text-gray-700 px-2 py-0.5 rounded border border-gray-700 light:border-gray-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
