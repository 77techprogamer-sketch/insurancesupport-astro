#!/usr/bin/env python3
"""
Two jobs:

1. Strip invented social proof from post bodies. The site carries "78% overturn
   rate", "Rs 50Cr+ recovered", "95% success rate on health appeals" and
   "IRDAI data: 15-20% of claims are rejected" across a couple of dozen posts,
   including their translations. None of it is traceable to a filing, and it
   contradicts the site's own rule against invented statistics. Authority that
   cannot be sourced is a liability, not an asset.

2. Add an answer-first block to the highest-intent posts that lack one: the
   first sixty words state the rule, the forum and the deadline, the way the
   pages that currently win the featured snippet do.

Run after scripts/fill_empty_posts.py.
"""
import json
import re
import sys
from pathlib import Path

BLOGS = Path("src/data/blogs.json")

# ---------------------------------------------------------------------------
# 1. Invented social proof
# ---------------------------------------------------------------------------

# Whole lines that must go. These are bullets of made-up performance figures
# and inline bylines carrying the same numbers.
DROP_LINE_PATTERNS = [
    re.compile(r"\*\*Author\*\*:", re.I),
    re.compile(r"\*\*(?:78|95|98|99)\s?%", re.I),          # "**95% success rate**"
    re.compile(r"overturn rate", re.I),
    re.compile(r"\bwin rate\b", re.I),
    re.compile(r"\d+\s?%\s*(?:overturn|success|approval)\s*(?:rate|दर|रेट)", re.I),
    re.compile(r"(?:₹|Rs\.?\s?)50\s?\+?\s?(?:Cr|crore|करोड़|कोटी|కోటి|கோடி|કોટિ|ಕೋಟಿ|കോടി|কোটি)", re.I),
    re.compile(r"50\+\s?crores?", re.I),
    re.compile(r"\b\d{2,}\+?\s+Ombudsman filings\b", re.I),
]

INLINE = [
    # "According to IRDAI data, approximately 15-20% of LIC claims..."
    (re.compile(r"(?:According to|As per) IRDAI(?:'s)? data,?\s*(?:approximately\s*)?15[-–]20%[^.]*\.",
                re.I),
     "IRDAI does not publish a rejection percentage that can be applied to an individual claim; "
     "what governs your file is the ground stated in your own rejection letter."),
    (re.compile(r"(?:According to|As per) IRDAI data,?\s*(?:approximately\s*)?60%[^.]*\.", re.I),
     "Documentation and disclosure are the two grounds that appear most often in rejection letters."),
    # "Since 2018, we've overturned **78% of appealed claims**."
    (re.compile(r"Since 2018, we(?:'|’)ve (?:overturned|helped policyholders recover)[^.]*\.", re.I), ""),
    (re.compile(r"Our overturn rate:\s*\*\*78%\*\*\.", re.I), ""),
    (re.compile(r"\*\*Our win rate\*\*:\s*\d+%\+?(?:\s*\([^)]*\))?", re.I), ""),
    (re.compile(r"\*\*Our overturn rate\*\*:\s*\d+%", re.I), ""),
    (re.compile(r"with 25\+ years of experience recovering over ₹50 Cr in rejected claims", re.I),
     "with 25+ years in insurance advisory"),
    (re.compile(r"Rs 50Cr\+ recovered(?: for clients)?,?\s*78% (?:claim )?overturn rate", re.I),
     "25+ years in insurance advisory"),
    (re.compile(r"helped thousands of families recover their rightful claims", re.I),
     "advised families on recovering their claims"),
    (re.compile(r"we have helped thousands of policyholders get their rightful claim settlement on time", re.I),
     "we have advised policyholders on getting claims settled"),
    (re.compile(r"we have helped thousands of policyholders", re.I),
     "we have advised policyholders"),
    (re.compile(r"\b100\+\s*Ombudsman filings assisted\.?", re.I), ""),
    (re.compile(r"Exact overturn probability for your rejection type", re.I),
     "Which ground your rejection turns on"),
    (re.compile(r"Which forum gives highest success chance", re.I),
     "Which forum fits your rejection type"),
    (re.compile(r"\b\d+\+\s*Appeals\b", re.I), "appeal practice"),
]


def strip_invented(text: str) -> tuple[str, int]:
    changed = 0
    out = []
    for line in text.split("\n"):
        if any(p.search(line) for p in DROP_LINE_PATTERNS):
            changed += 1
            continue
        out.append(line)
    text = "\n".join(out)
    for pat, repl in INLINE:
        text, n = pat.subn(repl, text)
        changed += n
    # tidy: collapse runs of blank lines and stray bullet gaps
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text, changed


