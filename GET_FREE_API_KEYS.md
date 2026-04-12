# 🚀 Quick Start: Get Your Free API Keys (5 Minutes)

Your app is already working with **Open-Meteo** (free weather API), but you can unlock more features with these free API keys:

---

## 🎯 Priority Order

### ⭐ MUST HAVE (for AI chat):
1. **Google Gemini** - Powers the AI chat feature

### 👍 NICE TO HAVE (optional):
2. **OpenWeatherMap** - Better weather data (already has free fallback)
3. **Hugging Face** - AI plant detection (already has local model fallback)

---

## 1️⃣ Google Gemini API (REQUIRED for Chat)

### Get Key in 2 Minutes:

1. **Go to**: https://aistudio.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click**: "Create API Key"
4. **Copy** the key (starts with `AIzaSy...`)
5. **Paste** in `.env` file:

```env
GOOGLE_GEMINI_API_KEY=AIzaSyYOUR_OPENWEATHER_KEY_HEREQ
```

**Free Limits**: 1,500 requests/day (plenty for demo!)

---

## 2️⃣ OpenWeatherMap API (Optional)

### Get Key in 2 Minutes:

1. **Go to**: https://openweathermap.org/api
2. **Click**: "Sign Up" (top right)
3. **Fill** basic info (name, email, password)
4. **Verify** email
5. **Go to**: https://home.openweathermap.org/api_keys
6. **Copy** the default API key
7. **Paste** in `.env` file:

```env
OPENWEATHER_API_KEY=YOUR_OPENWEATHER_KEY_HERE
```

**Note**: Key takes 10 minutes to activate after signup.

**Free Limits**: 1,000 calls/day

---

## 3️⃣ Hugging Face API (Optional)

### Get Token in 1 Minute:

1. **Go to**: https://huggingface.co/join
2. **Sign up** (email + password)
3. **Go to**: https://huggingface.co/settings/tokens
4. **Click**: "New token"
5. **Name**: "FarmGPT"
6. **Role**: Select "Read"
7. **Copy** token (starts with `hf_...`)
8. **Paste** in `.env` file:

```env
HUGGINGFACE_API_KEY=hf_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Free Limits**: 30,000 requests/month

---

## ✅ After Adding Keys

### 1. Your `.env` file should look like:

```env
# Existing keys (keep these)
SARVAM_API_KEY=sk_0xluscvh_5ii8BbY35c4gqUN6fuilJ997
MONGO_URI=mongodb+srv://kushanth2005_db5:KEjqI9PxLWway6K9@cluster0.p5l3bmr.mongodb.net/?appName=Cluster0
CHROMA_API_KEY=ck-CmGuTg2V8RmWhfjY7rVLD8gG9G1ccPsETSA7Q8NXMb3J
CHROMA_TENANT=ea597796-5f42-4b9e-b781-059f2f97dd17
CHROMA_DATABASE=FarmGPt
JINA_API_KEY=jina_1feceb86c44c4f8790aafa5d971648309zzRKSH1nQtgzBTnwnZINrSH3Zsc

# NEW: Free API keys (add these)
OPENWEATHER_API_KEY=your_actual_key_here
GOOGLE_GEMINI_API_KEY=your_actual_key_here
HUGGINGFACE_API_KEY=your_actual_key_here
```

### 2. Test the APIs:

```bash
cd SarvamMaster
python test_free_apis.py
```

You should see ✅ for each configured API.

### 3. Restart servers:

Stop current servers (Ctrl+C) and restart them.

---

## 🎯 What Each Key Enables

| API Key | Feature Unlocked | Without It |
|---------|------------------|------------|
| **Gemini** | AI chat in 11 languages | ❌ Chat won't work |
| **OpenWeather** | Better weather data | ✅ Uses Open-Meteo (free) |
| **Hugging Face** | AI plant detection | ✅ Uses local model |

---

## 💡 Pro Tips

1. **Start with Gemini only** - That's the most important one for chat
2. **OpenWeather takes 10 min** - Wait after signup before testing
3. **Keep keys private** - Don't share or commit to GitHub
4. **Test after each key** - Run `python test_free_apis.py`

---

## 🐛 Common Issues

### "Invalid API key"
- Check for extra spaces in `.env`
- Verify you copied the complete key
- For OpenWeather, wait 10 minutes after signup

### "Rate limit exceeded"
- Gemini: Max 60 requests/minute
- OpenWeather: Max 1,000/day
- Hugging Face: Max 30,000/month

### Keys not working?
- Restart backend servers after updating `.env`
- Check `.env` file is in `SarvamMaster` folder
- Verify no quotes around keys in `.env`

---

## 📞 Need Help?

1. Read `FREE_API_SETUP.md` for detailed guide
2. Run `python test_free_apis.py` to diagnose
3. Check console logs for error messages

---

**⏱️ Total Time: 5 minutes to get all keys!**

**🎉 Then you'll have a fully AI-powered farming app!**

