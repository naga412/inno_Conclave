import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { HiOutlineClock } from "react-icons/hi";

// Data
const day1AgendaItems = [
    { time: "09:00 AM", duration: "1 Hour", title: "Registration & Welcome", tag: "Opening", desc: "Check-in, grab your badge, and enjoy complimentary coffee while networking with early arrivals.", color: "from-blue-600 to-cyan-500", textColor: "text-blue-500", bgLight: "bg-blue-500", border: "border-blue-500" },
    { time: "10:00 AM", duration: "1.5 Hours", title: "Keynote Address", tag: "Keynote", desc: "Visionary insights from industry leaders on the future of technology and how AI is shaping the landscape.", color: "from-purple-600 to-pink-500", textColor: "text-purple-500", bgLight: "bg-purple-500", border: "border-purple-500" },
    { time: "11:30 AM", duration: "2 Hours", title: "Innovation Expo", tag: "Expo", desc: "The showcase floor officially opens. Discover over 50+ cutting-edge prototypes from top university teams.", color: "from-emerald-500 to-teal-400", textColor: "text-emerald-500", bgLight: "bg-emerald-500", border: "border-emerald-500" },
    { time: "02:00 PM", duration: "2.5 Hours", title: "Startup Pitch", tag: "Compete", desc: "Top 10 early-stage startups pitch for seed funding to a panel of expert angel investors and VCs.", color: "from-amber-500 to-orange-500", textColor: "text-amber-500", bgLight: "bg-amber-500", border: "border-amber-500" },
    { time: "04:30 PM", duration: "1.5 Hours", title: "Panel: AI & Ethics", tag: "Discussion", desc: "A deep dive into the ethical implications of autonomous systems and responsible development.", color: "from-rose-500 to-red-500", textColor: "text-rose-500", bgLight: "bg-rose-500", border: "border-rose-500" },
    { time: "06:00 PM", duration: "1 Hour", title: "Awards & Closing", tag: "Closing", desc: "Celebrating the pitch competition winners and wrapping up an incredible day of high-impact innovation.", color: "from-indigo-500 to-blue-600", textColor: "text-indigo-500", bgLight: "bg-indigo-500", border: "border-indigo-500" },
];

const day2AgendaItems = [
    { time: "09:30 AM", duration: "1 Hour", title: "Day 2 Kickoff", tag: "Opening", desc: "Recap of Day 1 highlights and an inspiring start to our second day of innovation.", color: "from-indigo-500 to-blue-600", textColor: "text-indigo-500", bgLight: "bg-indigo-500", border: "border-indigo-500" },
    { time: "10:30 AM", duration: "2 Hours", title: "Expert Workshops", tag: "Workshop", desc: "Hands-on technical sessions covering advanced architectures and robust scalable systems.", color: "from-rose-500 to-red-500", textColor: "text-rose-500", bgLight: "bg-rose-500", border: "border-rose-500" },
    { time: "01:00 PM", duration: "1.5 Hours", title: "Networking Lunch", tag: "Social", desc: "Catered lunch at the Skybridge. An excellent opportunity to meet potential co-founders and investors.", color: "from-amber-500 to-orange-500", textColor: "text-amber-500", bgLight: "bg-amber-500", border: "border-amber-500" },
    { time: "02:30 PM", duration: "2 Hours", title: "Future of Web3", tag: "Panel", desc: "Leading experts debate the long-term impacts of blockchain and decentralization on global infrastructure.", color: "from-emerald-500 to-teal-400", textColor: "text-emerald-500", bgLight: "bg-emerald-500", border: "border-emerald-500" },
    { time: "05:00 PM", duration: "2 Hours", title: "Grand Finale Gala", tag: "Closing", desc: "The conclusive celebration. Live entertainment, final remarks, and the announcement of the 2027 location.", color: "from-purple-600 to-pink-500", textColor: "text-purple-500", bgLight: "bg-purple-500", border: "border-purple-500" },
];

