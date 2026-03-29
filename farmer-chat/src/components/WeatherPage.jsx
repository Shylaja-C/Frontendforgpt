import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Droplets, Wind, Thermometer, Eye, Gauge, Sunrise, Sunset, CloudRain, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import WeatherAlerts from './WeatherAlerts';

function getWeatherType(code) {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Clouds';
  if (code <= 67 || code >= 80) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  return 'Clouds';
}

function getWeatherDesc(code) {
  const map = {
    0:'clear sky',1:'mainly clear',2:'partly cloudy',3:'overcast',
    45:'foggy',48:'foggy',51:'light drizzle',53:'drizzle',55:'heavy drizzle',
    61:'light rain',63:'rain',65:'heavy rain',71:'light snow',73:'snow',75:'heavy snow',
    80:'light showers',81:'showers',82:'heavy showers',95:'thunderstorm',
  };
  return map[code] || 'partly cloudy';
}

function getWeatherEmoji(code) {
  if (code === 0) return '☀️';
  if (code <= 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦️';
  return '⛈️';
}

function getFarmingTips(weather) {
  const tips = [];
  const temp = weather.main.temp;
  const rain = weather.weather[0].main.toLowerCase();
  const humidity = weather.main.humidity;
  if (rain.includes('rain')) tips.push({ icon: '🚫', text: 'Avoid spraying pesticides today — rain will wash them away' });
  if (rain.includes('clear') && temp > 30) tips.push({ icon: '💧', text: 'Hot and dry — water your crops in the morning or evening' });
  if (humidity > 80) tips.push({ icon: '⚠️', text: 'High humidity — watch for fungal diseases on crops' });
  if (temp < 15) tips.push({ icon: '🌡️', text: 'Cold weather — protect seedlings from frost damage' });
  if (rain.includes('cloud')) tips.push({ icon: '☁️', text: 'Cloudy day — good time for transplanting seedlings' });
  tips.push({ icon: '🌱', text: 'Check soil moisture before irrigating today' });
  return tips.slice(0, 4);
}

export default function WeatherPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchWeather(lat, lon) {
    setLoading(true); setError('');
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=auto&forecast_days=1`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const mapped = {
        main: {
          temp: data.current_weather.temperature,
          feels_like: data.current_weather.temperature - 2,
          humidity: data.hourly.relativehumidity_2m[0] || 60,
        },
        weather: [{
          main: getWeatherType(data.current_weather.weathercode),
          description: getWeatherDesc(data.current_weather.weathercode),
          code: data.current_weather.weathercode,
        }],
        wind: { speed: (data.current_weather.windspeed / 3.6).toFixed(1) },
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
      pos => { setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }); fetchWeather(pos.coords.latitude, pos.coords.longitude); },
      () => { setError('Location access denied. Please allow location.'); setLoading(false); }
    );
  }

  useEffect(() => { getLocation(); }, []);

  const tips = weather ? getFarmingTips(weather) : [];
  const emoji = weather ? getWeatherEmoji(weather.weather[0].code) : '🌤️';

  const preventions = [
    { icon: '🔍', text: t('prevention1') },
    { icon: '🐛', text: t('prevention2') },
    { icon: '🌿', text: t('prevention3') },
    { icon: '🧹', text: t('prevention4') },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #e3f2fd 0%, #f8faf8 100%)', paddingBottom: '80px' }}>

      {/* Hero Header */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)', padding: '80px 24px 100px' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url(https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=1200&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>{emoji}</div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-1px' }}>
            {t('weatherTitle')}
          </h1>
          {coords && (
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <MapPin size={18} /> {coords.lat.toFixed(3)}, {coords.lon.toFixed(3)}
            </p>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1, marginTop: '-60px' }}>

        {loading && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '60px', textAlign: 'center', fontSize: '18px', color: '#555', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            📡 Getting your location weather...
          </div>
        )}

        {error && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#e53935', marginBottom: '20px', fontSize: '16px' }}>{error}</p>
            <button onClick={getLocation} style={{ background: '#1565c0', color: '#fff', borderRadius: '12px', padding: '14px 32px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>{t('tryAgain')}</button>
          </div>
        )}

        {weather && !loading && (
          <>
            {/* Smart Weather Alerts */}
            <WeatherAlerts coords={coords} />

            {/* Main Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              
              {/* Temperature Card */}
              <div style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)', borderRadius: '24px', padding: '32px', color: '#fff', boxShadow: '0 10px 40px rgba(255,107,107,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Thermometer size={28} />
                  <span style={{ fontSize: '14px', fontWeight: '600', opacity: 0.9 }}>Temperature</span>
                </div>
                <div style={{ fontSize: '56px', fontWeight: '900', lineHeight: 1, marginBottom: '8px' }}>
                  {Math.round(weather.main.temp)}°C
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                  Feels like {Math.round(weather.main.feels_like)}°C
                </div>
              </div>

              {/* Humidity Card */}
              <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', borderRadius: '24px', padding: '32px', color: '#fff', boxShadow: '0 10px 40px rgba(79,172,254,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Droplets size={28} />
                  <span style={{ fontSize: '14px', fontWeight: '600', opacity: 0.9 }}>Humidity</span>
                </div>
                <div style={{ fontSize: '56px', fontWeight: '900', lineHeight: 1, marginBottom: '8px' }}>
                  {weather.main.humidity}%
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                  {weather.main.humidity > 70 ? 'High moisture' : 'Normal levels'}
                </div>
              </div>

              {/* Wind Card */}
              <div style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderRadius: '24px', padding: '32px', color: '#1a1a1a', boxShadow: '0 10px 40px rgba(168,237,234,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Wind size={28} />
                  <span style={{ fontSize: '14px', fontWeight: '600', opacity: 0.8 }}>Wind Speed</span>
                </div>
                <div style={{ fontSize: '56px', fontWeight: '900', lineHeight: 1, marginBottom: '8px' }}>
                  {weather.wind.speed}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                  m/s
                </div>
              </div>

            </div>

            {/* Current Conditions */}
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', marginBottom: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f1f12', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CloudRain size={28} color="#1565c0" /> Current Conditions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div style={{ textAlign: 'center', padding: '20px', background: '#f8faf8', borderRadius: '16px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>{emoji}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', textTransform: 'capitalize' }}>
                    {weather.weather[0].description}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Thermometer size={20} color="#ff6b6b" />
                    <span style={{ fontSize: '15px', color: '#555' }}>Temperature: <strong>{Math.round(weather.main.temp)}°C</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Droplets size={20} color="#4facfe" />
                    <span style={{ fontSize: '15px', color: '#555' }}>Humidity: <strong>{weather.main.humidity}%</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Wind size={20} color="#a8edea" />
                    <span style={{ fontSize: '15px', color: '#555' }}>Wind: <strong>{weather.wind.speed} m/s</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Map */}
            <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
              <div style={{ padding: '24px 28px', borderBottom: '1px solid #f0f0f0' }}>
                <h2 style={{ fontWeight: '800', fontSize: '20px', color: '#0f1f12', margin: 0 }}>
                  🗺️ Interactive Weather Map
                </h2>
              </div>
              <iframe
                title="weather-map"
                src={`https://embed.windy.com/embed2.html?lat=${coords?.lat || 20}&lon=${coords?.lon || 78}&detailLat=${coords?.lat || 20}&detailLon=${coords?.lon || 78}&width=100%&height=400&zoom=7&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                style={{ width: '100%', height: '400px', border: 'none', display: 'block' }}
                allowFullScreen
              />
            </div>

            {/* Farming Tips */}
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
              <h2 style={{ fontWeight: '800', fontSize: '22px', color: '#0f1f12', marginBottom: '24px' }}>🌾 {t('farmingTips')}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', padding: '18px', background: '#f8faf8', borderRadius: '16px', border: '1px solid #e8f5e9' }}>
                    <span style={{ fontSize: '28px', flexShrink: 0 }}>{tip.icon}</span>
                    <span style={{ fontSize: '14px', color: '#333', lineHeight: 1.6 }}>{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Tips */}
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '800', fontSize: '22px', color: '#0f1f12', marginBottom: '24px' }}>
                <Shield size={26} color="#25a244" /> {t('preventionTitle')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {preventions.map((p, i) => (
                  <div key={i} style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)', borderRadius: '18px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #c8e6c9' }}>
                    <span style={{ fontSize: '36px' }}>{p.icon}</span>
                    <span style={{ fontSize: '14px', color: '#2e7d32', fontWeight: '600', lineHeight: 1.5 }}>{p.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={getLocation} style={{ width: '100%', background: 'linear-gradient(135deg, #1565c0, #42a5f5)', color: '#fff', borderRadius: '16px', padding: '18px', fontSize: '16px', fontWeight: '700', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(21,101,192,0.3)' }}>
              🔄 {t('refresh')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
