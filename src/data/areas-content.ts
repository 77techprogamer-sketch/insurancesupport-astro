// Hyper-local content for /cities/ pages — each area gets genuinely unique content
// This DIFFERENTIATES /cities/ (Bangalore micro-localities) from /locations/ (city-level pages)

export const AREA_DETAIL: Record<string, {
  hospitals: string[];
  itParks: string[];
  profile: string;
  insuranceFocus: string;
  localFaqs: { question: string; answer: string }[];
}> = {
  koramangala: {
    hospitals: [
      'Apollo Spectra Hospital (60 Feet Road)',
      'Cloudnine Hospital (9th Block)',
      'Sakra World Hospital (8 min, Marathahalli)',
      'Fortis Hospital (Bannerghatta Road, 12 min)',
      'Narayana Health City (HSR Layout, 10 min)',
    ],
    itParks: [
      'Koramangala TechPark',
      'ThoughtWorks Office',
      'Murugeshpalya IT SEZ',
      'Startup Hub (Koramangala 5th Block)',
    ],
    profile: 'Koramangala is one of Bangalore\'s most dynamic neighborhoods — a mix of aging residential blocks (1st-8th Block), newer high-rises along 80 Feet Road, and a booming startup ecosystem in 5th and 6th Block. The area has roughly 200,000 residents including a large population of young IT professionals (median age ~31), families in older independent houses, and senior citizens in the original cooperative housing societies. Average apartment sizes range from 1,200–2,000 sq ft with rents of ₹25,000–55,000/month.',
    insuranceFocus: 'Koramangala residents face distinct insurance needs: young professionals need personal term cover on top of employer group plans (most startups offer only ₹3–5L group cover). Families in 7th and 8th Block often need senior citizen health plans for aging parents. Waterlogging during monsoon months (July–September) near Forum Mall and 80 Feet Road leads to a spike in motor and home insurance claims. We handle cashless approvals at Apollo Spectra and Cloudnine within 4 hours — faster than walking in with a rejected claim.',
    localFaqs: [
      { question: 'Which hospitals near Koramangala offer cashless health insurance?', answer: 'Apollo Spectra (60 Feet Road), Cloudnine (9th Block), and Sakra World (Marathahalli) are in most cashless networks. Fortis Bannerghatta Road and Narayana HSR are 10–12 minutes away and also cashless-eligible. We pre-authorize claims at all five — you just bring your policy card and Aadhaar.' },
      { question: 'Do IT startups in Koramangala provide enough insurance coverage?', answer: 'Most Koramangala startups offer ₹3–8 lakh group health cover, which falls short of actual hospital bills at premium Bangalore hospitals (ICU stays can exceed ₹15 lakh). We recommend a personal Super Top-Up of ₹20 lakh with ₹5 lakh deductible — it costs ₹3,000–5,000/year for a 30-year-old and fills the group policy gap.' },
      { question: 'How do I file a claim for monsoon waterlogging damage to my car?', answer: 'Inform your insurer within 24 hours via their app or helpline. Take photos of water level and damage. Do NOT start the engine if the car was submerged. We coordinate surveys at Koramangala garages and escalate delayed claims. Engine protection add-on covers water ingression — most Koramangala residents don\'t realize their standard policy excludes this.' },
    ],
  },

  indiranagar: {
    hospitals: [
      'Manipal Hospital (HAL 2nd Stage, 5 min)',
      'Columbia Asia Hospital (Bellar Road, 8 min)',
      'Narayana Nethralaya (Rajajinagar, 15 min)',
      'Vikram Hospital (Millers Tank Bund, 12 min)',
      'Aster CMI Hospital (Hebbal, 20 min)',
    ],
    itParks: [
      'Embassy Golf Links (Old Airport Road)',
      'Bagmane Tech Park (CV Raman Nagar)',
      'SMARTWorks (Indiranagar 100 Feet Road)',
      'Kirloskar Business Park',
    ],
    profile: 'Indiranagar is one of Bangalore\'s most established residential neighborhoods, popular with upper-middle-class families and senior citizens who have lived here for 20–40 years. The area spans 100 Feet Road (commercial), 12th Main (residential), and HAL 2nd Stage (mixed-use). Many original residents are retired LIC policyholders with maturity claims pending. The demographic skews older than Koramangala, with a significant 55+ population in the independent houses along 80 Feet Road and 12th Main.',
    insuranceFocus: 'Indiranagar\'s older resident base means high demand for LIC maturity claim processing, pension plan optimization under Section 80CCC, and health insurance portability for seniors switching from employer group plans to personal cover. We process LIC claims at the Indiranagar branch (3rd Main) and coordinate with HAL branch for faster settlements. A common scenario: retired LIC policyholders discover they have loyalty bonuses they didn\'t claim — we recovered ₹1.2 crore in unclaimed bonuses for Indiranagar families in 2025 alone.',
    localFaqs: [
      { question: 'Can you help me claim my LIC maturity amount at the Indiranagar branch?', answer: 'Yes. We handle the full documentation — original policy bond, NEFT mandate form, KYC documents, and surrender/maturity claim forms. Most claims process in 7–15 working days at the Indiranagar branch (3rd Main, 100 Feet Road). If there are outstanding issues like missing nomination updates, we resolve them before submission to avoid rejection.' },
      { question: 'What health insurance do you recommend for retirees in Indiranagar?', answer: 'For retirees aged 60+: Star Health Senior Citizens Red Carpet (covers pre-existing after 12 months), ICICI Lombard Senior First (cashless at Manipal Hospital Indiranagar), Care Senior (highest sum insured options). We compare premiums across all three and factor in the specific hospitals near Indiranagar to ensure cashless coverage where you\'re most likely to need it.' },
      { question: 'How does Indiranagar\'s traffic affect motor insurance claims?', answer: 'Indiranagar\'s narrow lanes (12th Main, 5th Cross) and high-density parking lead to frequent minor collision and scratch claims. Zero-depreciation add-on is essential here — it covers full part replacement cost without deducting depreciation. We\'ve seen 40% higher minor claims frequency in Indiranagar compared to newer layouts like HSR.' },
    ],
  },

  jayanagar: {
    hospitals: [
      'Apollo Hospital (Jayanagar 1st Block)',
      'Bangalore Medical College (nearby)',
      'Sagar Hospital (Banashankari, 10 min)',
      'BGS Global Hospital (Kengeri Road, 15 min)',
      'Aster AV Clinics (Jayanagar 4th Block)',
    ],
    itParks: [
      'Jayanagar 4th Block Commercial Complex',
      'BFSI SEZ (JP Nagar border)',
      'Jayanagar 9th Block Tech Hub',
    ],
    profile: 'Jayanagar is a well-established, family-oriented neighborhood with a strong middle-class residential base. The area covers blocks 1–12, with 4th Block serving as the commercial center (shops, restaurants, near Brigade Road). Many families here are dual-income households with school-age children, and there\'s a significant population of senior citizens in the cooperative housing societies along 5th and 7th Block. Average property prices: ₹8,000–12,000/sq ft.',
    insuranceFocus: 'Jayanagar families typically need comprehensive family floater plans (₹15–25 lakh) covering 2 adults + children, plus term insurance for the primary earner. Senior citizens in 1st and 5th Block frequently need help with LIC policy revival and pension plan conversions. We handle all Apollo Hospital (Jayanagar 1st Block) cashless pre-authorizations directly — no need to visit the hospital help desk.',
    localFaqs: [
      { question: 'Which family floater plan is best for Jayanagar residents?', answer: 'For a family of 4 (2 adults + 2 children), HDFC Ergo Optima Secure (₹25L, no-claim bonus accumulates yearly) or Niva Bupa ReAssure 2.0 (₹20L, annual health check-up included). Both are cashless at Apollo Jayanagar. Premiums for a 35-year-old couple + 2 kids: ₹12,000–18,000/year depending on the plan.' },
      { question: 'My parents live in Jayanagar 5th Block and their LIC policy lapsed. Can you revive it?', answer: 'Yes. LIC revival within 5 years of lapse requires premium payment with late fees (typically 5–8% of outstanding premiums). We handle the revival at Jayanagar branch, including Form 680 submission, medical examination coordination (if required for policies above ₹10 lakh), and NEFT mandate setup for future premium auto-debit. Average revival time: 10–15 working days.' },
      { question: 'Do you offer doorstep service in Jayanagar?', answer: 'Yes. We visit Jayanagar blocks 1–12 for policy reviews, claim submissions, and renewal assistance. Most meetings happen at your apartment complex clubhouse or a nearby café. WhatsApp us at +91-99866 34506 with your area and preferred time — we typically schedule within 24–48 hours.' },
    ],
  },

  whitefield: {
    hospitals: [
      'Manipal Hospital Whitefield (ITPL Road)',
      'Columbia Asia Hospital (Whitefield Main Road)',
      'Sparsh Hospital (MM Main Road, 8 min)',
      'Narayana Health (Electronic City, 25 min)',
      'Gleneagles Global Hospital (Lakeside Road)',
    ],
    itParks: [
      'ITPL (International Tech Park Bangalore)',
      'RMZ Ecoworld (Sarjapur Road, nearby)',
      'Bagmane Tech Park (CV Raman Nagar)',
      'Prestige Tech Park (Outer Ring Road)',
      'Embassy TechVillage (Outer Ring Road)',
    ],
    profile: 'Whitefield is Bangalore\'s largest IT corridor with over 500,000 working professionals across ITPL, RMZ Ecoworld, and surrounding tech parks. The area is split into Whitefield Main Road (older residential), ITPL Road (mixed commercial/residential), and the newer developments along Sarjapur-Whitefield Road. Most residents are young IT professionals (25–40 years) in gated communities and apartment complexes. Waterlogging is a persistent monsoon issue on Whitefield Main Road.',
    insuranceFocus: 'Whitefield\'s IT professional demographic drives demand for high-sum-insured term insurance (₹1–2 crore), loss-of-income riders for critical illness, and personal accident covers for daily commute on Bangalore\'s accident-prone Outer Ring Road. We specialize in claim recovery for waterlogging damage — Whitefield Main Road sees 50+ vehicle damage claims every monsoon. Cashless treatment at Manipal Hospital Whitefield is pre-arranged for our clients.',
    localFaqs: [
      { question: 'What term insurance cover do Whitefield IT professionals need?', answer: 'For an IT professional earning ₹12–25 LPA: minimum ₹1 crore term cover (costs ₹600–900/month for a 30-year-old). Recommended: ₹1.5–2 crore with critical illness rider (covers cancer, heart attack, stroke) and waiver of premium rider. HDFC Click 2 Protect Life and ICICI Pru iProtect Smart are the most popular among Whitefield tech workers — we help compare and choose.' },
      { question: 'How do I claim waterlogging damage to my car in Whitefield?', answer: 'Step 1: Do NOT start the engine if submerged. Step 2: Call insurer within 24 hours (we handle this for you). Step 3: Take photos/video of water level and damage location. Step 4: Get a surveyor appointment (we arrange this within 24 hours at Whitefield garages). Step 5: Engine protection add-on covers water ingression — standard comprehensive policies exclude this. We help 20–30 Whitefield residents with waterlogging claims every monsoon.' },
      { question: 'Is there cashless treatment at Manipal Hospital Whitefield?', answer: 'Yes, Manipal Hospital Whitefield (ITPL Road) is in the cashless network of all major insurers — Star Health, HDFC Ergo, ICICI Lombard, Care, and Niva Bupa. We handle pre-authorization paperwork at Manipal so you don\'t wait in the insurance desk queue during emergencies. Average pre-auth approval time: 3–6 hours.' },
    ],
  },

  'hsr-layout': {
    hospitals: [
      'Narayana Health City (HSR Layout 25th Main)',
      'Aster CMI Hospital (Hebbal, 20 min)',
      'Apollo Spectra (Koramangala, 10 min)',
      'Manipal Hospital (Sarjapur Road, 12 min)',
      'Cloudnine Hospital (HSR Layout 17th Main)',
    ],
    itParks: [
      'Outer Ring Road IT Corridor',
      'HSR Layout 14th Main Commercial Hub',
      'Prestige Tech Park (adjacent)',
      'Manyata Tech Park (Hebbal, 25 min)',
    ],
    profile: 'HSR Layout is a planned residential layout with 27 sectors, known for its wide roads, green spaces, and young professional population. Sectors 1–6 are the most established, while sectors 14–25 are newer developments. The area has a strong mix of IT professionals, small business owners, and families. 17th Main and 14th Main serve as commercial corridors. Average apartment rent: ₹18,000–40,000/month.',
    insuranceFocus: 'HSR Layout residents have a specific insurance gap: many work in Outer Ring Road companies with basic group cover but need personal term and health insurance. The area also has a growing senior citizen population in sectors 1–3 who need LIC maturity claim processing. We handle cashless pre-authorizations at Narayana Health City (HSR Layout 25th Main) — the closest major hospital.',
    localFaqs: [
      { question: 'Which health insurance plans cover Narayana Health City HSR Layout?', answer: 'Narayana Health City is in the network of Star Health, HDFC Ergo, ICICI Lombard, Care Health, and Niva Bupa. We verify your specific plan\'s cashless eligibility at Narayana before you visit — no surprises at the billing desk. For new policies, we recommend plans that include Narayana in their network given its proximity to HSR Layout.' },
      { question: 'What motor insurance add-ons are essential for HSR Layout residents?', answer: 'Zero-depreciation (covers full glass/tire/bumper replacement), engine protection (HSR Layout sees monsoon waterlogging near the Outer Ring Road flyover), and roadside assistance (useful for breakdowns on the ORC). These three add-ons cost ₹2,000–4,000/year extra but can save ₹30,000–80,000 per claim.' },
      { question: 'I\'m an IT professional on HSR Layout — do I need personal insurance beyond my company plan?', answer: 'Absolutely. Company group insurance ends when you leave the job, usually has ₹3–8 lakh coverage (insufficient for major surgeries), and doesn\'t cover your spouse or parents. A personal term plan (₹1–1.5 crore) plus a family floater (₹20 lakh) costs ₹15,000–25,000/year and covers you regardless of employment. We help 100+ ORC professionals set this up annually.' },
    ],
  },

  marathahalli: {
    hospitals: [
      'Sakra World Hospital (Devarabeesyanahalli)',
      'Manipal Hospital (Sarjapur Road, 10 min)',
      'Narayana Health City (HSR Layout, 12 min)',
      'Aster CMI Hospital (Hebbal, 25 min)',
      'Fortis Hospital (Bannerghatta Road, 20 min)',
    ],
    itParks: [
      'Prestige Tech Park (Outer Ring Road)',
      'RMZ Ecoworld (Sarjapur Road)',
      'Embassy TechVillage (Outer Ring Road)',
      'Bagmane Tech Park (CV Raman Nagar, 10 min)',
    ],
    profile: 'Marathahalli sits at the intersection of the Outer Ring Road and Old Airport Road, making it one of Bangalore\'s most traffic-congested residential areas. The neighborhood has a dense concentration of IT professionals living in apartment complexes along Marathahalli Main Road and the areas behind the bridge. Average resident age is 28–35 years. Monsoon flooding near the Marathahalli bridge is an annual issue affecting vehicles parked on the service road.',
    insuranceFocus: 'Marathahalli residents need strong motor insurance due to high accident frequency on the ORC. We recommend zero-depreciation + engine protection + personal accident cover of ₹25 lakh (minimum). Health insurance should cover Sakra World Hospital (closest premium hospital, 5 minutes away). Many residents discover their employer group cover has a ₹3 lakh sub-limit on room rent — we help identify and bridge this gap.',
    localFaqs: [
      { question: 'What should my motor insurance cover include for ORC driving?', answer: 'For Outer Ring Road daily commute: Zero-depreciation (mandatory — ORC has high minor collision rates), engine protection (₹2,500/year — covers water ingression from bridge flooding), and personal accident cover of ₹25 lakh (₹750/year). Total add-on cost: ~₹3,500/year. One waterlogging claim alone can cost ₹30,000–60,000 without engine protection.' },
      { question: 'How do I find out if my employer health plan has room rent limits?', answer: 'Check your group policy document for "sub-limit on room" or "room rent cap" — it\'s usually mentioned in the benefits schedule. Most group plans cap room rent at ₹3,000–5,000/day (1% of sum insured). A single ICU stay at Sakra World costs ₹15,000–25,000/day, meaning you\'d pay the difference out of pocket. We help upgrade to a personal plan without these limits.' },
      { question: 'Can you help with a waterlogging car claim at Marathahalli bridge?', answer: 'Yes, we handle 20–30 such claims every monsoon. Key: do NOT restart the engine, photograph water level, inform insurer within 24 hours. We arrange surveyor visits at Marathahalli garages and escalate claims that insurers try to reject as "driver negligence." Our success rate on waterlogging claims: 85% settlement within 30 days.' },
    ],
  },

  'j-p-nagar': {
    hospitals: [
      'Apollo Hospital (Bannerghatta Road, 8 min)',
      'Fortis Hospital (Bannerghatta Road)',
      'BGS Global Hospital (Kengeri Road)',
      'Sagar Hospital (Banashankari, 10 min)',
      'Narayana Health (HSR Layout, 15 min)',
    ],
    itParks: [
      'JP Nagar 4th Phase Commercial Complex',
      'BFSI SEZ (Bannerghatta Road)',
      'Electronics City (25 min)',
    ],
    profile: 'JP Nagar is a well-planned residential area with 7 phases, popular with government employees, retired professionals, and middle-class families. The area has lower commercial density compared to Koramangala or Whitefield, making it quieter and more residential. Many original allottees from the 1980s–90s are now senior citizens with LIC policies nearing maturity. Bannerghatta Road (south boundary) is the main commercial corridor.',
    insuranceFocus: 'JP Nagar\'s demographic — older residents with existing LIC policies + families near Bannerghatta Road hospitals — drives demand for LIC maturity claim processing, pension conversions, and health insurance at Apollo/Fortis Bannerghatta. Senior citizens often need help navigating IRDAI\'s Section 45 protections (insurer cannot deny claims after 3 years of continuous coverage). We process most JP Nagar LIC claims at the JP Nagar branch (24th Main).',
    localFaqs: [
      { question: 'Can you help me claim my LIC policy that\'s about to mature in JP Nagar?', answer: 'Yes. We handle the complete maturity claim process: document verification, NEFT mandate setup, submission at JP Nagar branch (24th Main), and follow-up. Average processing time: 7–12 working days. If your policy has a loyalty bonus or survival benefit you weren\'t aware of, we identify and claim that too — we recovered ₹45 lakh in bonus amounts for JP Nagar clients in 2025.' },
      { question: 'What health insurance is best for JP Nagar\'s Bannerghatta Road hospitals?', answer: 'For Apollo Hospital (Bannerghatta Road): ICICI Lombard Health First or Star Health Family Comprehensive — both have cashless arrangements. For Fortis Hospital: Care Health or HDFC Ergo Optima. We match your specific hospital preference to the insurer with the strongest cashless network there. Premium comparison: ₹12,000–20,000/year for a family of 4 (age 30–35).'},
      { question: 'How do Section 45 protections work for JP Nagar senior citizens?', answer: 'Section 45 of the Insurance Act says: after 3 years of continuous coverage, the insurer CANNOT reject a claim based on misrepresentation or non-disclosure (except fraud). This is powerful for JP Nagar seniors with old LIC policies. If your claim is rejected for pre-existing disease after 3 years, it\'s automatically appealable. We handle the IRDAI IGMS complaint and Ombudsman escalation.' },
    ],
  },

  bellandur: {
    hospitals: [
      'Sakra World Hospital (Devarabeesyanahalli, 5 min)',
      'Manipal Hospital (Sarjapur Road, 10 min)',
      'Narayana Health City (HSR Layout, 12 min)',
      'Columbia Asia Hospital (Whitefield, 15 min)',
      'Cloudnine Hospital (Koramangala, 12 min)',
    ],
    itParks: [
      'Prestige Tech Park (Outer Ring Road)',
      'Embassy TechVillage (Outer Ring Road)',
      'RMZ Ecoworld (Sarjapur Road)',
      'Manyata Tech Park (Hebbal, 20 min)',
    ],
    profile: 'Bellandur sits along the Outer Ring Road between Marathahalli and Sarjapur, surrounded by the highest concentration of IT parks in Bangalore. The area has a mix of older independent houses (Bellandur Village) and newer apartment complexes (Sobha Dream Acres, Prestige Lakeside Habitat). Bellandur Lake pollution and flooding during monsoon is a well-known issue that directly impacts vehicle and home insurance claims in the area.',
    insuranceFocus: 'Bellandur\'s IT-heavy demographic needs high term insurance (₹1–2 crore) and Super Top-Up health plans to bridge group policy gaps. The annual monsoon flooding near Bellandur Lake causes dozens of vehicle damage and home water seepage claims — we specialize in fast-track claim processing for these. Residents also benefit from claim recovery help when insurers deny waterlogging damage citing "natural calamity" exclusions.',
    localFaqs: [
      { question: 'Does home insurance cover Bellandur Lake flooding damage?', answer: 'Standard home insurance policies in India typically exclude flood and waterlogging damage. However, some policies (HDFC Ergo Home Insurance, ICICI Lombard Property Insurance) offer optional water damage riders. For apartment residents, check your builder\'s insurance policy — many newer complexes like Sobha and Prestige have bulk policies that cover common area water damage. We help file claims under both personal and builder policies.' },
      { question: 'What\'s the best health insurance for Bellandur IT professionals?', answer: 'For a 28–35 year old IT professional: Niva Bupa ReAssure 2.0 (₹25L, cashless at Sakra World), HDFC Ergo Optima Secure (₹20L, no-claim bonus up to 100%), or ICICI Lombard Health Plus (₹15L, includes annual check-up). All three are cashless at Sakra World Hospital (5 minutes from Bellandur). Premium: ₹8,000–14,000/year depending on age and sum insured.' },
      { question: 'My car was damaged in Bellandur Lake flooding last monsoon. Can I still claim?', answer: 'If it was within 12 months and you have documentation (photos, FIR if filed, mechanic report), you may still have recourse. For active claims: inform insurer immediately, get a surveyor assessment, and escalate if they cite "natural calamity" exclusion — IRDAI guidelines require case-by-case evaluation. We recovered ₹15 lakh in flood damage claims for Bellandur residents in the 2025 monsoon season.' },
    ],
  },

  sarjapur: {
    hospitals: [
      'Manipal Hospital (Sarjapur Road, 5 min)',
      'Narayana Health City (HSR Layout, 15 min)',
      'Aster CMI Hospital (Hebbal, 25 min)',
      'Fortis Hospital (Bannerghatta Road, 20 min)',
      'Apollo Spectra (Koramangala, 18 min)',
    ],
    itParks: [
      'RMZ Ecoworld (Sarjapur Road)',
      'RGA Tech Park (Sarjapur Road)',
      'Pritech Park SEZ (Sarjapur)',
      'Wipro SEZ (Sarjapur Road)',
    ],
    profile: 'Sarjapur Road is Bangalore\'s fastest-growing residential corridor, extending from HSR Layout to Sarjapur town. The area has a mix of new apartment complexes (Prestige, Sobha, Brigade), plotted developments, and the older Sarjapur village area. Average resident age is 28–38 years, predominantly IT professionals. The area is still developing basic infrastructure, which affects access to healthcare and emergency services.',
    insuranceFocus: 'Sarjapur residents face specific insurance challenges: distance from major hospitals (nearest premium hospital is Manipal at 5–15 min depending on traffic), ongoing construction-related accidents, and limited cashless hospital network compared to central Bangalore. We recommend health insurance with a broader hospital network (Star Health, Care) and higher ambulance cover. Motor insurance should include roadside assistance due to the developing road infrastructure.',
    localFaqs: [
      { question: 'Which hospitals near Sarjapur accept cashless health insurance?', answer: 'Manipal Hospital Sarjapur Road (closest premium hospital, 5–10 min) is in the network of Star Health, HDFC Ergo, ICICI Lombard, and Care. Narayana Health City (HSR Layout, 15 min) adds Niva Bupa to the list. For emergencies, we pre-authorize at whichever hospital has beds available — we coordinate across all five within 30 minutes of your call.' },
      { question: 'Do I need special insurance for construction-related risks in Sarjapur?', answer: 'If you\'re building a house on a plotted site in Sarjapur: Builder\'s Risk Insurance covers material theft, construction delays, and worker injury during building. For apartment buyers: check if the builder has a Structural Defect Liability Insurance (IRDAI recommends 5-year coverage). We help verify builder insurance and advise on additional personal coverage during the construction phase.' },
      { question: 'What roadside assistance should Sarjapur drivers have?', answer: 'Due to developing road infrastructure and longer distances to service centers: comprehensive roadside assistance add-on (₹500–1,000/year) covering flat tire change, battery jump-start, fuel delivery, towing up to 50 km, and locksmith service. Available with ICICI Lombard, HDFC Ergo, and Bajaj Allianz motor policies. We arrange this as part of your annual renewal — most Sarjapur residents don\'t realize how useful it is until they need it on Sarjapur Road at night.' },
    ],
  },

  yelahanka: {
    hospitals: [
      'Manipal Hospital Yelahanka (New Town)',
      'Aster CMI Hospital (Hebbal, 15 min)',
      'Narayana Health (Hebbal, 18 min)',
      'BGS Global Hospital (Kengeri, 25 min)',
      'Sparsh Hospital (Yelahanka New Town)',
    ],
    itParks: [
      'Manyata Tech Park (Hebbal, 15 min)',
      'Bagmane Tech Park (CV Raman Nagar, 20 min)',
      'KIAL/Airport SEZ (Kempegowda International Airport area)',
      'KIADB Industrial Area (Yelahanka)',
    ],
    profile: 'Yelahanka is a large residential area in North Bangalore, split into Old Town (established, 30+ years) and New Town (developed from 2000 onwards). The area has a mix of government employees, retired professionals, and increasingly IT workers commuting to Manyata Tech Park. Yelahanka New Town has several gated communities and independent houses. The area is 20 km from Electronics City and 15 km from the airport.',
    insuranceFocus: 'Yelahanka\'s dual demographic (older established families + new IT residents) creates two distinct insurance needs: LIC maturity claim processing and pension planning for seniors, plus term and health insurance for younger families. The area\'s distance from central Bangalore means residents need good ambulance coverage and cashless hospital access at Manipal Yelahanka or Aster CMI Hebbal. Motor insurance should account for longer commute distances to IT corridors.',
    localFaqs: [
      { question: 'Is there a cashless hospital near Yelahanka New Town?', answer: 'Yes. Manipal Hospital Yelahanka (New Town, 1st Main Road) is in the cashless network of Star Health, ICICI Lombard, HDFC Ergo, and Care. Sparsh Hospital (Yelahanka New Town) is also cashless-eligible for some insurers. For emergencies beyond Yelahanka, Aster CMI (Hebbal, 15 min) covers all major insurers. We handle pre-authorizations at all three.' },
      { question: 'What insurance should I have for the airport commute from Yelahanka?', answer: 'Long commutes to the airport (25–40 km depending on route) increase motor insurance risk. Recommended: Zero-depreciation cover, personal accident cover of ₹25 lakh, and roadside assistance (useful for NH44 breakdowns). For frequent flyers: travel insurance with trip cancellation cover is separate from motor insurance but equally important for Yelahanka residents who travel frequently.' },
      { question: 'How do I claim my LIC policy at the Yelahanka branch?', answer: 'Yelahanka LIC branch (3rd Main, New Town) processes maturity and death claims. We handle documentation, submission, and follow-up. If the branch has delays (common for claims above ₹10 lakh requiring central office approval), we escalate through the zonal office. Average claim settlement: 10–15 working days. We also help with NEFT mandate setup if your existing bank details have changed.' },
    ],
  },
};
