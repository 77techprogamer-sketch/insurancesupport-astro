/**
 * scripts/generate-translations.js
 *
 * Generates translated blog post entries for all supported Indian languages
 * (excluding Urdu) and merges them into src/data/blogs.json.
 *
 * For each English blog post in blogs.json, this script:
 *   1. Loads the curated translation-terms.json dictionary
 *   2. Creates language-specific copies of the post with translated title/summary/content
 *   3. Appends them to blogs.json with new slugs like {lang}-{originalSlug}
 *
 * Usage:
 *   node scripts/generate-translations.js
 *   node scripts/generate-translations.js --dry-run   (preview without writing)
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const BLOGS_FILE = path.join(ROOT, 'src/data/blogs.json');
const TERMS_FILE = path.join(ROOT, 'src/data/translation-terms.json');
const LANGS_FILE = path.join(ROOT, 'src/data/languages.json');

const DRY_RUN = process.argv.includes('--dry-run');

const INDIAN_LANGUAGES = ['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml'];

// ─── Load data ──────────────────────────────────────────────────────────────
const posts = JSON.parse(await fs.readFile(BLOGS_FILE, 'utf-8'));
const termsData = JSON.parse(await fs.readFile(TERMS_FILE, 'utf-8'));
const langsData = JSON.parse(await fs.readFile(LANGS_FILE, 'utf-8'));
const terms = termsData.terms;

const sourceLang = langsData.sourceLanguage || 'en';
const englishPosts = posts.filter(p => (p.lang || 'en') === sourceLang);
console.log(`[translations] ${englishPosts.length} English source posts found.`);

// ─── Apply curated term substitutions ──────────────────────────────────────
function translateWithTerms(text, langCode) {
  let result = text;
  const sortedKeys = Object.keys(terms).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (terms[key] && terms[key][langCode]) {
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      result = result.replace(regex, terms[key][langCode]);
    }
  }
  return result;
}

// ─── Language-specific metadata ───────────────────────────────────────────
// These are the fully-translated metadata blocks for hub pages & key posts.
// Each entry is keyed by lang and contains a map of english-slug → { title, summary, content }
const FULL_TRANSLATIONS = {
  hi: {
    'health-insurance-hub-complete-2026-guide': {
      title: "स्वास्थ्य बीमा हब: 2026 की पूरी गाइड - चाहे आपको चाहे इन्श्योरेंस सपोर्ट के साथ",
      summary: "इंडिया के लिए स्वास्थ्य बीमा की पूरी गाइड 2026: चाहे आपको चाहे बताए बिना, पोर्टेबिलिटी गाइड और टैक्स बेनिफट्स।",
      content: "हमे आपके लिए पूरे भारत के स्वास्थ्य बीमा प्लान्स की जानकारी है। आपका स्वास्थ्य बीमा आपकी सबसे बड़ी आर्थिक सुरक्षा है।"
    },
    'lic-policy-hub-complete-guide-2026': {
      title: "LIC पॉलिसी हब: 2026 की पूरी गाइड - लाइफ इन्श्योरेंस कॉर्पोरेशन ऑफ़ इंडिया की पॉलिसी",
      summary: "LIC पॉलिसी हब: 2026 की पूरी गाइड - LIC स्टेटस चेक, पॉलिसी डाउनलोड, लोन इंटरेस्ट रेट्स, सरेंडर प्रक्रिया और दावा समर्थन।",
      content: "LIC भारत की सरकारी जीवन बीमा कंपनी है। हम LIC पॉलिसी के विशेषज्ञ सल्ले देते हैं।"
    },
    'claim-recovery-hub-complete-2026-guide': {
      title: "इन्श्योरेंस दावा रिकवरी हब: 2026 की पूरी गाइड - अस्वीकृत दावाओं की अपील",
      summary: "इन्श्योरेंस दावा रिकवरी हब: 2026 की पूरी गाइड - हेल्थ इन्श्योरेंस दावा अस्वीकृति, LIC मृत्यु दावा अपील, IRDAI शिकायत और ओंबुद्समैन।",
      content: "दावा अस्वीकृति दरें भारत में 22-28% हैं। हमने 50 करोड़+ रुपये की रिकवरी की है।"
    },
    'term-insurance-comparison-hub-2026': {
      title: "टर्म इन्श्योरेंस तुलना हब: 30+ प्लान्स, दर्शन और दावा अनुपात (2026)",
      summary: "LIC, HDFC Life, ICICI Pru, Max Life और Tata AIA के साथ टर्म इन्श्योरेंस की तुलना करें।",
      content: "टर्म इन्श्योरेंस भारत में सबसे लोकप्रिय बीमा प्रकार है।"
    },
    'retirement-pension-planning-hub-2026': {
      title: "सेहली & पेंशन योजना हब: 2026 की पूरी गाइड - NPS, एन्यूइटी और कॉर्पस",
      summary: "NPS, LIC Jeevan Shanti और अन्य पेंशन योजनाओं की तुलना करें। 2026 में सेहली योज़ोज के लिए आवश्यकता।",
      content: "भारत की औसत उम्र 29 साल है, लेकिन 80% कामगारों को कोई औपचारिक पेंशन नहीं है।"
    },
    'child-education-planning-hub-2026': {
      title: "बच्चे की शिक्षा योजना हब: अपने बच्चे के भविष्य को सुरक्षित करें (2026)",
      summary: "Sukanya Samriddhi, बच्चे के इन्श्योरेंस प्लान और PPF से बच्चे की शिक्षा की योजना बनाएं।",
      content: "शिक्षा में महंगाई दर 10-12% वार्षिक है। एक इंजीनियरिंग या डॉक्टर पर्सनल डिग्री आज ₹25 लाख है।"
    }
  },
  bn: {
    'health-insurance-hub-complete-2026-guide': {
      title: "স্বাস্থ্য বিমা হাব: 2026 সম্পূর্ণ গাইড - চাহে আপনার ইনস্যুরেন্স সাপোর্ট",
      summary: "ভারতের জন্য স্বাস্থ্য বিমা সম্পূর্ণ গাইড 2026: ভূল ছাড়া, পোর্টেবিলিটি গাইড এবং ট্যাক্স সুবিধা।",
      content: "আমরা আপনার জন্য পুরো ভারতের স্বাস্থ্য বিমা পরিকল্পনাগুলির তথ্য প্রদান করি।"
    },
    'lic-policy-hub-complete-guide-2026': {
      title: "এলআইসি নীতিমালা হাব: 2026 সম্পূর্ণ গাইড - লাইফ ইনস্যুরেন্স কর্পোরেশন অব ইন্ডিয়ার ওয়্য পলিসি",
      summary: "এলআইসি নীতিমালা হাব: 2026 সম্পূর্ণ গাইড - এলআইসি স্ট্যাটাস চেক, পলিসি ডাউনলোড, ঋণ আয়িত্ব হার, স্যুরেন্ডার প্রক্রিয়া এবং দাবি সমর্থন।",
      content: "এলআইসি ভারতের সরকারি জীবন বিমা কোম্পানি। আমরা এলআইসি পলিসির জন্য বিশেষজ্ঞ পরামর্শ প্রদান করি।"
    },
    'claim-recovery-hub-complete-2026-guide': {
      title: "ইনস্যুরেন্স দাগ্গা রিকভারি হাব: 2026 সম্পূর্ণ গাইড - অগ্রাহ্য করা হওয়া দাগ্গাগুলিতে আপিল",
      summary: "ইনস্যুরেন্স দাগ্গা রিকভারি হাব: 2026 সম্পূর্ণ গাইড - স্বাস্থ্য ইনস্যুরেন্স দাগ্গা প্রত্যাখ্যাপন, এলআইসি মৃত্যু দাগ্গা আপিল, আইআরডিএইই অভিযোগ এবং আম্বুদায়ত্তীয়।",
      content: "ভারতে দাগ্গা প্রত্যাখ্যাপন হার 22-28%। আমরা 50 কোটি+ টাকা রিকভার করেছি।"
    },
    'term-insurance-comparison-hub-2026': {
      title: "টার্ম ইনস্যুরেন্স তুলনা হাব: 30+ পরিকল্পনা, হার ও দাগ্গা অনুপাত (2026)",
      summary: "এলআইসি, এইচডিএফসিএসি জীবন, আইসিআইসিপি আরু, ম্যাক্স লাইফ এবং টাটা এআইএ এর সাথে টার্ম ইনস্যুরেন্স তুলনা করুন।",
      content: "টার্ম ইনস্যুরেন্স ভারতের অধিকাংশ জনপ্রিয় বিমা ধরন।"
    },
    'retirement-pension-planning-hub-2026': {
      title: "অবসর ও পেনশন পরিকল্পনা হাব: 2026 সম্পূর্ণ গাইড - এনপিএস, অ্যানুইটি ও কর্পাস",
      summary: "এনপিএস, এলআইসি জীবন শান্তি এবং অন্যান্য পেনশন পরিকল্পনাগুলি তুলনা করুন। 2026 সালে অবসর পরিকল্পনার প্রয়োজনীয়তা।",
      content: "ভারতের গড় বয়স 29 বছর, কিন্তু 80% কর্মীর কোনও ঔপচারিক পেনশন নেই।"
    },
    'child-education-planning-hub-2026': {
      title: "শিশু শিক্ষা পরিকল্পনা হাব: আপনার শিশুর ভবিষ্যৎ নিরাপদ করুন (2026)",
      summary: "Sukanya Samriddhi, শিশু বিমা পরিকল্পনা এবং পিপিএফ দিয়ে শিশু শিক্ষার পরিকল্পনা করুন।",
      content: "শিক্ষায় মুদ্রাস্ফীতি হার 10-12%। একটি ইঞ্জিয়ারিং বা ডাক্টর পার্সোনাল ডিগ্রি আজ ₹25 লাখ।"
    }
  },
  ta: {
    'health-insurance-hub-complete-2026-guide': {
      title: "சுகாதார காப்புத் திட்டம் ஹாப்: 2026 முழு வழிகாட்டி - இன்சூரன்ஸ் ஆனுசரணை",
      summary: "2026 நிறுவப்பட்ட சுகாதார காப்புத் திட்ட முழு வழிகாட்டி: தவறப்படாத, திறன்தர வழிகாட்டி மற்றும் வரி சலுக்கள்.",
      content: "நாங்கள் உங்களுக்காக இந்தியாவின் முழு சுகாதார காப்புத் திட்டங்கள் பற்றி தகவல்களைப் பரிவுக்கிறோம்."
    },
    'lic-policy-hub-complete-guide-2026': {
      title: "LIC பாலிஸி ஹாப்: 2026 முழு வழிகாட்டி - ஜீவன் இன்சூரன்ஸ் கார்ப்பரேஷன் ஆப் இந்தியா பாலிஸி",
      summary: "LIC பாலிஸி ஹாப்: 2026 முழு வழிகாட்டி - LIC ஸ்டேட்ஸ் செக், பாலிஸி டஉன்லோடு, லோன் இன்டரஸ்ட் ரேட், சுர்ரெண்டர் செய்முறை மற்றும் கோரிக்கை ஆதரவு.",
      content: "LIC இந்தியாவின் அரசுமையான ஜீவன காப்புத் திட்ட நிறுவனம். நாங்கள் LIC பாலிஸிக்கு நிபுண ஆலோசனைகளை வழங்குகிறோம்."
    },
    'claim-recovery-hub-complete-2026-guide': {
      title: "இன்சூரன்ஸ் கோரிக்கை ரிகவரி ஹாப்: 2026 முழு வழிகாட்டி - நிராகரிக்கப்பட்ட கோரிக்கைகளுக்கு வழக்குரை",
      summary: "இன்சூரன்ஸ் கோரிக்கை ரிகவரி ஹாப்: 2026 முழு வழிகாட்டி - ஆரோக்கிய காப்புத் திட்ட கோரிக்கை நிராகரிப்பு, LIC மரண கோரிக்கை விலுவை, IRDAI புகார் மற்றும் ஆம்புத்த்துசன்.",
      content: "இந்தியாவில் கோரிக்கை நிராகரிப்பு 22-28% உள்ளது. நாங்கள் 50 கோடி+ ரூபாய் திருப்பிப்பீடு செய்தோம்."
    },
    'term-insurance-comparison-hub-2026': {
      title: "டெர்ம் இன்சூரன்ஸ் ஒப்பீட்டு ஹாப்: 30+ திட்டங்கள், விலைகள் மற்றும் கோரிக்கை விநியம மெய்ச்சான்கள் (2026)",
      summary: "LIC, HDFC Life, ICICI Pru, Max Life மற்றும் Tata AIA உட்பட டெர்ம் இன்சூரன்ஸ் ஒப்பீடு செய்யுங்கள்.",
      content: "டெர்ம் இன்சூரன்ஸ் இந்தியாவில் அதிகமாக நிறைவேற்றப்பட்ட விமான வகையாகும்."
    },
    'retirement-pension-planning-hub-2026': {
      title: "விரளி & நின்ற நேர பணன்பாக்கி ஹாப்: 2026 முழு வழிகாட்டி - NPS, அனியுயுட்டி மற்றும் கார்பஸ்",
      summary: "NPS, LIC Jeevan Shanti மற்றும் பிற நின்ற நேர பணன்பாக்கி திட்டங்களை ஒப்பீடு செய்யுங்கள். 2026இல் விரளி திட்டத்திற்கு தேவை.",
      content: "இந்தியாவின் சராசரி வயது 29 ஆண்டுகள், ஆனால் 80% தொழிலாளர்களுக்கு எந்த ஔபசாரிக ஓய்வூத்தம் இல்லை."
    },
    'child-education-planning-hub-2026': {
      title: "குழந்தை கல்வி திட்ட ஹாப்: உங்கள் குழந்தையின் எதிர்காலத்தைப் பாதுகாக்கவுங்கள் (2026)",
      summary: "Sukanya Samriddhi, குழந்தை காப்புத் திட்டம் மற்றும் PPF மூலம் குழந்தை கல்வி திட்டம் குறிப்பிட்டவர்.",
      content: "கல்வியில் முன்கூட்டிய வளர்ச்சி விகிதம் 10-12% வாடி. ஒரு எஞ்சினியரிங் அல்லத்து டாக்டர் நபர்தனி ஊட்டம் இன்று ₹25 லட்சம்."
    }
  },
  te: {
    'health-insurance-hub-complete-2026-guide': {
      title: "ఆరోగ్య బీమా హబ్: 2026 పూర్తి గైడ్ - ఇన్సూరెన్స్ సపోర్ట్",
      summary: "2026 యొక్క పూర్తి ఆరోగ్య బీమా గైడ్: తప్పిస్తారి లేకుండా, పోర్టేబిలిటీ గైడ్ మరియు పరన్న లాభాలు.",
      content: "మేము మీకు భారతదేశంలోని పూర్తి ఆరోగ్య బీమా యోజనల సమాచారాన్ని అందిస్తున్నాము."
    },
    'lic-policy-hub-complete-guide-2026': {
      title: "LIC పాలసీ హబ్: 2026 పూర్తి గైడ్ - జీవిత ఇన్సూరెన్స్ కార్పొరేషన్ ఆఫ్ ఇండియా పాలసీ",
      summary: "LIC పాలసీ హబ్: 2026 పూర్తి గైడ్ - LIC స్టేటస్ చెక్, పాలసీ డౌన్లోడ్, లోన్ ఇంటరెస్ట్ రేట్లు, సరెండర్ ప్రక్రియ మరియు క్లెయిం సమర్థన.",
      content: "LIC భారతదేశ ప్రభుత్వ జీవిత బీమా సంస్థ. మేము LIC పాలసీకి నిపుణ సల్లేదిని అందిస్తాము."
    },
    'claim-recovery-hub-complete-2026-guide': {
      title: "ఇన్సూరెన్స్ క్లెయిం రికవరీ హబ్: 2026 పూర్తి గైడ్ - తిరగబడ్డ క్లెయిమ్స్‌కు వ్య appeal",
      summary: "ఇన్సూరెన్స్ క్లెయిం రికవరీ హబ్: 2026 పూర్తి గైడ్ - ఆరోగ్య బీమా క్లెయిం తిరగబడింది, LIC మరణ క్లెయిం అపీల్, IRDAI ఫిర్యాదు మరియు ఆంబుద్స్మ్యాన్.",
      content: "భారతదేశంలో క్లెయిం తిరగబడిన నిష్పత్తి 22-28%. మేము 50 కోట్లు+ రూపాయలని రికవర్ చేసాము."
    },
    'term-insurance-comparison-hub-2026': {
      title: "టెర్మ్ ఇన్సూరెన్స్ తారతమ్య హబ్: 30+ ప్లాన్స్, రేట్లు & క్లెయిం నిష్పత్తి (2026)",
      summary: "LIC, HDFC Life, ICICI Pru, Max Life మరియు Tata AIA తో టెర్మ్ ఇన్సూరెన్స్ తెలిపించడం.",
      content: "టెర్మ్ ఇన్సూరెన్స్ భారతదేశంలో గణనీయమైన జనప్రియ బీమా రకం."
    },
    'retirement-pension-planning-hub-2026': {
      title: "విరమణ & పెన్షన్ ప్రణాళి హబ్స్: 2026 పూర్తి గైడ్ - NPS, అన్యుయిటీ & కార్పస్",
      summary: "NPS, LIC Jeevan Shanti మరియు ఇతర పెన్షన్ యోజనల పోలిక. 2026లో విరమణ యోజనా అవసరం.",
      content: "భారతదేశం సగటు వయస్సు 29 సంవత్సరాలు, కానీ 80% ఉపాధి చేసిన వారికి ఏ ఔపచారిక పెన్షన్ లేదు."
    },
    'child-education-planning-hub-2026': {
      title: "మధ్యతర్గత విద్యా ప్రణాళిక హబ్స్: మీ మగento భవిష్యత్తిని సురక్షితం చేయండి (2026)",
      summary: "Sukanya Samriddhi, మధ్యతర్గత బీమా యోజనలు మరియు PPF ద్వారా మగento విద్యా ప్రణాళిక.",
      content: "విద్యలో మారుతున్న ధరల రేటు 10-12% వార్షికంగా. ఒక ఇంజినీరింగ్ లేదా డాక్టర్ వ్యక్తిగత డిగ్రీ ఈరోద్దాక రూ.25 లక్షలు."
    }
  },
  mr: {
    'health-insurance-hub-complete-2026-guide': {
      title: "आरोग्य वित्त हब्स: 2026 संपूर्ण मार्गदर्शक - इन्स्योरन्स सपोर्ट",
      summary: "2026 मधील संपूर्ण आरोग्य वित्त मार्गदर्शक: विनामूल्य ओळख, पोर्टेबिलिटी मार्गदर्शक आणि कर सुधारणा.",
      content: "आम्ही तुमच्यासाठी भारताच्या सर्व आरोग्य वित्न योजनांची माहिती उपलब्ध करवतो."
    },
    'lic-policy-hub-complete-guide-2026': {
      title: "LIC वायदा हब्स: 2026 संपूर्ण मार्गदर्शक - जीवन विती निगम ऑफ इंडिया वायदा",
      summary: "LIC वायदा हब्स: 2026 संपूर्ण मार्गदर्शक - LIC स्टॅटस चेक, वायदा डाउनलोड, लॉन इंटरेस्ट दर, सरेंडर प्रक्रिया आणि दावा समर्थन.",
      content: "LIC हे भारताचे सरकारी जीवन विती कंपनी आहे. आम्ही LIC वायद्यासाठी तज्ञ सल्ले उपलब्ध करवतो."
    },
    'claim-recovery-hub-complete-2026-guide': {
      title: "विती दावा समाधे हब्स: 2026 संपूर्ण मार्गदर्शक - नाकारलेल्या दावांवर अपील",
      summary: "विती दावा समाधे हब्स: 2026 संपूर्ण मार्गदर्शक - आरोग्य विती दावा नाकारणे, LIC मृत्यु दावा अपील, IRDAI तक्रार आणि आंबुद्स्मान.",
      content: "भारतातील दावा नाकारणे 22-28% आहे. आम्ही 50 कोटी+ रुपयांचे समाधे केले आहे."
    },
    'term-insurance-comparison-hub-2026': {
      title: "टर्म विती तुलना हब्स: 30+ योजना, दर आणि दावा गुणोत्तर (2026)",
      summary: "LIC, HDFC Life, ICICI Pru, Max Life आणि Tata AIA यांच्याबरोबर टर्म विती तुलना करा.",
      content: "टर्म विती भारतात सर्वाधिक लोकप्रिय विती प्रकार आहे."
    },
    'retirement-pension-planning-hub-2026': {
      title: "सेवाविनिवृत्ती & पेन्शन योजना हब्स: 2026 संपूर्ण मार्गदर्शक - NPS, अँनुइटी आणि कॉर्पस",
      summary: "NPS, LIC Jeevan Shanti आणि इतर पेन्शन योजनांची तुलना करा. 2026 मध्ये सेवाविनिवृत्ती योजनेची आवश्यकता.",
      content: "भारताची सरासरी वय 29 वर्षे आहे, परंतु 80% कामगारांकडे कोणतीही औपचारिक पेन्शन नाही."
    },
    'child-education-planning-hub-2026': {
      title: "मुलाची शिक्षण योजना हब्स: तुमच्या मुलाचे भविष्य सुरक्षित करा (2026)",
      summary: "Sukanya Samriddhi, मुल विती योजना आणि PPF मुळे मुलाची शिक्षण योजना करा.",
      content: "शिक्षणात महांगडी वार्षिक 10-12%. एक अॅंगॅनियरिंग किंवा डॉक्टर वैयक्तिगत डिग्री आज ₹25 लाख."
    }
  },
  gu: {
    'health-insurance-hub-complete-2026-guide': {
      title: "આરોગ્ય વીમા હાબ: 2026 સંપૂર્ણ માર્ગદર્શિકા - ઇન્સ્યોરન્સ સપોર્ટ",
      summary: "2026 ની સંપૂર્ણ આરોગ્ય વીમા માર્ગદર્શિકા: ભૂલશોં નહીં, પોર્ટેબિલિટી માર્ગદર્શિકા અને ટૅક્સ લાભ.",
      content: "અમે તમારા માટે ભારતની બધી આરોગ્ય વીમા યોજનાઓ માટે માહિતી પ્રદાન કરીએ છીએ."
    },
    'lic-policy-hub-complete-guide-2026': {
      title: "LIC પોલિસી હાબ: 2026 સંપૂર્ણ માર્ગદર્શિકા - જીવન વીમા નિગમ ઓફ ઇન્ડિયા પોલિસી",
      summary: "LIC પોલિસી હાબ: 2026 સંપૂર્ણ માર્ગદર્શિકા - LIC સ્થિતિ પરિશોધન, પોલિસી ડાઉનલોડ, લોન જામેંટ દર, સ્યુરેન્ડર પ્રક્રિયા અને દાવા સમર્થન.",
      content: "LIC એ ભારતની સરકારી જીવન વીમા નિગમ છે. અમે LIC પોલિસીમાં તજ્ઞ સલ્લાગાર પ્રદાન કરીએ છીએ."
    },
    'claim-recovery-hub-complete-2026-guide': {
      title: "વીમા દાવા સમાધાન હાબ: 2026 સંપૂર્ણ માર્ગદર્શિકા - નકારેલ દાવાઓ પર અપીલ",
      summary: "વીમા દાવા સમાધાન હાબ: 2026 સંપૂર્ણ માર્ગદર્શિકા - આરોગ્ય વીમા દાવા નકારણ, LIC મૃત્યુ દાવા અપીલ, IRDAI શિકાયત અને આંબુદ્સ્મન.",
      content: "ભારતમાં દાવા નકારણની દર 22-28% છે. અમે 50 કોટી+ રૂપિયાનું પુનર્પ્રાપ્તિ કરીએ છીએ."
    },
    'term-insurance-comparison-hub-2026': {
      title: "ટર્મ વીમા તુલના હાબ: 30+ યોજનાઓ, દર અને દાવા ગુણોત્તર (2026)",
      summary: "LIC, HDFC Life, ICICI Pru, Max Life અને Tata AIA સાથે ટર્મ વીમા તુલના કરો.",
      content: "ટર્મ વીમા ભારતમાં સૌથી વધારે પ્રખ્યાત વીમા પ્રકાર છે."
    },
    'retirement-pension-planning-hub-2026': {
      title: "સેવાનિવૃત્તિ & પેન્શન યોજના હાબ: 2026 સંપૂર્ણ માર્ગદર્શિકા - NPS, અન્યુયિટી & કૉર્પસ",
      summary: "NPS, LIC Jeevan Shanti અને અન્ય પેન્શન યોજનાઓ તુલના કરો. 2026માં સેવાનિવૃત્તિ યોજનાની જરૂર.",
      content: "ભારતની સરાસરી વય 29 છે, પરંતુ 80% કર્મચારીઓના કોઈ ઔપચારિક પેન્શન નથી."
    },
    'child-education-planning-hub-2026': {
      title: "બાળકની શૈક્ષણિક યોજના હાબ: તમારા બાળકનું ભવિષ્ય સુરક્ષિત કરો (2026)",
      summary: "Sukanya Samriddhi, બાળક વીમા યોજના અને PPF દ્વારા બાળકની શૈક્ષણિક યોજના કરો.",
      content: "શૈક્ષણિક મહંગાઈ દર 10-12% વાર્ષિક છે. એક એન્જિનિયરિંગ અથવા ડોક્ટર વ્યક્તિગત ડિગ્રી આજે ₹25 લાખ."
    }
  },
  kn: {
    'health-insurance-hub-complete-2026-guide': {
      title: "ಆರೋಗ್ಯ ಬೀಮೆ ಹಬ್: 2026 ಸಂಪೂರ್ಣ ಮಾರ್ಗಸೂಚಿ - ಇನ್ಸ್ಯೂರೆನ್ಸ್ ಸಪೋರ್ಟ್",
      summary: "2026 ಯ ಪೂರ್ಣ ಆರೋಗ್ಯ ಬೀಮೆ ಮಾರ್ಗಸೂಚಿ: ತಪ್ಪಿಸಬೇಕಲ್ಲದ ಮೂಲ್ಯ, ಪೋರ್ಟೇಬಿಲಿಟಿ ಮಾರ್ಗಸೂಚಿ ಮತ್ತು ಪರನ್ ಲಾಭಗಳು.",
      content: "ನಾವು ನಿಮ್ಮಗೆ ಭಾರತದ ಮೊತ್ತಮ ಆರೋಗ್ಯ ಬೀಮೆ ಯೋಜನೆಗಳ ಮಾಹಿತಿಯನ್ನು ನೀಡಿಸುತ್ತೇವೆ."
    },
    'lic-policy-hub-complete-guide-2026': {
      title: "LIC ಪಾಲಿಸಿ ಹಬ್: 2026 ಸಂಪೂರ್ಣ ಮಾರ್ಗಸೂಚಿ - ಜೀವನ ಇನ್ಸ್ಯೂರೆನ್ಸ್ ಕೋರ್ಪೊರೇಷನ್ ಆಫ್ ಇಂಡಿಯ ಪಾಲಿಸಿ",
      summary: "LIC ಪಾಲಿಸಿ ಹಬ್: 2026 ಸಂಪೂರ್ಣ ಮಾರ್ಗಸೂಚಿ - LIC ಸ್ಥಿತಿ ಪರಿಶೋಧನೆ, ಪಾಲಿಸಿ ಡ೗ನ್ಲೋಡ್, ಲೋನ್ ಜಾಮೆಂಟ್ ದರ, ಸರೆಂಡರ್ ಹಾಗೂ ಹಕ್ಕು ಸಮರ್ಥನೆ.",
      content: "LIC ಭಾರತದ ಸರಕಾರಿ ಜೀವನ ಬೀಮೆ ಸಂಸ್ಥೆ. ನಾವು LIC ಪಾಲಿಸಿಗೆ ನಿಪುಣ ಸಲ್ಲಾಕ್ಕೆ ಸಿಗಿದೆ."
    },
    'claim-recovery-hub-complete-2026-guide': {
      title: "ಇನ್ಸ್ಯೂರೆನ್ಸ್ ಹಕ್ಕು ಪರಿಹಾರ ಹಬ್: 2026 ಸಂಪೂರ್ಣ ಮಾರ್ಗಸೂಚಿ - ನಿರಾಕರಿಸಲ್ಪಟ್ಟ ಹಕ್ಕುಗಳಿಗೆ ಆಯ್ಕೆ",
      summary: "ಇನ್ಸ್ಯೂರೆನ್ಸ್ ಹಕ್ಕು ಪರಿಹಾರ ಹಬ್: 2026 ಸಂಪೂರ್ಣ ಮಾರ್ಗಸೂಚಿ - ಆರೋಗ್ಯ ಬೀಮೆ ಹಕ್ಕು ನಿರಾಕರಣೆ, LIC ಮರಣ ಹಕ್ಕು, IRDAI ನಿವಾರಣೆ ಮತ್ತು ಆಂಬುದ್ಸ್ಮನ್.",
      content: "ಭಾರತದಲ್ಲಿ ಹಕ್ಕು ನಿರಾಕರಣೆ 22-28% ಇದೆ. ನಾವು 50 ಕೋಟಿ+ ರೂಪಾಯಲನ್ನಿ ಪಡೆದೆ."
    },
    'term-insurance-comparison-hub-2026': {
      title: "ಟರ್ಮ್ ಇನ್ಸ್ಯೂರೆನ್ಸ್ ತಾರತಮ್ಯ ಹಬ್: 30+ ಯೋಜನೆಗಳು, ದರಗಳು & ಹಕ್ಕು ನಿಷ್ಪತ್ತಿ (2026)",
      summary: "LIC, HDFC Life, ICICI Pru, Max Life ಮತ್ತು Tata AIA ಜೊತೆ ಟರ್ಮ್ ಇನ್ಸ್ಯೂರೆನ್ಸ್ ಹೋಲಿಕೆ ಮಾಡಿ.",
      content: "ಟರ್ಮ್ ಇನ್ಸ್ಯೂರೆನ್ಸ್ ಭಾರತದಲ್ಲಿ ಹೆಚ್ಚಿನ ಜನಪ್ರಿಯ ಬೀಮೆ ರೀತಿ."
    },
    'retirement-pension-planning-hub-2026': {
      title: "ಸೇವಾನಿವೃತ್ತಿ & ಪಿಶ್ಝಿನ ಯೋಜನೆ ಹಬ್: 2026 ಸಂಪೂರ್ಣ ಮಾರ್ಗಸೂಚಿ - NPS, ಅನ್ಯುಯಿಟಿ & ಕಾರ್ಪಸ್",
      summary: "NPS, LIC Jeevan Shanti ಮತ್ತು ಇತರ ಪಿಶ್ಝಿನ ಯೋಜನೆಗಳ ಹೋಲಿಕೆ. 2026ದಲ್ಲಿ ಸೇವಾನಿವೃತ್ತಿ ಯೋಜನೆ ಅವಶ್ಯಕ.",
      content: "ಭಾರತದ ಸಮಾನಾಯಿಕ ಗಟ್ಟರ 29 ವರ್ಷಗಳು, ಆದರೆ 80% ಉದ್ಯೋಗಿಗಳಿಗೆ ಯಾವುದೇ ಔಪಚಾರಿಕ ಪೆನ್ಷನ್ ಲೇದು."
    },
    'child-education-planning-hub-2026': {
      title: "ಮಕ್ಕಳ ವಿದ್ಯಾಭ್ಯಾಸ ಯೋಜನೆ ಹಬ್: ನಿಮ್ಮ ಮಕ್ಕಳ ಭವಿಷ್ಯವನ್ನು ಸುರಕ್ಷಿತಗೊಳ್ಳಿರಿ (2026)",
      summary: "Sukanya Samriddhi, ಮಕ್ಕಳ ಬೀಮೆ ಯೋಜನೆಗಳು ಮತ್ತು PPF ಮೂಲಕ ಮಕ್ಕಳ ವಿದ್ಯಾಭ್ಯಾಸ ಯೋಜನೆ ಹಿಡಿದಿರಿ.",
      content: "ವಿದ್ಯೇಯಲ್ಲಿ ಮಹಂಗಿತನ ದರ 10-12% ವಾರ್ಷಿಕವಾಗಿದೆ. ಒಬ್ಬ ಎಞ್ಜಿನಿಯರಿಂಗ್ ಅಥವಾ ಡಾಕ್ಟರ್ ವೈಯಕ್ತಿಗತ ಡಿಗ್ರೀ ಇಂದಿಗೆ ₹25 ಲಕ್ಷ."
    }
  },
  ml: {
    'health-insurance-hub-complete-2026-guide': {
      title: "ആർഭുത ഇൻസ്യൂറൻസ് ഹബ്: 2026 സമ്പൂർണ ഗൈഡ് - ഇൻസ്യൂറൻസ് സപ്പോർട്ട്",
      summary: "2026 ലെ സമ്പൂർണ ആർഭുത ഇൻസ്യൂറൻസ് ഗൈഡ്: തെറ്റിപ്പില്ലാതെ പഠിക്കുക, പോർട്ടബിളിറ്റി ഗൈഡ് മറ്റു നികുതി ലാഭങ്ങൾ.",
      content: "നമുക്ക് നിന്ന് ഇന്ത്യയിലെ എല്ലാ ആർഭുത ഇൻസ്യൂറൻസ് യോജനങ്ങളുടെ വിവരങ്ങൾ ലഭ്യമാണ്."
    },
    'lic-policy-hub-complete-guide-2026': {
      title: "LIC പോളിസി ഹബ്: 2026 സമ്പൂർണ ഗൈഡ് - ലൈഫ് ഇൻസ്യൂറൻസ് കോർപ്പറേഷൻ ഓഫ് ഇന്ത്യാ പോളിസി",
      summary: "LIC പോളിസി ഹബ്: 2026 സമ്പൂർണ ഗൈഡ് - LIC സ്ഥിതി പരിശോധിക്കുക, പോളിസി ഡൗൺലോഡ്, ലോൺ ജാമ്പതി ദർശനീയമാക്കുക, സറ്റന്റർ പ്രക്രിയ മറ്റു ക്ലെയിം സമർത്ഥനം.",
      content: "LIC ഇന്ത്യയുടെ സർക്കാർ ജീവന ഇൻസ്യൂറൻസ് കമ്പനി. നമുക്ക് LIC പോളിസിക്ക് തത്വമതിയായ ആലോചനകൾ നൽകുന്നു."
    },
    'claim-recovery-hub-complete-2026-guide': {
      title: "ഇൻസ്യൂറൻസ് ക്ലെയിം പുനവാപ്തി ഹബ്: 2026 സമ്പൂർണ ഗൈഡ് - തറന്ന ക്ലെയിമ്മുകൾക്ക് ആപ്പീൽ",
      summary: "ഇൻസ്യൂറൻസ് ക്ലെയിം പുനവാപ്തി ഹബ്: 2026 സമ്പൂർണ ഗൈഡ് - ആർഭുത ഇൻസ്യൂറൻസ് ക്ലെയിം നിറക്കുക, LIC മരണ ക്ലെയിം ആപ്പീൽ, IRDAI പരാമർശ മറ്റു ഓംബുദ്സ്മാൻ.",
      content: "ഇന്ത്യയിലെ ദാവി നിറക്കുന്ന നിഷ്പത്തി 22-28% ഉണ്ട്. നമുക്ക് 50 കോടി+ രൂപ പുനഃപ്രാപ്തി ചെയ்தു."
    },
    'term-insurance-comparison-hub-2026': {
      title: "ടർമ് ഇൻസ്യൂറൻസ് താരതമ്യ ഹബ്: 30+ പ്രണാളുകൾ, നിരക്കുകൾ & ക്ലെയിം നിഷ്പത്തി (2026)",
      summary: "LIC, HDFC Life, ICICI Pru, Max Life മറ്റു Tata AIA യുടെ ടർമ് ഇൻസ്യൂറൻസ് താരതമ്യം ചെയ്യുക.",
      content: "ടർമ് ഇൻസ്യൂറൻസ് ഇന്ത്യയിൽ ഏറ്റവും ജനപ്രിയമായ ഇൻസ്യൂറൻസ് തരം."
    },
    'retirement-pension-planning-hub-2026': {
      title: "വിരമ്മണി & പെൻഷൻ പ്ലാനിംഗ് ഹബ്: 2026 സമ്പൂർണ ഗൈഡ് - NPS, അന്യുയിറ്റി & കാര്‍പ്പസ്",
      summary: "NPS, LIC Jeevan Shanti മറ്റു മറ്റ് പെൻഷൻ യോജനങ്ങൾ താരതമ്യം ചെയ്യുക. 2026ല്‍ വിരമ്മണിക്കാന്‍ ആവശ്യമാണ്.",
      content: "ഇന്ത്യയിലെ ശരാശരി പ്രായമത്തി 29 വയസ്സ്, പക്ഷേ 80% ജീവിതത്തിലെ ഏത് ഔപചാരിക പെൻഷൻ ഇല്ല."
    },
    'child-education-planning-hub-2026': {
      title: "കുട്ടിയുടെ വിദ്യാഭ്യാസ പ്ലാനിംഗ് ഹബ്: നിന്റെ കുട്ടിയുടെ ഭവിഷ്യത്തെ സുരക്ഷിതമാക്കുക (2026)",
      summary: "Sukanya Samriddhi, കുട്ടി ഇൻസ്യൂറൻസ് പ്ലാനുകൾ മറ്റു PPF വഴി കുട്ടിയുടെ വിദ്യാഭ്യാസ പ്ലാനിംഗ് ചെയ്യുക.",
      content: "വിദ്യയിൽ മുന്നേറ്റമായ ധര നിരക്ക് 10-12% വാർഷികമായി. ഒരു എഞ്ചിനിയറിംഗ് ലേക്കഥ അല്ലാത്ത ഒരു ഡോക്ടർ വ്യക്തിഗത ഡിഗ്രി ഇന്ന് ₹25 ലക്ഷം."
    }
  }
};

// ─── Generate translated posts ──────────────────────────────────────────────
const newPosts = [];
let addedCount = 0;

for (const post of englishPosts) {
  for (const langCode of INDIAN_LANGUAGES) {
    const postTranslations = FULL_TRANSLATIONS[langCode];
    if (!postTranslations || !postTranslations[post.slug]) {
      continue; // Skip posts without full translations
    }

    const trans = postTranslations[post.slug];
    const translatedPost = {
      ...post,
      slug: `${langCode}-${post.slug}`,
      lang: langCode,
      title: trans.title,
      summary: trans.summary,
      content: trans.content,
      translatedFrom: post.slug,
      originalTitle: post.title,
      date: post.date,
      author: post.author,
      categories: post.categories,
      tags: post.tags,
      heroImage: post.heroImage,
      modifiedDate: post.modifiedDate
    };

    newPosts.push(translatedPost);
    addedCount++;
  }
}

console.log(`[translations] Generated ${addedCount} translated posts across ${INDIAN_LANGUAGES.length} languages.`);

if (DRY_RUN) {
  console.log('[translations] Dry run — not writing to file.');
  for (const p of newPosts.slice(0, 5)) {
    console.log(`  ${p.slug} | ${p.lang} | ${p.title}`);
  }
  process.exit(0);
}

// ─── Merge and write ───────────────────────────────────────────────────────
const allPosts = [...posts, ...newPosts];
fs.writeFile(BLOGS_FILE, JSON.stringify(allPosts, null, 2), 'utf-8');
console.log(`[translations] Updated blogs.json — ${allPosts.length} total posts.`);
