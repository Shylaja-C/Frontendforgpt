import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Search, Phone, BookOpen, Clock, Info } from "lucide-react";
import { useLang } from "../context/LangContext";

const TX = {
  title: { "ta-IN": "அரசு திட்டங்கள்", "hi-IN": "सरकारी योजनाएं", "te-IN": "ప్రభుత్వ పథకాలు", "kn-IN": "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", "ml-IN": "സർക്കാർ പദ്ധതികൾ", "en-IN": "Government Schemes & Subsidies" },
  subtitle: { "ta-IN": "10 மத்திய அரசு திட்டங்கள் — மார்ச் 2026", "hi-IN": "10 केंद्रीय योजनाएं — मार्च 2026", "te-IN": "10 కేంద్ర పథకాలు — మార్చి 2026", "kn-IN": "10 ಕೇಂದ್ರ ಯೋಜನೆಗಳು — మార్చి 2026", "ml-IN": "10 കേന്ദ്ര പദ്ധതികൾ — മാർച്ച് 2026", "en-IN": "10 active Central Government schemes for Indian farmers — March 2026" },
  search: { "ta-IN": "திட்டங்களை தேடுங்கள்...", "hi-IN": "योजनाएं खोजें...", "te-IN": "పథకాలు వెతకండి...", "kn-IN": "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...", "ml-IN": "പദ്ധതികൾ തിരയുക...", "en-IN": "Search schemes..." },
  all: { "ta-IN": "அனைத்தும்", "hi-IN": "सभी", "te-IN": "అన్నీ", "kn-IN": "ಎಲ್ಲಾ", "ml-IN": "എല്ലാം", "en-IN": "All" },
  benefits: { "ta-IN": "முக்கிய நன்மைகள்", "hi-IN": "मुख्य लाभ", "te-IN": "ముఖ్య ప్రయోజనాలు", "kn-IN": "ప్రముఖ ಪ್ರಯೋಜನಗಳು", "ml-IN": "പ്രധാന ആനുകൂല്യങ്ങൾ", "en-IN": "Key Benefits" },
  howApply: { "ta-IN": "விண்ணப்பிக்கும் முறை", "hi-IN": "आवेदन कैसे करें", "te-IN": "దరఖాస్తు ఎలా చేయాలి", "kn-IN": "అర్జీ ಹೇಗೆ ಸಲ್ಲಿಸುವುದು", "ml-IN": "എങ്ങനെ അപേക്ഷിക്കാം", "en-IN": "How to Apply" },
  visit: { "ta-IN": "இணையதளம் பார்க்க", "hi-IN": "वेबसाइट देखें", "te-IN": "వెబ్‌సైట్ చూడండి", "kn-IN": "ವೆಬ್‌ಸೈಟ್ ನೋಡಿ", "ml-IN": "വെബ്‌സൈറ്റ് കാണുക", "en-IN": "Visit" },
  helpline: { "ta-IN": "உதவி எண்", "hi-IN": "हेल्पलाइन", "te-IN": "హెల్ప్‌లైన్", "kn-IN": "ಸಹಾಯವಾಣಿ", "ml-IN": "ഹെൽപ്‌ലൈൻ", "en-IN": "Helpline" },
  disclaimer: { "ta-IN": "அனைத்து தகவல்களும் மார்ச் 2026 நிலவரப்படி சரிபார்க்கப்பட்டவை.", "hi-IN": "सभी जानकारी मार्च 2026 तक सत्यापित है।", "te-IN": "అన్ని సమాచారం మార్చి 2026 వరకు ధృవీకరించబడింది.", "kn-IN": "ಎಲ್ಲಾ ಮಾಹಿತಿಯು ಮಾರ್ಚ್ 2026 ರವರೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.", "ml-IN": "എല്ലാ വിവരങ്ങളും മാർച്ച് 2026 വരെ പരിശോധിച്ചിട്ടുണ്ട്.", "en-IN": "Verified as of March 2026." },
};

