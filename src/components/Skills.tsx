"use client";

import { useState, useEffect, useRef } from "react";
import { Wrench, ChevronRight, Bot, X } from "lucide-react";
import { skillCategories } from "./data";

interface SkillsProps {
  onSkillOpen?: (category: typeof skillCategories[number]) => void;
}

export default function Skills({ onSkillOpen }: SkillsProps) {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<typeof skillCategories[number] | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenSkillCategoryModal = (cat: typeof skillCategories[number]) => {
    setSelectedSkillCategory(cat);
    onSkillOpen?.(cat);
  };

  useEffect(() => {
    if (selectedSkillCategory) {
      closeButtonRef.current?.focus();
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedSkillCategory(null);
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [selectedSkillCategory]);

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 light:border-gray-200 pb-3">
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white light:text-gray-900">Technical Stack & Skills</h2>
          </div>
          <span className="text-xs text-gray-400 light:text-gray-500 font-mono">Interactive Domain Breakdowns</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenSkillCategoryModal(cat)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpenSkillCategoryModal(cat); } }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${cat.category}`}
              className="bg-gray-900/70 light:bg-gray-50 hover:bg-gray-900 light:hover:bg-gray-100 border border-gray-800 light:border-gray-200 hover:border-purple-800/60 rounded-xl p-6 flex flex-col justify-between cursor-pointer transition space-y-5 group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-400 bg-purple-950/60 light:bg-purple-50 px-2.5 py-0.5 rounded border border-purple-800/40 light:border-purple-200 font-semibold">
                    Skill Category #0{idx + 1}
                  </span>
                  <span className="text-xs text-purple-300 light:text-purple-700 font-mono flex items-center gap-1 group-hover:text-purple-200">
                    Inspect & Project Breakdown <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 light:bg-purple-50 text-purple-400 border border-purple-800/40 light:border-purple-200 group-hover:border-purple-600 transition shrink-0">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white light:text-gray-900 group-hover:text-purple-300 transition">
                      {cat.category}
                    </h3>
                    <p className="text-xs font-mono text-purple-400 pt-0.5">
                      {cat.experienceSummary}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-300 light:text-gray-600 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-800/80 light:border-gray-200">
                <div>
                  <div className="text-[11px] font-mono text-gray-400 light:text-gray-500 uppercase font-semibold mb-1">Skills & Tools:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-[11px] font-mono bg-gray-800 light:bg-gray-100 text-gray-300 light:text-gray-700 px-2 py-0.5 rounded border border-gray-700 light:border-gray-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-purple-400 uppercase font-semibold mb-1">Applied In Projects:</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.appliedProjects.map((p, i) => (
                      <span key={i} className="text-[10px] font-mono bg-purple-950/40 light:bg-purple-50 text-purple-300 light:text-purple-700 px-2 py-0.5 rounded border border-purple-900/50 light:border-purple-200">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedSkillCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0b0f17]/80 light:bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-modal-title"
            className="bg-[#0b0f17] light:bg-white border border-purple-800/60 light:border-gray-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative shadow-purple-950/50"
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                ref={closeButtonRef}
                onClick={() => setSelectedSkillCategory(null)}
                className="p-2 text-gray-400 light:text-gray-500 hover:text-white light:hover:text-gray-900 rounded-lg bg-gray-900 light:bg-gray-100 border border-gray-800 light:border-gray-200 transition"
                aria-label="Close skill details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase">Skill Domain Deep Dive</span>
              <h3 id="skill-modal-title" className="text-2xl font-bold text-white light:text-gray-900">{selectedSkillCategory.category}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono text-gray-400 light:text-gray-500 uppercase font-semibold mb-1">Core Competencies & Tools</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedSkillCategory.skills.map((s: string, i: number) => (
                    <span key={i} className="text-xs font-mono bg-purple-950/60 text-purple-300 px-3 py-1 rounded-md border border-purple-800/40 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-gray-400 light:text-gray-500 uppercase font-semibold mb-1">Engineering Mastery</h4>
                <p className="text-xs text-gray-300 light:text-gray-600 leading-relaxed bg-gray-800/70 light:bg-gray-50 p-4 rounded-lg border border-gray-700 light:border-gray-200">
                  {selectedSkillCategory.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-gray-400 light:text-gray-500 uppercase font-semibold mb-1">Practical Experience & Application</h4>
                <p className="text-xs text-gray-300 light:text-gray-600 leading-relaxed bg-gray-800/40 light:bg-gray-50 p-4 rounded-lg border border-gray-800 light:border-gray-200">
                  {selectedSkillCategory.experienceSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-gray-400 light:text-gray-500 uppercase font-semibold mb-2">Applied Projects & Repositories</h4>
                <ul className="text-xs text-gray-300 light:text-gray-600 space-y-2 list-disc list-inside bg-purple-950/30 light:bg-purple-50 p-4 rounded-lg border border-purple-900/40 light:border-purple-200">
                  {selectedSkillCategory.appliedProjects.map((projName: string, i: number) => (
                    <li key={i} className="font-mono text-purple-300">{projName}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 light:border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedSkillCategory(null)}
                className="text-xs text-gray-400 light:text-gray-500 hover:text-white light:hover:text-gray-900 transition font-medium"
              >
                Return to Skills
              </button>
              <button
                onClick={() => handleOpenSkillCategoryModal(selectedSkillCategory)}
                className="flex items-center gap-2 bg-purple-900/80 hover:bg-purple-800 light:bg-purple-100 light:hover:bg-purple-200 text-purple-200 light:text-purple-700 font-semibold text-xs px-4 py-2 rounded-lg border border-purple-700/60 light:border-purple-300 transition shadow-md"
              >
                <Bot className="w-4 h-4 text-purple-300" /> Ask AI to Explain Domain
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
