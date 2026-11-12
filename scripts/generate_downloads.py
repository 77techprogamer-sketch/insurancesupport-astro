#!/usr/bin/env python3
"""
Generate the downloadable claim-recovery templates linked from the blog.

The site's guides link to these files under /public/downloads/. They were
referenced but never produced, which left nine pages pointing at 404s.

Run:  python3 scripts/generate_downloads.py
Deps: reportlab, openpyxl, python-docx
Output is written straight into public/downloads/ and ships with the build.
"""

import os
from datetime import date

from docx import Document
from docx.shared import Pt
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (KeepTogether, ListFlowable, ListItem, PageBreak,
                                Paragraph, SimpleDocTemplate, Spacer, Table,
                                TableStyle)

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "downloads")
os.makedirs(OUT, exist_ok=True)

NAVY = colors.HexColor("#0f2b46")
ACCENT = colors.HexColor("#1d4ed8")
MUTED = colors.HexColor("#5b6b7c")
RULE = colors.HexColor("#d6dde6")

SITE = "insurancesupport.online"
ADVISOR = "Hari Kotian, IRDAI Reg. No. 0149161D"


def styles():
    ss = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("t", parent=ss["Title"], fontName="Helvetica-Bold",
                                fontSize=19, leading=23, textColor=NAVY, spaceAfter=2, alignment=TA_LEFT),
        "sub": ParagraphStyle("s", parent=ss["Normal"], fontName="Helvetica",
                              fontSize=9.5, leading=13, textColor=MUTED, spaceAfter=10),
        "h2": ParagraphStyle("h2", parent=ss["Heading2"], fontName="Helvetica-Bold",
                             fontSize=12, leading=15, textColor=NAVY, spaceBefore=12, spaceAfter=6),
        "body": ParagraphStyle("b", parent=ss["Normal"], fontName="Helvetica",
                               fontSize=9.5, leading=13.5, spaceAfter=6),
        "small": ParagraphStyle("sm", parent=ss["Normal"], fontName="Helvetica",
                                fontSize=8, leading=11, textColor=MUTED),
        "mono": ParagraphStyle("m", parent=ss["Normal"], fontName="Courier",
                               fontSize=8.5, leading=12),
    }


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(20 * mm, 16 * mm, A4[0] - 20 * mm, 16 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(20 * mm, 11 * mm, f"{SITE}  ·  {ADVISOR}")
    canvas.drawRightString(A4[0] - 20 * mm, 11 * mm, f"Page {doc.page}")
    canvas.restoreState()


def doc(path, title, subtitle, story):
    st = styles()
    flow = [
        Paragraph(title, st["title"]),
        Paragraph(subtitle, st["sub"]),
        Table([[""]], colWidths=[A4[0] - 40 * mm], rowHeights=[1.2],
              style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), ACCENT)])),
        Spacer(1, 8),
    ] + story + [
        Spacer(1, 10),
        Paragraph("Educational template. It is not legal advice and does not create an "
                  "advisory relationship. Confirm current timelines with IRDAI, your insurer "
                  "and the Insurance Ombudsman before you file. "
                  f"Prepared {date.today():%d %B %Y}.", styles()["small"]),
    ]
    SimpleDocTemplate(
        os.path.join(OUT, path), pagesize=A4,
        leftMargin=20 * mm, rightMargin=20 * mm, topMargin=18 * mm, bottomMargin=22 * mm,
        title=title, author="Insurance Support", subject=subtitle,
    ).build(flow, onFirstPage=header_footer, onLaterPages=header_footer)
    print("wrote", path)


# ---------------------------------------------------------------- appeal templates

