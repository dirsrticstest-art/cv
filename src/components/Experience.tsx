"use client";

import { Briefcase, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
        <Briefcase className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Work Experience</h2>
      </div>

      <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-gray-800 pb-5">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-3 py-1 rounded-md border border-purple-800/40 font-semibold">
                3 Months · Full-time · On-site
              </span>
              <span className="text-xs font-mono text-gray-400 bg-gray-800 px-2.5 py-1 rounded border border-gray-700">
                Cairo, Egypt
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white pt-1">Backend Developer</h3>
            <p className="text-sm text-purple-300 font-medium">H2M — MAXP Online Platform</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p className="font-semibold text-gray-200">
            Built and maintained backend tools and customer messaging workflows for MAXP Online:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/60 p-5 rounded-lg border border-gray-700/80 space-y-2.5">
              <h4 className="font-bold text-purple-300 text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> MAXP Business & Financial Analytics
              </h4>
              <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
                <li>Built product pricing and profitability calculation tools.</li>
                <li>Developed marketing campaign tracking and shipping analytics.</li>
                <li>Built customer performance analytics tools.</li>
              </ul>
            </div>

            <div className="bg-gray-800/60 p-5 rounded-lg border border-gray-700/80 space-y-2.5">
              <h4 className="font-bold text-purple-300 text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Meta WhatsApp Cloud API
              </h4>
              <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
                <li>Built WhatsApp workflows using webhooks and message templates.</li>
                <li>Implemented automated replies and customer conversation workflows.</li>
                <li>Worked on scheduled marketing campaigns and API integrations.</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-950/40 p-3.5 rounded-lg border border-purple-800/40 text-xs text-purple-200 font-mono">
            <strong>Workflow Pattern:</strong> Webhook → Backend → Business Logic → WhatsApp API
          </div>
        </div>
      </div>
    </section>
  );
}
