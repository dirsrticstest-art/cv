"use client";

import React from "react";
import { Mail, Globe, FileText } from "lucide-react";
import { whatILookingFor } from "./data";

export default function Contact() {
  return (
    <section className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-purple-950/40 light:from-gray-50 light:via-gray-50 light:to-purple-50 border border-gray-800 light:border-gray-200 rounded-xl p-8 sm:p-12 space-y-6 text-center shadow-lg relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h2 className="text-3xl font-extrabold text-white light:text-gray-900">
            What I&apos;m Looking For
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 light:text-gray-600 leading-relaxed">
            {whatILookingFor}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2 relative z-10">
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ahmeeedmohaaamed1@gmail.com" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-7 py-3.5 rounded-lg transition text-sm shadow-lg shadow-purple-950/80"
          >
            <Mail className="w-4 h-4" /> Email
          </a>

          <a 
            href="https://www.linkedin.com/in/ahmed-mohamed-b69920435" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3.5 rounded-lg transition text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>

          <a 
            href="https://github.com/ahmed-abdelatif" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 light:bg-gray-100 light:hover:bg-gray-200 text-gray-200 light:text-gray-700 font-semibold px-6 py-3.5 rounded-lg border border-gray-700 light:border-gray-300 transition text-sm"
          >
            <Globe className="w-4 h-4" /> GitHub
          </a>

          <a 
            href="/Ahmed_Abdelatif_CV.pdf" 
            download
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-lg transition text-sm"
          >
            <FileText className="w-4 h-4" /> Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
