import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mic, MicOff, Send, Volume2, Trash2, Bot, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';
import { LANGUAGES, t, BASE_API_URL } from '../config';

const MEMORY_KEY = 'farmbot_chat_history';
const HISTORY_KEY = 'farmbot_chat_sessions';
const CURRENT_SESSION_KEY = 'farmbot_current_session_id';

async function getAIReply(messages, languageName = 'Hindi', userId = 'anonymous_user_1') {
  try {
    const formData = new FormData();
    const userMsg = messages.filter(m => m.role === 'user').pop();
    const historyExcludingLast = messages.slice(0, -1);
    const firstUserIndex = historyExcludingLast.findIndex(m => m.role === 'user');
    const historyToSend = firstUserIndex !== -1 ? historyExcludingLast.slice(firstUserIndex) : [];
    formData.append('text', userMsg?.content || '');
    formData.append('history', JSON.stringify(historyToSend));
    formData.append('language', languageName);
    formData.append('user_id', userId);
    const res = await fetch(`${BASE_API_URL}/api/chat`, { method: 'POST', body: formData });
    const data = await res.json();
    return data.reply || 'Sorry, try again.';
  } catch (error) {
    console.error('Chat API Error:', error);
    return 'Network error. Please check your connection.';
  }
}

async function sarvamSpeak(text, langName) {
  try {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('language', langName);
    const res = await fetch(`${BASE_API_URL}/api/tts`, { method: 'POST', body: formData });
    const data = await res.json();
    if (data.audio_base64) {
      new Audio(`data:audio/wav;base64,${data.audio_base64}`).play();
      return;
    }
  } catch (error) { console.error('TTS API Error:', error); }
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function now() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
function saveMemory(msgs) { localStorage.setItem(MEMORY_KEY, JSON.stringify(msgs.slice(-20))); }

function loadSessions() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

function saveSessions(sessions) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions.slice(0, 20)));
}

function getOrCreateSessionId() {
  const existing = localStorage.getItem(CURRENT_SESSION_KEY);
  if (existing) return existing;
  const newId = Date.now().toString();
  localStorage.setItem(CURRENT_SESSION_KEY, newId);
  return newId;
}

function parseInline(str) {
  const parts = str.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  return parts.map((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part) || /^__[^_]+__$/.test(part)) {
      return React.createElement('strong', { key: idx }, part.slice(2, -2));
    }
    return part;
  });
}

