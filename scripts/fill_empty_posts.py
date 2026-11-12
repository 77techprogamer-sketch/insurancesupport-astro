#!/usr/bin/env python3
"""
Fills the six English posts that were published with an empty or stub body,
and strips the invented statistics from their summaries.

These posts were generated as placeholders in an earlier batch. They render at
/blog/<slug>/ with a hero, an author box and a call to action — and nothing in
between. Three of them are also linked from the claim-recovery cluster, so they
were being crawled as thin pages.

Rules applied here:
  - no invented statistics, case counts or success rates
  - every claim traced to the Insurance Ombudsman Rules 2017 (as amended 2023),
    the Insurance Act 1938, IRDAI (Protection of Policyholders' Interests)
    Regulations 2017, or the IRDAI Master Circular of 5 September 2024
  - answer-first opening, source table, steps, FAQ
"""
import json
import sys
from pathlib import Path

BLOGS = Path("src/data/blogs.json")

CTA = "\n---\n\n**Stuck on a specific file?** [Send the rejection letter and policy schedule for a free review](/contact) — you will get a plain answer about whether the decision holds and which route applies.\n"

POSTS = {}

# ---------------------------------------------------------------------------
# 1. LIC claim rejection appeal
# ---------------------------------------------------------------------------
POSTS["lic-claim-rejection-appeal-process-2026"] = {
    "summary": "LIC must give you written reasons for a repudiation. The route runs GRO (14 days), Bima Bharosa, then the Ombudsman within one year — free, and up to Rs 50 lakh.",
    "content": """## The short answer

**LIC cannot reject a death claim without telling you why.** Ask for the rejection in writing with the clause it relies on. Then write to LIC's Grievance Redressal Officer, who must resolve it within 14 days; if that fails, escalate on IRDAI's Bima Bharosa portal, and then to the Insurance Ombudsman — free, no lawyer, within one year of LIC's final reply, for claims up to ₹50 lakh.

The whole ladder is free until the consumer-commission stage. What decides it is not the strength of your feelings about LIC, but whether the ground LIC has cited survives Section 45 of the Insurance Act.

| Stage | Who decides | Deadline | What you send |
|---|---|---|---|
| Written rejection | LIC | Must state grounds | Ask by email if the letter is vague |
| Grievance Redressal Officer | LIC | 14 days to resolve (IRDAI Master Circular, 5 Sept 2024) | Numbered appeal + document index |
| Bima Bharosa | IRDAI portal | No decision power; pushes LIC to respond | Complaint text + all correspondence |
| Insurance Ombudsman | Ombudsman | Award within 3 months of having everything it asked for | Form, affidavit, full file |
| Consumer commission | District/State commission | Two years from the rejection | Same file, plus a legal notice |

## The ground LIC usually cites, and the answer

Almost every LIC repudiation is one of four, and each has a test LIC must satisfy:

- **Non-disclosure or misstatement in the proposal.** Section 45 of the Insurance Act applies. Within three years of issue or revival, LIC may repudiate only on proof of a misstatement of a *material* fact, with written reasons. After three years, the policy cannot be called into question on any ground. If the policy was revived, the clock restarts at the revival date — check the endorsement.
- **Policy lapsed at the date of death.** Premium receipts and bank statements decide this. A payment received within the grace period keeps cover alive; a late acceptance can amount to a revival, which you need to see in writing.
- **Suicide within the first twelve months.** A policy term, not a Section 45 issue. After that window, most policies pay.
- **Fraud or forgery.** LIC must show it with documents, and the burden is on LIC, not on the nominee.

If your policy crossed its third anniversary before the death, the strongest thing you can send is one page: the issue date, the revival date if any, the date of death, and the sentence from Section 45 that bars the challenge.

## The letter that starts it

Send this to LIC's Grievance Redressal Officer, by email and by registered post. Keep the postal receipt.

> **Subject: Repudiation of death claim under policy no. [number] — request for reasons and reconsideration**
>
> 1. Policy no. [number], sum assured Rs [amount], issued [date], [revived on date, if applicable]. The life assured died on [date].
> 2. Claim no. [number] was repudiated by your letter dated [date] on the ground of [ground as stated].
> 3. I dispute the repudiation. [Choose: the policy had run for more than three years from issue/revival, and Section 45 of the Insurance Act, 1938 bars the policy being called in question on any ground; / the fact said to be withheld was never asked in the proposal form, a copy of which is annexed; / the premium due [date] was received by you on [date] within the grace period, as the enclosed receipt shows.]
> 4. I request (a) the specific proposal-form question and document relied on, and (b) reconsideration and payment of Rs [amount] within 15 days, failing which I will approach IRDAI Bima Bharosa and the Insurance Ombudsman.
>
> Enclosures: policy schedule, repudiation letter, claim form, death certificate, medical records, premium receipts, index of documents.

The index of documents matters more than the length of the letter. A claims officer with forty files open reads the numbered one first.

## What to gather before you write

- **Policy schedule and every endorsement** — the issue and revival dates are the whole argument under Section 45.
- **The proposal form** — request it in writing if you do not have it. You cannot answer an allegation about a question you cannot read.
- **Premium receipts or bank statements** — for lapse and grace-period disputes.
- **Claim form (Form 3783), death certificate, hospital records** — the file LIC already has.
- **The repudiation letter** — the date on it, and the date you received it.

## Where people lose time

1. **Accepting a verbal reason.** "The proposal was suppressed" on a phone call is not a repudiation you can appeal. Get it in writing.
2. **Filing at the Ombudsman before writing to LIC.** Rule 14(3)(a) of the Ombudsman Rules expects a written complaint to the insurer first, then a rejection, no reply within a month, or a reply you do not accept.
3. **Missing the one-year window.** The Ombudsman complaint must be filed within one year of LIC's final decision. Diarise the date on the day the letter arrives.
4. **Running two forums at once.** The Ombudsman cannot take a dispute already before a consumer commission or court.
5. **Forgetting the refund.** Where a policy is repudiated inside the contestability window, premiums paid from commencement must be refunded. Ask for it in the same letter.

## FAQ

**Q: How long does a LIC claim rejection appeal take?**

The insurer's grievance cell must resolve a complaint within 14 days under IRDAI's September 2024 Master Circular. The Ombudsman must pass an award within three months of receiving everything it asked for, and LIC must comply within 30 days of the award.

**Q: Do I need a lawyer to appeal a LIC rejection?**

No. The grievance cell, Bima Bharosa and the Ombudsman are all designed to work without one, and the Ombudsman route is free. A lawyer becomes useful at the consumer-commission stage or where the file turns on contested documents.

**Q: Can LIC reject a claim after three years of the policy?**

Section 45 bars a life insurer from calling the policy into question on any ground after three years from issue, revival or rider addition, whichever is later. LIC can still argue that the death falls outside the cover — an exclusion, a lapsed policy — but not that the policy itself was obtained by misstatement.

**Q: What if the policy lapsed and was revived?**

The three-year clock restarts from the revival date. That is the one part of Section 45 that works against policyholders, and the reason the revival endorsement is the first document to find.

**Q: Is the Ombudsman award binding on LIC?**

Yes. The award binds the insurer if you accept it in writing within 30 days. If LIC does not pay within 30 days of the award, Rule 17(6) of the Ombudsman Rules requires it to pay you ₹5,000 for every day of delay.

---

Read the general [LIC rejection appeal guide](/blog/lic-claim-rejection-appeal-guide-2026/) for the insurer-by-insurer picture, the [Section 45 explainer](/blog/section-45-insurance-act-three-year-rule-2026/) for the three-year rule in detail, and the [life and LIC cluster](/guides/life-lic/) for everything else in this area. The [appeal templates PDF](/downloads/appeal-templates.pdf) has the letters already drafted.
""" + CTA,
}

