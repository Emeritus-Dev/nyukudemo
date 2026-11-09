import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Gem, RefreshCw, Heart } from 'lucide-react';

interface AboutProps {
  darkMode?: boolean;
}

export default function About({ darkMode = true }: AboutProps) {
  return (
    <div
      className={`min-h-screen pt-28 pb-24 px-6 lg:px-16 transition-colors font-sans ${
        darkMode ? 'bg-[#070B16] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-inherit/30 p-8 sm:p-14 lg:p-16 flex flex-col items-center text-center space-y-6 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Nyüku Manifest • Est. 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase max-w-4xl leading-tight">
            Playful Energy.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
              Uncompromising Weight.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-medium leading-relaxed">
            Born out of Cape Town’s creative pulse, <strong className="text-white">Nyüku</strong> reimagines everyday South African streetwear through heavy-gauge archival textiles, high-density 3D puffy embroidery, and bold character art.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-4 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center space-x-2 shadow-xl shadow-amber-500/20 active:scale-95"
            >
              <span>Explore The Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-amber-500">
              Origin & Ethos
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Streetwear Crafted Like Modern Armor.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              We started Nyüku because generic lightweight blanks never held their ground. Our pieces are tailored with boxy drops, structured neckbands that never roll, and plush 450GSM French Terry cotton woven to endure high-rotation everyday wear.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Every drop is anchored by tactile craftsmanship: 3D puffy bubble typography, vintage mineral acid-washes, and the iconic orange character mascot reminding you that <span className="text-amber-500 font-bold">"Today Is Going To Be A Nyüku Day."</span>
            </p>
          </div>

          <div className="rounded-3xl border border-inherit/30 p-8 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden flex flex-col justify-center space-y-4">
            <div className="text-xs font-black uppercase tracking-widest text-amber-500">
              Definition / Pronunciation
            </div>
            <div className="font-mono text-3xl font-black text-white">
              NYUKU <span className="text-lg text-slate-400 font-normal">/nyü·kü/</span>
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-400">
              [noun]
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed border-t border-inherit/30 pt-4">
              "A current medium of exchange in the form of coins and banknotes; coins and banknotes collectively. Culture, currency, and vibrant expression."
            </p>
          </div>
        </div>

        {/* Brand Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <Gem className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-base font-black uppercase tracking-wider mb-2">450GSM French Terry</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Heavyweight, pre-shrunk loopback fleece engineered for long-lasting insulation and structural drop without bagginess.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <ShieldCheck className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-base font-black uppercase tracking-wider mb-2">3D Raised Embroidery</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Dense multi-color satin threading with high-relief foam underlays for tactile graphics that survive hundreds of washes.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <RefreshCw className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-base font-black uppercase tracking-wider mb-2">Locally Anchored</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Packaged and fulfilled nationwide across South Africa with Courier Guy, Pudo smart lockers, and Cape Town campus handovers.
            </p>
          </div>
        </div>

        {/* Community Note */}
        <div className="p-8 sm:p-12 rounded-3xl border border-inherit/30 bg-amber-500/5 text-center space-y-4">
          <Heart className="w-8 h-8 text-rose-500 mx-auto fill-current" />
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">The Nyüku Club</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Streetwear is about belonging. Whether you're pulling up to a weekend session, studying on campus, or traveling the country—you’re carrying the energy everywhere.
          </p>
        </div>
      </div>
    </div>
  );
}