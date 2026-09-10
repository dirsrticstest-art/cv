from fpdf import FPDF

class CV(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 22)
        self.set_text_color(30, 30, 30)
        self.cell(0, 12, "Ahmed Mohamed Abdelatif", new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "", 11)
        self.set_text_color(100, 60, 180)
        self.cell(0, 7, "Python Backend Developer & AI Automation Specialist", new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "", 9)
        self.set_text_color(80, 80, 80)
        self.cell(0, 6, "Cairo, Egypt  |  ahmeeedmohaaamed1@gmail.com  |  github.com/ahmed-abdelatif  |  linkedin.com/in/ahmed-abdelatif", new_x="LMARGIN", new_y="NEXT", align="C")
        self.ln(4)
        self.set_draw_color(100, 60, 180)
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(6)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def section_title(self, title):
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(100, 60, 180)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(100, 60, 180)
        self.set_line_width(0.3)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(3)

    def body_text(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(50, 50, 50)
        x = self.get_x()
        self.cell(5, 5.5, "-")
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def subsection(self, title, subtitle="", details=""):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(30, 30, 30)
        self.cell(0, 6, title, new_x="LMARGIN", new_y="NEXT")
        if subtitle:
            self.set_font("Helvetica", "I", 10)
            self.set_text_color(100, 60, 180)
            self.cell(0, 5.5, subtitle, new_x="LMARGIN", new_y="NEXT")
        if details:
            self.set_font("Helvetica", "", 9)
            self.set_text_color(120, 120, 120)
            self.cell(0, 5, details, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def tag_line(self, tags):
        self.set_font("Helvetica", "", 9)
        self.set_text_color(80, 80, 80)
        self.cell(0, 5, "Technologies: " + " | ".join(tags), new_x="LMARGIN", new_y="NEXT")
        self.ln(2)


pdf = CV()
pdf.set_auto_page_break(auto=True, margin=20)
pdf.add_page()

# Personal Profile
pdf.section_title("Personal Profile")
pdf.body_text(
    "Ahmed Mohamed Abdelatif is an Egyptian Python Backend Developer & AI Automation Specialist "
    "based in Cairo. Currently pursuing B.Sc. in Computer Science at the Egyptian Chinese University (ECU) "
    "with expected graduation in 2029. Military service status is officially postponed for study."
)

# Work Experience
pdf.section_title("Work Experience")
pdf.subsection(
    "Backend Developer - H2M (MAXP Online Platform)",
    "Full-time  |  On-site  |  Cairo, Egypt  |  3 Months",
    ""
)
pdf.body_text("Built and maintained backend tools and customer messaging workflows for MAXP Online:")
pdf.bullet("Built product pricing and profitability calculation tools.")
pdf.bullet("Developed marketing campaign tracking and shipping analytics.")
pdf.bullet("Built customer performance analytics tools.")
pdf.bullet("Built WhatsApp workflows using webhooks and message templates.")
pdf.bullet("Implemented automated replies and customer conversation workflows.")
pdf.bullet("Worked on scheduled marketing campaigns and Meta WhatsApp Cloud API integrations.")
pdf.ln(2)

# Projects
pdf.section_title("Engineered Projects")

projects = [
    {
        "title": "AI Customer Support Platform",
        "desc": "Backend system for customer support and WhatsApp automation featuring ticket management, AI message classification, and automated response generation.",
        "bullets": [
            "Built FastAPI REST APIs for customers, tickets, conversations, and messages.",
            "Implemented WhatsApp webhook handling and Meta WhatsApp Cloud API integration.",
            "Added Redis/RQ background jobs for asynchronous message and AI processing.",
            "Built an AI service layer for message classification and response generation.",
            "Implemented PostgreSQL persistence and background job status tracking.",
        ],
        "tech": ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "Docker", "Pytest"],
    },
    {
        "title": "Enterprise RAG Knowledge Assistant",
        "desc": "Document-based knowledge assistant backend performing document ingestion, text chunking, embedding generation, ChromaDB vector storage, and semantic retrieval.",
        "bullets": [
            "Built document ingestion for PDF, DOCX, and TXT files.",
            "Implemented text extraction, chunking, and overlapping document segments.",
            "Generated semantic embeddings using Sentence Transformers.",
            "Stored and searched document vectors using ChromaDB.",
            "Built a RAG retrieval pipeline with source references.",
        ],
        "tech": ["Python", "FastAPI", "PostgreSQL", "Redis", "RQ", "ChromaDB", "Sentence Transformers", "Docker"],
    },
    {
        "title": "AI Document Intelligence Platform",
        "desc": "Async document processing pipeline for uploading documents, extracting content, and executing long-running processing tasks using background workers.",
        "bullets": [
            "Built PDF, DOCX, and TXT document upload and validation APIs.",
            "Implemented document storage and text extraction.",
            "Added Redis/RQ background processing for long-running document jobs.",
            "Added processing status tracking and failed-job retry handling.",
        ],
        "tech": ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "Docker", "Pytest"],
    },
    {
        "title": "Medical Event Automation Platform",
        "desc": "Backend system for managing event-related data, attendee registrations, and automating communication workflows via background email dispatches.",
        "bullets": [
            "Built FastAPI APIs for event-related data and registration workflows.",
            "Implemented relational database models using PostgreSQL and SQLAlchemy.",
            "Added Redis/RQ background jobs for automated email notifications.",
            "Integrated SMTP for email delivery with retry handling.",
        ],
        "tech": ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Redis", "RQ", "SMTP", "Docker", "Pytest"],
    },
]

