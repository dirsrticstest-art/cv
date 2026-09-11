"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Bot, Send, X } from "lucide-react";
import { quickQuestions, projects, skillCategories } from "./data";

type ProjectType = (typeof projects)[number];
type SkillType = (typeof skillCategories)[number];

interface AIAssistantProps {
  chatOpen: boolean;
  onToggleChat: () => void;
  onProjectOpen?: (project: ProjectType) => void;
  onSkillOpen?: (skill: SkillType) => void;
}

export default function AIAssistant({ chatOpen, onToggleChat, onProjectOpen, onSkillOpen }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Welcome to Ahmed's Portfolio. I am Ahmed's AI Assistant — how can I help you?"
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentLangRef = useRef<string>("en-US");
  const messagesRef = useRef(messages);
  const chatOpenRef = useRef(chatOpen);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  const [voicesList, setVoicesList] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    chatOpenRef.current = chatOpen;
  }, [chatOpen]);

  useEffect(() => {
    return () => {
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const available = window.speechSynthesis.getVoices();
        if (available && available.length > 0) {
          setVoicesList(available);
        }
      };
      loadVoices();
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      };
    }
  }, []);

  const selectBestEnglishVoice = (availableVoices: SpeechSynthesisVoice[]) => {
    if (!availableVoices || availableVoices.length === 0) return null;
    return (
      availableVoices.find((v) => v.lang.startsWith("en") && v.name.includes("Online (Natural)") && (v.name.includes("Guy") || v.name.includes("Ryan") || v.name.includes("Male"))) ||
      availableVoices.find((v) => v.lang.startsWith("en") && v.name.includes("Natural")) ||
      availableVoices.find((v) => v.lang.startsWith("en") && (v.name.includes("Guy") || v.name.includes("Ryan") || v.name.includes("Daniel") || v.name.includes("David") || v.name.includes("Google"))) ||
      availableVoices.find((v) => v.lang.startsWith("en"))
    );
  };

  const speakText = useCallback((text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      stopListening();

      isSpeakingRef.current = true;
      setIsSpeaking(true);

      let cleanText = text
        .replace(/[*#_~`>]/g, "")
        .replace(/\(([^)]+)\)/g, ", $1,")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/\bFastAPI\b/gi, "Fast API")
        .replace(/\bPostgreSQL\b/gi, "Postgres Q L")
        .replace(/\bSQLAlchemy\b/gi, "SQL Alchemy")
        .replace(/\bChromaDB\b/gi, "Chroma D B")
        .replace(/\bREST APIs?\b/gi, "REST A P I s")
        .replace(/\bRESTful\b/gi, "REST ful")
        .replace(/\bAPI\b/g, "A P I")
        .replace(/\bRAG\b/g, "R A G")
        .replace(/\bECU\b/g, "E C U")
        .replace(/\bRQ\b/g, "R Q")
        .replace(/\bSMTP\b/g, "S M T P")
        .replace(/\n+/g, ". ")
        .replace(/\s+/g, " ")
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-US";
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      const available = voicesList.length > 0 ? voicesList : window.speechSynthesis.getVoices();
      const bestVoice = selectBestEnglishVoice(available);
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setIsSpeaking(true);
        stopListening();
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        if (chatOpenRef.current) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 350);
        }
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  }, [voicesList]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
      isListeningRef.current = false;
      setIsListening(false);
    }
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === "undefined" || isSpeakingRef.current || !chatOpenRef.current) return;
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    try {
      stopListening();

      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
        retryCountRef.current = 0;
      };

      recognition.onend = () => {
        isListeningRef.current = false;
        setIsListening(false);
        if (chatOpenRef.current && retryCountRef.current < MAX_RETRIES) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 250);
        }
      };

      recognition.onerror = (event: any) => {
        isListeningRef.current = false;
        setIsListening(false);
        if (event.error === "no-speech" || event.error === "aborted") {
          if (chatOpenRef.current && retryCountRef.current < MAX_RETRIES) {
            retryCountRef.current++;
            if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
            restartTimerRef.current = setTimeout(() => {
              startListening();
            }, 500);
          }
        }
      };

      recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
          const transcript = result[0].transcript;
          if (transcript && transcript.trim()) {
            stopSpeaking();
            processUserQuery(transcript.trim());
          }
        }
      };

      recognition.start();
    } catch (err) {
      isListeningRef.current = false;
      setIsListening(false);
    }
  }, [stopListening, stopSpeaking]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (chatOpen) {
      retryCountRef.current = 0;
      timer = setTimeout(() => {
        speakText(messages[0].text);
      }, 300);
    } else {
      stopListening();
      stopSpeaking();
    }
    return () => {
      clearTimeout(timer);
      stopListening();
      stopSpeaking();
    };
  }, [chatOpen, startListening, stopListening, speakText, stopSpeaking]);

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  const localFallbackReply = (qText: string) => {
    const q = qText.toLowerCase().trim();

    if (q.includes("full name") || q.includes("who is ahmed") || q.includes("nationality") || q.includes("egyptian") || q.includes("personal profile") || q.includes("academic profile") || q.includes("student status") || q.includes("bio")) {
      return "Ahmed Mohamed Abdelatif is an Egyptian Python Backend Developer & AI Automation Specialist based in Cairo. He is currently pursuing his B.Sc. in Computer Science at the Egyptian Chinese University (ECU) in Cairo with expected graduation in 2029. His military service status is officially postponed for study.";
    }

    if (q.includes("h2m") || q.includes("maxp") || q.includes("max p") || q.includes("financial") || q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("company") || q.includes("position")) {
      return "At H2M for MAXP Online, Ahmed solved the problem of manual financial tracking and campaign marketing dispatches. As a Python Backend Developer, he engineered product financial calculation tools for profit margins and shipping costs, marketing campaign analytics, and Meta WhatsApp Cloud API automated marketing dispatches.";
    }

    if (q.includes("customer support") || q.includes("whatsapp") || q.includes("meta cloud") || q.includes("ticket") || q.includes("project 1") || q.includes("first project") || q.includes("ai support")) {
      return "The AI Customer Support Platform (github.com/ahmed-abdelatif/AI_Customer_Support_Platform) is a backend system built with FastAPI for ticket management and WhatsApp automation. Ahmed built REST APIs, integrated Meta WhatsApp Cloud API webhooks, and implemented Redis/RQ background workers for message classification and automated AI response generation.";
    }

    if (q.includes("rag") || q.includes("vector") || q.includes("chromadb") || q.includes("sentence transformer") || q.includes("embedding") || q.includes("chunking") || q.includes("project 2") || q.includes("second project")) {
      return "The Enterprise RAG Knowledge Assistant (github.com/ahmed-abdelatif/Enterprise_RAG_Knowledge_Assistant) is a document-based semantic search backend. Ahmed implemented document ingestion for PDF, DOCX, and TXT files, recursive text chunking, Sentence Transformers embeddings, ChromaDB vector indexing, and source-referenced question answering.";
    }

    if (q.includes("document intelligence") || q.includes("pdf parsing") || q.includes("ocr") || q.includes("extraction") || q.includes("upload") || q.includes("project 3") || q.includes("third project")) {
      return "The AI Document Intelligence Platform (github.com/ahmed-abdelatif/AI_Document_Intelligence_Platform) handles long-running document workloads. Ahmed designed multipart PDF/DOCX upload validation APIs and offloaded structured data extraction to Redis/RQ background workers with processing status tracking and retry mechanisms.";
    }

    if (q.includes("medical event") || q.includes("smtp") || q.includes("email automation") || q.includes("event management") || q.includes("registration") || q.includes("project 4") || q.includes("fourth project")) {
      return "The Medical Event Automation Platform (github.com/ahmed-abdelatif/Medical_Event_Automation_Platform) manages event registrations and attendee workflows. Ahmed modeled relational database schemas with PostgreSQL and SQLAlchemy, and automated background email dispatches via Redis/RQ queues and SMTP integration.";
    }

    if (q.includes("lead") || q.includes("crm") || q.includes("qualification") || q.includes("scoring") || q.includes("groq") || q.includes("project 5") || q.includes("fifth project")) {
      return "The AI Lead Qualification & CRM Automation (github.com/dirsrticstest-art/AI_Lead_Qualification_Professional) classifies inbound leads using Groq LLM with a deterministic fallback. Ahmed built a FastAPI backend with Celery/Redis async CRM sync, exponential backoff retries, and a full PostgreSQL audit trail. Live demo: ai-lead-qualification-api.onrender.com";
    }

    if (q.includes("project") || q.includes("projects") || q.includes("built") || q.includes("portfolio") || q.includes("repos") || q.includes("systems")) {
      return "Ahmed engineered 5 production-ready backend systems: 1. AI Customer Support Platform (FastAPI & WhatsApp API), 2. Enterprise RAG Knowledge Assistant (ChromaDB vector search), 3. AI Document Intelligence Platform (Async PDF parsing), 4. Medical Event Automation Platform (SMTP dispatches), and 5. AI Lead Qualification & CRM Automation (Groq LLM + Celery). Which project would you like to explore?";
    }

    if (q.includes("value") || q.includes("proposition") || q.includes("capability") || q.includes("specialist") || q.includes("asynchronous") || q.includes("background")) {
      return "Ahmed's core value propositions center around: 1. Asynchronous REST API engineering with FastAPI & Pydantic. 2. Offloading heavy background tasks & notification dispatches using Redis/RQ. 3. Building RAG vector search pipelines with ChromaDB and integrating Meta WhatsApp Cloud API webhooks.";
    }

    if (q.includes("back-end engineering") || q.includes("backend engineering") || q.includes("backend skill")) {
      return "In Backend Engineering, Ahmed specializes in Python, FastAPI for high-performance async REST APIs, Pydantic for strict schema validation, webhooks processing, and C++ for algorithmic problem solving. Applied across all his 4 backend systems and at H2M.";
    }

    if (q.includes("databases & queues") || q.includes("database") || q.includes("databases") || q.includes("queues") || q.includes("postgres") || q.includes("sqlalchemy") || q.includes("redis queue")) {
      return "In Databases & Queues, Ahmed designs relational database schemas with PostgreSQL and SQLAlchemy ORM, uses SQLite for rapid prototyping, and offloads heavy async background tasks to Redis and RQ (Redis Queue).";
    }

    if (q.includes("integrations & automation") || q.includes("integrations") || q.includes("whatsapp cloud") || q.includes("smtp email")) {
      return "In Integrations & Automation, Ahmed integrates Meta WhatsApp Cloud API webhooks for automated customer messaging and SMTP integration for automated background email dispatches.";
    }

    if (q.includes("ai & vector") || q.includes("vector retrieval") || q.includes("rag pipeline") || q.includes("chromadb") || q.includes("sentence transformers")) {
      return "In AI & Vector Retrieval, Ahmed builds end-to-end RAG pipelines, document text chunking, dense vector embeddings with Sentence Transformers, and semantic vector search using ChromaDB with source references.";
    }

    if (q.includes("computer science core") || q.includes("cs core") || q.includes("data structures") || q.includes("algorithms") || q.includes("oop")) {
      return "In Computer Science Core, Ahmed applies solid OOP principles, clean code architecture, logging standards, and competitive algorithmic problem solving in C++.";
    }

    if (q.includes("tools & testing") || q.includes("devops") || q.includes("docker") || q.includes("pytest") || q.includes("linux")) {
      return "In Tools & Testing, Ahmed containerizes backend services with Docker, writes automated backend test suites with Pytest, manages version control with Git/GitHub, and works natively in Linux environments.";
    }

    if (q.includes("skill") || q.includes("skills") || q.includes("tech") || q.includes("stack") || q.includes("technical")) {
      return "Ahmed's Technical Stack spans 6 core categories: 1. Backend Engineering (Python, FastAPI, C++). 2. Databases & Queues (PostgreSQL, SQLAlchemy, Redis/RQ). 3. Integrations (WhatsApp API, SMTP). 4. AI & Vector Retrieval (RAG, ChromaDB). 5. CS Core (Data Structures, OOP). 6. Tools (Docker, Pytest, Git, Linux). Which category would you like details on?";
    }

    if (q.includes("ecu") || q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("college") || q.includes("graduation")) {
      return "Ahmed is studying Computer Science at the Egyptian Chinese University (ECU) in Cairo, expected to graduate in 2029. Relevant coursework includes Data Structures, Algorithms, Databases, OOP, and Software Engineering.";
    }

    if (q.includes("hobby") || q.includes("hobbies") || q.includes("interest") || q.includes("mindset") || q.includes("free time") || q.includes("passion") || q.includes("outside")) {
      return "Outside of coding, Ahmed enjoys exploring how systems work, experimenting with AI tools, and practicing algorithms. He's also curious about cybersecurity and how AI can make systems smarter and safer.";
    }

    if (q.includes("strength") || q.includes("weakness") || q.includes("why hire") || q.includes("location") || q.includes("cairo") || q.includes("available") || q.includes("relocate") || q.includes("remote")) {
      return "Ahmed's main strengths are designing clean asynchronous REST APIs with FastAPI and engineering reliable Redis background worker queues. He is based in Cairo, Egypt, and available for backend and AI automation roles.";
    }

    if (q.includes("looking for") || q.includes("opportunity") || q.includes("role") || q.includes("team") || q.includes("grow")) {
      return "Ahmed is looking for a team where he can work on real backend and automation problems, learn from experienced engineers, and keep building systems that actually get used.";
    }

    if (q.includes("how i work") || q.includes("approach") || q.includes("mindset") || q.includes("philosophy") || q.includes("how do you work")) {
      return "Ahmed's approach: 1. Build from the problem — understand what the system needs before choosing the implementation. 2. Keep systems practical — prefer simple, maintainable solutions over unnecessary complexity. 3. Design for change — separate services so systems can evolve without rewriting.";
    }

    if (q.includes("email") || q.includes("contact") || q.includes("reach") || q.includes("hire") || q.includes("gmail") || q.includes("github") || q.includes("linkedin")) {
      return "You can reach Ahmed directly via email or explore his open-source code repositories on GitHub at github.com/ahmed-abdelatif.";
    }

    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings") || q.includes("good morning") || q.includes("good afternoon")) {
      return "Hello! How can I assist you today? Feel free to ask me about Ahmed's 4 backend projects, H2M work experience, ECU computer science degree, or tech stack!";
    }

    if (q.includes("thanks") || q.includes("thank you") || q.includes("great") || q.includes("awesome") || q.includes("perfect")) {
      return "You're very welcome! Feel free to ask any other questions about Ahmed's experience, background, or projects!";
    }

    return "Ahmed Mohamed Abdelatif is a Python Backend Developer based in Cairo, studying Computer Science at ECU (graduation 2029). He has hands-on experience at H2M and engineered 5 production-ready backend systems. How can I help you explore his profile?";
  };

  const processUserQuery = async (userText: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");
    currentLangRef.current = "en-US";

    const currentMessages = messagesRef.current;
    const formattedHistory = currentMessages
      .filter((m) => m.sender === "user" || m.sender === "ai")
      .slice(-6)
      .map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...formattedHistory, { role: "user", content: userText }]
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.reply) {
          setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
          speakText(data.reply);
          return;
        }
      }
    } catch (e) {
      console.warn("LLM API fallback activated:", e);
    }

    const fallbackText = localFallbackReply(userText);
    setMessages((prev) => [...prev, { sender: "ai", text: fallbackText }]);
    speakText(fallbackText);
  };

  const handleChipClick = (queryText: string) => {
    if (!chatOpen) {
      onToggleChat();
    }
    processUserQuery(queryText);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    processUserQuery(inputMsg.trim());
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!chatOpen ? (
        <button
          onClick={onToggleChat}
          className="flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-medium px-5 py-3 rounded-full shadow-2xl transition transform hover:scale-105 border border-purple-400/30 group"
          aria-label="Open AI assistant chat"
        >
          <Bot className="w-5 h-5 text-purple-200 group-hover:rotate-12 transition" />
          <div className="text-left">
            <span className="text-xs font-bold block">Ask Ahmed&apos;s Assistant</span>
            <span className="text-[10px] text-purple-200/80 block font-mono">Ask about my experience</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </button>
      ) : (
        <div
          className="bg-gray-900 light:bg-white w-[350px] sm:w-[390px] h-[510px] rounded-2xl shadow-2xl flex flex-col border border-purple-800/60 light:border-gray-200 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="AI Assistant Chat"
        >
          {/* Header */}
          <div className="p-4 bg-purple-950/90 light:bg-purple-50 border-b border-gray-800 light:border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white light:text-gray-900 flex items-center gap-1.5">
                  Ahmed&apos;s Voice AI Assistant
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  {isSpeaking ? (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-purple-300">
                      <span className="w-1 h-3.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1 h-4 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1 h-2.5 bg-purple-400 rounded-full animate-bounce" />
                      <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
                      <span className="ml-1 text-purple-300">Speaking...</span>
                    </div>
                  ) : isListening ? (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-0.5" />
                      <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="w-1 h-3.5 bg-emerald-300 rounded-full animate-pulse [animation-delay:-0.2s]" />
                      <span className="ml-1">Listening...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400 light:text-gray-500">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span className="ml-1">Voice Active</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="text-xs bg-red-950/80 light:bg-red-50 text-red-300 light:text-red-700 px-2 py-1 rounded border border-red-800 light:border-red-200 font-mono"
                  aria-label="Mute voice"
                >
                  Mute
                </button>
              )}
              <button
                onClick={onToggleChat}
                className="text-gray-400 light:text-gray-500 hover:text-white light:hover:text-gray-900 text-xs font-mono p-1"
                aria-label="Close chat"
              >
                X
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-sans">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-purple-600 text-white rounded-br-none font-medium"
                      : "bg-gray-800 light:bg-gray-100 text-gray-200 light:text-gray-700 rounded-bl-none border border-gray-700 light:border-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips Bar */}
          <div className="px-3 py-2 bg-gray-900/90 light:bg-gray-50 border-t border-gray-800 light:border-gray-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(q.query)}
                className="bg-gray-800 hover:bg-purple-950 light:bg-gray-100 light:hover:bg-purple-50 text-gray-300 hover:text-purple-200 light:text-gray-600 light:hover:text-purple-700 px-2.5 py-1 rounded-lg text-[10px] font-mono border border-gray-700/80 light:border-gray-200 whitespace-nowrap transition"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Voice Input & Text Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 light:border-gray-200 bg-gray-950 light:bg-white flex items-center gap-2">
            <button
              type="button"
              onClick={startListening}
              className={`p-2.5 rounded-xl transition border ${
                isListening
                  ? "bg-red-600 text-white border-red-400 animate-pulse"
                   : "bg-gray-800 light:bg-gray-100 text-purple-300 hover:bg-purple-900/50 light:hover:bg-purple-50 border-gray-700 light:border-gray-300"
              }`}
              aria-label={isListening ? "Stop listening" : "Start voice input"}
            >
              Mic
            </button>

            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : "Type or speak your question..."}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 bg-gray-900 light:bg-gray-50 border border-gray-800 light:border-gray-200 rounded-xl px-3 py-2 text-xs text-white light:text-gray-900 focus:outline-none focus:border-purple-500 font-sans"
              aria-label="Chat message input"
            />
            <button
              type="submit"
              className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