# ---------------------------------------------------------------------------
# 2. Answer-first openers
# ---------------------------------------------------------------------------

LEADS = {
    "lic-claim-rejection-appeal-guide-2026":
        "## The short answer\n\n"
        "**LIC cannot repudiate a death claim without stating its ground in writing, and once three years have run from issue or revival, Section 45 of the Insurance Act bars it from questioning the policy at all.** "
        "Ask for the reasons, appeal to LIC's Grievance Redressal Officer — 14 days to resolve under IRDAI's September 2024 Master Circular — then Bima Bharosa, then the Insurance Ombudsman: free, within one year, up to ₹50 lakh.\n\n",

    "health-insurance-claim-rejection-rights-2026":
        "## The short answer\n\n"
        "**A health insurer must tell you the ground for a rejection with reference to the policy terms, and must resolve your written grievance within 14 days.** "
        "If it does not, escalate to IRDAI Bima Bharosa and then to the Insurance Ombudsman — free, no lawyer, within one year of the final reply, award up to ₹50 lakh. "
        "The ground it cites decides what you gather; the volume of your complaint decides nothing.\n\n",

    "how-to-file-complaint-irdai-igms-portal-2026":
        "## The short answer\n\n"
        "**IRDAI's grievance portal is now called Bima Bharosa — bimabharosa.irdai.gov.in, toll-free 155255 — and IGMS is the same system under its old name.** "
        "File there once the insurer has failed to resolve your written complaint within 14 days. It records the complaint against the insurer and presses for a reply; it does not decide the claim. "
        "The Insurance Ombudsman decides, free, within one year, up to ₹50 lakh.\n\n",

    "irdai-complete-guide-policyholders-india-2026":
        "## The short answer\n\n"
        "**IRDAI regulates insurers; it does not pay claims.** What it sets is the clock your insurer must keep: a grievance resolved in 14 days, a claim settled within 30 days of the last necessary document (45 where an investigation is warranted), and interest at 2% above the RBI bank rate when the clock slips. "
        "When the insurer still refuses, the forum is the Insurance Ombudsman, not the regulator.\n\n",

    "irdai-standardized-health-insurance-policy-wordings-2026":
        "## The short answer\n\n"
        "**IRDAI standardised the core health policy wording so that the same clause means the same thing across insurers** — definitions, waiting periods, pre- and post-hospitalisation windows, and the moratorium after five continuous years. "
        "The practical question in a dispute is which version of the wording your policy carries, because the standard applies to products filed after the change.\n\n",

    "insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026":
        "## The short answer\n\n"
        "**A repudiation starts a process whose first three steps are free.** Written reasons from the insurer, a complaint to its Grievance Redressal Officer (14 days), then Bima Bharosa, then the Insurance Ombudsman — within one year, without a lawyer, for up to ₹50 lakh. "
        "What decides these files is the clause the insurer cited and the date it says it learned the fact, not the force of the letter you send.\n\n",

    "health-insurance-claim-rejection-15-real-reasons-how-to-prevent-appeal-each-one-2026":
        "## The short answer\n\n"
        "**Most health claim refusals come down to about fifteen recurring grounds, and each is answered with a document rather than an argument.** "
        "Three decide the majority of files: a condition the insurer says pre-dates the policy, a waiting period it says had not run, and a room category above the eligible limit. "
        "Identify which one your rejection letter names before you draft anything.\n\n",

    "health-insurance-portability-india-2026-switch-insurer-without-losing-benefits":
        "## The short answer\n\n"
        "**Portability does not restart your waiting periods.** Under IRDAI's portability rules the new insurer must give credit for continuous coverage, and may exclude only a condition that was already excluded — and only for the period that remained. "
        "Apply well before renewal (30 days is the usual floor, 45 is safer); the new insurer must decide within about 15 days of receiving the completed form.\n\n",

    "how-to-appeal-rejected-insurance-claim-india-2026":
        "## The short answer\n\n"
        "**You have longer than 30 days, whatever you have read elsewhere.** The insurer's grievance cell must answer within 14 days; the Ombudsman complaint can be filed within one year of the final reply; a consumer complaint within two years. "
        "The 30-day figure is the insurer's settlement clock under IRDAI's 2017 regulations — it is not the window you have to appeal.\n\n",

    "health-insurance-claim-settlement-ratio-2026":
        "## The short answer\n\n"
        "**A claim settlement ratio is a portfolio average, not a forecast about your claim.** It is claims settled divided by claims decided in a year; it says nothing about how much of each claim was paid, or on what ground yours could be refused. "
        "The four terms that actually decide a health claim are the waiting periods, the room-rent limit, the sub-limits and the co-payment.\n\n",

    "how-to-file-a-death-claim-on-life-insurance-in-india-2026-complete-guide":
        "## The short answer\n\n"
        "**A death claim is a document set, not an argument.** Claimant's statement, policy document (or an indemnity if it is lost), death certificate, nominee's identity and address proof, bank mandate, and — for a death within three years of the policy — the medical records. "
        "The insurer must settle within 30 days of receiving the last necessary document, or 45 where an investigation is warranted.\n\n",

    "irdai-cashless-claim-pre-authorization-approval-rejection-rules-2026":
        "## The short answer\n\n"
        "**IRDAI requires an authorisation decision within one hour of a planned admission request, and final authorisation within three hours of a discharge request.** "
        "A refusal must state the reason with reference to the policy terms. Where cashless fails, reimbursement is untouched: pay, keep the originals, and claim within the window your policy states.\n\n",

    "irdai-grievance-process-complaint-guide-2026":
        "## The short answer\n\n"
        "**Every insurer must maintain a Grievance Redressal Officer who resolves a complaint within 14 days.** "
        "If that fails, IRDAI's Bima Bharosa portal records the complaint, and the Insurance Ombudsman can then decide it — free, within one year, up to ₹50 lakh. "
        "The paper trail matters more than the wording of any single letter.\n\n",

    "insurance-ombudsman-india-guide":
        "## The short answer\n\n"
        "**The Insurance Ombudsman is free, requires no lawyer, and can award up to ₹50 lakh against the insurer.** "
        "File after the insurer rejects your written complaint, stays silent for a month, or replies in a way you do not accept — and within one year of that point. "
        "The award binds the insurer; if it is not paid within 30 days, Rule 17(6) requires ₹5,000 for each day of delay.\n\n",

    "health-insurance-pre-existing-disease-waiting-period-guide-2026":
        "## The short answer\n\n"
        "**A pre-existing disease is one diagnosed, treated or advised on before the policy began, and it becomes payable after the waiting period in your wording — capped at 36 months under IRDAI's framework.** "
        "Disputes are almost always about the date of first diagnosis, and the document that settles them is the earliest prescription, not the discharge summary.\n\n",

    "irdai-claim-settlement-regulations-2026-30-day-rule-standardized-forms":
        "## The short answer\n\n"
        "**Thirty days is the clock.** A claim must be settled within 30 days of the insurer receiving the last necessary document, or 45 days where an investigation is warranted. "
        "Beyond that, IRDAI's Protection of Policyholders' Interests Regulations, 2017 require interest at 2% above the RBI bank rate, running from the date the last document was received.\n\n",

    "lic-claim-status-check-online":
        "## The short answer\n\n"
        "**A claim status is not a decision.** Track the file with the claim reference LIC issued when it registered the claim; if the status has not moved in three weeks, ask in writing for the current stage and the officer holding the file. "
        "Once a written grievance goes unanswered for 14 days, the Bima Bharosa route opens.\n\n",

    "lic-policy-revival-complete-guide-2026":
        "## The short answer\n\n"
        "**A lapsed LIC policy can usually be revived on payment of arrears with interest, often on a declaration of good health alone** — commonly within five years of the first unpaid premium, depending on the plan. "
        "Revival restarts the three-year clock under Section 45, which matters far more than the interest you pay.\n\n",

    "term-insurance-comparison-hub-2026":
        "## The short answer\n\n"
        "**Compare term plans in this order: the claim record the insurer publishes, the exclusions and the suicide clause, the premium guarantee period, and the process for a death claim.** Price comes last. "
        "A term plan is worth exactly what its claim process pays, and a family discovers that only once.\n\n",

    "health-insurance-hub-complete-2026-guide":
        "## The short answer\n\n"
        "**Almost every health insurance dispute in India resolves on four things: the waiting period, the room-rent limit, the disclosure at proposal, and the clock the insurer has to keep.** "
        "The clock is 30 days to settle from the last document, 14 days to answer a grievance, one hour to authorise a planned admission, and three hours at discharge.\n\n",
}

