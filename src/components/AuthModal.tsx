import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { registerUser, loginUser, type NyukuUser } from '../utils/authStorage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  isDark?: boolean;
  onAuthSuccess?: (user: NyukuUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  isDark = true,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'register') {
      const result = registerUser({ fullName, email, password });
      if (!result.ok) {
        setErrorMsg(result.error);
        return;
      }

      setSuccessMsg(`Welcome to the Syndicate, ${result.user.fullName}. Redirecting...`);
      if (onAuthSuccess) onAuthSuccess(result.user);

      setTimeout(() => {
        setFullName('');
        setPassword('');
        setSuccessMsg(null);
        onClose();
      }, 900);
    } else {
      const result = loginUser(email, password);
      if (!result.ok) {
        setErrorMsg(result.error);
        return;
      }

      setSuccessMsg(`Authenticated as ${result.user.fullName}.`);
      if (onAuthSuccess) onAuthSuccess(result.user);

      setTimeout(() => {
        setPassword('');
        setSuccessMsg(null);
        onClose();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative z-10 w-full max-w-md rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${
          isDark
            ? 'bg-zinc-950 border-white/15 text-white shadow-black'
            : 'bg-white border-slate-200 text-slate-950 shadow-slate-300'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-inherit/20 flex items-center justify-center text-zinc-400 hover:bg-amber-400 hover:text-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 text-left mb-6">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/15 text-amber-500 border border-amber-400/30 inline-block">
            SYNDICATE ACCESS
          </span>
          <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight pt-1">
            {mode === 'login' ? 'Member Sign In' : 'Claim Syndicate Pass'}
          </h2>
          <p className="text-xs font-sans text-zinc-400">
            {mode === 'login'
              ? 'Enter the exact email and password you registered with.'
              : 'Create your local NYÜKU collector credentials for instant login and checkout.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl border border-inherit/15 bg-zinc-900/50 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-amber-400 text-black font-black shadow'
                : 'font-bold text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-amber-400 text-black font-black shadow'
                : 'font-bold text-zinc-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-mono flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-start gap-2 text-left">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 block">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Tshegofatso Hlabela"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors ${
                    isDark ? 'bg-zinc-900 border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors ${
                  isDark ? 'bg-zinc-900 border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors ${
                  isDark ? 'bg-zinc-900 border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-400 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-gothic text-sm font-black uppercase tracking-widest transition-all shadow-lg cursor-pointer"
          >
            {mode === 'login' ? 'Sign In to Syndicate' : 'Create Account & Sign In'}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-inherit/10 flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Credentials persist locally in your browser session</span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;