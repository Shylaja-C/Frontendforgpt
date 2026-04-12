"""
Free AI Service Integration
- Chat: Google Gemini API (free tier)
- Plant Analysis: Google Gemini Vision API (free tier) - actually looks at the image
"""
import os
import base64
import json
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY", "")


def get_gemini_response(user_query, chat_history, language, weather_context):
    """Get AI chat response using Google Gemini API."""
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        return "⚠️ AI service not configured. Please add GOOGLE_GEMINI_API_KEY to .env file. Get free key from: https://aistudio.google.com/app/apikey"

    try:
        system_prompt = f"""You are FarmGPT, an expert agricultural advisor for Indian farmers.
LANGUAGE: Respond ONLY in {language}.
WEATHER: {weather_context}
Give specific, practical farming advice with dosages and timings. Be warm and concise."""

        payload = {
            "contents": [{"parts": [{"text": f"{system_prompt}\n\nUser: {user_query}"}]}]
        }
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        resp = requests.post(url, json=payload, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print(f"❌ Gemini chat error: {e}")
        return "Sorry, something went wrong. Please try again."


def get_plant_disease_analysis(image_path):
    """
    Analyze plant disease by sending the actual image to Gemini Vision AI.
    This is REAL AI analysis - Gemini actually looks at the photo.
    """
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        print("❌ No Gemini API key - cannot do real plant analysis")
        return {
            "disease": "AI Key Required",
            "confidence": 0,
            "severity": 0,
            "source": "no_api_key",
            "message": "Add GOOGLE_GEMINI_API_KEY to SarvamMaster/.env for real AI diagnosis. Free key: https://aistudio.google.com/app/apikey"
        }

    try:
        # Read and encode image
        with open(image_path, "rb") as f:
            image_data = base64.b64encode(f.read()).decode("utf-8")

        # Detect image type
        mime_type = "image/jpeg"
        if image_path.lower().endswith(".png"):
            mime_type = "image/png"
        elif image_path.lower().endswith(".webp"):
            mime_type = "image/webp"

        prompt = """You are an expert plant pathologist. Look at this plant image carefully and diagnose it.

Respond ONLY with a valid JSON object, no markdown, no extra text:
{
  "disease": "specific disease or condition name",
  "severity": 65,
  "confidence": 0.85,
  "cause": "fungal or pest or bacterial or nutrient or viral or healthy",
  "summary": "one sentence of what you see in the image"
}

Rules:
- disease: be specific (e.g. "Rice Blast", "Fall Armyworm Damage", "Nitrogen Deficiency", "Healthy Plant", "Leaf Blight")
- severity: 0-100 integer (0=perfectly healthy, 100=completely destroyed/dead)
- confidence: 0.0-1.0 how confident you are
- cause: exactly one of: fungal, pest, bacterial, nutrient, viral, healthy
- summary: describe what visible symptoms you see"""

        payload = {
            "contents": [{
                "parts": [
                    {"text": prompt},
                    {"inline_data": {"mime_type": mime_type, "data": image_data}}
                ]
            }],
            "generationConfig": {"temperature": 0.1, "maxOutputTokens": 300}
        }

        # Try models in order until one works
        models = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-2.0-flash-lite"]
        resp = None
        last_error = None
        for model in models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
            try:
                resp = requests.post(url, json=payload, timeout=30)
                if resp.status_code == 429:
                    print(f"⚠️ {model} rate limited, trying next...")
                    continue
                resp.raise_for_status()
                break
            except Exception as e:
                last_error = e
                continue

        if resp is None or not resp.ok:
            status = resp.status_code if resp is not None else 0
            if status == 429 or "429" in str(last_error):
                return {
                    "disease": "Rate Limit - Try Again",
                    "confidence": 0,
                    "severity": 0,
                    "source": "rate_limited",
                    "message": "Gemini free tier limit reached. Please wait 1 minute and try again."
                }
            raise Exception(f"All models failed. Last error: {last_error}")
        data = resp.json()

        raw_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
        # Strip markdown code fences if present
        raw_text = raw_text.replace("```json", "").replace("```", "").strip()

        result = json.loads(raw_text)

        disease    = result.get("disease", "Unknown")
        severity   = max(0, min(100, int(result.get("severity", 50))))
        confidence = max(0.0, min(1.0, float(result.get("confidence", 0.8))))
        summary    = result.get("summary", "")

        print(f"✅ Gemini Vision: {disease} | severity:{severity}% | confidence:{confidence:.0%}")
        print(f"   Summary: {summary}")

        return {
            "disease": disease,
            "confidence": round(confidence, 2),
            "severity": severity,
            "source": "gemini_vision",
            "message": summary
        }

    except json.JSONDecodeError as e:
        print(f"⚠️ Gemini returned non-JSON: {raw_text[:100]} | error: {e}")
        # Try to extract disease name from raw text as fallback
        return {
            "disease": "Analysis Error",
            "confidence": 0.5,
            "severity": 50,
            "source": "gemini_vision_error",
            "message": "Could not parse AI response. Please try again."
        }
    except Exception as e:
        print(f"❌ Gemini Vision failed: {e}")
        return {
            "disease": "Analysis Failed",
            "confidence": 0,
            "severity": 0,
            "source": "error",
            "message": f"Error: {str(e)}"
        }

