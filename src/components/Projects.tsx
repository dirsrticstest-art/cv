"use client";

import { useState, useEffect, useRef } from "react";
import { Code2, ChevronRight, Globe, ExternalLink, Zap, X } from "lucide-react";
import { projects } from "./data";

interface ProjectsProps {
  onProjectOpen?: (project: (typeof projects)[number]) => void;
  onExplain?: (section: string) => void;
  onExplainProject?: (title: string) => void;
}

export default function Projects({ onProjectOpen, onExplain, onExplainProject }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = (proj: (typeof projects)[number]) => {
    setSelectedProject(proj);
    onProjectOpen?.(proj);
    onExplainProject?.(proj.title);
  };

  useEffect(() => {
    if (selectedProject) {
      closeButtonRef.current?.focus();
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedProject(null);
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 light:border-gray-200 pb-3">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:border-purple-500 transition"
          onClick={() => onExplain?.("projects")}
        >
          <Code2 className="w-5 h-5 text-purple-400" />
          <h2 className="text-2xl font-bold text-white light:text-gray-900">Projects</h2>
          <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">tap to hear</span>
        </div>
        <span className="text-xs text-gray-400 light:text-gray-500 font-mono">GitHub Repositories</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => handleOpen(proj)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(proj); } }}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${proj.title}`}
            className="bg-gray-900/70 light:bg-gray-50 hover:bg-gray-900 light:hover:bg-gray-100 border border-gray-800 light:border-gray-200 hover:border-purple-800/60 rounded-xl p-6 flex flex-col justify-between cursor-pointer transition space-y-4 group shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 bg-purple-950/60 light:bg-purple-50 px-2.5 py-0.5 rounded border border-purple-800/40 light:border-purple-200 font-semibold">
                  #{proj.id}
                </span>
                <span className="text-xs text-purple-300 light:text-purple-700 font-mono flex items-center gap-1 group-hover:text-purple-200">
                  Details <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white light:text-gray-900 group-hover:text-purple-300 transition">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-purple-400 pt-0.5">
                  {proj.tagline}
                </p>
              </div>

              <p className="text-xs text-gray-300 light:text-gray-600 leading-relaxed">
                {proj.description}
              </p>

              {/* Architecture Flow */}
              {proj.architecture && (
                <div className="bg-gray-800/50 light:bg-gray-100 rounded-lg p-3 border border-gray-700/50 light:border-gray-200">
                  <div className="text-[10px] font-mono text-gray-400 light:text-gray-500 uppercase mb-1.5">Architecture</div>
                  <div className="text-xs font-mono text-purple-300 light:text-purple-600">
                    {proj.architecture[0]}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-800/80 light:border-gray-200">
              <div className="flex flex-wrap gap-1.5">
                {proj.builtWith.map((tech: string, i: number) => (
                  <span key={i} className="text-[10px] font-mono bg-gray-800 light:bg-gray-100 text-gray-300 light:text-gray-700 px-2 py-0.5 rounded border border-gray-700 light:border-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0b0f17]/80 light:bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="bg-[#0b0f17] light:bg-white border border-purple-800/60 light:border-gray-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl shadow-purple-950/50"
          >
            <button
              ref={closeButtonRef}
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-gray-400 light:text-gray-500 hover:text-white light:hover:text-gray-900 p-1.5 rounded-lg bg-gray-900 light:bg-gray-100 border border-gray-800 light:border-gray-200 transition text-xs font-mono flex items-center gap-1 z-10"
              aria-label="Close project details"
            >
              <X className="w-4 h-4" /> Close
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase">Project ({selectedProject.id})</span>
              <h3 id="project-modal-title" className="text-2xl font-bold text-white light:text-gray-900">{selectedProject.title}</h3>
              <p className="text-xs font-mono text-purple-300">{selectedProject.tagline}</p>
            </div>

            <div className="space-y-4">
              {/* What it does */}
              <div>
                <h4 className="text-xs font-mono text-emerald-400 uppercase font-semibold mb-1">What It Does</h4>
                <p className="text-xs text-gray-300 light:text-gray-600 leading-relaxed bg-emerald-950/20 light:bg-emerald-50 p-4 rounded-lg border border-emerald-800/30 light:border-emerald-200">
                  {selectedProject.proof || selectedProject.description}
                </p>
              </div>

              {/* Architecture */}
              {selectedProject.architecture && (
                <div>
                  <h4 className="text-xs font-mono text-blue-400 uppercase font-semibold mb-1">Architecture</h4>
                  <div className="bg-gray-800/50 light:bg-gray-100 p-4 rounded-lg border border-gray-700/50 light:border-gray-200">
                    <div className="text-xs font-mono text-purple-300 light:text-purple-600">
                      {selectedProject.architecture[0]}
                    </div>
                  </div>
                </div>
              )}

              {/* What I Built */}
              <div>
                <h4 className="text-xs font-mono text-gray-400 light:text-gray-500 uppercase font-semibold mb-2">What I Built</h4>
                <ul className="text-xs text-gray-300 light:text-gray-600 space-y-2 list-disc list-inside bg-gray-800/40 light:bg-gray-50 p-4 rounded-lg border border-gray-800 light:border-gray-200">
                  {selectedProject.whatIBuilt.map((bullet: string, i: number) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div>
                <h4 className="text-xs font-mono text-gray-400 light:text-gray-500 uppercase font-semibold mb-2">Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.builtWith.map((t: string, i: number) => (
                    <span key={i} className="text-xs font-mono bg-purple-950/60 text-purple-300 px-3 py-1 rounded-md border border-purple-800/40 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 light:border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs text-gray-400 light:text-gray-500 hover:text-white light:hover:text-gray-900 transition font-medium"
              >
                Return to Portfolio
              </button>
              <div className="flex items-center gap-3">
                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-md"
                  >
                    <Zap className="w-4 h-4" /> Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-md"
                >
                  <Globe className="w-4 h-4" /> GitHub <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
