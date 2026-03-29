import re

content = open('src/components/HomePage.jsx', 'r', encoding='utf-8-sig').read()

new_features = """  const FEAT = {
    'en-IN': [
      { img: IMG.farmer1, icon: "💬", title: "AI Farming Chat", desc: "Ask crop, pest, soil questions in your language.", path: "/chat", color: "#1a7a32", bg: "#e8f5e9" },
      { img: IMG.weather, icon: "🌤️", title: "Live Weather", desc: "GPS-based weather with 5-day forecast and farming alerts.", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },
      { img: IMG.soil, icon: "💡", title: "Expert Tips", desc: "Curated farming tips on crops, pest control and irrigation.", path: "/tips", color: "#b45309", bg: "#fef3c7" },
      { img: IMG.market, icon: "📈", title: "Market Prices", desc: "Daily mandi rates for rice, wheat, vegetables across India.", path: "/market", color: "#7c3aed", bg: "#ede9fe" },
    ],
    'ta-IN': [
      { img: IMG.farmer1, icon: "💬", title: "AI விவசாய அரட்டை", desc: "உங்கள் மொழியில் பயிர், பூச்சி, மண் கேள்விகள் கேளுங்கள்.", path: "/chat", color: "#1a7a32", bg: "#e8f5e9" },
      { img: IMG.weather, icon: "🌤️", title: "நேரடி வானிலை", desc: "GPS அடிப்படையிலான வானிலை மற்றும் 5 நாள் முன்னறிவிப்பு.", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },
      { img: IMG.soil, icon: "💡", title: "நிபுணர் குறிப்புகள்", desc: "பயிர், பூச்சி கட்டுப்பாடு, நீர்ப்பாசன குறிப்புகள்.", path: "/tips", color: "#b45309", bg: "#fef3c7" },
      { img: IMG.market, icon: "📈", title: "சந்தை விலை", desc: "அரிசி, கோதுமை, காய்கறிகளின் தினசரி மண்டி விலைகள்.", path: "/market", color: "#7c3aed", bg: "#ede9fe" },
    ],
    'hi-IN': [
      { img: IMG.farmer1, icon: "💬", title: "AI खेती चैट", desc: "अपनी भाषा में फसल, कीट, मिट्टी के सवाल पूछें।", path: "/chat", color: "#1a7a32", bg: "#e8f5e9" },
      { img: IMG.weather, icon: "🌤️", title: "लाइव मौसम", desc: "GPS आधारित मौसम और 5 दिन का पूर्वानुमान।", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },
      { img: IMG.soil, icon: "💡", title: "विशेषज्ञ सुझाव", desc: "फसल, कीट नियंत्रण, सिंचाई पर उपयोगी सुझाव।", path: "/tips", color: "#b45309", bg: "#fef3c7" },
      { img: IMG.market, icon: "📈", title: "बाज़ार भाव", desc: "चावल, गेहूं, सब्जियों के दैनिक मंडी भाव।", path: "/market", color: "#7c3aed", bg: "#ede9fe" },
    ],
    'te-IN': [
      { img: IMG.farmer1, icon: "💬", title: "AI వ్యవసాయ చాట్", desc: "మీ భాషలో పంట, పురుగు, నేల ప్రశ్నలు అడగండి.", path: "/chat", color: "#1a7a32", bg: "#e8f5e9" },
      { img: IMG.weather, icon: "🌤️", title: "లైవ్ వాతావరణం", desc: "GPS ఆధారిత వాతావరణం మరియు 5 రోజుల అంచనా.", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },
      { img: IMG.soil, icon: "💡", title: "నిపుణుల చిట్కాలు", desc: "పంట, కీట నియంత్రణ, నీటిపారుదల చిట్కాలు.", path: "/tips", color: "#b45309", bg: "#fef3c7" },
      { img: IMG.market, icon: "📈", title: "మార్కెట్ ధరలు", desc: "వరి, గోధుమ, కూరగాయల రోజువారీ మండి ధరలు.", path: "/market", color: "#7c3aed", bg: "#ede9fe" },
    ],
    'kn-IN': [
      { img: IMG.farmer1, icon: "💬", title: "AI ಕೃಷಿ ಚಾಟ್", desc: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಬೆಳೆ, ಕೀಟ, ಮಣ್ಣು ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.", path: "/chat", color: "#1a7a32", bg: "#e8f5e9" },
      { img: IMG.weather, icon: "🌤️", title: "ನೇರ ಹವಾಮಾನ", desc: "GPS ಆಧಾರಿತ ಹವಾಮಾನ ಮತ್ತು 5 ದಿನಗಳ ಮುನ್ಸೂಚನೆ.", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },
      { img: IMG.soil, icon: "💡", title: "ತಜ್ಞರ ಸಲಹೆ", desc: "ಬೆಳೆ, ಕೀಟ ನಿಯಂತ್ರಣ, ನೀರಾವರಿ ಸಲಹೆಗಳು.", path: "/tips", color: "#b45309", bg: "#fef3c7" },
      { img: IMG.market, icon: "📈", title: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ", desc: "ಅಕ್ಕಿ, ಗೋಧಿ, ತರಕಾರಿಗಳ ದೈನಂದಿನ ಮಂಡಿ ಬೆಲೆಗಳು.", path: "/market", color: "#7c3aed", bg: "#ede9fe" },
    ],
    'ml-IN': [
      { img: IMG.farmer1, icon: "💬", title: "AI കൃഷി ചാറ്റ്", desc: "നിങ്ങളുടെ ഭാഷയിൽ വിള, കീട, മണ്ണ് ചോദ്യങ്ങൾ ചോദിക്കൂ.", path: "/chat", color: "#1a7a32", bg: "#e8f5e9" },
      { img: IMG.weather, icon: "🌤️", title: "തത്സമയ കാലാവസ്ഥ", desc: "GPS അടിസ്ഥാനത്തിലുള്ള കാലാവസ്ഥയും 5 ദിവസ പ്രവചനവും.", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },
      { img: IMG.soil, icon: "💡", title: "വിദഗ്ധ നുറുങ്ങുകൾ", desc: "വിള, കീട നിയന്ത്രണം, ജലസേചന നുറുങ്ങുകൾ.", path: "/tips", color: "#b45309", bg: "#fef3c7" },
      { img: IMG.market, icon: "📈", title: "വിപണി വില", desc: "അരി, ഗോതമ്പ്, പച്ചക്കറികളുടെ ദൈനംദിന മണ്ടി വിലകൾ.", path: "/market", color: "#7c3aed", bg: "#ede9fe" },
    ],
  };
  const features = FEAT[lang.code] || FEAT['en-IN'];"""

pattern = r'const features = \[.*?\];'
match = re.search(pattern, content, re.DOTALL)
if match:
    content = content[:match.start()] + new_features + content[match.end():]
    open('src/components/HomePage.jsx', 'w', encoding='utf-8').write(content)
    print('SUCCESS: features block replaced')
else:
    print('ERROR: features block not found')
