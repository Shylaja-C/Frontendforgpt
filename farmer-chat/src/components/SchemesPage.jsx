import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Search, Phone } from 'lucide-react';
import { useLang } from '../context/LangContext';

const TX = {
  title:    { 'ta-IN': 'அரசு திட்டங்கள்', 'hi-IN': 'सरकारी योजनाएं', 'te-IN': 'ప్రభుత్వ పథకాలు', 'kn-IN': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', 'ml-IN': 'സർക്കാർ പദ്ധതികൾ', 'en-IN': 'Government Schemes' },
  subtitle: { 'ta-IN': '10 மத்திய அரசு திட்டங்கள் — மார்ச் 2026', 'hi-IN': '10 केंद्रीय योजनाएं — मार्च 2026', 'te-IN': '10 కేంద్ర పథకాలు — మార్చి 2026', 'kn-IN': '10 ಕೇಂದ್ರ ಯೋಜನೆಗಳು — ಮಾರ್ಚ್ 2026', 'ml-IN': '10 കേന്ദ്ര പദ്ധതികൾ — മാർച്ച് 2026', 'en-IN': '10 active Central Government schemes for Indian farmers' },
  search:   { 'ta-IN': 'திட்டங்களை தேடுங்கள்...', 'hi-IN': 'योजनाएं खोजें...', 'te-IN': 'పథకాలు వెతకండి...', 'kn-IN': 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...', 'ml-IN': 'പദ്ധതികൾ തിരയുക...', 'en-IN': 'Search schemes...' },
  all:      { 'ta-IN': 'அனைத்தும்', 'hi-IN': 'सभी', 'te-IN': 'అన్నీ', 'kn-IN': 'ಎಲ್ಲಾ', 'ml-IN': 'എല്ലാം', 'en-IN': 'All' },
  benefits: { 'ta-IN': 'முக்கிய நன்மைகள்', 'hi-IN': 'मुख्य लाभ', 'te-IN': 'ముఖ్య ప్రయోజనాలు', 'kn-IN': 'ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು', 'ml-IN': 'പ്രധാന ആനുകൂല്യങ്ങൾ', 'en-IN': 'Key Benefits' },
  howApply: { 'ta-IN': 'விண்ணப்பிக்கும் முறை', 'hi-IN': 'आवेदन कैसे करें', 'te-IN': 'దరఖాస్తు ఎలా చేయాలి', 'kn-IN': 'ಅರ್ಜಿ ಹೇಗೆ ಸಲ್ಲಿಸುವುದು', 'ml-IN': 'എങ്ങനെ അപേക്ഷിക്കാം', 'en-IN': 'How to Apply' },
  visit:    { 'ta-IN': 'இணையதளம் பார்க்க', 'hi-IN': 'वेबसाइट देखें', 'te-IN': 'వెబ్‌సైట్ చూడండి', 'kn-IN': 'ವೆಬ್‌ಸೈಟ್ ನೋಡಿ', 'ml-IN': 'വെബ്‌സൈറ്റ് കാണുക', 'en-IN': 'Visit' },
  helpline: { 'ta-IN': 'உதவி எண்', 'hi-IN': 'हेल्पलाइन', 'te-IN': 'హెల్ప్‌లైన్', 'kn-IN': 'ಸಹಾಯವಾಣಿ', 'ml-IN': 'ഹെൽപ്‌ലൈൻ', 'en-IN': 'Helpline' },
  badge:    { 'ta-IN': '🇮🇳 இந்திய அரசு · 2026', 'hi-IN': '🇮🇳 भारत सरकार · 2026', 'te-IN': '🇮🇳 భారత ప్రభుత్వం · 2026', 'kn-IN': '🇮🇳 ಭಾರತ ಸರ್ಕಾರ · 2026', 'ml-IN': '🇮🇳 ഭാരത സർക്കാർ · 2026', 'en-IN': '🇮🇳 Government of India · 2026' },
  disclaimer: { 'ta-IN': 'அனைத்து தகவல்களும் மார்ச் 2026 நிலவரப்படி சரிபார்க்கப்பட்டவை. அதிகாரப்பூர்வ அரசு இணையதளங்களில் சரிபார்க்கவும்.', 'hi-IN': 'सभी जानकारी मार्च 2026 तक सत्यापित है। आधिकारिक सरकारी वेबसाइटों पर जांच करें।', 'te-IN': 'అన్ని సమాచారం మార్చి 2026 వరకు ధృవీకరించబడింది. అధికారిక వెబ్‌సైట్‌లలో తనిఖీ చేయండి.', 'kn-IN': 'ಎಲ್ಲಾ ಮಾಹಿತಿಯು ಮಾರ್ಚ್ 2026 ರವರೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.', 'ml-IN': 'എല്ലാ വിവരങ്ങളും മാർച്ച് 2026 വരെ പരിശോധിച്ചിട്ടുണ്ട്. ഔദ്യോഗിക വെബ്‌സൈറ്റുകളിൽ പരിശോധിക്കുക.', 'en-IN': 'All links and information are verified as of March 2026. Always cross-verify on official government websites before advising farmers.' },
};

const CATS = {
  'Direct Income Support':          { 'ta-IN': 'நேரடி வருமான ஆதரவு', 'hi-IN': 'प्रत्यक्ष आय सहायता', 'te-IN': 'ప్రత్యక్ష ఆదాయ మద్దతు', 'kn-IN': 'ನೇರ ಆದಾಯ ಬೆಂಬಲ', 'ml-IN': 'നേരിട്ടുള്ള വരുമാന പിന്തുണ', 'en-IN': 'Direct Income Support' },
  'Crop Insurance':                 { 'ta-IN': 'பயிர் காப்பீடு', 'hi-IN': 'फसल बीमा', 'te-IN': 'పంట బీమా', 'kn-IN': 'ಬೆಳೆ ವಿಮೆ', 'ml-IN': 'വിള ഇൻഷുറൻസ്', 'en-IN': 'Crop Insurance' },
  'Agricultural Credit':            { 'ta-IN': 'விவசாய கடன்', 'hi-IN': 'कृषि ऋण', 'te-IN': 'వ్యవసాయ రుణం', 'kn-IN': 'ಕೃಷಿ ಸಾಲ', 'ml-IN': 'കാർഷിക വായ്പ', 'en-IN': 'Agricultural Credit' },
  'Soil & Input Management':        { 'ta-IN': 'மண் மேலாண்மை', 'hi-IN': 'मृदा प्रबंधन', 'te-IN': 'నేల నిర్వహణ', 'kn-IN': 'ಮಣ್ಣು ನಿರ್ವಹಣೆ', 'ml-IN': 'മണ്ണ് മാനേജ്മെന്റ്', 'en-IN': 'Soil Management' },
  'Irrigation & Water Management':  { 'ta-IN': 'நீர்ப்பாசனம்', 'hi-IN': 'सिंचाई प्रबंधन', 'te-IN': 'నీటిపారుదల', 'kn-IN': 'ನೀರಾವರಿ', 'ml-IN': 'ജലസേചനം', 'en-IN': 'Irrigation' },
  'Organic Farming':                { 'ta-IN': 'இயற்கை விவசாயம்', 'hi-IN': 'जैविक खेती', 'te-IN': 'సేంద్రీయ వ్యవసాయం', 'kn-IN': 'ಸಾವಯವ ಕೃಷಿ', 'ml-IN': 'ജൈവ കൃഷി', 'en-IN': 'Organic Farming' },
  'Market Linkage':                 { 'ta-IN': 'சந்தை இணைப்பு', 'hi-IN': 'बाज़ार संपर्क', 'te-IN': 'మార్కెట్ అనుసంధానం', 'kn-IN': 'ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ', 'ml-IN': 'മാർക്കറ്റ് ലിങ്കേജ്', 'en-IN': 'Market Linkage' },
  'Farm Equipment Subsidy':         { 'ta-IN': 'விவசாய இயந்திர மானியம்', 'hi-IN': 'कृषि उपकरण सब्सिडी', 'te-IN': 'వ్యవసాయ పరికరాల సబ్సిడీ', 'kn-IN': 'ಕೃಷಿ ಯಂತ್ರ ಸಹಾಯಧನ', 'ml-IN': 'കാർഷിക ഉപകരണ സബ്സിഡി', 'en-IN': 'Farm Equipment Subsidy' },
  'Post-Harvest Infrastructure':    { 'ta-IN': 'அறுவடை பின் உள்கட்டமைப்பு', 'hi-IN': 'कटाई के बाद का बुनियादी ढांचा', 'te-IN': 'పంట తర్వాత మౌలిక సదుపాయాలు', 'kn-IN': 'ಕೊಯ್ಲಿನ ನಂತರದ ಮೂಲಸೌಕರ್ಯ', 'ml-IN': 'വിളവെടുപ്പ് ശേഷമുള്ള അടിസ്ഥാന സൗകര്യം', 'en-IN': 'Post-Harvest Infrastructure' },
  'Scheme Discovery Tool':          { 'ta-IN': 'திட்ட கண்டுபிடிப்பு கருவி', 'hi-IN': 'योजना खोज उपकरण', 'te-IN': 'పథకం ఆవిష్కరణ సాధనం', 'kn-IN': 'ಯೋಜನೆ ಅನ್ವೇಷಣೆ ಸಾಧನ', 'ml-IN': 'പദ്ധതി കണ്ടെത്തൽ ഉപകരണം', 'en-IN': 'Scheme Discovery Tool' },
};

function tx(lang, key) { return TX[key]?.[lang.code] || TX[key]?.['en-IN'] || key; }
function tcat(lang, key) { return CATS[key]?.[lang.code] || CATS[key]?.['en-IN'] || key; }

const SCHEMES = [
  { id:'01', emoji:'💰', color:'#1a7a32', bg:'#e8f5e9', name:'PM-KISAN', full:'Pradhan Mantri Kisan Samman Nidhi', category:'Direct Income Support', portal:'pmkisan.gov.in', url:'https://pmkisan.gov.in', what:'Provides Rs.6,000 per year to all landholding farmer families in three equal installments of Rs.2,000 each, transferred directly to bank accounts via DBT.', benefits:['Direct cash support of Rs.6,000/year for seeds, fertilizers, and pesticides','22nd installment (March 2026) disbursed Rs.18,640 crore to 9.32 crore farmer families','Reduces dependency on moneylenders for seasonal needs'], steps:['Visit pmkisan.gov.in - Farmers Corner - New Farmer Registration','Enter Aadhaar number, select state, fill land and bank details','Complete e-KYC via portal, PM-KISAN mobile app, or nearest CSC','State/UT governments verify land records and disburse benefits'], helpline:'155261 / 011-24300606' },
  { id:'02', emoji:'🌾', color:'#1565c0', bg:'#e3f2fd', name:'PMFBY', full:'Pradhan Mantri Fasal Bima Yojana', category:'Crop Insurance', portal:'pmfby.gov.in', url:'https://pmfby.gov.in', what:'Provides affordable crop insurance covering all non-preventable natural risks from pre-sowing to post-harvest including storms, hailstorm, flood, drought, pests, and diseases.', benefits:['Premium only 2% for Kharif crops and 1.5% for Rabi crops; rest paid by governments','Over Rs.95,000 crore in claims paid to farmers since 2016','Covers post-harvest losses within 14 days of harvesting'], steps:['Visit pmfby.gov.in - Farmer Registration before crop season','Register before July for Kharif crops, December for Rabi crops','Apply through any bank branch, CSC, or insurance company agent','If crop is damaged, report loss within 72 hours on the portal'], helpline:'14447' },
  { id:'03', emoji:'💳', color:'#b45309', bg:'#fef3c7', name:'KCC', full:'Kisan Credit Card', category:'Agricultural Credit', portal:'jansamarth.in', url:'https://jansamarth.in/kisan-credit-card-scheme', what:'Provides timely and adequate credit to farmers for production, contingency, and ancillary activity expenses through a simplified revolving cash credit account.', benefits:['3% per annum interest subvention for loans up to Rs.3 lakh; collateral waived up to Rs.2 lakh','RuPay debit card issued to all eligible KCC borrowers','Credit limit increases 10% annually over 5-year tenure'], steps:['Apply online at jansamarth.in or visit any bank branch (SBI, PNB, cooperative banks)','Carry: Aadhaar, land ownership proof, passport photo, and crop details','SBI customers can apply via the YONO App for a contactless, paperless journey','PM-KISAN beneficiaries get priority processing for KCC'], helpline:null },
  { id:'04', emoji:'🌱', color:'#0f766e', bg:'#f0fdfa', name:'Soil Health Card', full:'Soil Health Card (SHC) Scheme', category:'Soil & Input Management', portal:'soilhealth.dac.gov.in', url:'https://soilhealth.dac.gov.in', what:'Provides farmers a free soil nutrient report with specific recommendations on fertilizer use and pH levels, covering 14 crore farmer holdings across India.', benefits:['10-15% yield boost via optimized fertilizer use','Reduces fertilizer costs by 20-30% (approx Rs.2,000/hectare saved)','Guides crop selection based on actual soil composition'], steps:['Visit soilhealth.dac.gov.in or go to nearest CSC or agriculture office','Submit Aadhaar, mobile number, land records, and crop type','Verify via OTP and allow soil sample collection from your field','Receive Soil Health Card in 15-30 days via the app or CSC'], helpline:'1800-180-1551' },
  { id:'05', emoji:'💧', color:'#0369a1', bg:'#e0f2fe', name:'PMKSY', full:'Pradhan Mantri Krishi Sinchayee Yojana', category:'Irrigation & Water Management', portal:'pmksy.gov.in', url:'https://pmksy.gov.in', what:'Extends irrigation coverage with the vision of Har Khet ko Pani and improves water use efficiency through More Crop Per Drop.', benefits:['Subsidies on drip and sprinkler irrigation systems','96.83 lakh hectares covered under micro-irrigation (2015-2025)','Union Budget 2025-26 allocated Rs.8,259.85 crore to PMKSY'], steps:['Visit pmksy.gov.in or contact your district agriculture office','Apply for drip/sprinkler subsidy through state agriculture department portal','For watershed development, contact your Block Development Officer (BDO)','Micro-irrigation loans available through NABARD under the Micro Irrigation Fund'], helpline:null },
  { id:'06', emoji:'🌿', color:'#4d7c0f', bg:'#f7fee7', name:'PKVY', full:'Paramparagat Krishi Vikas Yojana', category:'Organic Farming', portal:'myscheme.gov.in/schemes/pkvy', url:'https://myscheme.gov.in/schemes/pkvy', what:'India flagship organic farming scheme where farmers are mobilized into clusters of 20 hectares to collectively adopt organic methods, receive financial assistance and certification.', benefits:['Financial assistance of Rs.50,000/hectare for 3 years; Rs.31,000/ha directly via DBT','Support for organic certification under PGS-India','25.30 lakh farmers have benefitted across 52,289 clusters as of Feb 2025'], steps:['Contact your State Agriculture Department or Regional Council','Form or join a farmer cluster group (minimum 20 hectares combined area)','Regional Council compiles applications into Annual Action Plan for Ministry','Funds flow: Central Govt to State Govt to Regional Council to Farmer (DBT)'], helpline:null },
  { id:'07', emoji:'��', color:'#7c3aed', bg:'#ede9fe', name:'eNAM', full:'National Agriculture Market', category:'Market Linkage', portal:'enam.gov.in', url:'https://enam.gov.in', what:'A pan-India electronic trading portal networking existing APMC mandis to create a unified national market, promoting transparent price discovery and online payment.', benefits:['Sell produce to buyers across India - not just local mandis','1.77 crore farmers and 2.53 lakh traders registered; 1,389 mandis integrated','Reduces middlemen and significantly improves price realization'], steps:['Register at enam.gov.in/registration with Aadhaar, bank details, and commodity info','Or register at your nearest APMC mandi office in person','List produce on the platform and receive competitive bids from across India','Payment received directly in bank account after sale'], helpline:'1800 270 0224' },
  { id:'08', emoji:'🚜', color:'#92400e', bg:'#fef3c7', name:'SMAM', full:'Sub-Mission on Agricultural Mechanization', category:'Farm Equipment Subsidy', portal:'farmech.dac.gov.in', url:'https://farmech.dac.gov.in', what:'Provides subsidies on farm machinery and equipment - tractors, power tillers, harvesters, threshers, and more - to reduce labor costs and improve farm productivity.', benefits:['Subsidies range from 20-50% of equipment cost','SC/ST farmers in some states receive up to Rs.3 lakh or 50% subsidy on tractors','Equipment available via subsidized Custom Hiring Centres (CHCs) for small farmers'], steps:['Visit farmech.dac.gov.in or your state agriculture department portal','Many states offer online application; selection via lottery or district committee','Carry: Aadhaar, land records, caste certificate (if applicable)','Note: Equipment cannot be sold for 5 years after subsidized purchase'], helpline:null },
  { id:'09', emoji:'🏗️', color:'#be185d', bg:'#fdf2f8', name:'AIF', full:'Agriculture Infrastructure Fund', category:'Post-Harvest Infrastructure', portal:'agriinfra.dac.gov.in', url:'https://agriinfra.dac.gov.in', what:'A Rs.1 lakh crore financing facility for post-harvest management infrastructure - cold storage, warehouses, processing units - at concessional interest rates.', benefits:['3% interest subvention on loans up to Rs.2 crore','Credit guarantee support through CGTMSE for loans up to Rs.2 crore','Available to farmers, FPOs, SHGs, cooperatives, startups, and agri-entrepreneurs'], steps:['Apply online at agriinfra.dac.gov.in with project proposal and DPR','Submit land/identity documents and project feasibility details','Loan disbursed through participating banks (SBI, NABARD, cooperative banks)','Ideal for farmer groups planning cold storage or food processing units'], helpline:null },
  { id:'10', emoji:'🔍', color:'#374151', bg:'#f3f4f6', name:'myScheme', full:'myScheme - One-Stop Discovery Portal', category:'Scheme Discovery Tool', portal:'myscheme.gov.in', url:'https://myscheme.gov.in', what:'A National Platform offering one-stop search and discovery of all Government schemes, making it easy for citizens to find Central and State schemes they are eligible for.', benefits:['Filter schemes by state, eligibility, crop, land size, and category','Available in multiple Indian languages','Lists both Central and State-level schemes in a unified view'], steps:['Visit the myScheme portal and select Agriculture and Rural Environment category','Enter your state, land size, and farmer profile details','Get instant list of all schemes you qualify for','Click each scheme for description, documents needed, and direct application link'], helpline:null },
];

export default function SchemesPage() {
  const { lang } = useLang();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('All');

  const catKeys = ['All','Direct Income Support','Crop Insurance','Agricultural Credit','Soil & Input Management','Irrigation & Water Management','Organic Farming','Market Linkage','Farm Equipment Subsidy','Post-Harvest Infrastructure','Scheme Discovery Tool'];

  const filtered = SCHEMES.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.full.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
    const matchFilter = filter === 'All' || s.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ minHeight:'100vh', background:'#f8faf8', paddingBottom:'80px' }}>
      <div style={{ background:'linear-gradient(135deg,#1a7a32,#25a244)', padding:'40px 24px 32px', position:'relative', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=60" alt="bg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.12 }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:'800px', margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.15)', borderRadius:'20px', padding:'6px 14px', marginBottom:'14px' }}>
            <span style={{ fontSize:'13px', color:'#fff', fontWeight:'600' }}>{tx(lang,'badge')}</span>
          </div>
          <h1 style={{ color:'#fff', fontSize:'clamp(22px,4vw,36px)', fontWeight:'900', margin:'0 0 8px', lineHeight:1.2 }}>{tx(lang,'title')}</h1>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'15px', margin:'0 0 24px' }}>{tx(lang,'subtitle')}</p>
          <div style={{ position:'relative', maxWidth:'480px' }}>
            <Search size={16} color="#aaa" style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={tx(lang,'search')}
              style={{ width:'100%', padding:'12px 14px 12px 42px', borderRadius:'12px', border:'none', fontSize:'15px', outline:'none', boxSizing:'border-box', background:'#fff' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'800px', margin:'0 auto', padding:'24px 16px' }}>
        <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'8px', marginBottom:'20px' }}>
          {catKeys.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ flexShrink:0, padding:'7px 16px', borderRadius:'20px', border:'none', cursor:'pointer', fontSize:'13px', fontWeight:'600', background: filter===c ? '#1a7a32' : '#fff', color: filter===c ? '#fff' : '#555', boxShadow:'0 1px 4px rgba(0,0,0,0.08)' }}>
              {c === 'All' ? tx(lang,'all') : tcat(lang,c)}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {filtered.map(s => (
            <div key={s.id} style={{ background:'#fff', borderRadius:'18px', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', border:'1px solid #eee' }}>
              <button onClick={() => setExpanded(expanded===s.id ? null : s.id)}
                style={{ width:'100%', padding:'18px 20px', display:'flex', alignItems:'center', gap:'14px', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                <div style={{ width:'48px', height:'48px', borderRadius:'14px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 }}>{s.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                    <span style={{ fontWeight:'800', fontSize:'16px', color:'#0f1f12' }}>{s.name}</span>
                    <span style={{ background:s.bg, color:s.color, fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'10px' }}>{tcat(lang,s.category)}</span>
                  </div>
                  <div style={{ fontSize:'13px', color:'#666', marginTop:'2px' }}>{s.full}</div>
                </div>
                <div style={{ flexShrink:0, color:'#aaa' }}>{expanded===s.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</div>
              </button>
              {expanded===s.id && (
                <div style={{ padding:'0 20px 20px', borderTop:'1px solid #f0f0f0' }}>
                  <p style={{ fontSize:'14px', color:'#444', lineHeight:1.7, margin:'16px 0 14px' }}>{s.what}</p>
                  <div style={{ marginBottom:'16px' }}>
                    <div style={{ fontSize:'13px', fontWeight:'700', color:s.color, marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.5px' }}>{tx(lang,'benefits')}</div>
                    {s.benefits.map((b,i) => (
                      <div key={i} style={{ display:'flex', gap:'8px', marginBottom:'6px', fontSize:'14px', color:'#333' }}>
                        <span style={{ color:'#25a244', flexShrink:0 }}>✓</span> {b}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom:'16px' }}>
                    <div style={{ fontSize:'13px', fontWeight:'700', color:s.color, marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.5px' }}>{tx(lang,'howApply')}</div>
                    {s.steps.map((step,i) => (
                      <div key={i} style={{ display:'flex', gap:'10px', marginBottom:'8px', fontSize:'14px', color:'#333', alignItems:'flex-start' }}>
                        <span style={{ background:s.bg, color:s.color, borderRadius:'50%', width:'22px', height:'22px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'800', flexShrink:0, marginTop:'1px' }}>{i+1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center' }}>
                    {s.helpline && (
                      <div style={{ display:'flex', alignItems:'center', gap:'6px', background:'#f0f7f0', borderRadius:'10px', padding:'8px 14px', fontSize:'13px', color:'#1a7a32', fontWeight:'600' }}>
                        <Phone size={14}/> {tx(lang,'helpline')}: {s.helpline}
                      </div>
                    )}
                    <a href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex', alignItems:'center', gap:'6px', background:s.color, color:'#fff', borderRadius:'10px', padding:'8px 16px', fontSize:'13px', fontWeight:'700', textDecoration:'none' }}>
                      <ExternalLink size={14}/> {tx(lang,'visit')} {s.portal}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop:'28px', background:'#fff8e1', border:'1px solid #ffe082', borderRadius:'14px', padding:'16px 18px', fontSize:'13px', color:'#7c5c00', lineHeight:1.6 }}>
          ⚠️ {tx(lang,'disclaimer')}
        </div>
      </div>
    </div>
  );
}
