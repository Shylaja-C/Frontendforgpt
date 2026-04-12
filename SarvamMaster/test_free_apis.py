"""
Test script for free API integrations
Run this to verify your API keys are working correctly
"""
import os
from dotenv import load_dotenv
import requests

load_dotenv()

def test_openweather():
    """Test OpenWeatherMap API"""
    print("\n🌤️  Testing OpenWeatherMap API...")
    api_key = os.getenv("OPENWEATHER_API_KEY", "")
    
    if not api_key or api_key == "your_openweather_api_key_here":
        print("❌ OPENWEATHER_API_KEY not configured in .env")
        print("   Get free key from: https://openweathermap.org/api")
        return False
    
    try:
        # Test with Delhi coordinates
        url = f"https://api.openweathermap.org/data/2.5/weather?lat=28.6139&lon=77.2090&appid={api_key}&units=metric"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        temp = data['main']['temp']
        location = data['name']
        
        print(f"✅ OpenWeatherMap API working!")
        print(f"   Location: {location}")
        print(f"   Temperature: {temp}°C")
        return True
    except Exception as e:
        print(f"❌ OpenWeatherMap API failed: {e}")
        return False


def test_gemini():
    """Test Google Gemini API"""
    print("\n🤖 Testing Google Gemini API...")
    api_key = os.getenv("GOOGLE_GEMINI_API_KEY", "")
    
    if not api_key or api_key == "your_gemini_api_key_here":
        print("❌ GOOGLE_GEMINI_API_KEY not configured in .env")
        print("   Get free key from: https://aistudio.google.com/app/apikey")
        return False
    
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}"
        
        payload = {
            "contents": [{
                "parts": [{
                    "text": "Say 'Hello from Gemini!' in one sentence."
                }]
            }]
        }
        
        response = requests.post(url, json=payload, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        if "candidates" in data and len(data["candidates"]) > 0:
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            print(f"✅ Google Gemini API working!")
            print(f"   Response: {text}")
            return True
        else:
            print("❌ Unexpected response format")
            return False
            
    except Exception as e:
        print(f"❌ Google Gemini API failed: {e}")
        return False


def test_huggingface():
    """Test Hugging Face API"""
    print("\n🌿 Testing Hugging Face API...")
    api_key = os.getenv("HUGGINGFACE_API_KEY", "")
    
    if not api_key or api_key == "your_huggingface_api_key_here":
        print("❌ HUGGINGFACE_API_KEY not configured in .env")
        print("   Get free token from: https://huggingface.co/settings/tokens")
        return False
    
    try:
        # Test with a simple text classification model
        url = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"
        headers = {"Authorization": f"Bearer {api_key}"}
        
        payload = {"inputs": "This is a test"}
        
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        print(f"✅ Hugging Face API working!")
        print(f"   API token is valid")
        return True
            
    except Exception as e:
        print(f"❌ Hugging Face API failed: {e}")
        return False


def test_open_meteo():
    """Test Open-Meteo API (no key needed)"""
    print("\n🌍 Testing Open-Meteo API (fallback)...")
    
    try:
        url = "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        temp = data['current']['temperature_2m']
        
        print(f"✅ Open-Meteo API working!")
        print(f"   Temperature: {temp}°C")
        print(f"   (This is the free fallback for weather)")
        return True
    except Exception as e:
        print(f"❌ Open-Meteo API failed: {e}")
        return False


if __name__ == "__main__":
    print("=" * 60)
    print("🧪 FREE API INTEGRATION TEST")
    print("=" * 60)
    
    results = {
        "OpenWeatherMap": test_openweather(),
        "Google Gemini": test_gemini(),
        "Hugging Face": test_huggingface(),
        "Open-Meteo (fallback)": test_open_meteo()
    }
    
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    for api, status in results.items():
        status_icon = "✅" if status else "❌"
        print(f"{status_icon} {api}: {'WORKING' if status else 'NOT CONFIGURED'}")
    
    working_count = sum(results.values())
    total_count = len(results)
    
    print("\n" + "=" * 60)
    print(f"🎯 {working_count}/{total_count} APIs configured and working")
    print("=" * 60)
    
    if working_count == 0:
        print("\n⚠️  No APIs configured yet!")
        print("📖 Read FREE_API_SETUP.md for setup instructions")
    elif working_count < total_count:
        print("\n⚠️  Some APIs need configuration")
        print("📖 Read FREE_API_SETUP.md for missing API setup")
    else:
        print("\n🎉 All APIs configured successfully!")
        print("🚀 Your app is ready with free AI features!")
    
    print("\n")
