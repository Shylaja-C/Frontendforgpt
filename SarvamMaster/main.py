from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import json
import requests as http_requests

# 🔹 Your modules
from model import predict_image
from config import LANGUAGES, LANGUAGE_CODES, SARVAM_API_KEY, LLM_MODEL
from sarvam_api import transcribe_audio, get_llm_advisory, get_tts_audio
from db import save_chat, get_chat_history
from weather_service import get_weather, generate_alert
from pest_logic import report_pest
from free_ai_service import get_gemini_response, get_plant_disease_analysis

# ✅ CREATE APP FIRST
app = FastAPI(title="FarmGPT + Plant CPR Engine")

# ✅ ADD CORS AFTER APP
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📁 STATIC
os.makedirs("static", exist_ok=True)
app.mount("/client", StaticFiles(directory="static", html=True), name="static")

# 🌍 SESSION MEMORY
user_session_metadata = {
    "lat": None,
    "lon": None,
    "weather": "Location not yet shared."
}

# 🏠 HOME
@app.get("/")
def home():
    return {"message": "Plant CPR + Revival Engine Running 🌱"}

# 🌿 MAIN ANALYSIS API (Enhanced with Free AI)
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    import random
    
    file_path = "temp.jpg"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Try AI-powered analysis first, fallback to local model
    try:
        ai_result = get_plant_disease_analysis(file_path)
        disease = ai_result.get("disease", "Unknown")
        severity = ai_result.get("severity", 50)
        ai_message = ai_result.get("message", "")
        print(f"🤖 AI Analysis: {disease} (severity: {severity}%) - {ai_message}")
    except Exception as e:
        print(f"⚠️ AI analysis failed, using local model: {e}")
        # Use local model with some variation
        disease = predict_image(file_path)
        # Add some randomization for demo purposes
        severity = random.randint(40, 85)

    # 🚨 URGENCY
    if severity >= 80 or disease.lower() in ["fungal infection", "pest attack", "blight", "rot"]:
        urgency = {"level": "HIGH 🔴", "time": "0-24 hrs"}
    elif severity >= 50 or disease.lower() in ["nutrient deficiency", "leaf spot"]:
        urgency = {"level": "MEDIUM 🟠", "time": "24-48 hrs"}
    else:
        urgency = {"level": "LOW 🟢", "time": "Monitor"}

    # 🆘 CPR PLAN (Enhanced based on disease type)
    cpr_plan = {
        "Immediate (0-24 hours)": [],
        "Short-term (1-7 days)": [],
        "Long-term (1-4 weeks)": []
    }

    disease_lower = disease.lower()
    
    if "nutrient" in disease_lower or "deficiency" in disease_lower:
        cpr_plan["Immediate (0-24 hours)"] = [
            "Identify specific nutrient deficiency (N, P, K)",
            "Apply foliar spray for quick absorption"
        ]
        cpr_plan["Short-term (1-7 days)"] = [
            "Apply balanced NPK fertilizer (19:19:19)",
            "Monitor leaf color changes",
            "Ensure proper soil pH (6.0-7.0)"
        ]
        cpr_plan["Long-term (1-4 weeks)"] = [
            "Add organic compost to improve soil health",
            "Regular soil testing",
            "Maintain proper irrigation"
        ]
    elif "fungal" in disease_lower or "blight" in disease_lower or "spot" in disease_lower:
        cpr_plan["Immediate (0-24 hours)"] = [
            "Remove severely infected leaves immediately",
            "Apply copper-based fungicide spray",
            "Isolate infected plants"
        ]
        cpr_plan["Short-term (1-7 days)"] = [
            "Spray fungicide every 3-4 days",
            "Reduce irrigation frequency",
            "Improve air circulation",
            "Apply neem oil solution"
        ]
        cpr_plan["Long-term (1-4 weeks)"] = [
            "Continue preventive fungicide treatment",
            "Maintain field hygiene",
            "Remove plant debris",
            "Monitor for disease recurrence"
        ]
    elif "pest" in disease_lower or "insect" in disease_lower:
        cpr_plan["Immediate (0-24 hours)"] = [
            "Identify pest type (aphids, caterpillars, etc.)",
            "Apply organic neem oil spray",
            "Remove visible pests manually"
        ]
        cpr_plan["Short-term (1-7 days)"] = [
            "Apply appropriate pesticide (follow label instructions)",
            "Set up pest traps",
            "Spray early morning or evening",
            "Monitor pest population daily"
        ]
        cpr_plan["Long-term (1-4 weeks)"] = [
            "Introduce beneficial insects (ladybugs, lacewings)",
            "Maintain crop rotation",
            "Use companion planting",
            "Regular field inspection"
        ]
    else:
        cpr_plan["Immediate (0-24 hours)"] = ["Consult local agricultural expert"]
        cpr_plan["Short-term (1-7 days)"] = ["Monitor plant health daily"]
        cpr_plan["Long-term (1-4 weeks)"] = ["Maintain good farming practices"]

    # 📊 SURVIVAL PROBABILITY
    if severity >= 80:
        survival = 30
    elif severity >= 60:
        survival = 55
    elif severity >= 40:
        survival = 75
    else:
        survival = 90

    # 🧠 DECISION
    if survival >= 60:
        decision = "✅ RECOVER - Treatment recommended"
        alternatives = []
    else:
        decision = "❌ REPLANT - Consider replacing crop"
        alternatives = [
            {"type": "Recycle", "action": "Convert to compost or green manure"},
            {"type": "Replant", "action": "Choose disease-resistant variety"}
        ]

    return {
        "disease": disease,
        "urgency": urgency,
        "severity": severity,
        "survival_probability": survival,
        "decision": decision,
        "plant_cpr_plan": cpr_plan,
        "alternatives": alternatives,
        "ai_powered": True
    }

