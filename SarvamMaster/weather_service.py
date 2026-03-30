import requests
from datetime import datetime

def get_weather(lat, lon):
    """
    Fetches real-time weather using Open-Meteo API.
    Includes temperature, humidity, wind speed, and precipitation data.
    """
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=relative_humidity_2m,temperature_2m,wind_speed_10m,precipitation,weather_code&hourly=precipitation_probability&forecast_days=1&timezone=auto"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        current = data.get("current", {})
        hourly = data.get("hourly", {})
        
        # Build comprehensive weather object
        weather = {
            'temperature': current.get('temperature_2m', 0),
            'humidity': current.get('relative_humidity_2m', 0),
            'windspeed': current.get('wind_speed_10m', 0),
            'precipitation': current.get('precipitation', 0),
            'weather_code': current.get('weather_code', 0),
            'precipitation_probability': hourly.get('precipitation_probability', [0])[0] if hourly.get('precipitation_probability') else 0,
            'timestamp': datetime.now().isoformat()
        }
        return weather
    except Exception as e:
        print(f"Error fetching weather: {e}")
        return None

def generate_alert(weather):
    """
    Generates smart farming alerts based on weather conditions.
    Returns a list of alert objects with severity, type, and recommendations.
    """
    if not weather:
        return []
    
    temp = weather.get("temperature", 0)
    wind_speed = weather.get("windspeed", 0)
    humidity = weather.get("humidity", 0)
    precipitation = weather.get("precipitation", 0)
    precip_prob = weather.get("precipitation_probability", 0)
    
    alerts = []
    
    # Temperature-based alerts
    if temp > 40:
        alerts.append({
            "severity": "critical",
            "type": "extreme_heat",
            "title": "🔥 Extreme Heat Alert",
            "message": f"Temperature at {temp}°C - Critical heat stress risk",
            "recommendations": [
                "Irrigate crops immediately, preferably early morning or evening",
                "Apply mulch to retain soil moisture",
                "Avoid any field operations during peak heat (11 AM - 4 PM)",
                "Monitor livestock closely for heat stress"
            ]
        })
    elif temp > 35:
        alerts.append({
            "severity": "high",
            "type": "heat_wave",
            "title": "☀️ Heat Wave Warning",
            "message": f"High temperature at {temp}°C",
            "recommendations": [
                "Increase irrigation frequency",
                "Ensure adequate water supply for crops",
                "Consider shade nets for sensitive crops"
            ]
        })
    elif temp < 5:
        alerts.append({
            "severity": "high",
            "type": "frost",
            "title": "❄️ Frost Warning",
            "message": f"Temperature at {temp}°C - Frost risk",
            "recommendations": [
                "Cover sensitive plants with frost cloth",
                "Use smudge pots or heaters in orchards",
                "Delay planting of frost-sensitive crops",
                "Harvest mature crops before frost damage"
            ]
        })
    elif temp < 10:
        alerts.append({
            "severity": "medium",
            "type": "cold",
            "title": "🌡️ Cold Weather Alert",
            "message": f"Low temperature at {temp}°C",
            "recommendations": [
                "Protect seedlings from cold stress",
                "Reduce irrigation frequency"
            ]
        })
    
    # Wind-based alerts
    if wind_speed > 40:
        alerts.append({
            "severity": "critical",
            "type": "storm",
            "title": "🌪️ Storm Warning",
            "message": f"Very high wind speed at {wind_speed} km/h",
            "recommendations": [
                "Secure all loose equipment and materials immediately",
                "Postpone spraying operations",
                "Check and reinforce greenhouse structures",
                "Harvest ready crops if possible",
                "Stay indoors and avoid field work"
            ]
        })
    elif wind_speed > 30:
        alerts.append({
            "severity": "high",
            "type": "high_wind",
            "title": "💨 High Wind Alert",
            "message": f"Strong winds at {wind_speed} km/h",
            "recommendations": [
                "Avoid pesticide/fertilizer spraying - high drift risk",
                "Secure farming equipment and structures",
                "Delay drone operations"
            ]
        })
    
    # Humidity and disease risk alerts
    if humidity > 85 and temp > 20 and temp < 30:
        alerts.append({
            "severity": "high",
            "type": "disease_risk",
            "title": "🦠 High Disease Risk",
            "message": f"Humidity at {humidity}% with favorable temperature",
            "recommendations": [
                "Monitor crops for fungal diseases (leaf spot, blight, mildew)",
                "Improve air circulation in dense plantings",
                "Apply preventive fungicides if needed",
                "Avoid overhead irrigation",
                "Remove infected plant material immediately"
            ]
        })
    elif humidity > 80:
        alerts.append({
            "severity": "medium",
            "type": "high_humidity",
            "title": "💧 High Humidity Alert",
            "message": f"Humidity at {humidity}%",
            "recommendations": [
                "Watch for fungal disease symptoms",
                "Ensure good field drainage"
            ]
        })
    
    # Precipitation alerts
    if precipitation > 50 or precip_prob > 80:
        alerts.append({
            "severity": "high",
            "type": "heavy_rain",
            "title": "🌧️ Heavy Rain Alert",
            "message": f"Heavy rainfall detected or expected ({precip_prob}% probability)",
            "recommendations": [
                "Postpone all spraying operations",
                "Avoid field work to prevent soil compaction",
                "Check drainage systems",
                "Protect harvested produce from moisture",
                "Delay fertilizer application"
            ]
        })
    elif precipitation > 10 or precip_prob > 60:
        alerts.append({
            "severity": "medium",
            "type": "rain",
            "title": "🌦️ Rain Expected",
            "message": f"Rainfall likely ({precip_prob}% probability)",
            "recommendations": [
                "Postpone pesticide spraying",
                "Delay irrigation schedules"
            ]
        })
    
    # Optimal conditions
    if not alerts and temp >= 20 and temp <= 30 and humidity >= 40 and humidity <= 70 and wind_speed < 20:
        alerts.append({
            "severity": "low",
            "type": "optimal",
            "title": "✅ Optimal Conditions",
            "message": "Weather conditions are favorable for farming",
            "recommendations": [
                "Good time for spraying operations",
                "Suitable for transplanting",
                "Ideal for field inspections"
            ]
        })
    
    # If no specific alerts but conditions are normal
    if not alerts:
        alerts.append({
            "severity": "low",
            "type": "normal",
            "title": "🌤️ Normal Conditions",
            "message": "No immediate weather concerns",
            "recommendations": [
                "Continue regular farming activities",
                "Monitor weather updates regularly"
            ]
        })
    
    return alerts
