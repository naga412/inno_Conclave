import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
import land from "../assets/land.png";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#030712] transition-colors duration-700">

      {/* Interactive Flashlight / Aura tracking mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/10 dark:bg-indigo-500/20 blur-[120px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen"
        animate={{
          x: mousePosition.x - 500,
          y: mousePosition.y - 500,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 1.5 }}
      />

      {/* Ambient Rotating Rings (Futuristic Core) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-300/80 dark:border-white/5 rounded-full pointer-events-none animate-[spin_40s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-slate-300/80 dark:border-white/5 rounded-full pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center mt-20 md:mt-12 pointer-events-auto">

        {/* Glowing Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8 shadow-xl shadow-blue-500/5 transition-colors"
        >
          {/* <HiOutlineSparkles className="text-blue-600 dark:text-blue-400 w-5 h-5 animate-pulse" /> */}
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">The Next Dimension of Tech</span>
        </motion.div>

        {/* Massive Staggered Typography */}
        <div className="relative flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter transition-colors"
          >
            INNOVATION
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-500  dark:to-cyan-400"
          >
            CONCLAVE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 text-lg md:text-2xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed transition-colors"
          >
            Innovation Conclave 2026 brings together the world's most brilliant minds to push the boundaries of what's possible.
          </motion.p>
        </div>

        {/* Action Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <button className="group relative px-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border border-slate-800 dark:border-white">
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              Claim Your Pass <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-blue-600 dark:bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
          </button>
        </motion.div> */}
      </div>

      {/* Floating Orbital Elements */}
      <motion.div
        animate={{ y: [0, -40, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute hidden md:block top-[20%] left-[5%] lg:left-[15%] w-32 h-32 lg:w-78 lg:h-78 rounded-[2rem] overflow-hidden border border-slate-200/50 dark:border-white/20 shadow-2xl dark:shadow-[0_0_50px_rgba(59,130,246,0.3)] z-0 pointer-events-none"
      >
        <img src={land} alt="Event 1" className="w-full h-full object-cover opacity-90 dark:opacity-80" />
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 50, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute hidden md:block bottom-[15%] right-[5%] lg:right-[15%] w-40 h-40 lg:w-84 lg:h-84 rounded-full overflow-hidden border border-slate-200/50 dark:border-white/20 shadow-2xl dark:shadow-[0_0_50px_rgba(6,182,212,0.3)] z-0 pointer-events-none"
      >
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Audience" className="w-full h-full object-cover opacity-90 dark:opacity-80" />
        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"></div>
      </motion.div>

      {/* <motion.div
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[15%] right-[20%] w-16 h-16 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-indigo-500 shadow-xl opacity-60 backdrop-blur-3xl z-10"
      /> */}

      {/* Subtle bottom gradient to blend perfectly into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fafafa] dark:from-[#030712] to-transparent z-20 pointer-events-none transition-colors duration-700" />
    </div>
  );
}
