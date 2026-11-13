import React, { useState } from 'react';
import { Crown, Check } from 'lucide-react';
import type { NavigationPage } from './Navbar';

export type ProfileTab =
  | 'membership'
  | 'account'
  | 'orders'
  | 'returns'
  | 'wallet'
  | 'wishlist'
  | 'waitlist'
  | 'notifications'
  | 'help';

interface FooterProps {
  onNavigate: (page: NavigationPage, profileTab?: ProfileTab) => void;
  isDark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-10 px-6 sm:px-10 lg:px-14 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-left">
          {/* Column 1: Brand & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
              NYÜKU
            </h3>

            <p className="text-sm font-sans text-zinc-300 leading-relaxed">
              Bold. Limpopo. Unapologetic.{' '}
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="underline underline-offset-4 text-white hover:text-amber-400 transition-colors cursor-pointer"
              >
                Our Story
              </button>
            </p>

            <p className="text-xs font-sans text-zinc-400 leading-relaxed max-w-xs">
              For more about NYÜKU events, drops and collabs &gt; JOIN THE SYNDICATE below.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 max-w-xs pt-1">
              <input
                type="email"
                required
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-white/25 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-black uppercase tracking-[0.18em] transition-colors cursor-pointer flex items-center gap-2"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>JOINED SYNDICATE</span>
                  </>
                ) : (
                  <span>SUBSCRIBE</span>
                )}
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-2 text-zinc-300">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-amber-400 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="hover:text-amber-400 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-amber-400 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: QUICKLINKS (3 cols) -> All deep-link into Profile */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
              QUICKLINKS
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-sans text-zinc-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'account')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Dispatch Hub (Zebediela)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'membership')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Inside NYÜKU Club
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'orders')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Track my Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'returns')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Log a Return
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'help')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  FAQ's
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: POLICIES (3 cols) -> Deep-link into Profile sections */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
              POLICIES
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-sans text-zinc-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'returns')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Refund & Exchange Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'orders')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'wallet')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Store Wallet & Payouts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'account')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Privacy & POPIA Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
              COMPANY
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-sans text-zinc-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'help')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Contact us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'wishlist')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Saved Archive
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile', 'waitlist')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Drop Waitlist
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Utility Row: Members Only Pill & Payment Badges */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('profile', 'membership')}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-amber-400 text-white hover:text-black border border-white/10 font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            <Crown className="w-4 h-4 text-amber-400 group-hover:text-black" />
            <span>MEMBERS ONLY</span>
          </button>

          <p className="text-[11px] font-mono text-zinc-500">
            © 2026 NYÜKU SOUTH AFRICA • ZEBEDIELA, LIMPOPO
          </p>

          {/* Mastercard & Visa Badges */}
          <div className="flex items-center gap-2.5">
            <div className="h-7 px-2.5 rounded bg-white flex items-center justify-center shadow-sm" title="Mastercard">
              <div className="flex items-center -space-x-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block opacity-90" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block opacity-90" />
              </div>
            </div>
            <div className="h-7 px-2.5 rounded bg-[#1A1F71] text-white font-sans font-black italic text-[11px] tracking-wider flex items-center justify-center shadow-sm" title="Visa">
              VISA
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;