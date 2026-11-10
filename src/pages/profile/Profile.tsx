import React, { useState } from 'react';
import {
  CreditCard,
  User,
  Package,
  RotateCcw,
  Wallet,
  Heart,
  Clock,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  ArrowDownLeft,
  Check
} from 'lucide-react';
import type { Product } from '../../data/products';
import { PRODUCTS } from '../../data/products';

interface ProfileProps {
  onAddToCart?: (product: Product, size?: string) => void;
  onNavigateShop?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

type ProfileTab =
  | 'membership'
  | 'account'
  | 'orders'
  | 'returns'
  | 'wallet'
  | 'wishlist'
  | 'waitlist'
  | 'notifications'
  | 'help';

type TierType = 'bronze' | 'silver' | 'gold';

export function Profile({ onAddToCart, onNavigateShop, isDark = true, onToggleTheme }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('membership');
  const [selectedTier, setSelectedTier] = useState<TierType>('gold');

  const [userData, setUserData] = useState({
    fullName: 'Tshegofatso Sethosa',
    email: 'nyuku@gmail.com',
    phone: '061 520 8170',
    tier: 'Gold Member',
    memberId: 'NYK-8824-ZA',
    address: 'Zebediela, Moletlane',
    province: 'Limpopo',
    postalCode: '0631',
    walletBalance: 1450.0,
  });

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankName, setBankName] = useState('Capitec Bank');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('Savings');
  const [withdrawSuccess, setWithdrawSuccess] = useState<string | null>(null);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  const TIER_CONFIG = {
    bronze: {
      name: 'Bronze Archive',
      spend: 'Entry Member • First Drop Access',
      cardImg: '/nyuku-card-bronze-front.png',
      badgeClass: 'border-amber-700/40 bg-amber-700/10 text-amber-500',
      perks: [
        {
          title: '5% Bag Privilege',
          desc: 'Instant discount applied on signature oversized tees and core essentials.',
        },
        {
          title: 'Standard SA Courier',
          desc: 'Reliable nationwide door-to-door delivery across all provinces.',
        },
        {
          title: 'Archive Community Access',
          desc: 'Invitation to seasonal digital product catalogs and release count-downs.',
        },
        {
          title: 'Welcome Nyüku Decal Pack',
          desc: 'Complimentary collectible vinyl mascot stickers with your first order.',
        },
      ],
    },
    silver: {
      name: 'Silver Syndicate',
      spend: 'R4,500+ Annual Spend • Priority Access',
      cardImg: '/nyuku-card-silver-front.png',
      badgeClass: 'border-slate-400/40 bg-slate-400/10 text-slate-300',
      perks: [
        {
          title: '10% Bag Privilege',
          desc: 'Storewide discount automatically calculated at checkout across all drops.',
        },
        {
          title: 'Early Drop Access',
          desc: '1-hour private window to purchase limited heavyweight outerwear batches before public release.',
        },
        {
          title: 'Free Courier on Orders Over R1,200',
          desc: 'Complimentary tracked domestic delivery to any South African address.',
        },
        {
          title: 'Live Event Ticket Priority',
          desc: 'Priority queueing and early ticket access for ShadesOfColors day parties and pop-up activations.',
        },
      ],
    },
    gold: {
      name: 'Gold Archive VIP',
      spend: 'R12,000+ Lifetime Spend • VIP Reserve Access',
      cardImg: '/nyuku-card-gold-front.png',
      badgeClass: 'border-amber-400/40 bg-amber-400/10 text-amber-400',
      perks: [
        {
          title: '15% Lifetime Bag Privilege',
          desc: 'VIP pricing on every item including varsity outerwear, technical kits, and trackpants.',
        },
        {
          title: 'Private WhatsApp Concierge',
          desc: 'Dedicated 1-on-1 stylist assistance for size allocations, lodge VIP reservations, and priority tracking.',
        },
        {
          title: 'Guaranteed Batch Allocation',
          desc: 'Reserved piece in your selected size on all sealed drop releases.',
        },
        {
          title: 'Complimentary Express Courier',
          desc: 'Free expedited 2-3 day door-to-door delivery on every single order nationwide.',
        },
      ],
    },
  };