function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      elements.push(React.createElement('div', { key: 'gap-' + i, style: { height: '6px' } }));
      i++;
      continue;
    }

    if (/^#{1,3} /.test(line)) {
      const level = line.match(/^(#{1,3}) /)[1].length;
      const content = line.replace(/^#{1,3} /, '');
      const sizes = { 1: '17px', 2: '16px', 3: '15px' };
      elements.push(
        React.createElement('div', { key: 'h-' + i, style: { fontWeight: '700', fontSize: sizes[level], color: '#1a7a32', marginTop: '8px', marginBottom: '2px' } },
          parseInline(content)
        )
      );
      i++;
      continue;
    }

    if (/^[-*] /.test(line.trim())) {
      const bulletItems = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
        bulletItems.push(lines[i].trim().replace(/^[-*] /, ''));
        i++;
      }
      elements.push(
        React.createElement('ul', { key: 'ul-' + i, style: { margin: '4px 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '3px' } },
          bulletItems.map((item, idx) =>
            React.createElement('li', { key: idx, style: { fontSize: '15px', lineHeight: '1.5' } }, parseInline(item))
          )
        )
      );
      continue;
    }

    if (/^\d+\. /.test(line.trim())) {
      const numItems = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        numItems.push(lines[i].trim().replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        React.createElement('ol', { key: 'ol-' + i, style: { margin: '4px 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '3px' } },
          numItems.map((item, idx) =>
            React.createElement('li', { key: idx, style: { fontSize: '15px', lineHeight: '1.5' } }, parseInline(item))
          )
        )
      );
      continue;
    }

    elements.push(
      React.createElement('p', { key: 'p-' + i, style: { margin: '2px 0', fontSize: '15px', lineHeight: '1.6' } }, parseInline(line))
    );
    i++;
  }

  return elements;
}

export default function ChatPage() {
  const location = useLocation();
  const { lang, changeLang } = useLang();
  const { user } = useAuth();
  const userId = user ? (user.phone || `user_${user.name}`) : 'anonymous_user_1';

  const getWelcome = (l) => ({ role: 'assistant', content: t(l, 'chatWelcome'), time: now() });

  const currentSessionId = useRef(getOrCreateSessionId());

  const [messages, setMessages] = useState(() => {
    const existing = loadSessions();
    const current = existing.find(s => s.id === currentSessionId.current);
    return current ? current.messages : [getWelcome(lang)];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [coords, setCoords] = useState(null);
  const [pestStatus, setPestStatus] = useState(null);
  const [sessions, setSessions] = useState(loadSessions);

  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchHistory() {
      const existingSessions = loadSessions();
      const hasLocalSession = existingSessions.some(s => s.id === currentSessionId.current);
      if (hasLocalSession) return;
      try {
        const res = await fetch(`${BASE_API_URL}/api/history?user_id=${userId}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data.map(m => ({ ...m, time: now() })));
        }
      } catch (e) { console.error('History fetch failed', e); }
    }
    fetchHistory();
  }, [userId]);

  useEffect(() => { if (location.state?.prompt) handleSend(location.state.prompt); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  useEffect(() => {
    saveMemory(messages);
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length === 0) return;
    const firstUserMsg = userMessages[0].content;
    const title = firstUserMsg.length > 40 ? firstUserMsg.slice(0, 40) + '...' : firstUserMsg;
    const updated = loadSessions().filter(s => s.id !== currentSessionId.current);
    const newSession = { id: currentSessionId.current, title, date: new Date().toLocaleDateString(), messages };
    const newSessions = [newSession, ...updated];
    saveSessions(newSessions);
    setSessions(newSessions);
  }, [messages]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        setCoords({ lat, lon });
        try {
          await fetch(`${BASE_API_URL}/api/location`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lon }),
          });
        } catch (err) { console.error('Failed to sync location:', err); }
      });
    }
  }, []);

  async function handleSend(text) {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    const userMsg = { role: 'user', content: msg, time: now() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);
    const reply = await getAIReply(updated.map(m => ({ role: m.role, content: m.content })), lang.name, userId);
    setMessages(prev => [...prev, { role: 'assistant', content: reply, time: now() }]);
    setLoading(false);
    inputRef.current?.focus();
  }

  async function reportPest() {
    if (!coords) { alert('Please enable location for pest reporting.'); return; }
    setPestStatus('checking');
    try {
      const res = await fetch(`${BASE_API_URL}/api/report_pest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: coords.lat, lon: coords.lon, disease_id: 'general_outbreak', user_id: userId }),
      });
      const data = await res.json();
      setPestStatus('done');
      handleSend(`Reported potential outbreak at my location. Status: ${data.status || 'Received'}. ${data.community_alert ? 'Alert: ' + data.community_alert : ''}`);
      setTimeout(() => setPestStatus(null), 3000);
    } catch (e) { setPestStatus(null); }
  }

  function toggleVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice input not supported.'); return; }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    rec.lang = lang.code;
    rec.onresult = e => { setInput(e.results[0][0].transcript); setListening(false); };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }

  function clearChat() {
    const newId = Date.now().toString();
    localStorage.setItem(CURRENT_SESSION_KEY, newId);
    currentSessionId.current = newId;
    setMessages([getWelcome(lang)]);
    localStorage.removeItem(MEMORY_KEY);
  }

  function loadSession(session) {
    setMessages(session.messages);
    currentSessionId.current = session.id;
    localStorage.setItem(CURRENT_SESSION_KEY, session.id);
  }

  function deleteSession(id, e) {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    saveSessions(updated);
    setSessions(updated);
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--nav-h))', background: 'var(--bg)' }}>
      <aside className="hide-mobile" style={{ width: '280px', flexShrink: 0, background: '#fff', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '20px 16px', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: '#e8f5e9', borderRadius: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg,#1a7a32,#25a244)', borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px' }}>FarmBot AI</div>
            <div style={{ fontSize: '12px', color: '#25a244' }}>Online - Replies instantly</div>
          </div>
        </div>

        <button onClick={reportPest} disabled={pestStatus === 'checking'} style={{
          background: pestStatus === 'done' ? '#e8f5e9' : '#fff5f5',
          border: '1.5px solid ' + (pestStatus === 'done' ? '#c8e6c9' : '#ffcdd2'),
          borderRadius: '14px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {pestStatus === 'done' ? <CheckCircle2 size={20} color="#25a244" /> : <ShieldAlert size={20} color="#c62828" />}
            <span style={{ fontWeight: '800', fontSize: '14px', color: pestStatus === 'done' ? '#1a7a32' : '#c62828' }}>
              {pestStatus === 'checking' ? 'Analyzing...' : pestStatus === 'done' ? 'Shared Alert' : 'Report Pest Problem'}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '11px', color: '#666', textAlign: 'left', lineHeight: 1.4 }}>Help other farmers by sharing pest sightings in your area.</p>
        </button>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase' }}>Chat History</div>
            <button onClick={clearChat} style={{ fontSize: '11px', fontWeight: '700', color: '#25a244', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}>+ New Chat</button>
          </div>
          {sessions.length === 0 ? (
            <div style={{ fontSize: '13px', color: '#aaa', padding: '10px 0' }}>No past chats yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => loadSession(session)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: currentSessionId.current === session.id ? '#e8f5e9' : 'transparent',
                    color: '#333', fontSize: '13px', textAlign: 'left', gap: '8px',
                  }}
                  onMouseEnter={e => { if (currentSessionId.current !== session.id) e.currentTarget.style.background = '#f0f7f0'; }}
                  onMouseLeave={e => { if (currentSessionId.current !== session.id) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.title}</div>
                    <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>{session.date}</div>
                  </div>
                  <span
                    onClick={(e) => deleteSession(session.id, e)}
                    title="Delete"
                    style={{ color: '#ccc', fontSize: '14px', flexShrink: 0, lineHeight: 1 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e53935'}
                    onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
                  >x</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={clearChat} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', border: '1px solid #ffcdd2', background: '#fff5f5', color: '#c62828', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          <Trash2 size={14} /> Clear Chat
        </button>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <Bot size={20} color="#25a244" />
          <div style={{ flex: 1, fontWeight: '700', fontSize: '15px' }}>FarmBot AI</div>
          <button onClick={reportPest} className="hide-desktop" style={{ background: '#fff5f5', border: '1px solid #ffcdd2', borderRadius: '8px', padding: '7px', color: '#c62828' }}><ShieldAlert size={16} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f9fafb' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '10px', alignItems: 'flex-end' }}>
              {m.role === 'assistant' && (
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#1a7a32,#25a244)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={15} color="#fff" />
                </div>
              )}
              <div style={{
                background: m.role === 'user' ? 'linear-gradient(135deg,#1a7a32,#25a244)' : '#fff',
                color: m.role === 'user' ? '#fff' : '#1a1a1a',
                padding: '12px 18px',
                borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                maxWidth: '85%', fontSize: '15px', lineHeight: '1.6',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                wordBreak: 'break-word',
              }}>
                {m.role === 'assistant' ? renderMarkdown(m.content) : m.content}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '6px', borderTop: m.role === 'assistant' ? '1px solid #f2f2f2' : 'none', paddingTop: m.role === 'assistant' ? '6px' : '0' }}>
                  <span style={{ fontSize: '10px', opacity: 0.6 }}>{m.time}</span>
                  {m.role === 'assistant' && (
                    <button onClick={() => sarvamSpeak(m.content, lang.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#25a244', padding: 0 }}>
                      <Volume2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ background: '#fff', padding: '12px 18px', borderRadius: '18px 18px 18px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', color: '#25a244', fontWeight: 'bold' }}>Thinking...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '14px 20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={toggleVoice} style={{ background: listening ? '#e53935' : '#f0f7f0', border: 'none', color: listening ? '#fff' : '#25a244', borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            ref={inputRef}
            style={{ flex: 1, background: '#f4f6f4', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 18px', fontSize: '15px' }}
            placeholder="Ask a question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={() => handleSend()} style={{ background: 'linear-gradient(135deg,#1a7a32,#25a244)', color: '#fff', borderRadius: '12px', width: '44px', height: '44px', border: 'none', cursor: 'pointer' }}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
