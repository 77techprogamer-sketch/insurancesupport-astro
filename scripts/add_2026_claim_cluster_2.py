#!/usr/bin/env python3
"""
Part two of the 2026 claim-recovery cluster: Section 45, settlement interest,
claim-agency fees, and NRI claims.
"""
import json
import sys
from pathlib import Path

BLOGS = Path("src/data/blogs.json")
DATE = "2026-11-12"
AUTHOR = "Hari Kotian"

ARTICLES = []

# ---------------------------------------------------------------------------
# 3. Section 45
# ---------------------------------------------------------------------------
ARTICLES.append({
    "slug": "section-45-insurance-act-three-year-rule-2026",
    "title": "Section 45, Insurance Act: The Three-Year Rule Explained",
    "date": DATE,
    "categories": ["Life Insurance", "Claim Recovery", "Legal"],
    "summary": "After three years, a life insurance policy cannot be called into question on any ground. What Section 45 actually says, what the insurer has to prove within the window, and how the clock is calculated after a revival.",
    "author": AUTHOR,
    "tags": [
        "section 45 insurance act",
        "three year rule life insurance",
        "incontestability clause india",
        "death claim repudiation",
        "misstatement material fact",
        "policy revival contestability",
        "insurance laws amendment act 2015",
    ],
    "content": """## The short answer

**Section 45 of the Insurance Act, 1938 says that after three years from the date of issue, revival, or rider addition — whichever is later — a life insurance policy cannot be called into question on any ground whatsoever.** Within those three years the insurer may still repudiate, but only on the grounds of fraud or of a misstatement or suppression of a material fact, only with written reasons, and with the burden of proof on the insurer.

For any policy issued after March 2015, that is the statutory position. Every death-claim rejection letter that says "non-disclosure" long after the third anniversary is arguing against the text of the Act, and usually against a body of case law as well.

| Feature | Before the 2015 amendment | After the 2015 amendment |
|---|---|---|
| Contestability period | Two years | Three years |
| Grounds within the window | Misstatement, suppression, fraud | Fraud, or misstatement/suppression of a material fact |
| After the window | Insurer could still allege fraud | No policy shall be called in question on any ground whatsoever |
| Written reasons | Not always given | Mandatory, with the insurer's basis stated |
| Revival | Courts generally held the clock did not restart | The clock restarts from the date of revival |
| Burden of proof | On the insurer | Still on the insurer, and it is a heavy one |

## Why the date matters more than the argument

In a Section 45 dispute, the first question is not "did you disclose?" It is "when did the three years expire?"

Take a policy issued on 14 June 2021, with a premium that lapsed in 2023 and was revived on 2 August 2024. The insured died on 11 May 2026. Three years from revival run to 2 August 2027, so at the date of death the policy was still inside the contestability window and the insurer can examine the revival declaration.

Now change one fact: no lapse, no revival. Three years from issue expired on 14 June 2024. The death in May 2026 is outside the window, and the insurer cannot call the policy into question at all.

Same family, same documents, opposite answer — because of a date.

## What the insurer must show inside the window

Section 45(2) allows repudiation on two grounds, and they are not the same:

- **Fraud** — a deliberate false statement, made knowing it was false.
- **Misstatement or suppression of a material fact not amounting to fraud** — an incorrect or withheld fact that mattered to the decision to insure.

"Material" has a specific meaning: it must relate to the life expectancy of the insured, and the insurer must show it would have made a different decision — declined the risk, loaded the premium, or imposed terms — had it known. A minor ailment that no underwriter would have cared about is not material, however many pages the rejection letter spends on it.

Three practical points follow:

1. **The duty runs both ways.** Under IRDAI's Protection of Policyholders' Interests Regulations, 2017 the disclosure obligation applies to the insurer as much as to the proposer. The questions asked in the proposal form define the scope of the duty. A fact the form never asked about is not usually a misstatement.
2. **An agent's omission is not automatically yours.** Where the agent filled the form and the proposer signed without reading, the insurer must show the proposer knew the statement was wrong. Courts have repeatedly refused to let insurers profit from their own distribution channel's carelessness.
3. **Refund is part of the remedy.** If the policy is repudiated within three years, the premiums paid from commencement to repudiation must be refunded. The rejection letter often omits this. Ask for it.

## What insurers still try after three years

Insurers do not ignore Section 45, but they test its edges. The three arguments you will meet:

| Their argument | The answer |
|---|---|
| "Fraud is outside Section 45" | Section 45(3) places the fraud ground *within* the three-year window and requires it to be communicated in writing therein. After three years the protective bar in Section 45(1) applies |
| "The policy lapsed, so the clock restarted" | Correct — but only if a revival actually happened. A late premium accepted within the grace period is not always a revival; check the insurer's own endorsement |
| "We are not repudiating, we are only investigating" | An investigation that ends in a rejection is a repudiation. Ask for the decision in writing and the clause relied on, so the clock and the reason are both on record |

The strongest version of your case, in most files, is not a long argument about disclosure. It is a one-page note: policy issued on X, three years completed on Y, insured event on Z, Section 45(1) applies, please pay.

## The documents that settle it

- **Policy schedule** — the issue date and any revival endorsements. This is the single most important page.
- **Premium receipts or bank statements** — proof of continuous payment, and of the revival date if there was one.
- **The proposal and revival forms** — what was actually asked, and what was answered.
- **The repudiation letter** — the date, the ground, and whether reasons were given.
- **The insurer's investigation report**, if they shared it. Ask for it; if they refuse, note the refusal.

If the policy was revived, get the revival endorsement and the health declaration signed at revival. The clock runs from that declaration, and so does the disclosure duty for anything asked in it.

## Where Section 45 does not help

Section 45 is a life insurance provision. It does not apply to health, motor, or property insurance, where a non-disclosure rejection is fought on the contract wording, the proposal form, and IRDAI's policyholder regulations instead. If your file is a health claim, the [health claim appeal guide](/blog/health-insurance-claim-rejection-rights-2026) is the right starting point.

It also does not create cover. If the insured event falls within an exclusion — suicide in the first twelve months, for example — Section 45 has nothing to say about it, because the question is not whether the policy can be called into question but what the policy covers.

## FAQ

**Q: Does Section 45 mean my claim is automatically paid after three years?**

Not automatically, but the insurer's ability to question the policy is gone. What remains is whether the event falls within the cover and whether the claim documents are complete. Section 45 removes the non-disclosure defence; it does not remove the need to prove the death and the policy.

**Q: Does the three-year clock restart when a lapsed policy is revived?**

Yes. Under the amended Section 45, the three years run from the date of revival where the policy was revived, and from the later of issue, revival, or rider addition. This is the one part of the section that works against policyholders, and insurers rely on it.

**Q: What if the policy was issued before 2015?**

The old two-year rule applies to policies issued before the amendment came into force in March 2015, though the fraud exception under the old text continued to apply after the period. Older policies are argued on the pre-amendment text and the case law under it.

**Q: Can an insurer withhold the death claim and simply keep investigating?**

No. IRDAI's timelines require investigation to be completed within 30 days of the last necessary document, and the claim to be settled or rejected within 45 days where investigation is warranted. An open-ended investigation with no written decision is itself a grievance.

**Q: Do I get my premiums back if the policy is repudiated within three years?**

Yes. Where a policy is repudiated within the contestability window, the premiums paid from commencement until repudiation must be refunded. Askfor it in writing as part of the same grievance; it is frequently left out of the settlement.

**Q: Is the three-year bar the same for health insurance?**

No. Section 45 covers life insurance only. Health policies are governed by the contract, the moratorium provisions in IRDAI's health insurance framework, and the general law on misrepresentation.

---

**Section 45 disputes turn on dates, not adjectives.** If a death claim has been repudiated on non-disclosure grounds, [send the policy dates and the rejection letter for a free review](/contact) — and see how the same rule plays out in [LIC rejection appeals](/blog/lic-claim-rejection-appeal-process-2026).
""",
})

