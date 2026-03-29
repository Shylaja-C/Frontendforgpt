component = """
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
"""

with open('src/components/SchemesPage.jsx', 'a', encoding='utf-8') as f:
    f.write(component)

content = open('src/components/SchemesPage.jsx', 'r', encoding='utf-8').read()
print('Has default export:', 'export default' in content)
print('Total lines:', content.count('\n'))