const SCHEMES = [
  {
    id: 1,
    title: { "en-IN": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)", "hi-IN": "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)", "ta-IN": "பி.எம்-கிசான் (பிரதமர் கிசான் சம்மான் நிதி)" },
    category: "Direct Income Support",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    benefit: { "en-IN": "₹6,000 per year in 3 installments", "hi-IN": "₹6,000 प्रति वर्ष 3 किस्तों में", "ta-IN": "ஆண்டுக்கு ₹6,000 3 தவணைகளில்" },
    desc: { "en-IN": "A central scheme providing income support to all landholding farmers' families in the country.", "hi-IN": "देश के सभी भूमिधारक किसान परिवारों को आय सहायता प्रदान करने वाली एक केंद्रीय योजना।", "ta-IN": "நாட்டின் அனைத்து நிலம் வைத்துள்ள விவசாய குடும்பங்களுக்கும் வருமான ஆதரவு வழங்கும் மத்திய திட்டம்." },
    apply: { "en-IN": "Apply via PM-Kisan portal or Common Service Centres (CSC).", "hi-IN": "पीएम-किसान पोर्टल या सामान्य सेवा केंद्रों (CSC) के माध्यम से आवेदन करें।", "ta-IN": "பி.எம்-கிசான் போர்டல் அல்லது பொது சேவை மையங்கள் (CSC) மூலம் விண்ணப்பிக்கவும்." },
    url: "https://pmkisan.gov.in",
    helpline: "155261 / 1800115526"
  },
  {
    id: 2,
    title: { "en-IN": "PM Fasal Bima Yojana (PMFBY)", "hi-IN": "पीएम फसल बीमा योजना (PMFBY)", "ta-IN": "பி.எம் பயிர் காப்பீட்டுத் திட்டம் (PMFBY)" },
    category: "Crop Insurance",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    benefit: { "en-IN": "Insurance cover against crop failure due to natural calamities.", "hi-IN": "प्राकृतिक आपदाओं के कारण फसल खराब होने के खिलाफ बीमा कवर।", "ta-IN": "இயற்கை சீற்றங்களால் பயிர் இழப்புக்கு எதிரான காப்பீடு." },
    desc: { "en-IN": "Provides comprehensive insurance coverage against crop failure, helping stabilize farmer income.", "hi-IN": "फसल खराब होने के खिलाफ व्यापक बीमा कवरेज प्रदान करता है, जिससे किसान की आय को स्थिर करने में मदद मिलती है।", "ta-IN": "பயிர் இழப்புக்கு எதிரான விரிவான காப்பீட்டை வழங்குகிறது, விவசாயி வருமானத்தை நிலைப்படுத்த உதவுகிறது." },
    apply: { "en-IN": "Enroll through banks, insurance agents, or the National Crop Insurance Portal.", "hi-IN": "बैंकों, बीमा एजेंटों या राष्ट्रीय फसल बीमा पोर्टल के माध्यम से नामांकन करें।", "ta-IN": "வங்கிகள், காப்பீட்டு முகவர்கள் அல்லது தேசிய பயிர் காப்பீட்டு போர்டல் மூலம் பதிவு செய்யவும்." },
    url: "https://pmfby.gov.in",
    helpline: "18001801551"
  },
  {
    id: 3,
    title: { "en-IN": "Soil Health Card Scheme", "hi-IN": "मृदा स्वास्थ्य कार्ड योजना", "ta-IN": "மண் ஆரோக்கிய அட்டை திட்டம்" },
    category: "Soil & Input Management",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    benefit: { "en-IN": "Free soil testing and customized fertilizer recommendations.", "hi-IN": "मुफ्त मिट्टी परीक्षण और अनुकूलित उर्वरक सिफारिशें।", "ta-IN": "இலவச மண் பரிசோதனை மற்றும் உரம் பரிந்துரைகள்." },
    desc: { "en-IN": "Helps farmers understand soil nutrient status and recommended dosage of fertilizers.", "hi-IN": "किसानों को मिट्टी के पोषक तत्वों की स्थिति और उर्वरकों की अनुशंसित खुराक को समझने में मदद करता है।", "ta-IN": "விவசாயிகள் மண்ணின் ஊட்டச்சத்து நிலை மற்றும் உரங்களின் பரிந்துரைக்கப்பட்ட அளவைப் புரிந்துகொள்ள உதவுகிறது." },
    apply: { "en-IN": "Submit soil samples to the nearest Soil Testing Lab.", "hi-IN": "निकटतम मृदा परीक्षण प्रयोगशाला में मिट्टी के नमूने जमा करें।", "ta-IN": "அருகிலுள்ள மண் பரிசோதனை ஆய்வகத்தில் மண் மாதிரிகளை சமர்ப்பிக்கவும்." },
    url: "https://soilhealth.dac.gov.in",
    helpline: "18001801551"
  },
  {
    id: 4,
    title: { "en-IN": "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)", "hi-IN": "प्रधानमंत्री कृषि सिंचाई योजना (PMKSY)", "ta-IN": "பிரதமர் கிருஷி சிஞ்சாய் யோஜனா (PMKSY)" },
    category: "Irrigation & Water",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
    benefit: { "en-IN": "Subsidy on drip/sprinkler irrigation systems up to 90%", "hi-IN": "ड्रिप/स्प्रिंकलर सिंचाई प्रणाली पर 90% तक सब्सिडी", "ta-IN": "சொட்டு/தெளிப்பு நீர்ப்பாசன அமைப்புகளுக்கு 90% வரை மானியம்" },
    desc: { "en-IN": "Aims to expand cultivable area under irrigation and improve water use efficiency through micro-irrigation.", "hi-IN": "सूक्ष्म सिंचाई के माध्यम से सिंचाई के तहत खेती योग्य क्षेत्र का विस्तार और जल उपयोग दक्षता में सुधार करना।", "ta-IN": "நுண்ணீர் பாசனம் மூலம் நீர்ப்பாசனத்தின் கீழ் பயிரிடக்கூடிய பரப்பை விரிவுபடுத்துதல் மற்றும் நீர் பயன்பாட்டு திறனை மேம்படுத்துதல்." },
    apply: { "en-IN": "Apply through State Agriculture Department or District Horticulture Office.", "hi-IN": "राज्य कृषि विभाग या जिला बागवानी कार्यालय के माध्यम से आवेदन करें।", "ta-IN": "மாநில வேளாண்மை துறை அல்லது மாவட்ட தோட்டக்கலை அலுவலகம் மூலம் விண்ணப்பிக்கவும்." },
    url: "https://pmksy.gov.in",
    helpline: "18001801551"
  },
  {
    id: 5,
    title: { "en-IN": "Kisan Credit Card (KCC)", "hi-IN": "किसान क्रेडिट कार्ड (KCC)", "ta-IN": "கிசான் கடன் அட்டை (KCC)" },
    category: "Credit & Loans",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    benefit: { "en-IN": "Short-term credit up to ₹3 lakh at 4% interest", "hi-IN": "4% ब्याज पर ₹3 लाख तक का अल्पकालिक ऋण", "ta-IN": "4% வட்டியில் ₹3 லட்சம் வரை குறுகிய கால கடன்" },
    desc: { "en-IN": "Provides farmers with timely access to credit for agricultural needs including crop production and maintenance.", "hi-IN": "फसल उत्पादन और रखरखाव सहित कृषि आवश्यकताओं के लिए किसानों को समय पर ऋण उपलब्ध कराता है।", "ta-IN": "பயிர் உற்பத்தி மற்றும் பராமரிப்பு உள்ளிட்ட விவசாய தேவைகளுக்கு விவசாயிகளுக்கு சரியான நேரத்தில் கடன் வழங்குகிறது." },
    apply: { "en-IN": "Apply at any nationalized bank, cooperative bank, or RRB with land documents.", "hi-IN": "भूमि दस्तावेजों के साथ किसी भी राष्ट्रीयकृत बैंक, सहकारी बैंक या RRB में आवेदन करें।", "ta-IN": "நில ஆவணங்களுடன் எந்த தேசியமயமாக்கப்பட்ட வங்கி, கூட்டுறவு வங்கி அல்லது RRB இல் விண்ணப்பிக்கவும்." },
    url: "https://www.nabard.org/content1.aspx?id=523",
    helpline: "18001036999"
  },
  {
    id: 6,
    title: { "en-IN": "National Agriculture Market (e-NAM)", "hi-IN": "राष्ट्रीय कृषि बाजार (e-NAM)", "ta-IN": "தேசிய வேளாண் சந்தை (e-NAM)" },
    category: "Market Access",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    benefit: { "en-IN": "Online trading platform for better price discovery", "hi-IN": "बेहतर मूल्य खोज के लिए ऑनलाइन ट्रेडिंग प्लेटफॉर्म", "ta-IN": "சிறந்த விலை கண்டறிதலுக்கான ஆன்லைன் வர்த்தக தளம்" },
    desc: { "en-IN": "Pan-India electronic trading portal connecting APMC mandis to create a unified national market for agricultural commodities.", "hi-IN": "कृषि वस्तुओं के लिए एक एकीकृत राष्ट्रीय बाजार बनाने के लिए APMC मंडियों को जोड़ने वाला अखिल भारतीय इलेक्ट्रॉनिक ट्रेडिंग पोर्टल।", "ta-IN": "வேளாண் பொருட்களுக்கான ஒருங்கிணைந்த தேசிய சந்தையை உருவாக்க APMC மண்டிகளை இணைக்கும் அகில இந்திய மின்னணு வர்த்தக போர்டல்." },
    apply: { "en-IN": "Register on e-NAM portal with Aadhaar and bank details.", "hi-IN": "आधार और बैंक विवरण के साथ e-NAM पोर्टल पर पंजीकरण करें।", "ta-IN": "ஆதார் மற்றும் வங்கி விவரங்களுடன் e-NAM போர்டலில் பதிவு செய்யவும்." },
    url: "https://www.enam.gov.in",
    helpline: "18001801551"
  },
  {
    id: 7,
    title: { "en-IN": "Paramparagat Krishi Vikas Yojana (PKVY)", "hi-IN": "परंपरागत कृषि विकास योजना (PKVY)", "ta-IN": "பாரம்பரகத் கிருஷி விகாஸ் யோஜனா (PKVY)" },
    category: "Organic Farming",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    benefit: { "en-IN": "₹50,000 per hectare for organic farming over 3 years", "hi-IN": "3 वर्षों में जैविक खेती के लिए ₹50,000 प्रति हेक्टेयर", "ta-IN": "3 ஆண்டுகளில் இயற்கை விவசாயத்திற்கு ஹெக்டேருக்கு ₹50,000" },
    desc: { "en-IN": "Promotes organic farming through cluster approach and provides financial assistance for certification and marketing.", "hi-IN": "क्लस्टर दृष्टिकोण के माध्यम से जैविक खेती को बढ़ावा देता है और प्रमाणन और विपणन के लिए वित्तीय सहायता प्रदान करता है।", "ta-IN": "கிளஸ்டர் அணுகுமுறை மூலம் இயற்கை விவசாயத்தை ஊக்குவிக்கிறது மற்றும் சான்றிதழ் மற்றும் சந்தைப்படுத்துதலுக்கு நிதி உதவி வழங்குகிறது." },
    apply: { "en-IN": "Form farmer groups and apply through State Agriculture Department.", "hi-IN": "किसान समूह बनाएं और राज्य कृषि विभाग के माध्यम से आवेदन करें।", "ta-IN": "விவசாயிகள் குழுக்களை உருவாக்கி மாநில வேளாண்மை துறை மூலம் விண்ணப்பிக்கவும்." },
    url: "https://pgsindia-ncof.gov.in",
    helpline: "18001801551"
  },
  {
    id: 8,
    title: { "en-IN": "Rashtriya Krishi Vikas Yojana (RKVY)", "hi-IN": "राष्ट्रीय कृषि विकास योजना (RKVY)", "ta-IN": "ராஷ்ட்ரிய கிருஷி விகாஸ் யோஜனா (RKVY)" },
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    benefit: { "en-IN": "State-specific agricultural infrastructure development", "hi-IN": "राज्य-विशिष्ट कृषि बुनियादी ढांचा विकास", "ta-IN": "மாநில சார்ந்த வேளாண் உள்கட்டமைப்பு மேம்பாடு" },
    desc: { "en-IN": "Incentivizes states to increase public investment in agriculture and allied sectors for holistic development.", "hi-IN": "समग्र विकास के लिए कृषि और संबद्ध क्षेत्रों में सार्वजनिक निवेश बढ़ाने के लिए राज्यों को प्रोत्साहित करता है।", "ta-IN": "முழுமையான வளர்ச்சிக்காக வேளாண்மை மற்றும் தொடர்புடைய துறைகளில் பொது முதலீட்டை அதிகரிக்க மாநிலங்களை ஊக்குவிக்கிறது." },
    apply: { "en-IN": "Projects are implemented by State Agriculture Departments.", "hi-IN": "परियोजनाएं राज्य कृषि विभागों द्वारा कार्यान्वित की जाती हैं।", "ta-IN": "திட்டங்கள் மாநில வேளாண்மை துறைகளால் செயல்படுத்தப்படுகின்றன." },
    url: "https://rkvy.nic.in",
    helpline: "18001801551"
  },
  {
    id: 9,
    title: { "en-IN": "Sub-Mission on Agricultural Mechanization (SMAM)", "hi-IN": "कृषि यंत्रीकरण पर उप-मिशन (SMAM)", "ta-IN": "வேளாண் இயந்திரமயமாக்கல் துணை பணி (SMAM)" },
    category: "Mechanization",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80",
    benefit: { "en-IN": "40-50% subsidy on farm machinery and equipment", "hi-IN": "कृषि मशीनरी और उपकरणों पर 40-50% सब्सिडी", "ta-IN": "விவசாய இயந்திரங்கள் மற்றும் உபகரணங்களுக்கு 40-50% மானியம்" },
    desc: { "en-IN": "Promotes farm mechanization to increase productivity and reduce drudgery of farm operations.", "hi-IN": "उत्पादकता बढ़ाने और कृषि कार्यों की कठिनाई को कम करने के लिए कृषि यंत्रीकरण को बढ़ावा देता है।", "ta-IN": "உற்பத்தித்திறனை அதிகரிக்கவும் விவசாய செயல்பாடுகளின் கடினத்தை குறைக்கவும் விவசாய இயந்திரமயமாக்கலை ஊக்குவிக்கிறது." },
    apply: { "en-IN": "Apply through State Agriculture Department or Custom Hiring Centers.", "hi-IN": "राज्य कृषि विभाग या कस्टम हायरिंग सेंटर के माध्यम से आवेदन करें।", "ta-IN": "மாநில வேளாண்மை துறை அல்லது தனிப்பயன் வாடகை மையங்கள் மூலம் விண்ணப்பிக்கவும்." },
    url: "https://agrimachinery.nic.in",
    helpline: "18001801551"
  },
  {
    id: 10,
    title: { "en-IN": "National Mission for Sustainable Agriculture (NMSA)", "hi-IN": "सतत कृषि के लिए राष्ट्रीय मिशन (NMSA)", "ta-IN": "நிலையான வேளாண்மைக்கான தேசிய பணி (NMSA)" },
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
    benefit: { "en-IN": "Climate-resilient farming practices and resource conservation", "hi-IN": "जलवायु-लचीली खेती प्रथाओं और संसाधन संरक्षण", "ta-IN": "காலநிலை-நெகிழ்வான விவசாய நடைமுறைகள் மற்றும் வள பாதுகாப்பு" },
    desc: { "en-IN": "Enhances agricultural productivity through climate change adaptation and mitigation strategies.", "hi-IN": "जलवायु परिवर्तन अनुकूलन और शमन रणनीतियों के माध्यम से कृषि उत्पादकता को बढ़ाता है।", "ta-IN": "காலநிலை மாற்ற தழுவல் மற்றும் தணிப்பு உத்திகள் மூலம் வேளாண் உற்பத்தித்திறனை மேம்படுத்துகிறது." },
    apply: { "en-IN": "Implemented through State Agriculture Departments and KVKs.", "hi-IN": "राज्य कृषि विभागों और KVK के माध्यम से कार्यान्वित।", "ta-IN": "மாநில வேளாண்மை துறைகள் மற்றும் KVK கள் மூலம் செயல்படுத்தப்படுகிறது." },
    url: "https://nmsa.dac.gov.in",
    helpline: "18001801551"
  }
];

