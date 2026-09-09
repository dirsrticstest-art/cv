"use client";

import { useState } from "react";
import { Code2, ChevronRight, Globe, ExternalLink, Zap, X } from "lucide-react";
import { projects } from "./data";

interface ProjectsProps {
  onProjectOpen?: (project: (typeof projects)[number]) => void;
}

export default function Projects({ onProjectOpen }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

  const handleOpen = (proj: (typeof projects)[number]) => {
    setSelectedProject(proj);
    onProjectOpen?.(proj);
  };

  return (
    <section id="projects" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Engineered Systems & Projects</h2>
        </div>
        <span className="text-xs text-gray-400 font-mono">Repositories on GitHub</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => handleOpen(proj)}
            className="bg-gray-900/70 hover:bg-gray-900 border border-gray-800 hover:border-purple-800/60 rounded-xl p-6 flex flex-col justify-between cursor-pointer transition space-y-5 group shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-800/40 font-semibold">
                  Project #{proj.id}
                </span>
                <span className="text-xs text-purple-300 font-mono flex items-center gap-1 group-hover:text-purple-200">
                  Details & Technical Bullets <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-purple-400 pt-0.5">
                  {proj.tagline}
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {proj.description}
              </p>

              {proj.metrics && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {proj.metrics.map((m: { label: string; value: string }, i: number) => (
                    <span key={i} className="text-[10px] font-mono text-purple-300 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/40">
                      {m.value} {m.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-800/80">
              <div className="text-[11px] font-mono text-gray-400 uppercase font-semibold">Technologies:</div>
              <div className="flex flex-wrap gap-1.5">
                {proj.builtWith.map((tech: string, i: number) => (
                  <span key={i} className="text-[11px] font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0b0f17]/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b0f17] border border-purple-800/60 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl shadow-purple-950/50">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1.5 rounded-lg bg-gray-900 border border-gray-800 transition text-xs font-mono flex items-center gap-1 z-10"
            >
              <X className="w-4 h-4" /> Close
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase">Project Overview ({selectedProject.id})</span>
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              <p className="text-xs font-mono text-purple-300">{selectedProject.tagline}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono text-emerald-400 uppercase font-semibold mb-1">Why I Built This</h4>
                <p className="text-xs text-gray-300 leading-relaxed bg-emerald-950/20 p-4 rounded-lg border border-emerald-800/30">
                  {selectedProject.whyBuilt}
                </p>
              </div>

              {selectedProject.metrics && (
                <div className="grid grid-cols-3 gap-3">
                  {selectedProject.metrics.map((m: { label: string; value: string }, i: number) => (
                    <div key={i} className="text-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="text-lg font-bold text-purple-400">{m.value}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {selectedProject.caseStudy && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-purple-400 uppercase font-semibold">Case Study</h4>

                  <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-800 space-y-1">
                    <h5 className="text-[11px] font-mono text-red-400 uppercase font-bold">Problem</h5>
                    <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.caseStudy.problem}</p>
                  </div>

                  <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-800 space-y-1">
                    <h5 className="text-[11px] font-mono text-blue-400 uppercase font-bold">Process</h5>
                    <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.caseStudy.process}</p>
                  </div>

                  <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-800 space-y-1">
                    <h5 className="text-[11px] font-mono text-emerald-400 uppercase font-bold">Result</h5>
                    <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.caseStudy.result}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-2">Technical Bullets & Implementation</h4>
                <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside bg-gray-800/40 p-4 rounded-lg border border-gray-800">
                  {selectedProject.whatIBuilt.map((bullet: string, i: number) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.builtWith.map((t: string, i: number) => (
                    <span key={i} className="text-xs font-mono bg-purple-950/60 text-purple-300 px-3 py-1 rounded-md border border-purple-800/40 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs text-gray-400 hover:text-white transition font-medium"
              >
                Return to Portfolio
              </button>
              <div className="flex items-center gap-3">
                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-md"
                  >
                    <Zap className="w-4 h-4" /> Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-md"
                >
                  <Globe className="w-4 h-4" /> View GitHub Repository <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
