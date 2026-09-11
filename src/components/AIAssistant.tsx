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
  explainSection?: string | null;
  onExplainDone?: () => void;
  explainProject?: string | null;
  onExplainProjectDone?: () => void;
  explainItem?: string | null;
  onExplainItemDone?: () => void;
}

export default function AIAssistant({ chatOpen, onToggleChat, onProjectOpen, onSkillOpen, explainSection, onExplainDone, explainProject, onExplainProjectDone, explainItem, onExplainItemDone }: AIAssistantProps) {
  const lastExplainedRef = useRef<string | null>(null);
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
  const stopListeningRef = useRef<() => void>(() => {});
  const startListeningRef = useRef<() => Promise<void>>(async () => {});

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
        stopListeningRef.current();
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        if (chatOpenRef.current) {
          setTimeout(() => startListeningRef.current(), 600);
        }
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        if (chatOpenRef.current) {
          setTimeout(() => startListeningRef.current(), 600);
        }
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
        if (chatOpenRef.current && !isSpeakingRef.current) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 300);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("SpeechRecognition error:", event.error);
        isListeningRef.current = false;
        setIsListening(false);
        if (chatOpenRef.current && event.error !== "not-allowed" && !isSpeakingRef.current) {
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

  stopListeningRef.current = stopListening;
  startListeningRef.current = startListening;

  useEffect(() => {
    if (chatOpen) {
      retryCountRef.current = 0;
      speakText(messages[0].text);
      setTimeout(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
              stream.getTracks().forEach(t => t.stop());
              startListening();
            })
            .catch(() => {});
        }
      }, 1200);
    } else {
      stopListening();
      stopSpeaking();
    }
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, [chatOpen]);

  const explanations: Record<string, string> = {
    experience: "Ahmed worked at H2M for 3 months as a Backend Developer on the MAXP Online platform. He built product pricing and profitability calculation tools, developed marketing campaign tracking and shipping analytics, and implemented Meta WhatsApp Cloud API automated marketing dispatches with webhooks and message templates. This was a hands-on role where he solved real business problems with Python backend systems.",
    projects: "Ahmed has engineered 5 production-ready backend systems. First, an AI Customer Support Platform with WhatsApp API integration and automated message classification. Second, an Enterprise RAG Knowledge Assistant with ChromaDB vector search for document-based semantic search. Third, an AI Document Intelligence Platform with async PDF parsing and background workers. Fourth, a Medical Event Automation Platform with SMTP email dispatches and relational databases. Fifth, an AI Lead Qualification system with Groq LLM and Celery task queue. Each project demonstrates different backend engineering skills.",
    skills: "Ahmed's technical skills span 6 categories. Backend Engineering with Python, FastAPI, and C++. Databases and Queues with PostgreSQL, SQLAlchemy, and Redis RQ. Integrations with WhatsApp API and SMTP. AI and Vector Retrieval with RAG and ChromaDB. Computer Science Core with Data Structures and OOP. And Tools with Docker, Pytest, Git, and Linux. He applies these skills across all his projects."
  };

  useEffect(() => {
    if (explainSection && explainSection !== lastExplainedRef.current) {
      lastExplainedRef.current = explainSection;
      const text = explanations[explainSection] || "Feel free to ask about any section of Ahmed's portfolio.";
      stopSpeaking();
      stopListening();
      setMessages((prev) => [...prev, { sender: "user", text: `Tell me about ${explainSection}` }, { sender: "ai", text }]);
      setTimeout(() => {
        speakText(text);
      }, 400);
      onExplainDone?.();
    }
  }, [explainSection]);

  const projectExplanations: Record<string, string> = {
    "AI Customer Support Platform": "The AI Customer Support Platform is Ahmed's most comprehensive project. He built a full backend with FastAPI that receives customer messages via WhatsApp webhooks, classifies them by intent using an AI service layer, stores the entire conversation in PostgreSQL, and generates automated draft responses. The system uses Redis RQ for background processing, meaning messages are handled asynchronously without blocking. Ahmed specifically designed it with a replaceable AI boundary so the system can swap LLM providers without rewriting core logic.",
    "Enterprise RAG Knowledge Assistant": "The Enterprise RAG Knowledge Assistant is Ahmed's AI-powered document search system. It takes PDF, DOCX, and TXT files, breaks them into overlapping text chunks, converts each chunk into a vector embedding using Sentence Transformers, and stores everything in ChromaDB. When a user asks a question, it finds the most semantically similar chunks and generates an answer with source citations. Ahmed built this to solve the problem of searching through large document collections without manually reading everything.",
    "AI Document Intelligence Platform": "The AI Document Intelligence Platform handles heavy document processing workloads. Ahmed designed it with FastAPI upload endpoints that validate PDF, DOCX, and TXT files, then offload the actual extraction to Redis RQ background workers. Each job tracks its status through a queue, processing, completed, or failed state with real-time updates. Failed jobs automatically retry with exponential backoff. Ahmed built this to demonstrate handling long-running tasks without blocking API responses.",
    "Medical Event Automation Platform": "The Medical Event Automation Platform manages event registrations and attendee workflows. Ahmed modeled relational database schemas with PostgreSQL and SQLAlchemy to handle event data, attendee information, and registration status. He built automated email dispatches through Redis RQ queues and SMTP integration, so registration confirmations and event reminders are sent in the background without manual intervention.",
    "AI Lead Qualification & CRM Automation": "The AI Lead Qualification system uses Groq LLM to automatically classify inbound leads by quality and intent. Ahmed built a FastAPI backend that scores each lead, syncs results to a CRM using Celery async workers with Redis, and includes exponential backoff retries for reliability. Every lead qualification decision is logged in a PostgreSQL audit trail for compliance and debugging."
  };

  useEffect(() => {
    if (explainProject && explainProject !== lastExplainedRef.current) {
      lastExplainedRef.current = explainProject;
      const text = projectExplanations[explainProject] || `Let me tell you about the ${explainProject} project. Ahmed built this as a production-ready backend system. Feel free to ask for more details.`;
      stopSpeaking();
      stopListening();
      setMessages((prev) => [...prev, { sender: "user", text: `Tell me about ${explainProject}` }, { sender: "ai", text }]);
      setTimeout(() => {
        speakText(text);
      }, 400);
      onExplainProjectDone?.();
    }
  }, [explainProject]);

  const itemExplanations: Record<string, string> = {
    "financial analytics": "At H2M, Ahmed built the MAXP Business and Financial Analytics tools. He developed product pricing calculators that factor in shipping costs, profit margins, and market positioning. He also built marketing campaign tracking dashboards that monitor campaign performance, shipping analytics that track delivery costs and timelines, and customer performance analytics that help the business understand customer behavior patterns. All of these tools were built with Python backend systems and connected to the MAXP Online platform's database.",
    "whatsapp api": "Ahmed worked extensively with the Meta WhatsApp Cloud API at H2M. He built webhook handlers that receive incoming customer messages, implemented message template systems for automated responses, and created customer conversation workflows that route messages to the right department. He also built scheduled marketing campaign dispatches that send bulk messages through the WhatsApp API, and integrated the whole system with the backend's business logic layer. The architecture pattern was: Webhook → Backend → Business Logic → WhatsApp API.",
    "backend engineering": "Ahmed's backend engineering skills focus on building asynchronous REST APIs with Python and FastAPI. He uses Pydantic for input validation and data modeling, and designs clean API endpoints with proper error handling. He builds APIs that handle real business logic — not just CRUD operations — with background task processing, database integration, and external API connections.",
    "databases & queues": "Ahmed designs relational database schemas using PostgreSQL and SQLAlchemy ORM. He models complex relationships between entities, writes efficient queries, and uses Redis RQ for background job processing. He understands when to use database transactions, how to design for data consistency, and how to offload long-running tasks to background workers.",
    "integrations & automation": "Ahmed connects backend systems to external services. He's worked with the Meta WhatsApp Cloud API for message automation, SMTP for email dispatches, and webhooks for real-time event handling. He builds automation workflows that run in the background without blocking API responses.",
    "ai & vector retrieval": "Ahmed builds AI-powered systems using RAG (Retrieval Augmented Generation). He uses ChromaDB for vector storage, Sentence Transformers for creating embeddings, and implements semantic search over document collections. He understands text chunking strategies, embedding dimensions, and how to retrieve the most relevant content for AI-generated answers.",
    "computer science core": "Ahmed applies solid computer science principles through his university coursework and C++ problem solving. He understands data structures like arrays, linked lists, trees, and graphs. He knows algorithms for sorting, searching, and optimization. He practices object-oriented programming and clean code principles.",
    "tools & devops": "Ahmed uses Git for version control, Docker for containerizing services, Linux for server management, and Pytest for testing. He writes automated tests, uses Docker Compose for multi-service development environments, and follows CI/CD best practices.",
    "education": "Ahmed is pursuing a B.Sc. in Computer Science at the Egyptian Chinese University in Cairo. He's currently enrolled and expects to graduate in 2029. His relevant coursework includes Data Structures, Algorithms, Databases, Object-Oriented Programming, and Software Engineering. He applies what he learns in class to his real-world projects."
  };

  useEffect(() => {
    if (explainItem && explainItem !== lastExplainedRef.current) {
      lastExplainedRef.current = explainItem;
      const key = explainItem.toLowerCase();
      const text = itemExplanations[key] || `Let me tell you about ${explainItem}. This is one of Ahmed's key competencies that he applies across his projects.`;
      stopSpeaking();
      stopListening();
      setMessages((prev) => [...prev, { sender: "user", text: `Tell me about ${explainItem}` }, { sender: "ai", text }]);
      setTimeout(() => {
        speakText(text);
      }, 400);
      onExplainItemDone?.();
    }
  }, [explainItem]);

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  const localFallbackReply = (qText: string) => {
    const q = qText.toLowerCase().trim();

    if (q.includes("hello") || q.includes("hi ") || q === "hi" || q.includes("hey") || q.includes("welcome") || q.includes("good morning") || q.includes("good evening") || q.includes("good afternoon")) {
      return "Hello! Welcome to Ahmed's Portfolio. I'm his AI Assistant. You can ask me about Ahmed's experience at H2M, his projects, technical skills, education, certifications, or anything else you'd like to know.";
    }

    if (q.includes("well") || q.includes("how are you") || q.includes("how's it going") || q.includes("what's up") || q.includes("sup")) {
      return "I'm doing great, thanks for asking! I'm here to tell you about Ahmed's work. You can ask about his experience, projects, skills, education, or certifications.";
    }

    if (q.includes("certification") || q.includes("certificate") || q.includes("certifications") || q.includes("hackerrank") || q.includes("certificate")) {
      return "Ahmed has 9 HackerRank certifications: 1. Python Basic. 2. SQL Basic. 3. SQL Intermediate. 4. SQL Advanced. 5. REST API Intermediate. 6. Problem Solving Basic. 7. Problem Solving Intermediate. 8. Software Engineer. 9. Software Engineer Intern. These certifications validate his skills in Python, SQL, API design, problem solving, and software engineering.";
    }

    if (q.includes("h2m") || q.includes("maxp") || q.includes("max p") || q.includes("financial") || q.includes("work experience") || q.includes("where did he work") || q.includes("work at") || q.includes("job at")) {
      return "At H2M for MAXP Online, Ahmed worked on-site for 3 months as a Python Backend Developer. He solved the problem of manual financial tracking and campaign marketing dispatches. He built product financial calculation tools for profit margins and shipping costs, developed marketing campaign tracking and shipping analytics, and implemented Meta WhatsApp Cloud API automated marketing dispatches with webhooks and message templates.";
    }

    if (q.includes("customer support") || q.includes("whatsapp") || q.includes("meta cloud") || q.includes("ticket") || q.includes("project 1") || q.includes("first project") || q.includes("ai support")) {
      return "The AI Customer Support Platform is a backend system built with FastAPI for ticket management and WhatsApp automation. Ahmed built REST APIs, integrated Meta WhatsApp Cloud API webhooks, and implemented Redis RQ background workers for message classification and automated AI response generation. The system classifies messages by intent (billing, technical, general) and generates draft responses asynchronously.";
    }

    if (q.includes("rag") || q.includes("vector") || q.includes("chromadb") || q.includes("sentence transformer") || q.includes("embedding") || q.includes("chunking") || q.includes("project 2") || q.includes("second project")) {
      return "The Enterprise RAG Knowledge Assistant is a document-based semantic search backend. Ahmed implemented document ingestion for PDF, DOCX, and TXT files, recursive text chunking with overlapping windows, Sentence Transformers embeddings, ChromaDB vector indexing, and source-referenced question answering.";
    }

    if (q.includes("document intelligence") || q.includes("pdf parsing") || q.includes("ocr") || q.includes("extraction") || q.includes("upload") || q.includes("project 3") || q.includes("third project")) {
      return "The AI Document Intelligence Platform handles long-running document workloads. Ahmed designed multipart PDF and DOCX upload validation APIs and offloaded structured data extraction to Redis RQ background workers with processing status tracking and retry mechanisms.";
    }

    if (q.includes("medical event") || q.includes("smtp") || q.includes("email automation") || q.includes("event management") || q.includes("registration") || q.includes("project 4") || q.includes("fourth project")) {
      return "The Medical Event Automation Platform manages event registrations and attendee workflows. Ahmed modeled relational database schemas with PostgreSQL and SQLAlchemy, and automated background email dispatches via Redis RQ queues and SMTP integration.";
    }

    if (q.includes("ai lead") || q.includes("crm") || q.includes("qualification") || q.includes("scoring") || q.includes("groq") || q.includes("project 5") || q.includes("fifth project")) {
      return "The AI Lead Qualification and CRM Automation classifies inbound leads using Groq LLM with a deterministic fallback. Ahmed built a FastAPI backend with Celery and Redis async CRM sync, exponential backoff retries, and a full PostgreSQL audit trail.";
    }

    if (q.includes("project") || q.includes("projects") || q.includes("built") || q.includes("portfolio") || q.includes("repos") || q.includes("systems")) {
      return "Ahmed engineered 5 production-ready backend systems: 1. AI Customer Support Platform with WhatsApp API integration. 2. Enterprise RAG Knowledge Assistant with ChromaDB vector search. 3. AI Document Intelligence Platform with async PDF parsing. 4. Medical Event Automation Platform with SMTP email dispatches. 5. AI Lead Qualification with Groq LLM and Celery. Which one would you like to explore?";
    }

    if (q.includes("ecu") || q.includes("university") || q.includes("degree") || q.includes("college") || q.includes("graduation") || q.includes("school")) {
      return "Ahmed is studying Computer Science at the Egyptian Chinese University (ECU) in Cairo, expected to graduate in 2029. Relevant coursework includes Data Structures, Algorithms, Databases, Object-Oriented Programming, and Software Engineering.";
    }

    if (q.includes("core tech") || q.includes("tech stack") || q.includes("technical stack") || q.includes("what can he do") || q.includes("what are his skills")) {
      return "Ahmed's Technical Stack spans 6 core categories: 1. Backend Engineering with Python, FastAPI, and C++. 2. Databases and Queues with PostgreSQL, SQLAlchemy, and Redis RQ. 3. Integrations with WhatsApp API and SMTP. 4. AI and Vector Retrieval with RAG and ChromaDB. 5. Computer Science Core with Data Structures and OOP. 6. Tools with Docker, Pytest, Git, and Linux.";
    }

    if (q.includes("back-end") || q.includes("backend") || q.includes("python") || q.includes("fastapi")) {
      return "Ahmed specializes in Python and FastAPI for high-performance async REST APIs, Pydantic for strict schema validation, webhooks processing, and C++ for algorithmic problem solving.";
    }

    if (q.includes("database") || q.includes("databases") || q.includes("queues") || q.includes("postgres") || q.includes("sqlalchemy") || q.includes("redis")) {
      return "Ahmed designs relational database schemas with PostgreSQL and SQLAlchemy ORM, uses SQLite for rapid prototyping, and offloads heavy async background tasks to Redis and RQ (Redis Queue).";
    }

    if (q.includes("integration") || q.includes("automation") || q.includes("webhook")) {
      return "Ahmed integrates Meta WhatsApp Cloud API webhooks for automated customer messaging and SMTP integration for automated background email dispatches.";
    }

    if (q.includes("ai project") || q.includes("ai system") || q.includes("ai work") || q.includes("ai automation") || q.includes("machine learning") || q.includes("nlp") || q.includes("natural language")) {
      return "Ahmed builds AI-powered systems including RAG pipelines with ChromaDB and Sentence Transformers for semantic search, lead classification with Groq LLM, and document intelligence with structured data extraction. His AI projects focus on practical backend integration rather than just model training.";
    }

    if (q.includes("data structure") || q.includes("algorithm") || q.includes("oop") || q.includes("computer science")) {
      return "Ahmed applies solid computer science principles including OOP, clean code architecture, and competitive algorithmic problem solving in C++. He is studying Computer Science at ECU.";
    }

    if (q.includes("docker") || q.includes("pytest") || q.includes("linux") || q.includes("git") || q.includes("tool") || q.includes("devops")) {
      return "Ahmed containerizes backend services with Docker, writes automated backend test suites with Pytest, manages version control with Git and GitHub, and works natively in Linux environments.";
    }

    if (q.includes("hobby") || q.includes("hobbies") || q.includes("interest") || q.includes("free time") || q.includes("passion") || q.includes("outside") || q.includes("fun")) {
      return "Outside of coding, Ahmed enjoys exploring how systems work, experimenting with AI tools, and practicing algorithmic problem solving. He is curious about cybersecurity and how AI can make systems smarter and safer.";
    }

    if (q.includes("strength") || q.includes("weakness") || q.includes("why hire") || q.includes("good at")) {
      return "Ahmed's main strengths are designing clean asynchronous REST APIs with FastAPI, engineering reliable Redis background worker queues, and building AI-powered systems. He is a quick learner who cares about understanding how systems actually work.";
    }

    if (q.includes("looking for") || q.includes("opportunity") || q.includes("role") || q.includes("team") || q.includes("grow") || q.includes("career")) {
      return "Ahmed is looking for a team where he can contribute to real backend and automation problems, keep growing as an engineer, and build systems that actually get used.";
    }

    if (q.includes("approach") || q.includes("mindset") || q.includes("philosophy") || q.includes("how do you work") || q.includes("how does he work")) {
      return "Ahmed's approach: 1. Build from the problem. 2. Keep systems practical. 3. Design for change — separate services so systems can evolve without rewriting everything.";
    }

    if (q.includes("email") || q.includes("contact") || q.includes("reach") || q.includes("hire") || q.includes("gmail")) {
      return "You can reach Ahmed via email at ahmeeedmohaaamed1@gmail.com, on LinkedIn at linkedin.com/in/ahmed-mohamed-b69920435, or on GitHub at github.com/ahmed-abdelatif.";
    }

    if (q.includes("military") || q.includes("army") || q.includes("service")) {
      return "Ahmed's military service is officially postponed for study. He is focusing on his Computer Science degree and building his backend engineering portfolio.";
    }

    if (q.includes("thank") || q.includes("thanks") || q.includes("bye") || q.includes("goodbye")) {
      return "You're welcome! If you have any more questions about Ahmed's work, feel free to ask. Have a great day!";
    }

    if (q.includes("rag") || q.includes("vector") || q.includes("chromadb") || q.includes("embedding") || q.includes("semantic")) {
      return "Ahmed builds RAG (Retrieval Augmented Generation) systems using ChromaDB for vector storage and Sentence Transformers for creating embeddings. He implements semantic search over document collections with source citations.";
    }

    if (q.includes("full name") || q.includes("who is ahmed") || q.includes("nationality") || q.includes("egyptian") || q.includes("bio") || q.includes("personal") || q.includes("academic") || q.includes("student") || q.includes("about ahmed")) {
      return "Ahmed Mohamed Abdelatif is an Egyptian Python Backend Developer and AI Automation Specialist based in Cairo. He is currently pursuing his B.Sc. in Computer Science at the Egyptian Chinese University (ECU) with expected graduation in 2029. He has 3 months of hands-on experience at H2M working on MAXP Online platform, and has engineered 5 production-ready backend systems. His military service is officially postponed for study.";
    }

    if (q.includes("tell me about yourself") || q.includes("who are you") || q.includes("introduce") || q.includes("tell me about you")) {
      return "I'm Ahmed's AI Assistant. Ahmed is a Python Backend Developer and AI Automation Specialist. He's a CS student at ECU with 3 months of experience at H2M. He's built 5 production-ready backend systems. Ask me about his experience, projects, skills, education, or certifications!";
    }

    if (q.includes("tell me about") || q.includes("what about") || q.includes("details of")) {
      return "I can tell you about Ahmed's experience at H2M, his 5 backend projects, his technical skills, his education at ECU, or his 9 HackerRank certifications. What interests you?";
    }

    return "Feel free to ask about Ahmed's projects, skills, experience, education, certifications, or anything else you'd like to know!";
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
              onClick={async () => {
                if (isListening) {
                  stopListening();
                } else {
                  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    try {
                      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                      stream.getTracks().forEach(t => t.stop());
                    } catch (e) {
                      console.warn("Mic permission denied:", e);
                      return;
                    }
                  }
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
