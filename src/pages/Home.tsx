import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Award, Eye, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface HomeProps {
  darkMode: boolean;
}

export default function Home({ darkMode }: HomeProps) {
  const discoveryTiles = [
    { title: "NEW IN", image: "/nyuku-tee-front.png", cat: "T-Shirts" },
    { title: "HOODIES", image: "/nyuku-item-2.png", cat: "Hoodies & Sweats" },
    { title: "OUTERWEAR", image: "/nyuku-item-3.png", cat: "Hoodies & Sweats" },
    { title: "ACCESSORIES", image: "/nyuku-tee-side.png", cat: "Accessories" }
  ];

  return (
    <div className="pt-32 pb-24 overflow-hidden">

      {/* Streetwear Marquee Banner */}
      <div className="w-full bg-[#C5A059] text-black py-3 overflow-hidden whitespace-nowrap mb-16 shadow-md font-mono text-xs font-black tracking-widest uppercase flex items-center">
        <div className="flex space-x-12 items-center animate-pulse">
          <span>⚡ LIMITED DROP EVENT 2026</span>
          <span>•</span>
          <span>HEAVYWEIGHT 280GSM COTTON</span>
          <span>•</span>
          <span>BESPOKE COMBDENIM & CARTOON GRAPHICS</span>
          <span>•</span>
          <span>EXCLUSIVE STREETWEAR CULTURE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Hero Dictionary Definition Section */}
        <section className="text-center max-w-4xl mx-auto flex flex-col items-center mb-24">
          <div className={`inline-flex items-center space-x-2 border px-4 py-1.5 rounded-full text-xs font-medium mb-8 backdrop-blur-sm ${
            darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-200/60 border-slate-300 text-slate-700'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
            <span>New Collection Drop 2026</span>
          </div>

          {/* Dictionary Card */}
          <div className={`w-full p-8 sm:p-14 rounded-3xl border backdrop-blur-md max-w-3xl mx-auto mb-10 shadow-2xl transition-all relative overflow-hidden ${
            darkMode ? 'bg-[#111827]/80 border-white/10 shadow-black/60' : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col items-center justify-center mb-6">
              <img
                src="/nyuku-heading.png"
                alt="/nyuku/"
                className="h-24 sm:h-32 w-auto object-contain drop-shadow-2xl hover:scale-105 transition duration-300"
              />
              <span className={`text-xs mt-4 px-4 py-1 rounded-full uppercase font-mono tracking-widest font-bold ${
                darkMode ? 'bg-white/10 text-[#C5A059]' : 'bg-slate-100 text-amber-700'
              }`}>
                noun
              </span>
            </div>

            <p className={`text-xl sm:text-2xl font-light italic leading-relaxed text-center ${
              darkMode ? 'text-slate-200' : 'text-slate-800'
            }`}>
              "a current medium of exchange in the form of coins and banknotes; coins and banknotes collectively."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link to="/shop" className={`w-full sm:w-auto group inline-flex items-center justify-center space-x-3 font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-xl ${
              darkMode ? 'bg-white text-black hover:bg-[#C5A059]' : 'bg-[#0B132B] text-white hover:bg-[#C5A059] hover:text-black'
            }`}>
              <span>Explore Drop</span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
                darkMode ? 'bg-black text-white group-hover:text-[#C5A059]' : 'bg-white text-black group-hover:bg-black group-hover:text-[#C5A059]'
              }`}>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/about" className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold border transition ${
              darkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100'
            }`}>
              Our Heritage
            </Link>
          </div>
        </section>

        {/* Featured Drop Products */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2 text-[#C5A059] font-mono text-sm uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Featured Pieces</span>
            </div>
            <Link to="/shop" className="text-xs font-semibold text-[#C5A059] hover:underline">
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C5A059] shadow-xl block ${
                  darkMode ? 'bg-[#111827] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className="relative h-80 overflow-hidden bg-slate-900">
                  <img
                    src={product.images.front}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full text-[#C5A059] border border-white/10">
                    {product.category}
                  </span>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black font-semibold text-xs px-5 py-2.5 rounded-full flex items-center space-x-1.5 shadow-lg">
                      <Eye className="w-4 h-4" />
                      <span>Inspect Piece</span>
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`font-bold text-lg mb-1 group-hover:text-[#C5A059] transition line-clamp-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-1">{product.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-base font-extrabold text-[#C5A059]">{product.price}</span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059]">
                      In Stock
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Discovery Grid */}
        <section className="mb-24">
          <div className="flex items-center space-x-2 text-[#C5A059] font-mono text-sm uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Category Explorer</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {discoveryTiles.map((tile, idx) => (
              <Link
                to="/shop"
                key={idx}
                className={`group relative h-64 rounded-2xl overflow-hidden border transition duration-500 hover:scale-[1.02] shadow-md block ${
                  darkMode ? 'border-white/10 bg-[#111827]' : 'border-slate-200 bg-white'
                }`}
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-3 right-3 bg-white text-black py-2.5 px-3 rounded-xl text-center shadow-lg group-hover:bg-[#C5A059] transition">
                  <span className="text-xs font-extrabold tracking-wider uppercase">{tile.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Brand Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-[#111827] border-white/10' : 'bg-white border-slate-200'} shadow-xl`}>
            <Sparkles className="w-8 h-8 text-[#C5A059] mb-4" />
            <h3 className="text-xl font-bold mb-2">Heavyweight Fabrics</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Engineered with 280GSM+ combed cotton for maximum structure, comfort, and drape.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-[#111827] border-white/10' : 'bg-white border-slate-200'} shadow-xl`}>
            <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-4" />
            <h3 className="text-xl font-bold mb-2">Custom Typography</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Signature multi-colored cartoon character lettering designed exclusively for Nyuku.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-[#111827] border-white/10' : 'bg-white border-slate-200'} shadow-xl`}>
            <Award className="w-8 h-8 text-[#C5A059] mb-4" />
            <h3 className="text-xl font-bold mb-2">Limited Batch Drops</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Strictly limited quantities produced per season to maintain absolute exclusivity.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}