# ---------------------------------------------------------------------------
# 2. ICICI Lombard cashless denial
# ---------------------------------------------------------------------------
POSTS["icici-lombard-cashless-denied-hospital-guide-2026"] = {
    "summary": "A cashless denial is not a claim denial. Get the reason in writing, pay under protest, switch to reimbursement, and escalate — with the IRDAI one-hour and three-hour authorisation rules.",
    "content": """## The short answer

**A refused cashless authorisation does not decide your claim.** It decides only how the hospital gets paid. Ask the desk for the denial in writing, with the reason and the clause; pay under protest if treatment is continuing; then file a reimbursement claim with the same documents. IRDAI's health insurance rules require an authorisation decision within one hour of a request for planned admission, and final authorisation within three hours at discharge — a silent desk is a rule breach, not an answer.

| Moment | What IRDAI requires | What you should have in hand |
|---|---|---|
| Planned admission | Authorisation decision within 1 hour of the request | Pre-authorisation reference number |
| Emergency admission | Intimation to the insurer/TPA, then authorisation | Admission time on the hospital record |
| Discharge | Final authorisation within 3 hours of the request | Itemised bill and discharge summary |
| Denial | Reasons with reference to the policy terms | Written denial with clause and reference |
| Reimbursement | Claim settled within 30 days of the last necessary document | Submission acknowledgement |

## Why cashless gets refused

The reason code matters more than the wording on the form. In practice denials cluster into six buckets:

1. **Network or product mismatch** — the hospital is not on the insurer's list for your specific product, or the room category exceeds the eligible limit.
2. **Waiting period or pre-existing condition** — the admission falls inside the initial 30-day window, a specific-disease waiting period, or the pre-existing disease waiting period.
3. **Documentation** — the pre-authorisation form is incomplete, the treating doctor's justification is missing, or the estimated cost is not itemised.
4. **Medical necessity** — the insurer's medical team disputes that admission was required.
5. **Policy status** — premium unpaid, policy lapsed, or the sum insured exhausted.
6. **Delay dressed up as denial** — no decision at all, which is what the one-hour and three-hour rules exist to prevent.

Ask for the denial in writing quoting the exact clause. A denial that cannot name a clause is the easiest kind to overturn.

## What to do at the hospital desk, in order

1. **Ask for the denial letter.** "Please give me the cashless denial in writing with the reason and the policy clause." If they refuse, email the insurer and the hospital's insurance desk from your phone, in the same message, asking both.
2. **Confirm whether it is a query or a final denial.** Many "denials" are pending-document queries. A written answer either way changes what you do next.
3. **Get the treating doctor's justification on hospital letterhead** — why the admission, why the procedure, why not day care. This single document decides most medical-necessity disputes.
4. **Decide on payment without delaying treatment.** If the hospital will not proceed on credit, pay and keep every bill, then claim reimbursement. Never let a billing dispute delay care.
5. **Note the reference numbers.** Pre-auth ID, TPA ticket number, claim number, and the name of the person who told you what.

## The reimbursement route, when cashless fails

Reimbursement is a right, not a favour, and the denial of cashless does not touch it. Submit:

- the claim form and the policy copy
- the itemised hospital bill and payment receipts
- discharge summary and the treating doctor's certificates
- investigation reports and pharmacy bills
- the pre-authorisation request and the written denial
- cancelled cheque and KYC

Submit within the window your policy states — commonly 15 to 30 days from discharge. Send it by a method that gives you a receipt, and keep a full copy of what you sent.

## Escalation, with the clock

| Step | Who | Timing |
|---|---|---|
| 1 | Insurer's Grievance Redressal Officer | Must resolve within 14 days (IRDAI Master Circular, 5 Sept 2024) |
| 2 | IRDAI Bima Bharosa | After 14 days or an unsatisfactory reply; no decision power, but it is on record |
| 3 | Insurance Ombudsman | Within one year of the final reply; free; up to ₹50 lakh |
| 4 | Consumer commission | Two years; for larger claims or where the insurer ignores an award |

Write to the grievance officer in one message, not five. Number the facts, attach an index, state what you want — authorisation of the balance, or reimbursement with interest if the 30-day settlement clock has run.

## The interest nobody claims

If the reimbursement is settled after 30 days from the last necessary document, IRDAI's Protection of Policyholders' Interests Regulations, 2017 require interest at 2% above the RBI bank rate, calculated from the date the last document was received. Ask for it in the same letter, with the arithmetic shown. See the [interest on delayed claims guide](/blog/interest-on-delayed-insurance-claim-settlement-2026/).

## FAQ

**Q: If cashless is denied, can I still claim reimbursement?**

Yes. A cashless denial is a decision about the mode of settlement, not about whether the treatment is covered. Pay the bill, keep the originals, and file a reimbursement claim within the policy's window.

**Q: How long does the insurer have to decide a cashless request?**

For planned admission, authorisation is to be decided within one hour of the request under IRDAI's health insurance rules; at discharge, final authorisation within three hours. Where the decision goes against you, the insurer must give reasons with reference to the policy terms.

**Q: The hospital says my policy is not on their network. What now?**

Ask the hospital's insurance desk to confirm network status in writing, with the insurer copied. If it is genuinely outside the network for your product, either shift to a network hospital if it is medically safe, or continue where you are and claim reimbursement — network status does not affect reimbursement eligibility.

**Q: Can the insurer reject a claim it had already pre-authorised?**

A pre-authorisation is not an unconditional guarantee — it can be reviewed against the final bill, the diagnosis and the policy terms. What it does mean is that the insurer had the facts at the time it approved; a later denial must explain what changed.

**Q: What if the hospital refuses to give a written denial?**

Email the insurer's grievance officer and the hospital together, describing the conversation, the time and the person you spoke to, and ask for confirmation. That email becomes the record, and it is enough for the Ombudsman later.

---

The [cashless denial playbook](/blog/cashless-health-insurance-claim-denied-hospital-2026/) covers the general case across insurers, and the [health and cashless cluster](/guides/health-cashless/) has the rest. If you are at the hospital now, [message the details](/contact) and the first check is free.
""" + CTA,
}

