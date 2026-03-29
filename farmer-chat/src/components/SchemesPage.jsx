import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Search, Phone, BookOpen, Clock, Info } from "lucide-react";
import { useLang } from "../context/LangContext";

const TX = {
  title: { "ta-IN": "அரசு திட்டங்கள்", "hi-IN": "सरकारी योजनाएं", "te-IN": "ప్రభుత్వ పథకాలు", "kn-IN": "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", "ml-IN": "സർക്കാർ പദ്ധതികൾ", "en-IN": "Government Schemes & Subsidies" },
  subtitle: { "ta-IN": "10 மத்திய அரசு திட்டங்கள் — மார்ச் 2026", "hi-IN": "10 केंद्रीय योजनाएं — मार्च 2026", "te-IN": "10 కేంద్ర పథకాలు — మార్చి 2026", "kn-IN": "10 ಕೇಂದ್ರ ಯೋಜನೆಗಳು — మార్చి 2026", "ml-IN": "10 കേന്ദ്ര പദ്ധതികൾ — മാർച്ച് 2026", "en-IN": "10 active Central Government schemes for Indian farmers — March 2026" },
  search: { "ta-IN": "திட்டங்களை தேடுங்கள்...", "hi-IN": "योजनाएं खोजें...", "te-IN": "పథకాలు వెతకండి...", "kn-IN": "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...", "ml-IN": "പദ്ധതികൾ തിരയുക...", "en-IN": "Search schemes..." },
  all: { "ta-IN": "அனைத்தும்", "hi-IN": "सभी", "te-IN": "అన్నీ", "kn-IN": "ಎಲ್ಲಾ", "ml-IN": "എല്ലാം", "en-IN": "All" },
  benefits: { "ta-IN": "முக்கிய நன்மைகள்", "hi-IN": "मुख्य लाभ", "te-IN": "ముఖ్య ప్రయోజనాలు", "kn-IN": "ప్రముఖ ಪ್ರಯೋಜನಗಳು", "ml-IN": "പ്രധാന ആനുകൂല్యങ്ങൾ", "en-IN": "Key Benefits" },
  howApply: { "ta-IN": "விண்ணப்பிக்கும் முறை", "hi-IN": "आवेदन कैसे करें", "te-IN": "దరఖాస్తు ఎలా చేయాలి", "kn-IN": "అర్జీ ಹೇಗೆ ಸಲ್ಲಿಸುವುದು", "ml-IN": "എങ്ങനെ അപേക്ഷിക്കാം", "en-IN": "How to Apply" },
  visit: { "ta-IN": "இணையதளம் பார்க்க", "hi-IN": "वेबसाइट देखें", "te-IN": "వెబ్‌సైట్ చూడండి", "kn-IN": "ವೆಬ್‌ಸೈಟ್ ನೋಡಿ", "ml-IN": "വെബ്‌സൈറ്റ് കാണുക", "en-IN": "Visit" },
  helpline: { "ta-IN": "உதவி எண்", "hi-IN": "हेल्पलाइन", "te-IN": "హెల్ప్‌లైన్", "kn-IN": "ಸహాయవాణి", "ml-IN": "ഹെൽപ്‌ലൈൻ", "en-IN": "Helpline" },
  disclaimer: { "ta-IN": "அனைத்து தகவல்களும் மார்ச் 2026 நிலவரப்படி சரிபார்க்கப்பட்டவை.", "hi-IN": "सभी जानकारी मार्च 2026 तक सत्यापित है।", "te-IN": "అన్ని సమాచారం మార్చి 2026 వరకు ధృవీకరించబడింది.", "kn-IN": "ಎಲ್ಲಾ ಮಾಹಿತಿಯು ಮಾರ್ಚ್ 2026 ರವರೆಗೆ ಪರಿಶీలಿಸಲಾಗಿದೆ.", "ml-IN": "എല്ലാ വിവരങ്ങളും മാർച്ച് 2026 വരെ പരിശോധിച്ചിട്ടുണ്ട്.", "en-IN": "Verified as of March 2026." },
};

const SCHEMES = [
  {
    id: 1,
    title: { "en-IN": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)", "hi-IN": "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)", "ta-IN": "பி.எம்-கிசான் (பிரதமர் கிசான் சம்மான் நிதி)" },
    category: "Direct Income Support",
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
    benefit: { "en-IN": "Free soil testing and customized fertilizer recommendations.", "hi-IN": "मुफ्त मिट्टी परीक्षण और अनुकूलित उर्वरक सिफारिशें।", "ta-IN": "இலவச மண் பரிசோதனை மற்றும் உரம் பரிந்துரைகள்." },
    desc: { "en-IN": "Helps farmers understand soil nutrient status and recommended dosage of fertilizers.", "hi-IN": "किसानों को मिट्टी के पोषक तत्वों की स्थिति और उर्वरकों की अनुशंसित खुराक को समझने में मदद करता है।", "ta-IN": "விவசாயிகள் மண்ணின் ஊட்டச்சத்து நிலை மற்றும் உரங்களின் பரிந்துரைக்கப்பட்ட அளவைப் புரிந்துகொள்ள உதவுகிறது." },
    apply: { "en-IN": "Submit soil samples to the nearest Soil Testing Lab.", "hi-IN": "निकटतम मृदा परीक्षण प्रयोगशाला में मिट्टी के नमूने जमा करें।", "ta-IN": "அருகிலுள்ள மண் பரிசோதனை ஆய்வகத்தில் மண் மாதிரிகளை சமர்ப்பிக்கவும்." },
    url: "https://soilhealth.dac.gov.in",
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

  const categories = ["All", "Direct Income Support", "Crop Insurance", "Soil & Input Management"];

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

      <div style={{ maxWidth: "1000px", margin: "-40px auto 0", padding: "0 20px" }}>
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

        {/* Schemes List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filtered.map(s => (
            <div key={s.id} style={{ background: "#fff", borderRadius: "20px", border: "1px solid #eee", overflow: "hidden", transition: "all 0.3s" }}>
              <div
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                style={{ padding: "24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ background: "#e8f5e9", color: "#1a7a32", fontSize: "11px", fontWeight: "800", padding: "4px 10px", borderRadius: "20px", textTransform: "uppercase" }}>{s.category}</span>
                  </div>
                  <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#0f1f12", marginBottom: "6px" }}>{tl(s.title)}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#25a244", fontWeight: "700", fontSize: "15px" }}>
                    <Info size={16} /> {tl(s.benefit)}
                  </div>
                </div>
                {expanded === s.id ? <ChevronUp size={24} color="#aaa" /> : <ChevronDown size={24} color="#aaa" />}
              </div>

              {expanded === s.id && (
                <div style={{ padding: "0 24px 24px", borderTop: "1px solid #f5f5f5" }}>
                  <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.6 }}>{tl(s.desc)}</p>

                    <div style={{ background: "#f9fbf9", borderRadius: "16px", padding: "18px" }}>
                      <h4 style={{ fontSize: "14px", color: "#1a7a32", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <BookOpen size={16} /> {t("howApply")}
                      </h4>
                      <p style={{ fontSize: "14px", color: "#444" }}>{tl(s.apply)}</p>
                    </div>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: "140px", background: "#1a7a32", color: "#fff", textDecoration: "none", textAlign: "center", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        {t("visit")} <ExternalLink size={16} />
                      </a>
                      <div style={{ flex: 1, minWidth: "140px", border: "1.5px solid #e8f5e9", color: "#1a7a32", textAlign: "center", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <Phone size={16} /> {t("helpline")}: {s.helpline}
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