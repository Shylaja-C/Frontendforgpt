import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# 📁 dataset path (CHANGE THIS)
dataset_path = "C:\Users\seema\Downloads\archive (1).zip\PlantVillage       "

# 🧪 image processing
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

val_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# 🧠 CNN MODEL
model = tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(train_data.num_classes, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# 🚀 TRAIN
model.fit(
    train_data,
    validation_data=val_data,
    epochs=3   # keep small for now
)

# 💾 SAVE MODEL
model.save("model.h5")

print("✅ Model saved as model.h5")