# ---------------------------------------------------------------------------
# 3. Care Health claim settlement ratio
# ---------------------------------------------------------------------------
POSTS["care-health-claim-settlement-ratio-2026"] = {
    "summary": "What a claim settlement ratio tells you about Care Health, what it hides, and the four policy terms that actually decide whether your claim is paid.",
    "content": """## The short answer

**A high claim settlement ratio does not predict your claim.** It is a portfolio number: the share of claims settled out of those decided in a year. It says nothing about the ground on which a claim is refused, which is the only thing you need to know at the hospital desk. What actually decides a Care Health claim is the wording: the waiting periods, the room-rent limit, the sub-limits and the co-payment.

For the insurer-specific figure, use IRDAI's own disclosures — the annual report and the insurer's published claim data — rather than a marketing page, and read the health-only figure rather than the blended one.

| What the ratio includes | What it does not tell you |
|---|---|
| Claims settled ÷ (settled + repudiated) in the year | How much of each claim was paid |
| All lines of business, if blended | Whether short-settlements were involved |
| Claims that reached a decision | Pending claims, or claims withdrawn |
| The insurer's whole book | Group vs retail, and which one you are in |

## Why a blended ratio flatters a health insurer

Care Health writes group health business, retail health, and personal accident. Group claims are large, processed in bulk, and settled on a different footing from a family floater claim filed by one household. A blended ratio that looks strong can sit on top of a much lower retail experience, and a retail customer is the one reading the number.

Three questions worth asking instead:

1. What share of health claims were **repudiated**, as distinct from settled?
2. What is the average **settlement ratio per claim** — paid amount against claimed amount?
3. How many claims went to the **Ombudsman**, and how many of those were decided against the insurer?

Only the first is published regularly. The other two show up in Ombudsman annual reports and in the pattern of consumer-commission orders.

## The four policy terms that decide your claim

**Waiting periods.** The initial waiting period is commonly 30 days. Specific diseases — cataract, hernia, joint replacement, maternity — carry their own waiting periods, commonly two to four years. Pre-existing disease cover begins after the waiting period in your wording, which IRDAI capped at 36 months for policies issued under the current framework.

**The moratorium.** After five continuous years of cover, the insurer's ability to contest the policy on grounds of non-disclosure is severely limited — broadly, it may repudiate only for proven fraud and for permanent exclusions. This is a policyholder protection, and it is the first thing to check before accepting a "non-disclosure" rejection on an older policy.

**Room rent and sub-limits.** A room-rent cap is not just a deduction on the room. Where the eligible category is exceeded, insurers may apply proportionate deductions across the bill. A single-room cap can turn into a five-figure difference on a large claim.

**Co-payment and deductibles.** A 10% co-pay is 10% of the admissible amount, not of the bill, and the distinction matters when the admissible amount has already been reduced.

## If a Care Health claim is refused

The ladder is the same for every insurer, and it runs on dates:

1. **Written reasons.** Ask for the rejection with the clause, and compare it with the wording.
2. **Grievance Redressal Officer.** 14 days to resolve under IRDAI's September 2024 Master Circular.
3. **Bima Bharosa.** IRDAI's portal records the complaint and presses for a response. It does not decide.
4. **Insurance Ombudsman.** Free, no lawyer, one year from the final reply, award up to ₹50 lakh.
5. **Consumer commission.** Two years, and it can award compensation as well as the claim.

The [rejection appeal playbook](/blog/health-insurance-claim-rejection-rights-2026/) sets out the documents for each step, and the [health cluster](/guides/health-cashless/) covers cashless denials separately.

## FAQ

**Q: What is Care Health Insurance's claim settlement ratio?**

It is published by the insurer and by IRDAI, and it changes every year. Take the figure from IRDAI's annual report or the insurer's regulatory disclosures rather than a marketing page, and read the health-only number rather than the blended one.

**Q: Does a high claim settlement ratio mean my claim will be paid?**

No. The ratio is computed over claims that reached a decision in a year, across all products. Your claim is decided on the wording of your policy and the facts of the admission — nothing else.

**Q: What is Care Health's pre-existing disease waiting period?**

Waiting periods are set in each policy's wording, and the standard maximum under IRDAI's framework is 36 months for pre-existing diseases, with shorter periods for specific conditions. Read the waiting-period table in your own schedule rather than relying on a general figure.

**Q: Can Care Health reject a claim after five years of continuous cover?**

Under the moratorium, an insurer's right to contest a policy for non-disclosure is severely restricted after five continuous years. Broadly, repudiation is then possible only for proven fraud or for permanent exclusions stated in the wording. Check your policy year before accepting a non-disclosure rejection.

**Q: Is Care Health the same as Religare Health Insurance?**

Care Health Insurance is the entity formerly known as Religare Health Insurance, renamed after the change of ownership. Old policies, endorsements and claim numbers may still carry the Religare name, which is why hospital desks sometimes report a "policy not found".

---

The [IRDAI claim settlement regulations guide](/blog/irdai-claim-settlement-regulations-2026-30-day-rule-standardized-forms/) explains the 30-day rule and the forms insurers must use. For a specific refusal, [send the rejection letter](/contact) and the first review is free.
""" + CTA,
}

