import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sprout, Eye, EyeOff, Phone, Lock, User, MapPin, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", state: "", password: "" });
  const up = k => e => setForm({ ...form, [k]: e.target.value });

  const states = ["Andhra Pradesh","Bihar","Gujarat","Haryana","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal"];

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ name: form.name, phone: form.phone, state: form.state, isGuest: false });
      setLoading(false);
      navigate("/");
    }, 1400);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f0f7f0" }}>
      {/* Left panel */}
      <div className="hide-mobile" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=85"
          alt="wheat field" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(5,40,15,0.85),rgba(5,40,15,0.5))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
            <div style={{ background: "#25a244", borderRadius: "14px", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sprout size={26} color="#fff" />
            </div>
            <span style={{ color: "#fff", fontSize: "28px", fontWeight: "900" }}>FarmBot</span>
          </div>
          <h2 style={{ color: "#fff", fontSize: "36px", fontWeight: "900", lineHeight: 1.2, marginBottom: "16px" }}>
            Join 50,000+<br />Indian Farmers 🌾
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", lineHeight: 1.7, maxWidth: "380px" }}>
            Get AI crop advice, weather alerts, and market prices — all free, in your language.
          </p>
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {["✅ Free AI farming advice", "🌦️ GPS weather alerts", "📈 Daily market prices", "🎤 Voice support in 6 languages"].map(f => (
              <div key={f} style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px" }}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div className="hide-desktop" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", justifyContent: "center" }}>
            <div style={{ background: "#25a244", borderRadius: "12px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sprout size={22} color="#fff" />
            </div>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#1a7a32" }}>FarmBot</span>
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f1f12", marginBottom: "8px" }}>Create account 🌱</h1>
          <p style={{ color: "#666", fontSize: "15px", marginBottom: "32px" }}>Join FarmBot — it's completely free</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} color="#aaa" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input type="text" placeholder="Your name" required value={form.name} onChange={up("name")}
                  style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: "12px", border: "1.5px solid #e0e0e0", fontSize: "15px", outline: "none", boxSizing: "border-box", background: "#fafafa" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Phone Number</label>
              <div style={{ position: "relative" }}>
                <Phone size={16} color="#aaa" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input type="tel" placeholder="+91 98765 43210" required value={form.phone} onChange={up("phone")}
                  style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: "12px", border: "1.5px solid #e0e0e0", fontSize: "15px", outline: "none", boxSizing: "border-box", background: "#fafafa" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>State</label>
              <div style={{ position: "relative" }}>
                <MapPin size={16} color="#aaa" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <select required value={form.state} onChange={up("state")}
                  style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: "12px", border: "1.5px solid #e0e0e0", fontSize: "15px", outline: "none", boxSizing: "border-box", background: "#fafafa", appearance: "none", color: form.state ? "#1a1a1a" : "#aaa" }}>
                  <option value="">Select your state</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#aaa" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input type={show ? "text" : "password"} placeholder="Create a password" required value={form.password} onChange={up("password")}
                  style={{ width: "100%", padding: "13px 44px 13px 42px", borderRadius: "12px", border: "1.5px solid #e0e0e0", fontSize: "15px", outline: "none", boxSizing: "border-box", background: "#fafafa" }} />
                <button type="button" onClick={() => setShow(!show)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa" }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ background: loading ? "#aaa" : "linear-gradient(135deg,#1a7a32,#25a244)", color: "#fff", borderRadius: "12px", padding: "15px", fontSize: "16px", fontWeight: "700", border: "none", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 16px rgba(37,162,68,0.35)", marginTop: "4px" }}>
              {loading ? "Creating account..." : <><span>Create Account</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#666" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#25a244", fontWeight: "700", textDecoration: "none" }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
