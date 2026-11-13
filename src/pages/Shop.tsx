import React, { useState, useMemo, useRef } from 'react';
import {
  ChevronDown,
  Filter,
  X,
  Sparkles,
  Search,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS, type Product } from '../data/products';

interface ShopProps {
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: number[];
  darkMode: boolean;
}

type GenderFilter = 'All' | 'Men' | 'Women' | 'Unisex';
type CategoryFilter = 'All' | 'T-Shirts' | 'Hoodies & Sweats' | 'Shorts' | 'Accessories' | 'Outerwear' | 'Bottoms' | 'Headwear' | 'Drinkware' | 'Club & Leisure';

type SortOption =
  | 'featured'
  | 'relevant'
  | 'best-selling'
  | 'az'
  | 'za'
  | 'price-low'
  | 'price-high'
  | 'date-old'
  | 'date-new';

const SORT_LABELS: Record<SortOption, string> = {
  'featured': 'Featured',
  'relevant': 'Most relevant',
  'best-selling': 'Best selling',
  'az': 'Alphabetically, A-Z',
  'za': 'Alphabetically, Z-A',
  'price-low': 'Price, low to high',
  'price-high': 'Price, high to low',
  'date-old': 'Date, old to new',
  'date-new': 'Date, new to old',
};

const ITEMS_PER_PAGE = 12;

