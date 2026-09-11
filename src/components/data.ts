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
    tagline: "Conversational AI backend that triages and responds to customer inquiries via WhatsApp",
    description: "A message intake system that receives customer messages through WhatsApp webhooks, classifies intent, maintains full conversation context, and drafts AI-generated responses — turning raw inbound messages into structured support workflows.",
    proof: "Bridges the WhatsApp Cloud API webhook format into a typed internal message model, classifies incoming intent (billing, technical, general) to route conversations, and keeps a complete conversation history so context carries across messages — not just one-shot Q&A.",
    architecture: [
      "WhatsApp Webhook → FastAPI → Intent Classifier → Conversation Store → AI Draft → Reply"
    ],
    whatIBuilt: [
      "WhatsApp Cloud API webhook receiver with payload normalization",
      "Intent classification layer routing messages by category",
      "Conversation state management across multiple messages",
      "AI response drafting with replaceable model backend",
      "Message status pipeline from received to drafted to sent"
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "Docker", "Pytest"],
    github: "https://github.com/ahmed-abdelatif/AI_Customer_Support_Platform",
    liveDemo: null
  },
  {
    id: "02",
    title: "Enterprise RAG Knowledge Assistant",
    repoName: "Enterprise_RAG_Knowledge_Assistant",
    tagline: "Semantic search over document collections with source-cited retrieval",
    description: "A retrieval-augmented generation system that ingests PDFs, DOCX, and TXT files, converts them into vector embeddings, and answers questions by searching for semantically similar passages — then cites the exact source file in every response.",
    proof: "The core challenge is making retrieval actually useful: chunking strategy matters (overlapping windows preserve context across boundaries), embedding quality determines whether answers are relevant, and ChromaDB's similarity search has to surface the right passage from thousands of candidates. Each answer includes file-level citations so responses are verifiable.",
    architecture: [
      "Upload → Parser → Chunker → Sentence Transformers → ChromaDB → Similarity Search → LLM + Citations"
    ],
    whatIBuilt: [
      "Format-specific document parsers (PDF extraction, DOCX parsing, TXT reading)",
      "Overlapping-window text chunking to preserve context at section boundaries",
      "Sentence Transformers embedding pipeline with ChromaDB indexing",
      "Similarity-based retrieval that returns ranked passages with source metadata",
      "Response generation that cites the originating file and passage"
    ],
    builtWith: ["Python", "FastAPI", "ChromaDB", "Sentence Transformers", "PostgreSQL", "Redis/RQ"],
    github: "https://github.com/ahmed-abdelatif/Enterprise_RAG_Knowledge_Assistant",
    liveDemo: null
  },
  {
    id: "03",
    title: "AI Document Intelligence Platform",
    repoName: "AI_Document_Intelligence_Platform",
    tagline: "Background document processing pipeline with job orchestration",
    description: "An async extraction pipeline designed around the lifecycle of a long-running job: documents are uploaded, validated, queued, picked up by background workers, and their status is tracked from queued through processing to completion or failure — with automatic retry on transient errors.",
    proof: "The engineering challenge here isn't AI — it's job orchestration. Multiple concurrent uploads can't block the API, workers process documents in parallel, and the system has to handle partial failures gracefully. Exponential backoff retries failed extractions, and the status tracking surface gives visibility into pipeline health.",
    architecture: [
      "Upload API → Validation → Redis Queue → RQ Worker (parallel) → Status DB → Retry Logic"
    ],
    whatIBuilt: [
      "Document upload endpoint with format validation and size limits",
      "Redis/RQ job queue with worker pool for parallel extraction",
      "Status state machine: queued → processing → completed/failed",
      "Exponential backoff retry logic for transient worker failures",
      "Modular extraction service boundary for plugging in OCR or AI extractors",
      "Background job monitoring and failure tracking"
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "Docker", "Pytest"],
    github: "https://github.com/ahmed-abdelatif/AI_Document_Intelligence_Platform",
    liveDemo: null
  },
  {
    id: "04",
    title: "Medical Event Automation Platform",
    repoName: "Medical_Event_Automation_Platform",
    tagline: "Automated event registration and email notification workflows",
    description: "A notification automation backend for medical events: attendees register, the system queues and dispatches confirmation and reminder emails through SMTP, and tracks delivery status — ensuring no one misses an update due to a failed send.",
    proof: "The unique constraint here is reliability in notification delivery. Emails can't just fire-and-forget; each dispatch has a delivery status (sent, failed, retried), bulk sends are rate-limited to avoid SMTP throttling, and failed emails are retried automatically. This keeps the communication pipeline resilient even when individual sends fail.",
    architecture: [
      "Registration API → PostgreSQL → Email Job Queue → RQ Worker → SMTP Dispatch → Delivery Status"
    ],
    whatIBuilt: [
      "Event registration API with attendee management",
      "Relational data models linking events to registered attendees",
      "Background email job queue with SMTP dispatch workers",
      "Rate-limited bulk sending to respect SMTP provider limits",
      "Per-email delivery status tracking and failed-send retry",
      "Automated reminder scheduling for upcoming events"
    ],
    builtWith: ["Python", "FastAPI", "PostgreSQL", "Redis/RQ", "SMTP", "Docker"],
    github: "https://github.com/ahmed-abdelatif/Medical_Event_Automation_Platform",
    liveDemo: null
  },
  {
    id: "05",
    title: "AI Lead Qualification & CRM Automation",
    repoName: "AI_Lead_Qualification_Professional",
    tagline: "LLM-powered lead scoring with external CRM integration",
    description: "An intake system that accepts inbound leads, sends them to a Groq LLM for classification and confidence scoring, persists the results with a full audit trail, and asynchronously syncs qualified leads to an external CRM via webhook — with fallback logic when the AI service is unavailable.",
    proof: "The hard part is bridging an external LLM's output into a reliable business workflow. The system validates structured LLM responses (category, score, priority), handles the case where Groq is down by falling back to deterministic rules, and syncs to a third-party CRM without blocking the API. Every classification is logged for auditing.",
    architecture: [
      "Lead API → Pydantic Validation → Groq LLM → Structured Output Check → PostgreSQL → Celery → CRM Webhook"
    ],
    whatIBuilt: [
      "Lead intake API with Pydantic validation and email verification",
      "Groq LLM integration with structured output parsing and validation",
      "Deterministic fallback classifier when AI service is unavailable",
      "Celery worker for async CRM webhook sync with retry logic",
      "Indexed audit trail capturing every classification decision",
      "Docker Compose deployment (API, Worker, PostgreSQL, Redis)"
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
