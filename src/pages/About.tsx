import React from 'react';
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
  Quote
} from 'lucide-react';

interface AboutProps {
  onNavigateShop?: () => void;
  isDark?: boolean;
}

export function About({ onNavigateShop, isDark = true }: AboutProps) {
  const EVENT_CONTACTS = [
    { name: 'Tolique (Founder)', role: 'VIP & Table Reservations', number: '+27682910153', display: '068 291 0153' },
    { name: 'Tex', role: 'Syndicate Guestlist', number: '+27679862215', display: '067 986 2215' },
    { name: 'Battise', role: 'Ticketing & Activations', number: '+27812750303', display: '081 275 0303' },
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
            From the red-soil citrus groves of Zebediela, Limpopo, to the streets of Johannesburg. We craft heavyweight garments and curate poolside subculture.
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

      <section className="space-y-12 pt-8">
        <div className="text-center space-y-2">
          <h2 className="font-gothic text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Why It Works
          </h2>
          <div className="w-24 h-2 mx-auto bg-amber-400 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950/70 shadow-sm hover:shadow-xl transition-all text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="font-gothic text-lg font-bold text-slate-900 dark:text-white uppercase">
              Heavyweight African Cotton
            </h3>
            <p className="text-xs font-sans text-slate-600 dark:text-zinc-400 leading-relaxed">
              We insist on dense 280GSM–320GSM combed jersey and 450GSM French Terry loopback. Silhouettes that maintain structured drape wash after wash.
            </p>
          </div>

          <div className="rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950/70 shadow-sm hover:shadow-xl transition-all text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-gothic text-lg font-bold text-slate-900 dark:text-white uppercase">
              Sealed Archival Batches
            </h3>
            <p className="text-xs font-sans text-slate-600 dark:text-zinc-400 leading-relaxed">
              Every drop is strictly capped in quantity and authenticated. Once a batch is sealed, it transitions to the private syndicate archive.
            </p>
          </div>

          <div className="rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950/70 shadow-sm hover:shadow-xl transition-all text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="font-gothic text-lg font-bold text-slate-900 dark:text-white uppercase">
              Live Cultural Gatherings
            </h3>
            <p className="text-xs font-sans text-slate-600 dark:text-zinc-400 leading-relaxed">
              Our pieces exist in harmony with our poolside activations, day clubs, and community music festivals across South Africa.
            </p>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EVENT_CONTACTS.map((contact) => (
                <a
                  key={contact.name}
                  href={`https://wa.me/${contact.number.replace('+', '')}?text=Hi%20${contact.name},%20I%20would%20like%20to%20reserve%20tickets%20for%20the%20Nyüku%20Event.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-400/60 hover:bg-emerald-400/10 transition-all flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 font-gothic">
                      {contact.name}
                    </span>
                    <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">{contact.role}</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{contact.display}</span>
                </a>
              ))}
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

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/tolique_sethosa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-pink-500/30 bg-pink-500/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all text-xs font-mono font-bold tracking-wider uppercase text-pink-400 shadow-md hover:scale-105"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Instagram @tolique_sethosa</span>
                </a>

                <a
                  href="https://www.facebook.com/tshegofatjo.sethosa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-600 hover:text-white transition-all text-xs font-mono font-bold tracking-wider uppercase text-blue-400 shadow-md hover:scale-105"
                >
                  <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Facebook Profile</span>
                </a>

                <a
                  href="https://wa.me/27682910153?text=Hi%20Tolique,%20reaching%20out%20to%20you%20directly%20from%20the%20Nyüku%20Official%20Platform."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white transition-all text-xs font-mono font-bold tracking-wider uppercase text-emerald-400 shadow-md hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Concierge</span>
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