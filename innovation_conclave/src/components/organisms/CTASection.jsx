// components/organisms/CTASection.jsx
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative z-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10">
                <div className="absolute inset-0 bg-linear-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-950"></div>
            </div>
            <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                >
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Ready to Join Innovation Conclave?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                        Seats are limited. Register today and be part of the change.
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                            Register Now
                        </button>
                        <button className="px-10 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-xl font-bold shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20">
                            Learn More
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
