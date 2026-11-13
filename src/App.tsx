import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import type { NavigationPage } from './components/Navbar';
import { Footer, type ProfileTab } from './components/Footer';
import Shop from './pages/Shop';
import { Sale } from './pages/Sale';
import { Profile } from './pages/profile/Profile';
import { About } from './pages/About';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { AuthModal } from './components/AuthModal';
import { PRODUCTS } from './data/products';
import type { Product } from './data/products';
import { getActiveUser, logoutUser, type NyukuUser } from './utils/authStorage';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Flame,
  Compass,
  ArrowUpRight,
  Heart,
} from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [profileTab, setProfileTab] = useState<ProfileTab>('membership');
  const [currentUser, setCurrentUser] = useState<NyukuUser | null>(() => getActiveUser());
  const [cart, setCart] = useState<{ product: Product; size: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [wishlistToast, setWishlistToast] = useState<{ message: string; title: string; active: boolean } | null>(null);

  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('nyuku_live_wishlist');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [activeCoverIndex, setActiveCoverIndex] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nyuku_theme');
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem('nyuku_live_wishlist', JSON.stringify(wishlistIds));
    } catch (err) {
      console.error(err);
    }
  }, [wishlistIds]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
      localStorage.setItem('nyuku_theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
      localStorage.setItem('nyuku_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleNavigate = (page: NavigationPage, targetProfileTab?: ProfileTab) => {
    if (targetProfileTab) {
      setProfileTab(targetProfileTab);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (user: NyukuUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    handleNavigate('home');
  };

  const handleAddToCart = (product: Product, size = 'M') => {
    setCart((prev) => {
      const existing = prev.find((item) => Number(item.product.id) === Number(product.id) && item.size === size);
      if (existing) {
        return prev.map((item) =>
          Number(item.product.id) === Number(product.id) && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    const pId = Number(product.id);
    setWishlistIds((prev) => {
      const exists = prev.includes(pId);
      const updated = exists ? prev.filter((id) => id !== pId) : [...prev, pId];

      setWishlistToast({
        title: product.title,
        message: exists ? 'Removed from your archive wishlist' : 'Added to your live archive wishlist',
        active: !exists,
      });

      setTimeout(() => {
        setWishlistToast(null);
      }, 3000);

      return updated;
    });
  };

  const handleUpdateQuantity = (productId: number, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (Number(item.product.id) === Number(productId) && item.size === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; size: string; quantity: number }[]
    );
  };

  const handleRemoveFromCart = (productId: number, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(Number(item.product.id) === Number(productId) && item.size === size))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const CAROUSEL_PIECES = useMemo(
    () => [
      {
        id: 71,
        title: 'Bottlecaps Sage Tee',
        tag: 'Heavy Cotton',
        material: '280GSM Combed Cotton',
        img: '/nyuku-tee-bottlecaps-moss.png',
      },
      {
        id: 74,
        title: 'Club Quilted Puffer Vest',
        tag: 'Down Outerwear',
        material: 'Technical Matte Ripstop',
        img: '/nyuku-puffer-vest-black-bb.png',
      },
      {
        id: 70,
        title: 'Dictionary Sky Hoodie',
        tag: 'Fleece Outerwear',
        material: '450GSM French Terry',
        img: '/nyuku-hoodie-dictionary-sky.png',
      },
      {
        id: 81,
        title: 'NYÜKU 3.0 Block Tee - Noir',
        tag: 'Heavy Graphic Tee',
        material: '280GSM Combed African Cotton',
        img: '/nyuku-tee-reflected-black-front-bs.png',
      },
      {
        id: 72,
        title: 'Bubble Mascot Sweats',
        tag: 'Baggy Fleece',
        material: '450GSM Loopback Cotton',
        img: '/nyuku-sweatpants-bubble-noir.png',
      },
      {
        id: 75,
        title: 'Citrus Rugby Polo',
        tag: 'Heavy Knit Jersey',
        material: '320GSM Combed Cotton',
        img: '/nyuku-rugby-polo-orange-bb.png',
      },
      {
        id: 82,
        title: 'NYÜKU 3.0 Block Tee - Bubble Pink',
        tag: 'Heavy Graphic Tee',
        material: '280GSM Combed African Cotton',
        img: '/nyuku-tee-reflected-pink-front-bs.png',
      },
      {
        id: 73,
        title: 'Heritage Tennis Cap',
        tag: 'Washed Headwear',
        material: 'Distressed Cotton Twill',
        img: '/nyuku-cap-tennis-heritage-charcoal.png',
      },
    ],
    []
  );

  const totalPieces = CAROUSEL_PIECES.length;

  const handlePrevCover = () => {
    setActiveCoverIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCover = () => {
    setActiveCoverIndex((prev) => Math.min(totalPieces - 1, prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    if (diff > 45) {
      handlePrevCover();
    } else if (diff < -45) {
      handleNextCover();
    }
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (diff > 35) {
      handlePrevCover();
    } else if (diff < -35) {
      handleNextCover();
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col justify-between ${
        isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen((prev) => !prev)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenAuth={(mode) => handleOpenAuth(mode)}
      />

      {wishlistToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`p-4 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl ${
              isDark ? 'bg-zinc-900/95 border-amber-400/30 text-white' : 'bg-white/95 border-slate-300 text-slate-900'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                wishlistToast.active ? 'bg-amber-400 text-black' : 'bg-zinc-700 text-zinc-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlistToast.active ? 'fill-black' : ''}`} />
            </div>
            <div className="text-left font-mono text-xs">
              <p className="font-bold line-clamp-1">{wishlistToast.title}</p>
              <p className="text-[11px] text-zinc-400">{wishlistToast.message}</p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="pt-24 pb-0 space-y-16 overflow-hidden select-none">
            <section className="relative pt-6 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[34rem] h-[28rem] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none" />
              <div className="absolute top-6 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-20 text-center max-w-3xl mx-auto space-y-4 mb-4">
                <h1 className="font-gothic text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.05] select-none">
                  Make It A{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 drop-shadow-[0_0_26px_rgba(251,191,36,0.4)]">
                    Nyüku Day.
                    <span className="absolute -top-1 -right-4 text-xs font-mono font-bold text-amber-400 animate-pulse">
                      ✦
                    </span>
                  </span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-slate-700 dark:text-zinc-300 font-sans tracking-wide">
                  <span className="text-slate-900 dark:text-white font-bold">
                    Good paper, heavier cotton, better energy.
                  </span>{' '}
                  Dimensional craftsmanship built for everyday motion. Swipe to explore the drop archive.
                </p>
              </div>

              <div
                className="relative mt-2 min-h-[460px] sm:min-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{ perspective: '1200px' }}
              >
                <div className="absolute -top-3 z-40 px-4 py-1.5 rounded-full border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md shadow-sm">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-800 dark:text-zinc-300">
                    OUR TRENDY ARCHIVE
                  </span>
                </div>

                <div className="relative w-full max-w-5xl h-[410px] sm:h-[450px] flex items-center justify-center overflow-visible">
                  {CAROUSEL_PIECES.map((piece, index) => {
                    const offset = index - activeCoverIndex;
                    const isCenter = offset === 0;

                    const translateX = offset * 240;
                    const translateZ = isCenter ? 130 : -140 - Math.abs(offset) * 65;
                    const rotateY = offset * -26;
                    const scale = isCenter ? 1.15 : Math.max(0.65, 0.76 - (Math.abs(offset) - 1) * 0.1);
                    const opacity = Math.abs(offset) > 3 ? 0 : isCenter ? 1 : 0.65;
                    const zIndex = 30 - Math.abs(offset) * 8;
                    const filter = isCenter ? 'none' : 'blur(1px) brightness(0.85)';

                    return (
                      <div
                        key={piece.id}
                        onClick={() => {
                          if (!isCenter) {
                            setActiveCoverIndex(index);
                          } else {
                            const p = PRODUCTS.find((item) => Number(item.id) === Number(piece.id));
                            if (p) handleOpenProduct(p);
                          }
                        }}
                        style={{
                          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                          opacity,
                          zIndex,
                          filter,
                          pointerEvents: Math.abs(offset) > 3 ? 'none' : 'auto',
                        }}
                        className={`group absolute w-[230px] sm:w-[280px] aspect-square flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
                          isCenter ? 'hover:scale-[1.18]' : 'hover:opacity-90'
                        }`}
                      >
                        {isCenter && (
                          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl group-hover:bg-amber-400/30 transition-all pointer-events-none" />
                        )}

                        <div className="relative w-full h-full flex items-center justify-center">
                          <img
                            src={piece.img}
                            alt={piece.title}
                            className="w-full h-full object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.7)] group-hover:-translate-y-2 group-hover:drop-shadow-[0_28px_36px_rgba(0,0,0,0.85)] transition-all duration-300"
                          />
                        </div>

                        <div
                          className={`w-3/4 h-5 bg-black/60 blur-md rounded-full -mt-3 transition-all duration-300 ${
                            isCenter ? 'group-hover:scale-95 group-hover:opacity-85' : 'opacity-40'
                          }`}
                        />

                        {isCenter && (
                          <div className="mt-2 px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-black/75 backdrop-blur-md text-center shadow-xl transition-all duration-300">
                            <p className="text-[9px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                              {piece.tag}
                            </p>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-gothic tracking-wide">
                              {piece.title}
                            </h3>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handlePrevCover}
                  disabled={activeCoverIndex === 0}
                  className={`absolute left-2 sm:left-6 z-40 w-9 h-9 rounded-full border flex items-center justify-center transition-all backdrop-blur-md ${
                    activeCoverIndex === 0
                      ? 'opacity-25 cursor-not-allowed border-slate-300/30 dark:border-white/5'
                      : 'border-slate-300 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:scale-110 active:scale-95 shadow-sm'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNextCover}
                  disabled={activeCoverIndex === totalPieces - 1}
                  className={`absolute right-2 sm:right-6 z-40 w-9 h-9 rounded-full border flex items-center justify-center transition-all backdrop-blur-md ${
                    activeCoverIndex === totalPieces - 1
                      ? 'opacity-25 cursor-not-allowed border-slate-300/30 dark:border-white/5'
                      : 'border-slate-300 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:scale-110 active:scale-95 shadow-sm'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-2">
                {CAROUSEL_PIECES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCoverIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeCoverIndex === i
                        ? 'w-7 bg-amber-500 dark:bg-amber-400'
                        : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </section>

            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div
                className={`relative rounded-3xl p-8 sm:p-14 border transition-all duration-500 overflow-hidden shadow-2xl backdrop-blur-2xl ${
                  isDark
                    ? 'bg-zinc-950/80 border-white/10 text-white'
                    : 'bg-white/95 border-slate-200/80 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
                }`}
              >
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative z-10 flex items-start justify-between gap-6 mb-12 sm:mb-16">
                  <div className="space-y-1">
                    <h2 className="font-gothic text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase">
                      Our Best Selling <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-yellow-400 font-sans tracking-normal font-normal">
                        Product Collection
                      </span>
                    </h2>
                  </div>

                  <button
                    onClick={() => handleNavigate('shop')}
                    className={`group shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full border flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm ${
                      isDark
                        ? 'border-white/20 bg-white/5 hover:bg-amber-400 hover:text-black hover:border-amber-400'
                        : 'border-slate-300 bg-white hover:bg-black hover:text-white hover:border-black'
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                      More
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform mt-0.5" />
                  </button>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
                  {[
                    {
                      id: 46,
                      title: 'Awning Stripe Tennis Polo - Camel',
                      cat: '280GSM PIQUÉ',
                      price: 'R700',
                      img: '/nyuku-polo-striped-tan-front-bs.png',
                      scale: 'scale-105',
                    },
                    {
                      id: 65,
                      title: 'Mineral Denim 5-Panel Camper',
                      cat: 'HEADWEAR VAULT',
                      price: 'R650',
                      img: '/nyuku-cap-denim-5panel-front-bs.png',
                      scale: 'scale-90',
                    },
                    {
                      id: 41,
                      title: 'Vanilla Multi-Bubble Trackpants',
                      cat: '450GSM FLEECE',
                      price: 'R650',
                      img: '/nyuku-trackpants-cream-front-bs.png',
                      scale: 'scale-105',
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        const p = PRODUCTS.find((prod) => Number(prod.id) === Number(item.id)) || PRODUCTS[0];
                        handleOpenProduct(p);
                      }}
                      className="group relative flex flex-col items-center justify-center cursor-pointer select-none"
                    >
                      <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                        <div
                          className={`absolute inset-0 rounded-full transition-all duration-500 ${
                            isDark
                              ? 'bg-zinc-900/90 border border-white/10 group-hover:border-amber-400/40 group-hover:bg-zinc-900'
                              : 'bg-slate-100/90 border border-slate-200/80 group-hover:border-amber-400/60 group-hover:bg-slate-50'
                          }`}
                        />

                        <div className="absolute inset-4 rounded-full bg-gradient-to-b from-transparent via-white/5 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center">
                          <img
                            src={item.img}
                            alt={item.title}
                            className={`w-full h-full object-contain filter drop-shadow-[0_20px_28px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:drop-shadow-[0_28px_36px_rgba(0,0,0,0.5)] ${item.scale}`}
                          />
                        </div>

                        <div className="absolute bottom-6 w-36 h-4 bg-black/25 dark:bg-black/50 blur-md rounded-full transition-all duration-500 group-hover:scale-90 group-hover:opacity-60" />
                      </div>

                      <div className="mt-5 text-center space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 font-bold">
                          {item.cat}
                        </span>
                        <h4 className="font-gothic text-base sm:text-lg font-bold group-hover:text-amber-500 transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-mono text-sm font-black text-amber-600 dark:text-amber-400">
                          {item.price}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const p = PRODUCTS.find((prod) => Number(prod.id) === Number(item.id)) || PRODUCTS[0];
                          handleAddToCart(p);
                        }}
                        className="mt-3 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 shadow-md bg-amber-400 text-black border-amber-300 hover:bg-amber-300 cursor-pointer"
                      >
                        + Add to Bag
                      </button>
                    </div>
                  ))}
                </div>

                <div className="relative z-20 flex justify-center -mb-4 mt-8 sm:mt-12">
                  <button
                    onClick={() => handleNavigate('shop')}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer ${
                      isDark
                        ? 'bg-zinc-900 border-white/20 text-white hover:bg-amber-400 hover:text-black hover:border-amber-400'
                        : 'bg-white border-slate-300 text-slate-900 hover:bg-black hover:text-white hover:border-black'
                    }`}
                    title="View Full Catalog"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>

            <section className="relative w-full bg-black text-white overflow-hidden py-20 px-6 sm:px-12 border-t border-white/10">
              <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-600/20 via-red-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

              <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5 space-y-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 inline-block text-amber-400 font-bold">
                      ZEBEDIELA, LIMPOPO • 2026
                    </span>
                    <p className="text-xs font-mono text-zinc-400 leading-relaxed max-w-sm">
                      ROOTED IN THE CITRUS VALLEYS OF ZEBEDIELA, LIMPOPO. WE CRAFT HEAVYWEIGHT APPAREL ENGINEERED TO CARRY THE SPIRIT OF HOMELAND HUSTLE.
                    </p>
                    <button
                      onClick={() => handleNavigate('shop')}
                      className="group inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-amber-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Explore Drop Vault</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="md:col-span-7 flex md:justify-end">
                    <h2 className="font-gothic text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-left md:text-right leading-[1.02]">
                      Advanced Concepts <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                        In Streetwear.
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="relative w-full my-8 flex items-center justify-center">
                  <div className="w-full text-center overflow-hidden pointer-events-none select-none">
                    <span className="font-gothic font-black text-[18vw] leading-none tracking-tighter text-white/[0.07] block uppercase">
                      NYÜKU
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <img
                      src="/nyuku-varsity-green-tumbler.png"
                      alt="Everywhere Varsity Jacket Cutout"
                      className="max-h-[360px] sm:max-h-[480px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-8">
                  <div className="md:col-span-6 space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-amber-500 font-bold block">
                      Statement Slogan
                    </span>
                    <h3 className="font-gothic text-2xl sm:text-4xl font-extrabold uppercase leading-tight">
                      It's Creative Energy <br /> You Can Wear.
                    </h3>
                  </div>
                  <div className="md:col-span-6 flex md:justify-end">
                    <p className="font-mono text-xs text-zinc-400 max-w-sm text-left md:text-right">
                      Every piece we create reflects the grind behind it. Bespoke cartoon typography engineered for real daily wear.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center text-center space-y-1.5">
                <div className="px-4 py-1.5 rounded-full border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-800 dark:text-zinc-300">
                    Customer Reviews
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  4.9 / 5.0 Average Rating from Verified Collectors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: 'Kagiso M.',
                    role: 'Polokwane Member',
                    piece: '3.0 Reflected Block Tee',
                    review:
                      'The screen print density on the 3.0 mirrored block tee feels truly high-end. Pure luxury weight cotton.',
                  },
                  {
                    name: 'Nandi D.',
                    role: 'Johannesburg Collector',
                    piece: 'Frosted Tumbler & Cube Tee',
                    review:
                      'The frosted tumbler and isometric tee have that vintage tennis syndicate aesthetic down perfectly.',
                  },
                  {
                    name: 'Sipho Z.',
                    role: 'VIP Syndicate Gold',
                    piece: 'Definition Sky Hoodie',
                    review:
                      'Quality is unmatched. Heavyweight loopback cotton that holds its structure wash after wash.',
                  },
                ].map((rev, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border backdrop-blur-xl text-left space-y-3 ${
                      isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center text-xs">
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.name}</h4>
                          <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">{rev.role}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-400/20">
                        {rev.piece}
                      </span>
                    </div>
                    <div className="flex gap-1 text-amber-500 text-xs">★★★★★</div>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-zinc-300">
                      "{rev.review}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="text-left space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono uppercase tracking-widest">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Editorial Lookbook & Storyline</span>
                  </div>
                  <h2 className="font-gothic text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                    The Syndicate Movement.
                  </h2>
                </div>
                <p className="text-xs max-w-md font-mono text-slate-600 dark:text-zinc-400">
                  Every drop is a recorded entry in our ongoing narrative. Street-tested silhouettes, high-density cotton, and sealed archives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: 'syndicate-roots',
                    chapter: 'Chapter 01 // Streetwear Genesis',
                    title: 'Forged in the Culture',
                    desc: 'From late-night sketches to concrete runways. Built for those who walk with bold intention.',
                    image: '/nyuku-varsity-green-tumbler.png',
                    productId: 58,
                    productName: 'Everywhere Varsity Jacket',
                    price: 'R3,850',
                    badge: 'MEMBERS ONLY',
                  },
                  {
                    id: 'summer-escapism',
                    chapter: 'Chapter 02 // Sun-Drenched Escapism',
                    title: 'Off-Grid Leisure Club',
                    desc: 'Neutral knit buckets, wide-wale corduroy textures, and botanical cutouts engineered for summer heat.',
                    image: '/nyuku-bucket-purple-front.png',
                    productId: 26,
                    productName: 'Purple Corduroy Bucket Hat',
                    price: 'R320',
                  },
                  {
                    id: 'modern-subversion',
                    chapter: 'Chapter 03 // Modern Subversion',
                    title: 'The Safety Pin & The Vault',
                    desc: 'Heavyweight 300GSM combed cotton drape paired with raw typography and sealed archive numbering.',
                    image: '/nyuku-tee-bottlecaps-white-front.png',
                    productId: 62,
                    productName: 'Soda Bottlecaps Heavy Tee',
                    price: 'R850',
                  },
                ].map((moment) => (
                  <div
                    key={moment.id}
                    className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-xl ${
                      isDark
                        ? 'border-white/10 bg-zinc-950 hover:border-amber-400/80'
                        : 'border-slate-200 bg-white hover:border-amber-400'
                    }`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 flex items-center justify-center p-6">
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {moment.badge && (
                        <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[10px] font-mono tracking-widest text-white uppercase flex items-center gap-1.5">
                          <Flame className="w-3 h-3 text-amber-400" />
                          <span>{moment.badge}</span>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          const p = PRODUCTS.find((prod) => Number(prod.id) === Number(moment.productId));
                          if (p) handleOpenProduct(p);
                        }}
                        className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white text-black hover:bg-amber-400 flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                        title="Inspect Piece"
                      >
                        <ShoppingBag className="w-4 h-4 stroke-[2]" />
                      </button>
                    </div>

                    <div className="p-6 border-t border-slate-100 dark:border-white/5 space-y-2 text-left">
                      <span className="text-[10px] font-mono tracking-widest text-amber-600 dark:text-amber-400 uppercase font-bold">
                        {moment.chapter}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                        {moment.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                        {moment.desc}
                      </p>

                      <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-zinc-400">{moment.productName}</span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold">{moment.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CLOSING BRAND MANIFESTO + VIP CARD PREVIEW */}
            <section className="p-8 sm:p-16 lg:p-20 pb-10 relative overflow-hidden bg-black text-white border-t border-white/10">
              <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
                  <div className="lg:col-span-7 space-y-6">
                    <h2 className="font-gothic text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.02]">
                      Every piece we create reflects the grind behind it.
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs font-mono text-zinc-400">
                      <div className="space-y-2">
                        <span className="text-white font-bold uppercase tracking-wider block">
                          Archive Provenance
                        </span>
                        <p className="leading-relaxed">
                          Born and established in Zebediela, Limpopo. Crafted from sustainably combed 280GSM–450GSM African cottons and custom cartoon letter typography.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-white font-bold uppercase tracking-wider block">
                          The Syndicate Heritage
                        </span>
                        <p className="leading-relaxed">
                          Translating regional northern dialect and country club leisure into limited streetwear collector drops.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleNavigate('profile', 'membership')}
                        className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                      >
                        Inspect Syndicate Pass
                      </button>
                      <span className="text-amber-400 font-mono font-bold uppercase tracking-widest text-sm">
                        [ZEBEDIELA, LIMPOPO, ZA]
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                    <div className="absolute inset-4 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
                    <img
                      src="/nyuku-card-gold-front.png"
                      alt="NYÜKU Gold Archive Pass"
                      onClick={() => handleNavigate('profile', 'membership')}
                      className="relative z-10 w-full max-w-sm object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                    <span className="mt-3 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      Gold Archive Tier • 15% Lifetime Privilege
                    </span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center select-none pointer-events-none overflow-hidden">
                  <span className="font-gothic font-black text-[9.5vw] leading-none tracking-tight text-white/[0.06] uppercase whitespace-nowrap block">
                    NYÜKU SOUTH AFRICA
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'shop' && (
          <Shop
            onAddToCart={(product, size) => handleAddToCart(product, size || 'M')}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            darkMode={isDark}
          />
        )}

        {currentPage === 'sale' && (
          <Sale
            onAddToCart={(product, size) => handleAddToCart(product, size || 'M')}
            onSelectProduct={handleOpenProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            darkMode={isDark}
          />
        )}

        {currentPage === 'about' && (
          <About
            onNavigateShop={() => handleNavigate('shop')}
            isDark={isDark}
          />
        )}

        {currentPage === 'profile' && (
          <Profile
            onAddToCart={handleAddToCart}
            onNavigateShop={() => handleNavigate('shop')}
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            initialTab={profileTab}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )}
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(Number(selectedProduct.id)) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        isDark={isDark}
        onAuthSuccess={handleAuthSuccess}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        tier={currentUser?.tier || 'gold'}
        isDark={isDark}
      />

      {currentPage !== 'profile' && (
        <Footer
          onNavigate={handleNavigate}
          isDark={isDark}
        />
      )}
    </div>
  );
}

export default App;