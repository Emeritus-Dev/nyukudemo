import React, { useState } from 'react';
import { Award, RefreshCw, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export type MembershipTier = 'bronze' | 'silver' | 'gold';

interface MemberCardProps {
  initialTier?: MembershipTier;
}

interface TierBenefit {
  title: string;
  detail: string;
}

interface TierConfig {
  name: string;
  badgeLabel: string;
  frontImage: string;
  backImage: string;
  glowClass: string;
  themeColor: string;
  cardPillBg: string;
  spendThreshold: string;
  benefits: TierBenefit[];
}

const TIER_CONFIGS: Record<MembershipTier, TierConfig> = {
  bronze: {
    name: 'BRONZE ACCESS',
    badgeLabel: 'Tier I Member',
    frontImage: '/nyuku-card-bronze-front.png',
    backImage: '/nyuku-card-bronze-back.png',
    glowClass: 'drop-shadow-[0_20px_45px_rgba(205,127,50,0.35)]',
    themeColor: 'text-amber-500',
    cardPillBg: 'bg-amber-950/70 text-amber-300 border-amber-600/50',
    spendThreshold: 'Entry Level Access • Free Member Registration',
    benefits: [
      {
        title: '5% Bag Privilege',
        detail: 'Instant discount applied on signature oversized tees and core essentials.',
      },
      {
        title: 'Standard SA Courier',
        detail: 'Reliable nationwide door-to-door delivery across all provinces.',
      },
      {
        title: 'Archive Community Access',
        detail: 'Invitation to seasonal digital product catalogs and release countdowns.',
      },
      {
        title: 'Welcome Nyüku Decal Pack',
        detail: 'Complimentary collectible vinyl mascot stickers with your first order.',
      },
    ],
  },
  silver: {
    name: 'SILVER SYNDICATE',
    badgeLabel: 'Tier II Syndicate',
    frontImage: '/nyuku-card-silver-front.png',
    backImage: '/nyuku-card-silver-back.png',
    glowClass: 'drop-shadow-[0_20px_45px_rgba(192,192,192,0.38)]',
    themeColor: 'text-slate-200',
    cardPillBg: 'bg-slate-900/80 text-slate-200 border-slate-400/50',
    spendThreshold: 'R5,000+ Annual Spend • Priority Syndicate Member',
    benefits: [
      {
        title: '10% Catalog-Wide Discount',
        detail: 'Automatic deduction across all streetwear, fleece hoodies, and denim caps.',
      },
      {
        title: '1-Hour Priority Early Access',
        detail: 'Queue skip for high-demand limited releases and numbered capsule drops.',
      },
      {
        title: 'Complimentary Express Delivery',
        detail: 'Free priority dispatch across Cape Town, Johannesburg, and Durban.',
      },
      {
        title: 'Birthday Gift Credit',
        detail: 'R250 annual anniversary wallet credit loaded directly to your profile.',
      },
    ],
  },
  gold: {
    name: 'GOLD ARCHIVE',
    badgeLabel: 'Tier III VIP',
    frontImage: '/nyuku-card-gold-front.png',
    backImage: '/nyuku-card-gold-back.png',
    glowClass: 'drop-shadow-[0_25px_50px_rgba(255,215,0,0.45)]',
    themeColor: 'text-yellow-400',
    cardPillBg: 'bg-yellow-950/80 text-yellow-300 border-yellow-500/60',
    spendThreshold: 'R15,000+ Lifetime Spend • VIP Reserve Access',
    benefits: [
      {
        title: '15% Lifetime Bag Privilege',
        detail: 'VIP pricing on every item including outerwear, technical kits, and track jackets.',
      },
      {
        title: 'Private WhatsApp Concierge',
        detail: 'Dedicated 1-on-1 stylist support for size reservations and order tracking.',
      },
      {
        title: 'Secret Archival Pop-Up Invites',
        detail: 'Exclusive guestlist access to private events and showroom sessions.',
      },
      {
        title: 'Archival Member Gifting',
        detail: 'Handcrafted seasonal lifestyle gifts from the atelier delivered each year.',
      },
    ],
  },
};

export const MemberCard: React.FC<MemberCardProps> = ({ initialTier = 'gold' }) => {
  const [tier, setTier] = useState<MembershipTier>(initialTier);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentTier = TIER_CONFIGS[tier];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center select-none">
      {/* Tier Selector Tab Switcher */}
      <div className="w-full max-w-md flex items-center justify-center gap-2 mb-8 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800 backdrop-blur-md">
        {(['bronze', 'silver', 'gold'] as MembershipTier[]).map((t) => {
          const active = tier === t;
          return (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                active
                  ? 'bg-amber-400 text-black font-extrabold shadow-lg scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {t}
            </button>
          );
        })}
      </div>

      {/* Main Dual-Column Showcase: Card on the Left, Tier Benefits on the Right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/80 p-5 sm:p-8 rounded-3xl border border-zinc-900 shadow-2xl backdrop-blur-xl">
        {/* Left Column: Pure Floating 3D Card */}
        <div className="lg:col-span-7 flex flex-col items-center w-full">
          <div
            className="relative w-full aspect-[1.586/1] max-w-[460px] cursor-pointer group bg-transparent"
            style={{ perspective: '1400px' }}
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            <div
              className={`w-full h-full relative transition-transform duration-700 bg-transparent ${currentTier.glowClass}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* CARD FRONT - Clean Image Only */}
              <div
                className="absolute inset-0 w-full h-full bg-transparent flex items-center justify-center pointer-events-none"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={currentTier.frontImage}
                  alt={`${tier} card front`}
                  className="w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              {/* CARD BACK - Clean Image Only, No Overlays */}
              <div
                className="absolute inset-0 w-full h-full bg-transparent flex items-center justify-center pointer-events-none"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <img
                  src={currentTier.backImage}
                  alt={`${tier} card back`}
                  className="w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* Quick Flip Action Trigger */}
          <div className="w-full max-w-[460px] flex items-center justify-between mt-5 px-2">
            <span className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Click card or button to flip
            </span>
            <button
              onClick={() => setIsFlipped((prev) => !prev)}
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all font-semibold shadow-sm"
            >
              <RefreshCw className="w-3 h-3 text-amber-400" />
              Flip Card
            </button>
          </div>
        </div>

        {/* Right Column: Side Benefits Tray */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 lg:border-l lg:pl-8 border-zinc-900 w-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-0.5 rounded-full border ${currentTier.cardPillBg}`}>
                {currentTier.badgeLabel}
              </span>
              <span className="text-[11px] font-mono text-zinc-500">Tier Status: Active</span>
            </div>

            <h3 className={`text-2xl font-bold font-gothic tracking-wider ${currentTier.themeColor}`}>
              {currentTier.name}
            </h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              {currentTier.spendThreshold}
            </p>
          </div>

          {/* Benefits Itemized List */}
          <div className="space-y-3 pt-1">
            {currentTier.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex items-start gap-3 group"
              >
                <div className="mt-0.5 p-1 rounded-lg bg-zinc-800/80 text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug mt-0.5">
                    {benefit.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Club Footer Note */}
          <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Auto-applied at checkout
            </span>
            <span className="font-mono">Est. 2023 • Cape Town</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;