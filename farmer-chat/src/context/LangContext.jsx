import { createContext, useContext, useState } from 'react';
import { LANGUAGES } from '../config';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('farmbot_lang');
    return LANGUAGES.find(l => l.code === saved) || LANGUAGES[0];
  });

  function changeLang(code) {
    const found = LANGUAGES.find(l => l.code === code);
    if (found) { setLang(found); localStorage.setItem('farmbot_lang', code); }
  }

  return <LangContext.Provider value={{ lang, changeLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