  const currentTier = TIER_CONFIG[selectedTier];

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError(null);
    setWithdrawSuccess(null);

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setWithdrawError('Please enter a valid withdrawal amount.');
      return;
    }
    if (amount > userData.walletBalance) {
      setWithdrawError(`Insufficient wallet balance. Maximum withdrawal: R${userData.walletBalance.toFixed(2)}.`);
      return;
    }
    if (!accountNumber.trim()) {
      setWithdrawError('Please supply an account number.');
      return;
    }

    setUserData((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance - amount,
    }));
    setWithdrawSuccess(`R${amount.toFixed(2)} transfer initiated to ${bankName} (Acc ending in ${accountNumber.slice(-4) || '****'}). ETA: 1-2 business days.`);
    setWithdrawAmount('');
    setAccountNumber('');
  };

  const SIDEBAR_TABS = [
    { id: 'membership', label: 'Club Membership Card', icon: CreditCard },
    { id: 'account', label: 'Account Info', icon: User },
    { id: 'orders', label: 'Orders & Receipts', icon: Package },
    { id: 'returns', label: 'Returns & Exchange', icon: RotateCcw },
    { id: 'wallet', label: 'Nyüku Wallet (ZAR)', icon: Wallet },
    { id: 'wishlist', label: 'Wishlist (4)', icon: Heart },
    { id: 'waitlist', label: 'Drop Waitlist', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'help', label: 'Help Centre', icon: HelpCircle },
  ];

  return (
    <div className={`min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 select-none transition-colors ${
      isDark ? 'text-white' : 'text-slate-900'
    }`}>
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-zinc-200 dark:border-white/10">
        <div>
          <h1 className="font-gothic text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
            Nyüku Club Directory
          </h1>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mt-1">
            South African Luxury Streetwear Syndicate • {userData.province} Archival Member
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-amber-400 transition-colors shadow-sm"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-700" />}
              <span>{isDark ? 'LIGHT' : 'DARK'}</span>
            </button>
          )}

          <div className="flex items-center gap-2.5 px-3 py-1 rounded-xl border border-amber-400/30 bg-amber-400/10">
            <div className="w-7 h-7 rounded-full bg-amber-400 text-black font-black flex items-center justify-center text-xs font-gothic">
              {userData.fullName.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-[11px] sm:text-xs font-bold font-gothic uppercase tracking-wide leading-none truncate max-w-[120px] sm:max-w-none">
                {userData.fullName}
              </p>
              <p className="text-[9px] sm:text-[10px] font-mono text-amber-500 font-bold mt-0.5">
                {userData.memberId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Navigation on Mobile / Vertical on Desktop */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {SIDEBAR_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProfileTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[11px] font-mono font-bold uppercase whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-amber-400 text-black font-black shadow-md'
                  : 'bg-zinc-900/80 border border-white/10 text-zinc-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-1.5">
          {SIDEBAR_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-lg font-black'
                    : isDark
                    ? 'bg-zinc-950/70 border border-white/5 text-zinc-300 hover:border-amber-400/40 hover:bg-zinc-900'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-400/40 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
              </button>
            );
          })}
        </aside>

        {/* Dynamic Content Panel */}
        <section className="lg:col-span-9 w-full">
          {activeTab === 'membership' && (
            <div className="space-y-6 sm:space-y-8 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl">
              <div className="text-center space-y-1.5 max-w-xl mx-auto">
                <h2 className="font-gothic text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                  Official Membership Pass
                </h2>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Select your syndicate tier below to inspect active privileges and drop allocations.
                </p>
              </div>

              {/* Tier Switcher Pills */}
              <div className="flex items-center justify-center gap-2 max-w-md mx-auto p-1.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900">
                {(['bronze', 'silver', 'gold'] as TierType[]).map((tierKey) => {
                  const isSelected = selectedTier === tierKey;
                  return (
                    <button
                      key={tierKey}
                      onClick={() => setSelectedTier(tierKey)}
                      className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-black shadow-md font-black'
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {tierKey === 'bronze' && '🥉 Bronze'}
                      {tierKey === 'silver' && '🥈 Silver'}
                      {tierKey === 'gold' && '🥇 Gold'}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 sm:pt-4">
                <div className="lg:col-span-6 flex flex-col items-center justify-center p-2">
                  <div className="relative w-full max-w-sm sm:max-w-md flex items-center justify-center group">
                    <img
                      src={currentTier.cardImg}
                      alt={`${currentTier.name} Card`}
                      className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-3 sm:mt-4 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400 text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cryptographically Authenticated Pass</span>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${currentTier.badgeClass}`}>
                        {selectedTier.toUpperCase()} PASS
                      </span>
                      <span className="text-xs font-mono text-emerald-500 font-bold">● Active Status</span>
                    </div>
                    <h3 className="font-gothic text-xl sm:text-2xl font-black uppercase tracking-wide">
                      {currentTier.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {currentTier.spend}
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3 pt-1">
                    {currentTier.perks.map((perk, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] space-y-1 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                          <h4 className="text-xs font-bold uppercase font-gothic tracking-wider">
                            {perk.title}
                          </h4>
                        </div>
                        <p className="text-[11px] font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6">
                          {perk.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6 sm:space-y-8 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl">
              <div className="border-b pb-4 border-zinc-200 dark:border-white/10 space-y-1">
                <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  Account Credentials & Dispatch
                </h2>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  Manage primary dispatch destinations and verified syndicate identity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData.fullName}
                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-sm font-sans focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-sm font-sans focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                    Mobile Contact
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-sm font-sans focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                    Syndicate Member ID
                  </label>
                  <input
                    type="text"
                    disabled
                    value={userData.memberId}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/50 text-sm font-mono text-zinc-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-amber-400/30 bg-amber-400/5 space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <h3 className="font-gothic text-sm sm:text-base font-bold uppercase tracking-wider">
                    Primary Dispatch Destination
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase text-zinc-400">Street / Area</span>
                    <p className="text-xs sm:text-sm font-bold font-gothic">{userData.address}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase text-zinc-400">Province</span>
                    <p className="text-xs sm:text-sm font-bold font-gothic">{userData.province}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase text-zinc-400">Postal Code</span>
                    <p className="text-xs sm:text-sm font-mono font-bold text-amber-500">{userData.postalCode}</p>
                  </div>
                </div>

                <p className="text-[10px] sm:text-[11px] font-mono text-zinc-500 pt-1">
                  All confirmed drop shipments are dispatched directly via courier to Zebediela, Moletlane Limpopo 0631.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => alert('Account credentials updated successfully.')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl text-left">
              <div className="border-b pb-4 border-zinc-200 dark:border-white/10">
                <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  Orders & Proof of Purchase
                </h2>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Archived shipments dispatched to Zebediela, Limpopo.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    orderId: 'NYK-ORD-9021',
                    date: '28 Oct 2026',
                    item: 'NYÜKU 3.0 Block Tee - Noir (L)',
                    total: 'R850.00',
                    status: 'Delivered',
                    tracking: 'DSV-7749021-ZA',
                  },
                  {
                    orderId: 'NYK-ORD-8814',
                    date: '14 Oct 2026',
                    item: 'Club Quilted Puffer Vest (M)',
                    total: 'R1,450.00',
                    status: 'Delivered',
                    tracking: 'RAM-9021884-ZA',
                  },
                ].map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-500">{order.orderId}</span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-xs text-zinc-500">{order.date}</span>
                      </div>
                      <h4 className="font-gothic text-sm sm:text-base font-bold">{order.item}</h4>
                      <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400">Waybill: {order.tracking}</p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <p className="font-mono text-sm font-black text-amber-500">{order.total}</p>
                      <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-6 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl text-left">
              <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Returns & Size Exchanges
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40 space-y-3">
                <h3 className="font-gothic text-sm sm:text-base font-bold uppercase">7-Day Archival Exchange Policy</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Items must be unworn with original tags attached. For size exchanges, log an authorization request with our WhatsApp concierge or courier team.
                </p>
                <button
                  onClick={() => alert('Exchange concierge initialized.')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 text-black text-xs font-mono font-bold uppercase tracking-wider"
                >
                  Request Return Waybill
                </button>
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="space-y-6 sm:space-y-8 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl text-left">
              <div className="border-b pb-4 border-zinc-200 dark:border-white/10 space-y-1">
                <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  Nyüku Store Credit & Payouts
                </h2>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  Manage store currency, return balances, or cash out funds straight to your South African bank account.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-400/15 via-zinc-900 to-black flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                    Available Withdrawable Balance
                  </span>
                  <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                    R{userData.walletBalance.toFixed(2)}
                  </p>
                  <p className="text-xs text-zinc-400 pt-1">
                    Funds can be applied to orders at checkout or transferred out anytime.
                  </p>
                </div>

                <div className="px-4 py-2 rounded-xl border border-white/15 bg-black/60 font-mono text-xs text-zinc-300 self-start sm:self-auto">
                  <span className="text-emerald-400 font-bold">● EFT READY</span>
                  <p className="text-[10px] text-zinc-400">Zero withdrawal fees</p>
                </div>
              </div>

              {withdrawSuccess && (
                <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{withdrawSuccess}</span>
                </div>
              )}

              {withdrawError && (
                <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-xs flex items-center gap-2">
                  <span>{withdrawError}</span>
                </div>
              )}

              <form onSubmit={handleWithdrawal} className="p-5 sm:p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-200 dark:border-white/10">
                  <ArrowDownLeft className="w-5 h-5 text-amber-400" />
                  <h3 className="font-gothic text-base sm:text-lg font-bold uppercase tracking-wider">
                    Bank Payout / Withdrawal Request
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                      Withdraw Amount (ZAR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-amber-500 text-sm">
                        R
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                      South African Bank
                    </label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm font-sans focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Capitec Bank">Capitec Bank</option>
                      <option value="FNB (First National Bank)">FNB (First National Bank)</option>
                      <option value="Standard Bank">Standard Bank</option>
                      <option value="Nedbank">Nedbank</option>
                      <option value="ABSA">ABSA</option>
                      <option value="TymeBank">TymeBank</option>
                      <option value="Discovery Bank">Discovery Bank</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1528994012"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                      Account Type
                    </label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-sm font-sans focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Savings">Savings Account</option>
                      <option value="Cheque / Current">Cheque / Current Account</option>
                      <option value="Transmission">Transmission Account</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    Transfers are authenticated and cleared via standard SA RTC clearing.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Confirm Withdrawal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl text-left">
              <div className="flex items-center justify-between border-b pb-4 border-zinc-200 dark:border-white/10">
                <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  Archived Wishlist
                </h2>
                <span className="text-xs font-mono text-zinc-400">4 Items Saved</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {PRODUCTS.slice(0, 4).map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 sm:p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-3 sm:gap-4"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black overflow-hidden shrink-0">
                      <img src={prod.images.front} alt={prod.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold font-gothic truncate">{prod.title}</h4>
                      <p className="font-mono text-xs text-amber-500 font-bold mt-0.5">{prod.price}</p>
                    </div>
                    <button
                      onClick={() => onAddToCart && onAddToCart(prod)}
                      className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-400 text-black text-[10px] font-mono font-bold uppercase tracking-wider shrink-0"
                    >
                      + Bag
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'waitlist' && (
            <div className="space-y-6 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl text-left">
              <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Upcoming Drop Waitlist
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                  Batch 05 • Sealed Drop
                </span>
                <h3 className="font-gothic text-base sm:text-lg font-bold">Botanical Corduroy Overshirt</h3>
                <p className="text-xs text-zinc-400">You are position #14 in queue for Limpopo priority dispatch.</p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl text-left">
              <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Syndicate Dispatches
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-1">
                  <p className="text-xs font-bold font-gothic text-emerald-400">Waybill Delivered • Zebediela</p>
                  <p className="text-[11px] text-zinc-300">Package NYK-ORD-9021 was delivered to Moletlane.</p>
                </div>
                <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-1">
                  <p className="text-xs font-bold font-gothic text-amber-400">VIP Ticket Early Bird Confirmed</p>
                  <p className="text-[11px] text-zinc-300">Gold tier invitation unlocked for the next ShadesOfColors event.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="space-y-6 rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/80 shadow-2xl backdrop-blur-xl text-left">
              <h2 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Help & Concierge Support
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Direct WhatsApp assistance available Monday to Saturday:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <a
                  href="https://wa.me/27682910153"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-zinc-900/60 hover:border-amber-400 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-gothic text-xs sm:text-sm font-bold">General Enquiries</h4>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">068 291 0153</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                </a>

                <a
                  href="https://wa.me/27795684702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-zinc-900/60 hover:border-amber-400 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-gothic text-xs sm:text-sm font-bold">Technical Operations</h4>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">079 568 4702</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                </a>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;