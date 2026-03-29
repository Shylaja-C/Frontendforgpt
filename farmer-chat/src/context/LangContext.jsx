import { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, BASE_API_URL } from '../config';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('farmbot_lang');
    return LANGUAGES.find(l => l.code === saved) || LANGUAGES[0];
  });
  const [availableLangs, setAvailableLangs] = useState(LANGUAGES);

  useEffect(() => {
    async function syncBackendLangs() {
      try {
        const res = await fetch(`${BASE_API_URL}/api/languages`);
        const backendNames = await res.json();
        if (Array.isArray(backendNames)) {
          // Backend returns names like ['Hindi', 'Tamil'], we filter the rich frontend config
          setAvailableLangs(LANGUAGES.filter(l => backendNames.includes(l.name)));
        }
      } catch (e) { console.error("Could not sync languages with backend", e); }
    }
    syncBackendLangs();
  }, []);

  function changeLang(code) {
    const found = LANGUAGES.find(l => l.code === code);
    if (found) { setLang(found); localStorage.setItem('farmbot_lang', code); }
  }

  return (
    <LangContext.Provider value={{ lang, changeLang, languages: availableLangs }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
