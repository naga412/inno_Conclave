import React from "react";
import { motion } from "framer-motion";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
export default function CTASection() {
    return (
        <section className="relative py-32 bg-gradient-to-b from-transparent to-slate-200 dark:bg-gradient-to-b dark:from-transparent dark:to-[#0b1120] transition-colors duration-700 overflow-hidden flex items-center justify-center ">

            {/* Minimal Ambient Glows */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-300/10 dark:bg-orange-300/20 blur-[150px] rounded-full pointer-events-none transition-colors duration-700" /> */}
            {/* <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/10 dark:bg-orange-600/10 blur-[150px] rounded-full pointer-events-none transition-colors duration-700" /> */}

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 dark:bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]  pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex items-center gap-2 px-5 py-2 rounded-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-orange-300 text-sm font-semibold backdrop-blur-md mb-8 transition-colors shadow-sm"
                >
                    {/* <HiOutlineSparkles className="w-4 h-4 text-orange-300" /> */}
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600 dark:from-orange-300 dark:to-orange-600">
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
                    <Link to="/register" className="group flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-sm font-bold shadow-lg shadow-orange-300/20 transition-all hover:-translate-y-1 active:scale-95 text-lg w-full sm:w-auto">
                        Register Now
                        <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-sm font-bold transition-all hover:border-slate-300 dark:hover:border-white/20 text-lg shadow-sm w-full sm:w-auto">
                        Learn More
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
