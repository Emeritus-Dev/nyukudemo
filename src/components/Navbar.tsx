import React from 'react';
import { Sun, Moon, ShoppingBag, User } from 'lucide-react';

export type NavigationPage = 'home' | 'shop' | 'sale' | 'about' | 'profile';

export interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount = 0,
  onOpenCart,
  isDark,
  onToggleTheme,
  onOpenAuth,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300">
      <nav className={`w-full px-4 sm:px-8 py-3 backdrop-blur-xl border-b transition-colors duration-300 flex items-center justify-between shadow-lg ${
        isDark
          ? 'bg-black/60 border-zinc-800/80 text-white'
          : 'bg-white/80 border-slate-200/80 text-slate-900'
      }`}>

        {/* Left: Brand Logo (Hard-Constrained Height & Width) */}
        <div
          onClick={() => onNavigate('home')}
          className="cursor-pointer select-none transition-transform duration-200 hover:scale-105 active:scale-95 shrink-0 flex items-center h-10 max-w-[140px] overflow-hidden"
        >
          <img
            src="/nyuku-logo.png"
            alt="NYUKU"
            className="h-10 w-auto max-h-10 max-w-full object-contain block"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = document.getElementById('nyuku-logo-text-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <span
            id="nyuku-logo-text-fallback"
            className="hidden font-gothic text-2xl font-extrabold tracking-wider text-amber-400"
          >
            NYÜKU
          </span>
        </div>

        {/* Center: Nav Buttons */}
        <div className={`flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-colors ${
          isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-100/80 border-slate-200'
        }`}>
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              currentPage === 'home'
                ? 'bg-amber-400 text-black shadow-md scale-105'
                : isDark ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('shop')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              currentPage === 'shop'
                ? 'bg-amber-400 text-black shadow-md scale-105'
                : isDark ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Shop
          </button>

          <button
            onClick={() => onNavigate('sale')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              currentPage === 'sale'
                ? 'bg-emerald-500 text-black shadow-md scale-105'
                : isDark ? 'text-zinc-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            Sale
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              currentPage === 'about'
                ? 'bg-amber-400 text-black shadow-md scale-105'
                : isDark ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            About
          </button>
        </div>

        {/* Right: Actions Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Working Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`w-10 h-10 rounded-full border transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 ${
              isDark
                ? 'bg-zinc-900 border-zinc-700 text-amber-400 hover:border-amber-400'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:border-slate-500'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Profile Button */}
          <button
            onClick={() => onNavigate('profile')}
            className={`w-10 h-10 rounded-full border transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 ${
              currentPage === 'profile'
                ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                : isDark
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-300'
                  : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
            title="Club Profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Bag Button with Count */}
          <button
            onClick={onOpenCart}
            className={`relative w-10 h-10 rounded-full border transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 ${
              isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
            title="Open Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-amber-400 text-black text-[11px] font-black rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth Button */}
          <button
            onClick={() => onOpenAuth?.('login')}
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            Club Login
          </button>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;