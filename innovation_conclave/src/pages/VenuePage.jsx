import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Bus, Train, Plane, Map, Building2, Utensils, Wifi, Car, Building } from 'lucide-react';

export default function VenuePage() {
  return (
    <div className="min-h-screen pt-32 pb-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12 lg:gap-20">

        {/* HERO SECTION */}
        <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-10 lg:p-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-2xl dark:shadow-indigo-500/10 flex flex-col lg:flex-row lg:items-center justify-between gap-12 text-slate-900 dark:text-white text-center lg:text-left">

          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
            <div className="absolute -top-1/2 -left-1/4 w-[40rem] h-[40rem] bg-indigo-500 rounded-full mix-blend-screen filter blur-[150px] opacity-70 animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute -bottom-1/2 -right-1/4 w-[40rem] h-[40rem] bg-orange-500 rounded-full mix-blend-screen filter blur-[150px] opacity-60 animate-pulse" style={{ animationDuration: '8s' }} />
          </div>

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-slate-50 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 mb-6 shadow-sm mx-auto lg:mx-0">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-200">The Ultimate Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              AITAM Campus,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-indigo-500 dark:from-orange-400 dark:to-indigo-400">Tekkali.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed opacity-90 mb-8 max-w-xl mx-auto lg:mx-0">
              Join us at Aditya Institute of Technology and Management, a premier institution spanning 50 sprawling acres of lush green campus designed for technical excellence and innovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="https://maps.google.com/?q=AITAM+Tekkali" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-sm shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95 transition-all w-full sm:w-auto">
                <Navigation className="w-4 h-4" /> Open in Google Maps
              </a>
            </div>
          </motion.div>

          {/* Map Preview Graphic */}
          <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 lg:w-1/2 shrink-0 aspect-square lg:aspect-[4/3] rounded-sm bg-slate-50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center"
          >
            <Map className="w-24 h-24 text-slate-300 dark:text-white/30 mb-6 drop-shadow-md" />
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Interactive Map Active</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium font-mono">18°33'59.9"N 84°13'00.0"E</p>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 dark:from-slate-900 via-transparent to-transparent pointer-events-none" />
            <div className="mt-8 relative z-10 w-full rounded-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
              <p className="text-xs text-orange-500 dark:text-orange-400 uppercase tracking-widest font-bold mb-2">Distance from Tekkali Core</p>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                <div className="w-[15%] h-full bg-gradient-to-r from-orange-400 to-indigo-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-bold">
                <span>0KM</span>
                <span className="text-slate-900 dark:text-white">5KM</span>
                <span>30KM</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* TRANSIT CARDS */}
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 text-center lg:text-left tracking-tight">How to reach the venue</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Train, color: "indigo", title: "By Rail",
                desc: "The nearest major railway station is Naupada Junction (NWP), located about 20 km from the campus. Palasa (PSA) and Srikakulam Road (CHE) are other major hubs."
              },
              {
                icon: Bus, color: "orange", title: "By Road",
                desc: "Tekkali is well connected by APSRTC buses. The campus is located directly alongside National Highway 16 (NH-16), making road transit extremely accessible."
              },
              {
                icon: Plane, color: "sky", title: "By Air",
                desc: "The nearest operational airport is Visakhapatnam International Airport (VTZ), approximately 150 km from the venue. Cab and bus services are available."
              }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                className="bg-white dark:bg-slate-900 rounded-sm p-8 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform group"
              >
                <div className={`w-14 h-14 rounded-sm bg-${t.color}-50 dark:bg-${t.color}-500/10 border border-${t.color}-200 dark:border-${t.color}-500/20 flex items-center justify-center mb-6 text-${t.color}-500 group-hover:scale-110 transition-transform`}>
                  <t.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">{t.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CAMPUS FACILITIES */}
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 text-center lg:text-left tracking-tight">Campus Highlights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Building2, title: "Grand Auditorium", desc: "Main stage for keynotes & panels." },
              { icon: Building, title: "Expo Hall A", desc: "Startups and innovations showcase." },
              { icon: Utensils, title: "Food Court", desc: "Designated areas for confirmed lunch." },
              { icon: Wifi, title: "Campus Wi-Fi", desc: "Free high-speed internet available." },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + (i * 0.05) }}
                className="flex items-start gap-4 p-6 rounded-sm bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5"
              >
                <f.icon className="w-8 h-8 text-indigo-500 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-1">{f.title}</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
