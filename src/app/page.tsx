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
  UserCheck
} from "lucide-react";

export default function Home() {
  // AI Chat Assistant State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I am Ahmed's AI Resume Assistant. Ask me anything about his experience, technical stack, or projects!"
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");

    // Simulate AI response based on CV query
    setTimeout(() => {
      let aiReply = "Ahmed has over 4+ years of experience building scalable Web Apps & AI integrations. He specializes in Next.js, React, Node.js, and cloud architectures.";
      if (userText.toLowerCase().includes("project") || userText.toLowerCase().includes("مشروع")) {
        aiReply = "Some of Ahmed's featured projects include InsightFlow (AI Analytics SaaS) and SynergyCloud (Distributed Systems Dashboard). Check out the Projects section below!";
      } else if (userText.toLowerCase().includes("contact") || userText.toLowerCase().includes("تواصل") || userText.toLowerCase().includes("email")) {
        aiReply = "You can reach Ahmed directly via email at ahmed@example.com or via LinkedIn!";
      }
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    }, 600);
  };

  const projects = [
    {
      title: "InsightFlow AI Analytics Platform",
      description: "Enterprise SaaS platform providing real-time predictive data analytics, automated anomaly detection, and interactive visual dashboards.",
      metrics: "⚡ 45% faster query times | 10k+ Daily Active Users",
      tags: ["Next.js 15", "TypeScript", "Python / FastAPI", "PostgreSQL", "Tailwind CSS"],
      github: "#",
      demo: "#"
    },
    {
      title: "SynergyCloud Infrastructure Visualizer",
      description: "Real-time distributed system architecture monitoring panel with automated latency alert triggers and Kubernetes cluster metric streams.",
      metrics: "🚀 99.99% Uptime Monitored | Reduced Incident Response by 30m",
      tags: ["React", "Node.js", "Docker", "Kubernetes", "GraphQL", "Tailwind"],
      github: "#",
      demo: "#"
    },
    {
      title: "NeuralNet Visualizer & AI Playground",
      description: "Browser-based interactive neural network architecture builder and real-time weight visualization tool for educational machine learning model design.",
      metrics: "🌟 Featured in Developer Tech Weekly | 2.5k Star Rating",
      tags: ["TypeScript", "PyTorch", "WebGL", "Next.js", "Tailwind CSS"],
      github: "#",
      demo: "#"
    }
  ];

  const experiences = [
    {
      period: "2024 - Present",
      role: "Senior Full-Stack & AI Systems Engineer",
      company: "Tech Global Innovations",
      details: "Leading frontend architecture and AI service integrations for enterprise clients. Improved application rendering performance by 40% and mentored 5 junior developers."
    },
    {
      period: "2022 - 2024",
      role: "Full-Stack Software Engineer",
      company: "Nexus Digital Systems",
      details: "Designed and maintained microservices using Node.js, Express, and Next.js. Reduced API response latency by 35% through optimized caching strategies."
    },
    {
      period: "2021 - 2022",
      role: "Frontend Developer",
      company: "Innovate Labs",
      details: "Built responsive, high-accessibility UI components using React, Redux, and Tailwind CSS for high-traffic SaaS applications."
    }
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 relative selection:bg-purple-500 selection:text-white">
      {/* Glow Ambient Background Highlights */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#090d16]/75 border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AHMED
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
              PORTFOLIO 2026
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium">
            <a href="#about" className="hover:text-purple-400 transition">About</a>
            <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
            <a href="#experience" className="hover:text-purple-400 transition">Experience</a>
            <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
            <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-lg shadow-purple-900/30"
            >
              <FileText className="w-3.5 h-3.5" /> Resume PDF
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Available for Senior & Remote Opportunities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Building High-Impact <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Full-Stack & AI Systems
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Passionate Software Engineer specializing in modern web architecture, scalable cloud services, and real-time interactive user experiences crafted for top global tech products.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#projects" 
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-purple-900/40"
            >
              Explore Featured Work <ChevronRight className="w-4 h-4" />
            </a>
            
            <div className="flex items-center gap-3 pl-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white border border-white/10 transition">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white border border-white/10 transition">
                <UserCheck className="w-5 h-5" />
              </a>
              <a href="mailto:ahmed@example.com" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white border border-white/10 transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Code Snippet Card */}
        <div className="md:col-span-5">
          <div className="glass-card rounded-2xl p-5 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <Terminal className="w-3.5 h-3.5 text-purple-400" /> developer-core.ts
              </div>
            </div>

            <pre className="font-mono text-xs text-purple-200/90 leading-relaxed overflow-x-auto">
              <code>
<span className="text-purple-400">interface</span> Developer &#123;<br/>
&nbsp;&nbsp;name: <span className="text-green-300">&quot;Ahmed&quot;</span>;<br/>
&nbsp;&nbsp;role: <span className="text-green-300">&quot;Senior Software Engineer&quot;</span>;<br/>
&nbsp;&nbsp;location: <span className="text-green-300">&quot;Global / Remote&quot;</span>;<br/>
&nbsp;&nbsp;coreStack: [<span className="text-green-300">&quot;Next.js&quot;</span>, <span className="text-green-300">&quot;TypeScript&quot;</span>, <span className="text-green-300">&quot;Node.js&quot;</span>, <span className="text-green-300">&quot;AI/LLMs&quot;</span>];<br/>
&nbsp;&nbsp;passion: <span className="text-green-300">&quot;Architecting fast & scalable products&quot;</span>;<br/>
&#125;<br/><br/>
<span className="text-purple-400">async function</span> buildImpact() &#123;<br/>
&nbsp;&nbsp;<span className="text-blue-400">await</span> codeCleanArchitecture();<br/>
&nbsp;&nbsp;<span className="text-blue-400">await</span> optimizePerformance();<br/>
&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-300">&quot;🚀 Ready to deliver enterprise value&quot;</span>;<br/>
&#125;
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-2">Selected Projects</h2>
            <p className="text-3xl font-bold text-white">Proof of Technical Depth</p>
          </div>
          <p className="text-gray-400 text-sm max-w-md mt-2 md:mt-0">
            Real-world systems engineered with focus on scalability, maintainability, and measurable results.
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
                  <div className="flex items-center gap-2">
                    <a href={proj.github} className="text-gray-400 hover:text-white transition p-1">
                      <Globe className="w-4 h-4" />
                    </a>
                    <a href={proj.demo} className="text-gray-400 hover:text-white transition p-1">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
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

      {/* Experience Section */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="mb-12">
          <h2 className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-2">Career Journey</h2>
          <p className="text-3xl font-bold text-white">Work Experience</p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 md:w-1/3">
                <span className="text-xs font-mono text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block">
                  {exp.period}
                </span>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <p className="text-sm text-gray-400 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-400" /> {exp.company}
                </p>
              </div>
              <div className="md:w-2/3 text-gray-300 text-sm leading-relaxed">
                {exp.details}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Radar Section */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="mb-12">
          <h2 className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-2">Core Competencies</h2>
          <p className="text-3xl font-bold text-white">Tech Stack & Tools</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "TypeScript / JavaScript", category: "Languages", icon: Code2 },
            { name: "React / Next.js", category: "Frontend Frameworks", icon: Cpu },
            { name: "Node.js / Express", category: "Backend Architecture", icon: Terminal },
            { name: "Python / FastAPI", category: "AI Services & APIs", icon: Sparkles },
            { name: "PostgreSQL / MongoDB", category: "Database Systems", icon: Award },
            { name: "Tailwind CSS", category: "UI/UX Styling", icon: Code2 },
            { name: "Docker / CI/CD", category: "DevOps & Deployment", icon: Briefcase },
            { name: "GraphQL / REST APIs", category: "API Design", icon: UserCheck },
          ].map((skill, idx) => (
            <div key={idx} className="glass-card p-4 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-white/5 text-purple-400">
                <skill.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                <p className="text-[11px] text-gray-400">{skill.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 relative z-10">
            Let&apos;s Build Something Incredible Together
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-sm sm:text-base relative z-10">
            Interested in hiring for a senior/remote role or discussing a strategic technical project? Send a message directly.
          </p>
          <div className="flex justify-center gap-4 relative z-10">
            <a 
              href="mailto:ahmed@example.com" 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium px-8 py-3.5 rounded-xl transition shadow-xl shadow-purple-900/50 text-sm"
            >
              <Mail className="w-4 h-4" /> Send Direct Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-gray-500 font-mono">
        <p>© 2026 Ahmed | Modern Developer Portfolio. Built with Next.js & Tailwind CSS.</p>
      </footer>

      {/* Interactive AI Resume Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium px-4 py-3 rounded-full shadow-2xl transition transform hover:scale-105 border border-white/20"
          >
            <Bot className="w-5 h-5 text-purple-200" />
            <span className="text-xs font-semibold">Talk to my AI Resume</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        ) : (
          <div className="glass-card w-[340px] sm:w-[380px] h-[460px] rounded-2xl shadow-2xl flex flex-col border border-purple-500/30 overflow-hidden">
            {/* Widget Header */}
            <div className="p-3.5 bg-purple-950/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AI Resume Assistant</h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online (2026 Engine)
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

            {/* Widget Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
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

            {/* Widget Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Ask about my experience..."
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
