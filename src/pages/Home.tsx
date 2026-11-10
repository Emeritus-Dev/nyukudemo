import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Eye,
  Flame,
  Compass,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface HomeProps {
  darkMode: boolean;
}

export default function Home({ darkMode }: HomeProps) {
  const discoveryTiles = [
    { title: "NEW IN", image: "/nyuku-tee-front.png", cat: "T-Shirts" },
    { title: "HOODIES", image: "/nyuku-hoodie-white-front.png", cat: "Hoodies & Sweats" },
    { title: "OUTERWEAR", image: "/nyuku-varsity-green-front.png", cat: "Outerwear" },
    { title: "ACCESSORIES", image: "/nyuku-cap-denim-cyan-front.png", cat: "Accessories" }
  ];

  const storyMoments = [
    {
      id: "syndicate-roots",
      chapter: "Chapter 01 // Streetwear Genesis",
      title: "Forged in the Culture",
      desc: "From late-night sketches to concrete runways. Tailored for those who walk with bold intention.",
      image: "/nyuku-varsity-green-front.png",
      productId: 58,
      productName: "Everywhere Varsity Jacket",
      price: "R3,850",
      badge: "MEMBERS ONLY"
    },
    {
      id: "summer-escapism",
      chapter: "Chapter 02 // Sun-Drenched Escapism",
      title: "Off-Grid Leisure Club",
      desc: "Neutral knit buckets, wide-wale corduroy textures, and botanical cutouts engineered for coastal heat.",
      image: "/nyuku-bucket-cream.png",
      productId: 26,
      productName: "Cream Corduroy Bucket Hat",
      price: "R320"
    },
    {
      id: "modern-subversion",
      chapter: "Chapter 03 // Modern Subversion",
      title: "The Safety Pin & The Vault",
      desc: "Heavyweight 300GSM combed cotton drape paired with raw typography and sealed archive numbering.",
      image: "/nyuku-tee-bottlecaps-white-front.png",
      productId: 62,
      productName: "Soda Bottlecaps Heavy Tee",
      price: "R850"
    }
  ];

  const customerReviews = [
    {
      name: "Kabelo M.",
      city: "Johannesburg",
      review: "The 280GSM combed cotton on the oversized tee has the most structured drape I've found locally. Top-tier craftsmanship.",
      rating: 5,
      piece: "Signature Cartoon Tee"
    },
    {
      name: "Zanele D.",
      city: "Cape Town",
      review: "The Everywhere Varsity Jacket is pure luxury. Heavy Melton wool, genuine leather sleeves, and the embroidery is flawless.",
      rating: 5,
      piece: "Everywhere Varsity Jacket"
    },
    {
      name: "Tshepo S.",
      city: "Pretoria",
      review: "Delivery was swift and the packaging feels like an archival art vault piece. Already waiting for the next drop.",
      rating: 5,
      piece: "Definition Sky Hoodie"
    }
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
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

        {/* Customer Reviews Section */}
        <section className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center space-x-2 text-[#C5A059] font-mono text-xs uppercase tracking-widest mb-2">
                <Star className="w-4 h-4 fill-[#C5A059]" />
                <span>Verified Syndicate Collectors</span>
              </div>
              <h2 className={`text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                What The Streets Say.
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2 md:mt-0">
              4.9 / 5.0 Average Community Rating
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((rev, index) => (
              <div
                key={index}
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  darkMode ? 'bg-[#111827] border-white/10 hover:border-[#C5A059]/40' : 'bg-white border-slate-200 hover:border-[#C5A059]'
                } shadow-lg`}
              >
                <div className="flex items-center space-x-1 text-[#C5A059] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                  ))}
                </div>
                <p className={`text-sm italic leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{rev.review}"
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold">{rev.name}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">{rev.city}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059]">
                    {rev.piece}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Storyline / Lookbook Section (Directly after Reviews) */}
        <section className="mb-24 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-xs font-mono uppercase tracking-widest mb-4">
                <Compass className="w-3.5 h-3.5" />
                <span>Editorial Lookbook & Storyline</span>
              </div>
              <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                The Syndicate Movement.
              </h2>
            </div>
            <p className="text-slate-400 text-xs md:text-sm max-w-md font-mono">
              Every drop is a recorded entry in our ongoing narrative. Street-tested silhouettes, high-density cotton, and sealed archives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storyMoments.map((moment) => (
              <div
                key={moment.id}
                className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-2xl ${
                  darkMode ? 'bg-[#111827] border-white/10 hover:border-[#C5A059]' : 'bg-white border-slate-200 hover:border-[#C5A059]'
                }`}
              >
                {/* Lookbook Visual */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 flex items-center justify-center p-6">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {moment.badge && (
                    <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[10px] font-mono tracking-widest text-white uppercase flex items-center space-x-1.5">
                      <Flame className="w-3 h-3 text-[#C5A059]" />
                      <span>{moment.badge}</span>
                    </div>
                  )}

                  <Link
                    to={`/product/${moment.productId}`}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-black hover:bg-[#C5A059] flex items-center justify-center shadow-2xl transition duration-300 hover:scale-110 active:scale-95"
                    title="Inspect Piece"
                  >
                    <ShoppingBag className="w-5 h-5 stroke-[2]" />
                  </Link>
                </div>

                {/* Narrative Text */}
                <div className={`p-6 border-t ${darkMode ? 'border-white/10 bg-[#0B132B]/60' : 'border-slate-100 bg-slate-50'} space-y-2`}>
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                    {moment.chapter}
                  </span>
                  <h3 className={`text-xl font-bold group-hover:text-[#C5A059] transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {moment.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {moment.desc}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">{moment.productName}</span>
                    <span className="text-[#C5A059] font-bold">{moment.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}