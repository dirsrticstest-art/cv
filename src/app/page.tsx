"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Bot, 
  Send, 
  Terminal, 
  Code2, 
  Briefcase, 
  Cpu, 
  Award, 
  FileText,
  ChevronRight,
  Shield,
  Workflow,
  Database,
  Layers,
  CheckCircle2,
  Server
} from "lucide-react";

export default function Home() {
  // AI Chat Assistant State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I am Ahmed's AI Assistant. Ask me anything about his experience with Meta WhatsApp Cloud API, FastAPI backends, or AI Automation!"
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");

    // Professional AI responses customized to Ahmed's profile
    setTimeout(() => {
      let aiReply = "Ahmed is an AI Automation Engineer & Python Backend Developer. He specializes in FastAPI, Meta WhatsApp Cloud API integrations, workflow automation, and scalable backend architecture.";
      const query = userText.toLowerCase();
      
      if (query.includes("h2m") || query.includes("work") || query.includes("experience") || query.includes("خبرة")) {
        aiReply = "At H2M, Ahmed built core backend systems & financial tools for profitability, pricing, and campaign analytics from scratch. He also architected messaging workflows using the Meta WhatsApp Cloud API.";
      } else if (query.includes("whatsapp") || query.includes("meta") || query.includes("automation") || query.includes("أتمتة")) {
        aiReply = "Ahmed has extensive hands-on experience with Meta WhatsApp Cloud API: webhooks, automated reply workflows, campaign scheduling, and customer support automation.";
      } else if (query.includes("skill") || query.includes("python") || query.includes("stack") || query.includes("مهارات")) {
        aiReply = "Ahmed's stack includes Python, C++, SQL (FastAPI, REST APIs, SQLite, Database Design), Async & Background Processing, Webhooks, Git, and Linux.";
      } else if (query.includes("contact") || query.includes("email") || query.includes("تواصل") || query.includes("إيميل")) {
        aiReply = "You can email Ahmed directly at ahmeeedmohaaamed1@gmail.com or explore his GitHub at https://github.com/dirsrticstest-art !";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    }, 600);
  };

  const projects = [
    {
      title: "Meta WhatsApp Cloud API Automation Suite",
      description: "Enterprise messaging workflow & customer support automation system. Integrates webhooks, conversation management, automated reply triggers, and targeted campaign scheduling.",
      metrics: "⚡ Real-time Webhook Processing | Automated Customer Journeys",
      tags: ["Python", "FastAPI", "Meta WhatsApp API", "Webhooks", "Async Tasks"],
      github: "https://github.com/dirsrticstest-art",
      demo: "#"
    },
    {
      title: "E-Commerce Profitability & Analytics Engine",
      description: "Custom backend financial computation tools built for pricing optimization, marketing campaign performance tracking, shipping analytics, and customer profitability metrics.",
      metrics: "📈 Accurate Financial Analytics | Built from Scratch",
      tags: ["Python", "REST APIs", "SQL", "Database Design", "Business Intelligence"],
      github: "https://github.com/dirsrticstest-art",
      demo: "#"
    },
    {
      title: "Automated Email & Event Dispatcher Service",
      description: "Background processing service utilizing SMTP and event-driven architecture for transactional email delivery, customer notifications, and automated error logging.",
      metrics: "🚀 Reliable Background Processing | Zero Message Loss",
      tags: ["Python", "SMTP", "Background Queues", "JSON API", "Linux"],
      github: "https://github.com/dirsrticstest-art",
      demo: "#"
    }
  ];

  const skillCategories = [
    {
      category: "Programming Languages",
      icon: Code2,
      skills: ["Python", "C++", "SQL"]
    },
    {
      category: "Backend & API Architecture",
      icon: Server,
      skills: ["FastAPI", "REST APIs", "Backend Architecture", "Webhooks", "Background Processing", "Async Queues"]
    },
    {
      category: "AI & Workflow Automation",
      icon: Workflow,
      skills: ["AI Automation", "Workflow Automation", "Event-Driven Systems", "Automated Messaging", "Customer Support Bots"]
    },
    {
      category: "Integrations & APIs",
      icon: Layers,
      skills: ["Meta WhatsApp Cloud API", "Webhooks", "SMTP / Email Automation", "Third-Party API Integration"]
    },
    {
      category: "Databases & Storage",
      icon: Database,
      skills: ["SQLite", "SQL", "Database Design", "CRUD Operations"]
    },
    {
      category: "Core Computer Science",
      icon: Shield,
      skills: ["Object-Oriented Programming (OOP)", "Data Structures", "Algorithms", "Error Handling", "Software Architecture"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 relative selection:bg-purple-500 selection:text-white">
      {/* Ambient Glow Background Accents */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#090d16]/80 border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              AHMED MOHAMED
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
              AI & BACKEND
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium">
            <a href="#about" className="hover:text-purple-400 transition">About</a>
            <a href="#experience" className="hover:text-purple-400 transition">Experience</a>
            <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
            <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
            <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-lg shadow-purple-900/30"
            >
              <Mail className="w-3.5 h-3.5" /> Get In Touch
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Automation Engineer & Python Backend Developer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Architecting Intelligent <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Backends & Automation
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
            I build robust backend systems, RESTful APIs, and intelligent automation workflows that solve real business problems. Focused on AI integration, scalable architecture, Meta WhatsApp APIs, and software reliability.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#projects" 
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-purple-900/40"
            >
              View Work & Systems <ChevronRight className="w-4 h-4" />
            </a>
            
            <div className="flex items-center gap-3 pl-2">
              <a href="https://github.com/dirsrticstest-art" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white border border-white/10 transition" title="GitHub">
                <Globe className="w-5 h-5" />
              </a>
              <a href="mailto:ahmeeedmohaaamed1@gmail.com" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white border border-white/10 transition" title="Direct Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Live Code Snippet Terminal */}
        <div className="md:col-span-5">
          <div className="glass-card rounded-2xl p-5 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <Terminal className="w-3.5 h-3.5 text-purple-400" /> ahmed_backend.py
              </div>
            </div>

            <pre className="font-mono text-xs text-purple-200/90 leading-relaxed overflow-x-auto">
              <code>
<span className="text-purple-400">class</span> <span className="text-yellow-300">BackendEngineer</span>:<br/>
&nbsp;&nbsp;name = <span className="text-green-300">&quot;Ahmed Mohamed Abdelatif&quot;</span><br/>
&nbsp;&nbsp;role = <span className="text-green-300">&quot;AI Automation & Backend Developer&quot;</span><br/>
&nbsp;&nbsp;primary_language = <span className="text-green-300">&quot;Python / C++&quot;</span><br/>
&nbsp;&nbsp;specialties = [<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">&quot;FastAPI / REST APIs&quot;</span>,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">&quot;Meta WhatsApp Cloud API&quot;</span>,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">&quot;Workflow Automation&quot;</span>,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">&quot;Database & Async Queues&quot;</span><br/>
&nbsp;&nbsp;]<br/><br/>
&nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">solve_business_problem</span>(self, requirements):<br/>
&nbsp;&nbsp;&nbsp;&nbsp;architecture = self.design_clean_backend()<br/>
&nbsp;&nbsp;&nbsp;&nbsp;automation = self.integrate_ai_workflows()<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-300">&quot;🚀 Scalable & Reliable Business Solution&quot;</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="mb-12">
          <h2 className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-2">Professional Work</h2>
          <p className="text-3xl font-bold text-white">Work Experience</p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block mb-2">
                Recent Full-time Role | On-site
              </span>
              <h3 className="text-2xl font-bold text-white">Backend Developer</h3>
              <p className="text-base text-purple-300 flex items-center gap-2 font-medium">
                <Briefcase className="w-4 h-4 text-blue-400" /> H2M (3 Months Full-time)
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p className="text-gray-200 font-medium">
              Engineered core backend infrastructure and custom business intelligence tools from scratch based on strict operational requirements:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Business & Financial Analytics Tools
                </h4>
                <p className="text-xs text-gray-400 leading-normal">
                  Built pricing algorithms, profitability calculators, campaign tracking, shipping metrics, and customer analytics engines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Meta WhatsApp Cloud API Integration
                </h4>
                <p className="text-xs text-gray-400 leading-normal">
                  Architected webhooks, message templates, automated reply workflows, customer conversation pipelines, and scheduled marketing campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-2">Technical Proof</h2>
            <p className="text-3xl font-bold text-white">Featured Systems & Automations</p>
          </div>
          <p className="text-gray-400 text-sm max-w-md mt-2 md:mt-0">
            Real-world backend tools engineered for business automation, reliability, and scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <div key={idx} className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <a href={proj.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition p-1" title="View Source on GitHub">
                    <Globe className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{proj.description}</p>
              </div>

              <div>
                <div className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 mb-4 inline-block">
                  {proj.metrics}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((t, i) => (
                    <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorized Skills Section */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="mb-12">
          <h2 className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-2">Technical Mastery</h2>
          <p className="text-3xl font-bold text-white">Skills & Technology Stack</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <cat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{cat.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
            Let&apos;s Build Powerful Automations Together
          </h2>
          
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-sm sm:text-base relative z-10">
            Available for Python Backend Development, AI Automation, and API Integration roles. Reach out directly via email.
          </p>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a 
              href="mailto:ahmeeedmohaaamed1@gmail.com" 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium px-8 py-3.5 rounded-xl transition shadow-xl shadow-purple-900/50 text-sm"
            >
              <Mail className="w-4 h-4" /> ahmeeedmohaaamed1@gmail.com
            </a>

            <a 
              href="https://github.com/dirsrticstest-art" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-xl border border-white/10 transition text-sm"
            >
              <Globe className="w-4 h-4" /> GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-gray-500 font-mono">
        <p>© 2026 Ahmed Mohamed Abdelatif | AI Automation Engineer & Python Backend Developer.</p>
      </footer>

      {/* Interactive AI Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium px-4 py-3 rounded-full shadow-2xl transition transform hover:scale-105 border border-white/20"
          >
            <Bot className="w-5 h-5 text-purple-200" />
            <span className="text-xs font-semibold">Talk to Ahmed&apos;s AI Bot</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        ) : (
          <div className="glass-card w-[340px] sm:w-[380px] h-[460px] rounded-2xl shadow-2xl flex flex-col border border-purple-500/30 overflow-hidden">
            {/* Widget Header */}
            <div className="p-3.5 bg-purple-950/70 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ahmed&apos;s AI Assistant</h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active 24/7
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-white text-xs font-mono p-1"
              >
                ✕
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                      m.sender === "user" 
                        ? "bg-purple-600 text-white rounded-br-none" 
                        : "bg-white/10 text-gray-200 rounded-bl-none border border-white/10"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Ask about my FastAPI or WhatsApp API experience..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
