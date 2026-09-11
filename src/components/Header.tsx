"use client";

import { Bot, Mail, FileText } from "lucide-react";

interface HeaderProps {
  chatOpen: boolean;
  onToggleChat: () => void;
}

export default function Header({ chatOpen, onToggleChat }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0b0f17]/90 light:bg-white/90 border-b border-gray-800/80 light:border-gray-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg font-extrabold text-white light:text-gray-900 tracking-tight">
              AHMED MOHAMED ABDELATIF
            </span>

            <div className="flex items-center gap-2 bg-purple-950/60 light:bg-purple-50 border border-purple-800/50 light:border-purple-200 px-3 py-1 rounded-full shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-mono text-gray-300 light:text-gray-600">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[11px]">Assistant Active</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-purple-400 font-mono font-medium">
            Python Backend Developer & AI Automation Specialist
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <button
            onClick={onToggleChat}
            className="flex items-center gap-1.5 bg-purple-900/60 hover:bg-purple-800 light:bg-purple-100 light:hover:bg-purple-200 text-purple-200 light:text-purple-700 px-3 py-1.5 rounded-lg border border-purple-700/60 light:border-purple-300 transition"
            aria-label={chatOpen ? "Hide assistant text log" : "Show assistant text log"}
          >
            <Bot className="w-3.5 h-3.5" /> {chatOpen ? "Hide Text Log" : "Show Text Log"}
          </button>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ahmeeedmohaaamed1@gmail.com"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 bg-purple-950/40 hover:bg-purple-900/60 light:bg-purple-50 light:hover:bg-purple-100 text-purple-300 light:text-purple-700 px-3.5 py-1.5 rounded-lg border border-purple-800/50 light:border-purple-200 transition shadow-sm"
            aria-label="Send email to Ahmed"
          >
            <Mail className="w-3.5 h-3.5 text-purple-400" /> Send Email
          </a>

          <a
            href="https://www.linkedin.com/in/ahmed-mohamed-b69920435"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 bg-blue-950/60 hover:bg-blue-900/60 light:bg-blue-50 light:hover:bg-blue-100 text-blue-300 light:text-blue-700 px-3.5 py-1.5 rounded-lg border border-blue-800/50 light:border-blue-200 transition"
            aria-label="View LinkedIn profile"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>

          <a
            href="https://github.com/ahmed-abdelatif"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 bg-gray-800/80 hover:bg-gray-700 light:bg-gray-100 light:hover:bg-gray-200 text-gray-200 light:text-gray-700 px-3.5 py-1.5 rounded-lg border border-gray-700 light:border-gray-300 transition"
            aria-label="View GitHub profile"
          >
            <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            GitHub Profile
          </a>

          <a
            href="/Ahmed_Abdelatif_CV.pdf"
            download
            className="flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 light:bg-emerald-50 light:hover:bg-emerald-100 text-emerald-300 light:text-emerald-700 px-3.5 py-1.5 rounded-lg border border-emerald-800/50 light:border-emerald-200 transition"
            aria-label="Download CV as PDF"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" /> Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
