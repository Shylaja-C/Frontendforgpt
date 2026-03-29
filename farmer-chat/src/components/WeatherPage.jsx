import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Droplets, Wind, Thermometer, AlertTriangle } from 'lucide-react';
import { useLang } from '../context/LangContext';

const WEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';

function getWeatherType(code) {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Clouds';
  if (code <= 67 || code >= 80) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  return 'Clouds';
}

function getWeatherDesc(code) {
  const map = {
    0: 'clear sky', 1: 'mainly clear', 2: 'partly cloudy', 3: 'overcast',
    45: 'foggy', 48: 'foggy', 51: 'light drizzle', 53: 'drizzle', 55: 'heavy drizzle',
    61: 'light rain', 63: 'rain', 65: 'heavy rain', 71: 'light snow', 73: 'snow', 75: 'heavy snow',
    80: 'light showers', 81: 'showers', 82: 'heavy showers', 95: 'thunderstorm',
  };
  return map[code] || 'partly cloudy';
}

const s = {
  page: { display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#e8f5e9' },
  header: { background: '#25a244', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 },
  backBtn: { background: 'none', color: '#fff', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' },
  body: { flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' },
  card: { background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  mainTemp: { fontSize: '56px', fontWeight: '700', color: '#1a7a32', textAlign: 'center' },
  desc: { textAlign: 'center', fontSize: '16px', color: '#555', marginTop: '4px', textTransform: 'capitalize' },
  location: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#888', fontSize: '13px', marginTop: '6px' },
  statsRow: { display: 'flex', justifyContent: 'space-around', marginTop: '16px' },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  statLabel: { fontSize: '12px', color: '#888' },
  statVal: { fontSize: '16px', fontWeight: '600', color: '#1a7a32' },
  alertCard: { background: '#fff3e0', borderRadius: '16px', padding: '16px', border: '1px solid #ffcc80', display: 'flex', gap: '10px', alignItems: 'flex-start' },
  alertText: { fontSize: '14px', color: '#e65100', lineHeight: '1.5' },
  tipCard: { background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  tipTitle: { fontSize: '15px', fontWeight: '700', color: '#1a7a32', marginBottom: '10px' },
  tip: { fontSize: '14px', color: '#444', padding: '6px 0', borderBottom: '1px solid #f0f0f0', lineHeight: '1.4' },
  locBtn: { background: '#25a244', color: '#fff', borderRadius: '12px', padding: '14px', fontSize: '16px', fontWeight: '600', textAlign: 'center', width: '100%', border: 'none', cursor: 'pointer' },
  loading: { textAlign: 'center', padding: '40px', fontSize: '16px', color: '#555' },
  error: { textAlign: 'center', padding: '20px', color: '#e53935', fontSize: '14px' },
};

const TX = {
  title:    { 'ta-IN': '🌤️ வானிலை', 'hi-IN': '🌤️ मौसम', 'te-IN': '🌤️ వాతావరణం', 'kn-IN': '🌤️ ಹವಾಮಾನ', 'ml-IN': '🌤️ കാലാവസ്ഥ', 'en-IN': '🌤️ Weather' },
  humidity: { 'ta-IN': 'ஈரப்பதம்', 'hi-IN': 'नमी', 'te-IN': 'తేమ', 'kn-IN': 'ತೇವಾಂಶ', 'ml-IN': 'ഈർപ്പം', 'en-IN': 'Humidity' },
  wind:     { 'ta-IN': 'காற்று', 'hi-IN': 'हवा', 'te-IN': 'గాలి', 'kn-IN': 'ಗಾಳಿ', 'ml-IN': 'കാറ്റ്', 'en-IN': 'Wind' },
  feels:    { 'ta-IN': 'உணர்வு', 'hi-IN': 'महसूस', 'te-IN': 'అనుభవం', 'kn-IN': 'ಅನಿಸಿಕೆ', 'ml-IN': 'അനുഭവം', 'en-IN': 'Feels like' },
  tipsTitle:{ 'ta-IN': '🌾 இன்றைய விவசாய குறிப்புகள்', 'hi-IN': '🌾 आज की खेती सलाह', 'te-IN': '🌾 నేటి వ్యవసాయ చిట్కాలు', 'kn-IN': '🌾 ಇಂದಿನ ಕೃಷಿ ಸಲಹೆ', 'ml-IN': '🌾 ഇന്നത്തെ കൃഷി നുറുങ്ങുകൾ', 'en-IN': '🌾 Farming Tips for Today' },
  loading:  { 'ta-IN': '📡 உங்கள் இடத்தின் வானிலை பெறுகிறோம்...', 'hi-IN': '📡 आपके स्थान का मौसम लोड हो रहा है...', 'te-IN': '📡 మీ స్థానం వాతావరణం లోడ్ అవుతోంది...', 'kn-IN': '📡 ನಿಮ್ಮ ಸ್ಥಳದ ಹವಾಮಾನ ಲೋಡ್ ಆಗುತ್ತಿದೆ...', 'ml-IN': '📡 നിങ്ങളുടെ സ്ഥലത്തെ കാലാവസ്ഥ ലോഡ് ആകുന്നു...', 'en-IN': '📡 Getting your location weather...' },
  refresh:  { 'ta-IN': '🔄 புதுப்பிக்கவும்', 'hi-IN': '🔄 ताज़ा करें', 'te-IN': '🔄 రిఫ్రెష్', 'kn-IN': '🔄 ರಿಫ್ರೆಶ್', 'ml-IN': '🔄 പുതുക്കുക', 'en-IN': '🔄 Refresh Weather' },
  tryAgain: { 'ta-IN': '📍 மீண்டும் முயற்சிக்கவும்', 'hi-IN': '📍 फिर कोशिश करें', 'te-IN': '📍 మళ్ళీ ప్రయత్నించండి', 'kn-IN': '📍 ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ', 'ml-IN': '📍 വീണ്ടും ശ്രമിക്കുക', 'en-IN': '📍 Try Again' },
};

function tx(lang, key) { return TX[key]?.[lang.code] || TX[key]?.['en-IN'] || key; }

function getFarmingTips(weather) {
  const tips = [];
  const temp = weather.main.temp;
  const rain = weather.weather[0].main.toLowerCase();
  const humidity = weather.main.humidity;
  if (rain.includes('rain')) tips.push('🚫 Avoid spraying pesticides today – rain will wash them away');
  if (rain.includes('clear') && temp > 30) tips.push('💧 Hot and dry – water your crops in the morning or evening');
  if (humidity > 80) tips.push('⚠️ High humidity – watch for fungal diseases on crops');
  if (temp < 15) tips.push('🌡️ Cold weather – protect seedlings from frost');
  if (rain.includes('cloud')) tips.push('☁️ Cloudy day – good time for transplanting seedlings');
  tips.push('🌱 Check soil moisture before irrigating');
  return tips;
}

export default function WeatherPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchWeather(lat, lon) {
    setLoading(true); setError('');
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=auto&forecast_days=1`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      
      // Map Open-Meteo response to OpenWeatherMap format for compatibility
      const mapped = {
        main: {
          temp: data.current_weather.temperature,
          feels_like: data.current_weather.temperature - 2, // Approximate
          humidity: data.hourly.relativehumidity_2m[0] || 60,
        },
        weather: [{
          main: getWeatherType(data.current_weather.weathercode),
          description: getWeatherDesc(data.current_weather.weathercode),
        }],
        wind: {
          speed: data.current_weather.windspeed / 3.6, // Convert km/h to m/s
        },
        name: 'Your Location',
      };
      setWeather(mapped);
    } catch { setError('Could not load weather. Check your connection.'); }
    setLoading(false);
  }

  function getLocation() {
    if (!navigator.geolocation) { setError('Location not supported on this device.'); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => { setError('Location access denied. Please allow location.'); setLoading(false); }
    );
  }

  useEffect(() => { getLocation(); }, []);
  const tips = weather ? getFarmingTips(weather) : [];

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate('/')}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: '17px', fontWeight: '700' }}>{tx(lang, 'title')}</span>
      </div>
      <div style={s.body}>
        {loading && <div style={s.loading}>{tx(lang, 'loading')}</div>}
        {error && (
          <>
            <div style={s.error}>{error}</div>
            <button style={s.locBtn} onClick={getLocation}>{tx(lang, 'tryAgain')}</button>
          </>
        )}
        {weather && !loading && (
          <>
            <div style={s.card}>
              <div style={s.mainTemp}>{Math.round(weather.main.temp)}°C</div>
              <div style={s.desc}>{weather.weather[0].description}</div>
              <div style={s.location}><MapPin size={13} /> {weather.name}</div>
              <div style={s.statsRow}>
                <div style={s.stat}>
                  <Droplets size={20} color="#25a244" />
                  <span style={s.statVal}>{weather.main.humidity}%</span>
                  <span style={s.statLabel}>{tx(lang, 'humidity')}</span>
                </div>
                <div style={s.stat}>
                  <Wind size={20} color="#25a244" />
                  <span style={s.statVal}>{Math.round(weather.wind.speed)} m/s</span>
                  <span style={s.statLabel}>{tx(lang, 'wind')}</span>
                </div>
                <div style={s.stat}>
                  <Thermometer size={20} color="#25a244" />
                  <span style={s.statVal}>{Math.round(weather.main.feels_like)}°C</span>
                  <span style={s.statLabel}>{tx(lang, 'feels')}</span>
                </div>
              </div>
            </div>
            {weather.weather[0].main.toLowerCase().includes('rain') && (
              <div style={s.alertCard}>
                <AlertTriangle size={20} color="#e65100" style={{ flexShrink: 0 }} />
                <span style={s.alertText}>🌧️ Rain detected – avoid pesticide spraying and field operations today.</span>
              </div>
            )}
            <div style={s.tipCard}>
              <div style={s.tipTitle}>{tx(lang, 'tipsTitle')}</div>
              {tips.map((tip, i) => <div key={i} style={s.tip}>{tip}</div>)}
            </div>
            <button style={s.locBtn} onClick={getLocation}>{tx(lang, 'refresh')}</button>
          </>
        )}
      </div>
    </div>
  );
}
