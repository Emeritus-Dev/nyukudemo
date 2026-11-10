import React from 'react';
import { ArrowUpRight, Globe, Sparkles } from 'lucide-react';

interface EditorialManifestoProps {
  onExplore?: () => void;
  onOpenProduct?: (productId: number) => void;
}

export function EditorialManifesto({ onExplore, onOpenProduct }: EditorialManifestoProps) {
  return (
    <section className="relative w-full bg-black text-white overflow-hidden border-t border-white/10 select-none">

      {/* 1. TOP EDITORIAL HERO (Amber/Crimson Spotlight + Model Overlap) */}
      <div className="relative min-h-[90vh] flex flex-col justify-between p-6 sm:p-12 lg:p-16">

        {/* Radial Ambient Backlight */}
        <div className="absolute top-10 right-1/4 w-[42rem] h-[42rem] bg-gradient-to-br from-amber-600/25 via-red-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

        {/* Top Micro-Header Details */}
        <div className="relative z-30 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md inline-block">
              Cape Town Syndicate • 2026
            </span>
            <p className="text-xs font-mono text-zinc-400 leading-relaxed max-w-xs">
              FROM SOWETO AND LIMPOPO TO THE ATLANTIC COAST. WE CRAFT HEAVYWEIGHT APPAREL ENGINEERED FOR CULTURE COLLECTORS.
            </p>
            <button
              onClick={onExplore}
              className="group inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-amber-400 hover:text-white transition-colors"
            >
              <span>View Archival Details</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="md:col-span-8 flex md:justify-end">
            <h2 className="font-gothic text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-right leading-[0.95] max-w-xl">
              Advanced Concepts <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                In Streetwear.
              </span>
            </h2>
          </div>
        </div>

        {/* Center Giant Typographic Layer + Overlay Cutout Model */}
        <div className="relative w-full my-auto flex items-center justify-center">

          {/* Giant Background Monolithic Letters */}
          <div className="w-full text-center overflow-hidden pointer-events-none select-none">
            <span className="font-gothic font-black text-[22vw] leading-none tracking-tighter text-white/[0.08] block uppercase">
              NYÜKU
            </span>
          </div>

          {/* Model Asset layered directly over the text */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <img
              src="/nyuku-varsity-green-tumbler.png"
              alt="Nyüku Streetwear Archive"
              className="max-h-[500px] sm:max-h-[620px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Floating Pill Nav underneath the oversized letters */}
          <div className="absolute -bottom-6 z-30 flex items-center gap-6 px-6 py-2.5 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl font-mono text-xs text-zinc-300">
            <span className="text-amber-400 font-bold">BATCH 04</span>
            <span className="text-zinc-600">•</span>
            <span>450GSM FLEECE</span>
            <span className="text-zinc-600">•</span>
            <span>LIMITED 50 PIECES</span>
          </div>
        </div>

        {/* Bottom Slogan Row */}
        <div className="relative z-30 pt-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-6 space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-500 font-bold block">
              ▪ Statement Release
            </span>
            <h3 className="font-gothic text-2xl sm:text-4xl font-extrabold uppercase leading-tight">
              It's Creative Energy <br /> You Can Wear.
            </h3>
          </div>
          <div className="md:col-span-6 flex md:justify-end">
            <p className="font-mono text-xs text-zinc-400 max-w-sm text-left md:text-right">
              Every drop is numbered and sealed. Heavy combed structures with bespoke cartoon lettering rooted in real South African everyday hustle.
            </p>
          </div>
        </div>
      </div>

      {/* 2. INSET CATEGORY LOOKBOOK STRIP (Similar to the 5-card row in the screenshot) */}
      <div className="border-t border-b border-white/10 py-16 px-6 sm:px-12 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Chapter Inventory
              </span>
              <h4 className="font-gothic text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                Syndicate Uniform Cutouts
              </h4>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              AVAILABLE IN ALL SIZES [XS — XXL]
            </span>
          </div>

          {/* 5-Column Inset Card Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { id: 71, label: 'Heavyweight Tee', price: 'R850', img: '/nyuku-tee-bottlecaps-moss.png' },
              { id: 70, label: 'Sky Hoodie', price: 'R1,450', img: '/nyuku-hoodie-dictionary-sky.png' },
              { id: 72, label: 'Noir Sweats', price: 'R1,200', img: '/nyuku-sweatpants-bubble-noir.png' },
              { id: 26, label: 'Cord Bucket', price: 'R320', img: '/nyuku-bucket-cream.png' },
              { id: 73, label: 'Heritage Cap', price: 'R480', img: '/nyuku-cap-tennis-heritage-charcoal.png' },
            ].map((piece) => (
              <div
                key={piece.id}
                onClick={() => onOpenProduct && onOpenProduct(piece.id)}
                className="group relative rounded-2xl p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full flex items-center justify-center p-2 mb-3 rounded-xl bg-black/40 border border-white/5 overflow-hidden">
                  <img
                    src={piece.img}
                    alt={piece.label}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <h5 className="font-gothic text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {piece.label}
                  </h5>
                  <p className="font-mono text-xs font-bold text-amber-400">
                    {piece.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 3. BOTTOM BRUTALIST MANIFESTO FOOTER BLOCK */}
      <div className="p-8 sm:p-16 lg:p-20 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto space-y-12">

          <h2 className="font-gothic text-3xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight max-w-4xl leading-[1.02]">
            Every piece we create reflects the grind behind it.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10 text-xs font-mono text-zinc-400">
            <div className="md:col-span-4 space-y-2">
              <span className="text-white font-bold uppercase tracking-wider block">Archive Provenance</span>
              <p className="leading-relaxed">
                South African Streetwear Syndicate. Manufactured using sustainably combed African cotton and heavy metal trim.
              </p>
            </div>
            <div className="md:col-span-4 space-y-2">
              <span className="text-white font-bold uppercase tracking-wider block">Private Club Access</span>
              <p className="leading-relaxed">
                Reservations made via WhatsApp priority link. Tier 01 Gold and Platinum members receive first allocation.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end items-end">
              <span className="text-amber-400 font-bold uppercase tracking-widest text-sm">
                [BASED IN — CPT, ZA]
              </span>
            </div>
          </div>

          {/* Huge Monolithic Bottom Brand Typography */}
          <div className="pt-12 text-center select-none pointer-events-none">
            <span className="font-gothic font-black text-[18vw] leading-none tracking-tight text-white/[0.05] uppercase block">
              NYÜKU SOUTH AFRICA
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}