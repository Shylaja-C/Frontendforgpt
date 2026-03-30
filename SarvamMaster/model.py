import tensorflow as tf
import numpy as np
import cv2

# model = tf.keras.models.load_model("model.h5")  # Commented out for demo mode
# classes = list(model.class_names) if hasattr(model, "class_names") else []
classes = ["Healthy", "Nutrient deficiency", "Fungal infection", "Pest attack"]

def predict_image(image_path):
    
    # Fake AI predictions (for demo)
    import random
    
    diseases = [
        "Healthy",
        "Nutrient deficiency",
        "Fungal infection",
        "Pest attack"
    ]
    
    return random.choice(diseases)