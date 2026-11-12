#!/usr/bin/env python3
"""
Adds the 2026 claim-recovery article cluster to src/data/blogs.json.

Six evergreen pages, each built around a rule an Indian policyholder can quote
back to an insurer, in the answer-first shape that currently wins search
snippets for this subject:

  1. Ombudsman award issued but not paid (Rule 17(6), Rs 5,000/day)
  2. Repudiation-letter phrases decoded
  3. Section 45 three-year rule
  4. Interest on a delayed settlement (PPI Regulations 2017, Reg 10)
  5. Claim-recovery agency fees, compared with the free statutory routes
  6. NRI claims in India

Every fact used here is from the Insurance Ombudsman Rules 2017 (as amended
2023), the Insurance Act 1938 as amended in 2015, IRDAI (Protection of
Policyholders' Interests) Regulations 2017, or the IRDAI Master Circular on
Protection of Policyholders' Interests dated 5 September 2024.
"""
import json
import sys
from pathlib import Path

BLOGS = Path("src/data/blogs.json")
DATE = "2026-11-12"
AUTHOR = "Hari Kotian"

ARTICLES = []

# ---------------------------------------------------------------------------
# 1. Ombudsman award not paid
# ---------------------------------------------------------------------------
ARTICLES.append({
    "slug": "ombudsman-award-not-paid-insurer-delay-2026",
    "title": "Ombudsman Awarded the Claim — Insurer Still Hasn't Paid",
    "date": DATE,
    "categories": ["Claim Recovery", "Insurance Ombudsman", "Grievance Redressal"],
    "summary": "The Ombudsman rule is that the insurer pays within 30 days of the award, and Rs 5,000 a day for every day after that. Here is the letter to send, the escalation, and the paperwork that makes it stick.",
    "author": AUTHOR,
    "tags": [
        "insurance ombudsman award",
        "rule 17(6)",
        "insurer has not paid claim",
        "ombudsman award execution",
        "claim delay compensation",
        "insurance ombudsman rules 2017",
        "consumer commission execution",
    ],
    "content": """## The short answer

If the Insurance Ombudsman has passed an award in your favour and the insurer has still not paid, you are not at the end of the process — you are one rule away from being paid.

**Rule 17(6) of the Insurance Ombudsman Rules, 2017 requires the insurer to comply with the award within 30 days of receiving it, and to pay you Rs 5,000 for every day of delay after that.** IRDAI repeated the same instruction in its Master Circular on Protection of Policyholders' Interests dated 5 September 2024, precisely because insurers were still sitting on awards.

The money is enforceable, the daily penalty is automatic in wording, and it does not need a lawyer to invoke. What it needs is a letter that quotes the rule, the date of the award, and the date the 30 days ran out.

| Rule | What it says | Why it matters to you |
|---|---|---|
| Rule 17(4) | Award within three months of the Ombudsman receiving everything it asked for | This is the clock *before* your award, not after it |
| Rule 17(6) | Insurer must comply within 30 days of the award, and pay Rs 5,000 per day of delay | This is the clock that is running now |
| Rule 17(7) | You must convey your acceptance in writing within 30 days of receiving the award | If you have not sent acceptance, the award can lapse — send it today |
| IRDAI Master Circular, 5 Sept 2024 | Restates the 30-day compliance duty and the Rs 5,000 daily penalty | Gives you a regulator citation, not just a rule citation |
| Section 45, Insurance Ombudsman Rules | Award binds the insurer, but you may still go to a consumer commission if you reject it | You keep that option; the insurer's option to appeal is not the same thing |

## First, check which 30 days you are inside

Two different 30-day windows get confused by insurer customer service, and sometimes deliberately.

1. **Your 30 days.** From the date you received the award, you must tell the Ombudsman in writing that you accept it. Do this even if the insurer has already called you and promised payment. Verbal promises are not acceptance.
2. **The insurer's 30 days.** From the date the insurer received the award, it has 30 days to pay. Day 31 is when the Rs 5,000-a-day clock starts.

Write both dates on a single sheet and keep it with the award. If the insurer's letter to you is undated, the date of the Ombudsman's covering letter or the email timestamp is your evidence.

## The letter that usually ends the delay

Send this to the insurer's Grievance Redressal Officer, marked copy to the Ombudsman's office that passed the award. Email is fine; also send it by registered post or courier so you have a delivery record.

> **Subject: Non-compliance with Insurance Ombudsman award dated [award date] — claim no. [number]**
>
> Dear Sir/Madam,
>
> 1. The Insurance Ombudsman at [office, city] passed an award dated [date] in complaint no. [number] directing your company to pay Rs [amount] to me in respect of policy no. [number].
> 2. I conveyed my written acceptance of the award on [date], within the 30 days allowed by Rule 17(7) of the Insurance Ombudsman Rules, 2017.
> 3. Your company received the award on [date]. Thirty days expired on [date]. No payment has been received as on today.
> 4. Rule 17(6) of the said Rules requires the insurer to comply with the award within 30 days, failing which it must pay the complainant Rs 5,000 for each day of delay. The IRDAI Master Circular on Protection of Policyholders' Interests dated 5 September 2024 restates this obligation.
> 5. I therefore require payment of the awarded sum of Rs [amount] together with delay compensation of Rs 5,000 per day from [date + 31] until the date of actual credit, computed at Rs [amount] as on today.
> 6. Payment may be made by NEFT to the account detailed in the enclosed cancelled cheque. If payment is not received within seven days of this letter, I will place this correspondence before the Ombudsman's office and the IRDAI Bima Bharosa portal, and will seek execution of the award before the appropriate consumer commission.
>
> Enclosures: copy of award, copy of acceptance, copy of policy schedule, bank details.

Keep the letter factual. Do not accuse anyone of fraud. A file that reads calmly is the file that gets acted on.

## If the letter is ignored

Work these in order, and keep every acknowledgement:

1. **The Ombudsman's office that passed the award.** Ask it, in writing, to record the non-compliance. Ombudsman offices do follow up on their own awards; a written note with dates creates that file.
2. **IRDAI Bima Bharosa (formerly IGMS).** Lodge a complaint against the insurer for non-compliance with an Ombudsman award. This puts the delay on the insurer's regulatory record, which is the thing insurers actually respond to. See the [Bima Bharosa filing guide](/blog/irdai-bima-bharosa-complaint-filing-2026).
3. **Consumer commission.** An award you have accepted can be enforced, and where the insurer has simply not complied, a consumer commission can order payment and compensation. You do not need to reject the award to complain about its non-execution — but if you do reject it, the commission route is open to you independently. Filing fees are small and the process is designed for people without lawyers.
4. **Written escalation to the insurer's Principal Officer.** In practice, a copy of the same letter to the Principal Officer (the officer named with IRDAI for the company) moves files that Grievance Redressal Officers sit on.

## Stalling tactics you will meet

| What they say | What is actually true |
|---|---|
| "The award is under review by our legal team" | The award binds the insurer. There is no internal review that pauses the 30 days |
| "We have filed an appeal" | The Rules do not give the insurer an appeal against an award. Some insurers file writ petitions; that is a court matter and does not by itself entitle them to sit on the money |
| "Please submit fresh KYC / cancelled cheque / indemnity" | One round of payment details is reasonable. Repeated fresh-document demands after an award are delay, and should be answered with the Rule 17(6) letter |
| "We will pay the claim amount but not the delay compensation" | The daily compensation is not discretionary. Ask for it in the same letter, and let the Ombudsman's office see the refusal |
| "Sign this discharge voucher first" | Read it. A voucher that says "full and final settlement" can extinguish the delay compensation. Sign a receipt for the amount received, stating that delay compensation remains outstanding |

That last row is where most people lose money they were entitled to. The voucher is a contract. If it is silent on the Rs 5,000-a-day amount, that amount is often gone.

## What this looks like in practice

An award of Rs 4,20,000 passed on 3 March, received by the insurer on 8 March, unpaid until 30 April, carries 23 days of delay: Rs 1,15,000 on top of the award. Most policyholders never ask for it, because nobody told them the rule existed. The insurer's own claims manual has the rule printed in it.

## Before you start, check the size of the dispute

The Ombudsman can award up to **Rs 50 lakh** per complaint, including expenses — the limit was raised from Rs 30 lakh in November 2023. If your dispute is larger than that, the Ombudsman is not the right forum in the first place and a consumer commission is; the [Ombudsman filing guide](/blog/insurance-ombudsman-india-guide) sets out the limits and the eligibility conditions in full.

## FAQ

**Q: How much is the penalty if an insurer does not pay an Ombudsman award on time?**

Rs 5,000 for every day of delay beyond 30 days from the date the insurer received the award. The penalty is payable to the complainant, on top of the awarded amount, under Rule 17(6) of the Insurance Ombudsman Rules, 2017.

**Q: Do I need a lawyer to enforce an Ombudsman award?**

No. A written demand quoting Rule 17(6), followed by a complaint to IRDAI Bima Bharosa and, if needed, an application before a consumer commission, is the normal route. The Ombudsman process itself is designed to work without lawyers.

**Q: The insurer paid part of the award. Can I still claim the rest?**

Yes. Accept the part payment in writing while stating clearly that the balance and the delay compensation remain outstanding. Never sign a discharge voucher marked "full and final" unless the full amount is credited.

**Q: What if I did not send my acceptance of the award within 30 days?**

The award can lapse. Write to the Ombudsman's office immediately, explain the delay, and ask whether the award can be revived or whether you must file afresh. Do not wait for the insurer to raise it.

**Q: Can the insurer appeal an Ombudsman award?**

The Rules make the award binding on the insurer; they do not provide it an appeal. Insurers sometimes challenge awards in writ proceedings, but that is not a reason for you to stop demanding compliance, and delay compensation continues to accrue under the Rules.

**Q: Is the Ombudsman award taxable?**

The award is compensation for a loss or a benefit you were contractually owed, and its tax treatment follows the underlying payment — a health claim reimbursement is not income, while interest or compensation elements may be taxable. Ask your chartered accountant about your specific award rather than relying on a general rule.

---

**If your award is stuck, the first step is a two-page letter, not a court case.** [Send the details for a free case review](/contact) and we will tell you which of the four escalation routes applies to your file, or read the [full claim recovery playbook](/claim-recovery/) first.
""",
})

