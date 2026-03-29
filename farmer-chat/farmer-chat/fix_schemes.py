content = open("src/components/SchemesPage.jsx", "r", encoding="utf-8-sig").read()

# Add useLang import and translations at the top
old_import = 'import { useState } from \'react\';'
new_import = '''import { useState } from 'react';
import { useLang } from '../context/LangContext';

const TX = {
  title:    { 'ta-IN': 'அரசு திட்டங்கள் & மானியங்கள்', 'hi-IN': 'सरकारी योजनाएं और सब्सिडी', 'te-IN': 'ప్రభుత్వ పథకాలు & సబ్సిడీలు', 'kn-IN': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು & ಸಹಾಯಧನ', 'ml-IN': 'സർക്കാർ പദ്ധതികൾ & സബ്സിഡി', 'en-IN': 'Government Schemes & Subsidies' },
  subtitle: { 'ta-IN': '10 மத்திய அரசு திட்டங்கள் — மார்ச் 2026', 'hi-IN': '10 केंद्रीय योजनाएं — मार्च 2026', 'te-IN': '10 కేంద్ర ప్రభుత్వ పథకాలు — మార్చి 2026', 'kn-IN': '10 ಕೇಂದ್ರ ಸರ್ಕಾರ ಯೋಜನೆಗಳು — ಮಾರ್ಚ್ 2026', 'ml-IN': '10 കേന്ദ്ര സർക്കാർ പദ്ധതികൾ — മാർച്ച് 2026', 'en-IN': '10 active Central Government schemes — March 2026' },
  search:   { 'ta-IN': 'திட்டங்களை தேடுங்கள்...', 'hi-IN': 'योजनाएं खोजें...', 'te-IN': 'పథకాలు వెతకండి...', 'kn-IN': 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...', 'ml-IN': 'പദ്ധതികൾ തിരയുക...', 'en-IN': 'Search schemes...' },
  all:      { 'ta-IN': 'அனைத்தும்', 'hi-IN': 'सभी', 'te-IN': 'అన్నీ', 'kn-IN': 'ಎಲ್ಲಾ', 'ml-IN': 'എല്ലാം', 'en-IN': 'All' },
  benefits: { 'ta-IN': 'முக்கிய நன்மைகள்', 'hi-IN': 'मुख्य लाभ', 'te-IN': 'ముఖ్య ప్రయోజనాలు', 'kn-IN': 'ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು', 'ml-IN': 'പ്രധാന ആനുകൂല്യങ്ങൾ', 'en-IN': 'Key Benefits' },
  howApply: { 'ta-IN': 'விண்ணப்பிக்கும் முறை', 'hi-IN': 'आवेदन कैसे करें', 'te-IN': 'దరఖాస్తు ఎలా చేయాలి', 'kn-IN': 'ಅರ್ಜಿ ಹೇಗೆ ಸಲ್ಲಿಸುವುದು', 'ml-IN': 'എങ്ങനെ അപേക്ഷിക്കാം', 'en-IN': 'How to Apply' },
  visit:    { 'ta-IN': 'இணையதளம் பார்க்க', 'hi-IN': 'वेबसाइट देखें', 'te-IN': 'వెబ్‌సైట్ చూడండి', 'kn-IN': 'ವೆಬ್‌ಸೈಟ್ ನೋಡಿ', 'ml-IN': 'വെബ്‌സൈറ്റ് കാണുക', 'en-IN': 'Visit' },
  helpline: { 'ta-IN': 'உதவி எண்', 'hi-IN': 'हेल्पलाइन', 'te-IN': 'హెల్ప్‌లైన్', 'kn-IN': 'ಸಹಾಯವಾಣಿ', 'ml-IN': 'ഹെൽപ്‌ലൈൻ', 'en-IN': 'Helpline' },
  govt:     { 'ta-IN': '🇮🇳 இந்திய அரசு · 2026', 'hi-IN': '🇮🇳 भारत सरकार · 2026', 'te-IN': '🇮🇳 భారత ప్రభుత్వం · 2026', 'kn-IN': '🇮🇳 ಭಾರತ ಸರ್ಕಾರ · 2026', 'ml-IN': '🇮🇳 ഇന്ത്യൻ സർക്കാർ · 2026', 'en-IN': '🇮🇳 Government of India · 2026' },
  disclaimer: { 'ta-IN': '⚠️ அனைத்து தகவல்களும் மார்ச் 2026 நிலவரப்படி சரிபார்க்கப்பட்டவை. விவசாயிகளுக்கு ஆலோசனை வழங்குவதற்கு முன் அதிகாரப்பூர்வ அரசு இணையதளங்களில் சரிபார்க்கவும்.', 'hi-IN': '⚠️ सभी जानकारी मार्च 2026 तक सत्यापित है। किसानों को सलाह देने से पहले आधिकारिक सरकारी वेबसाइटों पर जांच करें।', 'te-IN': '⚠️ అన్ని సమాచారం మార్చి 2026 వరకు ధృవీకరించబడింది. రైతులకు సలహా ఇవ్వడానికి ముందు అధికారిక ప్రభుత్వ వెబ్‌సైట్‌లలో తనిఖీ చేయండి.', 'kn-IN': '⚠️ ಎಲ್ಲಾ ಮಾಹಿತಿಯು ಮಾರ್ಚ್ 2026 ರವರೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ರೈತರಿಗೆ ಸಲಹೆ ನೀಡುವ ಮೊದಲು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.', 'ml-IN': '⚠️ എല്ലാ വിവരങ്ങളും മാർച്ച് 2026 വരെ പരിശോധിച്ചിട്ടുണ്ട്. ഔദ്യോഗിക സർക്കാർ വെബ്‌സൈറ്റുകളിൽ പരിശോധിക്കുക.', 'en-IN': '⚠️ All links and information are verified as of March 2026. Always cross-verify on official government websites before advising farmers.' },
};

const CATS = {
  'Direct Income Support':          { 'ta-IN': 'நேரடி வருமான ஆதரவு', 'hi-IN': 'प्रत्यक्ष आय सहायता', 'te-IN': 'ప్రత్యక్ష ఆదాయ మద్దతు', 'kn-IN': 'ನೇರ ಆದಾಯ ಬೆಂಬಲ', 'ml-IN': 'നേരിട്ടുള്ള വരുമാന പിന്തുണ', 'en-IN': 'Direct Income Support' },
  'Crop Insurance':                  { 'ta-IN': 'பயிர் காப்பீடு', 'hi-IN': 'फसल बीमा', 'te-IN': 'పంట బీమా', 'kn-IN': 'ಬೆಳೆ ವಿಮೆ', 'ml-IN': 'വിള ഇൻഷുറൻസ്', 'en-IN': 'Crop Insurance' },
  'Agricultural Credit':             { 'ta-IN': 'விவசாய கடன்', 'hi-IN': 'कृषि ऋण', 'te-IN': 'వ్యవసాయ రుణం', 'kn-IN': 'ಕೃಷಿ ಸಾಲ', 'ml-IN': 'കാർഷിക വായ്പ', 'en-IN': 'Agricultural Credit' },
  'Soil & Input Management':         { 'ta-IN': 'மண் மேலாண்மை', 'hi-IN': 'मृदा प्रबंधन', 'te-IN': 'నేల నిర్వహణ', 'kn-IN': 'ಮಣ್ಣು ನಿರ್ವಹಣೆ', 'ml-IN': 'മണ്ണ് മാനേജ്മെന്റ്', 'en-IN': 'Soil & Input Management' },
  'Irrigation & Water Management':   { 'ta-IN': 'நீர்ப்பாசனம்', 'hi-IN': 'सिंचाई प्रबंधन', 'te-IN': 'నీటిపారుదల', 'kn-IN': 'ನೀರಾವರಿ', 'ml-IN': 'ജലസേചനം', 'en-IN': 'Irrigation & Water Management' },
  'Organic Farming':                 { 'ta-IN': 'இயற்கை விவசாயம்', 'hi-IN': 'जैविक खेती', 'te-IN': 'సేంద్రీయ వ్యవసాయం', 'kn-IN': 'ಸಾವಯವ ಕೃಷಿ', 'ml-IN': 'ജൈവ കൃഷി', 'en-IN': 'Organic Farming' },
  'Market Linkage':                  { 'ta-IN': 'சந்தை இணைப்பு', 'hi-IN': 'बाज़ार संपर्क', 'te-IN': 'మార్కెట్ అనుసంధానం', 'kn-IN': 'ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ', 'ml-IN': 'മാർക്കറ്റ് ലിങ്കേജ്', 'en-IN': 'Market Linkage' },
  'Farm Equipment Subsidy':          { 'ta-IN': 'விவசாய இயந்திர மானியம்', 'hi-IN': 'कृषि उपकरण सब्सिडी', 'te-IN': 'వ్యవసాయ పరికరాల సబ్సిడీ', 'kn-IN': 'ಕೃಷಿ ಯಂತ್ರ ಸಹಾಯಧನ', 'ml-IN': 'കാർഷിക ഉപകരണ സബ്സിഡി', 'en-IN': 'Farm Equipment Subsidy' },
  'Post-Harvest Infrastructure':     { 'ta-IN': 'அறுவடை பின் உள்கட்டமைப்பு', 'hi-IN': 'कटाई के बाद का बुनियादी ढांचा', 'te-IN': 'పంట తర్వాత మౌలిక సదుపాయాలు', 'kn-IN': 'ಕೊಯ್ಲಿನ ನಂತರದ ಮೂಲಸೌಕರ್ಯ', 'ml-IN': 'വിളവെടുപ്പ് ശേഷമുള്ള അടിസ്ഥാന സൗകര്യം', 'en-IN': 'Post-Harvest Infrastructure' },
  'Scheme Discovery Tool':           { 'ta-IN': 'திட்ட கண்டுபிடிப்பு கருவி', 'hi-IN': 'योजना खोज उपकरण', 'te-IN': 'పథకం ఆవిష్కరణ సాధనం', 'kn-IN': 'ಯೋಜನೆ ಅನ್ವೇಷಣೆ ಸಾಧನ', 'ml-IN': 'പദ്ധതി കണ്ടെത്തൽ ഉപകരണം', 'en-IN': 'Scheme Discovery Tool' },
};

function tx(lang, key) { return TX[key]?.[lang.code] || TX[key]?.["en-IN"] || key; }
function tcat(lang, key) { return CATS[key]?.[lang.code] || CATS[key]?.["en-IN"] || key; }'''

