import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, MessageCircle, ShieldCheck } from 'lucide-react';
import type { NavigationPage } from './Navbar';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  isDark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDark = true }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className={`border-t transition-colors duration-300 select-none ${
        isDark
          ? 'bg-black text-white border-white/10'
          : 'bg-zinc-950 text-white border-zinc-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-14">
        {/* Top Section: Centered Quick Links */}
        <div className="text-center space-y-4">
          <h3 className="font-gothic text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-amber-400">
            QUICK LINKS
          </h3>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-400">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              SEARCH & CATALOG
            </button>
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              RETURNS AND EXCHANGE
            </button>
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              SHIPPING INFORMATION
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              PRIVACY POLICY
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              TERMS OF SERVICE
            </button>
          </nav>
        </div>

        {/* Middle Section: Newsletter + Socials */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-4">
          {/* Newsletter Subscription Box */}
          <div className="w-full lg:max-w-md space-y-3 text-center lg:text-left">
            <label
              htmlFor="footer-email"
              className="block font-gothic text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-200"
            >
              JOIN THE NYÜKU SYNDICATE & GET EXCLUSIVE DROP ACCESS
            </label>

            <form onSubmit={handleSubmit} className="relative w-full max-w-sm mx-auto lg:mx-0">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full py-3 pl-4 pr-12 rounded-xl bg-white/[0.04] border border-white/15 text-xs font-mono placeholder:text-zinc-500 text-white focus:outline-none focus:border-amber-400 transition-all"
              />
              <button
                type="submit"
                aria-label="Subscribe to exclusive drops"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-black hover:bg-amber-400 transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-[10px] font-mono text-emerald-400 flex items-center justify-center lg:justify-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>You are verified on the VIP release dispatch list.</span>
              </p>
            )}
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://www.facebook.com/tshegofatjo.sethosa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nyüku Facebook"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 hover:bg-white/5 transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a
              href="https://www.instagram.com/tolique_sethosa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nyüku Instagram"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 hover:bg-white/5 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/27682910153?text=Hi%20Tolique,%20reaching%20out%20from%20the%20Nyüku%20Platform."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nyüku WhatsApp Concierge"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-emerald-400 hover:text-emerald-400 hover:bg-white/5 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location Badge */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-zinc-500 text-center sm:text-left">
          <p>
            © 2026, Nyüku South Africa • Rooted in Zebediela, Limpopo
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span className="text-amber-400 font-bold tracking-wider">[ZEBEDIELA // CAPE TOWN]</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;