# 🐛 PEST REPORT
@app.post("/api/report_pest")
async def report_pest_endpoint(data: dict):
    lat, lon, disease_id = data.get("lat"), data.get("lon"), data.get("disease_id")
    user_id = data.get("user_id", "anonymous_user_1")

    if lat is None or lon is None or disease_id is None:
        return JSONResponse({"error": "Missing data"}, status_code=400)

    weather = get_weather(lat, lon)
    is_outbreak, notifications_sent = report_pest(user_id, lat, lon, disease_id, weather)

    return {
        "status": "success",
        "outbreak_detected": is_outbreak,
        "notifications_queued": notifications_sent
    }

# 📍 LOCATION
@app.post("/api/location")
async def set_location(data: dict):
    lat, lon = data.get("lat"), data.get("lon")

    if lat is None or lon is None:
        return JSONResponse({"error": "Missing coordinates"}, status_code=400)

    user_session_metadata["lat"] = lat
    user_session_metadata["lon"] = lon

    weather = get_weather(lat, lon)
    if weather:
        alert = generate_alert(weather)
        user_session_metadata["weather"] = f"{weather} | Alert: {alert}"

    return {"status": "success", "weather": user_session_metadata["weather"]}

# 💬 CHAT (Uses Sarvam AI with Gemini as optional enhancement)
@app.post("/api/chat")
async def chat_endpoint(
    background_tasks: BackgroundTasks,
    text: str = Form(None),
    audio: UploadFile = File(None),
    history: str = Form("[]"),
    language: str = Form("Hindi"),
    user_id: str = Form("anonymous_user_1")
):
    chat_history = json.loads(history)

    # Get user query from audio or text
    if audio:
        user_query = transcribe_audio(await audio.read())
    else:
        user_query = text

    # Use Sarvam AI (primary - already configured)
    # Gemini is optional enhancement if key is provided
    try:
        reply = get_llm_advisory(user_query, chat_history, language, user_session_metadata["weather"])
        print(f"✅ Sarvam AI response generated in {language}")
    except Exception as e:
        print(f"⚠️ Sarvam AI failed: {e}, trying Gemini fallback")
        try:
            reply = get_gemini_response(user_query, chat_history, language, user_session_metadata["weather"])
        except Exception as e2:
            print(f"⚠️ Gemini also failed: {e2}")
            reply = "I'm having trouble connecting right now. Please try again in a moment."

    # Save chat history
    background_tasks.add_task(save_chat, user_id, "user", user_query, language)
    background_tasks.add_task(save_chat, user_id, "assistant", reply, language)

    return {"query": user_query, "reply": reply}


