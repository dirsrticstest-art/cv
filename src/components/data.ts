import {
  Server,
  Database,
  Layers,
  Shield,
  Workflow,
  Wrench,
  Languages as LanguagesIcon,
  Zap,
  Target
} from "lucide-react";

export const projects = [
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
      result: "The system processes incoming messages asynchronously using Redis/RQ background workers, classifies them using AI, and generates draft responses. Background job retry logic ensures no message loss even under high load."
    },
    metrics: [
      { label: "Async Workers", value: "Redis/RQ" },
      { label: "API Endpoints", value: "12+" },
      { label: "Zero Message Loss", value: "Guaranteed" }
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
      result: "The system handles large documents, chunks them into segments with overlapping windows to preserve context, and returns relevant answers with source file citations. Redis/RQ handles background indexing for large uploads."
    },
    metrics: [
      { label: "Document Formats", value: "PDF/DOCX/TXT" },
      { label: "Vector DB", value: "ChromaDB" },
      { label: "Source Citations", value: "Yes" }
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
      result: "The system handles concurrent document uploads, processes them in parallel Redis/RQ background workers, and provides real-time status tracking. Failed jobs retry automatically with exponential backoff."
    },
    metrics: [
      { label: "Concurrent Jobs", value: "Parallel" },
      { label: "API Response", value: "Fast" },
      { label: "Retry Logic", value: "Auto" }
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
      result: "The platform handles attendee registrations, sends automated emails via background Redis/RQ queues, and maintains delivery status tracking with automatic retries for failed dispatches."
    },
    metrics: [
      { label: "Email Queue", value: "Redis/RQ" },
      { label: "Delivery", value: "SMTP" },
      { label: "Status Tracking", value: "Yes" }
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

export const skillCategories = [
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

export const personalDetails = [
  { label: "Full Name", value: "Ahmed Mohamed Abdelatif" },
  { label: "Nationality", value: "Egyptian (مصري)" },
  { label: "Degree & Specialization", value: "B.Sc. Computer Science (Graduation 2029)" },
  { label: "University", value: "Egyptian Chinese University (ECU) — Cairo, Egypt" },
  { label: "Current Location", value: "Cairo, Egypt" },
  { label: "Military Service Status", value: "Postponed / Student Status (مؤجل للدراسة)" },
  { label: "Primary Discipline", value: "Python Backend Developer & AI Automation" }
];

export const valuePropositions = [
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

export const personalHobbies = [
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

export const quickQuestions = [
  { label: "💡 Tell me about yourself", query: "Tell me about yourself and your background" },
  { label: "🛠️ Core Tech Stack", query: "What is your technical stack and skills?" },
  { label: "💼 H2M Work Experience", query: "Tell me about your experience at H2M" },
  { label: "🚀 4 Engineered Systems", query: "What projects have you built?" },
  { label: "🎓 Education & Military Status", query: "Tell me about your education at ECU" },
  { label: "📬 Contact & Gmail", query: "How can I contact Ahmed?" }
];
