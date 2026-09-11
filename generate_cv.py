"""
ATS-Friendly CV Generator
Reads from cv-data.json (single source of truth) and generates a clean PDF.
Run: python generate_cv.py
"""
import json
import os
from fpdf import FPDF

# Load data
script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, "cv-data.json"), "r", encoding="utf-8") as f:
    data = json.load(f)

def clean(text):
    """Replace Unicode chars not supported by Helvetica."""
    return text.replace("\u2014", "-").replace("\u2013", "-").replace("\u2018", "'").replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"')

class CV(FPDF):
    def header(self):
        p = data["personal"]
        self.set_font("Helvetica", "B", 22)
        self.set_text_color(30, 30, 30)
        self.cell(0, 12, clean(p["name"]), new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "", 11)
        self.set_text_color(100, 60, 180)
        self.cell(0, 7, clean(p["title"]), new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "", 9)
        self.set_text_color(80, 80, 80)
        self.cell(0, 6, clean(f"{p['location']}  |  {p['email']}  |  {p['github']}  |  {p['linkedin']}"), new_x="LMARGIN", new_y="NEXT", align="C")
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
        self.multi_cell(0, 5.5, clean(text))
        self.ln(2)

    def bullet(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(50, 50, 50)
        self.cell(5, 5.5, "-")
        self.multi_cell(0, 5.5, clean(text))
        self.ln(1)

    def subsection(self, title, subtitle="", details=""):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(30, 30, 30)
        self.cell(0, 6, clean(title), new_x="LMARGIN", new_y="NEXT")
        if subtitle:
            self.set_font("Helvetica", "I", 10)
            self.set_text_color(100, 60, 180)
            self.cell(0, 5.5, clean(subtitle), new_x="LMARGIN", new_y="NEXT")
        if details:
            self.set_font("Helvetica", "", 9)
            self.set_text_color(120, 120, 120)
            self.cell(0, 5, clean(details), new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def tag_line(self, tags):
        self.set_font("Helvetica", "", 9)
        self.set_text_color(80, 80, 80)
        self.cell(0, 5, clean("Technologies: " + " | ".join(tags)), new_x="LMARGIN", new_y="NEXT")
        self.ln(2)


pdf = CV()
pdf.set_auto_page_break(auto=True, margin=20)
pdf.add_page()

# Personal Profile
pdf.section_title("Personal Profile")
pdf.body_text(data["profile"])

# Work Experience
exp = data["experience"]
pdf.section_title("Work Experience")
pdf.subsection(clean(f"{exp['title']} - {exp['company']}"), clean(exp["type"]), "")
pdf.body_text(exp["description"])
for h in exp["highlights"]:
    pdf.bullet(h)
pdf.ln(2)

# Projects
pdf.section_title("Engineered Projects")
for proj in data["projects"]:
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 6, clean(proj["title"]), new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(0, 5, clean(proj["description"]))
    pdf.ln(1)
    for b in proj["bullets"]:
        pdf.bullet(b)
    pdf.tag_line(proj["tech"])

# Skills
pdf.section_title("Technical Skills")
for skill in data["skills"]:
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(100, 60, 180)
    pdf.cell(50, 5.5, clean(skill["category"] + ":"))
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(50, 50, 50)
    pdf.multi_cell(0, 5.5, clean(skill["items"]))
    pdf.ln(1)

# Languages
pdf.set_font("Helvetica", "B", 10)
pdf.set_text_color(100, 60, 180)
pdf.cell(50, 5.5, "Languages:")
pdf.set_font("Helvetica", "", 10)
pdf.set_text_color(50, 50, 50)
pdf.multi_cell(0, 5.5, clean(data["languages"]))
pdf.ln(3)

# Education
edu = data["education"]
pdf.section_title("Education")
pdf.subsection(clean(edu["degree"]), clean(edu["university"]), clean(edu["details"]))

# Certifications
pdf.section_title("Certifications")
for cert in data["certifications"]:
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 5.5, clean(f"{cert['name']} — {cert['issuer']}"), new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 5, clean(f"Issued: {cert['date']}  |  Credential ID: {cert['credentialId']}"), new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)

output_path = os.path.join(script_dir, "public", "Ahmed_Abdelatif_CV.pdf")
pdf.output(output_path)
print(f"CV PDF generated from cv-data.json -> {output_path}")