# Posts whose body is supplied by src/content/blog/*.md (PILLAR_CONTENT), not blogs.json.
SKIP_LEAD = {
    "claim-recovery-hub-complete-2026-guide",
    "lic-policy-hub-complete-guide-2026",
}

DATA_POST = "insurance-claim-rejection-rate-india-2026-data"

DATA_CONTENT = """## The short answer

**There is no single, official "claim rejection rate" for India that you can apply to your own claim, and any page quoting one to two decimal places is guessing.** What IRDAI publishes is claim settlement data at insurer and portfolio level, in its annual report and in insurers' own regulatory disclosures. Read those, and read them for the number of claims repudiated — not for a headline percentage.

| What is published | Where | What it tells you |
|---|---|---|
| Claims paid, repudiated, pending — by insurer | IRDAI Annual Report | The size of the repudiation bucket for that insurer |
| Claim settlement ratio, life and non-life | Insurer's public disclosures | Settled as a share of decided claims |
| Grievances received and resolved | IRDAI and insurer disclosures | Whether complaints are being closed or answered |
| Ombudsman awards against an insurer | Ombudsman annual report | How often an independent forum disagreed |

## Why a rejection-rate table is a trap

Three structural problems sit under every "rejection rate" table you will find:

1. **The denominator moves.** A rate computed on decided claims excludes pending and withdrawn claims; computed on all claims received, it counts them. Two insurers can publish very different numbers describing the same conduct.
2. **Repudiation is not the same as short settlement.** A claim that is "settled" may have been paid at 40% of the bill after deductions. The rate says nothing about that, and short settlement is where most of the money actually goes.
3. **Lines of business are blended.** Group health, retail health, motor and personal accident behave differently. A composite figure describes a company, not the product you hold.

## What to look at instead of a rate

- **Repudiated claim counts**, year on year, for the insurer you are considering — from its own disclosures.
- **The wording of the exclusions and sub-limits.** These decide more claims than any service metric.
- **Ombudsman orders against that insurer** in the Ombudsman annual report — a public record of disputes an independent forum resolved against the company.
- **The grievance numbers**: complaints received, and the share disposed within the regulatory timeline.

## If your claim has already been refused

The rate is now irrelevant; the ground is everything:

1. Ask for the rejection in writing, with the clause.
2. Write to the Grievance Redressal Officer — 14 days to resolve.
3. Escalate to IRDAI Bima Bharosa if it is not resolved.
4. File with the Insurance Ombudsman within one year of the final reply — free, up to ₹50 lakh.

The [rejection rights guide](/blog/health-insurance-claim-rejection-rights-2026/) has the documents for each step, and the [escalation cluster](/guides/escalation/) has the rest of the route.

## FAQ

**Q: What is the claim rejection rate in India?**

IRDAI does not publish a single national figure of that kind. Its annual report and insurers' disclosures give claim counts by insurer — paid, repudiated, pending — which is what any serious answer has to be built from.

**Q: Which insurer rejects the fewest claims?**

The ranking changes year to year, and it is computed on the population of claims an insurer happens to receive. Use the insurer's disclosed repudiation count alongside its grievance record and Ombudsman orders rather than a single percentage.

**Q: Is a 95% claim settlement ratio good?**

It is a settled-to-decided ratio, so it counts a claim paid at 30% of the bill as settled. Read it with the average settlement amount and the room-rent and sub-limit terms of the product you are buying.

**Q: Where can I check an insurer's record myself?**

IRDAI's annual report, the insurer's public disclosures under IRDAI's transparency requirements, and the Insurance Ombudsman annual report. All three are free.

**Q: Does a rejection rate tell me whether my claim will be paid?**

No. Your claim is decided on your policy wording and the facts of your admission. The rate describes an insurer's portfolio, not your file.
"""


