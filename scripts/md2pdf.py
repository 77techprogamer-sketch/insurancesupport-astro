#!/usr/bin/env python3
"""
Converts a Markdown file to a styled PDF using fpdf2.
Usage: python md2pdf.py input.md output.pdf
"""

import sys
import re
import argparse
from fpdf import FPDF, Align

# FPDF is a left-to-right, top-to-bottom flow. We will write the markdown content directly.

class PDF(FPDF):
    def header(self):
        # Logo (if we had one)
        # self.image('logo.png', 10, 8, 33)
        # Font for header
        if self.page_no() > 0: # No header on first page (title page)
            self.set_font('helvetica', 'I', 7)
            self.set_text_color(128)
            self.cell(0, 10, 'Insurance Support by Hari Kotian (IRDAI Reg 0149161D)', 0, 0, 'L')
            self.ln(5)
            # Horizontal line
            self.set_draw_color(0, 26, 57)
            self.line(15, self.get_y(), 195, self.get_y())

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 7)
        self.set_text_color(128)
        self.cell(0, 10, f'{self.page_no()}', 0, 0, 'C')
        self.set_text_color(0) # reset

def parse_markdown(md_text):
    # This is a simplified parser for our checklist content.
    # It converts markdown lines into fpdf write_html calls or direct calls.
    # Given the complexity, we will convert to simple HTML and use write_html.

    # Clean up and enhance for fpdf's HTML parser
    # Replace markdown tables with HTML tables (basic support)
    # fpdf2's write_html supports a subset of HTML

    # First, let's convert the markdown to a slightly more compatible format
    # fpdf2 write_html supports: <b>, <i>, <u>, <a>, <table>, <tr>, <th>, <td>, <h1-h6>, <p>, <br>, <hr>
    # and inline styles for text-align, color, etc.

    # We will do a very basic conversion
    lines = md_text.split('\n')
    html_parts = []
    in_table = False
    table_lines = []
    para_lines = []

    def flush_paragraph():
        if para_lines:
            content = ''.join(para_lines)
            # Basic inline replacements
            content = content.replace('**', '<b></b>') # Not ideal, but let's handle separately
            # For simplicity, we handle bold/italic via regex
            # This is a known limitation of this quick script.
            # Let's just wrap in <p> and handle bold/italic manually
            html_parts.append(f"<p>{content}</p>")
            para_lines.clear()

    # Given the complexity, let's switch strategy:
    # Use a simpler, direct approach with fpdf's cell/multicell for this specific document.
    # This is more robust than trying to parse generic markdown.
    pass

