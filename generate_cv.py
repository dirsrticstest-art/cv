"""
ATS-Friendly CV Generator V2 - 2 Pages Only
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
    return text.replace("\u2014", "-").replace("\u2013", "-").replace("\u2018", "'").replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"').replace("\u2192", "->")

class CV(FPDF):
    def header(self):
        p = data["personal"]
        self.set_font("Helvetica", "B", 20)
        self.set_text_color(30, 30, 30)
        self.cell(0, 10, clean(p["name"]), new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "", 10)
        self.set_text_color(100, 60, 180)
        self.cell(0, 6, clean(p["title"]), new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "", 8)
        self.set_text_color(80, 80, 80)
        self.cell(0, 5, clean(f"{p['location']}  |  {p['email']}  |  {p['github']}  |  {p['linkedin']}"), new_x="LMARGIN", new_y="NEXT", align="C")
        self.ln(2)
        self.set_draw_color(100, 60, 180)
        self.set_line_width(0.4)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "I", 7)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def section_title(self, title):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(100, 60, 180)
        self.cell(0, 6, title, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(100, 60, 180)
        self.set_line_width(0.2)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(2)

    def body_text(self, text, size=9):
        self.set_font("Helvetica", "", size)
        self.set_text_color(50, 50, 50)
        self.set_x(10)
        self.multi_cell(190, 4.5, clean(text))
        self.ln(1)

    def bullet(self, text, size=9):
        self.set_font("Helvetica", "", size)
        self.set_text_color(50, 50, 50)
        self.set_x(10)
        self.multi_cell(190, 4.5, clean(f"  - {text}"))

    def subsection(self, title, subtitle="", details=""):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(30, 30, 30)
        self.set_x(10)
        self.cell(190, 5, clean(title), new_x="LMARGIN", new_y="NEXT")
        if subtitle:
            self.set_font("Helvetica", "I", 9)
            self.set_text_color(100, 60, 180)
            self.set_x(10)
            self.cell(190, 4.5, clean(subtitle), new_x="LMARGIN", new_y="NEXT")
        if details:
            self.set_font("Helvetica", "", 8)
            self.set_text_color(120, 120, 120)
            self.set_x(10)
            self.cell(190, 4, clean(details), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def tag_line(self, tags):
        self.set_font("Helvetica", "", 8)
        self.set_text_color(80, 80, 80)
        self.set_x(10)
        self.cell(190, 4, clean("Tech: " + " | ".join(tags)), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)


pdf = CV()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# About (compact)
pdf.section_title("About")
pdf.body_text(data["about"], size=9)
pdf.ln(1)

# Work Experience
exp = data["experience"]
pdf.section_title("Work Experience")
pdf.subsection(clean(f"{exp['title']} - {exp['company']}"), clean(exp["type"]), "")
for h in exp["highlights"]:
    pdf.bullet(h, size=9)
if "workflow" in exp:
    pdf.ln(1)
    pdf.set_font("Helvetica", "I", 8)
    pdf.set_text_color(100, 60, 180)
    pdf.set_x(10)
    pdf.cell(190, 4, clean(f"Workflow: {exp['workflow']}"), new_x="LMARGIN", new_y="NEXT")
pdf.ln(2)

# Projects (compact - only title + 2 key bullets + tech)
pdf.section_title("Engineered Projects")
for proj in data["projects"]:
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(30, 30, 30)
    pdf.set_x(10)
    pdf.cell(190, 5, clean(proj["title"]), new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(80, 80, 80)
    pdf.set_x(10)
    pdf.multi_cell(190, 4, clean(proj["description"]))
    # Only top 2 bullets to save space
    for b in proj["bullets"][:2]:
        pdf.bullet(b, size=8)
    pdf.tag_line(proj["tech"])

# Skills (compact)
pdf.section_title("Technical Skills")
for skill in data["skills"]:
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_text_color(100, 60, 180)
    pdf.set_x(10)
    pdf.cell(45, 4.5, clean(skill["category"] + ":"))
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(50, 50, 50)
    pdf.cell(145, 4.5, clean(skill["items"]), new_x="LMARGIN", new_y="NEXT")
pdf.ln(1)

# Languages
pdf.set_font("Helvetica", "B", 9)
pdf.set_text_color(100, 60, 180)
pdf.set_x(10)
pdf.cell(25, 4.5, "Languages:")
pdf.set_font("Helvetica", "", 9)
pdf.set_text_color(50, 50, 50)
pdf.cell(0, 4.5, clean(data["languages"]), new_x="LMARGIN", new_y="NEXT")
pdf.ln(2)

# Education
edu = data["education"]
pdf.section_title("Education")
pdf.subsection(clean(edu["degree"]), clean(edu["university"]), clean(edu["details"]))
pdf.set_font("Helvetica", "", 8)
pdf.set_text_color(80, 80, 80)
pdf.set_x(10)
pdf.cell(190, 4, clean(f"Coursework: {edu['coursework']}"), new_x="LMARGIN", new_y="NEXT")
pdf.ln(2)

# Certifications (compact list)
pdf.section_title("Certifications (9 - HackerRank)")
pdf.set_font("Helvetica", "", 8)
pdf.set_text_color(50, 50, 50)
cert_names = [c['name'] for c in data["certifications"]]
# Write in rows of 3
for i in range(0, len(cert_names), 3):
    row = cert_names[i:i+3]
    pdf.set_x(10)
    pdf.cell(190, 4, " | ".join(row), new_x="LMARGIN", new_y="NEXT")
pdf.ln(2)

# Outside the Code (compact)
pdf.section_title("Outside the Code")
pdf.body_text(data["outsideTheCode"], size=8)

# What I'm Looking For (compact)
pdf.set_font("Helvetica", "I", 8)
pdf.set_text_color(80, 80, 80)
pdf.set_x(10)
pdf.multi_cell(190, 4, clean(data["lookingFor"]))

output_path = os.path.join(script_dir, "public", "Ahmed_Abdelatif_CV.pdf")
pdf.output(output_path)
print(f"CV PDF generated from cv-data.json -> {output_path}")
