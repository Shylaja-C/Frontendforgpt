import { createContext, useContext, useState } from 'react';
import { LANGUAGES } from '../config';
import i18n from '../i18n';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('farmbot_lang');
    return LANGUAGES.find(l => l.code === saved) || LANGUAGES[0];
  });

  function changeLang(code) {
    const found = LANGUAGES.find(l => l.code === code);
    if (found) {
      setLang(found);
      localStorage.setItem('farmbot_lang', code);
      // Sync i18next
      const i18nCode = code === 'ta-IN' ? 'ta' : code === 'hi-IN' ? 'hi' : code === 'te-IN' ? 'te' : code === 'kn-IN' ? 'kn' : code === 'ml-IN' ? 'ml' : 'en';
      i18n.changeLanguage(i18nCode);
    }
  }

  return (
    <LangContext.Provider value={{ lang, changeLang, languages: LANGUAGES }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