def appeal_templates():
    st = styles()

    def letter(heading, body_lines):
        items = [Paragraph(heading, st["h2"])]
        for line in body_lines:
            items.append(Paragraph(line, st["mono"]))
        return items

    story = [
        Paragraph("Three short letters cover almost every rejected or delayed claim: the "
                  "insurer's own grievance cell, IRDAI's Bima Bharosa portal, and the "
                  "Insurance Ombudsman. Fill the square brackets, keep a copy, and send by "
                  "email plus registered post so you can prove the date.", st["body"]),
    ]

    story += letter("1. Grievance letter to the insurer", [
        "To: The Grievance Redressal Officer",
        "     [Insurer name], [Branch / address]",
        "",
        "Subject: Grievance against repudiation of claim no. [claim no.] under policy no. [policy no.]",
        "",
        "Dear Sir/Madam,",
        "",
        "1. I hold policy no. [policy no.], issued on [date], covering [insured / vehicle / property].",
        "2. I submitted claim no. [claim no.] on [date] with all documents listed in the annexure.",
        "3. By letter dated [date] the claim was [repudiated / partly repudiated / pending] on the",
        "   ground that [quote the exact reason given by the insurer].",
        "4. That ground is not supported by the policy terms or by the documents on record, because",
        "   [your reason: e.g. the waiting period for this condition had already expired on [date],",
        "   the exclusion cited does not appear in the policy schedule, the surveyor's report itself",
        "   records that the damage was accidental].",
        "5. Under Regulation 8 of the IRDAI (Protection of Policyholders' Interests) Regulations, 2017,",
        "   the insurer must furnish the reasons for repudiation in writing and the policyholder must",
        "   be given an opportunity to be heard. I therefore request:",
        "      (a) a copy of the complete claim file, including the surveyor's and TPA's reports;",
        "      (b) reconsideration of the decision on the basis of the enclosed documents;",
        "      (c) a written reasoned decision within 14 days of receipt of this letter.",
        "",
        "Enclosures: [list every document with dates]",
        "",
        "Yours faithfully,",
        "[Name]  ·  [Address]  ·  [Phone]  ·  [Email]",
        "Copy to: [Insurer's Nodal Officer for grievances]",
    ])

    story.append(PageBreak())

    story += letter("2. Complaint on IRDAI's Bima Bharosa portal", [
        "Portal: https://bimabharosa.irdai.gov.in  (registration required)",
        "",
        "Complainant: [name, address, phone, email]",
        "Insurer: [name]     Policy no.: [policy no.]     Claim no.: [claim no.]",
        "Date of claim: [date]     Date of repudiation: [date]",
        "",
        "Category: Repudiation of claim / Delay in claim settlement / Deficiency in service",
        "",
        "Complaint text:",
        "",
        "The insurer has repudiated my claim under policy [policy no.] on the ground of",
        "[ground]. The policy was in force, premiums were paid up to [date], and the",
        "documents submitted on [date] established [what they establish].",
        "",
        "I first approached the insurer's grievance cell in writing on [date].",
        "Their reply dated [date] did not deal with [the specific point].",
        "",
        "Relief sought:",
        "  - Settlement of the claim of Rs. [amount] with interest for the delay;",
        "  - Or a written reasoned decision from the insurer;",
        "  - Costs.",
        "",
        "Attachments: policy schedule, repudiation letter, grievance letter, insurer reply,",
        "all claim documents, identity proof.",
    ])

    story += letter("3. Complaint to the Insurance Ombudsman", [
        "To: The Insurance Ombudsman",
        "     [Jurisdiction: e.g. Bengaluru — see the checklist for the address]",
        "",
        "Subject: Complaint under the Insurance Ombudsman Rules, 2017 against [insurer name]",
        "",
        "1. Complainant: [name], [address], [phone], [email].",
        "2. The insurer: [name], [registered office].",
        "3. Policy no. [policy no.], sum insured Rs. [amount], issued [date].",
        "4. Claim: [description]. Repudiated / not settled by letter dated [date].",
        "5. I first complained to the insurer on [date]. They [rejected on / did not respond within",
        "   30 days of] that complaint.",
        "6. The complaint is within one year of the insurer's final decision.",
        "7. The amount claimed is Rs. [amount], within the Ombudsman's monetary jurisdiction of",
        "   Rs. 50 lakh (Insurance Ombudsman Rules, 2017, as amended in November 2023).",
        "8. I have not filed the same dispute before any other court, tribunal or consumer forum.",
        "",
        "Documents: policy schedule · claim form · repudiation letter · grievance correspondence ·",
        "identity and address proof · affidavit (where the Ombudsman asks for one) · index of documents.",
        "",
        "Signature: ____________________        Date: ____________",
    ])

    doc("appeal-templates.pdf", "Rejected Claim Appeal Templates",
        "Three ready-to-edit letters: insurer grievance, IRDAI Bima Bharosa, Insurance Ombudsman", story)


