import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineLocationMarker, HiOutlineUser } from "react-icons/hi";

// Color palettes for alternating cards
const palettes = [
    { color: "from-blue-600 to-cyan-500", textColor: "text-blue-500", bgLight: "bg-blue-500", border: "border-blue-500" },
    { color: "from-purple-600 to-pink-500", textColor: "text-purple-500", bgLight: "bg-purple-500", border: "border-purple-500" },
    { color: "from-emerald-500 to-teal-400", textColor: "text-emerald-500", bgLight: "bg-emerald-500", border: "border-emerald-500" },
    { color: "from-amber-500 to-orange-500", textColor: "text-amber-500", bgLight: "bg-amber-500", border: "border-amber-500" },
    { color: "from-rose-500 to-red-500", textColor: "text-rose-500", bgLight: "bg-rose-500", border: "border-rose-500" },
    { color: "from-indigo-500 to-blue-600", textColor: "text-indigo-500", bgLight: "bg-indigo-500", border: "border-indigo-500" },
];

function ParallaxCard({ session, i, total, progress, range, targetScale }) {
    const containerRef = useRef(null);
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, range, [0.8, 1]);
    
    const theme = palettes[i % palettes.length];
    
    // Parse time into Start and End for visual flair
    const [start, end] = session.time.split(" - ");

    return (
        <div ref={containerRef} className="h-screen w-full flex items-center justify-center sticky top-0 px-2 sm:px-6">
            <motion.div
                style={{ scale, opacity, top: `calc(-5vh + ${i * 25}px)` }}
                className={`relative w-full max-w-5xl h-[450px] md:h-[350px] flex flex-col md:flex-row items-center rounded-[2.5rem] bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-500`}
            >
                {/* Left Sidebar (Color Banner with Time) */}
                <div className={`w-full md:w-1/3 md:h-full bg-gradient-to-br ${theme.color} p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shrink-0`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full mix-blend-overlay pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 blur-3xl rounded-full mix-blend-overlay pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between w-full h-full md:flex-col md:items-start md:justify-end">
                        <span className="text-white/90 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mix-blend-overlay">
                            {session.category}
                        </span>
                        <div className="flex flex-col items-end md:items-start text-white">
                            <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter drop-shadow-sm leading-none">
                                {start}
                            </span>
                            <span className="text-base md:text-xl font-bold text-white/80 mt-1 md:mt-2">
                                to {end}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="w-full md:w-2/3 h-full p-6 md:p-10 flex flex-col justify-center relative bg-white dark:bg-slate-900/50 transition-colors">
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none ${theme.bgLight}`} />

                    <div className="relative z-10">
                        {/* Location Tag */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-bold border dark:border-white/10 ${theme.border} bg-slate-50 dark:bg-white/5`}>
                            <HiOutlineLocationMarker className={`w-4 h-4 md:w-5 md:h-5 ${theme.textColor}`} />
                            <span className={theme.textColor}>{session.location}</span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 md:mb-4 mt-4 leading-tight transition-colors">
                            {session.title}
                        </h3>

                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium mb-4 md:mb-6">
                            <HiOutlineUser className="w-4 h-4" />
                            <span>{session.speaker}</span>
                        </div>

                        <p className="text-[1rem] md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg transition-colors">
                            {session.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function AgendaTimeline({ sessions }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
  });

  if (!sessions || sessions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 border border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] bg-slate-50 dark:bg-white/5 transition-colors">
        <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">No sessions scheduled for this day yet.</h3>
        <p className="text-slate-500 dark:text-slate-500 mt-2">Filter between Day 1 and Day 2 to see the full schedule.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full pb-32">
      {sessions.map((session, i) => {
          const targetScale = 1 - ((sessions.length - i) * 0.05);
          // Scale range calculations based on how many cards are present
          const range = [i * (1/(sessions.length || 1)), 1];
          return (
              <ParallaxCard
                  key={i}
                  i={i}
                  total={sessions.length}
                  session={session}
                  progress={scrollYProgress}
                  range={range}
                  targetScale={targetScale}
              />
          );
      })}
    </div>
  );
}