# ---------------------------------------------------------------------------
# 4. Interest on delayed settlement
# ---------------------------------------------------------------------------
ARTICLES.append({
    "slug": "interest-on-delayed-insurance-claim-settlement-2026",
    "title": "Interest on a Delayed Insurance Claim: What You're Owed",
    "date": DATE,
    "categories": ["Claim Recovery", "IRDAI", "Grievance Redressal"],
    "summary": "Insurers owe interest at 2% above the RBI bank rate when a claim is settled late — and the clock runs from the last document you submitted, not from the day they decided to move. How to compute it and claim it.",
    "author": AUTHOR,
    "tags": [
        "interest on delayed claim",
        "irdai ppi regulations 2017",
        "claim settlement timeline",
        "2% above bank rate",
        "delayed insurance claim",
        "30 day settlement rule",
        "claim compensation",
    ],
    "content": """## The short answer

**IRDAI's Protection of Policyholders' Interests Regulations, 2017 require a claim to be settled within 30 days of the insurer receiving the last necessary document, or 45 days where the insurer says an investigation is warranted. Beyond that, the insurer must pay interest at 2% above the RBI bank rate, calculated from the date the last document was received until the date of actual payment.**

Read that last clause again. The interest is not for the days of delay. It runs for the whole period from the last document to payment. A claim settled on day 47 of a 30-day timeline earns interest for 47 days, not 7.

Almost no policyholder asks for this. It is not a favour or a negotiation point; it is a regulation that applies to every insurer in India.

## What the timeline actually is

| Situation | Timeline | Source |
|---|---|---|
| Health claim, no investigation | Settle within 30 days of the last necessary document | IRDAI (PPI) Regulations, 2017, Reg 10 |
| Health claim where investigation is warranted | Complete investigation within 30 days, settle or reject within 45 days | IRDAI (PPI) Regulations, 2017, Reg 10 |
| Motor claim | Surveyor report, then settlement offer or written rejection within 30 days of the report | IRDAI (PPI) Regulations, 2017 |
| Payment after you accept the settlement offer | Within 7 days of your acceptance | IRDAI (PPI) Regulations, 2017 |
| Delay beyond the above | Interest at 2% above bank rate, from receipt of the last necessary document to payment | IRDAI (PPI) Regulations, 2017 |
| Maturity, survival benefit, annuity | Paid on or before the due date; interest if late | IRDAI (PPI) Regulations, 2017 |

"Bank rate" means the RBI bank rate fixed at the beginning of the financial year in which the claim fell due — so the rate is fixed for your claim, and does not move with later policy decisions. Check the current figure on the RBI website; the regulation tells you exactly which date to use.

## How to compute it

The arithmetic is simple enough to do on one sheet of paper, which is also the reason it is persuasive.

1. **Start date** — the date the insurer received the last document it asked for. Not the date of the claim, not the date of the survey.
2. **End date** — the date the money actually reached your account.
3. **Days** — count both ends, use a date calculator, and write the number down.
4. **Rate** — RBI bank rate at the start of the financial year in which the claim fell due, plus 2%. An illustrative rate of 6.5% would give 8.5% per annum.
5. **Amount** — claim amount x rate x days / 365.

On a Rs 4,00,000 claim settled 90 days after the last document at an illustrative 8.5%, that is roughly Rs 8,400. On a Rs 12,00,000 claim settled after a year, it runs into six figures.

Do the calculation with the actual rate and keep the sheet. A claim for a stated figure with a stated method is answered differently from a complaint that says "you took too long".

## Asking for it without turning the claim into a fight

Ask in the same letter that accepts the settlement, or in a short separate letter after payment. Two paragraphs are enough:

> Your settlement of Rs [amount] was credited on [date]. The last necessary document was received by you on [date]. Under Regulation 10 of the IRDAI (Protection of Policyholders' Interests) Regulations, 2017 read with the IRDAI Master Circular dated 5 September 2024, the claim was required to be settled within 30 days of that date, and interest at 2% above the bank rate is payable from that date until payment.
>
> I therefore request payment of Rs [computed] as interest for [n] days at [rate]% per annum. A computation sheet is enclosed. If this is not paid within 15 days, I will place the matter before IRDAI Bima Bharosa and the Insurance Ombudsman as part of the same grievance.

Do not refuse the principal amount while you argue about interest. Take the money, note on the discharge voucher that interest remains outstanding, and pursue it separately. Signing "full and final settlement" without a reservation is what makes interest claims disappear.

## When the insurer refuses

Three routes, in ascending order of effort:

1. **Grievance Redressal Officer.** The insurer must respond within 14 days under IRDAI's September 2024 Master Circular. Put the computation in front of them; claims teams often approve interest rather than escalate a file that has the regulation quoted at them.
2. **IRDAI Bima Bharosa.** A complaint about delay and non-payment of interest goes on the insurer's record. It does not decide your case, but it gets a response. The [filing steps are here](/blog/irdai-bima-bharosa-complaint-filing-2026).
3. **Insurance Ombudsman.** An Ombudsman can award the claim amount and interest as part of the relief, up to Rs 50 lakh per complaint. The [Ombudsman guide](/blog/insurance-ombudsman-india-guide) covers eligibility and the one-year window.

A consumer commission can also award interest and compensation for deficiency in service, and there is no Rs 50 lakh cap there — relevant only if your claim is large or the insurer has ignored an award.

## The two deadlines people miss

**The 7-day payment window.** After you accept a settlement offer, payment is due within seven days. Insurers regularly take three weeks and call it processing. Those three weeks are your interest period.

**The last-document trap.** Insurers sometimes ask for "one more document" after the claim is otherwise complete — a fresh KYC, a cancelled cheque, an indemnity bond. Each such request resets the 30-day clock on paper, which is why the date of each request and each submission should be recorded. If a document was never required by the policy or the regulation, say so in writing and do not let the clock restart silently.

## What this does not cover

Interest compensates for the time your money was withheld. It is not damages for mental agony, and it is not a penalty on the insurer. Where the conduct has been worse than slow — a rejection without reasons, repeated demands after an award, a deliberate misreading of the policy — the Ombudsman and consumer commissions can award compensation separately, and that is a different ask in the same complaint.

Tax treatment of interest received follows your overall income; ask your chartered accountant rather than assuming it is tax-free because the principal claim was.

## FAQ

**Q: How much interest must an insurer pay for a delayed claim?**

2% above the RBI bank rate, from the date the insurer received the last necessary document until the date of payment, under Regulation 10 of the IRDAI (Protection of Policyholders' Interests) Regulations, 2017.

**Q: Is interest payable only for the days beyond 30?**

No. The regulation computes interest from the date of receipt of the last necessary document, so the entire period is counted, not just the excess days.

**Q: Which bank rate applies to my claim?**

The RBI bank rate fixed at the beginning of the financial year in which the claim fell due. That date is fixed for your claim, so later changes to the repo rate do not alter the calculation.

**Q: Can I claim interest if I already accepted the settlement amount?**

Yes, if you did not sign a discharge in full and final settlement. Accept the principal, record in writing that interest remains outstanding, and pursue it separately.

**Q: Does the 30-day clock restart every time the insurer asks for a document?**

It restarts only for documents that were genuinely necessary. A demand for documents already submitted, or for documents the policy never required, is delay and should be answered in writing with the earlier submission referenced.

**Q: Can I get interest on a claim the insurer rejected and later paid after the Ombudsman's award?**

Yes. Interest can be claimed as part of the Ombudsman complaint itself, and where the award is not complied with, the daily Rs 5,000 penalty under Rule 17(6) of the Ombudsman Rules applies separately.

---

**The regulation is on your side and the arithmetic takes ten minutes.** If a claim has been sitting with an insurer, [send us the dates and the last document you submitted](/contact) and we will tell you whether interest is due and what it comes to.
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
