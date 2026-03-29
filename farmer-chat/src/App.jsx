import { BrowserRouter, Routes, Route, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { Home, MessageCircle, Lightbulb, Sprout, Globe, X, Check } from 'lucide-react';
import { useState } from 'react';
import { LangProvider, useLang } from './context/LangContext';
import { LANGUAGES, t } from './config';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import WeatherPage from './components/WeatherPage';
import TipsPage from './components/TipsPage';
import MarketPage from './components/MarketPage';
import './index.css';

const NAV_ITEMS = [
  { path: '/',        icon: Home,          key: 'home' },
  { path: '/chat',    icon: MessageCircle, key: 'startChat' },
  { path: '/tips',    icon: Lightbulb,     key: 'tips' },
];

function LangModal({ onClose }) {
  const { lang, changeLang } = useLang();
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: '20px', padding: '28px', width: '340px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>🌐 Choose Language</span>
          <button onClick={onClose} style={{ background: '#f0f0f0', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => { changeLang(l.code); onClose(); }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: lang.code === l.code ? '#e8f5e9' : '#f8f8f8',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '22px' }}>{l.flag}</span>
                <span style={{ fontSize: '15px', fontWeight: '600', color: lang.code === l.code ? '#1a7a32' : '#333' }}>{l.label}</span>
              </div>
              {lang.code === l.code && <Check size={18} color="#25a244" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  const { lang } = useLang();
  const [showLang, setShowLang] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 500,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
        padding: '0 32px', gap: '32px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}>
          <div style={{ background: 'linear-gradient(135deg, #1a7a32, #25a244)', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#1a7a32', letterSpacing: '-0.5px' }}>FarmBot</span>
        </div>

        {/* Desktop nav links */}
        <nav className="hide-mobile" style={{ display: 'flex', gap: '4px', flex: 1 }}>
          {NAV_ITEMS.map(({ path, icon: Icon, key }) => {
            const active = location.pathname === path;
            return (
              <button key={path} onClick={() => navigate(path)} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: active ? '#e8f5e9' : 'transparent',
                color: active ? '#1a7a32' : '#555',
                fontWeight: active ? '700' : '500', fontSize: '14px',
                transition: 'all 0.15s',
              }}>
                <Icon size={16} />
                {t(lang, key)}
              </button>
            );
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
          <button onClick={() => setShowLang(true)} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#f0f7f0', border: '1px solid #c8e6c9', borderRadius: '10px',
            padding: '8px 14px', color: '#1a7a32', fontWeight: '600', fontSize: '14px',
          }}>
            <Globe size={15} /> {lang.label}
          </button>
          <button onClick={() => navigate('/login')} className="hide-mobile" style={{
            background: 'transparent', color: '#1a7a32', border: '1.5px solid #c8e6c9',
            borderRadius: '10px', padding: '9px 18px', fontWeight: '700', fontSize: '14px', cursor: 'pointer',
          }}>
            Login
          </button>
          <button onClick={() => navigate('/chat')} className="hide-mobile" style={{
            background: 'linear-gradient(135deg, #1a7a32, #25a244)',
            color: '#fff', borderRadius: '10px', padding: '9px 20px',
            fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 12px rgba(37,162,68,0.3)',
          }}>
            {t(lang, 'startChat')} →
          </button>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="hide-desktop" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff', borderTop: '1px solid var(--border)',
        display: 'flex', zIndex: 500,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
      }}>
        {NAV_ITEMS.map(({ path, icon: Icon, key }) => {
          const active = location.pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '8px 4px 12px', background: 'none', border: 'none', cursor: 'pointer',
              borderTop: active ? '2px solid #25a244' : '2px solid transparent',
            }}>
              <Icon size={21} color={active ? '#25a244' : '#aaa'} />
              <span style={{ fontSize: '10px', color: active ? '#25a244' : '#aaa', fontWeight: active ? '700' : '400', marginTop: '2px' }}>
                {t(lang, key)}
              </span>
            </button>
          );
        })}
      </nav>

      {showLang && <LangModal onClose={() => setShowLang(false)} />}
    </>
  );
}

function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNav />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/signup"   element={<SignupPage />} />
          <Route path="/"        element={<HomePage />} />
          <Route path="/chat"    element={<ChatPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/tips"    element={<TipsPage />} />
          <Route path="/market"  element={<MarketPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </LangProvider>
  );
}
