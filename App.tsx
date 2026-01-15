
import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { User, AppScreen } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<AppScreen>(AppScreen.AUTH);

  // Persistence: Check if session is stored
  useEffect(() => {
    const storedUser = localStorage.getItem('papervault_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setScreen(AppScreen.DASHBOARD);
    }
  }, []);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    localStorage.setItem('papervault_session', JSON.stringify(loggedUser));
    setScreen(AppScreen.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('papervault_session');
    setScreen(AppScreen.AUTH);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#0088AA]/20 selection:text-[#006699]">
      {screen === AppScreen.AUTH ? (
        <Auth onLogin={handleLogin} />
      ) : (
        user && <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
