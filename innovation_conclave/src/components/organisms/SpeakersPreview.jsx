// components/organisms/SpeakersPreview.jsx
import { motion } from "framer-motion";

const speakers = [
    { name: "Dr. Arjun Mehta", role: "AI Research Lead", company: "Google", initials: "AM" },
    { name: "Priya Krishnan", role: "Co-Founder", company: "TechBridge", initials: "PK" },
    { name: "Rahul Verma", role: "VP Engineering", company: "Infosys", initials: "RV" },
];

export default function SpeakersPreview() {
    return (
        <section className="py-16 bg-slate-50 dark:bg-white/5 transition-colors duration-300 relative z-10">
            <div className="max-w-5xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">Featured Speakers</h2>
                        <p className="mt-1 text-base text-gray-500 dark:text-slate-400 transition-colors duration-300">Voices from the industry you trust.</p>
                    </div>
                    <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline hidden md:block shrink-0 transition-colors duration-300">
                        View All →
                    </button>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-5">
                    {speakers.map((s, i) => (
                        <motion.div
                            key={s.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.08 }}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 flex items-center gap-5 hover:border-blue-500/40 dark:hover:border-blue-500/30 hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300"
                        >
                             <div className="w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center text-base font-bold shrink-0 select-none transition-colors duration-300">
                                {s.initials}
                            </div>
                            <div className="min-w-0">
                                <p className="text-base font-semibold text-slate-900 dark:text-white truncate transition-colors duration-300">{s.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-500 mt-0.5 transition-colors duration-300">{s.role}</p>
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5 transition-colors duration-300">{s.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
