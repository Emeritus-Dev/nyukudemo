import React, { useState } from 'react';
import { Sun, Moon, ShoppingBag, User, Menu, X } from 'lucide-react';

export type NavigationPage = 'home' | 'shop' | 'sale' | 'about' | 'profile';

export interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300">
      <nav
        className={`w-full px-3 sm:px-8 py-2.5 sm:py-3 backdrop-blur-xl border-b transition-colors duration-300 flex items-center justify-between shadow-lg ${
          isDark
            ? 'bg-black/75 border-zinc-800/80 text-white'
            : 'bg-white/85 border-slate-200/80 text-slate-900'
        }`}
      >
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer select-none transition-transform duration-200 hover:scale-105 active:scale-95 shrink-0 flex items-center h-9 sm:h-10 max-w-[120px] sm:max-w-[140px] overflow-hidden"
        >
          <img
            src="/nyuku-logo.png"
            alt="NYUKU"
            className="h-8 sm:h-10 w-auto max-h-10 max-w-full object-contain block"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = document.getElementById('nyuku-logo-text-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <span
            id="nyuku-logo-text-fallback"
            className="hidden font-gothic text-xl sm:text-2xl font-extrabold tracking-wider text-amber-400"
          >
            NYÜKU
          </span>
        </div>

        <div
          className={`hidden md:flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-colors ${
            isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-100/80 border-slate-200'
          }`}
        >
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              currentPage === 'home'
                ? 'bg-amber-400 text-black shadow-md scale-105'
                : isDark ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('shop')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              currentPage === 'shop'
                ? 'bg-amber-400 text-black shadow-md scale-105'
                : isDark ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Shop
          </button>

          <button
            onClick={() => handleNavClick('sale')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              currentPage === 'sale'
                ? 'bg-emerald-500 text-black shadow-md scale-105'
                : isDark ? 'text-zinc-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            Sale
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              currentPage === 'about'
                ? 'bg-amber-400 text-black shadow-md scale-105'
                : isDark ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            About
          </button>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 ${
              isDark
                ? 'bg-zinc-900 border-zinc-700 text-amber-400 hover:border-amber-400'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:border-slate-500'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('profile')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 ${
              currentPage === 'profile'
                ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                : isDark
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-300'
                  : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
            title="Club Profile"
            aria-label="Club Profile"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 ${
              isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
            title="Open Bag"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 px-1 bg-amber-400 text-black text-[10px] sm:text-[11px] font-black rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onOpenAuth?.('login')}
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            Club Login
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden w-9 h-9 rounded-full border flex items-center justify-center transition-colors focus:outline-none ${
              isDark
                ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-black'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-5 py-4 space-y-2 backdrop-blur-2xl animate-fadeIn shadow-2xl transition-colors ${
            isDark
              ? 'bg-black/95 border-zinc-800 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900'
          }`}
        >
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left font-gothic text-base font-black uppercase py-2.5 px-3 rounded-xl transition-all ${
              currentPage === 'home'
                ? 'bg-amber-400 text-black shadow-md'
                : isDark ? 'text-zinc-300 hover:bg-zinc-900' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('shop')}
            className={`w-full text-left font-gothic text-base font-black uppercase py-2.5 px-3 rounded-xl transition-all ${
              currentPage === 'shop'
                ? 'bg-amber-400 text-black shadow-md'
                : isDark ? 'text-zinc-300 hover:bg-zinc-900' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Shop
          </button>

          <button
            onClick={() => handleNavClick('sale')}
            className={`w-full text-left font-gothic text-base font-black uppercase py-2.5 px-3 rounded-xl transition-all ${
              currentPage === 'sale'
                ? 'bg-emerald-500 text-black shadow-md'
                : isDark ? 'text-emerald-400 hover:bg-zinc-900' : 'text-emerald-600 hover:bg-slate-100'
            }`}
          >
            Sale
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left font-gothic text-base font-black uppercase py-2.5 px-3 rounded-xl transition-all ${
              currentPage === 'about'
                ? 'bg-amber-400 text-black shadow-md'
                : isDark ? 'text-zinc-300 hover:bg-zinc-900' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            About
          </button>

          <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('profile')}
              className={`w-full text-left font-gothic text-base font-black uppercase py-2.5 px-3 rounded-xl transition-all ${
                currentPage === 'profile'
                  ? 'bg-amber-400 text-black shadow-md'
                  : isDark ? 'text-zinc-300 hover:bg-zinc-900' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Club Directory / Profile
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.('login');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider transition-all shadow-md text-center"
            >
              Club Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;