content = content.replace(old_import, new_import, 1)

# Add useLang hook inside component
old_hook = 'export default function SchemesPage() {\n  const [search, setSearch] = useState(\'\');'
new_hook = '''export default function SchemesPage() {
  const { lang } = useLang();
  const [search, setSearch] = useState('');'''
content = content.replace(old_hook, new_hook, 1)

# Replace hardcoded header text
content = content.replace(
    "'🇮🇳 Government of India · 2026'",
    "{tx(lang, 'govt')}"
)
content = content.replace(
    '"Government Schemes & Subsidies"',
    "{tx(lang, 'title')}"
)
content = content.replace(
    '"10 active Central Government schemes for Indian farmers — March 2026"',
    "{tx(lang, 'subtitle')}"
)
content = content.replace(
    '"Search schemes..."',
    "{tx(lang, 'search')}"
)

# Replace filter All
content = content.replace("filter === 'All' || s.category === filter", "filter === 'All' || s.category === filter")

# Replace category filter chips text
content = content.replace(
    "{c}",
    "{c === 'All' ? tx(lang, 'all') : tcat(lang, c)}"
)

# Replace category badge in card
content = content.replace(
    "{s.category}",
    "{tcat(lang, s.category)}"
)

# Replace Key Benefits label
content = content.replace(
    "'Key Benefits'",
    "tx(lang, 'benefits')"
)

# Replace How to Apply label
content = content.replace(
    "'How to Apply'",
    "tx(lang, 'howApply')"
)

# Replace Visit label
content = content.replace(
    "'Visit ' + s.portal",
    "tx(lang, 'visit') + ' ' + s.portal"
)
content = content.replace(
    "`Visit ${s.portal}`",
    "`${tx(lang, 'visit')} ${s.portal}`"
)
content = content.replace(
    "Visit {s.portal}",
    "{tx(lang, 'visit')} {s.portal}"
)

# Replace helpline label
content = content.replace(
    "<Phone size={14} /> {s.helpline}",
    "<Phone size={14} /> {tx(lang, 'helpline')}: {s.helpline}"
)

# Replace disclaimer
content = content.replace(
    "⚠️ All links and information are verified as of March 2026. Government portals and scheme details may change. Always cross-verify on official government websites before advising farmers.",
    "{tx(lang, 'disclaimer')}"
)

open("src/components/SchemesPage.jsx", "w", encoding="utf-8").write(content)
print("SUCCESS")
