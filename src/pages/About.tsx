import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  Flame,
  ShieldCheck,
  Compass,
  Instagram,
  Facebook,
  GraduationCap,
  Calendar,
  Quote,
  Images,
  ChevronDown
} from 'lucide-react';

interface AboutProps {
  onNavigateShop?: () => void;
  isDark?: boolean;
}

export function About({ onNavigateShop, isDark = true }: AboutProps) {
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);

  const GALLERY_IMAGES = [
    { src: '/nyuku-gallery-poolside.jpg', title: 'Poolside Marquee Setup' },
    { src: '/nyuku-gallery-marquee-water.jpg', title: 'Reflections & Lights' },
    { src: '/nyuku-gallery-funday-zorb.jpg', title: 'Nyüku Funday Zorb Action' },
    { src: '/nyuku-gallery-poolside-night.jpg', title: 'Night Vibe & Marquee' },
    { src: '/nyuku-gallery-smoke-show.jpg', title: 'Day Club Smoke Flares' },
    { src: '/nyuku-gallery-bounce-castle.jpg', title: 'Community Funday Play' },
    { src: '/nyuku-gallery-backdrop.jpg', title: 'The Red Carpet Backdrop' },
  ];

  return (
    <div className="pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-28 select-none">
      <section className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black min-h-[460px] sm:min-h-[540px] flex items-center justify-center p-8 sm:p-14 text-center">
        <img
          src="/nyuku-poolside-marquee.jpg"
          alt="Nyüku Poolside Marquee"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-black/70 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Archive Lore // Chapter 01</span>
          </div>

          <h1 className="font-gothic text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[1.05]">
            About Nyüku
          </h1>

          <div className="w-28 h-2 mx-auto bg-amber-400 rounded-full blur-[0.5px] -mt-2" />

          <p className="text-sm sm:text-base font-mono text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            From the red-soil citrus groves of Zebediela, Limpopo. We craft heavyweight garments and curate poolside subculture.
          </p>

          <div className="pt-2">
            <a
              href="#culture-story"
              className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-black uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-xl hover:scale-105"
            >
              <span>Explore The Story</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <div id="culture-story" className="text-center space-y-2">
        <h2 className="font-gothic text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
          Forged in Culture, Tailored for Movement
        </h2>
        <div className="w-36 h-2 mx-auto bg-amber-400 rounded-full" />
      </div>

      <section className="space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              01 // Provenance & Identity
            </span>
            <h3 className="font-gothic text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase leading-tight">
              Rooted in Zebediela, <br /> Born to Redefine Luxury
            </h3>
            <p className="text-xs sm:text-sm font-sans text-slate-600 dark:text-zinc-300 leading-relaxed">
              Nyüku began not on runway mood boards, but from the everyday hustle of Zebediela in Limpopo. The name itself invokes real movement, grind, and currency. We channel Northern Sotho cultural spirit into luxury silhouettes designed to be worn across the country.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateShop}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold uppercase tracking-wider transition-transform hover:scale-105 shadow-md"
              >
                View Collection
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl bg-amber-400/20 border border-amber-400/40 -rotate-3 transition-transform group-hover:rotate-0" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-zinc-900">
                <img
                  src="/nyuku-tent-setup.jpg"
                  alt="Nyüku Daytime Activation Setup"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
              <span className="absolute -bottom-4 -left-4 text-amber-400 text-2xl font-mono animate-pulse">✦</span>
              <span className="absolute -top-4 left-1/4 text-amber-400 text-xl font-mono">✺</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-3xl bg-amber-400/20 border border-amber-400/40 rotate-3" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-zinc-900">
                <img
                  src="/nyuku-hangout-crew.jpg"
                  alt="Nyüku Hang Out Community"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
              <span className="absolute -top-4 -right-4 text-amber-400 text-2xl font-mono animate-pulse">✦</span>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              02 // The Community
            </span>
            <h3 className="font-gothic text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase leading-tight">
              The Nyüku Hang Out <br /> Experience & Day Clubs
            </h3>
            <p className="text-xs sm:text-sm font-sans text-slate-600 dark:text-zinc-300 leading-relaxed">
              Streetwear is hollow without the community that brings it to life. Through our signature "Nyüku Hang Out" day parties, lodge sessions, and poolside events, collectors come together in high-voltage colors, bespoke caps, and heavyweight drapes.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateShop}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold uppercase tracking-wider transition-transform hover:scale-105 shadow-md"
              >
                Join The Movement
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              03 // Merch in the Wild
            </span>
            <h3 className="font-gothic text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase leading-tight">
              The Stadium Vessels & <br /> High-Density Textiles
            </h3>
            <p className="text-xs sm:text-sm font-sans text-slate-600 dark:text-zinc-300 leading-relaxed">
              From our reusable frosted stacked-alphabet drinkware lined across bars to 450GSM loopback fleeces and 320GSM rugby jersey knits, every single item is field-tested during our live events. Authentic quality you can feel in hand.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateShop}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold uppercase tracking-wider transition-transform hover:scale-105 shadow-md"
              >
                Inspect Gear
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl bg-amber-400/20 border border-amber-400/40 -rotate-2" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-zinc-900">
                <img
                  src="/nyuku-tumblers-bar.jpg"
                  alt="Nyüku Stadium Tumblers Lineup"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
              <span className="absolute -bottom-4 -left-4 text-amber-400 text-2xl font-mono animate-pulse">✺</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-10 border-t border-white/10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-black/70 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            <Images className="w-3.5 h-3.5" />
            <span>Culture & Community Gallery</span>
          </div>
          <h2 className="font-gothic text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Moments in Motion
          </h2>
          <p className="text-xs sm:text-sm font-sans text-slate-600 dark:text-zinc-400 leading-relaxed">
            Tap the stacked preview card below to unfold our complete visual archive of poolside day clubs and community gatherings.
          </p>
        </div>

        {!isGalleryExpanded ? (
          <div
            onClick={() => setIsGalleryExpanded(true)}
            className="group relative max-w-2xl mx-auto cursor-pointer select-none py-4"
          >
            <div className="absolute inset-x-4 -bottom-3 h-full rounded-3xl bg-zinc-900/60 border border-white/10 rotate-3 transform transition-transform group-hover:rotate-6" />
            <div className="absolute inset-x-2 -bottom-1.5 h-full rounded-3xl bg-zinc-900/80 border border-white/15 -rotate-2 transform transition-transform group-hover:-rotate-3" />

            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/50 bg-zinc-950 shadow-2xl aspect-[16/9] flex items-center justify-center p-6">
              <img
                src={GALLERY_IMAGES[0].src}
                alt="Gallery Preview"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 text-center space-y-2">
                <span className="px-4 py-1 rounded-full border border-amber-400/40 bg-amber-400/15 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest">
                  ARCHIVE VAULT ✦ 7 FRAMES
                </span>
                <h3 className="font-gothic text-2xl sm:text-3xl font-black uppercase text-white tracking-wider">
                  TAP TO UNFOLD
                </h3>
                <p className="text-[11px] font-mono text-zinc-300 uppercase tracking-widest flex items-center justify-center gap-1 pt-1">
                  <span>Explore Visual Grid</span>
                  <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-center pb-2">
              <button
                onClick={() => setIsGalleryExpanded(false)}
                className="px-5 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-400 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
              >
                <span>Collapse Gallery</span>
                <ChevronDown className="w-4 h-4 rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-xl aspect-[4/3] ${
                    idx === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : ''
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                        Archival Frame 0{idx + 1}
                      </span>
                      <h4 className="font-gothic text-lg sm:text-xl font-bold uppercase text-white">
                        {img.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* WHY IT WORKS SECTION WITH BACKGROUND IMAGES & SHADESOFCOLORS EVENTS */}
      <section className="space-y-12 pt-8">
        <div className="text-center space-y-2">
          <h2 className="font-gothic text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Why It Works
          </h2>
          <div className="w-24 h-2 mx-auto bg-amber-400 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative rounded-3xl p-8 border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all text-center flex flex-col justify-between min-h-[340px]">
            <img
              src="/nyuku-tent-setup.jpg"
              alt="Heavyweight African Cotton"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.25] group-hover:scale-110 group-hover:brightness-[0.20] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 pointer-events-none" />

            <div className="relative z-10 space-y-4 my-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 backdrop-blur-md flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="font-gothic text-xl font-bold text-white uppercase tracking-wide">
                Heavyweight African Cotton
              </h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed max-w-xs mx-auto">
                We insist on dense 280GSM–320GSM combed jersey and 450GSM French Terry loopback. Silhouettes that maintain structured drape wash after wash.
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl p-8 border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all text-center flex flex-col justify-between min-h-[340px]">
            <img
              src="/nyuku-tumblers-bar.jpg"
              alt="Sealed Archival Batches"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.25] group-hover:scale-110 group-hover:brightness-[0.20] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 pointer-events-none" />

            <div className="relative z-10 space-y-4 my-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 backdrop-blur-md flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-gothic text-xl font-bold text-white uppercase tracking-wide">
                Sealed Archival Batches
              </h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed max-w-xs mx-auto">
                Every drop is strictly capped in quantity and authenticated. Once a batch is sealed, it transitions to the private syndicate archive.
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl p-8 border border-amber-400/30 overflow-hidden shadow-lg hover:shadow-2xl transition-all text-center flex flex-col justify-between min-h-[340px]">
            <img
              src="/nyuku-gallery-smoke-show.jpg"
              alt="ShadesOfColors Experience"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] group-hover:scale-110 group-hover:brightness-[0.25] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 pointer-events-none" />

            <div className="relative z-10 space-y-4 my-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400/30 via-pink-500/30 to-blue-500/30 border border-amber-400/50 backdrop-blur-md flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                  Cultural Activations
                </span>
                <h3 className="font-gothic text-xl font-bold text-white uppercase tracking-wide">
                  ShadesOfColors Experience
                </h3>
              </div>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed max-w-xs mx-auto">
                Signature poolside gatherings, day clubs, and outdoor music experiences where vibrant colors, streetwear culture, and community energy collide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black text-white p-8 sm:p-14 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <img
              src="/nyuku-poster-retro-tv.jpg"
              alt="Official Nyüku Event Poster"
              className="w-full max-h-[460px] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Live Activation Concierge
              </span>
              <h3 className="font-gothic text-3xl sm:text-5xl font-black uppercase text-white">
                The Bridge Boutique Lodge
              </h3>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                Connect directly with our authorized team on WhatsApp for tickets, VIP table packages, and pop-up allocations:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/27682910153?text=Hi%20Tolique,%20I%20would%20like%20to%20reserve%20tickets%20for%20the%20Nyüku%20Event."
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-400/60 hover:bg-emerald-400/10 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white group-hover:text-emerald-400 font-gothic">
                    Tolique (Founder)
                  </span>
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400">VIP & Table Reservations</span>
                <span className="text-xs font-mono font-bold text-emerald-400">068 291 0153</span>
              </a>

              <div className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-400/60 hover:bg-emerald-400/10 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white group-hover:text-emerald-400 font-gothic">
                    Tshegofatso (EmeritusDev)
                  </span>
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Lead Platform Engineer</span>
                <div className="flex flex-col gap-1.5 pt-1">
                  <a
                    href="https://wa.me/27795684702?text=Hi%20Tshegofatso,%20reaching%20out%20regarding%20Nyüku."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center justify-between"
                  >
                    <span>WhatsApp Music</span>
                    <span>079 568 4702</span>
                  </a>
                  <a
                    href="tel:+27615208170"
                    className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center justify-between"
                  >
                    <span>Contact Number</span>
                    <span>061 520 8170</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative rounded-3xl overflow-hidden border border-amber-400/30 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 p-8 sm:p-14 lg:p-16 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-zinc-900 group">
              <img
                src="/founder-tshegofatso-tolique.jpg"
                alt="Tshegofatso Sethosa Tolique - Founder of Nyüku"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-black/80 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FOUNDER & ARCHITECT</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                <span>Leadership Archive // Executive Dossier</span>
              </div>
              <h2 className="font-gothic text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Tshegofatso Sethosa <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
                  "Tolique"
                </span>
              </h2>
              <p className="text-xs sm:text-sm font-mono text-amber-400 uppercase tracking-widest font-bold">
                Founder, Visionary & Culture Lead • Nyüku
              </p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 space-y-2">
              <Quote className="w-6 h-6 text-amber-400/40 absolute top-4 right-4" />
              <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed italic">
                "Nyüku is built on the truth of where we come from and where we're going. Every stitch, every poolside hangout, and every limited drop carries the relentless energy of Limpopo to the world."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Roots</p>
                  <p className="text-xs font-semibold text-white">Zebediela, Limpopo</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Current Base</p>
                  <p className="text-xs font-semibold text-white">Johannesburg, Gauteng</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Alma Mater</p>
                  <p className="text-xs font-semibold text-white">S.J van der Merwe T.H.S</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Founder's Day</p>
                  <p className="text-xs font-semibold text-white">September 14</p>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                Connect Directly With The Founder:
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/tolique_sethosa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram @tolique_sethosa"
                  className="w-12 h-12 rounded-full border border-pink-500/30 bg-pink-500/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all flex items-center justify-center text-pink-400 shadow-md hover:scale-110 active:scale-95"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://www.facebook.com/tshegofatjo.sethosa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook Profile"
                  className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center text-blue-400 shadow-md hover:scale-110 active:scale-95"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href="https://wa.me/27682910153?text=Hi%20Tolique,%20reaching%20out%20to%20you%20directly%20from%20the%20Nyüku%20Official%20Platform."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp Concierge"
                  className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center text-emerald-400 shadow-md hover:scale-110 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;