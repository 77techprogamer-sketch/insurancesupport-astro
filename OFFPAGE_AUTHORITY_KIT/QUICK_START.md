# QUICK START — Do This First (30 minutes max today)

---

## 1. Google Business Profile — RIGHT NOW
1. Open: https://business.google.com/
2. If "Insurance Support" is unclaimed → click "Own this business?" → Claim
3. If already claimed → sign in, go to "Edit profile"
4. **Copy-paste every field from `00_MASTER_NAP.md`** (do not retype)
5. Upload 5 photos minimum today (logo, headshot, office, documents)
6. Post 1 update: "What to do when your health claim is rejected" → link to /support/
7. Respond to 5 existing reviews today (thank + personalize)
8. Ask 2 clients for reviews (send: https://g.page/insurancesupport/review)

---

## 2. Bing Places — AFTER GBP VERIFIED
1. https://www.bingplaces.com
2. "Import from Google Business Profile" (one click if GBP is verified)
3. Verify — usually instant

---

## 3. Verify Your Site Paths (so links don't 404)
Run this once:
```bash
cd /c/Users/A/Desktop/insurancesupport-astro && npm run build && npx wrangler pages deploy dist --project-name insurancesupport-online --branch main
```
Then manually check these 8 URLs return 200:
- https://insurancesupport.online/support/
- https://insurancesupport.online/blog/health-insurance-claim-rejection-15-reasons/
- https://insurancesupport.online/blog/insurance-policy-review-checklist-claim-rejection/
- https://insurancesupport.online/blog/lic-claim-rejection-response-guide/
- https://insurancesupport.online/blog/insurance-ombudsman-india-guide/
- https://insurancesupport.online/downloads/claim-timeline-tracker.pdf
- https://insurancesupport.online/downloads/lic-claim-checklist.pdf
- https://insurancesupport.online/downloads/ombudsman-complaint-toolkit.pdf

---

## 4. Start Tracker
Open `OFFPAGE_AUTHORITY_KIT/05_LINK_TRACKER.csv` in Excel/Google Sheets.
Update GBP row → status "claimed" + today's date.

---

## 5. Your Next Session (Tomorrow)
- Bing Places import
- Justdial submission (from `02_DIRECTORIES.md`)
- 1 Quora answer (from `03_COMMUNITY_ANSWERS.md`)

---

## What NOT to do
- ❌ Don't use any "link building" tools
- ❌ Don't create satellite sites on here.now (caused suppression before)
- ❌ Don't copy-paste the same description to multiple directories
- ❌ Don't post more than 1 answer/comment per platform per day
- ❌ Don't pay for links

---

## Files you now have in OFFPAGE_AUTHORITY_KIT/
```
00_MASTER_NAP.md          ← Single source of truth for every submission
01_GBP_ACTION.md          ← Step-by-step GBP completion
02_DIRECTORIES.md         ← 6 Indian directories, unique descriptions pre-written
03_COMMUNITY_ANSWERS.md   ← 6 verified Quora/Reddit questions + templates
04_GUEST_POSTS.md         ← 4 verified guest post targets + pitch emails
05_LINK_TRACKER.csv       ← Live tracking spreadsheet (update same day)
06_WEEKLY_PLAN.md         ← 4-week schedule, one session per day
```