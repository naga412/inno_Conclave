import React from "react";
import { motion } from "framer-motion";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi";

export default function CTASection() {
    return (
        <section className="relative py-32 bg-slate-50 dark:bg-gradient-to-b from-slate-950 to-[#0b1120] transition-colors duration-700 overflow-hidden flex items-center justify-center ">

            {/* Minimal Ambient Glows */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/20 blur-[150px] rounded-full pointer-events-none transition-colors duration-700" /> */}
            {/* <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-400/10 dark:bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none transition-colors duration-700" /> */}

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-blue-300 text-sm font-semibold backdrop-blur-md mb-8 transition-colors shadow-sm"
                >
                    {/* <HiOutlineSparkles className="w-4 h-4 text-blue-500" /> */}
                    Limited Passes Available
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-[2.5rem] md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-6 transition-colors"
                >
                    Ready to Join <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                        Innovation Conclave?
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-12 max-w-2xl font-medium transition-colors"
                >
                    Seats are filling up fast for the premier tech event of 2026. Secure your spot today and be part of the change.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
                >
                    <button className="group flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1 active:scale-95 text-lg w-full sm:w-auto">
                        Register Now
                        <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-full font-bold transition-all hover:border-slate-300 dark:hover:border-white/20 text-lg shadow-sm w-full sm:w-auto">
                        Learn More
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