# ---------------------------------------------------------------------------
# 4. Bima Bharosa
# ---------------------------------------------------------------------------
POSTS["irdai-bima-bharosa-complaint-filing-2026"] = {
    "summary": "Bima Bharosa is IRDAI's grievance portal, not a decision-maker. When to file, what to write, what it can and cannot do, and when to move to the Ombudsman.",
    "content": """## The short answer

**Bima Bharosa is IRDAI's policyholder grievance portal** at bimabharosa.irdai.gov.in, with a toll-free line on 155255. File there when the insurer's Grievance Redressal Officer has not resolved your complaint within 14 days, or has replied in a way you do not accept. It does not decide your claim — it puts the complaint on the insurer's regulatory record and presses for a response. If you want a decision, the Insurance Ombudsman is the forum.

| | Bima Bharosa | Insurance Ombudsman |
|---|---|---|
| Who runs it | IRDAI | Statutory office under the Ombudsman Rules, 2017 |
| Cost | Free | Free |
| Decides your claim? | No | Yes — the award binds the insurer |
| Money limit | None (it is a complaint channel) | ₹50 lakh per complaint |
| Typical timeline | Response within weeks | Award within 3 months of everything being received |
| When to use | Insurer silent or evasive after 14 days | You want the claim decided |

## When Bima Bharosa is the right move

- The insurer **missed the 14-day** grievance deadline.
- The reply is **a template** that does not address the ground you raised.
- The insurer is **demanding documents** the policy never required.
- An **Ombudsman award has not been paid** — non-compliance is a grievance in itself, and Rule 17(6) of the Ombudsman Rules adds ₹5,000 a day for the delay.
- A **mis-selling or misrepresentation** complaint needs a regulator-visible trail.

When it is the wrong move: if the insurer has already given you a reasoned final reply and you want the claim decided, go to the Ombudsman. Filing at Bima Bharosa first, then waiting, then filing at the Ombudsman, is a legitimate sequence — but it is not free in time.

## Filing it properly

1. **Keep the insurer's final letter.** The portal asks for the grievance reference the insurer gave you. Without it, the complaint is often treated as a fresh grievance and sent back to the insurer.
2. **Write the complaint as facts, not feelings.** One numbered chronology: policy issued on X, claim filed on Y, rejected on Z citing clause C, grievance filed on D, reply received/not received. Then one paragraph on what you want.
3. **Upload the file once.** Policy schedule, claim form, rejection letter, grievance correspondence, bills and discharge summary. Merge into a small number of PDFs — a dozen separately named files slows the review.
4. **Record the reference number.** Everything after this point is easier with the Bima Bharosa complaint number in the subject line.
5. **Follow up in writing at 15 days.** Not by phone. A short email referencing the complaint number and asking for the current status creates the record that matters later.

## What to write

> Policy no. [number], insurer [name], claim no. [number] for treatment/event dated [date]. The claim was repudiated by letter dated [date] citing [clause/ground]. I filed a written grievance with the Grievance Redressal Officer on [date] under reference [number]. [No reply has been received / the reply dated [date] does not address the ground raised.] I request IRDAI to take up the complaint and direct the insurer to decide it on the policy wording, and to furnish the specific proposal-form question and investigation report relied on.

That last request — for the documents the insurer relied on — is the most useful sentence in the complaint. Insurers answer it more readily than they answer an argument.

## What Bima Bharosa cannot do

It cannot order the insurer to pay, cannot award compensation, and cannot substitute its view for the Ombudsman's. It is a pressure channel with a paper trail. Treat a favourable Bima Bharosa outcome as a settlement, and a flat refusal as a signal to move to the Ombudsman with the correspondence attached.

## The escalation matrix

| Days from rejection | Action |
|---|---|
| 0 | Ask for written reasons and the clause |
| 1–7 | Written grievance to the GRO, with an index of documents |
| 14 | If unresolved, file on Bima Bharosa |
| 30–45 | If unresolved, file with the Insurance Ombudsman (within one year of the final reply) |
| After an award | 30 days for the insurer to pay; ₹5,000/day thereafter under Rule 17(6) |
| Any time | Consumer commission within two years, if the amount is large or the insurer ignores an award |

## FAQ

**Q: Is Bima Bharosa the same as IGMS?**

Yes — IGMS was the earlier name for IRDAI's integrated grievance management system, and the policyholder-facing portal was rebranded Bima Bharosa. The old igms.irdai.gov.in links resolve to the newer portal, and the toll-free number 155255 is unchanged.

**Q: Do I have to file with the insurer first?**

Yes for practical purposes. The Ombudsman Rules expect a written complaint to the insurer, followed by a rejection, silence for a month, or a reply you do not accept. Starting at Bima Bharosa without that history usually gets the complaint routed back to the insurer.

**Q: How long does Bima Bharosa take?**

There is no fixed statutory decision timeline, because it does not decide. In practice a response from the insurer is usually sought within weeks. If nothing moves in 30 days, move to the Ombudsman rather than waiting further.

**Q: Can I file at Bima Bharosa and the Ombudsman at the same time?**

You can file at the Ombudsman while a Bima Bharosa complaint is open, but the Ombudsman cannot hear a dispute that is already before a court or a consumer commission. Attach the Bima Bharosa correspondence — it shows you tried.

**Q: Is there a fee?**

No. Bima Bharosa and the Ombudsman are both free to policyholders.

---

The [Ombudsman filing guide](/blog/insurance-ombudsman-india-guide/) is the next step, and the [downloadable complaint toolkit](/downloads/ombudsman-complaint-toolkit.pdf) has the forms and the document index. If your complaint is about an award that has not been paid, start with [this](/blog/ombudsman-award-not-paid-insurer-delay-2026/).
""" + CTA,
}

