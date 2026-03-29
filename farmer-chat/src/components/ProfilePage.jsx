import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { LogOut, User, Phone, MapPin, MessageCircle, CloudSun, Lightbulb, TrendingUp, Edit2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { lang } = useLang();
  const navigate = useNavigate();

  if (!user) { navigate('/login'); return null; }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const stats = [
    { icon: '💬', label: 'Chats', val: '12' },
    { icon: '🌾', label: 'Crops Tracked', val: '3' },
    { icon: '📅', label: 'Days Active', val: '7' },
    { icon: '⭐', label: 'Tips Saved', val: '5' },
  ];

  const quickLinks = [
    { icon: <MessageCircle size={18} color="#1a7a32" />, label: 'AI Farming Chat', path: '/chat', bg: '#e8f5e9', color: '#1a7a32' },
    { icon: <CloudSun size={18} color="#1565c0" />,      label: 'Live Weather',    path: '/weather', bg: '#e3f2fd', color: '#1565c0' },
    { icon: <Lightbulb size={18} color="#b45309" />,     label: 'Expert Tips',     path: '/tips',    bg: '#fef3c7', color: '#b45309' },
    { icon: <TrendingUp size={18} color="#7c3aed" />,    label: 'Market Prices',   path: '/market',  bg: '#ede9fe', color: '#7c3aed' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f7f0', paddingBottom: '80px' }}>

      {/* Header banner */}
      <div style={{ background: 'linear-gradient(135deg,#1a7a32,#25a244)', padding: '48px 24px 80px', textAlign: 'center', position: 'relative' }}>
        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=60"
          alt="bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Avatar */}
          <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: user.isGuest ? '#f0f7f0' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: user.isGuest ? '36px' : '32px', fontWeight: '900', color: '#1a7a32', border: '4px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            {user.isGuest ? '🌾' : user.avatar}
          </div>
          <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 4px' }}>
            {user.isGuest ? 'Guest Farmer' : user.name}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', margin: 0 }}>
            {user.isGuest ? 'Browsing as guest' : `FarmBot Member`}
          </p>
          {user.isGuest && (
            <button onClick={() => navigate('/signup')} style={{ marginTop: '14px', background: '#fff', color: '#1a7a32', borderRadius: '10px', padding: '9px 22px', fontWeight: '700', fontSize: '14px', border: 'none', cursor: 'pointer' }}>
              Create Free Account
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '-40px auto 0', padding: '0 16px', position: 'relative', zIndex: 2 }}>

        {/* Stats */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '16px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '10px 4px' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#1a7a32' }}>{s.val}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Profile info */}
        {!user.isGuest && (
          <div style={{ background: '#fff', borderRadius: '20px', padding: '20px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontWeight: '700', fontSize: '15px', color: '#0f1f12' }}>Profile Details</span>
              <button style={{ background: '#f0f7f0', border: 'none', borderRadius: '8px', padding: '6px 12px', color: '#1a7a32', fontWeight: '600', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Edit2 size={13} /> Edit
              </button>
            </div>
            {[
              { icon: <User size={16} color="#25a244" />, label: 'Name', val: user.name },
              { icon: <Phone size={16} color="#25a244" />, label: 'Phone', val: user.phone || '+91 XXXXX XXXXX' },
              { icon: <MapPin size={16} color="#25a244" />, label: 'State', val: user.state || 'Not set' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {row.icon}
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#aaa', fontWeight: '600' }}>{row.label}</div>
                  <div style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: '600' }}>{row.val}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick links */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '20px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#0f1f12', marginBottom: '14px' }}>Quick Access</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {quickLinks.map((l, i) => (
              <button key={i} onClick={() => navigate(l.path)} style={{ background: l.bg, border: 'none', borderRadius: '14px', padding: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {l.icon}
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: l.color }}>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} style={{ width: '100%', background: '#fff', border: '1.5px solid #ffcdd2', borderRadius: '16px', padding: '16px', color: '#c62828', fontWeight: '700', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <LogOut size={18} /> {user.isGuest ? 'Exit Guest Mode' : 'Logout'}
        </button>
      </div>
    </div>
  );
}