for proj in projects:
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 6, proj["title"], new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(0, 5, proj["desc"])
    pdf.ln(1)
    for b in proj["bullets"]:
        pdf.bullet(b)
    pdf.tag_line(proj["tech"])

# Technical Skills
pdf.section_title("Technical Skills")

skills = [
    ("Backend Engineering", "Python, FastAPI, REST APIs, Webhooks, Pydantic, C++"),
    ("Databases & Queues", "PostgreSQL, SQLite, SQLAlchemy, Redis, RQ (Redis Queue)"),
    ("Integrations & Automation", "Meta WhatsApp Cloud API, SMTP, Third-party APIs"),
    ("AI & Vector Retrieval", "RAG Pipelines, ChromaDB, Sentence Transformers, Embeddings"),
    ("Computer Science Core", "Data Structures, Algorithms, OOP, Clean Code & Logging"),
    ("Tools & Testing", "Git, GitHub, Docker, Linux, Pytest"),
    ("Languages", "Arabic (Native), English (Professional Working Proficiency)"),
]

for cat, items in skills:
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(100, 60, 180)
    pdf.cell(50, 5.5, cat + ":")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(50, 50, 50)
    pdf.multi_cell(0, 5.5, items)
    pdf.ln(1)

# Education
pdf.ln(3)
pdf.section_title("Education")
pdf.subsection(
    "B.Sc. Computer Science",
    "Egyptian Chinese University (ECU) - Cairo, Egypt",
    "Expected Graduation: 2029  |  Military Service: Postponed for Study"
)

# Strengths
pdf.section_title("Key Strengths")
pdf.bullet("Designing clean asynchronous REST APIs with FastAPI and Pydantic validation.")
pdf.bullet("Engineering reliable Redis/RQ background worker queues for heavy task processing.")
pdf.bullet("Building end-to-end RAG vector search pipelines with ChromaDB.")
pdf.bullet("Integrating Meta WhatsApp Cloud API webhooks for automated messaging.")
pdf.bullet("Containerizing backend services with Docker and writing test suites with Pytest.")

output_path = r"D:\CV\public\Ahmed_Abdelatif_CV.pdf"
pdf.output(output_path)
print(f"CV PDF created at: {output_path}")
