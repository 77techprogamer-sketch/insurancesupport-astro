import json

# Location-specific content data
location_content = {
    'bangalore-indiranagar': {
        'name': 'Indiranagar, Bangalore',
        'state': 'Karnataka',
        'desc': 'For residents in Indiranagar, Bangalore, Hari Kotian provides direct insurance advisory for 100 feet Road professionals, senior citizens in Defence Colony, and families near HAL. Doorstep service with IRDAI Reg No: 0149161D.',
        'it_focus': 'Indiranagar professionals at startups on 100 Feet Road need flexible term insurance with portability. We offer Super Top-Up health plans for entrepreneurs, and group health optimization for small teams. Real case: A fintech founder ported his term cover after funding round -- seamless within 7 days.',
        'senior_focus': 'Defence Colony and nearby senior residents benefit from our LIC claim settlement expertise. We handle pension plan advisories, maturity claims, and health insurance portability for seamless transitions.',
        'branch_dets': 'Direct coordination with LIC branches on Old Madras Road and nearby areas. Full claim documentation support -- cashless approval, discharge, and IRDAI appeals within 48 hours.',
        'local_faqs': [
            {'question': 'Best cashless hospitals in Indiranagar?', 'answer': 'Columbia Asia (100 Feet Road), Manipal Hospital (Old Airport Road), Cloudnine (Indiranagar), Aster CMI (Hebbal nearby). We handle all pre-authorization.'},
            {'question': 'Term insurance for startup founders?', 'answer': 'Yes -- plans with flexible premium payment aligned to funding cycles. HDFC Click 2 Protect, ICICI Pru iProtect, and Max Money Super Sure are popular choices.'},
            {'question': 'Motor insurance renewal in Indiranagar?', 'answer': 'Doorstep renewal with zero-depreciation and engine protection. Indiranagar parking density makes these essential.'},
            {'question': 'Health insurance for small business owners?', 'answer': 'Group health plans for teams of 3-50 employees. We optimize premiums while ensuring maternity, OPD, and wellness benefits.'}
        ],
        'areas': ['100 Feet Road', 'Defence Colony', 'HAL 2nd Stage', 'HAL 3rd Stage', 'Domlur', 'Kammanahalli', 'Banaswadi'],
        'nearby': ['bangalore-koramangala', 'bangalore-whitefield', 'bangalore-kammanahalli', 'bangalore-domlur']
    },
    'bangalore-whitefield': {
        'name': 'Whitefield, Bangalore',
        'state': 'Karnataka',
        'desc': 'Insurance advisory for Whitefield IT professionals, EPIP zone employees, and Graphite India residents. Hari Kotian provides doorstep claim support with 25+ years experience. IRDAI Reg No: 0149161D.',
        'it_focus': 'Whitefield has 300,000+ IT professionals at ITPL, EPIP, and Graphite India. We specialize in term insurance for techies with ESOP-linked premium flexibility, Super Top-Up health plans covering Apollo Whitefield and Columbia Asia, and group health for startups.',
        'senior_focus': 'Senior residents in Graphite India and surrounding layouts receive pension optimization, LIC maturity claim acceleration, and health insurance portability assistance.',
        'branch_dets': 'Coordination with LIC branches in ITPL and Hoodi. IRDAI appeal filing within 48 hours for denied claims.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Whitefield?', 'answer': 'Columbia Asia (Whitefield), Apollo Clinic (ITPL), Narayana Health (Kaikondrahalli), Manipal Hospital (Varthur Road). Full cashless support provided.'},
            {'question': 'Term insurance for ITPL employees?', 'answer': 'Yes -- plans with income-linked coverage up to 50x annual income. Waiver of Premium rider recommended for job transitions.'},
            {'question': 'Group health for Whitefield startups?', 'answer': 'Custom plans for 5-100 employee teams. Maternity, OPD, wellness, and telemedicine included.'},
            {'question': 'Motor insurance in Whitefield?', 'answer': 'Doorstep service with zero-depreciation, engine protection, and roadside assistance for ORR commuters.'}
        ],
        'areas': ['ITPL', 'EPIP Zone', 'Graphite India', 'Kaikondrahalli', 'Varthur Road', 'Hoodi', 'Kadubeesanahalli', 'Ramamurthy Nagar'],
        'nearby': ['bangalore-marathahalli', 'bangalore-kr-puram', 'bangalore-hebbal', 'bangalore-hoodi']
    },
    'bangalore-electronic-city': {
        'name': 'Electronic City, Bangalore',
        'state': 'Karnataka',
        'desc': 'Electronic City insurance advisor for Infosys, Wipro, HCL, and tech park professionals. Hari Kotian provides doorstep claim support and term insurance advisory. IRDAI Reg No: 0149161D.',
        'it_focus': 'Electronic City has 200,000+ tech professionals. We offer term insurance with critical illness riders for Infosys/Wipro employees, Super Top-Up health plans covering Narayana Health and Apollo Electronic City, and seamless portability when changing employers.',
        'senior_focus': 'Senior residents in nearby townships get LIC claim support, pension advisory, and health insurance portability.',
        'branch_dets': 'Direct coordination with LIC branches in Electronic City Phase 1 and 2. Same-day claim escalation.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Electronic City?', 'answer': 'Narayana Health (Electronic City), Apollo Clinic (Phase 1), Aster (Near Infosys), Fortis (Bannerghatta Road nearby). Full pre-authorization handled.'},
            {'question': 'Term insurance for Infosys/Wipro employees?', 'answer': 'Plans with flexible premium payment, critical illness rider (36 diseases), and global cover for onsite assignments. HDFC, ICICI Pru, Max, Tata AIA options.'},
            {'question': 'Group health for tech companies?', 'answer': 'Custom group plans with OPD, maternity, wellness, and telemedicine. Premium optimization for 50-5000 employee organizations.'},
            {'question': 'Motor insurance in Electronic City?', 'answer': 'Doorstep renewal with zero-depreciation, engine protection, and consumables cover for long commute vehicles.'}
        ],
        'areas': ['Phase 1', 'Phase 2', 'Veerasandra', 'Konappana Agrahara', 'Hebbagodi', 'Chandapura', 'Singasandra'],
        'nearby': ['bangalore-hsr-layout', 'bangalore-bannerghatta', 'bangalore-marathahalli', 'bangalore-hoodi']
    },
    'bangalore-hsr-layout': {
        'name': 'HSR Layout, Bangalore',
        'state': 'Karnataka',
        'desc': 'HSR Layout insurance advisor for tech professionals in Sectors 1-7, startup founders, and families. Hari Kotian provides doorstep claim support with 25+ years experience. IRDAI Reg No: 0149161D.',
        'it_focus': 'HSR Layout is a startup hub with thousands of tech professionals. We offer term insurance with flexible premiums for entrepreneurs, Super Top-Up health plans for startup employees, and group health optimization. Real case: A SaaS founder ported term cover post-funding in 5 days.',
        'senior_focus': 'Senior residents in HSR Layout get LIC maturity claim acceleration, pension plan optimization, and seamless health insurance portability.',
        'branch_dets': 'Coordination with LIC branches in BTM Layout and nearby areas. IRDAI appeal filing within 48 hours.',
        'local_faqs': [
            {'question': 'Cashless hospitals in HSR Layout?', 'answer': 'Narayana Health (HSR Layout), Fortis (Bannerghatta Road), Apollo Spectra (Koramangala nearby), Sakra World Hospital (Marathahalli nearby). Full cashless support.'},
            {'question': 'Term insurance for startup employees?', 'answer': 'Flexible premium plans with ESOP-linked payment cycles, critical illness rider, and global cover. HDFC, ICICI, Max options available.'},
            {'question': 'Health insurance for startups?', 'answer': 'Group plans for 3-100 employees. Maternity, OPD, wellness, telemedicine. Premium optimization included.'},
            {'question': 'Motor insurance in HSR Layout?', 'answer': 'Doorstep service with zero-depreciation, engine protection, and roadside assistance for ORR commuters.'}
        ],
        'areas': ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6', 'Sector 7', 'BTM Layout (nearby)'],
        'nearby': ['bangalore-koramangala', 'bangalore-btm-layout', 'bangalore-electronic-city', 'bangalore-sarjapur']
    },
    'bangalore-marathahalli': {
        'name': 'Marathahalli, Bangalore',
        'state': 'Karnataka',
        'desc': 'Marathahalli insurance advisor for ORR tech professionals, startup employees, and residents near HAL. Doorstep claim support and term insurance advisory by Hari Kotian. IRDAI Reg No: 0149161D.',
        'it_focus': 'Marathahalli on ORR has 150,000+ professionals. We specialize in term insurance for tech employees with portability, Super Top-Up health plans covering Sakra World Hospital and Columbia Asia, and seamless employer transition support.',
        'senior_focus': 'Senior residents receive LIC claim processing, pension advisory, and health insurance portability assistance.',
        'branch_dets': 'Direct coordination with LIC branches on ORR and nearby. Same-day claim escalation and IRDAI appeal filing.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Marathahalli?', 'answer': 'Sakra World Hospital, Columbia Asia (Whitefield nearby), Manipal (Old Airport Road), Apollo (ITPL nearby). Full pre-authorization handled.'},
            {'question': 'Term insurance for ORR commuters?', 'answer': 'Flexible premium plans with critical illness rider, global cover, and waiver of premium for job transitions. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Group health for Marathahalli companies?', 'answer': 'Custom plans for 5-500 employees. Maternity, OPD, wellness, telemedicine. Premium optimization included.'},
            {'question': 'Motor insurance on ORR?', 'answer': 'Doorstep service with zero-depreciation, engine protection, and 24/7 roadside assistance for ORR daily commuters.'}
        ],
        'areas': ['HAL', 'Outer Ring Road', 'Varthur Road', 'Kundalahalli', 'Munnekolala', 'BEML Layout', 'Thubarahalli'],
        'nearby': ['bangalore-whitefield', 'bangalore-kr-puram', 'bangalore-bellandur', 'bangalore-hsr-layout']
    },
    'bangalore-jp-nagar': {
        'name': 'JP Nagar, Bangalore',
        'state': 'Karnataka',
        'desc': 'JP Nagar insurance advisor for South Bangalore families, tech professionals, and seniors. Hari Kotian provides doorstep claim support with 25+ years experience. IRDAI Reg No: 0149161D.',
        'it_focus': 'JP Nagar professionals working in Bannerghatta Road tech parks need term insurance with portability, Super Top-Up health plans covering Fortis and Apollo, and group health for mid-size companies.',
        'senior_focus': 'Large senior population in JP Nagar phases gets LIC maturity claim support, pension optimization, and health insurance portability.',
        'branch_dets': 'Coordination with LIC branches in JP Nagar and Jayanagar. IRDAI appeal filing within 48 hours for denied claims.',
        'local_faqs': [
            {'question': 'Cashless hospitals in JP Nagar?', 'answer': 'Fortis (Bannerghatta Road), Apollo Spectra (Koramangala), Narayana Health (HSR Layout), Cloudnine (JP Nagar). Full cashless support.'},
            {'question': 'Term insurance for South Bangalore professionals?', 'answer': 'Flexible plans with critical illness rider, global cover, and income-linked coverage up to 50x. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Health insurance for families in JP Nagar?', 'answer': 'Family floater 25-30 lakh, Super Top-Up 20 lakh deductible. Covers maternity, OPD, wellness for South Bangalore hospital rates.'},
            {'question': 'Motor insurance in JP Nagar?', 'answer': 'Doorstep service with zero-depreciation, engine protection, and consumables cover.'}
        ],
        'areas': ['1st Phase', '2nd Phase', '3rd Phase', '4th Phase', '5th Phase', '6th Phase', '7th Phase', '8th Phase', '9th Phase', 'Jayanagar (nearby)', 'Bannerghatta Road'],
        'nearby': ['bangalore-jayanagar', 'bangalore-bannerghatta', 'bangalore-btm-layout', 'bangalore-koramangala']
    },
    'bangalore-bellandur': {
        'name': 'Bellandur, Bangalore',
        'state': 'Karnataka',
        'desc': 'Bellandur insurance advisor for Outer Ring Road tech professionals, startup employees, and lake-side residents. Doorstep claim support by Hari Kotian. IRDAI Reg No: 0149161D.',
        'it_focus': 'Bellandur on ORR has 100,000+ tech professionals. We offer term insurance with portability for employer changes, Super Top-Up health plans covering Sakra World and Columbia Asia, and startup group health.',
        'senior_focus': 'Senior residents get LIC claim support, pension advisory, and health insurance portability.',
        'branch_dets': 'Direct coordination with LIC branches on ORR and Marathahalli. Same-day claim escalation.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Bellandur?', 'answer': 'Sakra World Hospital (nearby), Columbia Asia (Whitefield), Manipal (Old Airport Road), Fortis (Bannerghatta Road). Full pre-authorization.'},
            {'question': 'Term insurance for Bellandur techies?', 'answer': 'Flexible premium plans with critical illness rider, global cover, and waiver of premium. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Group health for Bellandur startups?', 'answer': 'Custom plans for 3-100 employees. Maternity, OPD, wellness, telemedicine. Premium optimization included.'},
            {'question': 'Motor insurance near Bellandur lake?', 'answer': 'Doorstep renewal with zero-depreciation, engine protection, and roadside assistance for ORR commuters.'}
        ],
        'areas': ['ORR', 'Kadubeesanahalli', 'Panathur', 'Kudlu Gate', 'Iblur', 'Bellandur Lake Area'],
        'nearby': ['bangalore-marathahalli', 'bangalore-sarjapur', 'bangalore-hsr-layout', 'bangalore-whitefield']
    },
    'bangalore-sarjapur': {
        'name': 'Sarjapur, Bangalore',
        'state': 'Karnataka',
        'desc': 'Sarjapur Road insurance advisor for tech professionals in Wipro Infotech, Infosys, and township residents. Doorstep claim support by Hari Kotian. IRDAI Reg No: 0149161D.',
        'it_focus': 'Sarjapur Road has 80,000+ professionals in townships and tech parks. Term insurance with portability, Super Top-Up health covering Columbia Asia and Narayana Health, and group health for township communities.',
        'senior_focus': 'Senior residents in townships get LIC claim processing, pension advisory, and health portability.',
        'branch_dets': 'Coordination with LIC branches in Kaikondrahalli and Electronic City. IRDAI appeal within 48 hours.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Sarjapur?', 'answer': 'Columbia Asia (Sarjapur), Narayana Health (Kaikondrahalli), Fortis (Bannerghatta Road), Apollo (Electronic City). Full cashless support.'},
            {'question': 'Term insurance for township residents?', 'answer': 'Flexible plans with critical illness rider, global cover, and income-linked coverage. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Health insurance for Sarjapur families?', 'answer': 'Family floater 25-30 lakh, Super Top-Up 20 lakh deductible. Covers maternity, OPD, wellness for township hospital access.'},
            {'question': 'Motor insurance on Sarjapur Road?', 'answer': 'Doorstep renewal with zero-depreciation, engine protection, and roadside assistance.'}
        ],
        'areas': ['Wipro Infotech', 'Infosys', 'Kaikondrahalli', 'Haralur', 'Green Glen Layout', 'Rainbow Drive'],
        'nearby': ['bangalore-electronic-city', 'bangalore-hsr-layout', 'bangalore-bellandur', 'bangalore-whitefield']
    },
    'bangalore-yelahanka': {
        'name': 'Yelahanka, Bangalore',
        'state': 'Karnataka',
        'desc': 'Yelahanka insurance advisor for North Bangalore families, Air Force/Defence personnel, and tech professionals. Doorstep claim support by Hari Kotian. IRDAI Reg No: 0149161D.',
        'it_focus': 'Yelahanka professionals working in Manyata Tech Park and Devanahalli need term insurance with portability, Super Top-Up health covering Columbia Asia and Baptist Hospital, and group health for mid-size firms.',
        'senior_focus': 'Large defence/senior community gets LIC claim support, pension optimization, and health portability.',
        'branch_dets': 'Coordination with LIC branches in Yelahanka and Devanahalli. IRDAI appeal filing within 48 hours.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Yelahanka?', 'answer': 'Columbia Asia (Yelahanka), Baptist Hospital, Aster CMI (Hebbal nearby), Manipal (Hebbal). Full pre-authorization handled.'},
            {'question': 'Term insurance for Manyata Tech Park employees?', 'answer': 'Flexible premium plans with critical illness rider, global cover, and waiver of premium. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Health insurance for defence families?', 'answer': 'Complementary plans to ECHS/CGHS. Family floater 25-30 lakh, Super Top-Up 20 lakh deductible. Covers maternity, OPD, wellness.'},
            {'question': 'Motor insurance in Yelahanka?', 'answer': 'Doorstep service with zero-depreciation, engine protection, and roadside assistance.'}
        ],
        'areas': ['New Town', 'Doddaballapur Road', 'Air Force Station', 'Singh Estate', 'Kogilu', 'Attur Layout'],
        'nearby': ['bangalore-hebbal', 'bangalore-devanahalli', 'bangalore-jalahalli', 'bangalore-yelahanka-new-town']
    },
    'bangalore-jayanagar': {
        'name': 'Jayanagar, Bangalore',
        'state': 'Karnataka',
        'desc': 'Jayanagar insurance advisor for South Bangalore families, shopping district professionals, and seniors. Hari Kotian provides doorstep claim support with 25+ years experience. IRDAI Reg No: 0149161D.',
        'it_focus': 'Jayanagar professionals need term insurance with portability, Super Top-Up health covering Sagar Hospital and Fortis, and group health for retail/tech professionals.',
        'senior_focus': 'Large senior population in Jayanagar blocks gets LIC maturity claim support, pension advisory, and health insurance portability.',
        'branch_dets': 'Direct coordination with LIC branches in Jayanagar 4th Block and nearby. Same-day claim escalation.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Jayanagar?', 'answer': 'Sagar Hospital, Fortis (Bannerghatta Road), Apollo (Koramangala), Narayana Health (HSR Layout). Full cashless support.'},
            {'question': 'Term insurance for Jayanagar residents?', 'answer': 'Flexible plans with critical illness rider, global cover, and income-linked coverage. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Health insurance for senior citizens in Jayanagar?', 'answer': 'Senior citizen specific plans with pre-existing coverage after waiting period, domiciliary hospitalization, and annual health checkups. Portability from existing policies.'},
            {'question': 'Motor insurance in Jayanagar?', 'answer': 'Doorstep renewal with zero-depreciation, engine protection, and consumables cover.'}
        ],
        'areas': ['1st Block', '2nd Block', '3rd Block', '4th Block', '5th Block', '6th Block', '7th Block', '8th Block', '9th Block', 'Shopping Complex', 'East End'],
        'nearby': ['bangalore-jp-nagar', 'bangalore-bannerghatta', 'bangalore-koramangala', 'bangalore-btm-layout']
    },
    'bangalore-hebbal': {
        'name': 'Hebbal, Bangalore',
        'state': 'Karnataka',
        'desc': 'Hebbal insurance advisor for North Bangalore tech professionals, Manyata Tech Park employees, and lake-view residents. Doorstep claim support by Hari Kotian. IRDAI Reg No: 0149161D.',
        'it_focus': 'Hebbal professionals at Manyata Tech Park and nearby tech parks need term insurance with portability, Super Top-Up health covering Aster CMI and Baptist Hospital, and group health for tech companies.',
        'senior_focus': 'Senior residents get LIC claim processing, pension advisory, and health insurance portability.',
        'branch_dets': 'Coordination with LIC branches in Hebbal and Yelahanka. IRDAI appeal within 48 hours.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Hebbal?', 'answer': 'Aster CMI, Baptist Hospital, Columbia Asia (Yelahanka), Manipal Hospital. Full pre-authorization handled.'},
            {'question': 'Term insurance for Manyata Tech Park employees?', 'answer': 'Flexible premium plans with critical illness rider, global cover, and waiver of premium for job transitions. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Group health for Hebbal tech companies?', 'answer': 'Custom plans for 5-500 employees. Maternity, OPD, wellness, telemedicine. Premium optimization included.'},
            {'question': 'Motor insurance near Hebbal lake?', 'answer': 'Doorstep renewal with zero-depreciation, engine protection, and roadside assistance for NH-44 commuters.'}
        ],
        'areas': ['Manyata Tech Park', 'Nagavara', 'Hennur', 'Thanisandra', 'Rachenahalli', 'Hebbal Lake Area'],
        'nearby': ['bangalore-yelahanka', 'bangalore-kr-puram', 'bangalore-hoodi', 'bangalore-jalahalli']
    },
    'bangalore-devanahalli': {
        'name': 'Devanahalli, Bangalore',
        'state': 'Karnataka',
        'desc': 'Devanahalli insurance advisor for airport area professionals, township residents, and aerospace park employees. Doorstep claim support by Hari Kotian. IRDAI Reg No: 0149161D.',
        'it_focus': 'Devanahalli aerospace park and airport area professionals need term insurance with portability, Super Top-Up health covering Baptist Hospital and Columbia Asia, and group health for aerospace firms.',
        'senior_focus': 'Senior township residents get LIC claim support, pension advisory, and health portability.',
        'branch_dets': 'Coordination with LIC branches in Devanahalli and Yelahanka. IRDAI appeal filing within 48 hours.',
        'local_faqs': [
            {'question': 'Cashless hospitals in Devanahalli?', 'answer': 'Baptist Hospital (Hebbal nearby), Columbia Asia (Yelahanka), Aster CMI (Hebbal), Manipal (Hebbal). Full pre-authorization handled.'},
            {'question': 'Term insurance for airport/aerospace professionals?', 'answer': 'Flexible plans with critical illness rider, global cover, and income-linked coverage up to 50x. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Health insurance for township families?', 'answer': 'Family floater 25-30 lakh, Super Top-Up 20 lakh deductible. Covers maternity, OPD, wellness for township residents.'},
            {'question': 'Motor insurance near airport?', 'answer': 'Doorstep renewal with zero-depreciation, engine protection, and roadside assistance for airport commuters.'}
        ],
        'areas': ['Aerospace Park', 'Airport Area', 'Naganayakanahalli', 'Devanahalli Town', 'Avalahalli', 'Sugatur'],
        'nearby': ['bangalore-yelahanka', 'bangalore-hebbal', 'bangalore-jalahalli', 'bangalore-kr-puram']
    },
    'bangalore-bannerghatta': {
        'name': 'Bannerghatta Road, Bangalore',
        'state': 'Karnataka',
        'desc': 'Bannerghatta Road insurance advisor for South Bangalore tech professionals, Fortis/Apollo hospital corridor families, and seniors. Doorstep claim support by Hari Kotian. IRDAI Reg No: 0149161D.',
        'it_focus': 'Bannerghatta Road tech professionals in tech parks need term insurance with portability, Super Top-Up health covering Fortis, Apollo, and Narayana Health, and group health for companies.',
        'senior_focus': 'Senior residents along Bannerghatta corridor get LIC maturity claim support, pension optimization, and health insurance portability.',
        'branch_dets': 'Direct coordination with LIC branches in Bannerghatta Road and JP Nagar. Same-day claim escalation.',
        'local_faqs': [
            {'question': 'Cashless hospitals on Bannerghatta Road?', 'answer': 'Fortis Hospital, Apollo Hospitals, Narayana Health, Sagar Hospital. Full cashless support -- we handle all pre-authorization.'},
            {'question': 'Term insurance for Bannerghatta Road professionals?', 'answer': 'Flexible plans with critical illness rider, global cover, and income-linked coverage. HDFC, ICICI, Max, Tata AIA options.'},
            {'question': 'Health insurance for families near Fortis/Apollo?', 'answer': 'Family floater 25-30 lakh, Super Top-Up 20 lakh deductible. Calibrated to Fortis/Apollo/Narayana hospital rates.'},
            {'question': 'Motor insurance on Bannerghatta Road?', 'answer': 'Doorstep service with zero-depreciation, engine protection, and roadside assistance for NH-7 commuters.'}
        ],
        'areas': ['Fortis Hospital Area', 'Apollo Hospitals Area', 'Narayana Health Area', 'Hulimavu', 'Gottigere', 'Bilekahalli', 'J.P. Nagar (nearby)'],
        'nearby': ['bangalore-jp-nagar', 'bangalore-jayanagar', 'bangalore-hsr-layout', 'bangalore-electronic-city']
    }
}

with open('src/content/cities/index.json', 'r') as f:
    data = json.load(f)

for city in data:
    slug = city['slug']
    if slug in location_content:
        content = location_content[slug]
        city.update(content)
        print('Updated: ' + slug)

with open('src/content/cities/index.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print('All Bangalore locations expanded successfully!')