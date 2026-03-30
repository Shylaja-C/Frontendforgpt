from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import json

# 🔹 Your modules
from model import predict_image
from config import LANGUAGES, LANGUAGE_CODES
from sarvam_api import transcribe_audio, get_llm_advisory, get_tts_audio
from db import save_chat, get_chat_history
from weather_service import get_weather, generate_alert
from pest_logic import report_pest

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

# 🌿 MAIN ANALYSIS API
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    file_path = "temp.jpg"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    disease = predict_image(file_path)

    # 🚨 URGENCY
    if disease in ["Fungal infection", "Pest attack"]:
        urgency = {"level": "HIGH 🔴", "time": "0-24 hrs"}
    elif disease == "Nutrient deficiency":
        urgency = {"level": "MEDIUM 🟠", "time": "24-48 hrs"}
    else:
        urgency = {"level": "LOW 🟢", "time": "Monitor"}

    # 🆘 CPR PLAN
    cpr_plan = {"0-3 hrs": [], "3-12 hrs": [], "Day 1": [], "Day 2": []}

    if disease == "Nutrient deficiency":
        cpr_plan["Day 1"].append("Apply urea fertilizer")
    elif disease == "Fungal infection":
        cpr_plan["Day 1"].append("Apply fungicide")
    elif disease == "Pest attack":
        cpr_plan["Day 1"].append("Spray pesticide")

    # 🎯 SEVERITY
    severity = 80 if disease == "Fungal infection" else 70 if disease == "Pest attack" else 40

    # 📊 SURVIVAL
    survival = 20 if severity >= 80 else 50 if severity >= 50 else 80

    # 🧠 DECISION
    if survival >= 60:
        decision = "Continue Treatment ✅"
        alternatives = []
    else:
        decision = "Replant ❌"
        alternatives = [{"type": "Recycle", "action": "Convert to compost"}]

    return {
        "disease": disease,
        "urgency": urgency,
        "severity": severity,
        "survival_probability": survival,
        "decision": decision,
        "plant_cpr_plan": cpr_plan,
        "alternatives": alternatives
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

# 💬 CHAT
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

    if audio:
        user_query = transcribe_audio(await audio.read())
    else:
        user_query = text

    reply = get_llm_advisory(user_query, chat_history, language, user_session_metadata["weather"])

    background_tasks.add_task(save_chat, user_id, "user", user_query, language)
    background_tasks.add_task(save_chat, user_id, "assistant", reply, language)

    return {"query": user_query, "reply": reply}

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