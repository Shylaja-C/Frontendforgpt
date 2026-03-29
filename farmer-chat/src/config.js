export const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
export const WEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';
export const SARVAM_API_KEY = 'YOUR_SARVAM_API_KEY';
export const FCM_VAPID_KEY = 'YOUR_FCM_VAPID_KEY';

export const LANGUAGES = [
  { code: 'ta-IN', label: 'தமிழ்',   flag: '🇮🇳', sarvam: 'ta-IN', name: 'Tamil' },
  { code: 'hi-IN', label: 'हिंदी',    flag: '🇮🇳', sarvam: 'hi-IN', name: 'Hindi' },
  { code: 'te-IN', label: 'తెలుగు',  flag: '🇮🇳', sarvam: 'te-IN', name: 'Telugu' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ',   flag: '🇮🇳', sarvam: 'kn-IN', name: 'Kannada' },
  { code: 'ml-IN', label: 'മലയാളം', flag: '🇮🇳', sarvam: 'ml-IN', name: 'Malayalam' },
  { code: 'en-IN', label: 'English',  flag: '🇬🇧', sarvam: 'en-IN', name: 'English' },
];

export const SYSTEM_PROMPT = `You are FarmBot, an AI advisory assistant for Indian farmers. You simulate a WhatsApp-style conversational interface to provide quick, practical agricultural guidance.

BEHAVIOR:
- Answer farming questions conversationally, like a knowledgeable friend
- Keep responses short, clear, and easy to understand for low-literacy users
- Use emojis to make responses friendly and visual
- When a problem is described (e.g. yellow leaves, drying crops, pest signs), always provide:
  1. 🔍 Likely Cause
  2. ⚠️ Urgency Level (Low / Medium / High)
  3. ✅ Recommended Action (step-by-step, simple)
  4. 💡 Prevention Tip

FOCUS AREAS:
- Crop health diagnosis (symptoms → cause → treatment)
- Pest and disease identification and control
- Irrigation scheduling and water management
- Fertilizer dosage and timing
- Weather-based farming advice
- Soil health and preparation
- Market timing and crop selection

LANGUAGE RULE:
Reply strictly in the same language the farmer writes in.
Tamil → Tamil, Hindi → Hindi, Telugu → Telugu, Kannada → Kannada, Malayalam → Malayalam, English → English.

TONE: Simple, warm, practical. Never use complex technical jargon. Imagine you are talking to a farmer in a village.`;

export const T = {
  'ta-IN': {
    welcome: 'வணக்கம்! நான் FarmBot 🌾',
    subtitle: 'உங்கள் AI விவசாய உதவியாளர்',
    startChat: 'பேசுங்கள்',
    weather: 'வானிலை',
    tips: 'குறிப்புகள்',
    market: 'சந்தை விலை',
    home: 'முகப்பு',
    cropHelp: 'பயிர் உதவி',
    pestControl: 'பூச்சி கட்டுப்பாடு',
    irrigation: 'நீர்ப்பாசனம்',
    fertilizer: 'உரம்',
    chooseLanguage: 'மொழியை தேர்ந்தெடுக்கவும்',
    chatPlaceholder: 'கேள்வி கேளுங்கள்...',
    chatWelcome: '👋 வணக்கம்! நான் FarmBot. விவசாயம், பயிர்கள், வானிலை பற்றி கேளுங்கள்!',
    online: 'ஆன்லைன் · உடனே பதில் தருவேன்',
    clearChat: 'அரட்டையை அழிக்கவும்',
    quickTopics: 'விரைவு தலைப்புகள்',
    language: 'மொழி',
    schemes: 'திட்டங்கள்',
  },
  'hi-IN': {
    welcome: 'नमस्ते! मैं FarmBot हूँ 🌾',
    subtitle: 'आपका AI कृषि सहायक',
    startChat: 'बात करें',
    weather: 'मौसम',
    tips: 'सुझाव',
    market: 'बाज़ार भाव',
    home: 'होम',
    cropHelp: 'फसल सहायता',
    pestControl: 'कीट नियंत्रण',
    irrigation: 'सिंचाई',
    fertilizer: 'खाद',
    chooseLanguage: 'भाषा चुनें',
    chatPlaceholder: 'सवाल पूछें...',
    chatWelcome: '👋 नमस्ते! मैं FarmBot हूँ। खेती, फसल, मौसम के बारे में पूछें!',
    online: 'ऑनलाइन · तुरंत जवाब देता हूँ',
    clearChat: 'चैट साफ़ करें',
    quickTopics: 'त्वरित विषय',
    language: 'भाषा',
    schemes: 'सरकारी योजनाएं',
  },
  'te-IN': {
    welcome: 'నమస్కారం! నేను FarmBot 🌾',
    subtitle: 'మీ AI వ్యవసాయ సహాయకుడు',
    startChat: 'చాట్ చేయండి',
    weather: 'వాతావరణం',
    tips: 'చిట్కాలు',
    market: 'మార్కెట్ ధరలు',
    home: 'హోమ్',
    cropHelp: 'పంట సహాయం',
    pestControl: 'పురుగుల నియంత్రణ',
    irrigation: 'నీటిపారుదల',
    fertilizer: 'ఎరువు',
    chooseLanguage: 'భాష ఎంచుకోండి',
    chatPlaceholder: 'ప్రశ్న అడగండి...',
    chatWelcome: '👋 నమస్కారం! నేను FarmBot. వ్యవసాయం, పంటలు, వాతావరణం గురించి అడగండి!',
    online: 'ఆన్‌లైన్ · వెంటనే సమాధానం',
    clearChat: 'చాట్ క్లియర్ చేయండి',
    quickTopics: 'త్వరిత అంశాలు',
    language: 'భాష',
    schemes: 'ప్రభుత్వ పథకాలు',
  },
  'kn-IN': {
    welcome: 'ನಮಸ್ಕಾರ! ನಾನು FarmBot 🌾',
    subtitle: 'ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ',
    startChat: 'ಚಾಟ್ ಮಾಡಿ',
    weather: 'ಹವಾಮಾನ',
    tips: 'ಸಲಹೆಗಳು',
    market: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
    home: 'ಮನೆ',
    cropHelp: 'ಬೆಳೆ ಸಹಾಯ',
    pestControl: 'ಕೀಟ ನಿಯಂತ್ರಣ',
    irrigation: 'ನೀರಾವರಿ',
    fertilizer: 'ಗೊಬ್ಬರ',
    chooseLanguage: 'ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ',
    chatPlaceholder: 'ಪ್ರಶ್ನೆ ಕೇಳಿ...',
    chatWelcome: '👋 ನಮಸ್ಕಾರ! ನಾನು FarmBot. ಕೃಷಿ, ಬೆಳೆ, ಹವಾಮಾನ ಬಗ್ಗೆ ಕೇಳಿ!',
    online: 'ಆನ್‌ಲೈನ್ · ತಕ್ಷಣ ಉತ್ತರ',
    clearChat: 'ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ',
    quickTopics: 'ತ್ವರಿತ ವಿಷಯಗಳು',
    language: 'ಭಾಷೆ',
    schemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
  },
  'ml-IN': {
    welcome: 'നമസ്കാരം! ഞാൻ FarmBot ആണ് 🌾',
    subtitle: 'നിങ്ങളുടെ AI കൃഷി സഹായി',
    startChat: 'ചാറ്റ് ചെയ്യൂ',
    weather: 'കാലാവസ്ഥ',
    tips: 'നുറുങ്ങുകൾ',
    market: 'വിപണി വില',
    home: 'ഹോം',
    cropHelp: 'വിള സഹായം',
    pestControl: 'കീട നിയന്ത്രണം',
    irrigation: 'ജലസേചനം',
    fertilizer: 'വളം',
    chooseLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    chatPlaceholder: 'ചോദ്യം ചോദിക്കൂ...',
    chatWelcome: '👋 നമസ്കാരം! ഞാൻ FarmBot. കൃഷി, വിളകൾ, കാലാവസ്ഥ എന്നിവ ചോദിക്കൂ!',
    online: 'ഓൺലൈൻ · ഉടൻ മറുപടി',
    clearChat: 'ചാറ്റ് മായ്ക്കുക',
    quickTopics: 'ദ്രുത വിഷയങ്ങൾ',
    language: 'ഭാഷ',
    schemes: 'സർക്കാർ പദ്ധതികൾ',
  },
  'en-IN': {
    welcome: 'Hello! I am FarmBot 🌾',
    subtitle: 'Your AI farming assistant',
    startChat: 'Start Chat',
    weather: 'Weather',
    tips: 'Tips',
    market: 'Market',
    home: 'Home',
    cropHelp: 'Crop Help',
    pestControl: 'Pest Control',
    irrigation: 'Irrigation',
    fertilizer: 'Fertilizer',
    chooseLanguage: 'Choose Language',
    chatPlaceholder: 'Ask a question...',
    chatWelcome: '👋 Hello! I am FarmBot. Ask me anything about farming, crops, or weather!',
    online: 'Online · Replies instantly',
    clearChat: 'Clear Chat',
    quickTopics: 'Quick Topics',
    language: 'Language',
    schemes: 'Gov Schemes',
  },
};

export function t(lang, key) {
  return T[lang.code]?.[key] || T['en-IN'][key] || key;
}
