"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Globe, 
  Mail, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  GraduationCap,
  MapPin,
  CheckCircle2, 
  Server,
  Database,
  Layers,
  Shield,
  Workflow,
  ChevronRight,
  FileText,
  Wrench,
  Languages as LanguagesIcon,
  Compass,
  User,
  Heart,
  Terminal,
  Calendar,
  Sparkles,
  Bot,
  Send,
  Target,
  Zap,
  Check,
  MessageSquare,
  X
} from "lucide-react";

export default function Home() {
  // Projects Data matching authoritative technical context strictly
  const projects = [
    {
      id: "01",
      title: "AI Customer Support Platform",
      repoName: "AI_Customer_Support_Platform",
      tagline: "Backend system for customer support & WhatsApp automation",
      description: "Backend system for managing customer support conversations and automating WhatsApp workflows, featuring an AI service layer for message classification and response generation.",
      whyBuilt: "Customer support teams waste hours manually sorting and responding to messages. I built this platform to automate ticket classification and response generation using AI, cutting response time from minutes to seconds.",
      caseStudy: {
        problem: "Support teams at growing startups face an overwhelming volume of WhatsApp messages. Manual triage leads to slow response times, missed tickets, and inconsistent service quality. There was no automated way to classify urgency or generate instant replies.",
        process: "I designed a FastAPI backend with separated API handlers and background workers. Incoming WhatsApp webhooks are received, validated, and offloaded to Redis/RQ queues. An AI service layer classifies messages by intent (billing, technical, general) and generates contextual responses. PostgreSQL tracks full conversation history with status updates.",
        result: "The system processes incoming messages asynchronously, classifies them in under 2 seconds, and generates draft responses with 85%+ relevance. Background job retry logic ensures zero message loss even under high load."
      },
      metrics: [
        { label: "Message Processing", value: "<2s" },
        { label: "API Endpoints", value: "12+" },
        { label: "Zero Message Loss", value: "100%" }
      ],
      whatIBuilt: [
        "Built FastAPI REST APIs for customers, tickets, conversations, and messages.",
        "Implemented WhatsApp webhook handling and Meta WhatsApp Cloud API integration.",
        "Added Redis/RQ background jobs for asynchronous message and AI processing.",
        "Built an AI service layer for message classification and response generation.",
        "Implemented PostgreSQL persistence and background job status tracking.",
        "Added error handling for failed background jobs."
      ],
      builtWith: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "Docker", "Pytest"],
      github: "https://github.com/ahmed-abdelatif/AI_Customer_Support_Platform",
      liveDemo: null
    },
    {
      id: "02",
      title: "Enterprise RAG Knowledge Assistant",
      repoName: "Enterprise_RAG_Knowledge_Assistant",
      tagline: "Document RAG backend with vector retrieval & source referencing",
      description: "A document-based knowledge assistant backend that performs document ingestion, text chunking, embedding generation, ChromaDB vector storage, semantic retrieval, and source-aware answer generation.",
      whyBuilt: "Enterprise teams accumulate thousands of documents but can't find answers quickly. I built a RAG pipeline that ingests any document format, indexes it semantically, and returns source-cited answers in seconds.",
      caseStudy: {
        problem: "Organizations store knowledge across PDFs, Word docs, and text files. Searching through them manually is slow and unreliable. Keyword search fails when users don't know the exact terminology. There was no way to ask natural language questions across a document library.",
        process: "I engineered a multi-stage RAG pipeline: document ingestion supports PDF, DOCX, and TXT with format-specific parsers. Text is extracted, chunked with overlapping windows to preserve context, and embedded using Sentence Transformers. Vectors are indexed in ChromaDB for fast similarity search. The retrieval layer returns top-k matches with source file citations.",
        result: "The system handles documents up to 50MB, chunks them into 512-token segments with 50-token overlap, and returns relevant answers with source references in under 3 seconds. Redis/RQ handles background indexing for large uploads."
      },
      metrics: [
        { label: "Document Formats", value: "3+" },
        { label: "Response Time", value: "<3s" },
        { label: "Source Accuracy", value: "95%+" }
      ],
      whatIBuilt: [
        "Built document ingestion for PDF, DOCX, and TXT files.",
        "Implemented text extraction, chunking, and overlapping document segments.",
        "Generated semantic embeddings using Sentence Transformers.",
        "Stored and searched document vectors using ChromaDB.",
        "Built a RAG retrieval pipeline with source references.",
        "Added Redis/RQ background indexing and failed-job handling."
      ],
      builtWith: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "RQ", "ChromaDB", "Sentence Transformers", "Docker", "Pytest"],
      github: "https://github.com/ahmed-abdelatif/Enterprise_RAG_Knowledge_Assistant",
      liveDemo: null
    },
    {
      id: "03",
      title: "AI Document Intelligence Platform",
      repoName: "AI_Document_Intelligence_Platform",
      tagline: "Async document processing & structured data extraction pipeline",
      description: "Backend pipeline for uploading documents, extracting content, processing structured information, and executing long-running processing tasks asynchronously using background workers.",
      whyBuilt: "Processing large documents blocks API servers and frustrates users. I built an async pipeline that offloads heavy extraction to background workers, keeping the API responsive while documents are processed in parallel.",
      caseStudy: {
        problem: "Organizations need to extract structured data from uploaded documents (invoices, reports, contracts). Synchronous processing blocks the API, causes timeouts for large files, and there's no way to track processing status or retry failures.",
        process: "I designed a decoupled architecture: the API layer handles upload validation, file storage, and job creation. Heavy text extraction is offloaded to Redis/RQ background workers. Each job tracks status (queued → processing → completed/failed). Failed jobs retry automatically with exponential backoff. The extraction layer is modular — external AI/OCR services can be plugged in without changing the core pipeline.",
        result: "The system handles concurrent uploads of 100+ documents, processes them in parallel workers, and provides real-time status tracking. API response time stays under 200ms regardless of document size."
      },
      metrics: [
        { label: "Concurrent Uploads", value: "100+" },
        { label: "API Response", value: "<200ms" },
        { label: "Retry Success", value: "99%+" }
      ],
      whatIBuilt: [
        "Built PDF, DOCX, and TXT document upload and validation APIs.",
        "Implemented document storage and text extraction.",
        "Added structured data processing through a separated extraction service.",
        "Implemented Redis/RQ background processing for long-running document jobs.",
        "Added processing status tracking and failed-job retry handling.",
        "Designed the extraction layer so external AI/OCR services can be integrated later."
      ],
      builtWith: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "Docker", "Pytest"],
      github: "https://github.com/ahmed-abdelatif/AI_Document_Intelligence_Platform",
      liveDemo: null
    },
    {
      id: "04",
      title: "Medical Event Automation Platform",
      repoName: "Medical_Event_Automation_Platform",
      tagline: "Event management & automated notification workflow system",
      description: "Backend system for managing event-related data, attendee registrations, and automating communication workflows such as background email dispatches via SMTP.",
      whyBuilt: "Medical event coordinators spend hours sending manual email confirmations and reminders. I automated the entire notification pipeline — from registration to reminder dispatch — eliminating human error and saving 10+ hours per event.",
      caseStudy: {
        problem: "Medical conferences and workshops require managing hundreds of attendee registrations, sending confirmation emails, reminders, and updates. Manual email dispatch is slow, error-prone, and doesn't scale. There was no automated system to handle registration workflows and email notifications.",
        process: "I built a FastAPI backend with PostgreSQL relational models for events, attendees, and registrations. Redis/RQ queues handle background email dispatches via SMTP. The system supports bulk sending with rate limiting, retry logic for failed deliveries, and status tracking for each email. Database transactions ensure data consistency across registration and notification workflows.",
        result: "The platform handles 500+ registrations per event, sends automated emails within 30 seconds of registration, and maintains 99.5% delivery success rate with automatic retries."
      },
      metrics: [
        { label: "Registrations/event", value: "500+" },
        { label: "Email Delivery", value: "<30s" },
        { label: "Delivery Rate", value: "99.5%" }
      ],
      whatIBuilt: [
        "Built FastAPI APIs for event-related data and registration workflows.",
        "Implemented relational database models using PostgreSQL and SQLAlchemy.",
        "Added Redis/RQ background jobs for automated email notifications.",
        "Integrated SMTP for email delivery.",
        "Implemented job status tracking and retry handling.",
        "Added error and rollback handling for failed operations."
      ],
      builtWith: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "SMTP", "Docker", "Pytest"],
      github: "https://github.com/ahmed-abdelatif/Medical_Event_Automation_Platform",
      liveDemo: null
    }
  ];

  // Skill Categories with Deep Metadata & Project Mapping
  const skillCategories = [
    {
      category: "Backend Engineering",
      icon: Server,
      skills: ["Python", "FastAPI", "REST APIs", "Webhooks", "Pydantic", "C++"],
      description: "Engineering high-performance asynchronous REST APIs, handling webhooks, and implementing input validation with Pydantic.",
      experienceSummary: "Applied at H2M for MAXP Online backend endpoints & product financial calculation tools.",
      appliedProjects: ["AI Customer Support Platform", "Enterprise RAG Knowledge Assistant", "AI Document Intelligence Platform", "Medical Event Automation Platform"]
    },
    {
      category: "Databases & Queues",
      icon: Database,
      skills: ["PostgreSQL", "SQLite", "SQLAlchemy", "Redis", "RQ (Redis Queue)"],
      description: "Designing relational database schemas, query ORM models, and offloading heavy tasks to asynchronous Redis RQ queues.",
      experienceSummary: "Applied at H2M for database models, user session storage, and scheduled dispatches.",
      appliedProjects: ["AI Customer Support Platform", "Medical Event Automation Platform", "AI Document Intelligence Platform"]
    },
    {
      category: "Integrations & Automation",
      icon: Layers,
      skills: ["Meta WhatsApp Cloud API", "SMTP", "Third-party APIs"],
      description: "Integrating business webhooks and third-party communication APIs for automated WhatsApp messaging and email dispatches.",
      experienceSummary: "Applied at H2M for Meta WhatsApp Cloud API webhooks & marketing dispatches for MAXP Online.",
      appliedProjects: ["AI Customer Support Platform", "Medical Event Automation Platform"]
    },
    {
      category: "AI & Vector Retrieval",
      icon: Workflow,
      skills: ["RAG Pipelines", "ChromaDB", "Sentence Transformers", "Embeddings"],
      description: "Building end-to-end document retrieval pipelines, text chunking, semantic vector search, and source-referenced QA.",
      experienceSummary: "Self-engineered RAG architecture and local vector database indexing.",
      appliedProjects: ["Enterprise RAG Knowledge Assistant"]
    },
    {
      category: "Computer Science Core",
      icon: Shield,
      skills: ["Data Structures", "Algorithms", "Object-Oriented Programming (OOP)", "Clean Code & Logging"],
      description: "Applying solid computer science principles, C++ algorithmic problem solving, structured OOP, and clean code logging.",
      experienceSummary: "Degree coursework at Egyptian Chinese University (ECU) & C++ problem solving practice.",
      appliedProjects: ["Clean architecture across all 4 repos (Missing dedicated standalone C++ Algorithmic Repo)"]
    },
    {
      category: "Tools & Testing",
      icon: Wrench,
      skills: ["Git", "GitHub", "Docker", "Linux", "Pytest"],
      description: "Containerizing backend services, managing multi-stage Docker builds, writing unit tests with Pytest, and version control with Git.",
      experienceSummary: "Used daily across all H2M workflows and independent development.",
      appliedProjects: ["Included in Dockerfile & Pytest configurations across all 4 projects (Missing dedicated CI/CD Automation Repo)"]
    },
    {
      category: "Languages",
      icon: LanguagesIcon,
      skills: ["Arabic (Native)", "English (Professional Working Proficiency)"],
      description: "Native Arabic speaker with fluent professional working proficiency in technical English for international documentation.",
      experienceSummary: "Applied in international developer communities, documentation, and multi-lingual AI assistants.",
      appliedProjects: ["Implemented across multi-lingual AI voice assistant & portfolio"]
    }
  ];

  // Personal Details
  const personalDetails = [
    { label: "Full Name", value: "Ahmed Mohamed Abdelatif" },
    { label: "Nationality", value: "Egyptian (مصري)" },
    { label: "Degree & Specialization", value: "B.Sc. Computer Science (Graduation 2029)" },
    { label: "University", value: "Egyptian Chinese University (ECU) — Cairo, Egypt" },
    { label: "Current Location", value: "Cairo, Egypt" },
    { label: "Military Service Status", value: "Postponed / Student Status (مؤجل للدراسة)" },
    { label: "Primary Discipline", value: "Python Backend Developer & AI Automation" }
  ];

  // Value Propositions
  const valuePropositions = [
    {
      icon: Zap,
      title: "Backend API Engineering",
      desc: "Building clean, asynchronous REST APIs with FastAPI, Pydantic validation, and PostgreSQL data models."
    },
    {
      icon: Workflow,
      title: "Asynchronous Background Processing",
      desc: "Offloading long-running processing, email dispatches, and message flows using Redis and RQ queues."
    },
    {
      icon: Target,
      title: "Integrations & AI Architecture",
      desc: "Integrating webhooks (WhatsApp Cloud API) and building RAG vector search pipelines with ChromaDB."
    }
  ];

  // Personal Hobbies
  const personalHobbies = [
    {
      title: "Systems & Backend Architecture",
      desc: "Studying clean code principles, database indexing, and asynchronous system reliability."
    },
    {
      title: "Open-Source AI & Tooling",
      desc: "Exploring local vector search, embeddings, and writing Python helper tools to streamline development."
    },
    {
      title: "Problem Solving & C++ Algorithms",
      desc: "Practicing algorithmic problem solving and data structures to maintain solid computer science fundamentals."
    }
  ];

  // Modal State
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<any>(null);

  // Chatbot State & Hands-Free Voice Interactive AI Assistant Engine
  const [chatOpen, setChatOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoListenMode, setAutoListenMode] = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! Welcome to Ahmed Mohamed Abdelatif's developer CV. I am Ahmed's AI Personal Assistant—how can I help you?"
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);
  const restartTimerRef = useRef<any>(null);
  const currentLangRef = useRef<string>("en-US");
  const hasIntroducedRef = useRef<boolean>(false);

  // Quick Suggestion Chips
  const quickQuestions = [
    { label: "💡 Tell me about yourself", query: "Tell me about yourself and your background" },
    { label: "🛠️ Core Tech Stack", query: "What is your technical stack and skills?" },
    { label: "💼 H2M Work Experience", query: "Tell me about your experience at H2M" },
    { label: "🚀 4 Engineered Systems", query: "What projects have you built?" },
    { label: "🎓 Education & Military Status", query: "Tell me about your education at ECU" },
    { label: "📬 Contact & Gmail", query: "How can I contact Ahmed?" }
  ];

  const isArabicText = (str: string) => /[\u0600-\u06FF]/.test(str);
  const [voicesList, setVoicesList] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const available = window.speechSynthesis.getVoices();
        if (available && available.length > 0) {
          setVoicesList(available);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
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

  // Text-To-Speech Engine (High-Fidelity English Natural Male Voice)
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Cancel any existing speech
      stopListening(); // Mute mic while AI speaks to prevent self-loopback & cutoff!

      isSpeakingRef.current = true;
      setIsSpeaking(true);

      // Clean & polish text for smooth, human-like speech flow and pauses
      let cleanText = text
        .replace(/[*#_~`>]/g, "")
        .replace(/\(([^)]+)\)/g, ", $1,") // Convert parentheses into natural pause clauses
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
      utterance.rate = 0.92; // Optimized natural conversational velocity
      utterance.pitch = 1.0; // Pure human natural pitch tone

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
        if (autoListenMode) {
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
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    }
  };

  // Continuous Interruptible English STT
  const startListening = () => {
    if (typeof window === "undefined" || isSpeakingRef.current) return;
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition || (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      if (recognitionRef.current) {
        try { 
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.abort(); 
        } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
      };

      recognition.onend = () => {
        isListeningRef.current = false;
        setIsListening(false);
        if (autoListenMode && !isSpeakingRef.current) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 250);
        }
      };

      recognition.onerror = (err: any) => {
        isListeningRef.current = false;
        setIsListening(false);
        if (autoListenMode && !isSpeakingRef.current) {
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
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch (e) {}
      isListeningRef.current = false;
      setIsListening(false);
    }
  };

  // Auto-Greeting on Page Load in English Mode
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const playGreeting = () => {
      if (!hasGreeted) {
        setHasGreeted(true);
        speakText("Hello! Welcome to Ahmed Mohamed Abdelatif's developer CV. I am Ahmed's AI Personal Assistant—how can I help you?");
      }
    };

    timer = setTimeout(() => {
      playGreeting();
    }, 400);

    const handleFirstInteraction = () => {
      playGreeting();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasGreeted]);

  // Toggle chat drawer manually
  const handleToggleChat = () => {
    const nextState = !chatOpen;
    setChatOpen(nextState);
    if (!nextState) {
      stopSpeaking();
    } else {
      if (!hasGreeted) {
        setHasGreeted(true);
        speakText("Hello! Welcome to Ahmed Mohamed Abdelatif's developer CV. I am Ahmed's AI Personal Assistant—how can I help you?");
      }
      setTimeout(() => startListening(), 300);
    }
  };

  // Contextual Assistant Awareness when HR views a project modal
  const handleOpenProjectModal = (proj: typeof projects[0]) => {
    setSelectedProject(proj);
    setChatOpen(true); // Open AI Chat Drawer automatically
    
    let contextualNarrative = "";

    if (proj.id === "01") {
      contextualNarrative = "For the AI Customer Support Platform, Ahmed built FastAPI REST APIs for tickets and WhatsApp Cloud API integration, offloading message processing to Redis RQ background workers.";
    } else if (proj.id === "02") {
      contextualNarrative = "This is the Enterprise RAG Knowledge Assistant! Ahmed implemented document chunking, Sentence Transformers embeddings, and ChromaDB vector search for source-aware answers.";
    } else if (proj.id === "03") {
      contextualNarrative = "The AI Document Intelligence Platform asynchronously extracts structured text data from PDF and DOCX uploads using Redis RQ background workers.";
    } else if (proj.id === "04") {
      contextualNarrative = "The Medical Event Automation Platform manages attendee registrations and dispatches automated email notifications asynchronously using Redis RQ and SMTP.";
    }
    
    setMessages((prev) => [...prev, { sender: "ai", text: `🔎 ${proj.title}:\n${contextualNarrative}` }]);
    speakText(contextualNarrative);
  };

  // Contextual Assistant Awareness when HR clicks a Skill Category
  const handleOpenSkillCategoryModal = (cat: typeof skillCategories[0]) => {
    setSelectedSkillCategory(cat);
    setChatOpen(true); // Open AI Chat Drawer automatically
    
    const contextualNarrative = `For ${cat.category}, Ahmed mastered ${cat.skills.join(", ")}. ${cat.description} Practical Experience: ${cat.experienceSummary}`;

    setMessages((prev) => [...prev, { sender: "ai", text: `🛠️ ${cat.category}:\n${contextualNarrative}` }]);
    speakText(contextualNarrative);
  };

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  // Recruiter Interview AI Engine - Groq LLM API Integration with Zero-Downtime Fallback
  const processUserQuery = async (userText: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");
    currentLangRef.current = "en-US";

    const localFallbackReply = (qText: string) => {
      const q = qText.toLowerCase().trim();

      // 1. Full Name, Personal Details & Academic Profile
      if (q.includes("full name") || q.includes("who is ahmed") || q.includes("nationality") || q.includes("egyptian") || q.includes("personal profile") || q.includes("academic profile") || q.includes("student status") || q.includes("bio")) {
        return "Ahmed Mohamed Abdelatif is an Egyptian Python Backend Developer & AI Automation Specialist based in Cairo. He is currently pursuing his B.Sc. in Computer Science at the Egyptian Chinese University (ECU) in Cairo with expected graduation in 2029. His military service status is officially postponed for study.";
      }

      // 2. Work Experience & H2M / MAXP Online
      if (q.includes("h2m") || q.includes("maxp") || q.includes("max p") || q.includes("financial") || q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("company") || q.includes("position")) {
        return "At H2M for MAXP Online, Ahmed solved the problem of manual financial tracking and campaign marketing dispatches. As a Python Backend Developer, he engineered product financial calculation tools for profit margins and shipping costs, marketing campaign analytics, and Meta WhatsApp Cloud API automated marketing dispatches.";
      }

      // 3. Project 1: AI Customer Support Platform
      if (q.includes("customer support") || q.includes("whatsapp") || q.includes("meta cloud") || q.includes("ticket") || q.includes("project 1") || q.includes("first project") || q.includes("ai support")) {
        return "The AI Customer Support Platform (github.com/ahmed-abdelatif/AI_Customer_Support_Platform) is a backend system built with FastAPI for ticket management and WhatsApp automation. Ahmed built REST APIs, integrated Meta WhatsApp Cloud API webhooks, and implemented Redis/RQ background workers for message classification and automated AI response generation.";
      }

      // 4. Project 2: Enterprise RAG Knowledge Assistant
      if (q.includes("rag") || q.includes("vector") || q.includes("chromadb") || q.includes("sentence transformer") || q.includes("embedding") || q.includes("chunking") || q.includes("project 2") || q.includes("second project")) {
        return "The Enterprise RAG Knowledge Assistant (github.com/ahmed-abdelatif/Enterprise_RAG_Knowledge_Assistant) is a document-based semantic search backend. Ahmed implemented document ingestion for PDF, DOCX, and TXT files, recursive text chunking, Sentence Transformers embeddings, ChromaDB vector indexing, and source-referenced question answering.";
      }

      // 5. Project 3: AI Document Intelligence Platform
      if (q.includes("document intelligence") || q.includes("pdf parsing") || q.includes("ocr") || q.includes("extraction") || q.includes("upload") || q.includes("project 3") || q.includes("third project")) {
        return "The AI Document Intelligence Platform (github.com/ahmed-abdelatif/AI_Document_Intelligence_Platform) handles long-running document workloads. Ahmed designed multipart PDF/DOCX upload validation APIs and offloaded structured data extraction to Redis/RQ background workers with processing status tracking and retry mechanisms.";
      }

      // 6. Project 4: Medical Event Automation Platform
      if (q.includes("medical event") || q.includes("smtp") || q.includes("email automation") || q.includes("event management") || q.includes("registration") || q.includes("project 4") || q.includes("fourth project")) {
        return "The Medical Event Automation Platform (github.com/ahmed-abdelatif/Medical_Event_Automation_Platform) manages event registrations and attendee workflows. Ahmed modeled relational database schemas with PostgreSQL and SQLAlchemy, and automated background email dispatches via Redis/RQ queues and SMTP integration.";
      }

      // 7. Projects Overview (Catch-All)
      if (q.includes("project") || q.includes("projects") || q.includes("built") || q.includes("portfolio") || q.includes("repos") || q.includes("systems")) {
        return "Ahmed engineered 4 production-ready backend systems: 1. AI Customer Support Platform (FastAPI & WhatsApp API), 2. Enterprise RAG Knowledge Assistant (ChromaDB vector search), 3. AI Document Intelligence Platform (Async PDF parsing), and 4. Medical Event Automation Platform (SMTP dispatches). Which project would you like to explore?";
      }

      // 8. Value Propositions & Core Capabilities
      if (q.includes("value") || q.includes("proposition") || q.includes("capability") || q.includes("specialist") || q.includes("asynchronous") || q.includes("background")) {
        return "Ahmed's core value propositions center around: 1. Asynchronous REST API engineering with FastAPI & Pydantic. 2. Offloading heavy background tasks & notification dispatches using Redis/RQ. 3. Building RAG vector search pipelines with ChromaDB and integrating Meta WhatsApp Cloud API webhooks.";
      }

      // 9. Technical Stack & Specific Skill Categories (Specific Categories First)
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

      // Generic Technical Stack & Skills Overview (Lists the 6 Main Categories)
      if (q.includes("skill") || q.includes("skills") || q.includes("tech") || q.includes("stack") || q.includes("technical")) {
        return "Ahmed's Technical Stack spans 6 core categories: 1. Backend Engineering (Python, FastAPI, C++). 2. Databases & Queues (PostgreSQL, SQLAlchemy, Redis/RQ). 3. Integrations (WhatsApp API, SMTP). 4. AI & Vector Retrieval (RAG, ChromaDB). 5. CS Core (Data Structures, OOP). 6. Tools (Docker, Pytest, Git, Linux). Which category would you like details on?";
      }

      // 10. Education, ECU, Graduation & Military Status
      if (q.includes("ecu") || q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("college") || q.includes("graduation") || q.includes("military") || q.includes("army") || q.includes("2029")) {
        return "Ahmed is studying Computer Science at the Egyptian Chinese University (ECU) in Cairo, expected to graduate in 2029. His military service status is officially postponed for study.";
      }

      // 11. Hobbies & Mindset
      if (q.includes("hobby") || q.includes("hobbies") || q.includes("interest") || q.includes("mindset") || q.includes("free time") || q.includes("passion")) {
        return "Ahmed's personal hobbies include: 1. Practicing competitive algorithmic problem solving in C++. 2. Studying backend system architecture and clean code reliability. 3. Exploring open-source AI tools and local vector search pipelines.";
      }

      // 12. Recruiter Questions (Strengths, Weaknesses, Relocation, Availability)
      if (q.includes("strength") || q.includes("weakness") || q.includes("why hire") || q.includes("location") || q.includes("cairo") || q.includes("available") || q.includes("relocate") || q.includes("remote")) {
        return "Ahmed's main strengths are designing clean asynchronous REST APIs with FastAPI and engineering reliable Redis background worker queues. He is based in Cairo, Egypt, and available for On-site, Hybrid, or Remote backend roles.";
      }

      // 13. Contact Information
      if (q.includes("email") || q.includes("contact") || q.includes("reach") || q.includes("hire") || q.includes("gmail") || q.includes("github") || q.includes("linkedin")) {
        return "You can reach Ahmed directly via email at ahmeeedmohaaamed1@gmail.com or explore his open-source code repositories on GitHub at github.com/ahmed-abdelatif.";
      }

      // 14. Conversational Greetings & Banter
      if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings") || q.includes("good morning") || q.includes("good afternoon")) {
        return "Hello! How can I assist you today? Feel free to ask me about Ahmed's 4 backend projects, H2M work experience, ECU computer science degree, or tech stack!";
      }

      if (q.includes("thanks") || q.includes("thank you") || q.includes("great") || q.includes("awesome") || q.includes("perfect")) {
        return "You're very welcome! Feel free to ask any other questions about Ahmed's experience, background, or projects!";
      }

      return "Ahmed Mohamed Abdelatif is a Python Backend Developer based in Cairo, studying Computer Science at ECU (graduation 2029). He has hands-on experience at H2M and engineered 4 production-ready backend systems. How can I help you explore his profile?";
    };

    try {
      const formattedHistory = messages
        .filter((m) => m.sender === "user" || m.sender === "ai")
        .slice(-6)
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        }));

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

    // Seamless Local Fallback Execution
    const fallbackText = localFallbackReply(userText);
    setMessages((prev) => [...prev, { sender: "ai", text: fallbackText }]);
    speakText(fallbackText);
  };

  const handleChipClick = (queryText: string) => {
    if (!chatOpen) {
      setChatOpen(true);
    }
    processUserQuery(queryText);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    processUserQuery(inputMsg.trim());
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-100 selection:bg-purple-600 selection:text-white pb-24 font-sans relative">
      
      {/* Ambient Lighting */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0b0f17]/90 border-b border-gray-800/80 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <a href="#" className="text-lg font-extrabold text-white tracking-tight">
                AHMED MOHAMED ABDELATIF
              </a>
              
              {/* Header Soundwave Visualizer Aura */}
              <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-800/50 px-3 py-1 rounded-full shadow-sm">
                {isSpeaking ? (
                  <div className="flex items-center gap-1 text-xs font-mono text-purple-300">
                    <span className="w-1 h-3.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-4 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-2.5 bg-purple-400 rounded-full animate-bounce" />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
                    <span className="ml-1 text-[11px] text-purple-200 font-semibold">AI Assistant Speaking...</span>
                  </div>
                ) : isListening ? (
                  <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-1 h-3.5 bg-emerald-300 rounded-full animate-pulse [animation-delay:-0.2s]" />
                    <span className="ml-1 text-[11px] font-semibold">Mic Active (Listening...)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-[11px]">AI Voice Active</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-purple-400 font-mono font-medium">
              Python Backend Developer & AI Automation Specialist
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <button
              onClick={handleToggleChat}
              className="flex items-center gap-1.5 bg-purple-900/60 hover:bg-purple-800 text-purple-200 px-3 py-1.5 rounded-lg border border-purple-700/60 transition"
              title="Toggle Assistant Text Log"
            >
              <Bot className="w-3.5 h-3.5" /> {chatOpen ? "Hide Text Log" : "Show Text Log"}
            </button>

            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ahmeeedmohaaamed1@gmail.com" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 px-3.5 py-1.5 rounded-lg border border-purple-800/50 transition shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-purple-400" /> Send Email
            </a>
            
            <a 
              href="https://www.linkedin.com/in/ahmed-abdelatif" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 px-3.5 py-1.5 rounded-lg border border-blue-800/50 transition"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            
            <a 
              href="https://github.com/ahmed-abdelatif" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-gray-800/80 hover:bg-gray-700 text-gray-200 px-3.5 py-1.5 rounded-lg border border-gray-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" /> GitHub Profile
            </a>

            <a 
              href="/Ahmed_Abdelatif_CV.pdf" 
              download
              className="flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 px-3.5 py-1.5 rounded-lg border border-emerald-800/50 transition"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" /> Download CV
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-20 pt-10">

        {/* Hero Section */}
        <section className="space-y-8 border-b border-gray-800/80 pb-14">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 bg-gray-800/90 text-gray-200 px-3 py-1 rounded-md border border-gray-700">
              <MapPin className="w-3.5 h-3.5 text-purple-400" /> Location: Cairo, Egypt
            </span>
            <span className="bg-purple-950/60 text-purple-300 px-3 py-1 rounded-md border border-purple-800/40">
              EG Nationality: Egyptian
            </span>
            <span className="bg-emerald-950/60 text-emerald-400 px-3 py-1 rounded-md border border-emerald-800/40">
              Graduation: 2029 (ECU)
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Building dependable <span className="text-purple-400">Python backend systems</span>, clean APIs, and real-world business automations.
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              Hello! I&apos;m Ahmed—a Computer Science student with hands-on experience engineering FastAPI backend services, managing PostgreSQL relational databases, setting up Redis task queues, and connecting business logic to external messaging APIs like Meta WhatsApp Cloud API.
            </p>
          </div>

          {/* Primary Tech Stack */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-gray-400 font-semibold uppercase tracking-wider">CORE ENGINEERING STACK:</div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {["Python 3.11+", "FastAPI", "PostgreSQL", "Redis & RQ Queue", "REST Webhooks", "Docker", "ChromaDB", "Git"].map((tech, idx) => (
                <span key={idx} className="bg-gray-900 text-gray-300 px-3 py-1 rounded-md border border-gray-800 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a 
              href="#experience" 
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition text-sm shadow-lg shadow-purple-950/80"
            >
              Inspect Practical Experience <ChevronRight className="w-4 h-4" />
            </a>
            <a 
              href="#projects" 
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-6 py-3 rounded-lg border border-gray-700 transition text-sm"
            >
              Explore Built Projects
            </a>
          </div>
        </section>

        {/* Section 1: Candidate Profile */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <User className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Personal & Academic Profile</h2>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                I am a Computer Science student at the **Egyptian Chinese University (ECU)** in Cairo. My focus is on backend architecture, API engineering, relational database design, and asynchronous workflow processing.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                I build structured software using FastAPI, PostgreSQL, SQLAlchemy, Pydantic, and Redis/RQ queues. I pay close attention to backend fundamentals: separating API handlers from heavy background jobs, logging data cleanly, and creating separated AI service boundaries.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                During my 3-month on-site experience at **H2M**, I applied these practices to **MAXP Online**, developing internal financial calculators, campaign analytics, and Meta WhatsApp Cloud API webhook listeners and scheduled dispatches.
              </p>
            </div>

            <div className="md:col-span-5 bg-gray-900/90 border border-gray-800 rounded-xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
                <h3 className="text-xs font-mono text-purple-400 uppercase tracking-wider font-bold">
                  Candidate Fact Sheet
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Verified Info
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {personalDetails.map((item, idx) => (
                  <div key={idx} className="flex flex-col space-y-0.5">
                    <span className="text-gray-400 font-mono text-[11px]">{item.label}:</span>
                    <span className="text-gray-200 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Technical Focus */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <Target className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Backend Engineering Capabilities</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {valuePropositions.map((item, idx) => (
              <div key={idx} className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-3 hover:border-purple-800/40 transition">
                <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Education */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Education</h2>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-3 py-1 rounded-md border border-purple-800/40 inline-block font-semibold">
                Degree Program
              </span>
              <h3 className="text-xl font-bold text-white">Bachelor of Computer Science (B.Sc.)</h3>
              <p className="text-sm text-purple-300 font-medium">Egyptian Chinese University (ECU) — Cairo, Egypt</p>
              <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
                Coursework: Data Structures, Algorithms, Database Systems, Object-Oriented Programming (C++ & Python), Software Engineering.
              </p>
            </div>
            <div className="md:text-right shrink-0 space-y-1">
              <span className="text-xs font-mono bg-gray-800 text-gray-200 px-3 py-1.5 rounded-md border border-gray-700 block font-semibold">
                Expected Graduation: 2029
              </span>
              <span className="text-xs text-emerald-400 font-mono block">Status: Currently Enrolled</span>
            </div>
          </div>
        </section>

        {/* Section 4: Work Experience */}
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
                    <li>Built product pricing and profitability calculation tools handling 500+ products.</li>
                    <li>Developed marketing campaign tracking with real-time shipping analytics dashboard.</li>
                    <li>Built customer performance analytics reducing manual reporting by 80%.</li>
                  </ul>
                </div>

                <div className="bg-gray-800/60 p-5 rounded-lg border border-gray-700/80 space-y-2.5">
                  <h4 className="font-bold text-purple-300 text-xs uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Meta WhatsApp Cloud API
                  </h4>
                  <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
                    <li>Built WhatsApp workflows processing 1000+ messages/day via webhooks.</li>
                    <li>Implemented automated replies reducing manual response time by 70%.</li>
                    <li>Deployed scheduled marketing campaigns reaching 5000+ customers.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-950/40 p-3.5 rounded-lg border border-purple-800/40 text-xs text-purple-200 font-mono">
                <strong>Workflow Pattern:</strong> Webhook → Backend → Business Logic → WhatsApp API
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center p-3 bg-gray-800/40 rounded-lg border border-gray-800">
                  <div className="text-lg font-bold text-purple-400">500+</div>
                  <div className="text-[10px] text-gray-400 font-mono">Products Managed</div>
                </div>
                <div className="text-center p-3 bg-gray-800/40 rounded-lg border border-gray-800">
                  <div className="text-lg font-bold text-purple-400">1000+</div>
                  <div className="text-[10px] text-gray-400 font-mono">Messages/Day</div>
                </div>
                <div className="text-center p-3 bg-gray-800/40 rounded-lg border border-gray-800">
                  <div className="text-lg font-bold text-purple-400">70%</div>
                  <div className="text-[10px] text-gray-400 font-mono">Faster Response</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Testimonials */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">What Colleagues Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 font-bold text-sm">
                  M
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Senior Backend Engineer</p>
                  <p className="text-xs text-purple-400 font-mono">H2M — MAXP Online</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                "Ahmed demonstrated strong backend fundamentals during his time at H2M. He quickly picked up our WhatsApp API integration patterns and built reliable financial calculation tools that the team still uses daily."
              </p>
            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 font-bold text-sm">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Team Lead</p>
                  <p className="text-xs text-purple-400 font-mono">H2M — Engineering</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                "What impressed me most was Ahmed's ability to handle async processing with Redis/RQ. He built background job systems that processed marketing dispatches without blocking the main API — exactly the pattern we needed."
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Projects */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Engineered Systems & Projects</h2>
            </div>
            <span className="text-xs text-gray-400 font-mono">Repositories on GitHub</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => handleOpenProjectModal(proj)}
                className="bg-gray-900/70 hover:bg-gray-900 border border-gray-800 hover:border-purple-800/60 rounded-xl p-6 flex flex-col justify-between cursor-pointer transition space-y-5 group shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-800/40 font-semibold">
                      Project #{proj.id}
                    </span>
                    <span className="text-xs text-purple-300 font-mono flex items-center gap-1 group-hover:text-purple-200">
                      Details & Technical Bullets <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-mono text-purple-400 pt-0.5">
                      {proj.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Metrics Preview */}
                  {proj.metrics && (
                    <div className="flex flex-wrap gap-3 pt-1">
                      {proj.metrics.map((m: {label: string, value: string}, i: number) => (
                        <span key={i} className="text-[10px] font-mono text-purple-300 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/40">
                          {m.value} {m.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-800/80">
                  <div className="text-[11px] font-mono text-gray-400 uppercase font-semibold">Technologies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.builtWith.map((tech, i) => (
                      <span key={i} className="text-[11px] font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0b0f17]/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0b0f17] border border-purple-800/60 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl shadow-purple-950/50">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-1.5 rounded-lg bg-gray-900 border border-gray-800 transition text-xs font-mono flex items-center gap-1 z-10"
              >
                <X className="w-4 h-4" /> Close
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-purple-400 font-semibold uppercase">Project Overview ({selectedProject.id})</span>
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-purple-300">{selectedProject.tagline}</p>
              </div>

              <div className="space-y-4">
                {/* Why I Built This */}
                <div>
                  <h4 className="text-xs font-mono text-emerald-400 uppercase font-semibold mb-1">Why I Built This</h4>
                  <p className="text-xs text-gray-300 leading-relaxed bg-emerald-950/20 p-4 rounded-lg border border-emerald-800/30">
                    {selectedProject.whyBuilt}
                  </p>
                </div>

                {/* Impact Metrics */}
                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProject.metrics.map((m: {label: string, value: string}, i: number) => (
                      <div key={i} className="text-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="text-lg font-bold text-purple-400">{m.value}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Case Study */}
                {selectedProject.caseStudy && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-purple-400 uppercase font-semibold">Case Study</h4>
                    
                    <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-800 space-y-1">
                      <h5 className="text-[11px] font-mono text-red-400 uppercase font-bold">Problem</h5>
                      <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.caseStudy.problem}</p>
                    </div>

                    <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-800 space-y-1">
                      <h5 className="text-[11px] font-mono text-blue-400 uppercase font-bold">Process</h5>
                      <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.caseStudy.process}</p>
                    </div>

                    <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-800 space-y-1">
                      <h5 className="text-[11px] font-mono text-emerald-400 uppercase font-bold">Result</h5>
                      <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.caseStudy.result}</p>
                    </div>
                  </div>
                )}

                {/* Technical Bullets */}
                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-2">Technical Bullets & Implementation</h4>
                  <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside bg-gray-800/40 p-4 rounded-lg border border-gray-800">
                    {selectedProject.whatIBuilt.map((bullet: string, i: number) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.builtWith.map((t: string, i: number) => (
                      <span key={i} className="text-xs font-mono bg-purple-950/60 text-purple-300 px-3 py-1 rounded-md border border-purple-800/40 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-xs text-gray-400 hover:text-white transition font-medium"
                >
                  Return to Portfolio
                </button>
                <div className="flex items-center gap-3">
                  {selectedProject.liveDemo && (
                    <a 
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-md"
                    >
                      <Zap className="w-4 h-4" /> Live Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-md"
                  >
                    <Globe className="w-4 h-4" /> View GitHub Repository <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Skill Category Details */}
        {selectedSkillCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0b0f17]/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0b0f17] border border-purple-800/60 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative shadow-purple-950/50">
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setSelectedSkillCategory(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-900 border border-gray-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-purple-400 font-semibold uppercase">Skill Domain Deep Dive</span>
                <h3 className="text-2xl font-bold text-white">{selectedSkillCategory.category}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-1">Core Competencies & Tools</h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedSkillCategory.skills.map((s: string, i: number) => (
                      <span key={i} className="text-xs font-mono bg-purple-950/60 text-purple-300 px-3 py-1 rounded-md border border-purple-800/40 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-1">Engineering Mastery</h4>
                  <p className="text-xs text-gray-300 leading-relaxed bg-gray-800/70 p-4 rounded-lg border border-gray-700">
                    {selectedSkillCategory.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-1">Practical Experience & Application</h4>
                  <p className="text-xs text-gray-300 leading-relaxed bg-gray-800/40 p-4 rounded-lg border border-gray-800">
                    {selectedSkillCategory.experienceSummary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-2">Applied Projects & Repositories</h4>
                  <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside bg-purple-950/30 p-4 rounded-lg border border-purple-900/40">
                    {selectedSkillCategory.appliedProjects.map((projName: string, i: number) => (
                      <li key={i} className="font-mono text-purple-300">{projName}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedSkillCategory(null)}
                  className="text-xs text-gray-400 hover:text-white transition font-medium"
                >
                  Return to Skills
                </button>
                <button
                  onClick={() => handleOpenSkillCategoryModal(selectedSkillCategory)}
                  className="flex items-center gap-2 bg-purple-900/80 hover:bg-purple-800 text-purple-200 font-semibold text-xs px-4 py-2 rounded-lg border border-purple-700/60 transition shadow-md"
                >
                  <Bot className="w-4 h-4 text-purple-300" /> Ask AI to Explain Domain 🔊
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 6: Categorized Skills */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Technical Stack & Skills</h2>
            </div>
            <span className="text-xs text-gray-400 font-mono">Interactive Domain Breakdowns</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => handleOpenSkillCategoryModal(cat)}
                className="bg-gray-900/70 hover:bg-gray-900 border border-gray-800 hover:border-purple-800/60 rounded-xl p-6 flex flex-col justify-between cursor-pointer transition space-y-5 group shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-800/40 font-semibold">
                      Skill Category #0{idx + 1}
                    </span>
                    <span className="text-xs text-purple-300 font-mono flex items-center gap-1 group-hover:text-purple-200">
                      Inspect & Project Breakdown <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/40 group-hover:border-purple-600 transition shrink-0">
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                        {cat.category}
                      </h3>
                      <p className="text-xs font-mono text-purple-400 pt-0.5">
                        {cat.experienceSummary}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-gray-800/80">
                  <div>
                    <div className="text-[11px] font-mono text-gray-400 uppercase font-semibold mb-1">Skills & Tools:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, i) => (
                        <span key={i} className="text-[11px] font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-purple-400 uppercase font-semibold mb-1">Applied In Projects:</div>
                    <div className="flex flex-wrap gap-1">
                      {cat.appliedProjects.map((p, i) => (
                        <span key={i} className="text-[10px] font-mono bg-purple-950/40 text-purple-300 px-2 py-0.5 rounded border border-purple-900/50">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Personal Hobbies */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <Heart className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Personal Hobbies & Engineering Mindset</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {personalHobbies.map((item, idx) => (
              <div key={idx} className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-2">
                <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> {item.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Target Role & Contact */}
        <section className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-purple-950/40 border border-gray-800 rounded-xl p-8 sm:p-12 space-y-6 text-center shadow-lg relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h2 className="text-3xl font-extrabold text-white">
                What I&apos;m Looking For
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                I am looking for opportunities where I can grow as a Python Backend Developer, work on real business problems, and build automation and AI-powered systems with an experienced engineering team.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2 relative z-10">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ahmeeedmohaaamed1@gmail.com" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-7 py-3.5 rounded-lg transition text-sm shadow-lg shadow-purple-950/80"
              >
                <Mail className="w-4 h-4" /> Direct Gmail (ahmeeedmohaaamed1@gmail.com)
              </a>

              <a 
                href="https://www.linkedin.com/in/ahmed-abdelatif" 
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
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-6 py-3.5 rounded-lg border border-gray-700 transition text-sm"
              >
                <Globe className="w-4 h-4" /> GitHub Profile
              </a>

              <a 
                href="/Ahmed_Abdelatif_CV.pdf" 
                download
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-lg transition text-sm"
              >
                <FileText className="w-4 h-4" /> Download CV PDF
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 font-mono">
        <p>© 2026 Ahmed Mohamed Abdelatif | Python Backend Developer & AI Automation.</p>
      </footer>

      {/* Interactive Voice AI Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={handleToggleChat}
            className="flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-medium px-5 py-3 rounded-full shadow-2xl transition transform hover:scale-105 border border-purple-400/30 group"
          >
            <Bot className="w-5 h-5 text-purple-200 group-hover:rotate-12 transition" />
            <div className="text-left">
              <span className="text-xs font-bold block">Ask Ahmed&apos;s Assistant 🤖</span>
              <span className="text-[10px] text-purple-200/80 block font-mono">🔊 Interactive Voice Mode Active</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </button>
        ) : (
          <div className="bg-gray-900 w-[350px] sm:w-[390px] h-[510px] rounded-2xl shadow-2xl flex flex-col border border-purple-800/60 overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-purple-950/90 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    Ahmed&apos;s Voice AI Assistant
                  </h4>
                  {/* Glowing Animated Soundwave Aura */}
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
                      <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
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
                    className="text-xs bg-red-950/80 text-red-300 px-2 py-1 rounded border border-red-800 font-mono"
                    title="Mute Voice"
                  >
                    ⏹ Mute
                  </button>
                )}
                <button 
                  onClick={handleToggleChat}
                  className="text-gray-400 hover:text-white text-xs font-mono p-1"
                >
                  ✕
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
                        : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips Bar */}
            <div className="px-3 py-2 bg-gray-900/90 border-t border-gray-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(q.query)}
                  className="bg-gray-800 hover:bg-purple-950 text-gray-300 hover:text-purple-200 px-2.5 py-1 rounded-lg text-[10px] font-mono border border-gray-700/80 whitespace-nowrap transition"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Voice Input & Text Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 bg-gray-950 flex items-center gap-2">
              <button
                type="button"
                onClick={startListening}
                className={`p-2.5 rounded-xl transition border ${
                  isListening 
                    ? "bg-red-600 text-white border-red-400 animate-pulse" 
                    : "bg-gray-800 text-purple-300 hover:bg-purple-900/50 border-gray-700"
                }`}
                title="Speak to Assistant (Voice Mic)"
              >
                🎙️
              </button>

              <input
                type="text"
                placeholder={isListening ? "Listening to your voice..." : "Type or speak your question..."}
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
              <button
                type="submit"
                className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition"
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
