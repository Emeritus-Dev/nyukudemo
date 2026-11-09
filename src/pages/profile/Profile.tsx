import React, { useState, useEffect } from 'react';
import {
  User,
  ShoppingBag,
  RotateCcw,
  Wallet,
  CreditCard,
  Heart,
  Clock,
  Bell,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Trash2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import { MemberCard } from '../../components/MemberCard';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../data/products';

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

interface ProfileProps {
  onAddToCart?: (product: Product, size?: string) => void;
  onNavigateShop?: () => void;
  isDark?: boolean;
  darkMode?: boolean;
  toggleTheme?: () => void;
  onToggleTheme?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({
  onAddToCart,
  onNavigateShop,
  isDark,
  darkMode,
  toggleTheme,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('membership');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with global theme state or local document class
  const [currentIsDark, setCurrentIsDark] = useState<boolean>(() => {
    if (typeof isDark === 'boolean') return isDark;
    if (typeof darkMode === 'boolean') return darkMode;
    if (typeof window !== 'undefined') {
      return (
        document.documentElement.classList.contains('dark') ||
        localStorage.getItem('nyuku_theme') === 'dark' ||
        localStorage.getItem('theme') === 'dark'
      );
    }
    return true;
  });

  useEffect(() => {
    if (typeof isDark === 'boolean') setCurrentIsDark(isDark);
    else if (typeof darkMode === 'boolean') setCurrentIsDark(darkMode);
  }, [isDark, darkMode]);

  const handleToggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else if (toggleTheme) {
      toggleTheme();
    } else {
      const nextTheme = !currentIsDark;
      setCurrentIsDark(nextTheme);
      if (nextTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('nyuku_theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('nyuku_theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  // Real-time Wishlist IDs loaded from localStorage or seeded defaults
  const [wishlistIds, setWishlistIds] = useState<number[]>([1, 48, 9, 49]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nyuku_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishlistIds(parsed);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  // Timed urgent low-stock notification pop-up for wishlist
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastMessage("🔥 Low stock alert: Only 2 left in 'NYUKU Botanical Technical Track Jacket'!");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const dismiss = setTimeout(() => {
        setToastMessage(null);
      }, 6000);
      return () => clearTimeout(dismiss);
    }
  }, [toastMessage]);

  const handleRemoveFromWishlist = (id: number) => {
    const updated = wishlistIds.filter((item) => item !== id);
    setWishlistIds(updated);
    try {
      localStorage.setItem('nyuku_wishlist', JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }
  };

  const handleMoveToBag = (product: Product) => {
    if (onAddToCart) {
      const selectedSize = product.sizes?.[0]?.size || 'One Size';
      onAddToCart(product, selectedSize);
    }
    handleRemoveFromWishlist(product.id);
    setToastMessage(`✓ Moved "${product.title}" to your shopping bag.`);
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const tabs = [
    { id: 'membership' as ProfileTab, label: 'Club Membership Card', icon: CreditCard },
    { id: 'account' as ProfileTab, label: 'Account Info', icon: User },
    { id: 'orders' as ProfileTab, label: 'Orders & Receipts', icon: ShoppingBag },
    { id: 'returns' as ProfileTab, label: 'Returns & Exchange', icon: RotateCcw },
    { id: 'wallet' as ProfileTab, label: 'Nyüku Wallet (ZAR)', icon: Wallet },
    {
      id: 'wishlist' as ProfileTab,
      label: `Wishlist (${wishlistProducts.length})`,
      icon: Heart,
    },
    { id: 'waitlist' as ProfileTab, label: 'Drop Waitlist', icon: Clock },
    { id: 'notifications' as ProfileTab, label: 'Notifications', icon: Bell },
    { id: 'help' as ProfileTab, label: 'Help Centre', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen dark:bg-black bg-zinc-100 dark:text-white text-zinc-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative selection:bg-amber-400 selection:text-black transition-colors duration-300">
      {/* Toast Urgency Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 max-w-md dark:bg-zinc-900 bg-white dark:border-amber-500/80 border-amber-500 dark:text-white text-zinc-900 px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.25)] flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="dark:text-zinc-400 text-zinc-500 hover:text-black dark:hover:text-white text-xs font-bold uppercase ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header Profile Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b dark:border-zinc-900 border-zinc-300 gap-4">
          <div>
            <h1 className="font-gothic text-4xl sm:text-5xl text-amber-500 dark:text-amber-400 tracking-wider">
              Nyüku Club Directory
            </h1>
            <p className="dark:text-zinc-400 text-zinc-600 text-xs sm:text-sm mt-1">
              South African Luxury Streetwear Syndicate • Cape Town Archival Member
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={handleToggleTheme}
              className="p-2.5 rounded-2xl dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-300 border shadow-md dark:text-amber-400 text-zinc-700 hover:scale-105 transition-all flex items-center gap-2 text-xs font-bold uppercase"
              title="Toggle Dark / Light Theme"
            >
              {currentIsDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-zinc-700" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* User Badge */}
            <div className="flex items-center gap-3.5 dark:bg-zinc-950 bg-white border dark:border-zinc-800/80 border-zinc-300 px-4 py-2 rounded-2xl w-fit shadow-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-black font-extrabold text-lg font-gothic shadow-inner">
                N
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold dark:text-white text-zinc-900 uppercase tracking-wider">
                    Thabo Nhlapo
                  </p>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400 text-black uppercase">
                    Gold
                  </span>
                </div>
                <p className="text-xs dark:text-zinc-400 text-zinc-500 font-mono">NYK-8924-SA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-1.5 dark:bg-zinc-950 bg-white p-3 rounded-3xl border dark:border-zinc-900 border-zinc-200 shadow-sm h-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold shadow-lg scale-[1.01]'
                      : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 dark:hover:bg-zinc-900/60 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'dark:text-zinc-400 text-zinc-500'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-25'}`} />
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="lg:col-span-3 dark:bg-zinc-950 bg-white p-6 sm:p-8 rounded-3xl border dark:border-zinc-900 border-zinc-200 shadow-sm min-h-[560px]">
            {/* 1. Membership Card Tab */}
            {activeTab === 'membership' && (
              <div>
                <div className="text-center max-w-md mx-auto mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold font-gothic tracking-wider dark:text-white text-zinc-900">
                    Official Membership Pass
                  </h2>
                  <p className="dark:text-zinc-400 text-zinc-600 text-xs sm:text-sm mt-1">
                    Click the card to flip between front and back. Switch tiers to preview Bronze,
                    Silver, and Gold archive perks.
                  </p>
                </div>

                <MemberCard initialTier="gold" />
              </div>
            )}

            {/* 2. Account Info Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-gothic text-amber-500 dark:text-amber-400">
                    Account Details
                  </h3>
                  <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                    Your verified profile and shipping presets.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="dark:bg-zinc-900/60 bg-zinc-50 p-4 rounded-2xl border dark:border-zinc-800 border-zinc-200">
                    <label className="dark:text-zinc-500 text-zinc-400 text-xs uppercase tracking-wider">
                      Full Name
                    </label>
                    <p className="font-semibold dark:text-white text-zinc-900 mt-1">Thabo Nhlapo</p>
                  </div>
                  <div className="dark:bg-zinc-900/60 bg-zinc-50 p-4 rounded-2xl border dark:border-zinc-800 border-zinc-200">
                    <label className="dark:text-zinc-500 text-zinc-400 text-xs uppercase tracking-wider">
                      Email Address
                    </label>
                    <p className="font-semibold dark:text-white text-zinc-900 mt-1">thabo@nyuku.co.za</p>
                  </div>
                  <div className="dark:bg-zinc-900/60 bg-zinc-50 p-4 rounded-2xl border dark:border-zinc-800 border-zinc-200">
                    <label className="dark:text-zinc-500 text-zinc-400 text-xs uppercase tracking-wider">
                      Mobile Number
                    </label>
                    <p className="font-semibold dark:text-white text-zinc-900 mt-1">+27 (0) 82 555 0192</p>
                  </div>
                  <div className="dark:bg-zinc-900/60 bg-zinc-50 p-4 rounded-2xl border dark:border-zinc-800 border-zinc-200">
                    <label className="dark:text-zinc-500 text-zinc-400 text-xs uppercase tracking-wider">
                      Primary Delivery City
                    </label>
                    <p className="font-semibold dark:text-white text-zinc-900 mt-1">
                      Cape Town, Western Cape, 8001
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Orders & Receipts Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold font-gothic text-amber-500 dark:text-amber-400">
                    Past Orders & Receipts
                  </h3>
                  <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                    Archived drops with South African courier tracking numbers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl dark:bg-zinc-900/60 bg-zinc-50 border dark:border-zinc-800 border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-500 dark:text-amber-400 font-bold">
                        #NYK-ORD-8821
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 font-semibold border border-emerald-500/30">
                        Delivered
                      </span>
                    </div>
                    <p className="text-sm font-semibold dark:text-white text-zinc-900">
                      NYUKU Botanical Technical Track Jacket - Olive
                    </p>
                    <p className="text-xs dark:text-zinc-400 text-zinc-600">
                      Paid: R1,200 via PayFast • Courier: The Courier Guy (TCG-89128)
                    </p>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-xl dark:bg-zinc-800 bg-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-semibold dark:text-zinc-200 text-zinc-800 transition-colors">
                    View Receipt
                  </button>
                </div>
              </div>
            )}

            {/* 4. Returns & Exchange Tab */}
            {activeTab === 'returns' && (
              <div className="text-center py-16 dark:text-zinc-500 text-zinc-400">
                <RotateCcw className="w-12 h-12 mx-auto mb-3 opacity-40 text-amber-500" />
                <p className="text-sm dark:text-zinc-200 text-zinc-800 font-semibold">
                  No Exchanges or Returns Pending
                </p>
                <p className="text-xs dark:text-zinc-500 text-zinc-500 mt-1 max-w-sm mx-auto">
                  All drops are backed by our 14-day exchange policy for wrong sizes or unworn streetwear.
                </p>
              </div>
            )}

            {/* 5. Wallet Tab */}
            {activeTab === 'wallet' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-gothic text-amber-500 dark:text-amber-400">
                    Nyüku Wallet
                  </h3>
                  <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                    Instant checkout store credit and gift cards.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-zinc-200/50 dark:via-zinc-900 to-transparent border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest font-mono font-bold">
                      Current Store Credit
                    </span>
                    <p className="text-4xl font-extrabold dark:text-white text-zinc-900 mt-1">R1,250.00</p>
                    <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-1">
                      Ready to apply at checkout automatically.
                    </p>
                  </div>
                  <button className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-colors shadow">
                    Top Up Wallet
                  </button>
                </div>
              </div>
            )}

            {/* 6. Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-gothic text-amber-500 dark:text-amber-400">
                      Wishlist & Saved Archive
                    </h3>
                    <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                      Move your pieces to the bag before stock runs out.
                    </p>
                  </div>
                  {wishlistProducts.length > 0 && (
                    <span className="text-xs font-mono dark:text-zinc-400 text-zinc-600 dark:bg-zinc-900 bg-zinc-100 px-3 py-1 rounded-full border dark:border-zinc-800 border-zinc-250">
                      {wishlistProducts.length} Items Saved
                    </span>
                  )}
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-16 dark:text-zinc-500 text-zinc-400">
                    <Heart className="w-12 h-12 mx-auto mb-3 opacity-40 text-rose-500" />
                    <p className="text-sm dark:text-zinc-200 text-zinc-800 font-semibold">
                      Your Wishlist is Empty
                    </p>
                    <p className="text-xs dark:text-zinc-500 text-zinc-500 mt-1">
                      Browse the shop catalog and save your favorites.
                    </p>
                    {onNavigateShop && (
                      <button
                        onClick={onNavigateShop}
                        className="mt-4 px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors shadow"
                      >
                        Explore Drop Catalog
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistProducts.map((item) => (
                      <div
                        key={item.id}
                        className="dark:bg-zinc-900/60 bg-zinc-50 border dark:border-zinc-800/80 border-zinc-200 rounded-2xl p-4 flex gap-4 items-center justify-between group hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-16 h-16 rounded-xl dark:bg-zinc-800 bg-zinc-200 overflow-hidden shrink-0 border dark:border-zinc-700/50 border-zinc-300">
                            <img
                              src={item.images.front}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold dark:text-white text-zinc-900 line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-amber-500 dark:text-amber-400 font-bold font-mono text-xs mt-0.5">
                              {item.price}
                            </p>
                            <span className="text-[10px] dark:text-zinc-400 text-zinc-500 uppercase tracking-wider">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          <button
                            onClick={() => handleMoveToBag(item)}
                            className="px-3 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1 shadow-sm"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="dark:text-zinc-500 text-zinc-400 hover:text-rose-500 text-[11px] flex items-center justify-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 7. Drop Waitlist Tab */}
            {activeTab === 'waitlist' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold font-gothic text-amber-500 dark:text-amber-400">
                    Drop Waitlist
                  </h3>
                  <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                    Upcoming pieces queued for your notification alerts.
                  </p>
                </div>
                <div className="p-4 rounded-2xl dark:bg-zinc-900/60 bg-zinc-50 border dark:border-zinc-800 border-zinc-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold dark:text-white text-zinc-900">
                      NYUKU Pro Alpine Mirrored Ski Goggles
                    </p>
                    <p className="text-xs dark:text-zinc-400 text-zinc-600">
                      Next Drop: Winter 2026 Archive Restock
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono dark:bg-zinc-800 bg-zinc-200 text-amber-600 dark:text-amber-300 border dark:border-zinc-700 border-zinc-300 font-bold">
                    Queue Position #42
                  </span>
                </div>
              </div>
            )}

            {/* 8. Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold font-gothic text-amber-500 dark:text-amber-400">
                    Activity Notifications
                  </h3>
                  <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                    Recent drop alerts and club announcements.
                  </p>
                </div>
                <div className="space-y-2.5">
                  <div className="p-4 rounded-2xl dark:bg-zinc-900/70 bg-zinc-50 border border-amber-500/40 flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold dark:text-white text-zinc-900">
                        Standardized Catalog Pricing Updated
                      </p>
                      <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                        All Tees (R430 - R850), Track Jackets (R1,200), Towels (R220), Tumblers (R120), and Frosted Cups (R75) are live.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl dark:bg-zinc-900/50 bg-zinc-50 border dark:border-zinc-800 border-zinc-200 flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full dark:bg-zinc-600 bg-zinc-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold dark:text-white text-zinc-900">
                        Gold Tier Perks Activated
                      </p>
                      <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                        Your 15% discount will be calculated on bag transfers automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 9. Help Centre Tab */}
            {activeTab === 'help' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-gothic text-amber-500 dark:text-amber-400">
                    Concierge & Support
                  </h3>
                  <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-0.5">
                    Live assistance for South African orders, sizing, and VIP club queries.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl dark:bg-zinc-900/60 bg-zinc-50 border dark:border-zinc-800 border-zinc-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 dark:text-white text-zinc-900 font-bold text-sm">
                        <MessageSquare className="w-4 h-4 text-emerald-500" />
                        WhatsApp Support
                      </div>
                      <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-2">
                        Fastest response for Cape Town & Joburg delivery status.
                      </p>
                    </div>
                    <a
                      href="https://wa.me/27820000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-xs font-mono text-amber-500 dark:text-amber-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      +27 (0) 82 000 0000 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-5 rounded-2xl dark:bg-zinc-900/60 bg-zinc-50 border dark:border-zinc-800 border-zinc-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 dark:text-white text-zinc-900 font-bold text-sm">
                        <HelpCircle className="w-4 h-4 text-amber-500" />
                        Email Concierge
                      </div>
                      <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-2">
                        For custom orders, returns, and wholesale club inquiries.
                      </p>
                    </div>
                    <a
                      href="mailto:concierge@nyuku.co.za"
                      className="mt-4 text-xs font-mono text-amber-500 dark:text-amber-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      concierge@nyuku.co.za <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;