function Card({ item, i, progress, range, targetScale }) {
    const containerRef = useRef(null);

    // Creates the shrink effect for the background cards based on parent scroll progress
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, range, [0.8, 1]);

    return (
        <div ref={containerRef} className="h-screen w-full flex items-center justify-center sticky top-0 px-6 sm:px-12">
            <motion.div
                style={{ scale, opacity, top: `calc(-5vh + ${i * 25}px)` }}
                className={`relative w-full max-w-5xl h-[450px] md:h-[350px] flex flex-col md:flex-row items-center rounded-[2.5rem] bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-500`}
            >
                {/* Left Sidebar (Color Banner with Time) */}
                <div className={`w-full md:w-1/3 md:h-full bg-gradient-to-br ${item.color} p-8 flex flex-col justify-between relative overflow-hidden shrink-0`}>
                    {/* Glowing Orbs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full mix-blend-overlay pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 blur-3xl rounded-full mix-blend-overlay pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between w-full h-full md:flex-col md:items-start md:justify-end">
                        <span className="text-white/90 font-bold tracking-[0.2em] uppercase text-sm mix-blend-overlay">
                            {item.tag}
                        </span>
                        <div className="flex flex-col items-end md:items-start text-white">
                            <span className="text-5xl sm:text-6xl font-extrabold tracking-tighter drop-shadow-sm leading-none">
                                {item.time.split(" ")[0]}
                            </span>
                            <span className="text-xl md:text-2xl font-bold text-white/80 mt-1 md:mt-2">
                                {item.time.split(" ")[1]}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="w-full md:w-2/3 h-full p-6 md:p-10 flex flex-col justify-center relative bg-white dark:bg-slate-900/50 transition-colors">
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none ${item.bgLight}`} />

                    <div className="relative z-10">
                        {/* Duration Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${item.border} bg-slate-50 dark:bg-slate-950 transition-colors border-opacity-50`}>
                            <HiOutlineClock className={`w-5 h-5 ${item.textColor}`} />
                            <span className={item.textColor}>
                                {item.duration}
                            </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 md:mb-5 mt-4 leading-tight transition-colors">
                            {item.title}
                        </h3>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg transition-colors">
                            {item.desc}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function AgendaPreview() {
    const [activeDay, setActiveDay] = useState("day1");
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const activeItems = activeDay === "day1" ? day1AgendaItems : day2AgendaItems;

    return (
        <section className="bg-slate-50 dark:bg-slate-950 transition-colors duration-700 relative z-10 py-12">

            {/* Header Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="text-center lg:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-tight transition-colors"
                    >
                        Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Agenda</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-xl text-slate-600 dark:text-slate-400 font-medium max-w-lg transition-colors"
                    >
                        Follow the pulse of the day. A seamless flow of pioneering talks, explosive pitches, and collaborative momentum.
                    </motion.p>
                </div>

                {/* Day Switcher */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex p-1.5 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-full shadow-sm"
                >
                    <button
                        onClick={() => setActiveDay("day1")}
                        className={`relative px-8 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 z-10 ${activeDay === "day1" ? "text-slate-900" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                    >
                        {activeDay === "day1" && (
                            <motion.div layoutId="agendaTab" className="absolute inset-0 bg-white rounded-full shadow-md z-[-1]" />
                        )}
                        Day 1
                    </button>
                    <button
                        onClick={() => setActiveDay("day2")}
                        className={`relative px-8 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 z-10 ${activeDay === "day2" ? "text-slate-900" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                    >
                        {activeDay === "day2" && (
                            <motion.div layoutId="agendaTab" className="absolute inset-0 bg-white rounded-full shadow-md z-[-1]" />
                        )}
                        Day 2
                    </button>
                </motion.div>
            </div>

            {/* The 3D Parallax Scrolling Deck */}
            <div ref={containerRef} className="relative w-full mt-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDay}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {activeItems.map((item, i) => {
                            const targetScale = 1 - ((activeItems.length - i) * 0.05);
                            const range = [i * (1 / (activeItems.length || 1)), 1];
                            return (
                                <Card
                                    key={`${activeDay}-${i}`} // Force perfect re-render on day switch
                                    i={i}
                                    item={item}
                                    progress={scrollYProgress}
                                    range={range}
                                    targetScale={targetScale}
                                />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

        </section>
    );
}
