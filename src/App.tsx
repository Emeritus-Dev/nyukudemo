import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import type { NavigationPage } from './components/Navbar';
import { Profile } from './pages/profile/Profile';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { PRODUCTS } from './data/products';
import type { Product } from './data/products';
import { ArrowRight, SlidersHorizontal, Sun, Moon, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

type CatalogCategoryFilter = 'all' | 'men' | 'women' | 'accessories' | 'club-leisure';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategoryFilter>('all');
  const [cart, setCart] = useState<{ product: Product; size: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Interactive Product Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3D Carousel Stage State
  const [activeCoverIndex, setActiveCoverIndex] = useState(2); // Centers the varsity jacket by default
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Read saved theme from localStorage, default to dark
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nyuku_theme');
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  // Apply theme to the entire document
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

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, size = 'M') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
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
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 3D Carousel Lineup with new newly created high-res items
  const CAROUSEL_PIECES = useMemo(() => [
    {
      id: 70,
      title: "Dictionary Sky Hoodie",
      tag: "Fleece Outerwear",
      price: "R1,450",
      material: "450GSM French Terry",
      img: "/nyuku-hoodie-dictionary-sky.png",
    },
    {
      id: 71,
      title: "Bottlecaps Sage Tee",
      tag: "Heavy Cotton",
      price: "R850",
      material: "280GSM Combed Cotton",
      img: "/nyuku-tee-bottlecaps-moss.png",
    },
    {
      id: 58,
      title: "Everywhere Varsity Jacket",
      tag: "Collector Hero",
      price: "R3,850",
      material: "Melton Wool & Pebbled Cowhide",
      img: "/nyuku-varsity-green-tumbler.png",
    },
    {
      id: 72,
      title: "Bubble Mascot Sweats",
      tag: "Baggy Fleece",
      price: "R1,200",
      material: "450GSM Loopback Cotton",
      img: "/nyuku-sweatpants-bubble-noir.png",
    },
    {
      id: 73,
      title: "Heritage Tennis Cap",
      tag: "Washed Headwear",
      price: "R480",
      material: "Distressed Cotton Twill",
      img: "/nyuku-cap-tennis-heritage-charcoal.png",
    },
    {
      id: 5,
      title: "Isometric Cube Tee",
      tag: "Heavy Cotton",
      price: "R600",
      material: "280GSM Compact Cotton",
      img: "/nyuku-tee-cube-back.png",
    },
  ], []);

  // Drag / Swipe handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    if (diff > 40) {
      setActiveCoverIndex((prev) => Math.max(0, prev - 1));
    } else if (diff < -40) {
      setActiveCoverIndex((prev) => Math.min(CAROUSEL_PIECES.length - 1, prev + 1));
    }
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (diff > 35) {
      setActiveCoverIndex((prev) => Math.max(0, prev - 1));
    } else if (diff < -35) {
      setActiveCoverIndex((prev) => Math.min(CAROUSEL_PIECES.length - 1, prev + 1));
    }
  };

  // Filter products based on selected category in the Shop
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return PRODUCTS;

    return PRODUCTS.filter((product) => {
      const title = product.title.toLowerCase();
      const cat = (product.category || '').toLowerCase();

      if (selectedCategory === 'club-leisure') {
        return (
          title.includes('chair') ||
          title.includes('fieldbar') ||
          title.includes('cooler') ||
          title.includes('cup') ||
          title.includes('towel') ||
          cat.includes('outdoor') ||
          cat.includes('club')
        );
      }

      if (selectedCategory === 'accessories') {
        return (
          title.includes('cap') ||
          title.includes('hat') ||
          title.includes('beanie') ||
          title.includes('bag') ||
          title.includes('tote') ||
          cat.includes('accessories') ||
          cat.includes('headwear')
        );
      }

      if (selectedCategory === 'women') {
        return (
          product.gender === 'Women' ||
          product.gender === 'Unisex' ||
          title.includes('crop') ||
          title.includes('rugby')
        );
      }

      if (selectedCategory === 'men') {
        return (
          product.gender === 'Men' ||
          product.gender === 'Unisex' ||
          title.includes('varsity') ||
          title.includes('jacket') ||
          title.includes('jersey') ||
          title.includes('hoodie') ||
          title.includes('sweat')
        );
      }

      return true;
    });
  }, [selectedCategory]);

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col justify-between ${
      isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Frosted Glass Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen((prev) => !prev)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenAuth={(mode) => alert(`Auth Modal: ${mode.toUpperCase()} window ready.`)}
      />

      {/* Main App Surfaces */}
      <main className="flex-grow">

        {/* ================= PAGE 1: HOME (3D DIMENSIONAL SHOWCASE) ================= */}
        {currentPage === 'home' && (
          <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 overflow-hidden select-none">

            {/* 1. HERO SECTION: 3D DIMENSIONAL COVERFLOW STAGE */}
            <section className="relative pt-4 pb-8">

              {/* Ambient radial background illumination */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[34rem] h-[28rem] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none" />
              <div className="absolute top-6 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Top Row: Editorial Headline & Floating Header Pill */}
              <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-2">

                <div className="lg:col-span-7 space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-zinc-300 font-bold uppercase tracking-wider">High Summer Drop: Sealed Batch 04</span>
                  </div>

                  <h1 className="font-gothic text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05]">
                    Breath Natural.
                  </h1>
                  <p className={`text-xs max-w-md leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                    The Nyüku Syndicate dimensional archive. Swipe sideways to cycle through collector drops, or hover any piece to bring it forward into depth focus.
                  </p>
                </div>

                {/* Top Right Mini Capsule Card (Cream Bucket Hat) */}
                <div className="lg:col-span-5 flex justify-end">
                  <div
                    onClick={() => {
                      const p = PRODUCTS.find((item) => item.title.includes('Bucket') || item.id === 26);
                      if (p) handleOpenProduct(p);
                    }}
                    className={`group w-full max-w-[260px] rounded-2xl p-3 border transition-all duration-300 cursor-pointer backdrop-blur-xl ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] hover:border-amber-400/60 hover:bg-white/[0.06]'
                        : 'border-slate-200 bg-white/80 hover:border-amber-400 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 shrink-0 relative flex items-center justify-center">
                        <img
                          src="/nyuku-bucket-cream.png"
                          alt="Cream Bucket Hat"
                          className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-left flex-grow">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Headwear</span>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">Corduroy Bucket</h4>
                        <p className="font-mono font-bold text-amber-500 text-xs mt-0.5">R320</p>
                        <span className="text-[9px] text-zinc-400 group-hover:text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                          Inspect →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* 3D PERSPECTIVE STAGE */}
              <div
                className="relative mt-2 min-h-[440px] sm:min-h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{ perspective: '1100px' }}
              >
                {/* Pill Section Header */}
                <div className="absolute -top-3 z-40 px-4 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-300">
                    OUR TRENDY ARCHIVE
                  </span>
                </div>

                {/* Left Floating Capsule: Frosted Cup */}
                <div className="hidden lg:block absolute left-0 top-16 z-30 w-64 pointer-events-auto">
                  <div
                    onClick={() => {
                      const p = PRODUCTS.find((item) => item.id === 35);
                      if (p) handleOpenProduct(p);
                    }}
                    className={`group rounded-2xl p-3 border transition-all duration-300 cursor-pointer backdrop-blur-xl flex items-center gap-3 ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] hover:border-amber-400/60 hover:bg-white/[0.06]'
                        : 'border-slate-200 bg-white/80 hover:border-amber-400 shadow-lg'
                    }`}
                  >
                    <div className="w-12 h-16 shrink-0 flex items-center justify-center">
                      <img
                        src="/nyuku-tumbler-frosted.png"
                        alt="Frosted Tumbler"
                        className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-mono uppercase text-zinc-400">Club Vessel</span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Frosted Character Cup</h4>
                      <p className="font-mono font-bold text-amber-500 text-xs mt-0.5">R120</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const p = PRODUCTS.find((item) => item.id === 35);
                          if (p) handleAddToCart(p);
                        }}
                        className="mt-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-black uppercase tracking-wider"
                      >
                        Buy Piece
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Floating Capsule: 5-Panel Cap */}
                <div className="hidden lg:block absolute right-0 bottom-12 z-30 w-64 pointer-events-auto">
                  <div
                    onClick={() => {
                      const p = PRODUCTS.find((item) => item.id === 65);
                      if (p) handleOpenProduct(p);
                    }}
                    className={`group rounded-2xl p-3 border transition-all duration-300 cursor-pointer backdrop-blur-xl flex items-center gap-3 ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] hover:border-amber-400/60 hover:bg-white/[0.06]'
                        : 'border-slate-200 bg-white/80 hover:border-amber-400 shadow-lg'
                    }`}
                  >
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                      <img
                        src="/nyuku-cap-stonewash-black.png"
                        alt="Stonewash Black Cap"
                        className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-mono uppercase text-zinc-400">Headwear</span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">5-Panel Camper Cap</h4>
                      <p className="font-mono font-bold text-amber-500 text-xs mt-0.5">R650</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const p = PRODUCTS.find((item) => item.id === 65);
                          if (p) handleAddToCart(p);
                        }}
                        className="mt-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-black uppercase tracking-wider"
                      >
                        Buy Piece
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3D Swipable Product Track */}
                <div className="relative w-full max-w-4xl h-[390px] sm:h-[430px] flex items-center justify-center overflow-visible">
                  {CAROUSEL_PIECES.map((piece, index) => {
                    const offset = index - activeCoverIndex;
                    const isCenter = offset === 0;

                    // Proportional sizing & balanced lateral distance
                    const translateX = offset * 250;
                    const translateZ = isCenter ? 130 : -140 - Math.abs(offset) * 70;
                    const rotateY = offset * -28;
                    const scale = isCenter ? 1.12 : Math.max(0.65, 0.76 - (Math.abs(offset) - 1) * 0.1);
                    const opacity = Math.abs(offset) > 2 ? 0 : isCenter ? 1 : 0.65;
                    const zIndex = 30 - Math.abs(offset) * 8;
                    const filter = isCenter ? 'none' : 'blur(1px) brightness(0.85)';

                    return (
                      <div
                        key={piece.id}
                        onClick={() => {
                          if (!isCenter) {
                            setActiveCoverIndex(index);
                          } else {
                            const p = PRODUCTS.find((item) => item.id === piece.id);
                            if (p) handleOpenProduct(p);
                          }
                        }}
                        style={{
                          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                          opacity,
                          zIndex,
                          filter,
                        }}
                        className={`group absolute w-[230px] sm:w-[280px] aspect-square flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
                          isCenter ? 'hover:scale-[1.18]' : 'hover:opacity-90'
                        }`}
                      >
                        {/* Center Product Ambient Glow */}
                        {isCenter && (
                          <div className="absolute inset-0 bg-amber-400/15 rounded-full blur-2xl group-hover:bg-amber-400/25 transition-all pointer-events-none" />
                        )}

                        {/* Cutout Product Asset */}
                        <img
                          src={piece.img}
                          alt={piece.title}
                          className="w-full h-full object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.7)] group-hover:-translate-y-2 group-hover:drop-shadow-[0_28px_36px_rgba(0,0,0,0.85)] transition-all duration-300"
                        />

                        {/* Contact Shadow Ellipse */}
                        <div
                          className={`w-3/4 h-5 bg-black/60 blur-md rounded-full -mt-3 transition-all duration-300 ${
                            isCenter ? 'group-hover:scale-95 group-hover:opacity-85' : 'opacity-40'
                          }`}
                        />

                        {/* Center Product Floating Label Pill */}
                        {isCenter && (
                          <div className="mt-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/75 backdrop-blur-md text-center shadow-xl transition-all duration-300">
                            <p className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                              {piece.tag}
                            </p>
                            <h3 className="text-xs sm:text-sm font-bold text-white font-gothic tracking-wide">
                              {piece.title}
                            </h3>
                            <p className="text-[11px] font-mono font-black text-amber-400 mt-0.5">
                              {piece.price}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Direction Navigation Arrows */}
                <button
                  type="button"
                  onClick={() => setActiveCoverIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeCoverIndex === 0}
                  className={`absolute left-2 sm:left-6 z-40 w-9 h-9 rounded-full border flex items-center justify-center transition-all backdrop-blur-md ${
                    activeCoverIndex === 0
                      ? 'opacity-30 cursor-not-allowed border-white/5'
                      : 'border-white/10 bg-white/5 hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:scale-110 active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCoverIndex((prev) => Math.min(CAROUSEL_PIECES.length - 1, prev + 1))}
                  disabled={activeCoverIndex === CAROUSEL_PIECES.length - 1}
                  className={`absolute right-2 sm:right-6 z-40 w-9 h-9 rounded-full border flex items-center justify-center transition-all backdrop-blur-md ${
                    activeCoverIndex === CAROUSEL_PIECES.length - 1
                      ? 'opacity-30 cursor-not-allowed border-white/5'
                      : 'border-white/10 bg-white/5 hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:scale-110 active:scale-95'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slider Track Pill Indicators */}
              <div className="flex items-center justify-center gap-1.5 mt-1">
                {CAROUSEL_PIECES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCoverIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeCoverIndex === i
                        ? 'w-7 bg-amber-400'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </section>

            {/* 2. SECTION: OUR TOP SELLING (6-CARD CUTOUT GLASS GRID) */}
            <section className="space-y-6">
              <div className="flex flex-col items-center justify-center text-center space-y-1.5">
                <div className="px-4 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-300">
                    Our Top Selling
                  </span>
                </div>
                <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  Handcrafted archive pieces available for immediate dispatch.
                </p>
              </div>

              {/* 6-Card Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {[
                  { id: 26, title: "Cream Bucket Hat", cat: "Headwear", price: "R320", img: "/nyuku-bucket-cream.png" },
                  { id: 73, title: "Heritage Tennis Cap", cat: "Headwear", price: "R480", img: "/nyuku-cap-tennis-heritage-charcoal.png" },
                  { id: 35, title: "Frosted Tumbler", cat: "Drinkware", price: "R120", img: "/nyuku-tumbler-frosted.png" },
                  { id: 71, title: "Bottlecaps Sage Tee", cat: "T-Shirts", price: "R850", img: "/nyuku-tee-bottlecaps-moss.png" },
                  { id: 58, title: "Everywhere Varsity", cat: "Outerwear", price: "R3,850", img: "/nyuku-varsity-green-tumbler.png" },
                  { id: 72, title: "Bubble Sweats", cat: "Bottoms", price: "R1,200", img: "/nyuku-sweatpants-bubble-noir.png" },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      const p = PRODUCTS.find((prod) => prod.id === item.id) || PRODUCTS[0];
                      handleOpenProduct(p);
                    }}
                    className={`group rounded-2xl p-3 border transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-xl ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] hover:border-amber-400/80 hover:bg-white/[0.06] hover:-translate-y-1'
                        : 'border-slate-200 bg-white/80 hover:border-amber-400 shadow-sm hover:-translate-y-1'
                    }`}
                  >
                    <div className="relative aspect-square w-full flex items-center justify-center p-1.5 mb-2">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-left space-y-0.5">
                      <span className="text-[9px] font-mono uppercase text-zinc-400">{item.cat}</span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">{item.title}</h4>
                      <p className="font-mono font-bold text-amber-500 text-xs">{item.price}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 group-hover:text-amber-400 font-semibold">Inspect</span>
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs group-hover:bg-amber-400 group-hover:text-black transition-colors">
                        +
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. SECTION: CUSTOMER REVIEWS (3 MINIMAL GLASS CAPSULES) */}
            <section className="space-y-6">
              <div className="flex flex-col items-center justify-center text-center space-y-1.5">
                <div className="px-4 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-300">
                    Customer Review
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: "Kagiso M.",
                    role: "Cape Town Member",
                    review: "The 3D embroidery texture on the corduroy bucket hat and varsity jacket feels truly high-end. Pure luxury weight.",
                  },
                  {
                    name: "Nandi D.",
                    role: "Johannesburg Collector",
                    review: "The frosted tumbler and isometric tee have that vintage tennis syndicate aesthetic down perfectly.",
                  },
                  {
                    name: "Sipho Z.",
                    role: "VIP Syndicate Gold",
                    review: "Quality is unmatched. Heavyweight loopback cotton that holds its structure wash after wash.",
                  },
                ].map((rev, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border backdrop-blur-xl text-left space-y-2.5 ${
                      isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white/80 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center text-xs">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{rev.name}</h4>
                        <p className="text-[10px] font-mono text-zinc-400">{rev.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 text-amber-400 text-xs">★★★★★</div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                      "{rev.review}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. SECTION: OUR BEST EQUIPMENT / STATEMENT SHOWCASE */}
            <section className="space-y-6">
              <div className="flex flex-col items-center justify-center text-center space-y-1.5">
                <div className="px-4 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-300">
                    Our Best Edition
                  </span>
                </div>
              </div>

              <div className={`relative rounded-3xl p-6 sm:p-10 border backdrop-blur-2xl transition-all overflow-hidden ${
                isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white/80 shadow-md'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                  {/* Left: Cutout Isometric Cube Tee Display */}
                  <div className="md:col-span-5 flex justify-center">
                    <div
                      onClick={() => {
                        const p = PRODUCTS.find((prod) => prod.id === 5) || PRODUCTS[0];
                        handleOpenProduct(p);
                      }}
                      className="cursor-pointer group relative flex flex-col items-center"
                    >
                      <img
                        src="/nyuku-tee-cube-back.png"
                        alt="Isometric Cube Tee"
                        className="w-full max-h-64 object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="w-40 h-5 bg-black/40 blur-md rounded-full -mt-3" />
                    </div>
                  </div>

                  {/* Right: Editorial Description */}
                  <div className="md:col-span-7 space-y-3 text-left">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                      Limited High-Summer Release
                    </span>
                    <h3 className="font-gothic text-xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                      Isometric Rubik's Typographic Cotton Tee
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                      Engineered with 280GSM combed compact cotton, dropped shoulders, and thick 1.25-inch ribbed crewneck collar. Screen-printed with an isometric 3D typographic puzzle cube graphic celebrating the Nyüku syndicate character letters.
                    </p>
                    <div className="pt-1 flex items-center gap-3">
                      <button
                        onClick={() => {
                          const p = PRODUCTS.find((prod) => prod.id === 5);
                          if (p) handleAddToCart(p);
                        }}
                        className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider transition-all hover:scale-105 shadow-md"
                      >
                        Claim Yours • R600
                      </button>
                      <button
                        onClick={() => setCurrentPage('shop')}
                        className="text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                      >
                        View Full Drop →
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}

        {/* ================= PAGE 2: SHOP ================= */}
        {currentPage === 'shop' && (
          <div className="pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
            <div className={`border-b pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${
              isDark ? 'border-zinc-800' : 'border-slate-200'
            }`}>
              <div>
                <h1 className="font-gothic text-4xl sm:text-5xl">
                  Drop Archive Catalog
                </h1>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  Click on any piece to inspect angles, materials, and available sizes.
                </p>
              </div>
              <span className={`text-xs font-mono px-3 py-1.5 rounded-xl border self-start sm:self-auto ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  : 'bg-slate-200 border-slate-300 text-slate-700'
              }`}>
                Showing {filteredProducts.length} of {PRODUCTS.length} Pieces
              </span>
            </div>

            {/* Category Filters */}
            <div className={`flex items-center gap-2 overflow-x-auto pb-2 border-b ${
              isDark ? 'border-zinc-800' : 'border-slate-200'
            }`}>
              <span className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-1.5 mr-2 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" /> Filter:
              </span>

              {[
                { id: 'all', label: 'All Archive' },
                { id: 'men', label: 'Men' },
                { id: 'women', label: 'Women' },
                { id: 'accessories', label: 'Accessories & Caps' },
                { id: 'club-leisure', label: 'Club & Leisure' },
              ].map((filter) => {
                const isSelected = selectedCategory === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedCategory(filter.id as CatalogCategoryFilter)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                      isSelected
                        ? 'bg-amber-400 text-black shadow-md scale-105'
                        : isDark
                          ? 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-amber-400/50'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400/50 shadow-sm'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-zinc-400 text-base font-semibold">No items found in this category.</p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleOpenProduct(product)}
                    className={`group rounded-2xl border p-3 sm:p-4 flex flex-col justify-between transition-all cursor-pointer relative ${
                      isDark
                        ? 'bg-zinc-950 border-zinc-800 hover:border-amber-400/80'
                        : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
                    }`}
                  >
                    <div className={`relative aspect-square rounded-xl overflow-hidden mb-3 ${
                      isDark ? 'bg-zinc-900' : 'bg-slate-100'
                    }`}>
                      <img
                        src={product.images.front}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-400">{product.category}</span>
                      <h3 className="text-xs sm:text-sm font-semibold line-clamp-1 mt-0.5">
                        {product.title}
                      </h3>
                      <p className="font-mono font-bold text-amber-500 mt-1">{product.price}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="mt-3 w-full py-2 rounded-xl bg-amber-400 text-black text-xs font-bold uppercase transition-colors hover:bg-amber-300"
                    >
                      Quick Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= PAGE 3: SALE ================= */}
        {currentPage === 'sale' && (
          <div className="pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
            <div className={`rounded-3xl p-6 sm:p-10 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isDark
                ? 'bg-gradient-to-r from-emerald-500/15 via-zinc-900 to-black border-emerald-500/30 text-white'
                : 'bg-gradient-to-r from-emerald-500/15 via-emerald-50 to-white border-emerald-500/40 text-slate-900'
            }`}>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500 text-black uppercase">
                  End of Season Vault
                </span>
                <h1 className="font-gothic text-4xl sm:text-5xl mt-3 text-emerald-600 dark:text-emerald-400">
                  Archival Warehouse Clearance
                </h1>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                  Limited deadstock and overstock items discounted for Nyüku Club members.
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold font-mono">UP TO 30% OFF</p>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Discount calculated in bag.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {PRODUCTS.filter(
                (p) =>
                  p.title.includes('Cup') ||
                  p.title.includes('Towel') ||
                  p.price === 'R430' ||
                  p.price === 'R350'
              ).map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleOpenProduct(product)}
                  className={`group rounded-2xl border p-3 sm:p-4 flex flex-col justify-between transition-all cursor-pointer ${
                    isDark
                      ? 'bg-zinc-950 border-emerald-500/30 hover:border-emerald-400'
                      : 'bg-white border-emerald-500/40 hover:border-emerald-500 shadow-sm'
                  }`}
                >
                  <div className={`relative aspect-square rounded-xl overflow-hidden mb-3 ${isDark ? 'bg-zinc-900' : 'bg-slate-100'}`}>
                    <img
                      src={product.images.front}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500 text-black uppercase">
                      Vault Deal
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="font-mono font-bold text-emerald-500 mt-1">{product.price}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="mt-3 w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase transition-colors"
                  >
                    Claim Deal
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PAGE 4: ABOUT ================= */}
        {currentPage === 'about' && (
          <div className="pt-28 pb-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
                The Heritage & Vision
              </span>
              <h1 className="font-gothic text-5xl sm:text-6xl tracking-wider">
                ABOUT NYÜKU
              </h1>
              <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
                isDark ? 'text-zinc-400' : 'text-slate-600'
              }`}>
                Born out of Cape Town and inspired by authentic South African street culture, vintage country club heritage, and bespoke cartoon typography.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border space-y-3 ${
                isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h3 className="font-gothic text-2xl text-amber-500">Heavyweight Craft</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                  Every silhouette is engineered with deliberate structure: 280GSM–320GSM combed cotton tees, 450GSM loopback French Terry hoodies, and weather-resistant tactical ripstop outerwear.
                </p>
              </div>

              <div className={`p-6 rounded-3xl border space-y-3 ${
                isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h3 className="font-gothic text-2xl text-amber-500">The Tennis Syndicate</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                  Our archival crests blend country club luxury with raw local energy, giving each drop its signature character across Zebediela, Limpopo, and the streets of Cape Town.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900 text-white text-center space-y-4 border border-zinc-800 shadow-lg">
              <h3 className="text-xl font-bold font-gothic text-amber-400">
                Ready to Join The Archive?
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Access private WhatsApp reservations, tier benefits, and priority drops with your personal membership pass.
              </p>
              <button
                onClick={() => setCurrentPage('profile')}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
              >
                Open Club Profile
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 5: PROFILE ================= */}
        {currentPage === 'profile' && (
          <Profile
            onAddToCart={handleAddToCart}
            onNavigateShop={() => setCurrentPage('shop')}
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
          />
        )}
      </main>

      {/* Floating Theme Switcher Button */}
      <button
        type="button"
        onClick={handleToggleTheme}
        className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl border transition-transform duration-200 hover:scale-110 active:scale-95 ${
          isDark
            ? 'bg-zinc-900 border-zinc-700 text-amber-400'
            : 'bg-white border-slate-300 text-slate-800'
        }`}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? (
          <Sun className="w-5 h-5 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      {/* Interactive Multi-Angle Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        tier="gold"
      />

      {/* Footer */}
      <footer className={`border-t py-8 px-4 text-center text-xs transition-colors ${
        isDark ? 'border-zinc-900 text-zinc-500 bg-black/60' : 'border-slate-200 text-slate-500 bg-white/60'
      }`}>
        <p className={`font-gothic text-base ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>
          NYÜKU SOUTH AFRICA
        </p>
        <p className="mt-1">© 2026 The Nyüku Club. Cape Town, Western Cape. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;