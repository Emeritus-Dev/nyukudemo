import React, { useState, useMemo } from 'react';
import {
  Tag,
  Heart,
  ShoppingBag,
  Eye,
  Sparkles,
  ShieldAlert,
  ArrowUpDown,
} from 'lucide-react';
import { PRODUCTS, type Product } from '../data/products';

interface SaleProps {
  onAddToCart: (product: Product, size?: string) => void;
  onSelectProduct?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: number[];
  darkMode?: boolean;
}

interface SaleItem extends Product {
  originalPrice: string;
  salePriceNumeric: number;
  discountPercent: number;
  remainingUnits: number;
}

const SALE_OVERRIDES: Array<{
  matchId: number;
  discountPercent: number;
  remainingUnits: number;
}> = [
  { matchId: 81, discountPercent: 30, remainingUnits: 3 },
  { matchId: 75, discountPercent: 25, remainingUnits: 4 },
  { matchId: 26, discountPercent: 31, remainingUnits: 2 },
  { matchId: 70, discountPercent: 27, remainingUnits: 3 },
  { matchId: 41, discountPercent: 25, remainingUnits: 5 },
  { matchId: 73, discountPercent: 31, remainingUnits: 2 },
  { matchId: 71, discountPercent: 27, remainingUnits: 4 },
  { matchId: 65, discountPercent: 31, remainingUnits: 3 },
];

const parsePriceZAR = (priceStr: string): number => {
  const numeric = priceStr.replace(/[^0-9.]/g, '');
  const val = parseFloat(numeric);
  return isNaN(val) ? 750 : val;
};