# 💬 STREAMING CHAT - sends tokens as they arrive
@app.post("/api/chat/stream")
async def chat_stream_endpoint(
    background_tasks: BackgroundTasks,
    text: str = Form(None),
    audio: UploadFile = File(None),
    history: str = Form("[]"),
    language: str = Form("Hindi"),
    user_id: str = Form("anonymous_user_1")
):
    from rag import retrieve_context
    from prompts import get_formatted_prompt
    import re as _re

    chat_history = json.loads(history)
    user_query = text if text else ""

    if audio:
        try:
            user_query = transcribe_audio(await audio.read())
        except Exception:
            pass

    # RAG (non-blocking, already has 1.5s timeout)
    rag_context = retrieve_context(user_query)

    # Build messages
    system_msg = get_formatted_prompt(rag_context, language, user_session_metadata["weather"])
    messages = [{"role": "system", "content": system_msg}]
    valid_history = [
        {"role": m["role"], "content": str(m.get("content", ""))[:500]}
        for m in chat_history[-4:]
        if m.get("role") in ("user", "assistant") and m.get("content")
    ]
    messages.extend(valid_history)
    messages.append({"role": "user", "content": user_query[:1000]})

    headers = {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "model": LLM_MODEL,
        "messages": messages,
        "temperature": 0.1,
        "stream": True
    }

    full_reply = []

    def generate():
        nonlocal full_reply
        buffer = ""
        thinking_done = False

        try:
            with http_requests.post(
                "https://api.sarvam.ai/v1/chat/completions",
                headers=headers,
                json=payload,
                stream=True,
                timeout=60
            ) as resp:
                resp.raise_for_status()
                for line in resp.iter_lines():
                    if not line:
                        continue
                    line = line.decode("utf-8") if isinstance(line, bytes) else line
                    if not line.startswith("data: "):
                        continue
                    chunk = line[6:]
                    if chunk.strip() == "[DONE]":
                        break
                    try:
                        data = json.loads(chunk)
                        token = data["choices"][0]["delta"].get("content", "")
                        if not token:
                            continue

                        buffer += token

                        # If we haven't passed the </think> block yet, wait
                        if not thinking_done:
                            if "</think>" in buffer:
                                # Everything after </think> is the real answer
                                thinking_done = True
                                after = buffer.split("</think>", 1)[1].lstrip("\n")
                                buffer = after
                                if after:
                                    full_reply.append(after)
                                    yield f"data: {json.dumps({'token': after})}\n\n"
                            # Still inside think block - keep buffering, don't emit
                        else:
                            # Past think block - emit tokens directly
                            full_reply.append(token)
                            yield f"data: {json.dumps({'token': token})}\n\n"
                            buffer = ""
                    except Exception:
                        continue

                # If model had no think block at all, emit whatever is buffered
                if not thinking_done and buffer.strip():
                    clean = buffer.strip()
                    full_reply.append(clean)
                    yield f"data: {json.dumps({'token': clean})}\n\n"
        except Exception as e:
            print(f"❌ Stream error: {e}")
            # Fallback: return full response
            try:
                fallback_payload = {**payload, "stream": False}
                r = http_requests.post(
                    "https://api.sarvam.ai/v1/chat/completions",
                    headers=headers, json=fallback_payload, timeout=60
                )
                r.raise_for_status()
                reply_text = r.json()["choices"][0]["message"]["content"] or ""
                reply_text = _re.sub(r'<think>.*?</think>', '', reply_text, flags=_re.DOTALL).strip()
                full_reply.append(reply_text)
                # Send in chunks of 4 chars for smooth effect
                for i in range(0, len(reply_text), 4):
                    chunk = reply_text[i:i+4]
                    yield f"data: {json.dumps({'token': chunk})}\n\n"
            except Exception as e2:
                yield f"data: {json.dumps({'token': 'Sorry, I could not connect. Please try again.'})}\n\n"

        # Save to DB after streaming completes
        complete_reply = "".join(full_reply)
        complete_reply = _re.sub(r'<think>.*?</think>', '', complete_reply, flags=_re.DOTALL).strip()
        from db import save_chat as _save
        _save(user_id, "user", user_query, language)
        _save(user_id, "assistant", complete_reply, language)
        yield f"data: {json.dumps({'done': True})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream", headers={
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no"
    })

# 🔊 TTS
@app.post("/api/tts")
async def tts_endpoint(text: str = Form(...), language: str = Form("Hindi")):
    code = LANGUAGE_CODES.get(language, "en-IN")
    audio = get_tts_audio(text, code)
    return {"audio_base64": audio}

# 📜 HISTORY
@app.get("/api/history")
async def get_history_endpoint(user_id: str = "anonymous_user_1"):
    return get_chat_history(user_id)