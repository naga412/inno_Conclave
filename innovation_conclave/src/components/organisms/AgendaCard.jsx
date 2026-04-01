import React, { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { HiOutlineLocationMarker, HiOutlineUser } from "react-icons/hi";

const palettes = [
  { color: "from-orange-300 to-orange-600", textColor: "text-orange-300", bgLight: "bg-orange-300", border: "border-orange-300" },
  { color: "from-purple-600 to-pink-500", textColor: "text-purple-500", bgLight: "bg-purple-500", border: "border-purple-500" },
  { color: "from-emerald-500 to-teal-400", textColor: "text-emerald-500", bgLight: "bg-emerald-500", border: "border-emerald-500" },
  { color: "from-amber-500 to-orange-500", textColor: "text-amber-500", bgLight: "bg-amber-500", border: "border-amber-500" },
  { color: "from-rose-500 to-red-500", textColor: "text-rose-500", bgLight: "bg-rose-500", border: "border-rose-500" },
  { color: "from-indigo-500 to-orange-300", textColor: "text-indigo-500", bgLight: "bg-indigo-500", border: "border-indigo-500" },
];

export default function AgendaCard({ session, i, progress, range, targetScale }) {
  const containerRef = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [0.8, 1]);

  const theme = palettes[i % palettes.length];

  const timeString = session.time || "";
  const timeParts = timeString.split(" - ");
  const start = timeParts[0] || timeString;
  const end = timeParts[1] || "";

  const category = session.category || session.tag || "";
  const description = session.description || session.desc || "";

  return (
    <div ref={containerRef} className="h-[600px] w-full flex items-center justify-center sticky top-0 px-2 sm:px-6">
      <motion.div
        style={{ scale, opacity, top: `calc(-5vh + ${i * 25}px)` }}
        className={`relative w-full max-w-4xl h-[450px] md:h-[350px] flex flex-col md:flex-row items-center rounded-[0.5rem] bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-500`}
      >
        {/* Left Sidebar (Color Banner with Time) */}
        <div className={`w-full md:w-1/3 md:h-full bg-gradient-to-br ${theme.color} p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shrink-0`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 blur-3xl rounded-full mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between w-full h-full md:flex-col md:items-start md:justify-end">
            <span className="text-white/90 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mix-blend-overlay">
              {category}
            </span>
            <div className="flex flex-col items-end md:items-start text-white">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter drop-shadow-sm leading-none break-words">
                {start}
              </span>
              {end && (
                <span className="text-base md:text-xl font-bold text-white/80 mt-1 md:mt-2">
                  to {end}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-2/3 h-full p-6 md:p-10 flex flex-col justify-center relative bg-white dark:bg-slate-900/50 transition-colors">
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none ${theme.bgLight}`} />

          <div className="relative z-10">
            {/* Location Tag */}
            {session.location && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs md:text-sm font-bold border dark:border-white/10 ${theme.border} bg-slate-50 dark:bg-white/5`}>
                <HiOutlineLocationMarker className={`w-4 h-4 md:w-5 md:h-5 ${theme.textColor}`} />
                <span className={theme.textColor}>{session.location}</span>
              </div>
            )}

            {/* Title & Description */}
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 md:mb-4 mt-4 leading-tight transition-colors">
              {session.title}
            </h3>

            {session.speaker && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium mb-4 md:mb-6">
                <HiOutlineUser className="w-4 h-4" />
                <span>{session.speaker}</span>
              </div>
            )}

            <p className="text-[1rem] md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl transition-colors">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