export const Sale: React.FC<SaleProps> = ({
  onAddToCart,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds = [],
  darkMode = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'discount-desc'>('featured');
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  const saleProducts: SaleItem[] = useMemo(() => {
    return SALE_OVERRIDES.map((cfg, idx) => {
      const baseProduct =
        PRODUCTS.find((p) => Number(p.id) === cfg.matchId) ||
        PRODUCTS[idx % PRODUCTS.length];

      const origNumeric = parsePriceZAR(baseProduct.price);
      const saleNumeric = Math.round((origNumeric * (100 - cfg.discountPercent)) / 100 / 10) * 10;

      return {
        ...baseProduct,
        originalPrice: `R${origNumeric.toLocaleString('en-ZA')}`,
        price: `R${saleNumeric.toLocaleString('en-ZA')}`,
        salePriceNumeric: saleNumeric,
        discountPercent: cfg.discountPercent,
        remainingUnits: cfg.remainingUnits,
      };
    });
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(saleProducts.map((p) => p.category)));
    return ['ALL', ...uniqueCats];
  }, [saleProducts]);

  const filteredProducts = useMemo(() => {
    const list =
      selectedCategory === 'ALL'
        ? [...saleProducts]
        : saleProducts.filter((item) => item.category === selectedCategory);

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.salePriceNumeric - b.salePriceNumeric);
    } else if (sortBy === 'discount-desc') {
      list.sort((a, b) => b.discountPercent - a.discountPercent);
    }

    return list;
  }, [saleProducts, selectedCategory, sortBy]);

  const getActiveSize = (item: SaleItem) => {
    const id = Number(item.id);
    if (selectedSizes[id]) return selectedSizes[id];
    if (item.sizes && item.sizes.length > 0) return item.sizes[0].size;
    if (item.availableSizes && item.availableSizes.length > 0) return item.availableSizes[0];
    return 'M';
  };

  return (
    <div
      className={`min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 select-none transition-colors antialiased ${
        darkMode ? 'text-white' : 'text-slate-950'
      }`}
    >
      {/* Clean Luxury Markdown Hero Banner */}
      <section
        className={`relative rounded-3xl border p-8 sm:p-12 overflow-hidden ${
          darkMode
            ? 'bg-zinc-950 border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)]'
            : 'bg-white border-slate-200 shadow-xl'
        }`}
      >
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/35 bg-amber-400/10 text-amber-500 dark:text-amber-400 font-mono text-[11px] font-black uppercase tracking-widest">
              <Tag className="w-3.5 h-3.5" />
              <span>ARCHIVE MARKDOWNS • UP TO 31% OFF</span>
            </div>

            <h1 className="font-gothic text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.02]">
              Private Vault <span className="text-amber-400">Clearance.</span>
            </h1>

            <p className="text-xs sm:text-sm font-sans font-medium text-slate-600 dark:text-zinc-300 leading-relaxed">
              Final remaining sizes from earlier Zebediela batch releases. Once an archive piece sells out, the pattern is permanently retired.
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 font-mono text-xs shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-left">
              <p className="font-black uppercase text-amber-500 dark:text-amber-400">
                VIP TIER STACKABLE
              </p>
              <p className="text-[11px] text-slate-600 dark:text-zinc-300">
                Extra 5%–15% member privilege applies at checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-black font-black shadow-md'
                    : darkMode
                    ? 'bg-zinc-900 text-zinc-300 border border-white/10 hover:border-amber-400/50'
                    : 'bg-white text-slate-800 border border-slate-300 hover:border-amber-500'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'discount-desc')}
            className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold uppercase focus:outline-none focus:border-amber-400 cursor-pointer ${
              darkMode
                ? 'bg-zinc-900 border-white/15 text-zinc-200'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            <option value="featured">Sort: Featured</option>
            <option value="discount-desc">Highest % Off</option>
            <option value="price-asc">Price: Low to High</option>
          </select>
        </div>
      </div>

      {/* Sale Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => {
          const isWishlisted = wishlistIds.includes(Number(item.id));
          const activeSize = getActiveSize(item);
          const sizes =
            item.sizes && item.sizes.length > 0
              ? item.sizes.map((s) => s.size)
              : item.availableSizes && item.availableSizes.length > 0
              ? item.availableSizes
              : ['S', 'M', 'L'];

          return (
            <div
              key={item.id}
              className={`group rounded-3xl border p-4 flex flex-col justify-between transition-all duration-300 relative ${
                darkMode
                  ? 'bg-zinc-950/90 border-white/10 hover:border-amber-400/70 shadow-xl'
                  : 'bg-white border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-xl'
              }`}
            >
              {/* Product Image Container */}
              <div
                onClick={() => onSelectProduct && onSelectProduct(item)}
                className={`relative aspect-square rounded-2xl p-4 mb-4 flex items-center justify-center overflow-hidden cursor-pointer ${
                  darkMode ? 'bg-zinc-900/90' : 'bg-slate-100'
                }`}
              >
                {/* Discount Pill Badge */}
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-amber-400 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow">
                  -{item.discountPercent}% OFF
                </span>

                {/* Wishlist Toggle */}
                {onToggleWishlist && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item);
                    }}
                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full border backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-black/50 border-white/15 text-zinc-300 hover:text-red-400'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
                  </button>
                )}

                <img
                  src={item.images.front}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />

                {/* Quick Inspect Trigger */}
                {onSelectProduct && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(item);
                    }}
                    className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-black/80 hover:bg-amber-400 text-white hover:text-black border border-white/15 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Inspect</span>
                  </button>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-2.5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                      {item.category}
                    </span>
                    <span className="text-red-500 dark:text-red-400 font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      {item.remainingUnits} left
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct && onSelectProduct(item)}
                    className="font-gothic text-sm font-black uppercase line-clamp-1 group-hover:text-amber-500 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>

                  {/* Markdown Price + Original Strike-Through */}
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400">
                      {item.price}
                    </span>
                    <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 line-through">
                      {item.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Inline Size Selector & Add to Bag */}
                <div className="space-y-2.5 pt-2 border-t border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {sizes.map((sz) => {
                      const active = activeSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() =>
                            setSelectedSizes((prev) => ({ ...prev, [Number(item.id)]: sz }))
                          }
                          className={`px-2 py-1 rounded-lg font-mono text-[10px] font-bold uppercase border transition-colors cursor-pointer ${
                            active
                              ? 'bg-amber-400 text-black border-amber-400 font-black'
                              : darkMode
                              ? 'bg-zinc-900 border-white/10 text-zinc-300 hover:border-amber-400/50'
                              : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-amber-500'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(item, activeSize)}
                    className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Sale Item • {item.price}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sale;