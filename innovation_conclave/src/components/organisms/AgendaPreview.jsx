import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineClock, HiArrowRight, HiOutlineSparkles } from "react-icons/hi";

// Data
const agendaItems = [
    { time: "09:00 AM", duration: "1 Hour", title: "Registration & Welcome", tag: "Opening", desc: "Check-in, grab your badge, and enjoy complimentary coffee while networking with early arrivals.", color: "from-blue-600 to-cyan-500", textColor: "text-blue-500", bgLight: "bg-blue-500/10", border: "border-blue-500/20" },
    { time: "10:00 AM", duration: "1.5 Hours", title: "Keynote Address", tag: "Keynote", desc: "Visionary insights from industry leaders on the future of technology and how AI is shaping the landscape.", color: "from-purple-600 to-pink-500", textColor: "text-purple-500", bgLight: "bg-purple-500/10", border: "border-purple-500/20" },
    { time: "11:30 AM", duration: "2 Hours", title: "Innovation Expo", tag: "Expo", desc: "The showcase floor officially opens. Discover over 50+ cutting-edge prototypes from top university teams.", color: "from-emerald-500 to-teal-400", textColor: "text-emerald-500", bgLight: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { time: "02:00 PM", duration: "2.5 Hours", title: "Startup Pitch", tag: "Compete", desc: "Top 10 early-stage startups pitch for seed funding to a panel of expert angel investors and VCs.", color: "from-amber-500 to-orange-500", textColor: "text-amber-500", bgLight: "bg-amber-500/10", border: "border-amber-500/20" },
    { time: "04:30 PM", duration: "1.5 Hours", title: "Panel: AI & Ethics", tag: "Discussion", desc: "A deep dive into the ethical implications of autonomous systems and responsible development.", color: "from-rose-500 to-red-500", textColor: "text-rose-500", bgLight: "bg-rose-500/10", border: "border-rose-500/20" },
    { time: "06:00 PM", duration: "1 Hour", title: "Awards & Closing", tag: "Closing", desc: "Celebrating the pitch competition winners and wrapping up an incredible day of high-impact innovation.", color: "from-indigo-500 to-blue-600", textColor: "text-indigo-500", bgLight: "bg-indigo-500/10", border: "border-indigo-500/20" },
];

function Card({ item, i, progress, range, targetScale }) {
    const containerRef = useRef(null);

    // Creates the shrink effect for the background cards based on parent scroll progress
    // When the scroll progress reaches its range, the scale animates smoothly downwards
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, range, [1, 0.4]);

    return (
        <div ref={containerRef} className="h-screen w-full flex items-center justify-center sticky top-0 px-6 sm:px-12">
            <motion.div 
                style={{ scale, opacity, top: `calc(-5vh + ${i * 25}px)` }} // the top offset visually stacks them like a deck of cards
                className={`relative w-full max-w-5xl h-[550px] md:h-[450px] flex flex-col md:flex-row items-center rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden`}
            >
                {/* Left Sidebar (Color Banner with Time) */}
                <div className={`w-full md:w-1/3 h-40 md:h-full bg-gradient-to-br ${item.color} p-8 flex flex-col justify-between relative overflow-hidden shrink-0`}>
                    {/* Glowing Orbs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full mix-blend-overlay pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 blur-3xl rounded-full mix-blend-overlay pointer-events-none" />
                    
                    <div className="relative z-10 flex items-center justify-between w-full h-full md:flex-col md:items-start md:justify-end">
                        <span className="text-white/90 font-bold tracking-[0.2em] uppercase text-sm mix-blend-overlay">
                            {item.tag}
                        </span>
                        <div className="flex flex-col items-end md:items-start">
                            <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tighter drop-shadow-sm leading-none">
                                {item.time.split(" ")[0]}
                            </span>
                            <span className="text-xl md:text-2xl font-bold text-white/80 mt-1 md:mt-2">
                                {item.time.split(" ")[1]}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="w-full md:w-2/3 h-full p-8 md:p-12 flex flex-col justify-center relative bg-white dark:bg-slate-900/50">
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-30 pointer-events-none ${item.bgLight}`} />
                    
                    <div className="relative z-10">
                        {/* Duration Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold border ${item.border} ${item.bgLight}`}>
                            <HiOutlineClock className={`w-5 h-5 ${item.textColor}`} />
                            <span className={item.textColor}>
                                {item.duration}
                            </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 md:mb-6 leading-tight">
                            {item.title}
                        </h3>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 md:mb-10 max-w-lg">
                            {item.desc}
                        </p>

                        {/* CTA action */}
                        <button className="flex items-center justify-between w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-[1.03] active:scale-95 transition-transform shadow-xl">
                            <span>Add to Calendar</span>
                            <HiArrowRight className="w-5 h-5 ml-4 text-blue-500" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function AgendaPreview() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section className="bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative z-10">
            
            {/* Header Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center gap-2 w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
                >
                    <HiOutlineSparkles className="w-8 h-8 text-blue-500" />
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-tight"
                >
                    The Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Schedule</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto"
                >
                    Follow the pulse of the day. A seamless flow of pioneering talks, explosive pitches, and collaborative momentum.
                </motion.p>
            </div>

            {/* The 3D Parallax Scrolling Deck */}
            <div ref={containerRef} className="relative w-full pb-[10vh]">
                {agendaItems.map((item, i) => {
                    // targetScale gets smaller down the stack to create a realistic 3D depth effect
                    const targetScale = 1 - ((agendaItems.length - i) * 0.05);
                    const range = [i * 0.15, 1]; // Calculates the scroll intersection range for shrinking
                    return (
                        <Card 
                            key={i} 
                            i={i} 
                            item={item} 
                            progress={scrollYProgress} 
                            range={range} 
                            targetScale={targetScale} 
                        />
                    );
                })}
            </div>
            
        </section>
    );
}
