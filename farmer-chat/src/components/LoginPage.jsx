import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sprout, Eye, EyeOff, Phone, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ name: "Farmer", phone: form.phone, isGuest: false });
      setLoading(false);
      navigate("/");
    }, 1200);
  }

  function continueAsGuest() {
    login({ isGuest: true });
    navigate("/");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f0f7f0" }}>
      {/* Left panel - image */}
      <div className="hide-mobile" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=85"
          alt="farm" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(5,40,15,0.85),rgba(5,40,15,0.5))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
            <div style={{ background: "#25a244", borderRadius: "14px", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sprout size={26} color="#fff" />
            </div>
            <span style={{ color: "#fff", fontSize: "28px", fontWeight: "900" }}>FarmBot</span>
          </div>
          <h2 style={{ color: "#fff", fontSize: "36px", fontWeight: "900", lineHeight: 1.2, marginBottom: "16px" }}>
            Smart farming<br />starts here 🌾
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", lineHeight: 1.7, maxWidth: "380px" }}>
            AI-powered crop advice, live weather alerts, and daily market prices in 6 Indian languages.
          </p>
          <div style={{ display: "flex", gap: "24px", marginTop: "40px" }}>
            {[["50,000+", "Farmers"], ["6", "Languages"], ["100%", "Free"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ color: "#69f0ae", fontSize: "22px", fontWeight: "800" }}>{v}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Mobile logo */}
          <div className="hide-desktop" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", justifyContent: "center" }}>
            <div style={{ background: "#25a244", borderRadius: "12px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sprout size={22} color="#fff" />
            </div>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#1a7a32" }}>FarmBot</span>
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f1f12", marginBottom: "8px" }}>Welcome back 👋</h1>
          <p style={{ color: "#666", fontSize: "15px", marginBottom: "32px" }}>Login to your FarmBot account</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Phone Number</label>
              <div style={{ position: "relative" }}>
                <Phone size={16} color="#aaa" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input type="tel" placeholder="+91 98765 43210" required value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: "12px", border: "1.5px solid #e0e0e0", fontSize: "15px", outline: "none", boxSizing: "border-box", background: "#fafafa" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#aaa" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input type={show ? "text" : "password"} placeholder="Enter your password" required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ width: "100%", padding: "13px 44px 13px 42px", borderRadius: "12px", border: "1.5px solid #e0e0e0", fontSize: "15px", outline: "none", boxSizing: "border-box", background: "#fafafa" }} />
                <button type="button" onClick={() => setShow(!show)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa" }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "13px", color: "#25a244", fontWeight: "600", cursor: "pointer" }}>Forgot password?</span>
            </div>
            <button type="submit" disabled={loading} style={{ background: loading ? "#aaa" : "linear-gradient(135deg,#1a7a32,#25a244)", color: "#fff", borderRadius: "12px", padding: "15px", fontSize: "16px", fontWeight: "700", border: "none", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 16px rgba(37,162,68,0.35)" }}>
              {loading ? "Logging in..." : <><span>Login</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
            <span style={{ color: "#aaa", fontSize: "13px" }}>or continue with</span>
            <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
          </div>

          <button onClick={continueAsGuest} style={{ width: "100%", padding: "13px", borderRadius: "12px", border: "1.5px solid #e0e0e0", background: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "#333" }}>
            <span style={{ fontSize: "20px" }}>🌾</span> Continue as Guest
          </button>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#666" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#25a244", fontWeight: "700", textDecoration: "none" }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
