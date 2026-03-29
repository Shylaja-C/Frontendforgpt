import { useState } from 'react';
import { useLang } from '../context/LangContext';

// High-quality, contextually accurate farming images
const CAT_IMGS = {
  crop:    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1000&q=85&fit=crop',
  pest:    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1000&q=85&fit=crop',
  water:   'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1000&q=85&fit=crop',
  soil:    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&q=85&fit=crop',
  harvest: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1000&q=85&fit=crop',
};
const HERO_IMG = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1400&q=85&fit=crop';

const CATEGORIES = {
  'en-IN': [
    { id: 'crop', icon: '🌾', title: 'Crop Management', color: '#1a7a32', bg: '#e8f5e9',
      tips: ['Soak seeds for 24 hours before sowing to improve germination','Always test soil before applying fertilizer','Follow crop rotation to prevent soil depletion','Use certified seeds for better yield and disease resistance','Maintain proper spacing between plants for air circulation'] },
    { id: 'pest', icon: '🐛', title: 'Pest & Disease Control', color: '#e65100', bg: '#fff3e0',
      tips: ['Use neem oil spray as an organic pesticide alternative','Avoid spraying pesticides at noon – they evaporate quickly','Set yellow sticky traps to monitor and catch insects','Remove infected plants immediately to prevent spread','Rotate pesticides to prevent resistance buildup'] },
    { id: 'water', icon: '💧', title: 'Water & Irrigation', color: '#1565c0', bg: '#e3f2fd',
      tips: ['Drip irrigation saves up to 40% water vs flood irrigation','Water crops in early morning or evening to reduce evaporation','Collect rainwater in farm ponds for dry season use','Check soil moisture before irrigating – avoid overwatering','Mulching reduces water loss from soil by up to 30%'] },
    { id: 'soil', icon: '🌍', title: 'Soil Health', color: '#6d4c41', bg: '#efebe9',
      tips: ['Add organic compost to improve soil structure and fertility','Test soil pH every season – most crops prefer 6.0–7.0','Green manure crops like dhaincha improve nitrogen levels','Avoid tilling wet soil to prevent compaction','Use earthworm farming to naturally enrich soil'] },
    { id: 'harvest', icon: '🚜', title: 'Harvest & Storage', color: '#6a1b9a', bg: '#f3e5f5',
      tips: ['Harvest at the right maturity stage for best quality','Dry grains to below 14% moisture before storage','Use hermetic bags to prevent storage pests without chemicals','Clean storage areas before filling with new harvest','Monitor stored grain temperature and moisture regularly'] },
  ],
  'ta-IN': [
    { id: 'crop', icon: '🌾', title: 'பயிர் மேலாண்மை', color: '#1a7a32', bg: '#e8f5e9',
      tips: ['விதைக்கு முன் 24 மணி நேரம் ஊறவைக்கவும்','மண் பரிசோதனை செய்த பிறகே உரம் இடவும்','பயிர் சுழற்சி முறையை பின்பற்றவும்','சான்றளிக்கப்பட்ட விதைகளை பயன்படுத்தவும்','செடிகளுக்கு இடையே சரியான இடைவெளி விடவும்'] },
    { id: 'pest', icon: '🐛', title: 'பூச்சி & நோய் கட்டுப்பாடு', color: '#e65100', bg: '#fff3e0',
      tips: ['வேப்பெண்ணெய் கரைசல் தெளிக்கவும்','நண்பகல் நேரத்தில் பூச்சிக்கொல்லி தெளிக்காதீர்கள்','மஞ்சள் ஒட்டும் பொறி வைக்கவும்','நோய் தாக்கிய செடிகளை உடனே அகற்றவும்','பூச்சிக்கொல்லிகளை மாற்றி மாற்றி பயன்படுத்தவும்'] },
    { id: 'water', icon: '💧', title: 'நீர் & நீர்ப்பாசனம்', color: '#1565c0', bg: '#e3f2fd',
      tips: ['சொட்டு நீர்ப்பாசனம் 40% நீர் மிச்சப்படுத்தும்','காலை அல்லது மாலையில் நீர் பாய்ச்சவும்','மழை நீர் சேகரிக்கவும்','நீர் பாய்ச்சுவதற்கு முன் மண் ஈரப்பதம் சரிபார்க்கவும்','மல்ச்சிங் மூலம் நீர் ஆவியாவதை குறைக்கலாம்'] },
  ],
  'te-IN': [
    { id: 'crop', icon: '🌾', title: 'పంట నిర్వహణ', color: '#1a7a32', bg: '#e8f5e9',
      tips: ['విత్తనాలు వేయడానికి ముందు 24 గంటలు నానబెట్టండి','ఎరువు వేయడానికి ముందు మట్టి పరీక్ష చేయండి','పంట మార్పిడి పద్ధతి అనుసరించండి','ధృవీకరించిన విత్తనాలు ఉపయోగించండి','మొక్కల మధ్య సరైన దూరం ఉంచండి'] },
    { id: 'pest', icon: '🐛', title: 'పురుగుల నియంత్రణ', color: '#e65100', bg: '#fff3e0',
      tips: ['వేప నూనె సేంద్రీయ పురుగుమందుగా వాడండి','మధ్యాహ్నం పురుగుమందు చల్లకండి','పసుపు అంటుకునే ఉచ్చులు పెట్టండి','సోకిన మొక్కలను వెంటనే తొలగించండి','పురుగుమందులు మార్చి మార్చి వాడండి'] },
    { id: 'water', icon: '💧', title: 'నీటిపారుదల', color: '#1565c0', bg: '#e3f2fd',
      tips: ['బిందు సేద్యం 40% నీరు ఆదా చేస్తుంది','ఉదయం లేదా సాయంత్రం నీరు పెట్టండి','వర్షపు నీరు సేకరించండి','నీరు పెట్టే ముందు మట్టి తేమ తనిఖీ చేయండి','మల్చింగ్ ద్వారా నీటి నష్టం తగ్గించవచ్చు'] },
  ],
  'kn-IN': [
    { id: 'crop', icon: '🌾', title: 'ಬೆಳೆ ನಿರ್ವಹಣೆ', color: '#1a7a32', bg: '#e8f5e9',
      tips: ['ಬಿತ್ತನೆ ಮೊದಲು 24 ಗಂಟೆ ಬೀಜ ನೆನೆಸಿ','ಗೊಬ್ಬರ ಹಾಕುವ ಮೊದಲು ಮಣ್ಣು ಪರೀಕ್ಷಿಸಿ','ಬೆಳೆ ಸರದಿ ಪದ್ಧತಿ ಅನುಸರಿಸಿ','ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳನ್ನು ಬಳಸಿ','ಗಿಡಗಳ ನಡುವೆ ಸರಿಯಾದ ಅಂತರ ಇಡಿ'] },
    { id: 'pest', icon: '🐛', title: 'ಕೀಟ ನಿಯಂತ್ರಣ', color: '#e65100', bg: '#fff3e0',
      tips: ['ಬೇವಿನ ಎಣ್ಣೆ ಸಾವಯವ ಕೀಟನಾಶಕವಾಗಿ ಬಳಸಿ','ಮಧ್ಯಾಹ್ನ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ','ಹಳದಿ ಅಂಟು ಬಲೆ ಇಡಿ','ರೋಗ ತಗುಲಿದ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆಯಿರಿ','ಕೀಟನಾಶಕಗಳನ್ನು ಬದಲಾಯಿಸಿ ಬಳಸಿ'] },
    { id: 'water', icon: '💧', title: 'ನೀರಾವರಿ', color: '#1565c0', bg: '#e3f2fd',
      tips: ['ಹನಿ ನೀರಾವರಿ 40% ನೀರು ಉಳಿಸುತ್ತದೆ','ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರು ಹಾಯಿಸಿ','ಮಳೆ ನೀರು ಸಂಗ್ರಹಿಸಿ','ನೀರು ಹಾಯಿಸುವ ಮೊದಲು ಮಣ್ಣಿನ ತೇವ ಪರೀಕ್ಷಿಸಿ','ಮಲ್ಚಿಂಗ್ ಮೂಲಕ ನೀರಿನ ನಷ್ಟ ಕಡಿಮೆ ಮಾಡಿ'] },
  ],
  'ml-IN': [
    { id: 'crop', icon: '🌾', title: 'വിള നിർവഹണം', color: '#1a7a32', bg: '#e8f5e9',
      tips: ['വിതയ്ക്കുന്നതിന് മുമ്പ് 24 മണിക്കൂർ വിത്ത് കുതിർക്കുക','വളം ഇടുന്നതിന് മുമ്പ് മണ്ണ് പരിശോധിക്കുക','വിള ഭ്രമണ രീതി പിന്തുടരുക','സർട്ടിഫൈഡ് വിത്തുകൾ ഉപയോഗിക്കുക','ചെടികൾക്കിടയിൽ ശരിയായ അകലം നൽകുക'] },
    { id: 'pest', icon: '🐛', title: 'കീട നിയന്ത്രണം', color: '#e65100', bg: '#fff3e0',
      tips: ['വേപ്പ് എണ്ണ ജൈവ കീടനാശിനിയായി ഉപയോഗിക്കുക','ഉച്ചനേരത്ത് കീടനാശിനി തളിക്കരുത്','മഞ്ഞ ഒട്ടുകെണി സ്ഥാപിക്കുക','രോഗം ബാധിച്ച ചെടികൾ ഉടൻ നീക്കം ചെയ്യുക','കീടനാശിനികൾ മാറ്റി മാറ്റി ഉപയോഗിക്കുക'] },
    { id: 'water', icon: '💧', title: 'ജലസേചനം', color: '#1565c0', bg: '#e3f2fd',
      tips: ['തുള്ളി ജലസേചനം 40% വെള്ളം ലാഭിക്കുന്നു','രാവിലെ അല്ലെങ്കിൽ വൈകുന്നേരം നനയ്ക്കുക','മഴവെള്ളം ശേഖരിക്കുക','നനയ്ക്കുന്നതിന് മുമ്പ് മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക','മൾച്ചിംഗ് വഴി ജലനഷ്ടം കുറയ്ക്കാം'] },
  ],
};

