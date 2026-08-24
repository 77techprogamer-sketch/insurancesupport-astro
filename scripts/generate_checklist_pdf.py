#!/usr/bin/env python3
"""
Converts the Term Insurance Claim-Proof Checklist markdown into a styled PDF using fpdf2.
Usage: python scripts/generate_checklist_pdf.py
"""

import os
import re
from fpdf import FPDF


def clean_text(text):
    """Normalize text for fpdf's standard helvetica font (no Unicode)."""
    replacements = {
        '\u2014': '--',   # em dash
        '\u2013': '-',    # en dash
        '\u2018': "'",    # left single quote
        '\u2019': "'",    # right single quote
        '\u201c': '"',    # left double quote
        '\u201d': '"',    # right double quote
        '\u00A0': ' ',    # non-breaking space
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text


def render_rich_text(pdf, text, bold_font_size=None):
    """Write text with **bold** handling using multi_cell-style write."""
    text = clean_text(text)
    parts = re.split(r'(\*\*.*?\*\*)', text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            pdf.set_font('helvetica', 'B', bold_font_size or 10)
            pdf.write(5, part[2:-2])
        elif part.startswith('__') and part.endswith('__'):
            pdf.set_font('helvetica', 'B', bold_font_size or 10)
            pdf.write(5, part[2:-2])
        else:
            pdf.set_font('helvetica', '', 10)
            pdf.write(5, part)


class ChecklistPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font('helvetica', 'I', 7)
            self.set_text_color(128)
            self.set_x(self.l_margin)
            self.cell(0, 5, 'Insurance Support by Hari Kotian (IRDAI Reg 0149161D)', 0, 0, 'L')
            self.ln(3)
            self.set_draw_color(0, 26, 57)
            self.line(15, self.get_y(), 195, self.get_y())
            self.ln(3)

    def footer(self):
        self.set_y(-12)
        self.set_font('helvetica', 'I', 7)
        self.set_text_color(128)
        self.cell(0, 5, str(self.page_no()), 0, 0, 'C')
        self.set_text_color(0, 0, 0)

    def add_section_heading(self, text):
        self.ln(4)
        self.set_text_color(0, 26, 57)
        self.set_font('helvetica', 'B', 13)
        self.multi_cell(0, 6, clean_text(text))
        self.ln(2)
        self.set_draw_color(0, 26, 57)
        self.line(self.l_margin, self.get_y(), self.l_margin + 180, self.get_y())
        self.ln(3)
        self.set_text_color(0, 0, 0)
        self.set_font('helvetica', '', 10)

    def add_subheading(self, text):
        self.ln(2)
        self.set_text_color(0, 26, 57)
        self.set_font('helvetica', 'B', 11)
        self.multi_cell(0, 5, clean_text(text))
        self.ln(1)
        self.set_text_color(0, 0, 0)
        self.set_font('helvetica', '', 10)

    def add_paragraph(self, text):
        """Add a paragraph with **bold** handling."""
        self.set_text_color(0, 0, 0)
        self.set_x(self.l_margin)
        render_rich_text(self, text)
        self.ln(2)

    def add_bullet_item(self, text, indent=7):
        """Add a bullet point with bold handling."""
        orig_lm = self.l_margin
        self.set_left_margin(orig_lm + indent)
        self.set_x(orig_lm + indent)
        self.set_text_color(0, 0, 0)
        self.write(5, clean_text('\u00B7  '))
        parts = re.split(r'(\*\*.*?\*\*)', clean_text(text))
        for part in parts:
            if part.startswith('**') and part.endswith('**'):
                self.set_font('helvetica', 'B', 10)
                self.write(5, part[2:-2])
            elif part.startswith('__') and part.endswith('__'):
                self.set_font('helvetica', 'B', 10)
                self.write(5, part[2:-2])
            else:
                self.set_font('helvetica', '', 10)
                self.write(5, part)
        self.ln(2)
        self.set_left_margin(orig_lm)
        self.set_x(orig_lm)

    def add_checkbox_item(self, text):
        """Add a checklist item with checkboxes."""
        orig_lm = self.l_margin
        self.set_x(orig_lm + 5)
        self.set_text_color(0, 0, 0)
        self.set_font('helvetica', '', 10)
        self.multi_cell(0, 4.5, clean_text(text))  # Use multi_cell for wrapping
        # Checkbox row
        self.set_x(orig_lm + 15)
        self.set_font('helvetica', '', 9)
        self.set_text_color(100, 100, 100)
        self.multi_cell(0, 4, clean_text('[ ] Yes  [ ] No  [ ] Unsure'))
        self.set_text_color(0, 0, 0)
        self.ln(1)
        self.set_left_margin(orig_lm)
        self.set_x(orig_lm)

    def add_note_box(self, text, bg_color=(240, 240, 240)):
        """Add a highlighted note/quote box."""
        self.ln(2)
        orig_lm = self.l_margin
        self.set_left_margin(orig_lm)
        self.set_fill_color(*bg_color)
        self.set_text_color(85, 85, 85)
        self.set_font('helvetica', 'I', 9)
        # remove underscores markers for display
        text = re.sub(r'_+', '', text)
        text = clean_text(text)
        self.multi_cell(0, 4.5, text, border=0, fill=True)
        self.set_text_color(0, 0, 0)
        self.ln(1)
        self.set_x(orig_lm)


def build_pdf():
    pdf = ChecklistPDF()
    pdf.set_auto_page_break(auto=True, margin=25)

    # --- PAGE 1: Title ---
    pdf.add_page()
    pdf.set_y(55)
    pdf.set_text_color(0, 26, 57)
    pdf.set_font('helvetica', 'B', 22)
    pdf.multi_cell(0, 10, clean_text('The Term Insurance Claim-Proof Checklist'))
    pdf.ln(3)
    pdf.set_font('helvetica', 'B', 13)
    pdf.set_text_color(100, 110, 130)
    pdf.multi_cell(0, 6, clean_text('15 Things to Verify Before You Sign'))
    pdf.ln(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('helvetica', 'B', 10)
    pdf.cell(0, 5, 'By Hari Kotian, IRDAI Reg 0149161D', 0, 1, 'C')
    pdf.ln(10)

    pdf.set_font('helvetica', '', 10)
    pdf.multi_cell(0, 5, clean_text("You're about to buy term insurance. Great move. But here's what nobody tells you -- buying the plan is easy. Getting the claim paid is where most families fail."))
    pdf.ln(2)
    pdf.multi_cell(0, 5, clean_text("This checklist covers the 15 critical points you MUST verify before signing. It takes 10 minutes. It could save your family 1 crore in denied claims."))
    pdf.ln(3)

    pdf.add_subheading("How to use this checklist:")
    pdf.add_bullet_item("Print it out.")
    pdf.add_bullet_item("Fill it in honestly for your chosen policy.")
    pdf.add_bullet_item("Bring it to your free consultation with Hari Kotian, a licensed IRDAI advisor.")

    # --- PAGE 2: Checklist ---
    pdf.add_page()
    pdf.add_section_heading("The 15-Point Claim-Proof Checklist")

    pdf.add_subheading("Group A: Your Disclosure Accuracy")
    pdf.add_paragraph("(Non-disclosure is the #1 reason claims get rejected in India.)")

    pdf.add_checkbox_item("**Have you disclosed ALL pre-existing medical conditions** (diabetes, BP, thyroid, cholesterol, asthma, anxiety, anything diagnosed before purchase)")
    pdf.add_checkbox_item("**Have you disclosed your complete smoking/tobacco history** (even if quit)?")
    pdf.add_checkbox_item("**Have you accurately stated your occupation and annual income?**")
    pdf.add_checkbox_item("**Have you disclosed ALL existing insurance policies** (including employer cover)?")
    pdf.add_checkbox_item("**Have you revealed any past claim history or hospitalizations?**")

    pdf.add_note_box("Why this matters: After 3 years, Section 45 of the Insurance Act protects you -- but only if you were honest in the first place.")

    pdf.add_subheading("Group B: Policy Structure")
    pdf.add_paragraph("(Many buyers underinsure by 40-60%, thinking 50L is enough when their family actually needs 1-1.5 Cr.)")

    pdf.add_checkbox_item("**Does the sum assured cover at least 10-15x your annual income?**")
    pdf.add_checkbox_item("**Is the policy term long enough** (till your youngest child turns 25, or till retirement)?")
    pdf.add_checkbox_item("**Have you checked if the premium is level (stays same) for the full term?**")
    pdf.add_checkbox_item("**Have you reviewed the death benefit payout options** (lump sum vs monthly)?")

    pdf.add_subheading("Group C: Nominee & Beneficiary Setup")
    pdf.add_paragraph("(Wrong nominee details can delay claims by months.)")

    pdf.add_checkbox_item("**Is the nominee name spelled correctly and matching official ID proof?**")
    pdf.add_checkbox_item("**Have you considered adding an alternate nominee or guardian** (for minor children)?")
    pdf.add_checkbox_item("**Is the nominee's relationship explicitly stated and accurate?**")

    pdf.add_subheading("Group D: Exclusions & Riders")
    pdf.add_paragraph("(The brochure says what's covered. The policy wordings say what's excluded. They are NOT the same document.)")

    pdf.add_checkbox_item("**Have you read the exclusion list in the policy wordings** (not just the brochure)?")
    pdf.add_checkbox_item("**Have you decided which riders you actually need** vs which are unnecessary add-ons?")
    pdf.add_checkbox_item("**Have you checked the suicide clause** (typically excluded for first year) and the contestability period?")

    # --- PAGE 3: Comparison Matrix ---
    pdf.add_page()
    pdf.add_section_heading("What to Look for When Comparing Term Plans")
    pdf.add_subheading(": Quick Comparison Matrix")

    headers = ["Feature", "Minimum Acceptable", "Ideal", "Your Plan"]
    rows = [
        ["Claim Settlement Ratio (CSR)", "Above 95%", "Above 98%", ""],
        ["Sum Assured", "10x annual income", "12-15x annual income", ""],
        ["Policy Term", "Till age 60", "Age 65 or child's independence", ""],
        ["Premium Level", "Fits budget", "Level premium", ""],
        ["Critical Illness Rider", "Available", "30+ covered diseases", ""],
        ["Accidental Death Benefit", "Available", "2x base sum assured", ""],
        ["Exclusions Transparency", "On request", "Clearly listed", ""],
        ["Claim Support", "Customer care", "Dedicated advisor", ""],
    ]

    col_count = len(headers)
    page_width = pdf.w - pdf.r_margin - pdf.l_margin
    col_width = page_width / col_count

    pdf.set_fill_color(0, 26, 57)
    pdf.set_text_color(255)
    pdf.set_font('helvetica', 'B', 8)
    for h in headers:
        pdf.multi_cell(col_width, 7, clean_text(h), border=1, align='C', fill=True)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('helvetica', '', 8)

    for row in rows:
        for cell in row:
            pdf.multi_cell(col_width, 7, clean_text(cell), border=1)
    pdf.ln(3)
    pdf.add_paragraph("_**Follow-up note:** This matrix helps you compare. But the RIGHT comparison depends on YOUR family's specific situation. That's where our free consultation helps -- we fill in these blanks together._")

    # --- PAGE 4: Real Claim Scenarios ---
    pdf.add_page()
    pdf.add_section_heading("Real Claim Scenarios")
    pdf.add_subheading(": Learn from Others' Mistakes")

    pdf.add_subheading("Scenario A: The Non-Disclosure Trap")
    pdf.add_paragraph("Ravi, 38, bought a 1 Cr term plan. Two years later, he was diagnosed with a heart condition. He passed away 4 years after buying the policy. The claim was delayed for 14 months because the insurer found he had not disclosed a pre-existing blood pressure reading from a routine check-up 6 months BEFORE the policy purchase. His family received the full amount only after intervention.")
    pdf.add_note_box("Lesson: Disclose EVERYTHING -- even minor findings from routine check-ups.")

    pdf.add_subheading("Scenario B: The Underinsurance Gap")
    pdf.add_paragraph("Priya, 35, bought a 50L term plan thinking it was 'enough.' When she passed away, her family found the 50L covered only 2 years of their expenses. Her husband had to return to work within weeks, children's education plans were postponed.")
    pdf.add_note_box("Lesson: 50L sounds large. For a family earning 15L p.a., it's barely 2 years of living expenses.")

    pdf.add_subheading("Scenario C: The Nominee Nightmare")
    pdf.add_paragraph("Sanjay, 42, nominated his wife correctly. But when he passed away, his wife discovered the name on the policy was spelled 'Sunita Kumari' while her Aadhaar said 'Sunita Kumari Devi.' The claim was held up for 6 months while affidavits were prepared.")
    pdf.add_note_box("Lesson: Match nominee name EXACTLY to their government ID proof.")

    # --- PAGE 5: Why + CTA ---
    pdf.add_page()
    pdf.add_section_heading("Why We Created This Checklist")
    pdf.add_bullet_item("**Most comparison sites** focus on premiums and features. We focus on whether your family will actually GET the money when it matters.")
    pdf.add_bullet_item("This checklist is created by a licensed IRDAI advisor (Reg 0149161D) with 18 years of experience in insurance and complex claims.")
    pdf.add_bullet_item("**We don't sell you a plan** from a filtered list. We evaluate ALL available options and recommend the ONE that fits YOUR disclosure profile, family structure, and budget.")
    pdf.add_bullet_item("**Your next step:** Book a free 15-minute consultation. We'll review your completed checklist, flag any risks, and recommend the best plan for your exact situation. No obligation. No sales pitch. Just honest advice.")

    pdf.ln(5)
    pdf.set_font('helvetica', 'B', 13)
    pdf.set_text_color(0, 94, 184)
    pdf.multi_cell(0, 8, clean_text("-> BOOK FREE CONSULTATION ->"), align='C')
    pdf.set_text_color(0, 0, 0)
    pdf.ln(2)
    pdf.set_font('helvetica', '', 10)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 5, clean_text("WhatsApp: +91-9986634506"), align='C')
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 5, clean_text("Phone: +91-9986634506"), align='C')
    pdf.ln(5)
    pdf.add_bullet_item("Still researching? Read our latest comparison guides on insurancesupport.online/blog")

    # --- PAGE 6: About + Disclaimer ---
    pdf.add_page()
    pdf.add_section_heading("About Insurance Support by Hari Kotian")
    pdf.add_bullet_item("IRDAI Reg 0149161D")
    pdf.add_bullet_item("18 years of industry experience (Wintel & Salesforce systems expertise translates to understanding complex insurance documentation)")
    pdf.add_bullet_item("Bangalore-based, Koramangala -- available for in-person consultations")
    pdf.add_bullet_item("**Promise:** 'We answer every call. We explain every clause. We fight every claim denial.'")

    pdf.ln(5)
    pdf.add_section_heading("Disclaimer")
    pdf.set_font('helvetica', '', 9)
    pdf.set_text_color(119, 119, 119)
    pdf.multi_cell(0, 4, clean_text("This document is for educational purposes and does not constitute final insurance advice. All comparisons are based on publicly available IRDAI data and general industry observations. Please review actual policy wordings and consult a licensed IRDAI advisor before making any purchase decision. Insurance Support by Hari Kotian (IRDAI Reg 0149161D) is an independent insurance advisor and is not affiliated with or endorsed by any specific insurance company."))
    pdf.set_text_color(0, 0, 0)

    # Output
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    output_path = os.path.join(project_root, 'public', 'downloads', 'term-insurance-claim-proof-checklist.pdf')
    pdf.output(output_path)
    print(f"PDF generated successfully: {output_path}")


if __name__ == "__main__":
    build_pdf()
