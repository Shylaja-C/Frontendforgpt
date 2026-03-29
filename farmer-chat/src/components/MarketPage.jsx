import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Search } from 'lucide-react';
import { useLang } from '../context/LangContext';

const CROP_IMGS = {
  Rice:      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=80&q=70',
  Wheat:     'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&q=70',
  Maize:     'https://images.unsplash.com/photo-1601593346740-925612772716?w=80&q=70',
  Tomato:    'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=80&q=70',
  Onion:     'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=80&q=70',
  Potato:    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=80&q=70',
  Cotton:    'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=80&q=70',
  Sugarcane: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&q=70',
  Groundnut: 'https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=80&q=70',
  Soybean:   'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=80&q=70',
  Turmeric:  'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=80&q=70',
  Chilli:    'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=80&q=70',
};

const MARKET_DATA = [
  { crop: 'Rice',       ta: 'நெல்',          hi: 'चावल',   te: 'వరి',        kn: 'ಅಕ್ಕಿ',      ml: 'അരി',        emoji: '🌾', price: 2180, prev: 2100, cat: 'Grains' },
  { crop: 'Wheat',      ta: 'கோதுமை',        hi: 'गेहूं',   te: 'గోధుమ',      kn: 'ಗೋಧಿ',       ml: 'ഗോതമ്പ്',    emoji: '🌿', price: 2275, prev: 2275, cat: 'Grains' },
  { crop: 'Maize',      ta: 'மக்காச்சோளம்',  hi: 'मक्का',  te: 'మొక్కజొన్న', kn: 'ಮೆಕ್ಕೆಜೋಳ', ml: 'ചോളം',       emoji: '🌽', price: 1850, prev: 1900, cat: 'Grains' },
  { crop: 'Tomato',     ta: 'தக்காளி',       hi: 'टमाटर',  te: 'టమాటా',      kn: 'ಟೊಮೇಟೊ',    ml: 'തക്കാളി',    emoji: '🍅', price: 1200, prev: 1500, cat: 'Vegetables' },
  { crop: 'Onion',      ta: 'வெங்காயம்',     hi: 'प्याज',  te: 'ఉల్లిపాయ',   kn: 'ಈರುಳ್ಳಿ',   ml: 'ഉള്ളി',       emoji: '🧅', price: 1800, prev: 1600, cat: 'Vegetables' },
  { crop: 'Potato',     ta: 'உருளைக்கிழங்கு',hi: 'आलू',    te: 'బంగాళాదుంప', kn: 'ಆಲೂಗಡ್ಡೆ',  ml: 'ഉരുളക്കിഴങ്ങ്', emoji: '🥔', price: 1100, prev: 1050, cat: 'Vegetables' },
  { crop: 'Cotton',     ta: 'பருத்தி',        hi: 'कपास',   te: 'పత్తి',       kn: 'ಹತ್ತಿ',      ml: 'പരുത്തി',    emoji: '🌸', price: 6500, prev: 6200, cat: 'Cash Crops' },
  { crop: 'Sugarcane',  ta: 'கரும்பு',        hi: 'गन्ना',   te: 'చెరకు',       kn: 'ಕಬ್ಬು',      ml: 'കരിമ്പ്',    emoji: '🎋', price: 315,  prev: 310,  cat: 'Cash Crops' },
  { crop: 'Groundnut',  ta: 'நிலக்கடலை',     hi: 'मूंगफली', te: 'వేరుశెనగ',   kn: 'ಕಡಲೆಕಾಯಿ',  ml: 'നിലക്കടല',   emoji: '🥜', price: 5200, prev: 5000, cat: 'Oilseeds' },
  { crop: 'Soybean',    ta: 'சோயாபீன்',      hi: 'सोयाबीन', te: 'సోయాబీన్',   kn: 'ಸೋಯಾಬೀನ್',  ml: 'സോയാബീൻ',   emoji: '🫘', price: 3800, prev: 3900, cat: 'Oilseeds' },
  { crop: 'Turmeric',   ta: 'மஞ்சள்',        hi: 'हल्दी',   te: 'పసుపు',       kn: 'ಅರಿಶಿನ',    ml: 'മഞ്ഞൾ',      emoji: '🟡', price: 7200, prev: 6800, cat: 'Spices' },
  { crop: 'Chilli',     ta: 'மிளகாய்',       hi: 'मिर्च',   te: 'మిర్చి',      kn: 'ಮೆಣಸಿನಕಾಯಿ', ml: 'മുളക്',     emoji: '🌶️', price: 9500, prev: 9500, cat: 'Spices' },
];

const CATS = ['All', 'Grains', 'Vegetables', 'Cash Crops', 'Oilseeds', 'Spices'];