export default function TipsPage() {
  const { lang } = useLang();
  const [active, setActive] = useState('crop');
  const cats = CATEGORIES[lang.code] || CATEGORIES['en-IN'];
  const current = cats.find(c => c.id === active) || cats[0];

  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - var(--nav-h))' }}>

      {/* Header with real photo */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '200px', display: 'flex', alignItems: 'flex-end' }}>
        <img src={HERO_IMG} alt="Farming tips" loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(230,81,0,0.85), rgba(255,143,0,0.7))' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '48px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <div style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>
            {lang.code === 'ta-IN' ? '💡 விவசாய குறிப்புகள்' : lang.code === 'hi-IN' ? '💡 कृषि सुझाव' : lang.code === 'te-IN' ? '💡 వ్యవసాయ చిట్కాలు' : lang.code === 'kn-IN' ? '💡 ಕೃಷಿ ಸಲಹೆಗಳು' : lang.code === 'ml-IN' ? '💡 കൃഷി നുറുങ്ങുകൾ' : '💡 Farming Tips'}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
            {lang.code === 'ta-IN' ? 'சிறந்த விவசாய குறிப்புகள்' : lang.code === 'hi-IN' ? 'बेहतरीन कृषि सुझाव' : lang.code === 'te-IN' ? 'మెరుగైన దిగుబడికి నిపుణుల సలహా' : lang.code === 'kn-IN' ? 'ಉತ್ತಮ ಇಳುವರಿಗೆ ತಜ್ಞರ ಸಲಹೆ' : lang.code === 'ml-IN' ? 'മികച്ച വിളവിനായി വിദഗ്ധ ഉപദേശം' : 'Expert advice for better yields and healthier crops'}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>

        {/* Category sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px', flex: '0 0 200px' }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
              borderRadius: '12px', border: 'none', cursor: 'pointer', textAlign: 'left',
              background: active === c.id ? '#fff' : 'transparent',
              boxShadow: active === c.id ? 'var(--shadow)' : 'none',
              color: active === c.id ? c.color : '#555',
              fontWeight: active === c.id ? '700' : '500', fontSize: '14px',
              borderLeft: active === c.id ? `3px solid ${c.color}` : '3px solid transparent',
            }}>
              <span style={{ fontSize: '20px' }}>{c.icon}</span> {c.title}
            </button>
          ))}
        </div>

        {/* Tips content */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            {/* Category image banner */}
            <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
              <img src={CAT_IMGS[current.id] || CAT_IMGS.crop} alt={current.title} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)' }} />
              <div style={{ position: 'absolute', bottom: '18px', left: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '30px' }}>{current.icon}</span>
                <span style={{ fontSize: '22px', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px' }}>{current.title}</span>
              </div>
            </div>
            <div style={{ padding: '8px 0' }}>
              {current.tips.map((tip, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '16px 24px', borderBottom: i < current.tips.length - 1 ? '1px solid #f5f5f5' : 'none',
                }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: current.bg, color: current.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px', flexShrink: 0, marginTop: '1px' }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '15px', color: '#333', lineHeight: '1.6' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
