import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Search, Phone } from "lucide-react";
import { useLang } from "../context/LangContext";

const TX = {
  title:      { "ta-IN": "அரசு திட்டங்கள்", "hi-IN": "सरकारी योजनाएं", "te-IN": "ప్రభుత్వ పథకాలు", "kn-IN": "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", "ml-IN": "സർക്കാർ പദ്ധതികൾ", "en-IN": "Government Schemes & Subsidies" },
  subtitle:   { "ta-IN": "10 மத்திய அரசு திட்டங்கள் — மார்ச் 2026", "hi-IN": "10 केंद्रीय योजनाएं — मार्च 2026", "te-IN": "10 కేంద్ర పథకాలు — మార్చి 2026", "kn-IN": "10 ಕೇಂದ್ರ ಯೋಜನೆಗಳು — ಮಾರ್ಚ್ 2026", "ml-IN": "10 കേന്ദ്ര പദ്ധതികൾ — മാർച്ച് 2026", "en-IN": "10 active Central Government schemes for Indian farmers — March 2026" },
  search:     { "ta-IN": "திட்டங்களை தேடுங்கள்...", "hi-IN": "योजनाएं खोजें...", "te-IN": "పథకాలు వెతకండి...", "kn-IN": "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...", "ml-IN": "പദ്ധതികൾ തിരയുക...", "en-IN": "Search schemes..." },
  all:        { "ta-IN": "அனைத்தும்", "hi-IN": "सभी", "te-IN": "అన్నీ", "kn-IN": "ಎಲ್ಲಾ", "ml-IN": "എല്ലാം", "en-IN": "All" },
  benefits:   { "ta-IN": "முக்கிய நன்மைகள்", "hi-IN": "मुख्य लाभ", "te-IN": "ముఖ్య ప్రయోజనాలు", "kn-IN": "ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು", "ml-IN": "പ്രധാന ആനുകൂല്യങ്ങൾ", "en-IN": "Key Benefits" },
  howApply:   { "ta-IN": "விண்ணப்பிக்கும் முறை", "hi-IN": "आवेदन कैसे करें", "te-IN": "దరఖాస్తు ఎలా చేయాలి", "kn-IN": "ಅರ್ಜಿ ಹೇಗೆ ಸಲ್ಲಿಸುವುದು", "ml-IN": "എങ്ങനെ അപേക്ഷിക്കാം", "en-IN": "How to Apply" },
  visit:      { "ta-IN": "இணையதளம் பார்க்க", "hi-IN": "वेबसाइट देखें", "te-IN": "వెబ్‌సైట్ చూడండి", "kn-IN": "ವೆಬ್‌ಸೈಟ್ ನೋಡಿ", "ml-IN": "വെബ്‌സൈറ്റ് കാണുക", "en-IN": "Visit" },
  helpline:   { "ta-IN": "உதவி எண்", "hi-IN": "हेल्पलाइन", "te-IN": "హెల్ప్‌లైన్", "kn-IN": "ಸಹಾಯವಾಣಿ", "ml-IN": "ഹെൽപ്‌ലൈൻ", "en-IN": "Helpline" },
  disclaimer: { "ta-IN": "அனைத்து தகவல்களும் மார்ச் 2026 நிலவரப்படி சரிபார்க்கப்பட்டவை. விவசாயிகளுக்கு ஆலோசனை வழங்குவதற்கு முன் அதிகாரப்பூர்வ அரசு இணையதளங்களில் சரிபார்க்கவும்.", "hi-IN": "सभी जानकारी मार्च 2026 तक सत्यापित है। किसानों को सलाह देने से पहले आधिकारिक सरकारी वेबसाइटों पर जांच करें।", "te-IN": "అన్ని సమాచారం మార్చి 2026 వరకు ధృవీకరించబడింది. రైతులకు సలహా ఇవ్వడానికి ముందు అధికారిక వెబ్‌సైట్‌లలో తనిఖీ చేయండి.", "kn-IN": "ಎಲ್ಲಾ ಮಾಹಿತಿಯು ಮಾರ್ಚ್ 2026 ರವರೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಅಧಿಕೃತ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.", "ml-IN": "എല്ലാ വിവരങ്ങളും മാർച്ച് 2026 വരെ പരിശോധിച്ചിട്ടുണ്ട്. ഔദ്യോഗിക സർക്കാർ വെബ്‌സൈറ്റുകളിൽ പരിശോധിക്കുക.", "en-IN": "All links and information are verified as of March 2026. Always cross-verify on official government websites before advising farmers." },
};