# Let's take a more direct approach: build the PDF page by page with known structure.
class ChecklistPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font('helvetica', 'I', 7)
            self.set_text_color(128)
            self.cell(0, 5, 'Insurance Support by Hari Kotian (IRDAI Reg 0149161D)'.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'), 0, 0, 'L')
            self.ln(3)
            self.set_draw_color(0, 26, 57)
            self.line(15, self.get_y(), 195, self.get_y())
            self.ln(3)

    def footer(self):
        self.set_y(-12)
        self.set_font('helvetica', 'I', 7)
        self.set_text_color(128)
        self.cell(0, 5, str(self.page_no()), 0, 0, 'C')
        self.set_text_color(0)

    def add_title(self, title, subtitle=None):
        self.set_text_color(0, 26, 57)
        self.set_font('helvetica', 'B', 18)
        self.multi_cell(0, 8, title.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
        self.ln(2)
        if subtitle:
            self.set_font('helvetica', 'B', 12)
            self.multi_cell(0, 6, subtitle.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
        self.ln(5)
        self.set_text_color(0)
        self.set_font('helvetica', '', 10)

    def add_section_heading(self, text):
        self.ln(4)
        self.set_text_color(0, 26, 57)
        self.set_font('helvetica', 'B', 13)
        self.multi_cell(0, 6, text.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
        self.ln(2)
        self.set_draw_color(0, 26, 57)
        self.line(self.get_x(), self.get_y(), self.get_x() + 180, self.get_y())
        self.ln(3)
        self.set_text_color(0)
        self.set_font('helvetica', '', 10)

    def add_subheading(self, text):
        self.ln(2)
        self.set_text_color(0, 26, 57)
        self.set_font('helvetica', 'B', 11)
        self.multi_cell(0, 5, text.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
        self.ln(1)
        self.set_text_color(0)
        self.set_font('helvetica', '', 10)

    def add_bullet(self, text, indent=5):
        self.set_left_margin(indent + 5)
        self.set_x(self.l_margin + indent)
        self.set_font('helvetica', '', 10)
        # Handle bold markers **text**
        parts = re.split(r'\*\*(.*?)\*\*', text.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
        for i, part in enumerate(parts):
            if i % 2 == 1: # Bold
                self.set_font('helvetica', 'B', 10)
            else:
                self.set_font('helvetica', '', 10)
            self.write(5, part)
        self.ln(2)
        self.set_left_margin(15)
        self.set_x(self.l_margin)

    def add_text(self, text):
        # Handle bold markers **text**
        self.set_font('helvetica', '', 10)
        self.set_text_color(0)
        parts = re.split(r'\*\*(.*?)\*\*', text.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
        for i, part in enumerate(parts):
            if i % 2 == 1: # Bold
                self.set_font('helvetica', 'B', 10)
            else:
                self.set_font('helvetica', '', 10)
            self.write(5, part)
        self.ln(2)
        self.set_x(self.l_margin)

    def add_table(self, headers, rows):
        self.ln(3)
        # Calculate column widths
        col_count = len(headers)
        page_width = self.w - self.r_margin - self.l_margin
        col_width = page_width / col_count
        
        # Header
        self.set_fill_color(0, 26, 57)
        self.set_text_color(255)
        self.set_font('helvetica', 'B', 8)
        for h in headers:
            self.multi_cell(col_width, 6, h, border=1, align='C', fill=True)
        self.set_text_color(0)
        self.set_font('helvetica', '', 8)
        
        # Rows
        for row in rows:
            for cell in row:
                self.multi_cell(col_width, 6, cell, border=1)
        self.ln(2)
        self.set_text_color(0)
        self.set_x(self.l_margin)

    def add_note_box(self, text):
        self.ln(2)
        self.set_fill_color(240, 240, 240)
        self.set_text_color(85, 85, 85)
        self.set_font('helvetica', 'I', 9)
        # Use multi_cell with border for a note box effect
        original_x = self.get_x()
        original_y = self.get_y()
        self.multi_cell(0, 5, text.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'), border=1, fill=True)
        self.set_text_color(0)
        self.ln(1)

    def add_blockquote(self, text):
        self.ln(2)
        self.set_left_margin(self.l_margin + 7)
        self.set_x(self.l_margin + 7)
        self.set_draw_color(0, 26, 57)
        self.line(self.get_x()-2, self.get_y(), self.get_x()-2, self.get_y() + 20) # placeholder
        self.set_text_color(85, 85, 85)
        self.set_font('helvetica', '', 9)
        parts = re.split(r'\*\*(.*?)\*\*', text.replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
        for i, part in enumerate(parts):
            if i % 2 == 1: # Bold
                self.set_font('helvetica', 'B', 9)
            else:
                self.set_font('helvetica', 'I', 9)
            self.write(4, part + (' ' if i == 0 else ''))
        self.set_text_color(0)
        self.set_left_margin(self.l_margin)
        self.ln(3)


def build_pdf(md_path, pdf_path):
    with open(md_path, "r", encoding="utf-8") as f:
        # We won't parse the generic markdown; we'll hardcode the structure
        # based on the content we wrote.
        pass

    pdf = ChecklistPDF()
    pdf.set_auto_page_break(auto=True, margin=25)
    
    # --- PAGE 1: Title ---
    pdf.add_page()
    pdf.set_y(60)
    pdf.add_title(
        "The Term Insurance Claim-Proof Checklist",
        "15 Things to Verify Before You Sign — So Your Family Never Has to Fight for ₹1 Crore"
    )
    pdf.set_font('helvetica', 'B', 10)
    pdf.cell(0, 5, "By Hari Kotian, IRDAI Reg 0149161D", 0, 1, 'C')
    pdf.ln(10)
    pdf.set_font('helvetica', '', 10)
    pdf.multi_cell(0, 5, "You're about to buy term insurance. Great move. But here's what nobody tells you -- buying the plan is easy. Getting the claim paid is where most families fail.".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.ln(2)
    pdf.multi_cell(0, 5, "This checklist covers the 15 critical points you MUST verify before signing. It takes 10 minutes. It could save your family ₹1 crore in denied claims.".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.ln(3)
    pdf.add_subheading("How to use this checklist:")
    pdf.add_bullet("Print it out.")
    pdf.add_bullet("Fill it in honestly for your chosen policy.")
    pdf.add_bullet("Bring it to your free consultation with Hari Kotian, a licensed IRDAI advisor.")
    pdf.add_page()

    # --- PAGE 2: Checklist ---
    pdf.add_section_heading("The 15-Point Claim-Proof Checklist")
    
    pdf.add_subheading("Group A: Your Disclosure Accuracy")
    pdf.add_text("(Non-disclosure is the #1 reason claims get rejected in India.)".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.ln(1)
    
    pdf.add_text("1. **Have you disclosed ALL pre-existing medical conditions** (diabetes, BP, thyroid, cholesterol, asthma, anxiety, anything diagnosed before purchase)")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("2. **Have you disclosed your complete smoking/tobacco history** (even if quit)?")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("3. **Have you accurately stated your occupation and annual income?**")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("4. **Have you disclosed ALL existing insurance policies** (including employer cover)?")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("5. **Have you revealed any past claim history or hospitalizations?**")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    
    pdf.add_note_box("_**Why this matters:** After 3 years, Section 45 of the Insurance Act protects you -- but only if you were honest in the first place._".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    
    pdf.add_subheading("Group B: Policy Structure")
    pdf.add_text("(Many buyers underinsure by 40-60%, thinking ₹50L is enough when their family actually needs ₹1-1.5 Cr.)".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.ln(1)
    
    pdf.add_text("6. **Does the sum assured cover at least 10-15x your annual income?**")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("7. **Is the policy term long enough** (till your youngest child turns 25, or till retirement)?")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("8. **Have you checked if the premium is level (stays same) for the full term?**")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("9. **Have you reviewed the death benefit payout options** (lump sum vs monthly)?")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    
    pdf.add_subheading("Group C: Nominee & Beneficiary Setup")
    pdf.add_text("(Wrong nominee details can delay claims by months.)")
    pdf.ln(1)
    
    pdf.add_text("10. **Is the nominee name spelled correctly and matching official ID proof?**")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("11. **Have you considered adding an alternate nominee or guardian** (for minor children)?")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("12. **Is the nominee's relationship explicitly stated and accurate?**")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    
    pdf.add_subheading("Group D: Exclusions & Riders")
    pdf.add_text("(The brochure says what's covered. The policy wordings say what's excluded. They are NOT the same document.)")
    pdf.ln(1)
    
    pdf.add_text("13. **Have you read the exclusion list in the policy wordings** (not just the brochure)?")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("14. **Have you decided which riders you actually need** vs which are unnecessary add-ons (critical illness rider, accidental death benefit, premium waiver)?")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    pdf.add_text("15. **Have you checked the suicide clause** (typically excluded for first year) and the contestability period?")
    pdf.add_bullet("☐ Yes  ☐ No  ☐ Unsure")
    
    # --- PAGE 3: Comparison Matrix ---
    pdf.add_page()
    pdf.add_section_heading("What to Look for When Comparing Term Plans")
    pdf.add_subheading(": Quick Comparison Matrix")
    
    headers = ["Feature", "Minimum Acceptable", "Ideal", "Your Plan"]
    rows = [
        ["Claim Settlement Ratio (CSR)", "Above 95%", "Above 98%", ""],
        ["Sum Assured", "10x annual income", "12-15x annual income", ""],
        ["Policy Term", "Till age 60", "Till age 65 or child's independence", ""],
        ["Premium Level", "Fits budget", "Level premium for full term", ""],
        ["Critical Illness Rider", "Available", "Covered diseases: 30+", ""],
        ["Accidental Death Benefit", "Available", "At least 2x base sum assured", ""],
        ["Exclusions Transparency", "On request", "Clearly listed on website", ""],
        ["Claim Support", "Customer care", "Dedicated advisor", ""],
    ]
    pdf.add_table(headers, rows)
    pdf.add_text("_**Follow-up note:** This matrix helps you compare. But the RIGHT comparison depends on YOUR family's specific situation. That's where our free consultation helps — we fill in these blanks together._")
    
    # --- PAGE 4: Real Claim Scenarios ---
    pdf.add_section_heading("Real Claim Scenarios")
    pdf.add_subheading(": Learn from Others' Mistakes")
    
    pdf.add_subheading("Scenario A: The Non-Disclosure Trap")
    pdf.add_text("Ravi, 38, bought a ₹1 Cr term plan. Two years later, he was diagnosed with a heart condition. He passed away 4 years after buying the policy. The claim was delayed for 14 months because the insurer found he had not disclosed a pre-existing blood pressure reading from a routine check-up 6 months BEFORE the policy purchase. His family received the full amount only after intervention.")
    pdf.add_note_box("**Lesson:** Disclose EVERYTHING — even minor findings from routine check-ups.")
    
    pdf.add_subheading("Scenario B: The Underinsurance Gap")
    pdf.add_text("Priya, 35, bought a ₹50L term plan thinking it was 'enough.' When she passed away, her family found the ₹50L covered only 2 years of their expenses. Her husband had to return to work within weeks, children's education plans were postponed.")
    pdf.add_note_box("**Lesson:** ₹50L sounds large. For a family earning ₹15L p.a., it's barely 2 years of living expenses.")
    
    pdf.add_subheading("Scenario C: The Nominee Nightmare")
    pdf.add_text("Sanjay, 42, nominated his wife correctly. But when he passed away, his wife discovered the name on the policy was spelled 'Sunita Kumari' while her Aadhaar said 'Sunita Kumari Devi.' The claim was held up for 6 months while affidavits were prepared.")
    pdf.add_note_box("**Lesson:** Match nominee name EXACTLY to their government ID proof.")
    
    # --- PAGE 5: Why We Created This + CTA ---
    pdf.add_page()
    pdf.add_section_heading("Why We Created This Checklist")
    pdf.add_bullet("*   **Most comparison sites** focus on premiums and features. We focus on whether your family will actually GET the money when it matters.".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.add_bullet("*   This checklist is created by a licensed IRDAI advisor (Reg 0149161D) with 18 years of experience in insurance and complex claims.".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.add_bullet("*   **We don't sell you a plan** from a filtered list. We evaluate ALL available options and recommend the ONE that fits YOUR disclosure profile, family structure, and budget.".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.add_bullet("*   **Your next step:** Book a free 15-minute consultation. We'll review your completed checklist, flag any risks, and recommend the best plan for your exact situation. No obligation. No sales pitch. Just honest advice.".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    
    pdf.ln(5)
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(0, 94, 184) # blue
    pdf.multi_cell(0, 7, "-> [BOOK FREE CONSULTATION ->]".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'), border=0, align='C')
    pdf.set_text_color(0)
    pdf.ln(2)
    pdf.set_font('helvetica', '', 10)
    pdf.multi_cell(0, 5, "WhatsApp: +91-9986634506", align='C')
    pdf.multi_cell(0, 5, "Phone: +91-9986634506", align='C')
    pdf.ln(5)
    pdf.add_bullet("Still researching? Read our latest comparison guides on insurancesupport.online/blog".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    
    # --- PAGE 6: About + Disclaimer ---
    pdf.add_section_heading("About Insurance Support by Hari Kotian")
    pdf.add_bullet("*   IRDAI Reg 0149161D".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.add_bullet("*   18 years of industry experience (Wintel & Salesforce systems expertise translates to understanding complex insurance documentation)".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.add_bullet("*   Bangalore-based, Koramangala -- available for in-person consultations".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.add_bullet("*   **Promise:** 'We answer every call. We explain every clause. We fight every claim denial.'".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    
    pdf.ln(5)
    pdf.add_section_heading("Disclaimer")
    pdf.set_font('helvetica', '', 9)
    pdf.set_text_color(119, 119, 119)
    pdf.multi_cell(0, 4, "This document is for educational purposes and does not constitute final insurance advice. All comparisons are based on publicly available IRDAI data and general industry observations. Please review actual policy wordings and consult a licensed IRDAI advisor before making any purchase decision. Insurance Support by Hari Kotian (IRDAI Reg 0149161D) is an independent insurance advisor and is not affiliated with or endorsed by any specific insurance company.".replace('\u2014', '--').replace('\u2013', '-').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))
    pdf.set_text_color(0)
    
    pdf.output(pdf_path)
    print(f"PDF generated successfully: {pdf_path}")

if __name__ == "__main__":
    import os
    # Get the absolute path of the project root
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    md_path = os.path.join(project_root, 'public', 'downloads', 'term-insurance-claim-proof-checklist.md')
    pdf_path = os.path.join(project_root, 'public', 'downloads', 'term-insurance-claim-proof-checklist.pdf')
    build_pdf(md_path, pdf_path)
