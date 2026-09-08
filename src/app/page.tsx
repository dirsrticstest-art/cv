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
      whatIBuilt: [
        "Built FastAPI REST APIs for customers, tickets, conversations, and messages.",
        "Implemented WhatsApp webhook handling and Meta WhatsApp Cloud API integration.",
        "Added Redis/RQ background jobs for asynchronous message and AI processing.",
        "Built an AI service layer for message classification and response generation.",
        "Implemented PostgreSQL persistence and background job status tracking.",
        "Added error handling for failed background jobs."
      ],
      builtWith: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "Docker", "Pytest"],
      github: "https://github.com/ahmed-abdelatif/AI_Customer_Support_Platform"
    },
    {
      id: "02",
      title: "Enterprise RAG Knowledge Assistant",
      repoName: "Enterprise_RAG_Knowledge_Assistant",
      tagline: "Document RAG backend with vector retrieval & source referencing",
      description: "A document-based knowledge assistant backend that performs document ingestion, text chunking, embedding generation, ChromaDB vector storage, semantic retrieval, and source-aware answer generation.",
      whatIBuilt: [
        "Built document ingestion for PDF, DOCX, and TXT files.",
        "Implemented text extraction, chunking, and overlapping document segments.",
        "Generated semantic embeddings using Sentence Transformers.",
        "Stored and searched document vectors using ChromaDB.",
        "Built a RAG retrieval pipeline with source references.",
        "Added Redis/RQ background indexing and failed-job handling."
      ],
      builtWith: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "RQ", "ChromaDB", "Sentence Transformers", "Docker", "Pytest"],
      github: "https://github.com/ahmed-abdelatif/Enterprise_RAG_Knowledge_Assistant"
    },
    {
      id: "03",
      title: "AI Document Intelligence Platform",
      repoName: "AI_Document_Intelligence_Platform",
      tagline: "Async document processing & structured data extraction pipeline",
      description: "Backend pipeline for uploading documents, extracting content, processing structured information, and executing long-running processing tasks asynchronously using background workers.",
      whatIBuilt: [
        "Built PDF, DOCX, and TXT document upload and validation APIs.",
        "Implemented document storage and text extraction.",
        "Added structured data processing through a separated extraction service.",
        "Implemented Redis/RQ background processing for long-running document jobs.",
        "Added processing status tracking and failed-job retry handling.",
        "Designed the extraction layer so external AI/OCR services can be integrated later."
      ],
      builtWith: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "Docker", "Pytest"],
      github: "https://github.com/ahmed-abdelatif/AI_Document_Intelligence_Platform"
    },
    {
      id: "04",
      title: "Medical Event Automation Platform",
      repoName: "Medical_Event_Automation_Platform",
      tagline: "Event management & automated notification workflow system",
      description: "Backend system for managing event-related data, attendee registrations, and automating communication workflows such as background email dispatches via SMTP.",
      whatIBuilt: [
        "Built FastAPI APIs for event-related data and registration workflows.",
        "Implemented relational database models using PostgreSQL and SQLAlchemy.",
        "Added Redis/RQ background jobs for automated email notifications.",
        "Integrated SMTP for email delivery.",
        "Implemented job status tracking and retry handling.",
        "Added error and rollback handling for failed operations."
      ],
      builtWith: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "SMTP", "Docker", "Pytest"],
      github: "https://github.com/ahmed-abdelatif/Medical_Event_Automation_Platform"
    }
  ];

  // Skill Categories
  const skillCategories = [
    {
      category: "Backend Engineering",
      icon: Server,
      skills: ["Python", "FastAPI", "REST APIs", "Webhooks", "Pydantic", "C++"]
    },
    {
      category: "Databases & Queues",
      icon: Database,
      skills: ["PostgreSQL", "SQLite", "SQLAlchemy", "Redis", "RQ (Redis Queue)"]
    },
    {
      category: "Integrations & Automation",
      icon: Layers,
      skills: ["Meta WhatsApp Cloud API", "SMTP", "Third-party APIs"]
    },
    {
      category: "AI & Vector Retrieval",
      icon: Workflow,
      skills: ["RAG Pipelines", "ChromaDB", "Sentence Transformers", "Embeddings"]
    },
    {
      category: "Computer Science Core",
      icon: Shield,
      skills: ["Data Structures", "Algorithms", "Object-Oriented Programming (OOP)", "Clean Code & Logging"]
    },
    {
      category: "Tools & Testing",
      icon: Wrench,
      skills: ["Git", "GitHub", "Docker", "Linux", "Pytest"]
    },
    {
      category: "Languages",
      icon: LanguagesIcon,
      skills: ["Arabic (Native)", "English (Professional Working Proficiency)"]
    }
  ];

  // Personal Details
  const personalDetails = [
    { label: "Full Name", value: "Ahmed Mohamed Abdelatif" },
    { label: "Nationality", value: "Egyptian (مصري)" },
    { label: "Degree & Specialization", value: "B.Sc. Computer Science (Graduation 2026)" },
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

  // Chatbot State & Hands-Free Voice Interactive AI Assistant Engine
  const [chatOpen, setChatOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoListenMode, setAutoListenMode] = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! Welcome to Ahmed Mohamed Abdelatif's developer CV. I am Ahmed's AI Personal Assistant—how can I help you today?"
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

  // Text-To-Speech Engine (Calm, Clear, Medium-Paced Male Voice)
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Cancel any existing speech
      stopListening(); // Mute mic while AI speaks to prevent self-loopback & cutoff!

      isSpeakingRef.current = true;
      setIsSpeaking(true);

      const cleanText = text.replace(/[*#_~]/g, "").replace(/\n/g, ". ");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const isAr = isArabicText(cleanText);
      
      utterance.rate = 0.90; // Calm, medium-slow clear pace
      utterance.pitch = 0.92; // Deep, calm male pitch tone

      const voices = window.speechSynthesis.getVoices();
      if (isAr) {
        utterance.lang = "ar-EG";
        const arMale = voices.find(
          (v) => v.lang.startsWith("ar") && (v.name.includes("Maged") || v.name.includes("TarIK") || v.name.includes("Male") || v.name.includes("Google"))
        ) || voices.find((v) => v.lang.startsWith("ar"));
        if (arMale) utterance.voice = arMale;
      } else {
        utterance.lang = "en-US";
        // Lock to Male Voice
        const enMale = voices.find(
          (v) => v.lang.startsWith("en") && (v.name.includes("Guy") || v.name.includes("Daniel") || v.name.includes("David") || v.name.includes("Alex") || v.name.includes("Male") || v.name.includes("George") || v.name.includes("Natural"))
        ) || voices.find((v) => v.lang.startsWith("en"));
        if (enMale) utterance.voice = enMale;
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

  // Continuous Interruptible Voice STT (Ref-Governed for Infinite Multi-Turn Interaction)
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
      recognition.lang = currentLangRef.current || "ar-EG";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
      };

      recognition.onend = () => {
        isListeningRef.current = false;
        setIsListening(false);
        // Keep mic listening continuously if AI is not speaking
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

  // Auto-Greeting on Page Load in English Mode with user gesture fallback
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const playGreeting = () => {
      if (!hasGreeted) {
        setHasGreeted(true);
        speakText("Hello! Welcome to Ahmed Mohamed Abdelatif's developer CV. I am Ahmed's AI Personal Assistant—how can I help you today?");
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
        speakText("Hello! Welcome to Ahmed Mohamed Abdelatif's developer CV. I am Ahmed's AI Personal Assistant—how can I help you today?");
      }
      setTimeout(() => startListening(), 300);
    }
  };

  // Contextual Assistant Awareness when HR views a project modal
  const handleOpenProjectModal = (proj: typeof projects[0]) => {
    setSelectedProject(proj);
    let contextualNarrative = "";
    if (proj.id === "01") {
      contextualNarrative = "Welcome! For the AI Customer Support Platform, Ahmed built FastAPI REST APIs for tickets and WhatsApp Cloud API integration, offloading message processing to Redis RQ background workers.";
    } else if (proj.id === "02") {
      contextualNarrative = "This is the Enterprise RAG Knowledge Assistant! Ahmed implemented document chunking, Sentence Transformers embeddings, and ChromaDB vector search for source-aware answers.";
    } else if (proj.id === "03") {
      contextualNarrative = "The AI Document Intelligence Platform asynchronously extracts structured text data from PDF and DOCX uploads using Redis RQ background workers.";
    } else if (proj.id === "04") {
      contextualNarrative = "The Medical Event Automation Platform manages attendee registrations and dispatches automated email notifications asynchronously using Redis RQ and SMTP.";
    }
    
    // Narrate contextual explanation
    setMessages((prev) => [...prev, { sender: "ai", text: `🔎 ${proj.title}:\n${contextualNarrative}` }]);
    speakText(contextualNarrative);
  };

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  // Recruiter Interview AI Engine - Comprehensive Arabic & English Knowledge Base
  const processUserQuery = (userText: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");

    const isAr = isArabicText(userText);
    currentLangRef.current = isAr ? "ar-EG" : "en-US";

    setTimeout(() => {
      let aiReply = "";
      const q = userText.toLowerCase().trim();

      // Rule 1: Self Introduction & Overview
      if (
        q.includes("tell me about yourself") ||
        q.includes("about yourself") ||
        q.includes("introduce yourself") ||
        q.includes("who are you") ||
        q.includes("who is ahmed") ||
        q.includes("tell me about ahmed") ||
        q.includes("overview") ||
        q.includes("summary") ||
        q.includes("profile") ||
        q.includes("عرف نفسك") ||
        q.includes("مين احمد") ||
        q.includes("من انت") ||
        q.includes("كلمني عن نفسك") ||
        q.includes("نبذة") ||
        q.includes("من هو")
      ) {
        if (isAr) {
          const prefix = !hasIntroducedRef.current ? "أهلاً بك في السي في الخاص بأحمد، وأنا المساعد الشخصي بتاعه! " : "";
          hasIntroducedRef.current = true;
          aiReply = `${prefix}أحمد مهندس باكد إند بيستخدم Python وFastAPI وPostgreSQL وRedis. يمتلك خبرة عمل في شركة H2M وبنى 4 مشاريع أنظمة باكد إند قوية تشمل RAG وWhatsApp Automation. أقدر أساعدك بإيه في التفاصيل؟`;
        } else {
          const prefix = !hasIntroducedRef.current ? "Welcome to Ahmed's CV! I'm his personal assistant. " : "";
          hasIntroducedRef.current = true;
          aiReply = `${prefix}Ahmed is a Python Backend Developer proficient in FastAPI, PostgreSQL, and Redis task queues. He has hands-on experience at H2M and engineered 4 solid backend systems including RAG and WhatsApp API automation. How can I help you today?`;
        }
      }
      // Rule 2: Projects Overview & Deep Dive
      else if (q.includes("rag") || q.includes("vector") || q.includes("chromadb") || q.includes("embeddings")) {
        if (isAr) {
          aiReply = "مشروع Enterprise RAG Assistant بيعمل استخراج ونصوص من ملفات PDF وDOCX وTXT، وبيقسمها لـ Chunks، وبيولد Embeddings باستخدام Sentence Transformers، وبيبحث في المتجهات عن طريق ChromaDB مع الاستشهاد بالمصادر.";
        } else {
          aiReply = "The Enterprise RAG Knowledge Assistant ingests PDF, DOCX, and TXT files, performs text chunking, generates embeddings with Sentence Transformers, and conducts vector similarity searches via ChromaDB with source references.";
        }
      }
      else if (q.includes("whatsapp") || q.includes("meta") || q.includes("cloud api")) {
        if (isAr) {
          aiReply = "أحمد ربط Meta WhatsApp Cloud API واستقبل Webhooks مباشرة لبناء محادثات الرد التلقائي وإدارة الرسائل غير المتزامنة عبر Redis وRQ queues.";
        } else {
          aiReply = "Ahmed implemented Meta WhatsApp Cloud API webhooks for real-time customer support messaging, automated reply workflows, and Redis/RQ background message queues.";
        }
      }
      else if (q.includes("document intelligence") || q.includes("pdf parsing") || q.includes("ocr")) {
        if (isAr) {
          aiReply = "منصة AI Document Intelligence تعالج المستندات بشكل غير متزامن Asynchronous بعمال Redis/RQ لاستخراج البيانات الهيكلية ومتابعة حالة المعالجة ورسائل الفشل.";
        } else {
          aiReply = "The AI Document Intelligence Platform processes document uploads asynchronously using Redis/RQ background workers and extracts structured data from PDF, DOCX, and TXT files.";
        }
      }
      else if (q.includes("medical event") || q.includes("smtp") || q.includes("email automation")) {
        if (isAr) {
          aiReply = "منصة Medical Event Automation بتدير تسجيل الحضور وتدفقات الفعاليات وتتولى إرسال الإيميلات التلقائية في الخلفية باستخدام Redis/RQ بروتوكول SMTP.";
        } else {
          aiReply = "The Medical Event Automation Platform manages attendee registrations and dispatches background email notifications asynchronously using Redis/RQ queues and SMTP.";
        }
      }
      else if (q.includes("project") || q.includes("built") || q.includes("what projects") || q.includes("portfolio") || q.includes("مشاريع") || q.includes("اعمال")) {
        if (isAr) {
          aiReply = "أحمد بنى 4 مشاريع باكد إند متكاملة: 1. AI Customer Support Platform (WhatsApp API), 2. Enterprise RAG Assistant (ChromaDB Vector Search), 3. AI Document Intelligence Platform (Async Queue), و4. Medical Event Automation Platform (Email Automation).";
        } else {
          aiReply = "Ahmed engineered 4 backend systems: 1. AI Customer Support Platform (FastAPI & WhatsApp API), 2. Enterprise RAG Knowledge Assistant (ChromaDB vector search), 3. AI Document Intelligence Platform (Async processing), and 4. Medical Event Automation Platform (Redis/RQ email dispatches).";
        }
      }
      // Rule 3: Experience & H2M Details
      else if (q.includes("h2m") || q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("position") || q.includes("maxp") || q.includes("خبرة") || q.includes("عمل") || q.includes("شغل")) {
        if (isAr) {
          aiReply = "في شركة H2M (لمدة 3 أشهر دوام كامل أونسايت)، أحمد طور أدوات التحليل المالي لحساب أرباح المنتجات وتكاليف الشحن، وربط Meta WhatsApp Cloud API لإرسال الرسائل التلقائية وحملات التسويق لمنصة MAXP Online.";
        } else {
          aiReply = "At H2M (a 3-month full-time on-site position), Ahmed developed product pricing tools, marketing campaign analytics, shipping cost calculators, and automated Meta WhatsApp Cloud API workflows for MAXP Online.";
        }
      }
      // Rule 4: Detailed Tech Stack & Skills
      else if (q.includes("database") || q.includes("postgres") || q.includes("sql") || q.includes("داتابيز") || q.includes("قواعد بيانات")) {
        if (isAr) {
          aiReply = "في قواعد البيانات والصفوف، أحمد بيستخدم PostgreSQL كقاعدة بيانات علاقات أساسية، SQLAlchemy كـ ORM، SQLite للتطوير السريع، وRedis مع RQ إدارة المهام في الخلفية غير المتزامنة Asynchronous.";
        } else {
          aiReply = "For databases and queues, Ahmed utilizes PostgreSQL for relational data persistence, SQLAlchemy ORM, SQLite, and Redis with RQ queues for asynchronous background job execution.";
        }
      }
      else if (q.includes("docker") || q.includes("git") || q.includes("pytest") || q.includes("linux") || q.includes("اختبار") || q.includes("أدوات")) {
        if (isAr) {
          aiReply = "في أدوات التطوير والاختبار، أحمد بيستخدم Git وGitHub للتحكم في الإصدارات، Docker للحاويات والحزم، Pytest لاختبارات الباك إند، وبيئة العمل Linux.";
        } else {
          aiReply = "For tools and testing, Ahmed uses Git & GitHub for version control, Docker for containerization, Pytest for backend testing suite, and Linux environments.";
        }
      }
      else if (q.includes("fastapi") || q.includes("python") || q.includes("postgresql") || q.includes("redis") || q.includes("tech") || q.includes("stack") || q.includes("skill") || q.includes("tool") || q.includes("language") || q.includes("مهارات") || q.includes("تقنيات")) {
        if (isAr) {
          aiReply = "مهارات أحمد التقنية بالتفصيل تشمل 6 محاور: 1. الباك إند (Python, FastAPI, REST APIs, Webhooks, Pydantic, C++). 2. قواعد البيانات والمهام (PostgreSQL, SQLAlchemy, Redis, RQ Queues). 3. الأتمتة والربط (Meta WhatsApp Cloud API, SMTP). 4. الذكاء الاصطناعي (RAG Pipelines, ChromaDB, Sentence Transformers). 5. الأساسيات البرمجية (Data Structures, Algorithms, OOP, Clean Code). 6. الأدوات والاختبار (Docker, Git, Pytest, Linux).";
        } else {
          aiReply = "Ahmed's complete technical stack spans 6 key domains: 1. Backend API Engineering (Python, FastAPI, REST APIs, Webhooks, Pydantic, C++). 2. Databases & Queues (PostgreSQL, SQLAlchemy, Redis, RQ Queues). 3. Integrations (Meta WhatsApp Cloud API, SMTP). 4. AI & Retrieval (RAG Pipelines, ChromaDB, Sentence Transformers). 5. CS Fundamentals (Data Structures, Algorithms, OOP, Clean Code). 6. Tools & Testing (Docker, Git, Pytest, Linux).";
        }
      }
      // Rule 5: Education, ECU, Graduation & Military Status
      else if (q.includes("ecu") || q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("study") || q.includes("graduation") || q.includes("military") || q.includes("تجنيد") || q.includes("جيش") || q.includes("جامعة") || q.includes("دراسة") || q.includes("تعليم")) {
        if (isAr) {
          aiReply = "أحمد طالب علوم حاسب بـ الجامعة المصرية الصينية (ECU) بالقاهرة، متوقع تخرجه عام 2026. موقفه من التجنيد: مؤجل للدراسة.";
        } else {
          aiReply = "Ahmed is a Computer Science student at the Egyptian Chinese University (ECU) in Cairo, expected to graduate in 2026. Military status: Postponed for study.";
        }
      }
      // Rule 6: Hobbies & Personal Mindset
      else if (q.includes("hobby") || q.includes("hobbies") || q.includes("interest") || q.includes("mindset") || q.includes("هواية") || q.includes("هوايات") || q.includes("اهتمامات")) {
        if (isAr) {
          aiReply = "هوايات أحمد واهتماماته الشخصية تشمل: حل المسائل البرمجية الخوارزمية بلغة C++، دراسة هندسة الأنظمة ومبادئ Clean Code للباكد إند، واستكشاف أدوات الذكاء الاصطناعي مفتوحة المصدر.";
        } else {
          aiReply = "Ahmed's personal hobbies include competitive algorithmic problem solving in C++, studying backend clean architecture & system reliability, and exploring open-source AI tooling.";
        }
      }
      // Rule 7: Recruiter Questions (Strengths, Weaknesses, Relocation, Availability)
      else if (q.includes("strength") || q.includes("weakness") || q.includes("why hire") || q.includes("relocate") || q.includes("cairo") || q.includes("قوة") || q.includes("ضعف") || q.includes("توظيف") || q.includes("متاح")) {
        if (isAr) {
          aiReply = "أبرز نقاط قوة أحمد هي تصميم الـ REST APIs النظيفة وتنفيذ معالجة المهام الثقيلة في الخلفية بـ Redis/RQ. هو مقيم بالقاهرة ومتاح للعمل أونسايت، هايبرد، أو ريموتلي فوراً.";
        } else {
          aiReply = "Ahmed's key strengths are designing clean asynchronous REST APIs and building reliable Redis background worker queues. He is based in Cairo, Egypt, and available for on-site, hybrid, or remote backend roles.";
        }
      }
      // Rule 8: Contact & Email
      else if (q.includes("email") || q.includes("contact") || q.includes("reach") || q.includes("hire") || q.includes("github") || q.includes("تواصل") || q.includes("إيميل") || q.includes("وظيفة")) {
        if (isAr) {
          aiReply = "تقدر تتواصل مع أحمد مباشرة عبر الإيميل: ahmeeedmohaaamed1@gmail.com أو تشوف كوده المفتوح المصدر على GitHub: github.com/ahmed-abdelatif";
        } else {
          aiReply = "You can reach Ahmed directly via email at ahmeeedmohaaamed1@gmail.com or view his GitHub repositories at github.com/ahmed-abdelatif.";
        }
      }
      // Rule 9: Conversational Greetings
      else if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("welcome") || q.includes("مرحبا") || q.includes("اهلاً") || q.includes("السلام")) {
        if (isAr) {
          const prefix = !hasIntroducedRef.current ? "أهلاً بك في السي في الخاص بأحمد، وأنا المساعد الشخصي بتاعه! " : "أهلاً بك! ";
          hasIntroducedRef.current = true;
          aiReply = `${prefix}أقدر أساعدك بإيه؟ تقدر تسألني عن مشاريع الباك إند، خبرته في H2M، دراسته، أو مهاراته!`;
        } else {
          const prefix = !hasIntroducedRef.current ? "Welcome to Ahmed's CV! I am his personal assistant—" : "";
          hasIntroducedRef.current = true;
          aiReply = `${prefix}how can I help you today? You can ask me about his 4 backend projects, H2M experience, CS degree at ECU, or tech stack!`;
        }
      }
      // Natural Friendly Fallback
      else {
        if (isAr) {
          const prefix = !hasIntroducedRef.current ? "أهلاً بك في السي في الخاص بأحمد، وأنا المساعد الشخصي بتاعه! " : "";
          hasIntroducedRef.current = true;
          aiReply = `${prefix}أحمد مهندس باكد إند بيستخدم FastAPI وPostgreSQL وRedis. أقدر أكلمك عن مشاريع الباك إند الـ 4، خبرته بـ H2M، دراسته بجامعة ECU، أو مهاراته التقنية. تحب تعرف إيه بالتفصيل؟`;
        } else {
          const prefix = !hasIntroducedRef.current ? "Welcome to Ahmed's CV! " : "";
          hasIntroducedRef.current = true;
          aiReply = `${prefix}Ahmed is a Python Backend Developer with experience in FastAPI, PostgreSQL, and Redis queues. I can share details about his 4 backend projects, H2M experience, ECU degree, or skills. What would you like to explore?`;
        }
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
      speakText(aiReply);
    }, 300);
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
              href="https://github.com/ahmed-abdelatif" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-gray-800/80 hover:bg-gray-700 text-gray-200 px-3.5 py-1.5 rounded-lg border border-gray-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" /> GitHub Profile
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
              Graduation: 2026 (ECU)
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
                Expected Graduation: 2026
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

        {/* Section 5: Projects */}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-1.5 rounded-lg bg-gray-800 border border-gray-700 transition text-xs font-mono flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Close
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-purple-400 font-semibold uppercase">Project Overview ({selectedProject.id})</span>
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-purple-300">{selectedProject.tagline}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-1">Technical Summary</h4>
                  <p className="text-xs text-gray-300 leading-relaxed bg-gray-800/70 p-4 rounded-lg border border-gray-700">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-2">Technical Bullets & Implementation</h4>
                  <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside bg-gray-800/40 p-4 rounded-lg border border-gray-800">
                    {selectedProject.whatIBuilt.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-gray-400 uppercase font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.builtWith.map((t, i) => (
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
        )}

        {/* Section 6: Categorized Skills */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
            <Wrench className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Technical Stack & Skills</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="bg-gray-900/70 border border-gray-800 rounded-xl p-5 space-y-3.5">
                <div className="flex items-center gap-2.5 border-b border-gray-800 pb-2.5">
                  <div className="p-1.5 rounded bg-purple-950/60 text-purple-400 border border-purple-800/40">
                    <cat.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{cat.category}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s, i) => (
                    <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md border border-gray-700 font-mono font-medium">
                      {s}
                    </span>
                  ))}
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
                href="https://github.com/ahmed-abdelatif" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-6 py-3.5 rounded-lg border border-gray-700 transition text-sm"
              >
                <Globe className="w-4 h-4" /> GitHub Profile
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
