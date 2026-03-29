content = open('src/components/HomePage.jsx', 'r', encoding='utf-8-sig').read()

# Replace the entire IMG object with proper images
old_start = content.find('const IMG = {')
old_end = content.find('};', old_start) + 2

new_img = '''const IMG = {
  hero:       "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=85",
  farmer1:    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
  farmer2:    "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
  farmer3:    "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
  plantDoc:   "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
  weatherImg: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800&q=80",
  tipsImg:    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
  rice:       "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=900&q=80",
  wheat:      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900&q=80",
  veggie:     "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
  weather:    "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=900&q=80",
  market:     "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
  soil:       "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80",
  irrigation: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=80",
};'''

content = content[:old_start] + new_img + content[old_end:]

# Now fix the FEAT entries to use proper images per feature
# AI Farming Chat -> farmer1 (Indian farmer)
# Plant Doctor -> plantDoc (irrigation/green field)
# Live Weather -> weatherImg (sky/clouds)
# Expert Tips -> tipsImg (vegetables/farming)
# Market Prices -> market

# Fix en-IN features
content = content.replace(
    '{ img: IMG.soil, icon: "🌿", title: "Plant Doctor", desc: "Photo upload crop disease diagnosis with treatment plan.", path: "/plant", color: "#2e7d32", bg: "#f1f8e9" },',
    '{ img: IMG.plantDoc, icon: "🌿", title: "Plant Doctor", desc: "Photo upload crop disease diagnosis with treatment plan.", path: "/plant", color: "#2e7d32", bg: "#f1f8e9" },'
)
content = content.replace(
    '{ img: IMG.weather, icon: "🌤️", title: "Live Weather", desc: "GPS-based weather with 5-day forecast and farming alerts.", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },',
    '{ img: IMG.weatherImg, icon: "🌤️", title: "Live Weather", desc: "GPS-based weather with 5-day forecast and farming alerts.", path: "/weather", color: "#1565c0", bg: "#e3f2fd" },'
)

open('src/components/HomePage.jsx', 'w', encoding='utf-8').write(content)
print('Images fixed!')
print('farmer1:', 'photo-1500937386664' in content)
print('plantDoc:', 'IMG.plantDoc' in content)
print('weatherImg:', 'IMG.weatherImg' in content)
