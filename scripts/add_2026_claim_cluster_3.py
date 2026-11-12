#!/usr/bin/env python3
"""
Part three of the 2026 claim-recovery cluster: what claim agencies charge, and
claims for policyholders living outside India.
"""
import json
import sys
from pathlib import Path

BLOGS = Path("src/data/blogs.json")
DATE = "2026-11-12"
AUTHOR = "Hari Kotian"

ARTICLES = []

# ---------------------------------------------------------------------------
# 5. Claim recovery agency fees
# ---------------------------------------------------------------------------
ARTICLES.append({
    "slug": "claim-recovery-agency-fees-india-2026",
    "title": "Claim Recovery Agency Fees in India: What Is Fair in 2026",
    "date": DATE,
    "categories": ["Claim Recovery", "Consumer Rights", "IRDAI"],
    "summary": "Registration fee plus 10-20% of the recovered amount is the standard claim-agency model. Here is what the free statutory routes cost, when paying makes sense, and the ten questions to ask before you sign anything.",
    "author": AUTHOR,
    "tags": [
        "claim recovery agency",
        "claim consultancy fees",
        "insurance claim agent charges",
        "success fee insurance claim",
        "free ombudsman complaint",
        "claim settlement service",
        "insurance claim help cost",
    ],
    "content": """## The short answer

Claim consultancies in India usually charge a **registration or file fee of a few thousand rupees once a case is accepted, and then a success fee of roughly 10-20% of whatever is recovered, plus GST**. Some charge a flat per-case fee instead, and some charge by the hour. None of this is fixed by IRDAI, because these businesses are not insurance intermediaries.

Meanwhile the four statutory routes — the insurer's grievance cell, IRDAI Bima Bharosa, the Insurance Ombudsman, and a consumer commission — are free or nearly free. So the real question is not "what do claim agencies charge?" It is "what am I paying for that I could not do myself?"

That answer is different for a Rs 40,000 deduction and for a Rs 40,00,000 death claim. This page sets out both.

## The four fee models you will meet

| Model | Typical shape | What it means for you |
|---|---|---|
| Contingency | Small registration fee after case acceptance, then 10-20% + GST of the amount recovered | Nothing recovered, nothing paid beyond the registration fee — but the percentage is taken from money you were legally owed |
| Flat fee | A fixed amount per case, payable in stages | Predictable, and the cheapest option on large claims; the provider carries the risk that the case fails |
| Hourly or retainer | Billed for drafting, correspondence, representation | Common where a lawyer is involved; can exceed a contingency fee on small claims |
| "Free" with a commission arrangement | No visible fee to you | Rare in this field, and worth examining closely: someone is being paid, and you should know by whom |

Anything above about 20% of the recovered amount deserves a hard look, particularly where the work is a single Ombudsman filing. A 15% share of a Rs 8 lakh award is Rs 1.2 lakh — more than a lawyer would charge for the same filing in many cities.

## What the free routes actually cost

| Route | Fee | Decides your case? | Time |
|---|---|---|---|
| Insurer's Grievance Redressal Officer | Free | No — but reverses a meaningful share of rejections | 14 days under IRDAI's Sept 2024 Master Circular |
| IRDAI Bima Bharosa | Free | No — records the complaint against the insurer and pushes for a response | Usually a few weeks |
| Insurance Ombudsman | Free | Yes — award binds the insurer up to Rs 50 lakh | Award within 3 months of the Ombudsman having everything it asked for |
| Consumer commission | Court fee by claim value | Yes | Months, sometimes longer |
| Claim consultancy | Registration + 10-20% + GST | Prepares and argues your case; does not decide it | Varies |

The Ombudsman route is free, does not require a lawyer, and its award is binding on the insurer. That is the benchmark against which any paid service has to justify itself. If a provider's plan for your case is "we will file an Ombudsman complaint", you are paying a percentage for a form you can file yourself — unless your file needs the drafting and the medical-record work that goes with it.

## When paying is worth it

Paying someone is rational when the work is genuinely beyond you:

- **The claim is large and the ground is technical.** A Rs 25 lakh death claim repudiated on non-disclosure needs the proposal form, the revival declaration, hospital records, and a Section 45 argument. A percentage of a large recovery is a small price against the risk of losing it entirely.
- **The rejection has multiple grounds.** Three grounds need three separate answers, each with its own evidence. That is drafting work.
- **Records have to be reconstructed.** Old hospital files, pharmacy records, doctor certificates from years ago, and an insurer that will not share its investigation report.
- **You cannot manage the correspondence.** A working family cannot chase a TPA for six weeks. Delay costs money, and interest under IRDAI's regulations is often not claimed because nobody computes it.
- **The amount is stuck after an award.** Enforcement is a different skill from argument, as the [Rule 17(6) guide](/blog/ombudsman-award-not-paid-insurer-delay-2026) explains.

## When it is not

- **Small deductions.** A Rs 18,000 room-rent cut on a Rs 90,000 claim cannot carry a 15% fee plus GST. The grievance letter is worth writing yourself.
- **The insurer has already agreed to pay.** If the only step left is submitting a bank mandate, no percentage should be involved.
- **Someone promises an outcome.** Nobody can guarantee a claim decision. A guarantee is the clearest signal that the fee is for optimism, not work.
- **You have not exhausted the free routes.** An Ombudsman complaint costs nothing. Spend an afternoon before you spend a lakh.

## Ten questions before you sign

1. What exactly is the fee, in rupees, and on what base — the claim amount, the recovered amount, or the increase over the insurer's offer?
2. Is the fee per stage (grievance, Ombudsman, consumer commission) or one fee for the whole file?
3. What happens if nothing is recovered? Is the registration fee refundable?
4. Who does the drafting, and who appears at the hearing?
5. Are expenses — courier, certified copies, travel, stamp paper — included or extra?
6. What is the exit clause if I want to stop, and do I keep my documents?
7. Do you hold an IRDAI licence, and in what capacity? If not, what is the legal basis of the engagement?
8. Will you give me copies of everything you file, in my name?
9. Is GST extra, and is it on the fee or on the recovered amount?
10. Is any part of the fee payable from the claim proceeds directly?

Ask for the answers in writing, in the engagement letter. A provider who will not put the fee on one page is telling you something.

## The red flags

| Red flag | Why it matters |
|---|---|
| "We have contacts inside the insurer" | Suggests the outcome depends on a relationship rather than the policy wording. Also a compliance problem for them |
| A large upfront fee before any assessment | Skims clients whose cases would have been refused |
| Asking you to sign blank or undated papers | You will not know what was filed in your name |
| Demanding original documents to keep | Originals are your only copies in many files |
| A fee on the gross award, with expenses deducted separately | You pay twice |
| No written engagement letter | No exit, no refund, no evidence |

## What the regulator does and does not regulate

IRDAI regulates insurers and insurance intermediaries. An IRDAI-licensed agent is remunerated by commission from the insurer, not by a share of your claim payout, and agents are not permitted to charge you a fee for the same transaction. Claim consultancies that prepare and argue policyholder cases are not insurance intermediaries, so their fees are a matter of contract between you and them — which is exactly why the contract, and not a website, has to be read.

Ask any provider which of the two categories it falls into. The answer should be immediate.

## Our position

The first case review is free, there is no obligation, and if we take the work on, the fee is quoted in writing before anything is filed. We will also tell you when the honest answer is "file the Ombudsman complaint yourself — here is how", which is why the [claim recovery hub](/claim-recovery/) is written as a set of instructions rather than a sales page.

## FAQ

**Q: How much do claim recovery agencies charge in India?**

The common model is a registration fee once a case is accepted, plus a success fee of roughly 10-20% of the amount recovered, plus GST. Flat per-case fees and hourly billing also exist. There is no regulated fee schedule, so the engagement letter governs.

**Q: Is it legal for someone to take a percentage of my insurance claim?**

A private consultancy can contract for a success fee; what matters is that the terms are in writing and that the provider is not holding itself out as an IRDAI-licensed intermediary when it is not. Always ask for the licence category in writing.

**Q: Can I file an Ombudsman complaint without paying anyone?**

Yes. The Ombudsman route is free, does not require a lawyer, and can be filed online. The [filing guide](/blog/insurance-ombudsman-india-guide) sets out the eligibility conditions and documents.

**Q: Is a claim agency the same as a lawyer?**

No. A claim consultancy prepares and argues policyholder cases in grievance and Ombudsman forums; a lawyer is enrolled with a bar council and can appear before courts and consumer commissions. Some files need one, some need the other, and some need neither.

**Q: What should I do if an agency asks for a large fee upfront?**

Ask for the assessment and the fee in writing, compare it with the free route, and decline if the fee is not tied to work actually done. A large upfront payment before anyone has read your policy is the single most common complaint about this industry.

**Q: Do I have to pay the fee if the insurer pays after I complain to IRDAI myself?**

Under most engagement letters, the trigger is the recovery, however it was achieved. Check that clause before you sign, and check whether the fee is on the increase over the original offer or the whole amount.

---

**Before you pay anyone, get the free numbers.** [Send us the rejection letter and the claim amount](/contact) and we will tell you what the free routes are likely to recover, what a paid engagement would add, and what each would cost.
""",
})

