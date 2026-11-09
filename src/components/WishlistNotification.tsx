import React, { useEffect, useState } from 'react';
import { Flame, X, Sparkles } from 'lucide-react';
import { type WishlistItem } from '../types/cart';

interface WishlistNotificationProps {
  items: WishlistItem[];
  darkMode?: boolean;
}

const FUNNY_MESSAGES = [
  "Aowa banna! Somebody in Joburg is staring at this exact piece right now. Checkout before tears roll!",
  "Hayibo! Stock is thinner than loadshedding stage 1 schedules. Secure yours now!",
  "Don't let this end up in someone else's unboxing video on your TikTok feed. Move fast!",
  "Eish! Only a handful left in Cape Town studio storage. Add to bag before it's archival history!",
  "Sleep on it and you'll wake up to 'SOLD OUT'. Don't say we didn't warn you!",
];

export default function WishlistNotification({ items, darkMode = true }: WishlistNotificationProps) {
  const [visible, setVisible] = useState(false);
  const [activeMessage, setActiveMessage] = useState('');
  const [targetItemName, setTargetItemName] = useState('');
  const [stockLeft, setStockLeft] = useState(3);

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Pick a random item from wishlist to warn about
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const randomMsg = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
    const calculatedStock = randomItem.product.sizes?.[0]?.stock || Math.floor(Math.random() * 4) + 2;

    setTargetItemName(randomItem.product.title);
    setActiveMessage(randomMsg);
    setStockLeft(calculatedStock);
    setVisible(true);

    // Auto-dismiss after 6.5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6500);

    return () => clearTimeout(timer);
  }, [items]);

  if (!visible || items.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-full animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={`p-4 sm:p-5 rounded-3xl border shadow-2xl backdrop-blur-xl relative flex items-start space-x-3.5 ${
          darkMode
            ? 'bg-[#0F172A]/95 border-amber-500/40 text-white shadow-amber-500/10'
            : 'bg-white/95 border-amber-400 text-slate-900 shadow-slate-300'
        }`}
      >
        {/* Pulsing Flame Badge */}
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500">
          <Flame className="w-5 h-5 animate-bounce" />
        </div>

        {/* Content */}
        <div className="flex-1 pr-6">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
              Only {stockLeft} left in stock!
            </span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>

          <p className="text-xs font-black mt-1 line-clamp-1 text-amber-500">
            {targetItemName}
          </p>

          <p className="text-xs font-medium mt-1 leading-relaxed opacity-90">
            {activeMessage}
          </p>
        </div>

        {/* Manual Dismiss */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}