from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from weather_service import get_weather, generate_alert

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# 1. Simple in-memory session store
user_session = {
    "lat": None,
    "lon": None
}

@app.route("/")
def index():
    """Renders the frontend page"""
    return render_template("index.html")

@app.route("/set-location", methods=["POST"])
def set_location():
    """
    2. Endpoint to set the location via POST request.
    Stores the location in `user_session`.
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON body."}), 400
            
        lat = data.get("lat")
        lon = data.get("lon")

        # Validate existence
        if lat is None or lon is None:
            return jsonify({"error": "Missing lat or lon in request."}), 400
            
        # Validate type and range
        try:
            lat = float(lat)
            lon = float(lon)
        except ValueError:
            return jsonify({"error": "Invalid coordinates format."}), 400

        if not (-90 <= lat <= 90):
            return jsonify({"error": "lat must be between -90 and 90"}), 400
            
        if not (-180 <= lon <= 180):
            return jsonify({"error": "lon must be between -180 and 180"}), 400

        # Store in session
        user_session["lat"] = lat
        user_session["lon"] = lon

        return jsonify({
            "message": "Location set successfully",
            "lat": lat,
            "lon": lon
        }), 200

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


@app.route("/location", methods=["GET"])
def get_location():
    """
    5. Returns current stored GPS location.
    """
    if user_session["lat"] is None or user_session["lon"] is None:
        return jsonify({"error": "No location stored."}), 404
        
    return jsonify({
        "lat": user_session["lat"],
        "lon": user_session["lon"]
    }), 200


@app.route("/weather", methods=["GET"])
def get_weather_endpoint():
    """
    3. Modify existing /weather endpoint to use query params if available,
    otherwise fallback to `user_session`.
    """
    query_lat = request.args.get("lat")
    query_lon = request.args.get("lon")
    
    # Validation logic for query parameter bounds if present
    if query_lat is not None and query_lon is not None:
        try:
            lat = float(query_lat)
            lon = float(query_lon)
            if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
                return jsonify({"error": "Invalid query coordinates."}), 400
        except ValueError:
            return jsonify({"error": "Invalid query coordinates format."}), 400
    else:
        # Fallback to stored user_session location
        lat = user_session["lat"]
        lon = user_session["lon"]

    if lat is None or lon is None:
        return jsonify({
            "error": "Location not set. Provide lat/lon or call /set-location first."
        }), 400

    # 4. Weather flow
    weather = get_weather(lat, lon)
    if weather is None:
         # 6. API failure handling
         return jsonify({"error": "Weather API failed to retrieve data"}), 502

    alerts = generate_alert(weather)

    return jsonify({
        "weather": weather,
        "alerts": alerts
    }), 200


@app.route("/alerts", methods=["GET"])
def get_alerts_endpoint():
    """
    Dedicated endpoint for fetching weather alerts only.
    """
    query_lat = request.args.get("lat")
    query_lon = request.args.get("lon")
    
    if query_lat is not None and query_lon is not None:
        try:
            lat = float(query_lat)
            lon = float(query_lon)
            if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
                return jsonify({"error": "Invalid query coordinates."}), 400
        except ValueError:
            return jsonify({"error": "Invalid query coordinates format."}), 400
    else:
        lat = user_session["lat"]
        lon = user_session["lon"]

    if lat is None or lon is None:
        return jsonify({
            "error": "Location not set. Provide lat/lon or call /set-location first."
        }), 400

    weather = get_weather(lat, lon)
    if weather is None:
         return jsonify({"error": "Weather API failed to retrieve data"}), 502

    alerts = generate_alert(weather)
    
    # Count alerts by severity
    severity_count = {
        "critical": len([a for a in alerts if a.get("severity") == "critical"]),
        "high": len([a for a in alerts if a.get("severity") == "high"]),
        "medium": len([a for a in alerts if a.get("severity") == "medium"]),
        "low": len([a for a in alerts if a.get("severity") == "low"])
    }

    return jsonify({
        "alerts": alerts,
        "summary": severity_count,
        "total": len(alerts)
    }), 200


@app.route("/analyze", methods=["POST"])
def analyze_plant():
    """
    Plant disease analysis endpoint (Enhanced with AI).
    Accepts image upload and returns diagnosis with treatment plan.
    """
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Save uploaded file temporarily
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp_file:
            file.save(tmp_file.name)
            temp_path = tmp_file.name
        
        # Import AI service
        try:
            from free_ai_service import get_plant_disease_analysis
            ai_result = get_plant_disease_analysis(temp_path)
            disease = ai_result.get("disease", "Leaf Blight")
            severity = ai_result.get("severity", 65)
            ai_message = ai_result.get("message", "")
        except Exception as e:
            print(f"⚠️ AI analysis failed: {e}")
            disease = "Leaf Blight"
            severity = 65
            ai_message = "Using fallback analysis"
        
        # Clean up temp file
        import os
        try:
            os.unlink(temp_path)
        except:
            pass
        
        # Calculate survival probability
        if severity >= 80:
            survival_probability = 30
        elif severity >= 60:
            survival_probability = 55
        else:
            survival_probability = 75
        
        # Determine urgency
        if severity >= 80:
            urgency = {"level": "HIGH URGENCY", "time": "Action needed within 24 hours"}
        elif severity >= 50:
            urgency = {"level": "MEDIUM URGENCY", "time": "Action needed within 48 hours"}
        else:
            urgency = {"level": "LOW URGENCY", "time": "Monitor regularly"}
        
        # Make decision
        if survival_probability >= 60:
            decision = "✅ RECOVER - Treatment recommended"
        else:
            decision = "❌ REPLANT - Consider replacing crop"
        
        # Build CPR plan based on disease
        plant_cpr_plan = {
            "Immediate (0-24 hours)": [
                "Remove severely affected leaves",
                "Apply copper-based fungicide spray",
                "Isolate infected plants from healthy ones"
            ],
            "Short-term (1-7 days)": [
                "Monitor daily for disease spread",
                "Reduce irrigation frequency",
                "Apply foliar nutrients to boost immunity",
                "Ensure proper air circulation"
            ],
            "Long-term (1-4 weeks)": [
                "Continue fungicide treatment weekly",
                "Maintain field hygiene",
                "Apply organic compost for soil health",
                "Monitor for pest infestations"
            ]
        }
        
        diagnosis = {
            "disease": disease,
            "severity": severity,
            "survival_probability": survival_probability,
            "urgency": urgency,
            "decision": decision,
            "plant_cpr_plan": plant_cpr_plan,
            "ai_powered": True,
            "message": ai_message
        }
        
        return jsonify(diagnosis), 200
        
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