const CATS = {
  "Direct Income Support":          { "ta-IN": "நேரடி வருமான ஆதரவு", "hi-IN": "प्रत्यक्ष आय सहायता", "te-IN": "ప్రత్యక్ష ఆదాయ మద్దతు", "kn-IN": "ನೇರ ಆದಾಯ ಬೆಂಬಲ", "ml-IN": "നേരിട്ടുള്ള വരുമാന പിന്തുണ", "en-IN": "Direct Income Support" },
  "Crop Insurance":                  { "ta-IN": "பயிர் காப்பீடு", "hi-IN": "फसल बीमा", "te-IN": "పంట బీమా", "kn-IN": "ಬೆಳೆ ವಿಮೆ", "ml-IN": "വിള ഇൻഷുറൻസ്", "en-IN": "Crop Insurance" },
  "Agricultural Credit":             { "ta-IN": "விவசாய கடன்", "hi-IN": "कृषि ऋण", "te-IN": "వ్యవసాయ రుణం", "kn-IN": "ಕೃಷಿ ಸಾಲ", "ml-IN": "കാർഷിക വായ്പ", "en-IN": "Agricultural Credit" },
  "Soil & Input Management":         { "ta-IN": "மண் மேலாண்மை", "hi-IN": "मृदा प्रबंधन", "te-IN": "నేల నిర్వహణ", "kn-IN": "ಮಣ್ಣು ನಿರ್ವಹಣೆ", "ml-IN": "മണ്ണ് മാനേജ്മെന്റ്", "en-IN": "Soil & Input Management" },
  "Irrigation & Water Management":   { "ta-IN": "நீர்ப்பாசனம்", "hi-IN": "सिंचाई प्रबंधन", "te-IN": "నీటిపారుదల", "kn-IN": "ನೀರಾವರಿ", "ml-IN": "ജലസേചനം", "en-IN": "Irrigation & Water Management" },
  "Organic Farming":                 { "ta-IN": "இயற்கை விவசாயம்", "hi-IN": "जैविक खेती", "te-IN": "సేంద్రీయ వ్యవసాయం", "kn-IN": "ಸಾವಯವ ಕೃಷಿ", "ml-IN": "ജൈവ കൃഷി", "en-IN": "Organic Farming" },
  "Market Linkage":                  { "ta-IN": "சந்தை இணைப்பு", "hi-IN": "बाज़ार संपर्क", "te-IN": "మార్కెట్ అనుసంధానం", "kn-IN": "ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ", "ml-IN": "മാർക്കറ്റ് ലിങ്കേജ്", "en-IN": "Market Linkage" },
  "Farm Equipment Subsidy":          { "ta-IN": "விவசாய இயந்திர மானியம்", "hi-IN": "कृषि उपकरण सब्सिडी", "te-IN": "వ్యవసాయ పరికరాల సబ్సిడీ", "kn-IN": "ಕೃಷಿ ಯಂತ್ರ ಸಹಾಯಧನ", "ml-IN": "കാർഷിക ഉപകരണ സബ്സിഡി", "en-IN": "Farm Equipment Subsidy" },
  "Post-Harvest Infrastructure":     { "ta-IN": "அறுவடை பின் உள்கட்டமைப்பு", "hi-IN": "कटाई के बाद का बुनियादी ढांचा", "te-IN": "పంట తర్వాత మౌలిక సదుపాయాలు", "kn-IN": "ಕೊಯ್ಲಿನ ನಂತರದ ಮೂಲಸೌಕರ್ಯ", "ml-IN": "വിളവെടുപ്പ് ശേഷമുള്ള അടിസ്ഥാന സൗകര്യം", "en-IN": "Post-Harvest Infrastructure" },
  "Scheme Discovery Tool":           { "ta-IN": "திட்ட கண்டுபிடிப்பு கருவி", "hi-IN": "योजना खोज उपकरण", "te-IN": "పథకం ఆవిష్కరణ సాధనం", "kn-IN": "ಯೋಜನೆ ಅನ್ವೇಷಣೆ ಸಾಧನ", "ml-IN": "പദ്ധതി കണ്ടെത്തൽ ഉപകരണം", "en-IN": "Scheme Discovery Tool" },
};

function tx(lang, key) { return TX[key]?.[lang.code] || TX[key]?.["en-IN"] || key; }
function tcat(lang, key) { return CATS[key]?.[lang.code] || CATS[key]?.["en-IN"] || key; }