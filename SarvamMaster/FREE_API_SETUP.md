# 🆓 Free API Integration Guide

This guide will help you set up free APIs for your Farmer Chat application to enable:
- 🌤️ **Real-time Weather Data** (OpenWeatherMap)
- 🤖 **AI Chat Assistant** (Google Gemini)
- 🌿 **Plant Disease Detection** (Hugging Face)

---

## 📋 Quick Setup Checklist

- [ ] Get OpenWeatherMap API key
- [ ] Get Google Gemini API key
- [ ] Get Hugging Face API token
- [ ] Update `.env` file
- [ ] Restart backend servers
- [ ] Test features

---

## 1️⃣ OpenWeatherMap API (Weather Data)

### Why?
Get real-time weather data with 1,000 free API calls per day.

### Steps:

1. **Sign up**: Go to https://openweathermap.org/api
2. **Create account**: Click "Sign Up" (free)
3. **Get API key**: 
   - Go to https://home.openweathermap.org/api_keys
   - Copy your API key (looks like: `YOUR_OPENWEATHER_KEY_HERE`)
4. **Add to .env**:
   ```env
   OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

### Free Tier Limits:
- ✅ 1,000 calls/day
- ✅ Current weather data
- ✅ 5-day forecast
- ✅ Weather alerts

### Fallback:
If not configured, the app automatically uses **Open-Meteo** (completely free, no key needed).

---

## 2️⃣ Google Gemini API (AI Chat)

### Why?
Power your chat feature with Google's advanced AI - completely free!

### Steps:

1. **Get API key**: Go to https://aistudio.google.com/app/apikey
2. **Sign in**: Use your Google account
3. **Create API key**: Click "Create API Key"
4. **Copy key**: It looks like: `AIzaSyYOUR_OPENWEATHER_KEY_HEREQ`
5. **Add to .env**:
   ```env
   GOOGLE_GEMINI_API_KEY=AIzaSyYOUR_OPENWEATHER_KEY_HEREQ
   ```

### Free Tier Limits:
- ✅ 60 requests per minute
- ✅ 1,500 requests per day
- ✅ Multilingual support
- ✅ No credit card required

### Features Enabled:
- 💬 AI farming advice in 11+ Indian languages
- 🌾 Crop-specific recommendations
- 🐛 Pest management guidance
- 🌡️ Weather-aware suggestions

---

## 3️⃣ Hugging Face API (Plant Disease Detection)

### Why?
Use AI models to detect plant diseases from images.

### Steps:

1. **Sign up**: Go to https://huggingface.co/join
2. **Create account**: Free signup
3. **Get token**: 
   - Go to https://huggingface.co/settings/tokens
   - Click "New token"
   - Name it "FarmGPT" and select "Read" access
   - Copy the token (looks like: `hf_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890`)
4. **Add to .env**:
   ```env
   HUGGINGFACE_API_KEY=hf_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
   ```

### Free Tier Limits:
- ✅ 30,000 requests per month
- ✅ Access to 100,000+ AI models
- ✅ No credit card required

### Features Enabled:
- 🌿 Plant disease identification
- 📊 Confidence scores
- 🎯 Severity assessment

---

## 🔧 Complete .env File Example

```env
# Existing keys (keep these)
SARVAM_API_KEY=sk_0xluscvh_5ii8BbY35c4gqUN6fuilJ997
MONGO_URI=mongodb+srv://kushanth2005_db5:KEjqI9PxLWway6K9@cluster0.p5l3bmr.mongodb.net/?appName=Cluster0
CHROMA_API_KEY=ck-CmGuTg2V8RmWhfjY7rVLD8gG9G1ccPsETSA7Q8NXMb3J
CHROMA_TENANT=ea597796-5f42-4b9e-b781-059f2f97dd17
CHROMA_DATABASE=FarmGPt
JINA_API_KEY=jina_1feceb86c44c4f8790aafa5d971648309zzRKSH1nQtgzBTnwnZINrSH3Zsc

# NEW: Add these free API keys
OPENWEATHER_API_KEY=YOUR_OPENWEATHER_KEY_HERE
GOOGLE_GEMINI_API_KEY=AIzaSyYOUR_OPENWEATHER_KEY_HEREQ
HUGGINGFACE_API_KEY=hf_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

---

## 🚀 After Setup

### 1. Restart Backend Servers

Stop current servers (Ctrl+C in terminals) and restart:

```bash
# Terminal 1: FastAPI backend
cd SarvamMaster
uvicorn main:app --reload --port 8000

# Terminal 2: Flask backend
cd SarvamMaster
python app.py

# Terminal 3: Frontend
cd farmer-chat
npm run dev
```

### 2. Test Features

#### Test Weather:
1. Open http://localhost:5174
2. Go to Weather page
3. Allow location access
4. Check if real weather data appears

#### Test Chat:
1. Go to Chat page
2. Ask: "How to treat rice leaf blight?"
3. Check if AI responds in your selected language

#### Test Plant Doctor:
1. Go to Plant Doctor page
2. Upload a plant image
3. Check if disease is detected with AI analysis

---

## 🔍 Troubleshooting

### Weather not working?
- ✅ Check if `OPENWEATHER_API_KEY` is in `.env`
- ✅ Verify API key is active (takes 10 minutes after signup)
- ✅ App will auto-fallback to Open-Meteo if key is invalid

### Chat not responding?
- ✅ Check if `GOOGLE_GEMINI_API_KEY` is in `.env`
- ✅ Verify you haven't exceeded 60 requests/minute
- ✅ Check browser console for errors

### Plant analysis not working?
- ✅ Check if `HUGGINGFACE_API_KEY` is in `.env`
- ✅ First request may take 20-30 seconds (model loading)
- ✅ App will use fallback mock data if API fails

---

## 💰 Cost Comparison

| Feature | Free API | Cost |
|---------|----------|------|
| Weather | OpenWeatherMap | $0 (1000 calls/day) |
| AI Chat | Google Gemini | $0 (1500 requests/day) |
| Plant AI | Hugging Face | $0 (30k requests/month) |
| **Total** | **All Features** | **$0/month** 🎉 |

---

## 📊 API Usage Monitoring

### OpenWeatherMap:
- Dashboard: https://home.openweathermap.org/statistics

### Google Gemini:
- Console: https://aistudio.google.com/app/apikey

### Hugging Face:
- Usage: https://huggingface.co/settings/billing

---

## 🎯 Next Steps

1. ✅ Get all three API keys
2. ✅ Update `.env` file
3. ✅ Restart servers
4. ✅ Test all features
5. 🚀 Ready for demo!

---

## 📞 Support

If you face any issues:
1. Check the console logs for error messages
2. Verify API keys are correct (no extra spaces)
3. Ensure `.env` file is in `SarvamMaster` folder
4. Restart all servers after updating `.env`

---

**🎉 Congratulations!** Your app now has free AI-powered features!

