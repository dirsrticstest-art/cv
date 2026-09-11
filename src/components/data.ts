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

export const aboutText = `Python Backend Developer and AI Automation Specialist with hands-on experience building REST APIs, automation workflows, and AI-powered systems using FastAPI, PostgreSQL, Redis, and Docker. Completed a 3-month on-site role at H2M, building Meta WhatsApp Cloud API integrations and product analytics tools. Pursuing B.Sc. in Computer Science at ECU (Expected 2029).`;

export const projects = [
  {
    id: "01",
    title: "AI Customer Support Platform",
    repoName: "AI_Customer_Support_Platform",
    tagline: "WhatsApp-integrated customer support backend with AI-powered message classification",
    description: "Backend system that receives customer messages via WhatsApp webhooks, classifies intent using an AI service layer, stores conversation history in PostgreSQL, and generates automated draft responses asynchronously.",
    proof: "Production system handling incoming WhatsApp webhooks, message classification by intent (billing, technical, general), full conversation state management, and AI-powered response generation — all decoupled via Redis/RQ background workers.",
    architecture: [
      "WhatsApp Webhook → FastAPI → Intent Classification → AI Service → PostgreSQL → Redis/RQ"
    ],
    whatIBuilt: [
      "Built REST APIs for customer conversations, tickets, and message management with Pydantic validation.",
      "Implemented intent detection layer classifying messages into billing, technical, and general categories.",
      "Designed PostgreSQL schema for conversation storage with status tracking and message history.",
      "Built Redis/RQ background workers for async message handling and AI response generation.",
      "Designed replaceable AI service boundary for seamless LLM provider integration."
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "Docker", "Pytest"],
    github: "https://github.com/ahmed-abdelatif/AI_Customer_Support_Platform",
    liveDemo: null
  },
  {
    id: "02",
    title: "Enterprise RAG Knowledge Assistant",
    repoName: "Enterprise_RAG_Knowledge_Assistant",
    tagline: "Document-based semantic search backend with source-cited AI responses",
    description: "Retrieval-Augmented Generation system that ingests PDF/DOCX/TXT documents, generates embeddings via Sentence Transformers, indexes in ChromaDB, and returns source-cited answers to user queries.",
    proof: "Full RAG pipeline handling document ingestion, recursive text chunking with overlapping windows, ChromaDB vector indexing, semantic similarity search, and source-referenced response generation with file citations.",
    architecture: [
      "Document Ingestion → Text Chunking → Sentence Transformers → ChromaDB → Semantic Retrieval → Cited Answer"
    ],
    whatIBuilt: [
      "Built document ingestion pipeline supporting PDF, DOCX, and TXT with format-specific parsers.",
      "Implemented recursive text chunking with overlapping windows for context preservation.",
      "Generated dense vector embeddings using Sentence Transformers and indexed in ChromaDB.",
      "Built semantic similarity search with source citation and file reference tracking.",
      "Designed async document processing pipeline via Redis/RQ for large knowledge bases."
    ],
    builtWith: ["Python", "FastAPI", "ChromaDB", "Sentence Transformers", "PostgreSQL", "Redis/RQ"],
    github: "https://github.com/ahmed-abdelatif/Enterprise_RAG_Knowledge_Assistant",
    liveDemo: null
  },
  {
    id: "03",
    title: "AI Document Intelligence Platform",
    repoName: "AI_Document_Intelligence_Platform",
    tagline: "Async document processing pipeline with parallel background workers",
    description: "Backend pipeline for concurrent document uploads, structured data extraction, and heavy processing workloads using Redis/RQ background workers with status tracking and retry logic.",
    proof: "Handles concurrent PDF/DOCX/TXT uploads, processes documents in parallel Redis/RQ workers, tracks job status (queued → processing → completed/failed), and retries failures with exponential backoff.",
    architecture: [
      "Upload → FastAPI Validation → Redis/RQ Job Queue → Parallel Workers → Extraction → Status Tracking"
    ],
    whatIBuilt: [
      "Built document upload and validation APIs supporting PDF, DOCX, and TXT formats.",
      "Implemented Redis/RQ background job processing for long-running document extraction tasks.",
      "Designed job status tracking system with real-time updates (queued → processing → completed/failed).",
      "Built auto-retry mechanism with exponential backoff for failed processing jobs.",
      "Designed modular extraction layer for plugging in AI/OCR services."
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "Docker", "Pytest"],
    github: "https://github.com/ahmed-abdelatif/AI_Document_Intelligence_Platform",
    liveDemo: null
  },
  {
    id: "04",
    title: "Medical Event Automation Platform",
    repoName: "Medical_Event_Automation_Platform",
    tagline: "Event registration backend with automated SMTP email notifications",
    description: "Backend system for managing medical event registrations, attendee workflows, and automated email communication via Redis/RQ background queues with SMTP integration.",
    proof: "Manages attendee registrations with PostgreSQL relational models, sends automated confirmation and reminder emails via SMTP through Redis/RQ queues, with per-email delivery status tracking and retry logic.",
    architecture: [
      "Registration API → PostgreSQL → Redis/RQ Email Queue → SMTP Dispatch → Delivery Status Tracking"
    ],
    whatIBuilt: [
      "Built REST APIs for event and attendee registration management with relational data models.",
      "Designed PostgreSQL schemas using SQLAlchemy for events, attendees, and registration workflows.",
      "Implemented Redis/RQ background email dispatch via SMTP with rate limiting.",
      "Built delivery status tracking for each email with retry logic for failed dispatches.",
      "Designed bulk email sending with queue management and rate limiting."
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "SMTP", "Docker"],
    github: "https://github.com/ahmed-abdelatif/Medical_Event_Automation_Platform",
    liveDemo: null
  },
  {
    id: "05",
    title: "AI Lead Qualification & CRM Automation",
    repoName: "AI_Lead_Qualification_Professional",
    tagline: "LLM-powered lead scoring with async CRM webhook synchronization",
    description: "Receives inbound leads via REST API, uses Groq LLM to classify and score them, maintains a full PostgreSQL audit trail, and asynchronously syncs qualified leads to an external CRM via Celery workers.",
    proof: "Classifies leads into sales, support, partnership, or general categories with confidence scores using Groq LLM. Maintains indexed audit trail, handles CRM sync failures with exponential backoff retries, and stays operational via deterministic fallback when AI is unavailable.",
    architecture: [
      "Lead Input → FastAPI → Groq LLM Classification → PostgreSQL Audit → Celery Worker → CRM Webhook"
    ],
    whatIBuilt: [
      "Built REST API for lead creation, listing, and retrieval with Pydantic email validation.",
      "Implemented AI service layer with Groq LLM for lead classification and structured output validation.",
      "Built deterministic fallback logic ensuring system availability when LLM is unavailable.",
      "Designed PostgreSQL persistence with indexed audit trail for compliance and debugging.",
      "Implemented Celery/Redis async CRM sync with exponential backoff retry mechanism.",
      "Containerized full stack with Docker Compose (PostgreSQL, Redis, API, Worker)."
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Celery", "Redis", "Groq LLM", "Docker"],
    github: "https://github.com/dirsrticstest-art/AI_Lead_Qualification_Professional",
    liveDemo: "https://cv-tawny-two.vercel.app/api"
  }
];

export const skillCategories = [
  {
    category: "Backend Engineering",
    icon: Server,
    skills: ["Python", "FastAPI", "REST APIs", "Pydantic"],
    description: "Building asynchronous REST APIs with input validation, business logic, and clean data models."
  },
  {
    category: "Databases & Queues",
    icon: Database,
    skills: ["PostgreSQL", "Redis", "RQ"],
    description: "Designing relational schemas and offloading tasks to background queues."
  },
  {
    category: "Integrations & Automation",
    icon: Layers,
    skills: ["Meta WhatsApp Cloud API", "SMTP", "Webhooks", "Celery", "Groq LLM"],
    description: "Connecting business logic to external messaging APIs and automating workflows."
  },
  {
    category: "AI & Vector Retrieval",
    icon: Workflow,
    skills: ["RAG", "ChromaDB", "Sentence Transformers", "Embeddings"],
    description: "Building document retrieval pipelines with semantic search and source citations."
  },
  {
    category: "Computer Science Core",
    icon: Shield,
    skills: ["Data Structures", "Algorithms", "OOP"],
    description: "Applying solid CS principles through coursework and problem solving."
  },
  {
    category: "Tools & DevOps",
    icon: Wrench,
    skills: ["Git", "Docker", "Linux", "Pytest"],
    description: "Containerizing services, writing tests, and managing version control."
  }
];

export const valuePropositions = [
  {
    icon: Zap,
    title: "Build from the problem",
    desc: "Understand what the system actually needs before choosing the implementation."
  },
  {
    icon: Workflow,
    title: "Keep systems practical",
    desc: "Prefer simple, maintainable solutions over unnecessary complexity."
  },
  {
    icon: Target,
    title: "Design for change",
    desc: "Separate services and integrations so systems can evolve without rewriting everything."
  }
];

export const personalHobbies = `I enjoy exploring how systems work, experimenting with AI tools, and practicing algorithms. I'm also curious about cybersecurity and how AI can make systems smarter and safer.`;

export const whatILookingFor = `I'm looking for a team where I can contribute to real backend and automation problems, keep growing as an engineer, and build systems that actually get used.`;

export const certifications = [
  {
    name: "Python (Basic)",
    issuer: "HackerRank",
    credentialId: "D208698872E9",
    url: "https://www.hackerrank.com/certificates/D208698872E9"
  },
  {
    name: "SQL (Basic)",
    issuer: "HackerRank",
    credentialId: "3S7BFB6AASRE",
    url: "https://www.hackerrank.com/certificates/3S7BFB6AASRE"
  },
  {
    name: "SQL (Intermediate)",
    issuer: "HackerRank",
    credentialId: "203B6A8EDA03",
    url: "https://www.hackerrank.com/certificates/203B6A8EDA03"
  },
  {
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    credentialId: "EBFE57B420AB",
    url: "https://www.hackerrank.com/certificates/EBFE57B420AB"
  },
  {
    name: "REST API (Intermediate)",
    issuer: "HackerRank",
    credentialId: "9FECDDDC70D8",
    url: "https://www.hackerrank.com/certificates/9FECDDDC70D8"
  },
  {
    name: "Problem Solving (Basic)",
    issuer: "HackerRank",
    credentialId: "01777F8125A7",
    url: "https://www.hackerrank.com/certificates/01777F8125A7"
  },
  {
    name: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    credentialId: "B937B75D7029",
    url: "https://www.hackerrank.com/certificates/B937B75D7029"
  },
  {
    name: "Software Engineer",
    issuer: "HackerRank",
    credentialId: "372DEB12F161",
    url: "https://www.hackerrank.com/certificates/372DEB12F161"
  },
  {
    name: "Software Engineer Intern",
    issuer: "HackerRank",
    credentialId: "3A8942024974",
    url: "https://www.hackerrank.com/certificates/3A8942024974"
  }
];

export const quickQuestions = [
  { label: "Tell me about yourself", query: "Tell me about yourself and your background" },
  { label: "Core Tech Stack", query: "What is your technical stack and skills?" },
  { label: "H2M Work Experience", query: "Tell me about your experience at H2M" },
  { label: "Projects", query: "What projects have you built?" },
  { label: "Education", query: "Tell me about your education at ECU" },
  { label: "Contact", query: "How can I contact Ahmed?" }
];
