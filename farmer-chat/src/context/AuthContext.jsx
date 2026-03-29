import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('farmbot_user')) || null; } catch { return null; }
  });

  function login(data) {
    const u = { name: data.name || 'Farmer', phone: data.phone || '', state: data.state || '', isGuest: data.isGuest || false, avatar: data.name ? data.name[0].toUpperCase() : '🌾' };
    setUser(u);
    localStorage.setItem('farmbot_user', JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('farmbot_user');
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
