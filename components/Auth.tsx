
import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { User } from '../types';
import { Key, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import Logo from './Logo';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (passcode.length !== 6 || !/^\d+$/.test(passcode)) {
      setError('Passcode must be exactly 6 digits.');
      return;
    }

    const users = storageService.getUsers();
    
    if (isLogin) {
      const user = users.find(u => u.username === username && u.passcode === passcode);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid username or passcode.');
      }
    } else {
      if (users.some(u => u.username === username)) {
        setError('Username already exists.');
        return;
      }
      const newUser = { username, passcode };
      storageService.saveUser(newUser);
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#004466] via-[#006699] to-[#0088AA]">
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-[2rem] shadow-2xl p-8 border border-white/20">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 drop-shadow-xl">
            <Logo className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center">
            PaperVault
          </h1>
          <p className="text-slate-500 mt-2 text-center text-sm font-medium">Securely dock your research papers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0088AA] focus:border-transparent transition-all outline-none font-medium"
                placeholder="Scholar identity"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">6-Digit Passcode</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                required
                type="password"
                maxLength={6}
                pattern="\d*"
                inputMode="numeric"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0088AA] focus:border-transparent transition-all outline-none tracking-[0.5em] font-bold"
                placeholder="******"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#006699] hover:bg-[#004466] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[#006699]/30 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {isLogin ? 'Open Vault' : 'Initialize Vault'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#0088AA] hover:text-[#004466] font-bold text-sm transition-colors"
          >
            {isLogin ? "New user? Create your vault" : "Have a vault? Sign in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