export default function Shop({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  darkMode,
}: ShopProps) {
  const [selectedGender, setSelectedGender] = useState<GenderFilter>('All');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'Men' | 'Women' | null>(null);

  const topAnchorRef = useRef<HTMLDivElement | null>(null);

  const handleSelectFilter = (gender: GenderFilter, category: CategoryFilter) => {
    setSelectedGender(gender);
    setSelectedCategory(category);
    setActiveMegaMenu(null);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedGender('All');
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (topAnchorRef.current) {
      topAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const parseNumericPrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => {
      const matchesGender =
        selectedGender === 'All'
          ? true
          : product.gender === selectedGender || product.gender === 'Unisex';

      const matchesCategory =
        selectedCategory === 'All' ? true : product.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === ''
          ? true
          : product.title.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            (product.material && product.material.toLowerCase().includes(q));

      return matchesGender && matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'az':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case 'za':
        return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
      case 'price-low':
        return [...filtered].sort((a, b) => parseNumericPrice(a.price) - parseNumericPrice(b.price));
      case 'price-high':
        return [...filtered].sort((a, b) => parseNumericPrice(b.price) - parseNumericPrice(a.price));
      case 'date-old':
        return [...filtered].sort((a, b) => a.id - b.id);
      case 'date-new':
        return [...filtered].sort((a, b) => b.id - a.id);
      case 'best-selling':
      case 'featured':
      case 'relevant':
      default:
        return filtered;
    }
  }, [selectedGender, selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  return (
    <main
      className={`min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 select-none ${
        darkMode ? 'bg-[#070B16] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div ref={topAnchorRef} className="max-w-[1550px] mx-auto">
        <div className="relative z-40 mb-8 border-b border-inherit/30 pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <nav className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <button
                type="button"
                onClick={() => handleSelectFilter('All', 'All')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  selectedGender === 'All' && selectedCategory === 'All'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                    : darkMode
                    ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                    : 'bg-slate-200/80 text-slate-700 hover:text-black hover:bg-slate-300'
                }`}
              >
                All Products
              </button>

              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('Men')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  type="button"
                  onClick={() => handleSelectFilter('Men', 'All')}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                    selectedGender === 'Men'
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                      : darkMode
                      ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                      : 'bg-slate-200/80 text-slate-700 hover:text-black hover:bg-slate-300'
                  }`}
                >
                  <span>Men</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'Men' ? 'rotate-180' : ''}`} />
                </button>

                {activeMegaMenu === 'Men' && (
                  <div className="absolute left-0 top-full pt-3 w-[860px] max-w-[92vw] z-50 animate-fadeIn">
                    <div
                      className={`rounded-3xl p-7 shadow-2xl border backdrop-blur-2xl grid grid-cols-12 gap-8 ${
                        darkMode
                          ? 'bg-[#0B1120]/95 border-white/10 shadow-black/90 text-white'
                          : 'bg-white/95 border-slate-200 shadow-slate-300 text-slate-900'
                      }`}
                    >
                      <div className="col-span-3 space-y-3 border-r border-inherit/20 pr-4">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-amber-400 block">
                          SHOP BY APPAREL
                        </span>
                        <div className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'All')}
                            className="block w-full text-left text-xs font-bold py-1 text-amber-400 hover:underline cursor-pointer"
                          >
                            View All Men
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'T-Shirts')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Heavyweight Tees (280-320GSM)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Hoodies & Sweats')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            French Terry Hoodies & Sweats
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Outerwear')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Melton Wool & Leather Varsity
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Bottoms')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Balloon & Tapered Sweatpants
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Shorts')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Loopback Athletic Shorts
                          </button>
                        </div>
                      </div>

                      <div className="col-span-3 space-y-3 border-r border-inherit/20 pr-4">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-amber-400 block">
                          ACCESSORIES & VAULT
                        </span>
                        <div className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Headwear')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            5-Panel Campers & Dad Caps
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Drinkware')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Stadium Frosted Tumblers
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Club & Leisure')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Handcrafted 5L Slim Fieldbar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Accessories')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Plush 650GSM Bath Towels
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'Accessories')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            14oz Organic Mascot Totes
                          </button>
                        </div>
                      </div>

                      <div className="col-span-6 flex flex-col justify-between">
                        <div
                          onClick={() => handleSelectFilter('Men', 'Outerwear')}
                          className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-5 flex items-center justify-between group/banner cursor-pointer"
                        >
                          <div className="space-y-1 relative z-10">
                            <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-amber-400 text-black inline-block">
                              LIMITED GRAIL
                            </span>
                            <h4 className="font-gothic text-base font-black uppercase tracking-tight text-white group-hover/banner:text-amber-400 transition-colors">
                              Everywhere Varsity Series
                            </h4>
                            <p className="text-[11px] font-mono text-zinc-400">
                              Melton Wool & Cowhide Leather • Batch 04
                            </p>
                          </div>
                          <img
                            src="/nyuku-varsity-green-tumbler.png"
                            alt="Everywhere Varsity Jacket"
                            className="w-24 h-24 object-contain filter drop-shadow-md group-hover/banner:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-inherit/20 text-xs font-mono">
                          <span className="text-zinc-400">AUTHENTIC ZEBEDIELA COTTONS</span>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Men', 'All')}
                            className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Explore Drop</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('Women')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  type="button"
                  onClick={() => handleSelectFilter('Women', 'All')}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                    selectedGender === 'Women'
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                      : darkMode
                      ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                      : 'bg-slate-200/80 text-slate-700 hover:text-black hover:bg-slate-300'
                  }`}
                >
                  <span>Women</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'Women' ? 'rotate-180' : ''}`} />
                </button>

                {activeMegaMenu === 'Women' && (
                  <div className="absolute left-0 top-full pt-3 w-[860px] max-w-[92vw] z-50 animate-fadeIn">
                    <div
                      className={`rounded-3xl p-7 shadow-2xl border backdrop-blur-2xl grid grid-cols-12 gap-8 ${
                        darkMode
                          ? 'bg-[#0B1120]/95 border-white/10 shadow-black/90 text-white'
                          : 'bg-white/95 border-slate-200 shadow-slate-300 text-slate-900'
                      }`}
                    >
                      <div className="col-span-3 space-y-3 border-r border-inherit/20 pr-4">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-pink-400 block">
                          WOMEN'S SILHOUETTES
                        </span>
                        <div className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'All')}
                            className="block w-full text-left text-xs font-bold py-1 text-pink-400 hover:underline cursor-pointer"
                          >
                            View All Women
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'T-Shirts')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Heritage Soccer Crop Tops
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'T-Shirts')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Blush Pink Striped Rugby Polos
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'T-Shirts')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Core Mascot Oversized Tees
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'Hoodies & Sweats')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Vanilla & Sky Definition Hoodies
                          </button>
                        </div>
                      </div>

                      <div className="col-span-3 space-y-3 border-r border-inherit/20 pr-4">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-pink-400 block">
                          LEISURE & RESORT
                        </span>
                        <div className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'Headwear')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Chunky Corduroy Bucket Hats
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'Accessories')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Blush Pink Turkish Bath Towels
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'Drinkware')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Blush Pink Insulated Tumblers
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'Accessories')}
                            className="block w-full text-left text-xs font-medium py-1 text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all cursor-pointer"
                          >
                            Vintage Chalk White Canvas Totes
                          </button>
                        </div>
                      </div>

                      <div className="col-span-6 flex flex-col justify-between">
                        <div
                          onClick={() => handleSelectFilter('Women', 'T-Shirts')}
                          className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-5 flex items-center justify-between group/banner cursor-pointer"
                        >
                          <div className="space-y-1 relative z-10">
                            <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-pink-500 text-black inline-block">
                              NEW EDITION
                            </span>
                            <h4 className="font-gothic text-base font-black uppercase tracking-tight text-white group-hover/banner:text-pink-400 transition-colors">
                              Heritage Soccer Crop
                            </h4>
                            <p className="text-[11px] font-mono text-zinc-400">
                              Honeycomb Jacquard Knit • Sethosa Shield
                            </p>
                          </div>
                          <img
                            src="/nyuku-croptop-pink-front.png"
                            alt="Heritage Soccer Crop Top"
                            className="w-24 h-24 object-contain filter drop-shadow-md group-hover/banner:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-inherit/20 text-xs font-mono">
                          <span className="text-zinc-400">SUMMER RESORT EDITIONS</span>
                          <button
                            type="button"
                            onClick={() => handleSelectFilter('Women', 'All')}
                            className="text-pink-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Explore Capsule</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleSelectFilter('All', 'Accessories')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  selectedCategory === 'Accessories'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                    : darkMode
                    ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                    : 'bg-slate-200/80 text-slate-700 hover:text-black hover:bg-slate-300'
                }`}
              >
                Accessories
              </button>
            </nav>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64 lg:w-60">
                <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search collection..."
                  className={`w-full pl-9 pr-8 py-2 rounded-full text-xs font-medium outline-none border transition-all ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-amber-400/60'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-400'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:border-amber-400/50 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-amber-400 hover:text-black shadow-sm'
                  }`}
                >
                  <span>{SORT_LABELS[sortBy]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSortOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>

                {isSortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsSortOpen(false)}
                    />
                    <div
                      className={`absolute right-0 mt-2 w-52 py-2 rounded-2xl shadow-2xl border backdrop-blur-xl z-50 text-left font-sans text-xs animate-fadeIn ${
                        darkMode
                          ? 'bg-[#0B1120]/95 border-white/10 shadow-black/80'
                          : 'bg-white/95 border-slate-200 shadow-slate-300'
                      }`}
                    >
                      {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => {
                        const isActive = sortBy === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              setSortBy(key);
                              setIsSortOpen(false);
                              setCurrentPage(1);
                            }}
                            className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between cursor-pointer ${
                              isActive
                                ? 'bg-amber-400 text-black font-black'
                                : darkMode
                                ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-black'
                            }`}
                          >
                            <span>{SORT_LABELS[key]}</span>
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {(selectedGender !== 'All' || selectedCategory !== 'All' || searchQuery !== '') && (
            <div className="flex items-center flex-wrap gap-2 mt-4 pt-3 border-t border-inherit/15">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mr-2 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Active Filter:
              </span>

              {selectedGender !== 'All' && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  <span>Gender: {selectedGender}</span>
                  <button
                    type="button"
                    onClick={() => handleSelectFilter('All', selectedCategory)}
                    className="hover:text-white cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  <span>Category: {selectedCategory}</span>
                  <button
                    type="button"
                    onClick={() => handleSelectFilter(selectedGender, 'All')}
                    className="hover:text-white cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery !== '' && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  <span>Query: "{searchQuery}"</span>
                  <button
                    type="button"
                    onClick={() => handleSearchChange('')}
                    className="hover:text-white cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="text-[11px] font-black uppercase tracking-wider text-slate-400 hover:text-amber-400 underline ml-2 cursor-pointer"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {paginatedProducts.length > 0 ? (
          <>
            <ProductGrid
              products={paginatedProducts}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              wishlistIds={wishlistIds}
              darkMode={darkMode}
            />

            {totalPages > 1 && (
              <div className="pt-16 pb-8 flex items-center justify-center">
                <div className="flex items-center gap-8 relative border-b border-inherit/20 pb-2">
                  <div className="flex items-center gap-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className="relative pb-2 font-mono text-sm tracking-wider focus:outline-none transition-colors cursor-pointer"
                        >
                          <span
                            className={
                              isActive
                                ? 'font-black text-slate-900 dark:text-white'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                            }
                          >
                            {pageNum}
                          </span>
                          {isActive && (
                            <span className="absolute -bottom-[9px] left-0 right-0 h-[2.5px] bg-black dark:bg-amber-400 rounded-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`pb-2 text-sm font-mono transition-colors cursor-pointer ${
                      currentPage === totalPages
                        ? 'opacity-20 cursor-not-allowed'
                        : 'text-slate-400 hover:text-amber-400'
                    }`}
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-4 h-4 inline" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-24 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold">No pieces found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn't find any products matching your selected combination. Try clearing your filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 px-6 py-2.5 rounded-full bg-amber-400 text-black font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}