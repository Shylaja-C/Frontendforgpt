content = open('src/components/HomePage.jsx', 'r', encoding='utf-8-sig').read()

old = '      {/* FEATURES */}'

new = '''      {/* PLANT DOCTOR BANNER */}
      <section style={{ background: 'linear-gradient(135deg,#1b5e20,#2e7d32)', padding: '48px 32px', position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=60" alt="soil" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1140px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px' }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '6px 14px', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', color: '#a5d6a7', fontWeight: '700' }}>NEW FEATURE</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: '900', margin: '0 0 12px', lineHeight: 1.2 }}>
              🌿 Plant Doctor
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', lineHeight: 1.7, margin: '0 0 24px' }}>
              Is your crop sick? Just take a photo. Our AI instantly detects the disease, tells you the urgency level, and gives you a step-by-step treatment plan.
            </p>
            <button onClick={() => navigate('/plant')} style={{ background: '#fff', color: '#1b5e20', borderRadius: '12px', padding: '14px 28px', fontSize: '16px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <Microscope size={20} /> Scan My Crop <ArrowRight size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '220px' }}>
            {[
              { icon: '🔍', text: 'Instant disease detection' },
              { icon: '🚨', text: 'Urgency: HIGH / MEDIUM / LOW' },
              { icon: '💊', text: 'Step-by-step treatment plan' },
              { icon: '📊', text: 'Survival probability score' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 16px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}'''

if old in content:
    content = content.replace(old, new, 1)
    open('src/components/HomePage.jsx', 'w', encoding='utf-8').write(content)
    print('Banner added!')
else:
    print('Marker not found')
    idx = content.find('FEATURES')
    print('FEATURES context:', content[idx-10:idx+60])
