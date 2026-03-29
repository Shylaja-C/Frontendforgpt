import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, CloudSun, ShieldCheck, Users, Star, ArrowRight, Mic } from "lucide-react";
import { useLang } from "../context/LangContext";
import { t } from "../config";

const IMG = {
  hero: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=85",
  farmer1: "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800&q=80",
  farmer2: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
  farmer3: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
  rice: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=900&q=80",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900&q=80",
  veggie: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
  weather: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=900&q=80",
  market: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
  soil: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80",
  irrigation: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=80",
};

export default function HomePage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [hov, setHov] = useState(null);

  const features = [
    { img: IMG.farmer1, icon: "💬", title: "AI Farming Chat", desc: "Ask crop, pest, soil questions in your language. Get instant expert answers.", path: "/chat", color: "#1a7a32", bg: "#e8f5e9" },
    { img: IMG.weather, icon: "🌤️", title: "Live Weather", desc: "GPS-based weather with 5-day forecast and smart farming alerts.", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },
    { img: IMG.soil, icon: "💡", title: "Expert Tips", desc: "Curated farming tips on crops, pest control, irrigation and soil health.", path: "/tips", color: "#b45309", bg: "#fef3c7" },
    { img: IMG.market, icon: "📈", title: "Market Prices", desc: "Daily mandi rates for rice, wheat, vegetables and spices across India.", path: "/market", color: "#7c3aed", bg: "#ede9fe" },
  ];

  const chatCards = [
    { emoji: "🌾", key: "cropHelp", prompt: "Crop Advice", color: "#1a7a32", bg: "#e8f5e9" },
    { emoji: "🐛", key: "pestControl", prompt: "Pest Control", color: "#004d40", bg: "#e0f2f1" },
    { emoji: "💧", key: "irrigation", prompt: "Irrigation Tips", color: "#01579b", bg: "#e1f5fe" },
    { emoji: "🌱", key: "fertilizer", prompt: "Fertilizer Guide", color: "#33691e", bg: "#f9fbe7" },
  ];

  const langs = [
    { name: "தமிழ்", color: "#1a7a32" },
    { name: "हिंदी", color: "#1565c0" },
    { name: "తెలుగు", color: "#7c3aed" },
    { name: "ಕನ್ನಡ", color: "#b45309" },
    { name: "മലയാളം", color: "#0f766e" },
    { name: "English", color: "#374151" },
  ];

  return (
    <div style={{ background: "#f8faf8", fontFamily: "inherit" }}>
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img src={IMG.hero} alt="Indian farmer in irrigated field" loading="eager" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(5,25,10,0.88) 0%,rgba(5,25,10,0.6) 55%,rgba(5,25,10,0.2) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1140px", margin: "0 auto", padding: "100px 32px 80px", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(37,162,68,0.2)", border: "1px solid rgba(37,162,68,0.45)", borderRadius: "30px", padding: "8px 18px", marginBottom: "28px" }}>
            <ShieldCheck size={14} color="#69f0ae" />
            <span style={{ color: "#69f0ae", fontSize: "13px", fontWeight: "700", letterSpacing: "0.4px" }}>Trusted by 50,000+ Indian Farmers</span>
          </div>
          <h1 style={{ fontSize: "clamp(38px,5.5vw,72px)", fontWeight: "900", color: "#fff", lineHeight: 1.05, marginBottom: "22px", letterSpacing: "-2px", maxWidth: "700px" }}>
            Your Smart<br /><span style={{ color: "#69f0ae" }}>Farming Partner</span>
          </h1>
          <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,255,255,0.82)", maxWidth: "520px", lineHeight: 1.75, marginBottom: "40px" }}>
            AI-powered crop advice, live weather alerts, and daily market prices in Tamil, Hindi, Telugu, Kannada, Malayalam and English.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "52px" }}>
            <button onClick={() => navigate("/chat")} style={{ background: "#25a244", color: "#fff", borderRadius: "12px", padding: "16px 32px", fontSize: "17px", fontWeight: "800", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 6px 24px rgba(37,162,68,0.5)" }}>
              <MessageCircle size={20} /> {t(lang, "startChat")} <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate("/weather")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "12px", padding: "16px 28px", fontSize: "17px", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <CloudSun size={20} /> {t(lang, "weather")}
            </button>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { icon: <Users size={20} color="#25a244" />, val: "50,000+", label: "Farmers Helped" },
              { icon: <Star size={20} color="#f59e0b" />, val: "4.8 / 5", label: "User Rating" },
              { icon: <ShieldCheck size={20} color="#1565c0" />, val: "100%", label: "Free to Use" },
              { icon: <Mic size={20} color="#7c3aed" />, val: "6 Langs", label: "Voice Support" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "14px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
                {s.icon}
                <div>
                  <div style={{ color: "#fff", fontWeight: "800", fontSize: "17px", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", marginTop: "3px" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ maxWidth: "1140px", margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ color: "#25a244", fontWeight: "700", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>What FarmBot offers</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: "900", color: "#0f1f12", letterSpacing: "-1px", marginBottom: "14px" }}>Everything a farmer needs</h2>
          <p style={{ color: "#555", fontSize: "17px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>One trusted platform for AI advice, weather, tips, and live market prices</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "24px" }}>
          {features.map((f, i) => (
            <div key={i} onClick={() => navigate(f.path)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", cursor: "pointer", border: "1px solid #eee", boxShadow: hov === i ? "0 20px 48px rgba(0,0,0,0.13)" : "0 2px 16px rgba(0,0,0,0.07)", transform: hov === i ? "translateY(-6px)" : "none", transition: "all 0.25s ease" }}>
              <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
                <img src={f.img} alt={f.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hov === i ? "scale(1.07)" : "scale(1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", top: "14px", left: "14px", background: f.bg, borderRadius: "10px", padding: "7px 12px", display: "flex", alignItems: "center", gap: "6px", color: f.color, fontWeight: "700", fontSize: "13px" }}>
                  {f.icon} {f.title}
                </div>
              </div>
              <div style={{ padding: "20px 22px 24px" }}>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{f.desc}</p>
                <span style={{ color: f.color, fontWeight: "700", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>Explore <ArrowRight size={14} /></span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: "#fff", padding: "64px 32px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#25a244", fontWeight: "700", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Ask FarmBot directly</p>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: "900", color: "#0f1f12", letterSpacing: "-0.5px" }}>Quick farming help</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "16px" }}>
            {chatCards.map((f, i) => (
              <button key={i} onClick={() => navigate("/chat", { state: { prompt: f.prompt } })} style={{ background: f.bg, border: "none", borderRadius: "16px", padding: "24px 20px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: "10px" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <span style={{ fontSize: "32px" }}>{f.emoji}</span>
                <span style={{ fontSize: "15px", fontWeight: "700", color: f.color }}>{t(lang, f.key)}</span>
                <span style={{ fontSize: "12px", color: f.color, opacity: 0.7, display: "flex", alignItems: "center", gap: "3px" }}>Ask now <ArrowRight size={12} /></span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "80px 32px", background: "#f8faf8" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: "900", color: "#0f1f12", letterSpacing: "-0.5px" }}>Built for real farmers 🌾</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "16px", borderRadius: "24px", overflow: "hidden" }}>
            {[
              { img: IMG.rice, cap: "Rice Farming · Tamil Nadu", sub: "Paddy cultivation guidance" },
              { img: IMG.wheat, cap: "Wheat Fields · Punjab", sub: "Rabi crop management" },
              { img: IMG.veggie, cap: "Vegetable Farming · Karnataka", sub: "Horticulture support" },
            ].map((p, i) => (
              <div key={i} style={{ position: "relative", aspectRatio: i === 0 ? "3/2" : "1/1", overflow: "hidden" }}>
                <img src={p.img} alt={p.cap} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: "16px", left: "18px" }}>
                  <div style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>{p.cap}</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", marginTop: "3px" }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: "#f0f7f0", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ color: "#25a244", fontWeight: "700", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Simple process</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: "900", color: "#0f1f12", letterSpacing: "-1px" }}>How it works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "28px" }}>
            {[
              { img: IMG.farmer3, step: "01", title: "Choose your language", desc: "Select from Tamil, Hindi, Telugu, Kannada, Malayalam or English." },
              { img: IMG.farmer2, step: "02", title: "Ask by voice or text", desc: "Speak or type your farming question. Use the mic for hands-free input." },
              { img: IMG.farmer1, step: "03", title: "Get trusted advice", desc: "Receive AI-powered answers on crops, pests, weather and market prices." },
            ].map((h, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e8f5e9" }}>
                <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                  <img src={h.img} alt={h.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.5),transparent 60%)" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", background: "#25a244", color: "#fff", borderRadius: "10px", padding: "5px 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "1px" }}>STEP {h.step}</div>
                </div>
                <div style={{ padding: "22px 24px 28px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0f1f12", marginBottom: "10px" }}>{h.title}</h3>
                  <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7, margin: 0 }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: "#f0f7f0", padding: "56px 32px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "28px" }}>
          <div>
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f1f12", marginBottom: "8px" }}>Speaks your language 🗣️</h3>
            <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.6 }}>Voice input + AI replies in 6 Indian languages. No English required.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {langs.map(l => (
              <span key={l.name} style={{ background: "#fff", border: "1.5px solid " + l.color + "40", color: l.color, borderRadius: "24px", padding: "9px 20px", fontSize: "15px", fontWeight: "700", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>{l.name}</span>
            ))}
          </div>
        </div>
      </section>
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img src={IMG.irrigation} alt="irrigation" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,25,10,0.84)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: "900", color: "#fff", marginBottom: "18px", letterSpacing: "-1px" }}>Ready to grow smarter? 🌾</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "18px", marginBottom: "36px", lineHeight: 1.7 }}>Join 50,000+ farmers already using FarmBot. Free, fast, and in your language.</p>
          <button onClick={() => navigate("/chat")} style={{ background: "#25a244", color: "#fff", borderRadius: "12px", padding: "18px 40px", fontSize: "18px", fontWeight: "800", border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(37,162,68,0.5)", display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <MessageCircle size={22} /> {t(lang, "startChat")} <ArrowRight size={18} />
          </button>
        </div>
      </section>
      <footer style={{ background: "#0a1a0d", padding: "48px 32px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "24px" }}>🌾</span>
              <span style={{ color: "#fff", fontWeight: "900", fontSize: "20px" }}>FarmBot</span>
            </div>
            <p style={{ color: "#4a6b4f", fontSize: "13px", margin: 0 }}>AI-powered farming assistant for Indian farmers</p>
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[["Chat", "/chat"], ["Weather", "/weather"], ["Tips", "/tips"], ["Market", "/market"]].map(([label, path]) => (
              <a key={label} href={path} style={{ color: "#4a6b4f", fontSize: "14px", textDecoration: "none" }}>{label}</a>
            ))}
          </div>
          <p style={{ color: "#2d4a32", fontSize: "12px", margin: 0 }}>2026 FarmBot - Built for Indian farmers</p>
        </div>
      </footer>
    </div>
  );
}