# ---------------------------------------------------------------------------
# 5. Ombudsman Bangalore
# ---------------------------------------------------------------------------
POSTS["insurance-ombudsman-bangalore-guide-2026"] = {
    "summary": "A free forum for Karnataka policyholders: who can file, what it can award, the one-year window, and what actually happens at a hearing.",
    "content": """## The short answer

**The Insurance Ombudsman is free, needs no lawyer, and can award up to ₹50 lakh against the insurer.** For a policyholder in Karnataka, the complaint goes to the Ombudsman office with jurisdiction over your address — confirm the zone on cioins.co.in before you file. You can file after the insurer has rejected your written complaint, not replied within a month, or replied in a way you do not accept, and within one year of that point.

| Rule | What it means | Source |
|---|---|---|
| Who may complain | Policyholder, nominee, legal heir, assignee | Rule 14(1) |
| Before filing | Written complaint to the insurer, then rejection, a month of silence, or an unacceptable reply | Rule 14(3)(a) |
| Time limit | One year from that rejection or reply | Rule 14(3)(b) |
| Award limit | ₹50 lakh per complaint, including expenses | Rule 17(3)(ii), as amended in 2023 |
| Mediation | Recommendation within a month of both sides agreeing | Rule 16(1) |
| Award | Within three months of receiving what it asked for | Rule 17(4) |
| Payment | Within 30 days of the award, or ₹5,000 a day for delay | Rule 17(6) |
| Fee | None | Ombudsman Rules and IRDAI's Master Circular, 5 Sept 2024 |

## What the Bangalore office decides

The Ombudsman hears personal-line disputes: health, life, motor, personal accident, and individual property cover. It does not hear commercial disputes where the complainant is not an individual, and it cannot decide a matter already before a court, tribunal or consumer commission.

Two practical points about jurisdiction. First, it follows your address and the insurer's office involved, so a Bengaluru resident with a policy issued in another state normally files in the Karnataka zone. Second, the office is a *zone*, not a court building — the hearing may be in person, on video, or decided on the papers, and the office will tell you which when it acknowledges the complaint.

## Filing it

1. **Check the one-year clock first.** Diarise the date on the insurer's final reply the day you receive it.
2. **Fill the complaint form** (available on the office's page on cioins.co.in) or file online, with the policy number, claim number, insurer, the amount claimed and a numbered account of what happened.
3. **Attach a document index.** Policy schedule, proposal form, claim form, rejection letter, all grievance correspondence, bills and discharge summary, medical records, identity and address proof. An indexed file is read; a pile is not.
4. **Ask for what the insurer relied on.** The investigation report and the specific proposal-form question. The Ombudsman can require them.
5. **Keep to the point.** One page of facts, one page of documents, one request.

## What happens at the hearing

Most files begin with a mediation attempt. If the insurer agrees to settle, the office records the terms and it ends there. If not, the Ombudsman decides on the papers or after a hearing — increasingly by video, which saves a day's travel.

You are not cross-examined as in a court. You present the chronology and the policy wording; the insurer's representative presents its ground. What wins is a clause and a date, not indignation.

## Accepting, and getting paid

- **Accept in writing within 30 days** of receiving the award, or it can lapse.
- The award binds the insurer once you accept.
- **Payment is due within 30 days.** After that, Rule 17(6) requires ₹5,000 a day to be paid to you.
- If you reject the award, you keep the right to go to a consumer commission. You cannot do both at once.

## Five ways people lose at this stage

1. **No written complaint to the insurer** before filing, so the complaint is sent back to the insurer first.
2. **Filing after 12 months** because the insurer's letters kept coming. Only the final decision starts the clock — but keep track.
3. **Asking for more than ₹50 lakh** in a single complaint, which makes it ineligible.
4. **Running a consumer case on the same facts**, which the Ombudsman cannot then hear.
5. **Not accepting the award in writing**, leaving the insurer with no obligation to pay.

## FAQ

**Q: Which Ombudsman office covers Bangalore?**

Complaints from Karnataka go to the Bangalore office. Because jurisdiction follows your address and the insurer's office, confirm the correct zone on cioins.co.in before filing — a misdirected complaint costs weeks.

**Q: Do I need a lawyer at the Ombudsman?**

No. The Rules make no provision for engaging one, and the process is designed for policyholders appearing themselves.

**Q: How much can the Ombudsman award?**

Up to ₹50 lakh per complaint, including expenses. The limit was raised from ₹30 lakh in November 2023.

**Q: How long does the whole thing take?**

An award is due within three months of the Ombudsman receiving everything it asked for, and mediation recommendations are usually quicker. Payment is then due within 30 days.

**Q: Can I file from outside Karnataka if the policy was bought in Bangalore?**

Jurisdiction follows your address and the insurer's office involved; the office will tell you if the file belongs elsewhere. NRIs file through the zone covering their Indian address, and may authorise a representative to appear.

---

The general [Ombudsman filing guide](/blog/insurance-ombudsman-india-guide/) covers the rules in more detail, and the [escalation cluster](/guides/escalation/) covers Bima Bharosa and the consumer routes. The [checklist PDF](/downloads/bangalore-ombudsman-checklist.pdf) is the document list for this office.
""" + CTA,
}

