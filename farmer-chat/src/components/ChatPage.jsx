import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mic, MicOff, Send, Volume2, Trash2, Bot } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { LANGUAGES, SARVAM_API_KEY, SYSTEM_PROMPT, t } from '../config';

const MEMORY_KEY = 'farmbot_chat_history';

async function getAIReply(messages) {
  try {
    const res = await fetch('https://8o1dkzbrlc.execute-api.us-east-1.amazonaws.com/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages], max_tokens: 300 }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || data.message || 'Sorry, try again.';
  } catch { return 'Network error. Please check your connection.'; }
}

async function sarvamSpeak(text, langCode) {
  try {
    const res = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-subscription-key': SARVAM_API_KEY },
      body: JSON.stringify({ inputs: [text], target_language_code: langCode, speaker: 'meera', model: 'bulbul:v1' }),
    });
    const data = await res.json();
    if (data.audios?.[0]) { new Audio(`data:audio/wav;base64,${data.audios[0]}`).play(); return; }
  } catch { /* fallback */ }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  window.speechSynthesis.speak(u);
}

function now() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
function loadMemory() { try { return JSON.parse(localStorage.getItem(MEMORY_KEY)) || []; } catch { return []; } }
function saveMemory(msgs) { localStorage.setItem(MEMORY_KEY, JSON.stringify(msgs.slice(-20))); }

const QUICK_TOPICS = [
  { emoji: '🌾', prompt: 'Crop Advice' },
  { emoji: '🐛', prompt: 'Pest Control' },
  { emoji: '💧', prompt: 'Irrigation Tips' },
  { emoji: '🌱', prompt: 'Fertilizer Guide' },
  { emoji: '🌦️', prompt: 'Weather Advice' },
  { emoji: '💰', prompt: 'Market Prices' },
];

