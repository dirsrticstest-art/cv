"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Capabilities from "@/components/Capabilities";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import AIAssistant from "@/components/AIAssistant";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  const handleToggleChat = () => setChatOpen(!chatOpen);
  const handleProjectOpen = () => {
    setChatOpen(true);
  };
  const handleSkillOpen = () => {
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-100 selection:bg-purple-600 selection:text-white pb-24 font-sans relative dark:bg-[#0b0f17] light:bg-white light:text-gray-900">
      
      {/* Ambient Lighting */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

      <ThemeToggle />
      <Header 
        chatOpen={chatOpen} 
        onToggleChat={handleToggleChat} 
      />

      <main id="main-content" className="max-w-5xl mx-auto px-6 space-y-20 pt-10">
        <Hero />
        <Profile />
        <Capabilities />
        <Education />
        <Experience />
        <Projects onProjectOpen={handleProjectOpen} />
        <Skills onSkillOpen={handleSkillOpen} />
        <Certifications />
        <Hobbies />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 light:border-gray-200 text-center text-xs text-gray-500 light:text-gray-400 font-mono">
        <p>&copy; 2026 Ahmed Mohamed Abdelatif | Python Backend Developer & AI Automation.</p>
      </footer>

      <AIAssistant 
        chatOpen={chatOpen} 
        onToggleChat={handleToggleChat}
        onProjectOpen={handleProjectOpen}
        onSkillOpen={handleSkillOpen}
      />
    </div>
  );
}