function getCropName(item, lang) {
  if (lang.code === 'ta-IN') return item.ta;
  if (lang.code === 'hi-IN') return item.hi;
  if (lang.code === 'te-IN') return item.te;
  if (lang.code === 'kn-IN') return item.kn;
  if (lang.code === 'ml-IN') return item.ml;
  return item.crop;
}

function TrendBadge({ price, prev }) {
  const diff = price - prev;
  if (diff > 0) return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', padding: '3px 8px', fontSize: '12px', fontWeight: '700' }}>
      <TrendingUp size={12} /> +₹{diff}
    </span>
  );
  if (diff < 0) return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#ffebee', color: '#c62828', borderRadius: '8px', padding: '3px 8px', fontSize: '12px', fontWeight: '700' }}>
      <TrendingDown size={12} /> ₹{diff}
    </span>
  );
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#f5f5f5', color: '#888', borderRadius: '8px', padding: '3px 8px', fontSize: '12px' }}>
      <Minus size={12} /> Stable
    </span>
  );
}

export default function MarketPage() {
  const { lang } = useLang();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = MARKET_DATA.filter(d => {
    const name = getCropName(d, lang).toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) || d.crop.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === 'All' || d.cat === cat;
    return matchSearch && matchCat;
  });

  const rising = MARKET_DATA.filter(d => d.price > d.prev).length;
  const falling = MARKET_DATA.filter(d => d.price < d.prev).length;

  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - var(--nav-h))' }}>

      {/* Header with real photo */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '200px', display: 'flex', alignItems: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=85&fit=crop" alt="Market" loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(88,14,79,0.88), rgba(136,14,79,0.72))' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '48px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>
            {lang.code === 'ta-IN' ? '📈 சந்தை விலை' : lang.code === 'hi-IN' ? '📈 बाज़ार भाव' : lang.code === 'te-IN' ? '📈 మార్కెట్ ధరలు' : lang.code === 'kn-IN' ? '📈 ಮಾರುಕಟ್ಟೆ ಬೆಲೆ' : lang.code === 'ml-IN' ? '📈 വിപണി വില' : '📈 Market Prices'}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '20px' }}>
            {lang.code === 'ta-IN' ? 'இன்றைய சந்தை விலை' : lang.code === 'hi-IN' ? 'आज के बाज़ार भाव' : lang.code === 'te-IN' ? 'నేటి మండి రేట్లు · ₹ క్వింటాల్‌కు' : lang.code === 'kn-IN' ? 'ಇಂದಿನ ಮಂಡಿ ದರ · ₹ ಕ್ವಿಂಟಾಲ್‌ಗೆ' : lang.code === 'ml-IN' ? 'ഇന്നത്തെ മണ്ടി നിരക്ക് · ₹ ക്വിന്റലിന്' : "Today's mandi rates · ₹ per quintal"}
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '20px', padding: '6px 14px', fontSize: '13px', fontWeight: '600' }}>📊 {MARKET_DATA.length} Crops</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#a5d6a7', borderRadius: '20px', padding: '6px 14px', fontSize: '13px', fontWeight: '600' }}>↑ {rising} Rising</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#ef9a9a', borderRadius: '20px', padding: '6px 14px', fontSize: '13px', fontWeight: '600' }}>↓ {falling} Falling</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search crop..."
              style={{ width: '100%', background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '11px 14px 11px 40px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                background: cat === c ? '#880e4f' : '#fff',
                color: cat === c ? '#fff' : '#555',
                boxShadow: cat === c ? '0 2px 8px rgba(136,14,79,0.3)' : 'none',
                border: cat === c ? 'none' : '1px solid var(--border)',
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px', background: '#f8f9fa', borderBottom: '1px solid var(--border)' }}>
            {['Crop', 'Category', 'Price / Quintal', 'Change'].map(h => (
              <span key={h} style={{ fontSize: '12px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#aaa', fontSize: '15px' }}>No crops found</div>
          )}
          {filtered.map((item, i) => (
            <div key={item.crop} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '16px 20px', alignItems: 'center',
              borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#f0f0f0' }}>
                  <img src={CROP_IMGS[item.crop] || ''} alt={item.crop} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML = `<span style="font-size:28px;display:flex;align-items:center;justify-content:center;height:100%">${item.emoji}</span>`; }} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#1a1a1a' }}>{getCropName(item, lang)}</div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>{item.crop}</div>
                </div>
              </div>
              <span style={{ fontSize: '13px', color: '#666', background: '#f5f5f5', borderRadius: '8px', padding: '3px 10px', display: 'inline-block' }}>{item.cat}</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#1a7a32' }}>₹{item.price.toLocaleString()}</span>
              <TrendBadge price={item.price} prev={item.prev} />
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#bbb', marginTop: '16px' }}>
          * Sample data. Connect Agmarknet API for live prices.
        </p>
      </div>
    </div>
  );
}
