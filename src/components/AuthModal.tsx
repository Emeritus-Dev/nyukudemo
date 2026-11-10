import React, { useState } from 'react';
import { X, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  isDark?: boolean;
}

export function AuthModal({ isOpen, onClose, initialMode = 'login', isDark = true }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-zinc-950 text-white flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
      <button
        type="button"
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-11 h-11 rounded-full border border-white/15 bg-black/70 hover:bg-white hover:text-black transition-all flex items-center justify-center text-zinc-300 backdrop-blur-md shadow-xl"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="md:w-1/2 lg:w-7/12 p-4 sm:p-6 bg-black border-b md:border-b-0 md:border-r border-white/10 flex flex-col h-[340px] md:h-full shrink-0">
        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 group">
          <img
            src="/nyuku-poolside-marquee.jpg"
            alt="Nyüku Sanctuary"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-[1.15] group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 rounded-full border border-amber-400/30 bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              ZEBEDIELA VAULT
            </span>
          </div>

          <div className="absolute bottom-8 left-8 right-8 max-w-xl">
            <h3 className="font-gothic text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.05]">
              Authentic Craft, Engineered Motion.
            </h3>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 lg:w-5/12 h-full overflow-y-auto px-6 py-12 sm:px-12 lg:px-16 flex flex-col justify-center bg-zinc-950">
        <div className="w-full max-w-md mx-auto space-y-7 my-auto">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-gothic text-4xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none">
                NYÜKU
              </span>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 font-bold uppercase tracking-wider">
                CLUB
              </span>
            </div>

            <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-100 leading-none">
              {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tolique Sethosa"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-zinc-900/90 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.co.za"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-zinc-900/90 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+27 68 291 0153"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-zinc-900/90 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-zinc-900/90 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setRememberMe(!rememberMe)}>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    rememberMe ? 'bg-amber-400 border-amber-400 text-black' : 'border-white/20 bg-zinc-900'
                  }`}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-zinc-400 text-[11px]">Remember me</span>
              </div>

              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset verification sent.')}
                  className="text-amber-400 hover:text-amber-300 font-mono text-[11px] transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>{mode === 'login' ? 'LOGIN' : 'REGISTER'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center pt-1">
              <span className="text-xs text-zinc-400">
                {mode === 'login' ? 'New to Nyüku?' : 'Already have an account?'}{' '}
              </span>
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 font-mono uppercase tracking-wider transition-colors ml-1"
              >
                {mode === 'login' ? 'Create Account' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-white/10" />
              <span className="absolute px-3 bg-zinc-950 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Or
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onClose()}
                className="py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => onClose()}
                className="py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.02.63-2.67 1.4-.57.66-.99 1.74-.86 2.79 1.05.08 2.02-.55 2.59-1.26z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;