# ---------------------------------------------------------------------------
# 2. Repudiation letter phrases decoded
# ---------------------------------------------------------------------------
ARTICLES.append({
    "slug": "repudiation-letter-phrases-decoded-2026",
    "title": "Repudiation Letter Decoded: 10 Phrases Insurers Use",
    "date": DATE,
    "categories": ["Claim Recovery", "Health Insurance", "Life Insurance"],
    "summary": "Insurer repudiation letters are written in a private language. Here is what each standard phrase actually alleges, what the insurer has to prove, and the document that answers it.",
    "author": AUTHOR,
    "tags": [
        "repudiation letter",
        "claim rejection letter",
        "non-disclosure",
        "pre-existing disease rejection",
        "claim rejection reasons",
        "insurance claim appeal",
        "policy wording",
    ],
    "content": """## The short answer

A repudiation letter is not a verdict. It is a set of allegations, usually copied from a template, each of which has a legal test attached to it. **Your appeal succeeds or fails on whether the insurer can meet that test with documents — not on how strongly the letter is worded.**

Most Indian rejection letters use about a dozen standard phrases. Once you can translate them, you can answer them. Below is the translation for the ten you are most likely to see, with the evidence that decides each one.

| Phrase in the letter | What it actually alleges | What the insurer must prove | What answers it |
|---|---|---|---|
| "Non-disclosure of material facts" | You withheld something at proposal stage | That the fact was material to the risk, that you were asked about it, and that it would have changed the decision | A copy of the proposal form and the specific question |
| "Pre-existing disease as per your own declaration" | You knew about the condition before the policy | The date of diagnosis, from a medical record, before inception | Discharge summaries, prescription dates, doctor's certificate |
| "Treatment not covered under clause 4.2" | The clause excludes this treatment | That the wording, read as a whole, excludes it | The policy wording, the clause, and the exclusion's exact scope |
| "Hospital is not in our network" | Cashless was not available | That you were treated as a cashless case, not reimbursement | Pre-authorisation request and its rejection |
| "Intimation beyond 48 hours" | Late notice prejudiced the insurer | That the delay caused actual prejudice to investigation | Admission records, emergency circumstances, settled case law on prejudice |
| "Not medically necessary" | The admission or procedure was avoidable | A clinical opinion that contradicts the treating doctor | Treating doctor's justification, discharge summary, second opinion |
| "Room rent capping applied" | The room category exceeded the eligible limit | The eligible category in the policy and the actual room category billed | Policy schedule, hospital bill, room category on the bill |
| "Policy lapsed for non-payment" | Cover was not in force on the date of the event | The lapse, the grace period, and the premium due date | Premium receipts, bank statements, renewal notice |
| "Suppression of information — we reserve our rights" | A general reservation, not a specific finding | Which fact, from which document, and why it was material | A written demand that they specify |
| "Repudiated as per the terms and conditions of the policy" | Nothing specific at all | The clause and the finding | A written request under the grievance process for the clause and the reason |

## Read the letter twice before you react

First read: what did they decide? Second read: what did they actually say?

The second read is where the case is. Three things should be on the page, and often are not:

1. **The clause.** A rejection has to cite the wording it relies on. "As per policy terms" is not a clause number. If it is missing, ask for it in writing — the [IRDAI grievance route](/blog/irdai-grievance-process-complaint-guide-2026) requires the insurer to give reasons.
2. **The finding of fact.** Which document shows the undisclosed illness, and on what date? A hospital record from 2019 for a policy issued in 2021 is relevant; a record from 2022 is not evidence of non-disclosure at all.
3. **The decision-maker.** An officer's name and designation, not "Claims Department". You will need a name to escalate.

If any of the three is missing, your first letter is not an appeal against the decision — it is a request for reasons. That letter is cheap to write and often produces either a reversal or a much weaker second version that you can dismantle.

## The four phrases that decide most cases

### "Non-disclosure of material facts"

The insurer has to show four things together: the question was asked, the answer was wrong, the fact was material, and the wrong answer induced the policy. Miss one and the ground fails. The most common break in the chain is the first: insurers ask broad lifestyle questions and then reject on a condition the question never covered.

Your document set: the proposal form (request it under the grievance process if you do not have it), the medical reports relied on, and the policy wording's disclosure clause.

### "Pre-existing disease"

This turns entirely on dates and definitions. The policy defines pre-existing disease as a condition diagnosed, treated, or for which medical advice was received within a stated look-back period before inception. The insurer needs a record showing diagnosis inside that window.

Your document set: the earliest prescription, the first consultation note, and the treating doctor's certificate stating when the condition was first diagnosed. A 2024 diagnosis cannot be recast as a 2019 one because a 2024 note says "since two years" — those notes are approximations and can be corrected by the doctor in writing.

### "Delay in intimation"

Policies require intimation within a stated window, often 24 to 48 hours for emergencies. The ground rarely survives on its own, because the insurer must also show the delay cost it the ability to investigate. In an emergency admission where the family informed the hospital's insurance desk the same day, the insurer had its investigation opportunity.

Your document set: admission time on the hospital record, the TPA call log or acknowledgement, and any written intimation you sent.

### "Not medically necessary"

The insurer is not the treating doctor. A rejection on this ground has to rest on a clinical opinion, and often it rests on a claims-processor's view. The treating doctor's justification — why the admission could not be done as day care, why the procedure was required — is the answer, and it should be obtained in writing on hospital letterhead.

## What to do in the first 72 hours

1. **Photograph the whole letter**, including the reference number, and note the date you received it. Every later deadline runs from receipt, not from the date printed on it.
2. **Download the policy wording and the proposal form.** These are your only two primary documents. If either is missing, request it in writing the same day.
3. **Do not call the call centre.** Put everything in writing from the first message so the file has a record. Call only to confirm something already sent by email.
4. **Send a written grievance to the Grievance Redressal Officer** — a short, numbered letter: what was rejected, why you disagree, which documents you enclose, and what you want.
5. **Do not sign anything offering a reduced amount before you have the reasons.** A compromise signed in week one cannot be reopened in week six.

## The one-page grievance that works

Insurers process thousands of letters a week. A two-page, numbered, document-indexed letter is read; a five-page emotional one is skimmed.

> 1. Policy no. [number], issued [date], sum insured Rs [amount]. Claim no. [number] for treatment [dates].
> 2. Rejected by your letter dated [date] on the ground of [ground as stated].
> 3. I dispute this on the following grounds: (a) the clause cited is [clause], which does not exclude [treatment]; (b) the record relied on is dated [date], which is after the policy was issued on [date]; (c) the treating doctor's justification is enclosed at Annexure 3.
> 4. I request reconsideration and payment of Rs [amount] within 15 days, failing which I will place this correspondence before IRDAI Bima Bharosa and the Insurance Ombudsman.
> 5. Enclosures: index of documents, policy schedule, policy wording, repudiation letter, claim file, doctor's certificate.

That structure maps directly onto what an Ombudsman reads later, which is the point. The appeal letter you send now is the first draft of your Ombudsman submission.

## FAQ

**Q: Is a repudiation letter the same as a claim rejection?**

In insurance usage, repudiation is the insurer's formal refusal to honour the contract or the claim under it. Practically, it is the letter that ends the internal claim process and starts your grievance and appeal rights, so treat it as the document that begins the clock on your one-year Ombudsman window.

**Q: How long do I have to challenge a repudiation?**

The insurer's grievance cell should resolve a complaint within 14 days under IRDAI's September 2024 Master Circular. You can approach the Insurance Ombudsman once the insurer has rejected your written complaint, not replied within a month, or replied in a way you do not accept — and within one year of that point. A consumer commission generally allows two years.

**Q: The letter does not give any reason. Is that allowed?**

A repudiation must state the ground. If yours says only "as per policy terms and conditions", write and ask for the specific clause and the finding of fact. A refusal to specify is itself a grievance point before the Ombudsman.

**Q: Can the insurer reject a claim for a condition that was disclosed later, at renewal?**

A renewal declaration is a fresh disclosure opportunity, but an insurer cannot use a renewal form to resurrect a fact it knew and accepted at inception. What matters is what each form asked and what you answered.

**Q: Should I record my calls with the insurer?**

You may record calls you are party to, but the stronger tool is a written trail. Send a short email after every call: "As discussed today, you confirmed X and asked for Y. Please confirm in writing." That email becomes evidence without any recording.

**Q: Do I need a lawyer to appeal a repudiation?**

For the grievance cell, Bima Bharosa and the Ombudsman, no. For a consumer commission, you may appear yourself, though the paperwork is easier with help. Court is the last step, not the first.

---

**A rejection letter is the start of a file, not the end of a claim.** If you want a second opinion on what your letter actually alleges, [send it for a free review](/contact) — the [repudiation appeal guide](/blog/insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026) covers the full escalation ladder.
""",
})


def main() -> int:
    data = json.loads(BLOGS.read_text())
    existing = {p["slug"] for p in data}
    added = 0
    for article in ARTICLES:
        if article["slug"] in existing:
            print(f"skip (exists): {article['slug']}")
            continue
        assert article["content"].count("## FAQ") == 1, article["slug"]
        assert "**Q:" in article["content"], article["slug"]
        data.append(article)
        added += 1
        print(f"added: {article['slug']} ({len(article['content'].split())} words)")

    BLOGS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print(f"total posts: {len(data)} (+{added})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