# ---------------------------------------------------------------------------
# 6. IRDAI complaint toolkit (stub -> real page)
# ---------------------------------------------------------------------------
POSTS["irdai-complaint-toolkit-2026"] = {
    "summary": "One page for deciding where to complain: the grievance cell, Bima Bharosa, the Ombudsman or a consumer commission, with the documents each one needs.",
    "content": """## The short answer

**There are four routes, and they are not interchangeable.** The insurer's Grievance Redressal Officer has 14 days. IRDAI's Bima Bharosa portal records the complaint but does not decide it. The Insurance Ombudsman decides, free of charge, and can award up to ₹50 lakh. A consumer commission is a court-like forum with no cap, and is the only route that can award compensation for the conduct itself.

Use this page as the decision tree, then take the specific guide.

| Your situation | Route | Why |
|---|---|---|
| Claim rejected or short-settled | Grievance officer → Ombudsman | The Ombudsman can order the claim paid |
| Insurer silent for more than 14 days | Bima Bharosa, then Ombudsman | Record the delay, then seek a decision |
| Documents demanded that the policy never required | Grievance officer, then Ombudsman | Delay is itself the grievance |
| Award passed but not paid | Ombudsman office + Bima Bharosa | Rule 17(6): ₹5,000 a day |
| Mis-sold policy, or premium refund refused | Grievance officer → Ombudsman | Relief is defined in the Rules |
| Dispute above ₹50 lakh | Consumer commission | The Ombudsman's limit is a hard cap |
| You want compensation for harassment beyond the claim | Consumer commission | Ombudsman relief is tied to the dispute |

## The four routes in one line each

**Grievance Redressal Officer (GRO).** Every insurer must have one, and must resolve a complaint within 14 days under IRDAI's Master Circular of 5 September 2024. Free, and mandatory before anything else.

**Bima Bharosa.** IRDAI's portal, bimabharosa.irdai.gov.in, toll-free 155255. It puts the complaint on the insurer's regulatory record and presses for a response. It does not decide. See the [filing guide](/blog/irdai-bima-bharosa-complaint-filing-2026/).

**Insurance Ombudsman.** Free, no lawyer, award up to ₹50 lakh, filed within one year of the insurer's final reply. The award binds the insurer. See the [complete guide](/blog/insurance-ombudsman-india-guide/).

**Consumer commission.** Filed under the Consumer Protection Act, 2019, through e-Daakhil, within two years. No ₹50 lakh cap, and compensation can be awarded on top of the claim. You do not have to use a lawyer, though the drafting helps.

## The document set that serves all four

Build this once and every route becomes a copy-and-send:

1. Policy schedule and wording, with the clause the insurer relied on highlighted.
2. Proposal form, if the dispute is about disclosure.
3. Claim form and the complete claim file — bills, discharge summary, investigation reports, prescriptions.
4. The repudiation letter, and the envelope or email that shows when you received it.
5. Your written grievance, and the insurer's reply or the proof that none came.
6. A one-page chronology: dates, events, documents.
7. Identity and address proof, bank mandate.

The [document index template](/downloads/document-index-template.xlsx) and the [claim organiser](/downloads/claim-organizer.xlsx) are built for this.

## Trading deadlines

- 14 days for the insurer's grievance cell.
- One month of silence counts as a rejection for Ombudsman eligibility.
- One year to file at the Ombudsman from the final reply.
- Two years for a consumer complaint.
- 30 days to accept an award; 30 days for the insurer to pay; ₹5,000 a day thereafter.

## FAQ

**Q: Should I go to IRDAI or to the Ombudsman?**

IRDAI's Bima Bharosa does not decide claims; the Ombudsman does. If your aim is a decision, the Ombudsman is the forum. If your aim is pressure with a regulatory footprint, Bima Bharosa does that faster.

**Q: Can I use two routes at once?**

Not the Ombudsman and a consumer commission on the same dispute — the Ombudsman cannot hear a matter already before a court or commission. Bima Bharosa can run alongside either.

**Q: What does all of this cost?**

The grievance cell, Bima Bharosa and the Ombudsman are free. A consumer commission charges a nominal fee, nil for the smallest claims.

**Q: How long will it take?**

The insurer has 14 days; the Ombudsman aims to decide within three months of having everything; a consumer commission takes months and sometimes longer.

**Q: What if the insurer ignores an Ombudsman award?**

It must pay within 30 days, and ₹5,000 a day after that. Put the demand in writing quoting Rule 17(6), copy the Ombudsman's office, and file the non-compliance on Bima Bharosa. See [this guide](/blog/ombudsman-award-not-paid-insurer-delay-2026/).

---

Start with the [escalation cluster](/guides/escalation/) for the route that fits your file, or [send the rejection letter](/contact) for a free first read.
""" + CTA,
}


def main() -> int:
    data = json.loads(BLOGS.read_text())
    changed = 0
    for post in data:
        patch = POSTS.get(post["slug"])
        if not patch:
            continue
        post["content"] = patch["content"]
        post["summary"] = patch["summary"]
        post["modifiedDate"] = "2026-11-12"
        changed += 1
        print(f"filled {post['slug']} ({len(patch['content'].split())} words)")

    BLOGS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print(f"{changed} posts updated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