export default function ChatPage() {
  const location = useLocation();
  const { lang, changeLang } = useLang();

  const getWelcome = (l) => ({ role: 'assistant', content: t(l, 'chatWelcome'), time: now() });
  const saved = loadMemory();
  const [messages, setMessages] = useState(saved.length ? saved : [getWelcome(lang)]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { if (location.state?.prompt) handleSend(location.state.prompt); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => { saveMemory(messages); }, [messages]);

  async function handleSend(text) {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    const userMsg = { role: 'user', content: msg, time: now() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);
    const reply = await getAIReply(updated.map(m => ({ role: m.role, content: m.content })));
    setMessages(prev => [...prev, { role: 'assistant', content: reply, time: now() }]);
    setLoading(false);
    inputRef.current?.focus();
  }

  function toggleVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice input not supported on this browser.'); return; }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    rec.lang = lang.code;
    rec.interimResults = false;
    rec.onresult = e => { setInput(e.results[0][0].transcript); setListening(false); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }

  function clearChat() {
    const fresh = [getWelcome(lang)];
    setMessages(fresh);
    saveMemory(fresh);
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--nav-h))', background: 'var(--bg)' }}>

      {/* LEFT SIDEBAR */}
      <aside className="hide-mobile" style={{
        width: '280px', flexShrink: 0, background: '#fff',
        borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
        padding: '20px 16px', gap: '20px', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: '#e8f5e9', borderRadius: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg,#1a7a32,#25a244)', borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: '#1a7a32' }}>FarmBot AI</div>
            <div style={{ fontSize: '12px', color: '#555' }}>{t(lang, 'online')}</div>
          </div>
        </div>

        {/* Farm photo */}
        <div style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative', height: '110px', flexShrink: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80"
            alt="farm field"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,40,15,0.75), transparent)' }} />
          <div style={{ position: 'absolute', bottom: '10px', left: '12px', color: '#fff', fontSize: '12px', fontWeight: '600' }}>🌾 FarmBot</div>
        </div>

        {/* Quick topics */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Quick Topics</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {QUICK_TOPICS.map((topic, i) => (
              <button key={i} onClick={() => handleSend(topic.prompt)} style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
                borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: 'transparent', color: '#333', fontSize: '14px',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f7f0'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: '18px' }}>{topic.emoji}</span>
                {topic.prompt}
              </button>
            ))}
          </div>
        </div>

        <button onClick={clearChat} style={{
          marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          padding: '10px', borderRadius: '10px', border: '1px solid #ffcdd2',
          background: '#fff5f5', color: '#c62828', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Trash2 size={14} /> {t(lang, 'clearChat')}
        </button>
      </aside>

      {/* CHAT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ background: 'linear-gradient(135deg,#1a7a32,#25a244)', borderRadius: '10px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={20} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '700', fontSize: '15px' }}>FarmBot AI</div>
            <div style={{ fontSize: '12px', color: '#25a244' }}>● {t(lang, 'online')}</div>
          </div>
          <select className="hide-desktop" value={lang.code} onChange={e => changeLang(e.target.value)}
            style={{ background: '#f0f7f0', border: '1px solid #c8e6c9', borderRadius: '8px', padding: '6px 8px', fontSize: '13px', color: '#1a7a32', fontWeight: '600' }}>
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
          <button className="hide-desktop" onClick={clearChat}
            style={{ background: '#fff5f5', border: '1px solid #ffcdd2', borderRadius: '8px', padding: '7px', color: '#c62828', cursor: 'pointer', display: 'flex' }}>
            <Trash2 size={15} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f9fafb' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '10px', alignItems: 'flex-end' }}>
              {m.role === 'assistant' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#1a7a32,#25a244)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={16} color="#fff" />
                </div>
              )}
              <div style={{
                background: m.role === 'user' ? 'linear-gradient(135deg,#1a7a32,#25a244)' : '#fff',
                color: m.role === 'user' ? '#fff' : '#1a1a1a',
                padding: '12px 16px',
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                maxWidth: '65%', fontSize: '15px', lineHeight: '1.6',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}>
                {m.content}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginTop: '6px' }}>
                  <span style={{ fontSize: '11px', opacity: 0.6 }}>{m.time}</span>
                  {m.role === 'assistant' && (
                    <button onClick={() => sarvamSpeak(m.content, lang.sarvam)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#25a244', display: 'flex', padding: 0 }}>
                      <Volume2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#1a7a32,#25a244)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} color="#fff" />
              </div>
              <div style={{ background: '#fff', padding: '14px 18px', borderRadius: '18px 18px 18px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: '5px', alignItems: 'center' }}>
                {[0,1,2].map(i => <span key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25a244', display: 'inline-block', animation: `bounce 1.2s ${i*0.2}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Mobile quick chips */}
        <div className="hide-desktop" style={{ background: '#fff', padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
          {QUICK_TOPICS.map((topic, i) => (
            <button key={i} onClick={() => handleSend(topic.prompt)} style={{
              background: '#f0f7f0', border: '1px solid #c8e6c9', color: '#1a7a32',
              borderRadius: '16px', padding: '5px 12px', fontSize: '12px', fontWeight: '600',
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {topic.emoji} {topic.prompt}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '14px 20px', display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
          <button onClick={toggleVoice} style={{
            background: listening ? '#e53935' : '#f0f7f0',
            border: listening ? 'none' : '1px solid #c8e6c9',
            color: listening ? '#fff' : '#25a244', borderRadius: '12px',
            width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            ref={inputRef}
            style={{ flex: 1, background: '#f4f6f4', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 18px', fontSize: '15px', color: '#1a1a1a' }}
            placeholder={listening ? 'Listening...' : t(lang, 'chatPlaceholder')}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          />
          <button onClick={() => handleSend()} style={{
            background: input.trim() ? 'linear-gradient(135deg,#1a7a32,#25a244)' : '#e0e0e0',
            color: input.trim() ? '#fff' : '#aaa', borderRadius: '12px',
            width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            transition: 'all 0.2s', border: 'none', cursor: 'pointer',
          }}>
            <Send size={20} />
          </button>
        </div>
      </div>

      <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>
    </div>
  );
}
