# 🚀 Quick Reference Card

## 📋 API Keys Needed

| API | Priority | Get From | Time |
|-----|----------|----------|------|
| **Google Gemini** | 🔥 HIGH | https://aistudio.google.com/app/apikey | 2 min |
| OpenWeatherMap | 👍 Medium | https://openweathermap.org/api | 2 min |
| Hugging Face | 💡 Low | https://huggingface.co/settings/tokens | 1 min |

---

## ⚡ Quick Commands

### Test APIs:
```bash
cd SarvamMaster
python test_free_apis.py
```

### Start Servers:
```bash
# Terminal 1 - FastAPI
cd SarvamMaster
uvicorn main:app --reload --port 8000

# Terminal 2 - Flask
cd SarvamMaster
python app.py

# Terminal 3 - Frontend
cd farmer-chat
npm run dev
```

### Check .env:
```bash
cat SarvamMaster/.env
```

---

## 📖 Documentation Quick Links

| Need | Read This |
|------|-----------|
| Get API keys fast | `GET_FREE_API_KEYS.md` |
| Detailed setup | `FREE_API_SETUP.md` |
| What changed | `API_INTEGRATION_SUMMARY.md` |
| How it works | `INTEGRATION_ARCHITECTURE.md` |
| Complete overview | `README_FREE_APIS.md` |
| Status check | `INTEGRATION_COMPLETE.md` |

---

## 🎯 Feature Status

| Feature | Status | Needs |
|---------|--------|-------|
| Weather | ✅ Working | Nothing (has fallback) |
| AI Chat | ⏳ Needs key | Google Gemini key |
| Plant Doctor | ✅ Working | Nothing (has fallback) |
| All UI | ✅ Working | Nothing |

---

## 🔧 .env File Template

```env
# Add these to SarvamMaster/.env
OPENWEATHER_API_KEY=your_key_here
GOOGLE_GEMINI_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| APIs not working | Check `.env` file, restart servers |
| Chat not responding | Add Gemini key to `.env` |
| Weather not loading | Open-Meteo fallback should work |
| Test script fails | Check API keys, no extra spaces |

---

## 💰 Free Limits

- **OpenWeatherMap**: 1,000 calls/day
- **Google Gemini**: 1,500 requests/day
- **Hugging Face**: 30,000 requests/month
- **Open-Meteo**: Unlimited (fallback)

---

## 🎬 Demo Checklist

- [ ] Get Gemini API key
- [ ] Update `.env` file
- [ ] Run `python test_free_apis.py`
- [ ] All servers running
- [ ] Test chat in Hindi
- [ ] Test weather page
- [ ] Test plant upload

---

## 📞 Support

**Test APIs**: `python test_free_apis.py`  
**Setup Guide**: `FREE_API_SETUP.md`  
**Quick Start**: `GET_FREE_API_KEYS.md`

---

## ⏱️ Time Estimates

- Get API keys: **5 minutes**
- Update `.env`: **1 minute**
- Test & restart: **2 minutes**
- **Total: 8 minutes to full setup!**

---

**🎉 You're 5 minutes away from a fully AI-powered app!**
