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

export const aboutText = `Hi, I'm Ahmed. I'm a Computer Science student and Python Backend Developer who enjoys turning real business problems into simple, reliable systems.

I've worked on backend APIs, automation workflows, databases, messaging integrations, and AI-powered systems. I also have hands-on experience from my 3-month on-site role at H2M, where I worked on business tools and Meta WhatsApp Cloud API workflows.

I'm still early in my career, but I care a lot about understanding how systems actually work — not just making them run.`;

export const projects = [
  {
    id: "01",
    title: "AI Customer Support Platform",
    repoName: "AI_Customer_Support_Platform",
    tagline: "Customer support backend that classifies messages and generates responses",
    description: "Receives customer messages, classifies the request, stores the conversation, and generates a response through a replaceable AI service layer.",
    proof: "Handles incoming WhatsApp webhooks, classifies messages by intent (billing, technical, general), stores full conversation history, and generates draft responses — all asynchronously.",
    architecture: [
      "Customer → FastAPI → Classification → AI Service → Response → Database"
    ],
    whatIBuilt: [
      "REST API for customer conversations, tickets, and messages",
      "Message classification layer for intent detection",
      "PostgreSQL conversation storage with status tracking",
      "Redis/RQ background processing for async message handling",
      "AI service boundary for future LLM integration"
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "Docker", "Pytest"],
    github: "https://github.com/ahmed-abdelatif/AI_Customer_Support_Platform",
    liveDemo: null
  },
  {
    id: "02",
    title: "Enterprise RAG Knowledge Assistant",
    repoName: "Enterprise_RAG_Knowledge_Assistant",
    tagline: "Document-based AI assistant that answers questions using retrieved content",
    description: "A document-based AI assistant that answers questions using retrieved content instead of relying only on the model's memory.",
    proof: "Ingests PDF/DOCX/TXT files, chunks text with overlapping windows, generates embeddings via Sentence Transformers, indexes in ChromaDB, and returns source-cited answers.",
    architecture: [
      "Document → Ingestion → Chunking → Embeddings → ChromaDB → Retrieval → Answer"
    ],
    whatIBuilt: [
      "PDF/DOCX/TXT ingestion with format-specific parsers",
      "Text chunking with overlapping windows for context preservation",
      "ChromaDB semantic vector storage and retrieval",
      "Source-aware response generation with file citations",
      "Async document processing via Redis/RQ"
    ],
    builtWith: ["Python", "FastAPI", "ChromaDB", "Sentence Transformers", "PostgreSQL", "Redis/RQ"],
    github: "https://github.com/ahmed-abdelatif/Enterprise_RAG_Knowledge_Assistant",
    liveDemo: null
  },
  {
    id: "03",
    title: "AI Document Intelligence Platform",
    repoName: "AI_Document_Intelligence_Platform",
    tagline: "Async document processing and structured data extraction pipeline",
    description: "Backend pipeline for uploading documents, extracting content, and processing structured information asynchronously using background workers.",
    proof: "Handles concurrent document uploads, processes them in parallel Redis/RQ workers, tracks status (queued → processing → completed/failed), and retries failures with exponential backoff.",
    architecture: [
      "Upload → Validation → Job Queue → Background Worker → Extraction → Status Tracking"
    ],
    whatIBuilt: [
      "Document upload and validation APIs (PDF/DOCX/TXT)",
      "Text extraction and structured data processing",
      "Redis/RQ background processing for long-running jobs",
      "Processing status tracking with real-time updates",
      "Auto-retry with exponential backoff for failed jobs",
      "Modular extraction layer for plugging in AI/OCR services"
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "Docker", "Pytest"],
    github: "https://github.com/ahmed-abdelatif/AI_Document_Intelligence_Platform",
    liveDemo: null
  },
  {
    id: "04",
    title: "Medical Event Automation Platform",
    repoName: "Medical_Event_Automation_Platform",
    tagline: "Event management and automated email notification system",
    description: "Backend system for managing event registrations and automating email communication workflows via background queues.",
    proof: "Manages attendee registrations, sends automated confirmation and reminder emails via SMTP through Redis/RQ queues, with delivery status tracking and retry logic for failed dispatches.",
    architecture: [
      "Registration → PostgreSQL → Email Queue → Redis/RQ → SMTP → Status Tracking"
    ],
    whatIBuilt: [
      "Event and registration management APIs",
      "PostgreSQL relational models for events and attendees",
      "Redis/RQ background email dispatch via SMTP",
      "Bulk sending with rate limiting and retry logic",
      "Delivery status tracking for each email"
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "SMTP", "Docker"],
    github: "https://github.com/ahmed-abdelatif/Medical_Event_Automation_Platform",
    liveDemo: null
  },
  {
    id: "05",
    title: "AI Lead Qualification & CRM Automation",
    repoName: "AI_Lead_Qualification_Professional",
    tagline: "AI-powered lead scoring with async CRM webhook sync",
    description: "Receives inbound leads, uses an LLM to classify and score them, and asynchronously syncs qualified leads to an external CRM.",
    proof: "Classifies leads into sales, support, partnership, or general categories with confidence scores. Maintains a full audit trail, handles CRM sync failures with exponential backoff retries, and stays operational when AI is unavailable via deterministic fallback.",
    architecture: [
      "Lead → FastAPI → AI Classification → PostgreSQL → Celery Worker → CRM Webhook"
    ],
    whatIBuilt: [
      "REST API for lead creation, listing, and retrieval",
      "Pydantic request validation with email verification",
      "AI service layer with Groq LLM and deterministic fallback",
      "Structured output validation (category, score, priority)",
      "PostgreSQL persistence with indexed audit trail",
      "Celery/Redis async CRM sync with exponential backoff",
      "Docker Compose stack (PostgreSQL, Redis, API, Worker)"
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
    skills: ["Python", "FastAPI", "REST APIs", "Pydantic", "C++"],
    description: "Building asynchronous REST APIs with input validation, business logic, and clean data models."
  },
  {
    category: "Databases & Queues",
    icon: Database,
    skills: ["PostgreSQL", "SQLAlchemy", "Redis", "RQ"],
    description: "Designing relational schemas, ORM models, and offloading tasks to background queues."
  },
  {
    category: "Integrations & Automation",
    icon: Layers,
    skills: ["Meta WhatsApp Cloud API", "SMTP", "Webhooks"],
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
    skills: ["Data Structures", "Algorithms", "OOP", "Clean Code"],
    description: "Applying solid CS principles through coursework and C++ problem solving."
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

export const whatILookingFor = `I'm looking for a team where I can work on real backend and automation problems, learn from experienced engineers, and keep building systems that actually get used.`;

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
