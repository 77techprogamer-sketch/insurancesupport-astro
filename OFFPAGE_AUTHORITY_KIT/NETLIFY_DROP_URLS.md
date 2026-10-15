# Netlify Drop Articles - URL Tracker
**Folder:** `netlify-drop-articles/` (ready to drag to https://app.netlify.com/drop)
**Instructions:** Drag the ENTIRE `netlify-drop-articles` folder onto https://app.netlify.com/drop — Netlify will publish each `.html` as a separate site with random subdomain. After publishing, fill in the URLs below.

---

## Generated Articles (10 case studies + index)

| # | Case Study | Local File | Netlify URL (fill after drop) |
|---|------------|------------|-------------------------------|
| 1 | 42 Lakh LIC Claim Recovery for Retired Teacher in Malleshwaram | `lic-claim-recovery-bangalore-retired-couple.html` | |
| 2 | Getting 18 Lakh Health Claim Approved After 365-Day Delay | `max-bupa-claim-delayed-365-days.html` | |
| 3 | Motor Theft Claim: 12 Lakh Recovered After Insurer Cited 'Negligence' | `icici-lombard-motor-theft-recovery.html` | |
| 4 | Total Loss Motor Claim: 9.5 Lakh Settled After IDV Dispute | `bajaj-allianz-total-loss-settlement.html` | |
| 5 | Cashless Denial at Network Hospital: 6.2 Lakh Reimbursement Secured | `care-health-cashless-denial.html` | |
| 6 | Term Insurance Death Claim: 1 Crore Recovered via Ombudsman | `term-insurance-death-claim-ombudsman-win.html` | |
| 7 | LIC Policy Revived After 4 Years Lapse: 28 Lakh Sum Assured Restored | `lic-policy-revival-5-year-lapse.html` | |
| 8 | Senior Citizen Health Claim: 22 Lakh Approved for 72-Year-Old with Pre-Existing Conditions | `senior-citizen-health-claim-pre-existing.html` | |
| 9 | Corporate Group Health Claim: 15 Lakh Recovered for Employee After TPA Denial | `group-health-corporate-claim-recovery.html` | |
| 10 | Travel Insurance Medical Emergency in Dubai: 8.5 Lakh Claim Settled | `travel-insurance-medical-emergency-abroad.html` | |
| 11 | **Index / Landing Page** | `index.html` | |

---

## After Publishing

1. Go to https://app.netlify.com/drop
2. Drag the `C:\Users\A\Desktop\insurancesupport-astro\netlify-drop-articles` folder onto the page
3. Wait for all 11 sites to deploy (each gets a random `*.netlify.app` subdomain)
4. Copy each URL into the "Netlify URL" column above
5. Save this file

---

## Canonical Link Note
Each article has `<link rel="canonical" href="https://insurancesupport.online/case-studies/{slug}/">` pointing back to your main site — this prevents duplicate content issues and passes link equity to your primary domain.

---

## Next Steps for SEO
- Add these Netlify URLs to `OFFPAGE_AUTHORITY_KIT/05_LINK_TRACKER.csv` as "netlify_drop" type
- Consider adding internal links from your main site case studies to these articles (optional)
- Monitor indexing in GSC under the netlify.app domains