def main() -> int:
    data = json.loads(BLOGS.read_text())
    by_slug = {p["slug"]: p for p in data}

    stripped = 0
    total_removed = 0
    for post in data:
        content = post.get("content") or ""
        if not content:
            continue
        new, n = strip_invented(content)
        if n:
            post["content"] = new
            stripped += 1
            total_removed += n

    leads = 0
    for slug, lead in LEADS.items():
        post = by_slug.get(slug)
        if not post or slug in SKIP_LEAD:
            print(f"skip lead: {slug} (not in blogs.json or md-driven)")
            continue
        content = post.get("content") or ""
        if "## The short answer" in content[:400]:
            print(f"lead already present: {slug}")
            continue
        post["content"] = lead + content.lstrip()
        post["modifiedDate"] = "2026-11-12"
        leads += 1

    dp = by_slug.get(DATA_POST)
    if dp:
        dp["content"] = DATA_CONTENT
        dp["summary"] = ("There is no single official claim rejection rate for India. What IRDAI "
                         "publishes, what the numbers hide, and what to read instead.")
        dp["modifiedDate"] = "2026-11-12"

    BLOGS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print(f"\nstripped invented claims: {total_removed} edits across {stripped} posts")
    print(f"answer-first leads added: {leads}")
    print(f"data page rewritten: {bool(dp)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
