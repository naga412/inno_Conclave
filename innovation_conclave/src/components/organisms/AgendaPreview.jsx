import React, { useRef, useState, useEffect } from "react";
import { useScroll, AnimatePresence, motion } from "framer-motion";
import { agenda as agendaAPI } from "../../api/client";
import AgendaCard from "./AgendaCard";


export default function AgendaPreview() {
    const [activeDay, setActiveDay] = useState("day1");
    const [agendaData, setAgendaData] = useState([]);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        agendaAPI.getAll().then(data => {
            const mapped = data.map((d, i) => {
                return {
                    time: d.time_label,
                    title: d.title,
                    description: d.description || "",
                    category: d.category || "Event",
                    day: d.day === "Day 1" ? "day1" : "day2",
                    speaker: d.speaker || "",
                    location: d.location || "",
                };
            });
            setAgendaData(mapped);
        }).catch(err => console.error(err));
    }, []);

    const activeItems = agendaData.filter(i => i.day === activeDay).slice(0, 5); // Max 5 for preview

    return (
        <section className=" transition-colors duration-700 relative z-10 py-12">

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
                        Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-indigo-600">Agenda</span>
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
                    className="flex p-1.5 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-sm shadow-sm"
                >
                    <button
                        onClick={() => setActiveDay("day1")}
                        className={`relative px-8 py-3 rounded-sm text-sm sm:text-base font-bold transition-all duration-300 z-10 ${activeDay === "day1" ? "text-slate-900" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                    >
                        {activeDay === "day1" && (
                            <motion.div layoutId="agendaTab" className="absolute inset-0 bg-white rounded-sm shadow-md z-[-1]" />
                        )}
                        Day 1
                    </button>
                    <button
                        onClick={() => setActiveDay("day2")}
                        className={`relative px-8 py-3 rounded-sm text-sm sm:text-base font-bold transition-all duration-300 z-10 ${activeDay === "day2" ? "text-slate-900" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                    >
                        {activeDay === "day2" && (
                            <motion.div layoutId="agendaTab" className="absolute inset-0 bg-white rounded-sm shadow-md z-[-1]" />
                        )}
                        Day 2
                    </button>
                </motion.div>
            </div>

            {/* The 3D Parallax Scrolling Deck */}
            <div ref={containerRef} className="relative w-full">
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
                                <AgendaCard
                                    key={`${activeDay}-${i}`} // Force perfect re-render on day switch
                                    i={i}
                                    session={item}
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










// Data
// const day1AgendaItems = [
//     { time: "09:00 AM", duration: "1 Hour", title: "Registration & Welcome", tag: "Opening", desc: "Check-in, grab your badge, and enjoy complimentary coffee while networking with early arrivals.", color: "from-orange-300 to-orange-600", textColor: "text-orange-300", bgLight: "bg-orange-300", border: "border-orange-300" },
//     { time: "10:00 AM", duration: "1.5 Hours", title: "Keynote Address", tag: "Keynote", desc: "Visionary insights from industry leaders on the future of technology and how AI is shaping the landscape.", color: "from-purple-600 to-pink-500", textColor: "text-purple-500", bgLight: "bg-purple-500", border: "border-purple-500" },
//     { time: "11:30 AM", duration: "2 Hours", title: "Innovation Expo", tag: "Expo", desc: "The showcase floor officially opens. Discover over 50+ cutting-edge prototypes from top university teams.", color: "from-emerald-500 to-teal-400", textColor: "text-emerald-500", bgLight: "bg-emerald-500", border: "border-emerald-500" },
//     { time: "02:00 PM", duration: "2.5 Hours", title: "Startup Pitch", tag: "Compete", desc: "Top 10 early-stage startups pitch for seed funding to a panel of expert angel investors and VCs.", color: "from-amber-500 to-orange-500", textColor: "text-amber-500", bgLight: "bg-amber-500", border: "border-amber-500" },
//     { time: "04:30 PM", duration: "1.5 Hours", title: "Panel: AI & Ethics", tag: "Discussion", desc: "A deep dive into the ethical implications of autonomous systems and responsible development.", color: "from-rose-500 to-red-500", textColor: "text-rose-500", bgLight: "bg-rose-500", border: "border-rose-500" },
//     { time: "06:00 PM", duration: "1 Hour", title: "Awards & Closing", tag: "Closing", desc: "Celebrating the pitch competition winners and wrapping up an incredible day of high-impact innovation.", color: "from-indigo-500 to-orange-300", textColor: "text-indigo-500", bgLight: "bg-indigo-500", border: "border-indigo-500" },
// ];

// const day2AgendaItems = [
//     { time: "09:30 AM", duration: "1 Hour", title: "Day 2 Kickoff", tag: "Opening", desc: "Recap of Day 1 highlights and an inspiring start to our second day of innovation.", color: "from-indigo-500 to-orange-300", textColor: "text-indigo-500", bgLight: "bg-indigo-500", border: "border-indigo-500" },
//     { time: "10:30 AM", duration: "2 Hours", title: "Expert Workshops", tag: "Workshop", desc: "Hands-on technical sessions covering advanced architectures and robust scalable systems.", color: "from-rose-500 to-red-500", textColor: "text-rose-500", bgLight: "bg-rose-500", border: "border-rose-500" },
//     { time: "01:00 PM", duration: "1.5 Hours", title: "Networking Lunch", tag: "Social", desc: "Catered lunch at the Skybridge. An excellent opportunity to meet potential co-founders and investors.", color: "from-amber-500 to-orange-500", textColor: "text-amber-500", bgLight: "bg-amber-500", border: "border-amber-500" },
//     { time: "02:30 PM", duration: "2 Hours", title: "Future of Web3", tag: "Panel", desc: "Leading experts debate the long-term impacts of blockchain and decentralization on global infrastructure.", color: "from-emerald-500 to-teal-400", textColor: "text-emerald-500", bgLight: "bg-emerald-500", border: "border-emerald-500" },
//     { time: "05:00 PM", duration: "2 Hours", title: "Grand Finale Gala", tag: "Closing", desc: "The conclusive celebration. Live entertainment, final remarks, and the announcement of the 2027 location.", color: "from-purple-600 to-pink-500", textColor: "text-purple-500", bgLight: "bg-purple-500", border: "border-purple-500" },