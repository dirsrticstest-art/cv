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
      text: "Hello! Welcome to Ahmed's Portfolio. I'm his AI Assistant — tap the microphone below to start speaking, or type your question."
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
      availableVoices.find((v) => v.lang.startsWith("en") && v.name.includes("Natural") && (v.name.includes("Guy") || v.name.includes("Ryan") || v.name.includes("Daniel"))) ||
      availableVoices.find((v) => v.lang.startsWith("en") && v.name.includes("Online (Natural)")) ||
      availableVoices.find((v) => v.lang.startsWith("en") && v.name.includes("Natural")) ||
      availableVoices.find((v) => v.lang.startsWith("en") && (v.name.includes("Guy") || v.name.includes("Ryan") || v.name.includes("Daniel") || v.name.includes("David"))) ||
      availableVoices.find((v) => v.lang.startsWith("en"))
    );
  };

  const speakText = useCallback((text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

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
      utterance.rate = 0.78;
      utterance.pitch = 0.95;

      const available = voicesList.length > 0 ? voicesList : window.speechSynthesis.getVoices();
      const bestVoice = selectBestEnglishVoice(available);
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
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

  const startListening = useCallback(async () => {
    if (typeof window === "undefined" || !chatOpenRef.current) return;
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    try {
      stopListening();

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(t => t.stop());
        } catch (permErr) {
          isListeningRef.current = false;
          setIsListening(false);
          return;
        }
      }

      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
        retryCountRef.current = 0;
      };

      recognition.onend = () => {
        isListeningRef.current = false;
        setIsListening(false);
        if (chatOpenRef.current) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 300);
        }
      };

      recognition.onerror = (event: any) => {
        isListeningRef.current = false;
        setIsListening(false);
        if (chatOpenRef.current && event.error !== "not-allowed") {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 500);
        }
      };

      recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
          const transcript = result[0].transcript;
          if (transcript && transcript.trim()) {
            if (isSpeakingRef.current) {
              stopSpeaking();
            }
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
      }, 500);
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

    if (q.includes("full name") || q.includes("who is ahmed") || q.includes("nationality") || q.includes("egyptian") || q.includes("personal profile") || q.includes("academic profile") || q.includes("student status") || q.includes("bio") || q.includes("about ahmed") || q.includes("tell me about") || q.includes("who are you")) {
      return "Ahmed Mohamed Abdelatif is an Egyptian Python Backend Developer and AI Automation Specialist based in Cairo. He is currently pursuing his B.Sc. in Computer Science at the Egyptian Chinese University (ECU) with expected graduation in 2029. He has 3 months of hands-on experience at H2M working on MAXP Online platform, and has engineered 5 production-ready backend systems. His military service is officially postponed for study.";
    }

    if (q.includes("h2m") || q.includes("maxp") || q.includes("max p") || q.includes("financial") || q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("company") || q.includes("position") || q.includes("where did he work") || q.includes("work experience")) {
      return "At H2M for MAXP Online, Ahmed worked on-site for 3 months as a Python Backend Developer. He solved the problem of manual financial tracking and campaign marketing dispatches. He built product financial calculation tools for profit margins and shipping costs, developed marketing campaign tracking and shipping analytics, and implemented Meta WhatsApp Cloud API automated marketing dispatches with webhooks and message templates.";
    }

    if (q.includes("customer support") || q.includes("whatsapp") || q.includes("meta cloud") || q.includes("ticket") || q.includes("project 1") || q.includes("first project") || q.includes("ai support")) {
      return "The AI Customer Support Platform is a backend system built with FastAPI for ticket management and WhatsApp automation. Ahmed built REST APIs, integrated Meta WhatsApp Cloud API webhooks, and implemented Redis RQ background workers for message classification and automated AI response generation. The system classifies messages by intent (billing, technical, general) and generates draft responses asynchronously.";
    }

    if (q.includes("rag") || q.includes("vector") || q.includes("chromadb") || q.includes("sentence transformer") || q.includes("embedding") || q.includes("chunking") || q.includes("project 2") || q.includes("second project")) {
      return "The Enterprise RAG Knowledge Assistant is a document-based semantic search backend. Ahmed implemented document ingestion for PDF, DOCX, and TXT files, recursive text chunking with overlapping windows, Sentence Transformers embeddings, ChromaDB vector indexing, and source-referenced question answering. It answers questions using retrieved content instead of relying only on the model's memory.";
    }

    if (q.includes("document intelligence") || q.includes("pdf parsing") || q.includes("ocr") || q.includes("extraction") || q.includes("upload") || q.includes("project 3") || q.includes("third project")) {
      return "The AI Document Intelligence Platform handles long-running document workloads. Ahmed designed multipart PDF and DOCX upload validation APIs and offloaded structured data extraction to Redis RQ background workers with processing status tracking and retry mechanisms. It processes documents in parallel with exponential backoff for failed jobs.";
    }

    if (q.includes("medical event") || q.includes("smtp") || q.includes("email automation") || q.includes("event management") || q.includes("registration") || q.includes("project 4") || q.includes("fourth project")) {
      return "The Medical Event Automation Platform manages event registrations and attendee workflows. Ahmed modeled relational database schemas with PostgreSQL and SQLAlchemy, and automated background email dispatches via Redis RQ queues and SMTP integration. It handles bulk sending with rate limiting and delivery status tracking.";
    }

    if (q.includes("lead") || q.includes("crm") || q.includes("qualification") || q.includes("scoring") || q.includes("groq") || q.includes("project 5") || q.includes("fifth project")) {
      return "The AI Lead Qualification and CRM Automation classifies inbound leads using Groq LLM with a deterministic fallback. Ahmed built a FastAPI backend with Celery and Redis async CRM sync, exponential backoff retries, and a full PostgreSQL audit trail. You can try the live demo at cv-tawny-two.vercel.app/api.";
    }

    if (q.includes("project") || q.includes("projects") || q.includes("built") || q.includes("portfolio") || q.includes("repos") || q.includes("systems")) {
      return "Ahmed engineered 5 production-ready backend systems: 1. AI Customer Support Platform with WhatsApp API integration. 2. Enterprise RAG Knowledge Assistant with ChromaDB vector search. 3. AI Document Intelligence Platform with async PDF parsing. 4. Medical Event Automation Platform with SMTP email dispatches. 5. AI Lead Qualification with Groq LLM and Celery. Each project demonstrates different backend engineering skills. Which one would you like to explore?";
    }

    if (q.includes("value") || q.includes("proposition") || q.includes("capability") || q.includes("specialist") || q.includes("asynchronous") || q.includes("background")) {
      return "Ahmed's core value propositions: 1. Asynchronous REST API engineering with FastAPI and Pydantic for strict validation. 2. Offloading heavy background tasks and notification dispatches using Redis and RQ. 3. Building RAG vector search pipelines with ChromaDB. 4. Integrating Meta WhatsApp Cloud API webhooks for automated messaging.";
    }

    if (q.includes("back-end") || q.includes("backend") || q.includes("python") || q.includes("fastapi")) {
      return "In Backend Engineering, Ahmed specializes in Python and FastAPI for high-performance async REST APIs, Pydantic for strict schema validation, webhooks processing, and C++ for algorithmic problem solving. He has applied these skills across all his 5 backend systems and at H2M.";
    }

    if (q.includes("database") || q.includes("databases") || q.includes("queues") || q.includes("postgres") || q.includes("sqlalchemy") || q.includes("redis")) {
      return "Ahmed designs relational database schemas with PostgreSQL and SQLAlchemy ORM, uses SQLite for rapid prototyping, and offloads heavy async background tasks to Redis and RQ (Redis Queue). He understands when to use each technology based on the problem requirements.";
    }

    if (q.includes("integration") || q.includes("automation") || q.includes("whatsapp") || q.includes("smtp") || q.includes("webhook")) {
      return "Ahmed integrates Meta WhatsApp Cloud API webhooks for automated customer messaging and SMTP integration for automated background email dispatches. He has hands-on experience building webhook processing systems and message template engines.";
    }

    if (q.includes("ai") || q.includes("rag") || q.includes("vector") || q.includes("chromadb") || q.includes("embedding") || q.includes("llm") || q.includes("groq")) {
      return "Ahmed builds AI-powered systems including RAG pipelines with ChromaDB and Sentence Transformers for semantic search, lead classification with Groq LLM, and document intelligence with structured data extraction. He understands both the AI and backend engineering aspects of these systems.";
    }

    if (q.includes("data structure") || q.includes("algorithm") || q.includes("oop") || q.includes("computer science")) {
      return "Ahmed applies solid computer science principles including OOP, clean code architecture, logging standards, and competitive algorithmic problem solving in C++. He is studying Computer Science at ECU with coursework in Data Structures, Algorithms, Databases, and Software Engineering.";
    }

    if (q.includes("docker") || q.includes("pytest") || q.includes("linux") || q.includes("git") || q.includes("tool") || q.includes("devops")) {
      return "Ahmed containerizes backend services with Docker, writes automated backend test suites with Pytest, manages version control with Git and GitHub, and works natively in Linux environments. He follows best practices for testing and deployment.";
    }

    if (q.includes("skill") || q.includes("skills") || q.includes("tech") || q.includes("stack") || q.includes("technical") || q.includes("what can he do")) {
      return "Ahmed's Technical Stack spans 6 core categories: 1. Backend Engineering with Python, FastAPI, and C++. 2. Databases and Queues with PostgreSQL, SQLAlchemy, and Redis RQ. 3. Integrations with WhatsApp API and SMTP. 4. AI and Vector Retrieval with RAG and ChromaDB. 5. Computer Science Core with Data Structures and OOP. 6. Tools with Docker, Pytest, Git, and Linux. Which category would you like details on?";
    }

    if (q.includes("ecu") || q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("college") || q.includes("graduation") || q.includes("study")) {
      return "Ahmed is studying Computer Science at the Egyptian Chinese University (ECU) in Cairo, expected to graduate in 2029. Relevant coursework includes Data Structures, Algorithms, Databases, Object-Oriented Programming, and Software Engineering. He applies these principles in all his projects.";
    }

    if (q.includes("hobby") || q.includes("hobbies") || q.includes("interest") || q.includes("free time") || q.includes("passion") || q.includes("outside") || q.includes("fun")) {
      return "Outside of coding, Ahmed enjoys exploring how systems work, experimenting with AI tools, and practicing algorithmic problem solving. He is curious about cybersecurity and how AI can make systems smarter and safer. He also enjoys learning about new backend technologies and frameworks.";
    }

    if (q.includes("strength") || q.includes("weakness") || q.includes("why hire") || q.includes("good at")) {
      return "Ahmed's main strengths are designing clean asynchronous REST APIs with FastAPI, engineering reliable Redis background worker queues, and building AI-powered systems. He is a quick learner who cares about understanding how systems actually work, not just making them run.";
    }

    if (q.includes("location") || q.includes("cairo") || q.includes("available") || q.includes("relocate") || q.includes("remote") || q.includes("where")) {
      return "Ahmed is based in Cairo, Egypt. He is available for Backend and AI Automation roles, whether on-site, hybrid, or remote. He is flexible and eager to work with teams that value clean, maintainable code.";
    }

    if (q.includes("looking for") || q.includes("opportunity") || q.includes("role") || q.includes("team") || q.includes("grow") || q.includes("career")) {
      return "Ahmed is looking for a team where he can work on real backend and automation problems, learn from experienced engineers, and keep building systems that actually get used. He wants to grow his skills while contributing meaningful work.";
    }

    if (q.includes("approach") || q.includes("mindset") || q.includes("philosophy") || q.includes("how do you work") || q.includes("how does he work")) {
      return "Ahmed's approach: 1. Build from the problem — understand what the system needs before choosing the implementation. 2. Keep systems practical — prefer simple, maintainable solutions over unnecessary complexity. 3. Design for change — separate services so systems can evolve without rewriting everything.";
    }

    if (q.includes("email") || q.includes("contact") || q.includes("reach") || q.includes("hire") || q.includes("gmail") || q.includes("github") || q.includes("linkedin")) {
      return "You can reach Ahmed via email at ahmeeedmohaaamed1@gmail.com, on LinkedIn at linkedin.com/in/ahmed-mohamed-b69920435, or explore his open-source code repositories on GitHub at github.com/ahmed-abdelatif.";
    }

    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings") || q.includes("good morning") || q.includes("how are you")) {
      return "Hello! I'm doing well, thank you for asking. I'm Ahmed's AI Assistant, here to help you learn about his background, projects, and skills. What would you like to know?";
    }

    if (q.includes("thanks") || q.includes("thank you") || q.includes("great") || q.includes("awesome") || q.includes("perfect")) {
      return "You're very welcome! I'm here to help. Feel free to ask any other questions about Ahmed's experience, background, or projects.";
    }

    if (q.includes("salary") || q.includes("pay") || q.includes("compensation") || q.includes("how much")) {
      return "Ahmed is open to discussing compensation based on the role and responsibilities. As a backend developer with 3 months of experience and 5 production projects, he is competitive and eager to prove his value.";
    }

    if (q.includes("certificate") || q.includes("certification") || q.includes("hackerrank") || q.includes("badge")) {
      return "Ahmed has 7 HackerRank certifications: Python Basic, SQL Basic, SQL Intermediate, SQL Advanced, REST API Intermediate, Problem Solving Basic, and Problem Solving Intermediate. These demonstrate his proficiency in core backend technologies.";
    }

    if (q.includes("problem solving") || q.includes("coding challenge") || q.includes("competitive")) {
      return "Ahmed practices competitive algorithmic problem solving in C++. He has completed multiple problem-solving challenges on HackerRank and applies these skills to design efficient algorithms for his backend systems.";
    }

    if (q.includes("clean code") || q.includes("best practice") || q.includes("architecture") || q.includes("design")) {
      return "Ahmed follows clean code principles: meaningful naming, modular design, comprehensive logging, input validation with Pydantic, and separation of concerns. He designs systems with clear boundaries between services so they can evolve independently.";
    }

    if (q.includes("test") || q.includes("quality") || q.includes("reliable")) {
      return "Ahmed writes automated backend test suites with Pytest, containerizes services with Docker for consistent environments, and follows best practices for testing and deployment. He believes in building reliable systems that work consistently.";
    }

    return "Ahmed Mohamed Abdelatif is a Python Backend Developer based in Cairo, studying Computer Science at ECU (graduation 2029). He has hands-on experience at H2M and engineered 5 production-ready backend systems. Feel free to ask about his projects, skills, experience, education, or anything else you'd like to know!";
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
                    <div className="flex items-center gap-1 text-[10px] font-mono text-purple-400 light:text-purple-600">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                      <span className="ml-1">Tap mic to start</span>
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
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              className={`p-2.5 rounded-xl transition border relative ${
                isListening
                  ? "bg-red-600 text-white border-red-400 animate-pulse"
                  : "bg-purple-600 text-white border-purple-400 animate-pulse shadow-lg shadow-purple-500/50"
              }`}
              aria-label={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? "Stop" : "Mic"}
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
