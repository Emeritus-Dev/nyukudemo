import React, { useState, useMemo } from 'react';
import { ChevronDown, Filter, X, Sparkles } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS, type Product } from '../data/products';

interface ShopProps {
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: number[];
  darkMode: boolean;
}

type GenderFilter = 'All' | 'Men' | 'Women' | 'Unisex';
type CategoryFilter = 'All' | 'T-Shirts' | 'Hoodies & Sweats' | 'Shorts' | 'Accessories';

export default function Shop({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  darkMode,
}: ShopProps) {
  const [selectedGender, setSelectedGender] = useState<GenderFilter>('All');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown items requested for Men & Women
  const subCategories: CategoryFilter[] = [
    'T-Shirts',
    'Hoodies & Sweats',
    'Shorts',
    'Accessories',
  ];

  const handleSelectFilter = (gender: GenderFilter, category: CategoryFilter) => {
    setSelectedGender(gender);
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSelectedGender('All');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  // Filter products by selected Gender, Category, and optional search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Gender check: if Unisex, it can show in both Men and Women
      const matchesGender =
        selectedGender === 'All'
          ? true
          : product.gender === selectedGender || product.gender === 'Unisex';

      // Category check
      const matchesCategory =
        selectedCategory === 'All' ? true : product.category === selectedCategory;

      // Search query check
      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesGender && matchesCategory && matchesSearch;
    });
  }, [selectedGender, selectedCategory, searchQuery]);

  return (
    <main
      className={`min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-[#070B16] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-[1550px] mx-auto">

        {/* ======================================================== */}
        {/* SUB-NAVIGATION BAR WITH HOVER DROPDOWNS                 */}
        {/* ======================================================== */}
        <div className="relative z-30 mb-8 border-b border-inherit/40 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* Primary Nav Links (All, Men, Women, Accessories) */}
            <nav className="flex items-center space-x-2 sm:space-x-4">

              {/* 1. ALL TAB */}
              <button
                type="button"
                onClick={() => handleSelectFilter('All', 'All')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedGender === 'All' && selectedCategory === 'All'
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : darkMode
                    ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                    : 'bg-slate-200/80 text-slate-700 hover:text-black hover:bg-slate-300'
                }`}
              >
                All Products
              </button>

              {/* 2. MEN (WITH HOVER DROPDOWN) */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => handleSelectFilter('Men', 'All')}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                    selectedGender === 'Men'
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : darkMode
                      ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                      : 'bg-slate-200/80 text-slate-700 hover:text-black hover:bg-slate-300'
                  }`}
                >
                  <span>Men</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 w-56 hidden group-hover:block transition-all">
                  <div
                    className={`rounded-2xl p-2 shadow-2xl border backdrop-blur-xl ${
                      darkMode
                        ? 'bg-[#0F172A]/95 border-white/10 shadow-black/80'
                        : 'bg-white/95 border-slate-200 shadow-slate-300'
                    }`}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-500 border-b border-inherit/20 mb-1">
                      Men's Collection
                    </div>
                    {subCategories.map((cat) => {
                      const isCatActive = selectedGender === 'Men' && selectedCategory === cat;
                      return (
                        <button
                          key={`men-${cat}`}
                          type="button"
                          onClick={() => handleSelectFilter('Men', cat)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isCatActive
                              ? 'bg-amber-500 text-black font-black'
                              : darkMode
                              ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-black'
                          }`}
                        >
                          <span>{cat}</span>
                          {isCatActive && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. WOMEN (WITH HOVER DROPDOWN) */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => handleSelectFilter('Women', 'All')}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                    selectedGender === 'Women'
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : darkMode
                      ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                      : 'bg-slate-200/80 text-slate-700 hover:text-black hover:bg-slate-300'
                  }`}
                >
                  <span>Women</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 w-56 hidden group-hover:block transition-all">
                  <div
                    className={`rounded-2xl p-2 shadow-2xl border backdrop-blur-xl ${
                      darkMode
                        ? 'bg-[#0F172A]/95 border-white/10 shadow-black/80'
                        : 'bg-white/95 border-slate-200 shadow-slate-300'
                    }`}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-500 border-b border-inherit/20 mb-1">
                      Women's Collection
                    </div>
                    {subCategories.map((cat) => {
                      const isCatActive = selectedGender === 'Women' && selectedCategory === cat;
                      return (
                        <button
                          key={`women-${cat}`}
                          type="button"
                          onClick={() => handleSelectFilter('Women', cat)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isCatActive
                              ? 'bg-amber-500 text-black font-black'
                              : darkMode
                              ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-black'
                          }`}
                        >
                          <span>{cat}</span>
                          {isCatActive && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. ACCESSORIES TAB */}
              <button
                type="button"
                onClick={() => handleSelectFilter('All', 'Accessories')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === 'Accessories'
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : darkMode
                    ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                    : 'bg-slate-200/80 text-slate-700 hover:text-black hover:bg-slate-300'
                }`}
              >
                Accessories
              </button>
            </nav>

            {/* Quick Search Input */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className={`w-full px-4 py-2 rounded-full text-xs font-medium outline-none border transition-all ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-amber-500/60'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                }`}
              />
            </div>
          </div>

          {/* Active Filter Pills Display */}
          {(selectedGender !== 'All' || selectedCategory !== 'All' || searchQuery !== '') && (
            <div className="flex items-center flex-wrap gap-2 mt-4 pt-3 border-t border-inherit/15">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mr-2 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Active Filter:
              </span>

              {selectedGender !== 'All' && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  <span>Gender: {selectedGender}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedGender('All')}
                    className="hover:text-white cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  <span>Category: {selectedCategory}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('All')}
                    className="hover:text-white cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery !== '' && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  <span>Query: "{searchQuery}"</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="hover:text-white cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="text-[11px] font-black uppercase tracking-wider text-slate-400 hover:text-amber-500 underline ml-2 cursor-pointer"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* PRODUCT GRID SECTION                                    */}
        {/* ======================================================== */}
        {filteredProducts.length > 0 ? (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
            darkMode={darkMode}
          />
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
              className="mt-6 px-6 py-2.5 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}