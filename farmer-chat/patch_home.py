content = open('src/components/HomePage.jsx', 'r', encoding='utf-8-sig').read()

# Add Plant Doctor entry to each language in FEAT
plant_entries = {
    'en-IN': '      { img: IMG.soil, icon: "🌿", title: "Plant Doctor", desc: "Photo upload crop disease diagnosis with treatment plan.", path: "/plant", color: "#2e7d32", bg: "#f1f8e9" },\n',
    'ta-IN': '      { img: IMG.soil, icon: "🌿", title: "தாவர மருத்துவர்", desc: "பயிர் புகைப்படம் பதிவேற்றி நோயை கண்டறியுங்கள்.", path: "/plant", color: "#2e7d32", bg: "#f1f8e9" },\n',
    'hi-IN': '      { img: IMG.soil, icon: "🌿", title: "पौधा डॉक्टर", desc: "फसल की फोटो अपलोड करें और बीमारी पहचानें।", path: "/plant", color: "#2e7d32", bg: "#f1f8e9" },\n',
    'te-IN': '      { img: IMG.soil, icon: "🌿", title: "మొక్క వైద్యుడు", desc: "పంట ఫోటో అప్‌లోడ్ చేసి వ్యాధిని గుర్తించండి.", path: "/plant", color: "#2e7d32", bg: "#f1f8e9" },\n',
    'kn-IN': '      { img: IMG.soil, icon: "🌿", title: "ಸಸ್ಯ ವೈದ್ಯ", desc: "ಬೆಳೆ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ರೋಗ ಪತ್ತೆ ಮಾಡಿ.", path: "/plant", color: "#2e7d32", bg: "#f1f8e9" },\n',
    'ml-IN': '      { img: IMG.soil, icon: "🌿", title: "സസ്യ ഡോക്ടർ", desc: "വിള ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് രോഗം കണ്ടെത്തുക.", path: "/plant", color: "#2e7d32", bg: "#f1f8e9" },\n',
}

# Insert after the first feature in each language block
for lang, entry in plant_entries.items():
    marker = f"path: \"/chat\", color: \"#1a7a32\", bg: \"#e8f5e9\" }},"
    # Find the occurrence within this language's block
    lang_start = content.find(f"'{lang}': [")
    if lang_start == -1:
        print(f"Language block not found: {lang}")
        continue
    chat_pos = content.find(marker, lang_start)
    if chat_pos == -1:
        print(f"Chat entry not found for: {lang}")
        continue
    insert_pos = content.find('\n', chat_pos) + 1
    content = content[:insert_pos] + entry + content[insert_pos:]
    print(f"Inserted Plant Doctor for {lang}")

open('src/components/HomePage.jsx', 'w', encoding='utf-8').write(content)
print("Done!")