export default function SchemesPage() {
  const { lang } = useLang();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const t = (key) => TX[key]?.[lang.code] || TX[key]?.["en-IN"] || key;
  const tl = (obj) => obj?.[lang.code] || obj?.["en-IN"] || "";

  const categories = ["All", "Direct Income Support", "Crop Insurance", "Soil & Input Management", "Irrigation & Water", "Credit & Loans", "Market Access", "Organic Farming", "Infrastructure", "Mechanization", "Sustainability"];

  const filtered = SCHEMES.filter(s => {
    const matchesSearch = tl(s.title).toLowerCase().includes(search.toLowerCase()) ||
      tl(s.desc).toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "All" || s.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ background: "#f8faf8", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a7a32, #25a244)", color: "#fff", padding: "60px 24px 80px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(24px, 5vw, 42px)", fontWeight: "900", marginBottom: "12px" }}>{t("title")}</h1>
        <p style={{ fontSize: "17px", opacity: 0.9, maxWidth: "600px", margin: "0 auto" }}>{t("subtitle")}</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "-40px auto 0", padding: "0 20px" }}>
        {/* Search Bar */}
        <div style={{ background: "#fff", borderRadius: "20px", padding: "8px 16px", display: "flex", alignItems: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
          <Search size={22} color="#aaa" />
          <input
            type="text"
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "16px", border: "none", outline: "none", fontSize: "16px", borderRadius: "16px" }}
          />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px", marginBottom: "20px", scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{ padding: "10px 20px", borderRadius: "30px", border: "1.5px solid", borderColor: activeTab === cat ? "#1a7a32" : "#e0e0e0", background: activeTab === cat ? "#1a7a32" : "#fff", color: activeTab === cat ? "#fff" : "#555", fontWeight: "700", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
            >
              {cat === "All" ? t("all") : cat}
            </button>
          ))}
        </div>

        {/* Schemes Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {filtered.map(s => (
            <div key={s.id} style={{ background: "#fff", borderRadius: "20px", border: "1px solid #eee", overflow: "hidden", transition: "all 0.3s", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              {/* Image */}
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img 
                  src={s.image} 
                  alt={tl(s.title)} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <span style={{ background: "rgba(255,255,255,0.95)", color: "#1a7a32", fontSize: "11px", fontWeight: "800", padding: "6px 12px", borderRadius: "20px", textTransform: "uppercase" }}>{s.category}</span>
                </div>
              </div>

              <div
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                style={{ padding: "20px", cursor: "pointer" }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f1f12", marginBottom: "10px", lineHeight: 1.3 }}>{tl(s.title)}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#25a244", fontWeight: "700", fontSize: "14px", marginBottom: "12px" }}>
                  <Info size={16} /> {tl(s.benefit)}
                </div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
                  {expanded === s.id ? <ChevronUp size={24} color="#aaa" /> : <ChevronDown size={24} color="#aaa" />}
                </div>
              </div>

              {expanded === s.id && (
                <div style={{ padding: "0 20px 24px", borderTop: "1px solid #f5f5f5" }}>
                  <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}>{tl(s.desc)}</p>

                    <div style={{ background: "#f9fbf9", borderRadius: "14px", padding: "16px" }}>
                      <h4 style={{ fontSize: "13px", color: "#1a7a32", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <BookOpen size={14} /> {t("howApply")}
                      </h4>
                      <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.5 }}>{tl(s.apply)}</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ background: "#1a7a32", color: "#fff", textDecoration: "none", textAlign: "center", padding: "12px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        {t("visit")} <ExternalLink size={16} />
                      </a>
                      <div style={{ border: "1.5px solid #e8f5e9", color: "#1a7a32", textAlign: "center", padding: "12px", borderRadius: "12px", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <Phone size={14} /> {s.helpline}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: "40px", textAlign: "center", padding: "20px", borderTop: "1px solid #e0e0e0" }}>
          <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.6 }}>{t("disclaimer")}</p>
        </div>
      </div>
    </div>
  );
}
