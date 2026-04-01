import { motion } from "framer-motion";
import { HiOutlineLink } from "react-icons/hi";
import { HiOutlineArrowRight } from "react-icons/hi";

const speakers = [
    { name: "Dr. Arjun Mehta", role: "AI Research Lead", company: "Google", image: "/speakers/arjun.png", status: "Speaking at Track A" },
    { name: "Priya Krishnan", role: "Co-Founder", company: "TechBridge", image: "/speakers/priya.png", status: "Keynote at 10:00 AM" },
    { name: "Rahul Verma", role: "VP Engineering", company: "Infosys", image: "/speakers/rahul.png", status: "Panel at 02:00 PM" },
];

export default function SpeakersPreview() {
    return (
        <section className="py-24  transition-colors duration-500 relative overflow-hidden z-10">
            {/* Subtle Background Pattern / Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-orange-300/10 dark:bg-orange-300/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                >
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-block py-1.5 px-4 rounded-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 text-sm font-semibold tracking-wide uppercase mb-6"
                        >
                            Visionaries
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Speakers</span>
                        </h2>
                        <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                            Gain insights from industry pioneers and thought leaders shaping the future of technology and innovation.
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ x: 5 }}
                        className="group flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white px-6 py-3 rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    >
                        View Full Lineup
                        <HiOutlineArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {speakers.map((s, i) => (
                        <motion.div
                            key={s.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                            whileHover={{ y: -10 }}
                            className="group relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[0.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Full Cover Image */}
                            <img
                                src={s.image}
                                alt={s.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Seamless Top Blur Gradient for Sharp Text */}
                            <div className="absolute top-0 left-0 right-0 h-48 backdrop-blur-2xl bg-black/30 [mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                            {/* Bottom gradient matching the image vibe */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/95 transition-colors duration-500" />

                            {/* Top Text (Name and Status) */}
                            <div className="absolute top-12 w-full text-center px-4 opacity-0 -translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-[50ms]">
                                <h3 className="text-[1.8rem] font-medium text-white tracking-wide drop-shadow-lg">{s.name}</h3>
                                {/* <div className="text-white/90 text-sm mt-3 flex items-center justify-center gap-2 font-medium drop-shadow-md">
                                    <svg className="w-4 h-4 text-white/80 animate-[spin_3s_linear_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    {s.status}
                                </div> */}
                            </div>

                            {/* Bottom Content */}
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                {/* Left: Little avatar and role info */}
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-slate-200 overflow-hidden border-2 border-white/20 shrink-0">
                                        <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-medium text-sm leading-tight truncate">@{s.company.toLowerCase().replace(/\s+/g, '')}</p>
                                        <p className="text-white/70 text-xs mt-0.5 truncate">{s.role}</p>
                                    </div>
                                </div>

                                {/* Right: Button */}
                                <button className="bg-white text-slate-900 font-semibold px-5 py-2.5 rounded-sm shadow-lg flex items-center gap-2 hover:bg-slate-100 hover:scale-105 transition-all text-sm shrink-0">
                                    <span className="text-lg leading-none mb-0.5">+</span> Connect
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
