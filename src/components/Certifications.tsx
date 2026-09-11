"use client";

import { Award, ExternalLink } from "lucide-react";
import { certifications } from "./data";

export default function Certifications() {
  return (
    <section id="certifications" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 light:border-gray-200 pb-3">
        <Award className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white light:text-gray-900">Certifications</h2>
      </div>

      <div className="bg-gray-900/70 light:bg-gray-50 border border-gray-800 light:border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-purple-400 bg-purple-950/60 light:bg-purple-50 px-2.5 py-0.5 rounded border border-purple-800/40 light:border-purple-200 font-semibold">
            HackerRank
          </span>
        </div>

        <div className="space-y-2">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-gray-800/50 light:border-gray-200 last:border-0"
            >
              <span className="text-sm text-gray-300 light:text-gray-700 font-medium">
                {cert.name}
              </span>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 light:hover:text-purple-600 font-mono transition shrink-0"
              >
                View <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
