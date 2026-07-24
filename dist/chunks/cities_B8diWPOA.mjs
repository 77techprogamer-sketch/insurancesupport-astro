const cities = [
	{
		slug: "bangalore-indiranagar",
		name: "Indiranagar, Bangalore",
		state: "Karnataka",
		desc: "In the bustling heart of Indiranagar, Bangalore, we provide premium localized Insurance Support. From health covers tailored for startup founders to doorstep LIC policy revivals for long-time residents, our team near 100 Feet Road ensures you skip the traffic and get expert advice at your home or office.",
		phone: "+91-99866 34506",
		areas: [
			"HAL 2nd Stage",
			"Domlur",
			"Tippasandra",
			"Doopanahalli"
		],
		nearby: [
			"bangalore",
			"bangalore-koramangala",
			"bangalore-whitefield"
		],
		it_focus: "Indiranagar is a startup hub. We specialize in configuring Group Health Insurance for growing teams and portable individual policies for mobile founders.",
		senior_focus: "For the established residents of HAL 2nd Stage and Domlur, we offer personalized pension revivals and doorstep assistance for medical claims without navigating 100FT Road traffic.",
		branch_dets: "We coordinate with the Jeevan Bima Nagar and Domlur LIC branches to expedite your paperwork locally.",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bangalore-koramangala",
		name: "Koramangala, Bangalore",
		state: "Karnataka",
		desc: "Serving the startup and residential hub of Koramangala, we offer hyper-local Insurance Support. Whether you need an Employee Benefits plan for your new tech venture or personal health insurance for your family, our advisors provide fast-track doorstep service across all Koramangala blocks.",
		phone: "+91-99866 34506",
		areas: [
			"Ejipura",
			"Vivek Nagar",
			"BTM Layout 1st Stage",
			"Venkatapura"
		],
		nearby: [
			"bangalore",
			"bangalore-indiranagar",
			"bangalore-jayanagar"
		],
		it_focus: "Koramangala demands high-flexibility insurance. We offer specialized &#x27;Loss of Income&#x27; covers and Super Top-Up health plans tailored for tech professionals in Ejipura and BTM Layout.",
		senior_focus: "We assist Koramangala&#x27;s senior residents with complicated life insurance maturity claims, bringing the branch office to your living room.",
		branch_dets: "Strong ties with South Bangalore LIC divisional offices ensure your policy revivals are processed rapidly.",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bangalore-jayanagar",
		name: "Jayanagar, Bangalore",
		state: "Karnataka",
		desc: "For the established families and businesses in Jayanagar, we offer traditional trust with modern convenience. Our experts handle LIC policy tracking, life insurance queries, and comprehensive health portfolio audits with guaranteed doorstep visits across Jayanagar and JP Nagar.",
		phone: "+91-99866 34506",
		areas: [
			"JP Nagar",
			"Banashankari",
			"Basavanagudi",
			"BTM Layout"
		],
		nearby: [
			"bangalore",
			"bangalore-koramangala"
		],
		it_focus: "For the business community and professionals in Jayanagar, we structure comprehensive family floater plans with extensive cashless networks.",
		senior_focus: "Jayanagar&#x27;s retirees rely on us for seamless pension certificates and LIC survival benefits tracking right at their doorstep.",
		branch_dets: "We work directly with the Jayanagar and Basavanagudi LIC branches to ensure your legacy policies are up-to-date.",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bangalore-whitefield",
		name: "Whitefield, Bangalore",
		state: "Karnataka",
		desc: "For the IT professionals and families in Whitefield, we bring Insurance Support right to your apartment complex. Skip the ORR traffic—our experts handle LIC claim settlements and health insurance queries with guaranteed doorstep visits across Whitefield.",
		phone: "+91-99866 34506",
		areas: [
			"ITPL",
			"Brookefield",
			"Kundalahalli",
			"Kadugodi",
			"Marathahalli"
		],
		nearby: [
			"bangalore",
			"bangalore-indiranagar"
		],
		it_focus: "Whitefield&#x27;s IT park professionals require global coverage. We provide International Health Covers and high-value Term Insurance tailored for software engineers in ITPL and Brookefield.",
		senior_focus: "We offer dedicated support for parents of IT professionals, ensuring their mediclaim policies are robust enough to cover premium hospitals in the Whitefield area.",
		branch_dets: "We handle the logistical hurdles of inter-branch policy transfers for families who have recently relocated to Whitefield.",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mangalore-kadri",
		name: "Kadri, Mangalore",
		state: "Karnataka",
		desc: "In the cultural and residential heart of Mangalore, our Kadri Insurance Support team provides trusted advice. We manage LIC policies and offer family health insurance guidance with doorstep assistance, coordinating efficiently with the main Pandeshwar branches to serve residents of Kadri and Nanthoor seamlessly.",
		phone: "+91-99866 34506",
		areas: [
			"Kadri Kambla",
			"Mallikatte",
			"Bendoorwell",
			"Nanthoor",
			"Shivbagh"
		],
		nearby: [
			"mangalore",
			"mangalore-bejai",
			"mangalore-surathkal"
		],
		it_focus: "For professionals residing in Kadri and Nanthoor, we offer high-coverage health plans that complement corporate policies.",
		senior_focus: "We assist the senior community in Mallikatte and Bendoorwell with doorstep LIC policy loan processing and maturity claims.",
		branch_dets: "Direct coordination with the nearby Pandeshwar LIC divisional office for fast-track claim settlement.",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mangalore-bejai",
		name: "Bejai, Mangalore",
		state: "Karnataka",
		desc: "Providing targeted Insurance Support for the fast-growing neighborhoods of Bejai and Derebail. We specialize in motor and health insurance, offering seamless local claim assistance and paperwork collection directly from your home or office in Mangalore.",
		phone: "+91-99866 34506",
		areas: [
			"Kapikad",
			"Lalbagh",
			"Derebail",
			"Karangalpady",
			"Kuntikan"
		],
		nearby: [
			"mangalore",
			"mangalore-kadri"
		],
		it_focus: "Bejai&#x27;s growing commercial sector needs robust asset protection. We provide tailored shop-owner and professional indemnity insurance.",
		senior_focus: "For elderly residents in Kapikad and Derebail, we handle the physical submission of life certificates for uninterrupted pension flow.",
		branch_dets: "Our local presence allows us to follow up personally on your pending claims across all Mangalore zonal branches.",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mangalore-surathkal",
		name: "Surathkal, Mangalore",
		state: "Karnataka",
		desc: "Serving the industrial and educational hub of Surathkal, our specialized advisors understand the unique needs of professionals and businesses here. We ensure your assets and health are protected with robust, localized Insurance Support.",
		phone: "+91-99866 34506",
		areas: [
			"NITK",
			"Katipalla",
			"Krishnapura",
			"Hosabettu",
			"Panambur"
		],
		nearby: [
			"mangalore",
			"mangalore-kadri"
		],
		it_focus: "Surathkal&#x27;s industrial and NITK community requires specialized coverage including Workmen&#x27;s Compensation and student health plans.",
		senior_focus: "We bring the city-center branch services to Surathkal, ensuring retirees in Hosabettu and Katipalla receive comprehensive policy support.",
		branch_dets: "We bridge the geographical gap to the main LIC offices in Mangalore, saving you the commute.",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "udupi-manipal",
		name: "Manipal, Udupi",
		state: "Karnataka",
		desc: "As a bustling educational and medical hub, Manipal demands specialized Insurance Support. We assist students, faculty, and medical professionals with tailored health and life insurance coverage. Our advisors provide seamless doorstep service, coordinating with the Udupi LIC offices to ensure your financial security while you focus on academics and healthcare.",
		phone: "+91-99866 34506",
		areas: [
			"Eshwar Nagar",
			"Vidyaratna Nagar",
			"Ananth Nagar",
			"Perampalli"
		],
		nearby: [
			"udupi",
			"mangalore"
		],
		it_focus: "For the academic and medical professionals in Manipal, we offer high-coverage health plans and professional indemnity insurance.",
		senior_focus: "We support retired professionals with robust pension plans and doorstep LIC services.",
		branch_dets: "Close coordination with Udupi LIC branch ensures fast policy revivals and claim settlements.",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "visakhapatnam",
		name: "Visakhapatnam",
		state: "Andhra Pradesh",
		desc: "Looking for expert Insurance Support in Visakhapatnam? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Visakhapatnam residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Visakhapatnam Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "pimpri-chinchwad",
		name: "Pimpri Chinchwad",
		state: "Maharashtra",
		desc: "Secure your family's future with the most trusted Insurance Support team in Pimpri Chinchwad. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Maharashtra.",
		phone: "+91-99866 34506",
		areas: [
			"Pimpri Chinchwad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ghaziabad",
		name: "Ghaziabad",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Ghaziabad can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Ghaziabad.",
		phone: "+91-99866 34506",
		areas: [
			"Ghaziabad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "faridabad",
		name: "Faridabad",
		state: "Haryana",
		desc: "In Faridabad, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Faridabad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kalyan-dombivli",
		name: "Kalyan Dombivli",
		state: "Maharashtra",
		desc: "Looking for expert Insurance Support in Kalyan Dombivli? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Kalyan Dombivli residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Kalyan Dombivli Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "vasai-virar",
		name: "Vasai Virar",
		state: "Maharashtra",
		desc: "Secure your family's future with the most trusted Insurance Support team in Vasai Virar. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Maharashtra.",
		phone: "+91-99866 34506",
		areas: [
			"Vasai Virar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "dhanbad",
		name: "Dhanbad",
		state: "Jharkhand",
		desc: "Residents and businesses in Dhanbad can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Dhanbad.",
		phone: "+91-99866 34506",
		areas: [
			"Dhanbad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "navi-mumbai",
		name: "Navi Mumbai",
		state: "Maharashtra",
		desc: "In Navi Mumbai, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Navi Mumbai Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "allahabad",
		name: "Allahabad",
		state: "Uttar Pradesh",
		desc: "Looking for expert Insurance Support in Allahabad? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Allahabad residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Allahabad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "howrah",
		name: "Howrah",
		state: "West Bengal",
		desc: "Secure your family's future with the most trusted Insurance Support team in Howrah. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across West Bengal.",
		phone: "+91-99866 34506",
		areas: [
			"Howrah Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "jodhpur",
		name: "Jodhpur",
		state: "Rajasthan",
		desc: "Residents and businesses in Jodhpur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Jodhpur.",
		phone: "+91-99866 34506",
		areas: [
			"Jodhpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kota",
		name: "Kota",
		state: "Rajasthan",
		desc: "In Kota, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Kota Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "solapur",
		name: "Solapur",
		state: "Maharashtra",
		desc: "Looking for expert Insurance Support in Solapur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Solapur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Solapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "hubli-dharwad",
		name: "Hubli Dharwad",
		state: "Karnataka",
		desc: "Secure your family's future with the most trusted Insurance Support team in Hubli Dharwad. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Karnataka.",
		phone: "+91-99866 34506",
		areas: [
			"Hubli Dharwad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bareilly",
		name: "Bareilly",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Bareilly can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Bareilly.",
		phone: "+91-99866 34506",
		areas: [
			"Bareilly Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "moradabad",
		name: "Moradabad",
		state: "Uttar Pradesh",
		desc: "In Moradabad, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Moradabad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "gurgaon",
		name: "Gurgaon",
		state: "Haryana",
		desc: "Looking for expert Insurance Support in Gurgaon? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Gurgaon residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Gurgaon Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "aligarh",
		name: "Aligarh",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Aligarh. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Aligarh Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "tiruchirappalli",
		name: "Tiruchirappalli",
		state: "Tamil Nadu",
		desc: "Residents and businesses in Tiruchirappalli can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Tiruchirappalli.",
		phone: "+91-99866 34506",
		areas: [
			"Tiruchirappalli Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mira-bhayandar",
		name: "Mira Bhayandar",
		state: "Maharashtra",
		desc: "In Mira Bhayandar, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Mira Bhayandar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "thiruvananthapuram",
		name: "Thiruvananthapuram",
		state: "Kerala",
		desc: "Looking for expert Insurance Support in Thiruvananthapuram? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Thiruvananthapuram residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Thiruvananthapuram Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhiwandi",
		name: "Bhiwandi",
		state: "Maharashtra",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bhiwandi. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Maharashtra.",
		phone: "+91-99866 34506",
		areas: [
			"Bhiwandi Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "saharanpur",
		name: "Saharanpur",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Saharanpur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Saharanpur.",
		phone: "+91-99866 34506",
		areas: [
			"Saharanpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "guntur",
		name: "Guntur",
		state: "Andhra Pradesh",
		desc: "In Guntur, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Guntur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "amravati",
		name: "Amravati",
		state: "Maharashtra",
		desc: "Looking for expert Insurance Support in Amravati? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Amravati residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Amravati Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bikaner",
		name: "Bikaner",
		state: "Rajasthan",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bikaner. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Rajasthan.",
		phone: "+91-99866 34506",
		areas: [
			"Bikaner Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "noida",
		name: "Noida",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Noida can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Noida.",
		phone: "+91-99866 34506",
		areas: [
			"Noida Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhilai",
		name: "Bhilai",
		state: "Chhattisgarh",
		desc: "In Bhilai, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bhilai Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "cuttack",
		name: "Cuttack",
		state: "Odisha",
		desc: "Looking for expert Insurance Support in Cuttack? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Cuttack residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Cuttack Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "firozabad",
		name: "Firozabad",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Firozabad. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Firozabad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "nellore",
		name: "Nellore",
		state: "Andhra Pradesh",
		desc: "Residents and businesses in Nellore can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Nellore.",
		phone: "+91-99866 34506",
		areas: [
			"Nellore Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhavnagar",
		name: "Bhavnagar",
		state: "Gujarat",
		desc: "In Bhavnagar, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bhavnagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "durgapur",
		name: "Durgapur",
		state: "West Bengal",
		desc: "Looking for expert Insurance Support in Durgapur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Durgapur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Durgapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "asansol",
		name: "Asansol",
		state: "West Bengal",
		desc: "Secure your family's future with the most trusted Insurance Support team in Asansol. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across West Bengal.",
		phone: "+91-99866 34506",
		areas: [
			"Asansol Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "rourkela",
		name: "Rourkela",
		state: "Odisha",
		desc: "Residents and businesses in Rourkela can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Rourkela.",
		phone: "+91-99866 34506",
		areas: [
			"Rourkela Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "nanded",
		name: "Nanded",
		state: "Maharashtra",
		desc: "In Nanded, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Nanded Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kolhapur",
		name: "Kolhapur",
		state: "Maharashtra",
		desc: "Looking for expert Insurance Support in Kolhapur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Kolhapur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Kolhapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "akola",
		name: "Akola",
		state: "Maharashtra",
		desc: "Secure your family's future with the most trusted Insurance Support team in Akola. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Maharashtra.",
		phone: "+91-99866 34506",
		areas: [
			"Akola Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "gulbarga",
		name: "Gulbarga",
		state: "Karnataka",
		desc: "Residents and businesses in Gulbarga can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Gulbarga.",
		phone: "+91-99866 34506",
		areas: [
			"Gulbarga Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "jamnagar",
		name: "Jamnagar",
		state: "Gujarat",
		desc: "In Jamnagar, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Jamnagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "loni",
		name: "Loni",
		state: "Uttar Pradesh",
		desc: "Looking for expert Insurance Support in Loni? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Loni residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Loni Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "jhansi",
		name: "Jhansi",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Jhansi. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Jhansi Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ulhasnagar",
		name: "Ulhasnagar",
		state: "Maharashtra",
		desc: "Residents and businesses in Ulhasnagar can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Ulhasnagar.",
		phone: "+91-99866 34506",
		areas: [
			"Ulhasnagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "sangli-miraj-kupwad",
		name: "Sangli Miraj Kupwad",
		state: "Maharashtra",
		desc: "In Sangli Miraj Kupwad, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Sangli Miraj Kupwad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "erode",
		name: "Erode",
		state: "Tamil Nadu",
		desc: "Looking for expert Insurance Support in Erode? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Erode residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Erode Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "belgaum",
		name: "Belgaum",
		state: "Karnataka",
		desc: "Secure your family's future with the most trusted Insurance Support team in Belgaum. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Karnataka.",
		phone: "+91-99866 34506",
		areas: [
			"Belgaum Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ambattur",
		name: "Ambattur",
		state: "Tamil Nadu",
		desc: "Residents and businesses in Ambattur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Ambattur.",
		phone: "+91-99866 34506",
		areas: [
			"Ambattur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "tirunelveli",
		name: "Tirunelveli",
		state: "Tamil Nadu",
		desc: "In Tirunelveli, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Tirunelveli Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "malegaon",
		name: "Malegaon",
		state: "Maharashtra",
		desc: "Looking for expert Insurance Support in Malegaon? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Malegaon residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Malegaon Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "gaya",
		name: "Gaya",
		state: "Bihar",
		desc: "Secure your family's future with the most trusted Insurance Support team in Gaya. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Bihar.",
		phone: "+91-99866 34506",
		areas: [
			"Gaya Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "jalgaon",
		name: "Jalgaon",
		state: "Maharashtra",
		desc: "Residents and businesses in Jalgaon can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Jalgaon.",
		phone: "+91-99866 34506",
		areas: [
			"Jalgaon Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "udaipur",
		name: "Udaipur",
		state: "Rajasthan",
		desc: "In Udaipur, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Udaipur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "maheshtala",
		name: "Maheshtala",
		state: "West Bengal",
		desc: "Looking for expert Insurance Support in Maheshtala? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Maheshtala residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Maheshtala Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "davanagere",
		name: "Davanagere",
		state: "Karnataka",
		desc: "Secure your family's future with the most trusted Insurance Support team in Davanagere. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Karnataka.",
		phone: "+91-99866 34506",
		areas: [
			"Davanagere Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "akbarpur",
		name: "Akbarpur",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Akbarpur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Akbarpur.",
		phone: "+91-99866 34506",
		areas: [
			"Akbarpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kurnool",
		name: "Kurnool",
		state: "Andhra Pradesh",
		desc: "In Kurnool, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Kurnool Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "rajpur-sonarpur",
		name: "Rajpur Sonarpur",
		state: "West Bengal",
		desc: "Looking for expert Insurance Support in Rajpur Sonarpur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Rajpur Sonarpur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Rajpur Sonarpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bokaro",
		name: "Bokaro",
		state: "Jharkhand",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bokaro. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Jharkhand.",
		phone: "+91-99866 34506",
		areas: [
			"Bokaro Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "south-dumdum",
		name: "South Dumdum",
		state: "West Bengal",
		desc: "Residents and businesses in South Dumdum can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout South Dumdum.",
		phone: "+91-99866 34506",
		areas: [
			"South Dumdum Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bellary",
		name: "Bellary",
		state: "Karnataka",
		desc: "In Bellary, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bellary Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "patiala",
		name: "Patiala",
		state: "Punjab",
		desc: "Looking for expert Insurance Support in Patiala? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Patiala residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Patiala Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "gopalpur",
		name: "Gopalpur",
		state: "Odisha",
		desc: "Secure your family's future with the most trusted Insurance Support team in Gopalpur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Odisha.",
		phone: "+91-99866 34506",
		areas: [
			"Gopalpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "agartala",
		name: "Agartala",
		state: "Tripura",
		desc: "Residents and businesses in Agartala can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Agartala.",
		phone: "+91-99866 34506",
		areas: [
			"Agartala Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhagalpur",
		name: "Bhagalpur",
		state: "Bihar",
		desc: "In Bhagalpur, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bhagalpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "muzaffarnagar",
		name: "Muzaffarnagar",
		state: "Uttar Pradesh",
		desc: "Looking for expert Insurance Support in Muzaffarnagar? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Muzaffarnagar residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Muzaffarnagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhatpara",
		name: "Bhatpara",
		state: "West Bengal",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bhatpara. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across West Bengal.",
		phone: "+91-99866 34506",
		areas: [
			"Bhatpara Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "panihati",
		name: "Panihati",
		state: "West Bengal",
		desc: "Residents and businesses in Panihati can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Panihati.",
		phone: "+91-99866 34506",
		areas: [
			"Panihati Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "latur",
		name: "Latur",
		state: "Maharashtra",
		desc: "In Latur, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Latur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "dhule",
		name: "Dhule",
		state: "Maharashtra",
		desc: "Looking for expert Insurance Support in Dhule? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Dhule residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Dhule Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "rohtak",
		name: "Rohtak",
		state: "Haryana",
		desc: "Secure your family's future with the most trusted Insurance Support team in Rohtak. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Haryana.",
		phone: "+91-99866 34506",
		areas: [
			"Rohtak Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "korba",
		name: "Korba",
		state: "Chhattisgarh",
		desc: "Residents and businesses in Korba can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Korba.",
		phone: "+91-99866 34506",
		areas: [
			"Korba Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhilwara",
		name: "Bhilwara",
		state: "Rajasthan",
		desc: "In Bhilwara, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bhilwara Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "brahmapur",
		name: "Brahmapur",
		state: "Odisha",
		desc: "Looking for expert Insurance Support in Brahmapur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Brahmapur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Brahmapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "muzaffarpur",
		name: "Muzaffarpur",
		state: "Bihar",
		desc: "Secure your family's future with the most trusted Insurance Support team in Muzaffarpur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Bihar.",
		phone: "+91-99866 34506",
		areas: [
			"Muzaffarpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ahmednagar",
		name: "Ahmednagar",
		state: "Maharashtra",
		desc: "Residents and businesses in Ahmednagar can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Ahmednagar.",
		phone: "+91-99866 34506",
		areas: [
			"Ahmednagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mathura",
		name: "Mathura",
		state: "Uttar Pradesh",
		desc: "In Mathura, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Mathura Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kollam",
		name: "Kollam",
		state: "Kerala",
		desc: "Looking for expert Insurance Support in Kollam? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Kollam residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Kollam Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "avadi",
		name: "Avadi",
		state: "Tamil Nadu",
		desc: "Secure your family's future with the most trusted Insurance Support team in Avadi. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Tamil Nadu.",
		phone: "+91-99866 34506",
		areas: [
			"Avadi Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kadapa",
		name: "Kadapa",
		state: "Andhra Pradesh",
		desc: "Residents and businesses in Kadapa can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Kadapa.",
		phone: "+91-99866 34506",
		areas: [
			"Kadapa Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kamarhati",
		name: "Kamarhati",
		state: "West Bengal",
		desc: "In Kamarhati, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Kamarhati Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bilaspur",
		name: "Bilaspur",
		state: "Chhattisgarh",
		desc: "Looking for expert Insurance Support in Bilaspur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Bilaspur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Bilaspur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "shahjahanpur",
		name: "Shahjahanpur",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Shahjahanpur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Shahjahanpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "satara",
		name: "Satara",
		state: "Maharashtra",
		desc: "Residents and businesses in Satara can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Satara.",
		phone: "+91-99866 34506",
		areas: [
			"Satara Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bijapur",
		name: "Bijapur",
		state: "Karnataka",
		desc: "In Bijapur, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bijapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "rampur",
		name: "Rampur",
		state: "Uttar Pradesh",
		desc: "Looking for expert Insurance Support in Rampur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Rampur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Rampur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "shimoga",
		name: "Shimoga",
		state: "Karnataka",
		desc: "Secure your family's future with the most trusted Insurance Support team in Shimoga. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Karnataka.",
		phone: "+91-99866 34506",
		areas: [
			"Shimoga Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "chandrapur",
		name: "Chandrapur",
		state: "Maharashtra",
		desc: "Residents and businesses in Chandrapur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Chandrapur.",
		phone: "+91-99866 34506",
		areas: [
			"Chandrapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "junagadh",
		name: "Junagadh",
		state: "Gujarat",
		desc: "In Junagadh, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Junagadh Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "alwar",
		name: "Alwar",
		state: "Rajasthan",
		desc: "Looking for expert Insurance Support in Alwar? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Alwar residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Alwar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bardhaman",
		name: "Bardhaman",
		state: "West Bengal",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bardhaman. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across West Bengal.",
		phone: "+91-99866 34506",
		areas: [
			"Bardhaman Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kulti",
		name: "Kulti",
		state: "West Bengal",
		desc: "Residents and businesses in Kulti can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Kulti.",
		phone: "+91-99866 34506",
		areas: [
			"Kulti Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "nizamabad",
		name: "Nizamabad",
		state: "Telangana",
		desc: "In Nizamabad, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Nizamabad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "parbhani",
		name: "Parbhani",
		state: "Maharashtra",
		desc: "Looking for expert Insurance Support in Parbhani? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Parbhani residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Parbhani Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "tumkur",
		name: "Tumkur",
		state: "Karnataka",
		desc: "Secure your family's future with the most trusted Insurance Support team in Tumkur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Karnataka.",
		phone: "+91-99866 34506",
		areas: [
			"Tumkur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "khammam",
		name: "Khammam",
		state: "Telangana",
		desc: "Residents and businesses in Khammam can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Khammam.",
		phone: "+91-99866 34506",
		areas: [
			"Khammam Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "uzhavarkarai",
		name: "Uzhavarkarai",
		state: "Puducherry",
		desc: "In Uzhavarkarai, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Uzhavarkarai Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bihar-sharif",
		name: "Bihar Sharif",
		state: "Bihar",
		desc: "Looking for expert Insurance Support in Bihar Sharif? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Bihar Sharif residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Bihar Sharif Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "panipat",
		name: "Panipat",
		state: "Haryana",
		desc: "Secure your family's future with the most trusted Insurance Support team in Panipat. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Haryana.",
		phone: "+91-99866 34506",
		areas: [
			"Panipat Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "darbhanga",
		name: "Darbhanga",
		state: "Bihar",
		desc: "Residents and businesses in Darbhanga can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Darbhanga.",
		phone: "+91-99866 34506",
		areas: [
			"Darbhanga Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bally",
		name: "Bally",
		state: "West Bengal",
		desc: "In Bally, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bally Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "aizawl",
		name: "Aizawl",
		state: "Mizoram",
		desc: "Looking for expert Insurance Support in Aizawl? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Aizawl residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Aizawl Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "dewas",
		name: "Dewas",
		state: "Madhya Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Dewas. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Madhya Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Dewas Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ichalkaranji",
		name: "Ichalkaranji",
		state: "Maharashtra",
		desc: "Residents and businesses in Ichalkaranji can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Ichalkaranji.",
		phone: "+91-99866 34506",
		areas: [
			"Ichalkaranji Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "karnal",
		name: "Karnal",
		state: "Haryana",
		desc: "In Karnal, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Karnal Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bathinda",
		name: "Bathinda",
		state: "Punjab",
		desc: "Looking for expert Insurance Support in Bathinda? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Bathinda residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Bathinda Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "jalna",
		name: "Jalna",
		state: "Maharashtra",
		desc: "Secure your family's future with the most trusted Insurance Support team in Jalna. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Maharashtra.",
		phone: "+91-99866 34506",
		areas: [
			"Jalna Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "eluru",
		name: "Eluru",
		state: "Andhra Pradesh",
		desc: "Residents and businesses in Eluru can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Eluru.",
		phone: "+91-99866 34506",
		areas: [
			"Eluru Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "barasat",
		name: "Barasat",
		state: "West Bengal",
		desc: "In Barasat, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Barasat Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kirari-suleman-nagar",
		name: "Kirari Suleman Nagar",
		state: "Delhi",
		desc: "Looking for expert Insurance Support in Kirari Suleman Nagar? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Kirari Suleman Nagar residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Kirari Suleman Nagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "purnia",
		name: "Purnia",
		state: "Bihar",
		desc: "Secure your family's future with the most trusted Insurance Support team in Purnia. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Bihar.",
		phone: "+91-99866 34506",
		areas: [
			"Purnia Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "satna",
		name: "Satna",
		state: "Madhya Pradesh",
		desc: "Residents and businesses in Satna can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Satna.",
		phone: "+91-99866 34506",
		areas: [
			"Satna Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mau",
		name: "Mau",
		state: "Uttar Pradesh",
		desc: "In Mau, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Mau Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "sonipat",
		name: "Sonipat",
		state: "Haryana",
		desc: "Looking for expert Insurance Support in Sonipat? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Sonipat residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Sonipat Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "farrukhabad",
		name: "Farrukhabad",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Farrukhabad. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Farrukhabad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "sagar",
		name: "Sagar",
		state: "Madhya Pradesh",
		desc: "Residents and businesses in Sagar can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Sagar.",
		phone: "+91-99866 34506",
		areas: [
			"Sagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "durg",
		name: "Durg",
		state: "Chhattisgarh",
		desc: "In Durg, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Durg Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "imphal",
		name: "Imphal",
		state: "Manipur",
		desc: "Looking for expert Insurance Support in Imphal? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Imphal residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Imphal Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ratlam",
		name: "Ratlam",
		state: "Madhya Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Ratlam. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Madhya Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Ratlam Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "hapur",
		name: "Hapur",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Hapur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Hapur.",
		phone: "+91-99866 34506",
		areas: [
			"Hapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "arah",
		name: "Arah",
		state: "Bihar",
		desc: "In Arah, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Arah Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "anantapur",
		name: "Anantapur",
		state: "Andhra Pradesh",
		desc: "Looking for expert Insurance Support in Anantapur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Anantapur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Anantapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "karimnagar",
		name: "Karimnagar",
		state: "Telangana",
		desc: "Secure your family's future with the most trusted Insurance Support team in Karimnagar. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Telangana.",
		phone: "+91-99866 34506",
		areas: [
			"Karimnagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "etawah",
		name: "Etawah",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Etawah can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Etawah.",
		phone: "+91-99866 34506",
		areas: [
			"Etawah Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ambarnath",
		name: "Ambarnath",
		state: "Maharashtra",
		desc: "In Ambarnath, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Ambarnath Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "north-dumdum",
		name: "North Dumdum",
		state: "West Bengal",
		desc: "Looking for expert Insurance Support in North Dumdum? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of North Dumdum residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"North Dumdum Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bharatpur",
		name: "Bharatpur",
		state: "Rajasthan",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bharatpur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Rajasthan.",
		phone: "+91-99866 34506",
		areas: [
			"Bharatpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "begusarai",
		name: "Begusarai",
		state: "Bihar",
		desc: "Residents and businesses in Begusarai can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Begusarai.",
		phone: "+91-99866 34506",
		areas: [
			"Begusarai Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "new-delhi",
		name: "New Delhi",
		state: "Delhi",
		desc: "In New Delhi, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"New Delhi Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "gandhidham",
		name: "Gandhidham",
		state: "Gujarat",
		desc: "Looking for expert Insurance Support in Gandhidham? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Gandhidham residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Gandhidham Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "baranagar",
		name: "Baranagar",
		state: "West Bengal",
		desc: "Secure your family's future with the most trusted Insurance Support team in Baranagar. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across West Bengal.",
		phone: "+91-99866 34506",
		areas: [
			"Baranagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "sikar",
		name: "Sikar",
		state: "Rajasthan",
		desc: "Residents and businesses in Sikar can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Sikar.",
		phone: "+91-99866 34506",
		areas: [
			"Sikar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "thoothukudi",
		name: "Thoothukudi",
		state: "Tamil Nadu",
		desc: "In Thoothukudi, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Thoothukudi Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "rew",
		name: "Rew",
		state: "Madhya Pradesh",
		desc: "Looking for expert Insurance Support in Rew? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Rew residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Rew Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mirzapur",
		name: "Mirzapur",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Mirzapur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Mirzapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "raichur",
		name: "Raichur",
		state: "Karnataka",
		desc: "Residents and businesses in Raichur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Raichur.",
		phone: "+91-99866 34506",
		areas: [
			"Raichur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "pali",
		name: "Pali",
		state: "Rajasthan",
		desc: "In Pali, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Pali Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ramagundam",
		name: "Ramagundam",
		state: "Telangana",
		desc: "Looking for expert Insurance Support in Ramagundam? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Ramagundam residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Ramagundam Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "vizianagaram",
		name: "Vizianagaram",
		state: "Andhra Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Vizianagaram. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Andhra Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Vizianagaram Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "katihar",
		name: "Katihar",
		state: "Bihar",
		desc: "Residents and businesses in Katihar can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Katihar.",
		phone: "+91-99866 34506",
		areas: [
			"Katihar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "haridwar",
		name: "Haridwar",
		state: "Uttarakhand",
		desc: "In Haridwar, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Haridwar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "sriganganagar",
		name: "Sriganganagar",
		state: "Rajasthan",
		desc: "Looking for expert Insurance Support in Sriganganagar? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Sriganganagar residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Sriganganagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "karawal-nagar",
		name: "Karawal Nagar",
		state: "Delhi",
		desc: "Secure your family's future with the most trusted Insurance Support team in Karawal Nagar. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Delhi.",
		phone: "+91-99866 34506",
		areas: [
			"Karawal Nagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "nagercoil",
		name: "Nagercoil",
		state: "Tamil Nadu",
		desc: "Residents and businesses in Nagercoil can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Nagercoil.",
		phone: "+91-99866 34506",
		areas: [
			"Nagercoil Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mango",
		name: "Mango",
		state: "Jharkhand",
		desc: "In Mango, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Mango Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bulandshahr",
		name: "Bulandshahr",
		state: "Uttar Pradesh",
		desc: "Looking for expert Insurance Support in Bulandshahr? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Bulandshahr residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Bulandshahr Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "thanjavur",
		name: "Thanjavur",
		state: "Tamil Nadu",
		desc: "Secure your family's future with the most trusted Insurance Support team in Thanjavur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Tamil Nadu.",
		phone: "+91-99866 34506",
		areas: [
			"Thanjavur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "murwara",
		name: "Murwara",
		state: "Madhya Pradesh",
		desc: "Residents and businesses in Murwara can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Murwara.",
		phone: "+91-99866 34506",
		areas: [
			"Murwara Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "uluberia",
		name: "Uluberia",
		state: "West Bengal",
		desc: "In Uluberia, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Uluberia Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "shillong",
		name: "Shillong",
		state: "Meghalaya",
		desc: "Looking for expert Insurance Support in Shillong? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Shillong residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Shillong Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "sambhal",
		name: "Sambhal",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Sambhal. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Sambhal Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "singrauli",
		name: "Singrauli",
		state: "Madhya Pradesh",
		desc: "Residents and businesses in Singrauli can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Singrauli.",
		phone: "+91-99866 34506",
		areas: [
			"Singrauli Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "nadiad",
		name: "Nadiad",
		state: "Gujarat",
		desc: "In Nadiad, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Nadiad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "secunderabad",
		name: "Secunderabad",
		state: "Telangana",
		desc: "Looking for expert Insurance Support in Secunderabad? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Secunderabad residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Secunderabad Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "naihati",
		name: "Naihati",
		state: "West Bengal",
		desc: "Secure your family's future with the most trusted Insurance Support team in Naihati. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across West Bengal.",
		phone: "+91-99866 34506",
		areas: [
			"Naihati Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "yamunanagar",
		name: "Yamunanagar",
		state: "Haryana",
		desc: "Residents and businesses in Yamunanagar can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Yamunanagar.",
		phone: "+91-99866 34506",
		areas: [
			"Yamunanagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bidhan-nagar",
		name: "Bidhan Nagar",
		state: "West Bengal",
		desc: "In Bidhan Nagar, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bidhan Nagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "pallavaram",
		name: "Pallavaram",
		state: "Tamil Nadu",
		desc: "Looking for expert Insurance Support in Pallavaram? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Pallavaram residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Pallavaram Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bidar",
		name: "Bidar",
		state: "Karnataka",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bidar. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Karnataka.",
		phone: "+91-99866 34506",
		areas: [
			"Bidar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "munger",
		name: "Munger",
		state: "Bihar",
		desc: "Residents and businesses in Munger can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Munger.",
		phone: "+91-99866 34506",
		areas: [
			"Munger Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "panchkula",
		name: "Panchkula",
		state: "Haryana",
		desc: "In Panchkula, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Panchkula Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "burhanpur",
		name: "Burhanpur",
		state: "Madhya Pradesh",
		desc: "Looking for expert Insurance Support in Burhanpur? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Burhanpur residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Burhanpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kharagpur",
		name: "Kharagpur",
		state: "West Bengal",
		desc: "Secure your family's future with the most trusted Insurance Support team in Kharagpur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across West Bengal.",
		phone: "+91-99866 34506",
		areas: [
			"Kharagpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "dindigul",
		name: "Dindigul",
		state: "Tamil Nadu",
		desc: "Residents and businesses in Dindigul can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Dindigul.",
		phone: "+91-99866 34506",
		areas: [
			"Dindigul Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "gandhinagar",
		name: "Gandhinagar",
		state: "Gujarat",
		desc: "In Gandhinagar, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Gandhinagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "hospet",
		name: "Hospet",
		state: "Karnataka",
		desc: "Looking for expert Insurance Support in Hospet? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Hospet residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Hospet Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "nangloi-jat",
		name: "Nangloi Jat",
		state: "Delhi",
		desc: "Secure your family's future with the most trusted Insurance Support team in Nangloi Jat. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Delhi.",
		phone: "+91-99866 34506",
		areas: [
			"Nangloi Jat Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "malda",
		name: "Malda",
		state: "West Bengal",
		desc: "Residents and businesses in Malda can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Malda.",
		phone: "+91-99866 34506",
		areas: [
			"Malda Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ongole",
		name: "Ongole",
		state: "Andhra Pradesh",
		desc: "In Ongole, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Ongole Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "deoghar",
		name: "Deoghar",
		state: "Jharkhand",
		desc: "Looking for expert Insurance Support in Deoghar? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Deoghar residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Deoghar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "chapra",
		name: "Chapra",
		state: "Bihar",
		desc: "Secure your family's future with the most trusted Insurance Support team in Chapra. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Bihar.",
		phone: "+91-99866 34506",
		areas: [
			"Chapra Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "haldia",
		name: "Haldia",
		state: "West Bengal",
		desc: "Residents and businesses in Haldia can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Haldia.",
		phone: "+91-99866 34506",
		areas: [
			"Haldia Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "khandwa",
		name: "Khandwa",
		state: "Madhya Pradesh",
		desc: "In Khandwa, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Khandwa Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "nandyal",
		name: "Nandyal",
		state: "Andhra Pradesh",
		desc: "Looking for expert Insurance Support in Nandyal? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Nandyal residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Nandyal Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "morena",
		name: "Morena",
		state: "Madhya Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Morena. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Madhya Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Morena Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "amroha",
		name: "Amroha",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Amroha can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Amroha.",
		phone: "+91-99866 34506",
		areas: [
			"Amroha Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "anand",
		name: "Anand",
		state: "Gujarat",
		desc: "In Anand, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Anand Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhind",
		name: "Bhind",
		state: "Madhya Pradesh",
		desc: "Looking for expert Insurance Support in Bhind? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Bhind residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Bhind Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhalswa-jahangir-pur",
		name: "Bhalswa Jahangir Pur",
		state: "Delhi",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bhalswa Jahangir Pur. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Delhi.",
		phone: "+91-99866 34506",
		areas: [
			"Bhalswa Jahangir Pur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "madhyamgram",
		name: "Madhyamgram",
		state: "West Bengal",
		desc: "Residents and businesses in Madhyamgram can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Madhyamgram.",
		phone: "+91-99866 34506",
		areas: [
			"Madhyamgram Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhiwani",
		name: "Bhiwani",
		state: "Haryana",
		desc: "In Bhiwani, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bhiwani Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "berhampore",
		name: "Berhampore",
		state: "West Bengal",
		desc: "Looking for expert Insurance Support in Berhampore? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Berhampore residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Berhampore Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ambala",
		name: "Ambala",
		state: "Haryana",
		desc: "Secure your family's future with the most trusted Insurance Support team in Ambala. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Haryana.",
		phone: "+91-99866 34506",
		areas: [
			"Ambala Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "morbi",
		name: "Morbi",
		state: "Gujarat",
		desc: "Residents and businesses in Morbi can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Morbi.",
		phone: "+91-99866 34506",
		areas: [
			"Morbi Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "fatehpur",
		name: "Fatehpur",
		state: "Uttar Pradesh",
		desc: "In Fatehpur, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Fatehpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "raebareli",
		name: "Raebareli",
		state: "Uttar Pradesh",
		desc: "Looking for expert Insurance Support in Raebareli? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Raebareli residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Raebareli Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "khora",
		name: "Khora",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Khora. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Khora Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "chittoor",
		name: "Chittoor",
		state: "Andhra Pradesh",
		desc: "Residents and businesses in Chittoor can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Chittoor.",
		phone: "+91-99866 34506",
		areas: [
			"Chittoor Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bhusawal",
		name: "Bhusawal",
		state: "Maharashtra",
		desc: "In Bhusawal, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Bhusawal Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "orai",
		name: "Orai",
		state: "Uttar Pradesh",
		desc: "Looking for expert Insurance Support in Orai? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Orai residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Orai Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "bahraich",
		name: "Bahraich",
		state: "Uttar Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Bahraich. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Uttar Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Bahraich Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "phusro",
		name: "Phusro",
		state: "Jharkhand",
		desc: "Residents and businesses in Phusro can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Phusro.",
		phone: "+91-99866 34506",
		areas: [
			"Phusro Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mehsana",
		name: "Mehsana",
		state: "Gujarat",
		desc: "In Mehsana, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Mehsana Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "raiganj",
		name: "Raiganj",
		state: "West Bengal",
		desc: "Looking for expert Insurance Support in Raiganj? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Raiganj residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Raiganj Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "sirsa",
		name: "Sirsa",
		state: "Haryana",
		desc: "Secure your family's future with the most trusted Insurance Support team in Sirsa. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Haryana.",
		phone: "+91-99866 34506",
		areas: [
			"Sirsa Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "danapur",
		name: "Danapur",
		state: "Bihar",
		desc: "Residents and businesses in Danapur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Danapur.",
		phone: "+91-99866 34506",
		areas: [
			"Danapur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "serampore",
		name: "Serampore",
		state: "West Bengal",
		desc: "In Serampore, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Serampore Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "sultan-pur-majra",
		name: "Sultan Pur Majra",
		state: "Delhi",
		desc: "Looking for expert Insurance Support in Sultan Pur Majra? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Sultan Pur Majra residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Sultan Pur Majra Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "guna",
		name: "Guna",
		state: "Madhya Pradesh",
		desc: "Secure your family's future with the most trusted Insurance Support team in Guna. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Madhya Pradesh.",
		phone: "+91-99866 34506",
		areas: [
			"Guna Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "jaunpur",
		name: "Jaunpur",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Jaunpur can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Jaunpur.",
		phone: "+91-99866 34506",
		areas: [
			"Jaunpur Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "panvel",
		name: "Panvel",
		state: "Maharashtra",
		desc: "In Panvel, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Panvel Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "shivpuri",
		name: "Shivpuri",
		state: "Madhya Pradesh",
		desc: "Looking for expert Insurance Support in Shivpuri? We provide localized guidance on health, life, and motor insurance. Skip the long queues and get professional advice tailored to the unique needs of Shivpuri residents right at your doorstep.",
		phone: "+91-99866 34506",
		areas: [
			"Shivpuri Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "surendranagar",
		name: "Surendranagar",
		state: "Gujarat",
		desc: "Secure your family's future with the most trusted Insurance Support team in Surendranagar. From processing complex LIC claims to finding the best health coverage, our certified advisors offer hassle-free service across Gujarat.",
		phone: "+91-99866 34506",
		areas: [
			"Surendranagar Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "unnao",
		name: "Unnao",
		state: "Uttar Pradesh",
		desc: "Residents and businesses in Unnao can now rely on us for comprehensive Insurance Support. Whether you need an Employee Benefits plan or personal health insurance, our experts offer fast-track doorstep service throughout Unnao.",
		phone: "+91-99866 34506",
		areas: [
			"Unnao Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "hugli-chinsurah",
		name: "Hugli Chinsurah",
		state: "West Bengal",
		desc: "In Hugli Chinsurah, protecting your assets has never been easier. We bring the LIC and General Insurance office directly to you. Our proficient advisors handle policy renewals and claim recoveries locally without any bureaucratic delays.",
		phone: "+91-99866 34506",
		areas: [
			"Hugli Chinsurah Central",
			"City Center"
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "chennai-t-nagar",
		name: "chennai-t-nagar",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "chennai-anna-nagar",
		name: "chennai-anna-nagar",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "chennai-velachery",
		name: "chennai-velachery",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "chennai-adyar",
		name: "chennai-adyar",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "hyderabad-hitech-city",
		name: "hyderabad-hitech-city",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "hyderabad-gachibowli",
		name: "hyderabad-gachibowli",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "hyderabad-banjara-hills",
		name: "hyderabad-banjara-hills",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "hyderabad-secunderabad",
		name: "hyderabad-secunderabad",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "pune-hinjewadi",
		name: "pune-hinjewadi",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "pune-viman-nagar",
		name: "pune-viman-nagar",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "pune-kothrud",
		name: "pune-kothrud",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "pune-magarpatta",
		name: "pune-magarpatta",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mumbai-andheri",
		name: "mumbai-andheri",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mumbai-bandra",
		name: "mumbai-bandra",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mumbai-south",
		name: "mumbai-south",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "mumbai-borivali",
		name: "mumbai-borivali",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "delhi-connaught-place",
		name: "delhi-connaught-place",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "delhi-dwarka",
		name: "delhi-dwarka",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "delhi-south",
		name: "delhi-south",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "delhi-rohini",
		name: "delhi-rohini",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kolkata-salt-lake",
		name: "kolkata-salt-lake",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kolkata-new-town",
		name: "kolkata-new-town",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kolkata-ballygunge",
		name: "kolkata-ballygunge",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "kolkata-park-street",
		name: "kolkata-park-street",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ahmedabad-satellite",
		name: "ahmedabad-satellite",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ahmedabad-vastrapur",
		name: "ahmedabad-vastrapur",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ahmedabad-sg-highway",
		name: "ahmedabad-sg-highway",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	},
	{
		slug: "ahmedabad-maninagar",
		name: "ahmedabad-maninagar",
		state: "India",
		desc: "",
		phone: "+91-99866 34506",
		areas: [
		],
		nearby: [
		],
		it_focus: "",
		senior_focus: "",
		branch_dets: "",
		local_faqs: [
		],
		long_count: 0,
		lic_name: "",
		lic_addr: ""
	}
];

export { cities as c };