# ---------------------------------------------------------------- ombudsman checklist

def ombudsman_checklist():
    st = styles()
    steps = [
        ("Before you file", [
            "Written repudiation or 30 days of silence from the insurer after your grievance.",
            "Complaint filed within one year of the insurer's final decision.",
            "The same dispute has not been filed before a consumer forum, court or arbitrator.",
            "Amount claimed is within the Ombudsman's monetary limit of Rs. 50 lakh (raised from Rs. 30 lakh in November 2023).",
        ]),
        ("Documents that decide the outcome", [
            "Policy schedule and wording — the clause the insurer relied on, highlighted.",
            "Complete claim file: claim form, bills, discharge summary, investigation reports.",
            "The repudiation letter, quoted word for word.",
            "Your grievance letter and the insurer's reply, with dates and proof of delivery.",
            "KYC and address proof; affidavit where required.",
            "A one-page timeline of events — this is what the Ombudsman reads first.",
        ]),
        ("Filing", [
            "File online through the Ombudsman portal, or by post / in person at the jurisdictional office.",
            "Bengaluru jurisdiction covers Karnataka; the office address and email are on the "
            "IRDAI Ombudsman page — confirm before sending.",
            "Keep the acknowledgement number and every proof of delivery.",
        ]),
        ("After filing", [
            "The Ombudsman may attempt mediation; a settlement is not binding on you until accepted.",
            "An award is binding on the insurer; you may still approach a consumer forum if the "
            "award does not settle the matter.",
            "Track every date — the year limits are strict and are counted from the insurer's "
            "final decision, not from the claim.",
        ]),
    ]
    story = [
        Paragraph("A rejection is not the end of a claim. It is the first decision. This checklist "
                  "turns a rejection letter into an Ombudsman complaint that survives the first "
                  "review.", st["body"]),
    ]
    for title, items in steps:
        story.append(Paragraph(title, st["h2"]))
        story.append(ListFlowable(
            [ListItem(Paragraph("[  ]  " + i, st["body"]), leftIndent=12) for i in items],
            bulletType="bullet", start="", leftIndent=10,
        ))

    story.append(Paragraph("Common reasons a complaint is returned", st["h2"]))
    table = Table([
        ["Reason", "What to do"],
        ["Filed before the insurer's 30 days elapsed", "Wait, or attach proof the insurer closed it in writing."],
        ["Outside the one-year window", "Explain the delay in the covering letter; attach dates."],
        ["Same dispute already in a consumer forum", "Withdraw one, or wait for that decision."],
        ["No proof of the insurer's decision", "Attach the written repudiation; never rely on a phone call."],
    ], colWidths=[65 * mm, 95 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f6f8fb")]),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(table)

    doc("bangalore-ombudsman-checklist.pdf", "Insurance Ombudsman Complaint Checklist",
        "Bengaluru jurisdiction — what to attach, what returns a complaint, what happens next", story)


# ---------------------------------------------------------------- regulations summary

def regulations_summary():
    st = styles()
    rows = [
        ["Requirement", "Who it binds", "Rule"],
        ["Reasons for repudiation must be given in writing; policyholder must be heard",
         "Insurer", "Reg. 8, IRDAI (PPI) Regulations, 2017"],
        ["Grievance at the insurer's grievance cell resolved within 14 days",
         "Insurer", "Reg. 3, IRDAI (PPI) Regulations, 2017"],
        ["Ombudsman complaint allowed after 30 days of insurer silence, or on rejection",
         "Policyholder", "Insurance Ombudsman Rules, 2017"],
        ["Ombudsman complaint within 1 year of the insurer's final decision",
         "Policyholder", "Insurance Ombudsman Rules, 2017"],
        ["Ombudsman monetary limit: Rs. 50 lakh per claim",
         "Ombudsman", "Insurance Ombudsman Rules, 2017 (amended Nov 2023)"],
        ["Cashless authorisation decision within 1 hour of the request (planned admission)",
         "Insurer / TPA", "IRDAI health master circular, 2024"],
        ["Final cashless authorisation within 3 hours where the 1-hour clock started at discharge",
         "Insurer / TPA", "IRDAI health master circular, 2024"],
        ["Claim settlement within 30 days of the last necessary document",
         "Insurer", "IRDAI (PPI) Regulations, 2017"],
        ["No repudiation after 3 years of policy issue on the ground of misrepresentation",
         "Insurer", "Section 45, Insurance Act, 1938"],
        ["Policyholder's free-look period: 30 days",
         "Insurer", "IRDAI (PPI) Regulations, 2017"],
        ["Cancellation of a health policy requires renewal notice and a grace period",
         "Insurer", "IRDAI health insurance regulations"],
    ]
    table = Table([[Paragraph(c, ParagraphStyle("c", fontName="Helvetica-Bold", fontSize=8.5,
                                                textColor=colors.white)) for c in rows[0]]] +
                  [[Paragraph(c, st["small"]) for c in r] for r in rows[1:]],
                  colWidths=[85 * mm, 30 * mm, 45 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f6f8fb")]),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ]))
    story = [
        Paragraph("The rules that decide most Indian insurance disputes, on one page. Quote the "
                  "regulation number in your letter — it moves the complaint from opinion to "
                  "procedure.", st["body"]),
        table,
        Paragraph("Timelines change. Before you cite a number in a filing, check the current text "
                  "on irdai.gov.in — and cite the version that was in force on the date of the "
                  "claim decision.", st["small"]),
    ]
    doc("irdai-regulations-summary.pdf", "Key IRDAI Rules at a Glance",
        "Claim timelines, grievance steps and Ombudsman limits with regulation references", story)


# ---------------------------------------------------------------- spreadsheets

HDR_FILL = PatternFill("solid", fgColor="0F2B46")
HDR_FONT = Font(color="FFFFFF", bold=True, size=10)
THIN = Side(style="thin", color="D6DDE6")
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)


def sheet(ws, headers, widths, rows=None):
    ws.append(headers)
    for i, w in enumerate(widths, start=1):
        ws.column_dimensions[get_column_letter(i)].width = w
    for cell in ws[1]:
        cell.fill = HDR_FILL
        cell.font = HDR_FONT
        cell.alignment = Alignment(vertical="center", wrap_text=True)
        cell.border = BOX
    ws.row_dimensions[1].height = 24
    for row in rows or []:
        ws.append(row)
    for row in ws.iter_rows(min_row=2, max_row=ws.max_row, max_col=len(headers)):
        for cell in row:
            cell.border = BOX
            cell.alignment = Alignment(vertical="top", wrap_text=True)
    ws.freeze_panes = "A2"


def claim_organizer():
    wb = Workbook()

    ws = wb.active
    ws.title = "Documents"
    sheet(ws, ["#", "Document", "Have it?", "Issued by", "Date", "File / page ref", "Notes"],
          [5, 42, 10, 22, 14, 18, 34],
          [[i, d, "No", "", "", "", ""] for i, d in enumerate([
              "Policy schedule and full policy wording",
              "Proposal form / application copy",
              "Premium payment receipts or bank statement",
              "Claim form (insurer's format)",
              "Discharge summary",
              "Hospital bills and itemised breakup",
              "Payment receipts for bills paid",
              "Investigation / diagnostic reports",
              "Prescription and pharmacy bills",
              "FIR / panchnama (motor, theft, accident)",
              "Driving licence and RC (motor)",
              "Death certificate and nominee KYC (life)",
              "Employer / HR letter (group cover)",
              "Insurer's repudiation or query letter",
              "Your grievance letter and its acknowledgement",
              "Surveyor's report (request a copy)",
              "TPA correspondence",
          ], start=1)])

    ws = wb.create_sheet("Timeline")
    sheet(ws, ["Date", "Event", "Days since claim", "Document proving it", "Next action", "Owner"],
          [14, 46, 16, 26, 34, 14],
          [["", "Claim intimated to insurer", "", "", "", ""],
           ["", "Documents submitted (all)", "", "", "", ""],
           ["", "Insurer query received", "", "", "", ""],
           ["", "Reply to query sent", "", "", "", ""],
           ["", "Decision received", "", "", "", ""],
           ["", "Grievance filed with insurer", "", "", "", ""],
           ["", "Bima Bharosa complaint filed", "", "", "", ""],
           ["", "Ombudsman complaint filed", "", "", "", ""]])

    ws = wb.create_sheet("Correspondence")
    sheet(ws, ["Date", "From", "To", "Mode", "Subject / summary", "Reference no.", "Follow-up on"],
          [14, 20, 20, 14, 46, 18, 14])

    ws = wb.create_sheet("Expenses")
    sheet(ws, ["Date", "Head", "Description", "Amount (Rs.)", "Paid to", "Receipt available?", "Reimbursable?"],
          [14, 22, 40, 14, 22, 18, 16],
          [["", "Hospital bill", "", "", "", "", ""],
           ["", "Pharmacy", "", "", "", "", ""],
           ["", "Diagnostics", "", "", "", "", ""],
           ["", "Travel / ambulance", "", "", "", "", ""],
           ["", "Legal / documentation", "", "", "", "", ""]])

    ws = wb.create_sheet("Deadlines")
    sheet(ws, ["Rule", "Clock starts", "Limit", "Your date", "Status"],
          [52, 42, 16, 14, 14],
          [["Insurer grievance cell reply", "Date grievance received", "14 days", "", ""],
           ["Claim settlement", "Last necessary document received", "30 days", "", ""],
           ["Cashless authorisation (planned)", "Authorisation request", "1 hour", "", ""],
           ["Ombudsman complaint window", "Insurer's final decision", "1 year", "", ""],
           ["Ombudsman eligibility", "Date of grievance to insurer", "30 days of silence", "", ""]])

    path = os.path.join(OUT, "claim-organizer.xlsx")
    wb.save(path)
    print("wrote claim-organizer.xlsx")


def document_index():
    wb = Workbook()
    ws = wb.active
    ws.title = "Index"
    ws["A1"] = "Document index — attach this sheet as page 1 of every submission"
    ws["A1"].font = Font(bold=True, size=13, color="0F2B46")
    ws["A2"] = "Claim no. ______________   Policy no. ______________   Insured ______________"
    ws["A2"].font = Font(size=9, color="5B6B7C")
    ws.append([])
    headers = ["Sl.", "Document", "Date", "Issued by", "Pages", "Original / copy", "Remarks"]
    ws.append(headers)
    row = ws.max_row
    for i in range(1, 21):
        ws.append([i, "", "", "", "", "", ""])
    for cell in ws[row]:
        cell.fill = HDR_FILL
        cell.font = HDR_FONT
        cell.border = BOX
    for col, w in zip("ABCDEFG", [6, 44, 14, 24, 8, 16, 26]):
        ws.column_dimensions[col].width = w
    for r in ws.iter_rows(min_row=row, max_row=ws.max_row, max_col=7):
        for c in r:
            c.border = BOX
            c.alignment = Alignment(vertical="top", wrap_text=True)

    ws2 = wb.create_sheet("Cover note")
    sheet(ws2, ["Field", "Value"], [28, 70],
          [["Submitted to", ""], ["Submitted by", ""], ["Date", ""],
           ["Claim number", ""], ["Policy number", ""], ["Total pages", ""],
           ["Mode of submission", "Email / portal / registered post / in person"],
           ["Acknowledgement no.", ""]])

    path = os.path.join(OUT, "document-index-template.xlsx")
    wb.save(path)
    print("wrote document-index-template.xlsx")


# ---------------------------------------------------------------- docx affidavit

def affidavit():
    d = Document()
    st = d.styles["Normal"]
    st.font.name = "Calibri"
    st.font.size = Pt(10.5)

    d.add_heading("Affidavit in support of an insurance claim complaint", level=0)
    p = d.add_paragraph("For submission to the Insurance Ombudsman / insurer's grievance cell. "
                        "Swear or affirm before a notary or magistrate where required.")
    p.runs[0].italic = True

    fields = [
        ("I, ______________________________, aged ____, son/daughter/wife of "
         "______________________________, residing at ______________________________, "
         "do hereby solemnly affirm and state as follows:"),
    ]
    d.add_paragraph(fields[0])

    statements = [
        "1. I am the insured / nominee / legal heir under policy no. ____________________ "
        "issued by ______________________________ (the \"Insurer\") on ____________.",
        "2. The policy was in force on the date of the event giving rise to the claim, and all "
        "premiums due up to that date were paid.",
        "3. On ____________ I submitted claim no. ____________________ for Rs. ____________ "
        "together with the documents listed in the accompanying index.",
        "4. By letter dated ____________ the Insurer repudiated / partly repudiated the claim on "
        "the ground that ____________________________________________________________.",
        "5. That ground is incorrect because ___________________________________________ "
        "______________________________________________________________________________.",
        "6. I first approached the Insurer's grievance cell in writing on ____________ and "
        "received a reply dated ____________ / no reply within 30 days.",
        "7. The documents annexed to this affidavit are true copies of the originals in my "
        "possession, and the facts stated above are true to my knowledge and belief.",
        "8. I have not filed the same dispute before any court, tribunal, arbitrator or consumer "
        "forum, and no other proceeding is pending in respect of this claim.",
        "9. I undertake to produce the originals of the annexed documents whenever called upon.",
    ]
    for s in statements:
        d.add_paragraph(s)

    d.add_paragraph("")
    d.add_paragraph("Deponent")
    d.add_paragraph("")
    d.add_paragraph("Verification")
    d.add_paragraph("Verified at ____________ on this ____ day of ____________, 20____, that the "
                    "contents of paragraphs 1 to 9 above are true and correct to my knowledge, "
                    "and that nothing material has been concealed.")
    d.add_paragraph("")
    d.add_paragraph("______________________________")
    d.add_paragraph("Deponent signature")
    d.add_paragraph("")
    d.add_paragraph("Before me,")
    d.add_paragraph("Notary / Magistrate ______________________  Seal:")

    path = os.path.join(OUT, "ombudsman-affidavit-template.docx")
    d.save(path)
    print("wrote ombudsman-affidavit-template.docx")


def regulation_8_letter():
    text = """Subject: Request for reasons for repudiation under Regulation 8 of the IRDAI
         (Protection of Policyholders' Interests) Regulations, 2017

To: The Grievance Redressal Officer
    [Insurer name]
    [Address]

Policy no.: [policy number]
Claim no.: [claim number]
Date of repudiation: [date]

Dear Sir/Madam,

I have received your letter dated [date] repudiating my claim on the ground of
[ground stated by the insurer].

The policy was in force on the date of the event and all premiums due had been
paid. The documents submitted with the claim show [state the fact that contradicts
the ground, and reference the document and page].

Under Regulation 8 of the IRDAI (Protection of Policyholders' Interests)
Regulations, 2017, the insurer is required to furnish the reasons for repudiation
in writing and to give the policyholder an opportunity to be heard.

I therefore request:

  1. A copy of the complete claim file, including the surveyor's report, the
     investigator's report and the TPA's assessment.
  2. A written statement identifying the exact policy clause, and the exact
     document, relied on for the repudiation.
  3. Reconsideration of the decision. If the decision stands, a reasoned order
     within 14 days of receipt of this letter.

If I do not receive a reasoned reply within 14 days, I will place this
correspondence before IRDAI through the Bima Bharosa portal and, if necessary,
before the Insurance Ombudsman under the Insurance Ombudsman Rules, 2017.

Enclosures:
  - Copy of repudiation letter dated [date]
  - Policy schedule
  - [other documents]

Yours faithfully,

[Name]
[Address]
[Phone]
[Email]

Date: [date]

--------------------------------------------------------------------------------
Sent by email to [grievance email] and by registered post to the address above.
Keep the postal receipt and the email delivery confirmation.
"""
    path = os.path.join(OUT, "regulation-8-demand-template.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("wrote regulation-8-demand-template.txt")


if __name__ == "__main__":
    appeal_templates()
    ombudsman_checklist()
    regulations_summary()
    claim_organizer()
    document_index()
    affidavit()
    regulation_8_letter()