# ---------------------------------------------------------------------------
# 6. NRI claims
# ---------------------------------------------------------------------------
ARTICLES.append({
    "slug": "nri-insurance-claim-india-documents-payout-2026",
    "title": "NRI Insurance Claim in India: Documents, Payout, Disputes",
    "date": DATE,
    "categories": ["NRI", "Claim Recovery", "Life Insurance"],
    "summary": "You do not have to fly to India to claim. What NRIs need to send, how attestation works, where the money is paid, how to authorise someone, and how to fight a rejection from abroad.",
    "author": AUTHOR,
    "tags": [
        "nri insurance claim",
        "nri death claim india",
        "attested documents insurance",
        "power of attorney insurance claim",
        "nri ombudsman complaint",
        "insurance payout nre nro account",
        "nri policy maturity",
    ],
    "content": """## The short answer

**An NRI policyholder or nominee has exactly the same claim rights as a resident. The difference is documentary: signatures have to be attested or apostilled, the payout has to go to the right bank account, and correspondence can be authorised to a representative in India.** None of that requires a flight to India, and none of it reduces the claim.

The three things that slow NRI claims down are not legal: documents sent without the right attestation, an Indian bank account that cannot be credited, and no authorised representative to sign in India while the claimant is eight time zones away. Each has a straightforward fix.

| Issue | What goes wrong | What to do |
|---|---|---|
| Signatures | Claim form signed abroad is queried, file returned | Notarise and apostille (or attest at the Indian consulate) before sending |
| Attestation of certificates | Death certificate or medical records returned as "not attested" | Get the state-issued certificate apostilled; keep a scanned copy |
| Bank payout | Claim payable to a closed or dormant NRO account | Nominate an active NRO/NRE account and send a cancelled cheque with the claim |
| Authorisation | Nobody in India can sign or attend a hearing | A specific power of attorney, or an authorisation letter for the Ombudsman |
| Time zones | Weeks lost per email exchange | One consolidated email per stage, with an index of documents |

## Which documents, and how they are attested

Indian insurers are required to accept documents attested in a recognised way. In practice, the claim form and the identity documents need one of:

- **Apostille**, where the country is a party to the Hague Apostille Convention — the certificate is stamped by the designated authority in that country.
- **Attestation at the Indian embassy or consulate**, where it is not.
- **Notarisation followed by either of the above**, which is what most insurers actually mean when they ask for "attested" documents.

Ask the insurer, in writing, which of these it accepts for each document, and keep the reply. Insurers sometimes ask for more than the regulation requires; a written answer narrows it to what their own claims manual says.

A typical death-claim pack for an NRI claimant:

1. Claim form, signed by each nominee as per the policy.
2. Original policy document, or an indemnity where it is lost.
3. Death certificate — attested or apostilled, plus a translation where it is not in English.
4. Identity and address proof of the nominee abroad, and of the insured.
5. Bank mandate form with a cancelled cheque of the Indian account.
6. Medical or hospital records for the last illness, if the claim is investigated.
7. Legal heir certificate or succession certificate where there is no valid nomination.

## The account the money goes into

Insurance proceeds to a non-resident are paid in India, usually into an NRO account, and from there repatriation follows the RBI's rules — broadly, up to USD 1 million per financial year from an NRO balance, with the bank's documentation. NRE balances are freely repatriable. Rules change, so confirm the current position with your bank before you choose the account on the form.

Two practical points that save months:

- **Never nominate an account you cannot operate.** Joint accounts with a resident relative, or accounts that have gone dormant, cause the payout to bounce and the file to reopen.
- **Tax deducted at source is possible.** Payments to non-residents can attract withholding, and the rate depends on the nature of the payment and any treaty relief. Get the TDS certificate, and speak to a chartered accountant about claiming it back.

## Authorising someone in India

Two instruments are used, and they are not interchangeable:

**A specific power of attorney (POA)** authorises a named person to deal with the insurer, the TPA, or the bank on your behalf. Keep it specific: policy number, insurer, and the acts permitted. A general POA over your Indian affairs is broader than this task needs and harder to withdraw.

**An authorisation letter to the Insurance Ombudsman** is a shorter document that lets a representative appear in your complaint. The Ombudsman Rules allow a complaint to be made by an authorised representative, and hearings can be conducted in writing or by video.

Both need to be executed properly — signed abroad, notarised, apostilled or consulate-attested, and stamped in India where required. A POA that is not stamped can be refused by the very office you need it for.

## Fighting a rejection from abroad

The escalation ladder is the same as for a resident, and it can be worked entirely by email and portal:

1. **Written grievance to the insurer's Grievance Redressal Officer**, with an index of documents and the specific grounds. Response due in 14 days.
2. **IRDAI Bima Bharosa**, if the insurer misses that deadline or gives no reasons. Free, online.
3. **Insurance Ombudsman** for the territorial jurisdiction covering the policyholder's Indian address, within one year of the insurer's final decision. Free, and up to Rs 50 lakh.
4. **Consumer commission**, which can be filed through a representative, if the amount is larger or the insurer has ignored an award.

What actually decides these files is not the geography but the paper. A nominee in Toronto with a complete, indexed, attested file does better than a claimant in Bengaluru with a folder of loose copies.

## The specific delays NRIs hit

- **Death certificate from India.** The family must register the death and obtain the certificate from the municipal authority. This is the single longest lead item; start it before anything else.
- **Hospital records.** Indian hospitals charge for copies and take weeks. Request the discharge summary, bills, and investigation reports in one written request, with a nominated person collecting them.
- **The insurer's "original documents" demand.** Send originals by a tracked courier, keep the receipt, and send scanned copies by email on the same day. If a document is lost in transit, the courier trail is your evidence.
- **Signature mismatch.** A signature that has changed over twenty years is a common query on old policies. A bank attestation of your current signature, or a fresh specimen signed before a notary, resolves it.

## FAQ

**Q: Can an NRI file an insurance claim without travelling to India?**

Yes. Claims are filed by email, courier, or the insurer's portal, with documents attested abroad. Where a physical signature or appearance is needed, a specific power of attorney or an authorisation to a representative covers it.

**Q: Do NRI claim documents need to be apostilled?**

Usually yes, if the country is a party to the Hague Apostille Convention; otherwise attestation at the Indian embassy or consulate. Ask the insurer in writing which it accepts for each document, and keep the reply.

**Q: Can an NRI complain to the Insurance Ombudsman?**

Yes. The Ombudsman's territorial jurisdiction follows the policyholder's address in India, and a complaint may be filed by an authorised representative. The complaint can be filed online and heard on video.

**Q: Which bank account does an insurance payout go to for an NRI?**

Typically an NRO account in India, from which repatriation follows RBI rules; NRE balances are freely repatriable. Confirm the current limits and documentation with your bank before submitting the bank mandate.

**Q: Is an insurance claim payout to an NRI taxable in India?**

Payments to non-residents can attract withholding tax depending on the nature of the payment and applicable treaty relief. Obtain the TDS certificate and take advice from a chartered accountant; a refund may be available through an Indian return.

**Q: Does an NRI get a lower claim settlement?**

No. The policy terms, the Ombudsman's powers, and the claim amount do not change because the claimant lives abroad. What changes is the paperwork and the time it takes to move documents across borders.

---

**Geography should not cost you a claim.** If the paperwork is the obstacle, [describe the file and where the claimant lives](/contact) and we will tell you what to send, how to attest it, and who can sign in India.
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
