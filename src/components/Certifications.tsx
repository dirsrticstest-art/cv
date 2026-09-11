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

      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="bg-gray-900/70 light:bg-gray-50 border border-gray-800 light:border-gray-200 hover:border-purple-800/60 rounded-xl p-5 flex flex-col justify-between space-y-3 transition group shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 bg-purple-950/60 light:bg-purple-50 px-2.5 py-0.5 rounded border border-purple-800/40 light:border-purple-200 font-semibold">
                  {cert.issuer}
                </span>
                <span className="text-[10px] font-mono text-gray-400 light:text-gray-500">
                  {cert.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white light:text-gray-900 group-hover:text-purple-300 transition">
                {cert.name}
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-gray-800 light:bg-gray-100 text-gray-300 light:text-gray-700 px-2 py-0.5 rounded border border-gray-700 light:border-gray-300">
                  {cert.skill}
                </span>
              </div>
            </div>

            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-mono transition"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Credential
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
