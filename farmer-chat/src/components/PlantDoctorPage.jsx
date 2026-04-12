import { useState, useRef } from 'react';
import { Upload, Camera, AlertTriangle, CheckCircle, XCircle, Leaf, Clock, Activity } from 'lucide-react';
import { FASTAPI_URL } from '../config';
import { useLang } from '../context/LangContext';
import RevivalIntelligence from './RevivalIntelligence';

const TX = {
  title:    { 'ta-IN': '🌿 தாவர மருத்துவர்', 'hi-IN': '🌿 पौधा डॉक्टर', 'te-IN': '🌿 మొక్క వైద్యుడు', 'kn-IN': '🌿 ಸಸ್ಯ ವೈದ್ಯ', 'ml-IN': '🌿 സസ്യ ഡോക്ടർ', 'en-IN': '🌿 Plant Doctor' },
  subtitle: { 'ta-IN': 'பயிர் புகைப்படம் பதிவேற்றி நோயை கண்டறியுங்கள்', 'hi-IN': 'फसल की फोटो अपलोड करें और बीमारी पहचानें', 'te-IN': 'పంట ఫోటో అప్‌లోడ్ చేసి వ్యాధిని గుర్తించండి', 'kn-IN': 'ಬೆಳೆ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ರೋಗ ಪತ್ತೆ ಮಾಡಿ', 'ml-IN': 'വിള ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് രോഗം കണ്ടെത്തുക', 'en-IN': 'Upload a crop photo to detect disease instantly' },
  upload:   { 'ta-IN': 'புகைப்படம் பதிவேற்றவும்', 'hi-IN': 'फोटो अपलोड करें', 'te-IN': 'ఫోటో అప్‌లోడ్ చేయండి', 'kn-IN': 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', 'ml-IN': 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക', 'en-IN': 'Upload Photo' },
  analyze:  { 'ta-IN': 'பகுப்பாய்வு செய்', 'hi-IN': 'विश्लेषण करें', 'te-IN': 'విశ్లేషించు', 'kn-IN': 'ವಿಶ್ಲೇಷಿಸಿ', 'ml-IN': 'വിശകലനം ചെയ്യുക', 'en-IN': 'Analyze Plant' },
  analyzing:{ 'ta-IN': 'பகுப்பாய்வு நடக்கிறது...', 'hi-IN': 'विश्लेषण हो रहा है...', 'te-IN': 'విశ్లేషిస్తోంది...', 'kn-IN': 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...', 'ml-IN': 'വിശകലനം ചെയ്യുന്നു...', 'en-IN': 'Analyzing...' },
  disease:  { 'ta-IN': 'நோய் கண்டறிதல்', 'hi-IN': 'रोग पहचान', 'te-IN': 'వ్యాధి నిర్ధారణ', 'kn-IN': 'ರೋಗ ಪತ್ತೆ', 'ml-IN': 'രോഗ നിർണ്ണയം', 'en-IN': 'Disease Detected' },
  urgency:  { 'ta-IN': 'அவசரநிலை', 'hi-IN': 'तात्कालिकता', 'te-IN': 'అత్యవసరత', 'kn-IN': 'ತುರ್ತು', 'ml-IN': 'അടിയന്തരാവസ്ഥ', 'en-IN': 'Urgency' },
  severity: { 'ta-IN': 'தீவிரம்', 'hi-IN': 'गंभीरता', 'te-IN': 'తీవ్రత', 'kn-IN': 'ತೀವ್ರತೆ', 'ml-IN': 'തീവ്രത', 'en-IN': 'Severity' },
  survival: { 'ta-IN': 'உயிர்வாழ்வு வாய்ப்பு', 'hi-IN': 'बचने की संभावना', 'te-IN': 'మనుగడ సంభావ్యత', 'kn-IN': 'ಬದುಕುಳಿಯುವ ಸಾಧ್ಯತೆ', 'ml-IN': 'അതിജീവന സാധ്യത', 'en-IN': 'Survival Chance' },
  cpr:      { 'ta-IN': 'சிகிச்சை திட்டம்', 'hi-IN': 'उपचार योजना', 'te-IN': 'చికిత్స ప్రణాళిక', 'kn-IN': 'ಚಿಕಿತ್ಸಾ ಯೋಜನೆ', 'ml-IN': 'ചികിത്സ പദ്ധതി', 'en-IN': 'Treatment Plan' },
  decision: { 'ta-IN': 'பரிந்துரை', 'hi-IN': 'सिफारिश', 'te-IN': 'సిఫార్సు', 'kn-IN': 'ಶಿಫಾರಸು', 'ml-IN': 'ശുപാർശ', 'en-IN': 'Recommendation' },
  tapUpload:{ 'ta-IN': 'புகைப்படம் தேர்ந்தெடுக்க தட்டவும்', 'hi-IN': 'फोटो चुनने के लिए टैप करें', 'te-IN': 'ఫోటో ఎంచుకోవడానికి నొక్కండి', 'kn-IN': 'ಫೋಟೋ ಆಯ್ಕೆ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ', 'ml-IN': 'ഫോട്ടോ തിരഞ്ഞെടുക്കാൻ ടാപ്പ് ചെയ്യുക', 'en-IN': 'Tap to select a photo' },
};

function tx(lang, key) { return TX[key]?.[lang.code] || TX[key]?.['en-IN'] || key; }

export default function PlantDoctorPage() {
  const { lang } = useLang();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError('');
  }

  async function analyze() {
    if (!image) return;
    setLoading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', image);
      const res = await fetch(`${FASTAPI_URL}/analyze`, { method: 'POST', body: form });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Plant analysis result:', data);
      setResult(data);
    } catch (e) {
      console.error('Analysis error:', e);
      setError('Could not analyze. Make sure the FastAPI backend is running on port 8000.');
    }
    setLoading(false);
  }

  const urgencyColor = result ? (result.urgency?.level?.includes('HIGH') ? '#c62828' : result.urgency?.level?.includes('MEDIUM') ? '#e65100' : '#2e7d32') : '#555';
  const urgencyBg   = result ? (result.urgency?.level?.includes('HIGH') ? '#ffebee' : result.urgency?.level?.includes('MEDIUM') ? '#fff3e0' : '#e8f5e9') : '#f5f5f5';

  return (
    <div style={{ minHeight: '100vh', background: '#f0f7f0', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#1a7a32,#25a244)', padding: '36px 24px 28px', position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=60" alt="bg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px,4vw,32px)', fontWeight: '900', margin: '0 0 8px' }}>{tx(lang, 'title')}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', margin: 0 }}>{tx(lang, 'subtitle')}</p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Upload area */}
        <div onClick={() => fileRef.current?.click()}
          style={{ background: '#fff', borderRadius: '20px', border: `2px dashed ${preview ? '#25a244' : '#c8e6c9'}`, padding: '32px 20px', textAlign: 'center', cursor: 'pointer', marginBottom: '16px', transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#25a244'}
          onMouseLeave={e => e.currentTarget.style.borderColor = preview ? '#25a244' : '#c8e6c9'}>
          {preview ? (
            <img src={preview} alt="crop" style={{ maxHeight: '260px', maxWidth: '100%', borderRadius: '14px', objectFit: 'contain' }} />
          ) : (
            <div>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Camera size={28} color="#25a244" />
              </div>
              <p style={{ color: '#1a7a32', fontWeight: '700', fontSize: '16px', margin: '0 0 6px' }}>{tx(lang, 'upload')}</p>
              <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>{tx(lang, 'tapUpload')}</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: 'none' }} />
        </div>

        {/* Analyze button */}
        {preview && (
          <button onClick={analyze} disabled={loading} style={{ width: '100%', background: loading ? '#aaa' : 'linear-gradient(135deg,#1a7a32,#25a244)', color: '#fff', borderRadius: '14px', padding: '16px', fontSize: '16px', fontWeight: '700', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 16px rgba(37,162,68,0.3)' }}>
            {loading ? <><Activity size={20} style={{ animation: 'spin 1s linear infinite' }} /> {tx(lang, 'analyzing')}</> : <><Leaf size={20} /> {tx(lang, 'analyze')}</>}
          </button>
        )}

        {error && <div style={{ background: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '12px', padding: '14px', color: '#c62828', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}

        {/* No API key / rate limit warning */}
        {(result?.source === 'no_api_key' || result?.source === 'rate_limited') && (
          <div style={{ background: '#fff3e0', border: '1px solid #ffb300', borderRadius: '14px', padding: '18px', marginBottom: '16px' }}>
            <div style={{ fontWeight: '800', fontSize: '15px', color: '#e65100', marginBottom: '8px' }}>
              {result?.source === 'rate_limited' ? '⏳ Rate Limit Reached' : '🔑 AI Key Required'}
            </div>
            <p style={{ fontSize: '14px', color: '#bf360c', margin: '0 0 10px' }}>
              {result?.message}
            </p>
            {result?.source === 'no_api_key' && (
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer"
                style={{ background: '#e65100', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
                Get Free Key →
              </a>
            )}
          </div>
        )}
        {/* Results */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Disease + Urgency */}
            <div style={{ background: '#fff', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: urgencyBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {result.urgency?.level?.includes('HIGH') ? <AlertTriangle size={22} color={urgencyColor} /> : result.urgency?.level?.includes('LOW') ? <CheckCircle size={22} color={urgencyColor} /> : <Clock size={22} color={urgencyColor} />}
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '17px', color: '#0f1f12' }}>{result.disease}</div>
                  <div style={{ fontSize: '13px', color: urgencyColor, fontWeight: '600' }}>{result.urgency?.level} · {result.urgency?.time}</div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: '#f8faf8', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#888', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>{tx(lang, 'severity')}</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: result.severity >= 70 ? '#c62828' : result.severity >= 40 ? '#e65100' : '#2e7d32' }}>{result.severity}%</div>
                </div>
                <div style={{ background: '#f8faf8', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#888', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>{tx(lang, 'survival')}</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: result.survival_probability >= 60 ? '#2e7d32' : result.survival_probability >= 40 ? '#e65100' : '#c62828' }}>{result.survival_probability}%</div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div style={{ background: result.decision?.includes('✅') ? '#e8f5e9' : '#ffebee', borderRadius: '18px', padding: '18px', border: `1px solid ${result.decision?.includes('✅') ? '#c8e6c9' : '#ffcdd2'}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
              {result.decision?.includes('✅') ? <CheckCircle size={24} color="#2e7d32" /> : <XCircle size={24} color="#c62828" />}
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>{tx(lang, 'decision')}</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: result.decision?.includes('✅') ? '#1a7a32' : '#c62828' }}>{result.decision}</div>
              </div>
            </div>

            {/* CPR Treatment Plan */}
            <div style={{ background: '#fff', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
              <div style={{ fontWeight: '800', fontSize: '15px', color: '#0f1f12', marginBottom: '14px' }}>🩺 {tx(lang, 'cpr')}</div>
              {Object.entries(result.plant_cpr_plan || {}).map(([time, actions]) => (
                actions.length > 0 && (
                  <div key={time} style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#25a244', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{time}</div>
                    {actions.map((action, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#333', padding: '8px 12px', background: '#f8faf8', borderRadius: '10px', marginBottom: '4px' }}>
                        <span style={{ color: '#25a244', flexShrink: 0 }}>→</span> {action}
                      </div>
                    ))}
                  </div>
                )
              ))}
            </div>

            {/* Revival Intelligence Engine */}
            <RevivalIntelligence 
              cropData={{
                diseaseStage: result.severity >= 70 ? 'severe' : result.severity >= 40 ? 'moderate' : 'early',
                cropAge: 45,
                affectedArea: result.severity || 30,
                weather: 'favorable',
                soilHealth: 'good',
                cropType: 'rice'
              }}
              diseaseInfo={result}
            />

            {/* Try another */}
            <button onClick={() => { setImage(null); setPreview(null); setResult(null); }} style={{ width: '100%', background: '#fff', border: '1.5px solid #c8e6c9', borderRadius: '14px', padding: '14px', fontSize: '15px', fontWeight: '700', color: '#1a7a32', cursor: 'pointer' }}>
              📷 Analyze Another Plant
            </button>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
