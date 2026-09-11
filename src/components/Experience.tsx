"use client";

import { Briefcase, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-800 light:border-gray-200 pb-3">
        <Briefcase className="w-5 h-5 text-purple-400" />
        <h2 className="text-2xl font-bold text-white light:text-gray-900">Work Experience</h2>
      </div>

      <div className="bg-gray-900/70 light:bg-gray-50 border border-gray-800 light:border-gray-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-gray-800 light:border-gray-200 pb-5">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 light:bg-purple-50 px-3 py-1 rounded-md border border-purple-800/40 light:border-purple-200 font-semibold">
                3 Months · Full-time · On-site
              </span>
              <span className="text-xs font-mono text-gray-400 bg-gray-800 light:bg-gray-100 px-2.5 py-1 rounded border border-gray-700 light:border-gray-300">
                Cairo, Egypt
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white light:text-gray-900 pt-1">Backend Developer</h3>
            <p className="text-sm text-purple-300 light:text-purple-700 font-medium">H2M — MAXP Online Platform</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-300 light:text-gray-600 leading-relaxed">
          <p className="font-semibold text-gray-200 light:text-gray-700">
            Built and maintained backend tools and customer messaging workflows for MAXP Online:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/60 light:bg-gray-100 p-5 rounded-lg border border-gray-700/80 light:border-gray-200 space-y-2.5">
              <h4 className="font-bold text-purple-300 light:text-purple-700 text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> MAXP Business & Financial Analytics
              </h4>
              <ul className="text-xs text-gray-300 light:text-gray-600 space-y-2 list-disc list-inside">
                <li>Built product pricing and profitability calculation tools.</li>
                <li>Developed marketing campaign tracking and shipping analytics.</li>
                <li>Built customer performance analytics tools.</li>
              </ul>
            </div>

            <div className="bg-gray-800/60 light:bg-gray-100 p-5 rounded-lg border border-gray-700/80 light:border-gray-200 space-y-2.5">
              <h4 className="font-bold text-purple-300 light:text-purple-700 text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Meta WhatsApp Cloud API
              </h4>
              <ul className="text-xs text-gray-300 light:text-gray-600 space-y-2 list-disc list-inside">
                <li>Built WhatsApp workflows using webhooks and message templates.</li>
                <li>Implemented automated replies and customer conversation workflows.</li>
                <li>Worked on scheduled marketing campaigns and API integrations.</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-950/40 light:bg-purple-50 p-3.5 rounded-lg border border-purple-800/40 light:border-purple-200 text-xs text-purple-200 light:text-purple-700 font-mono">
            <strong>Workflow Pattern:</strong> Webhook → Backend → Business Logic → WhatsApp API
          </div>
        </div>
      </div>
    </section>
  );
}
