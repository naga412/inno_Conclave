import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HiOutlineLightBulb, HiOutlineMicrophone, HiOutlineChartBar, HiArrowRight } from "react-icons/hi";

const highlights = [
    {
        id: "expo",
        icon: <HiOutlineLightBulb className="w-8 h-8 md:w-20 md:h-20 text-white" />,
        title: "Innovation Expo",
        tag: "Discover",
        description: "Explore forward-thinking projects and disruptive prototypes from brilliant students and ambitious startups shaping tomorrow's technology.",
        imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2670",
        shadow: "shadow-blue-500/30 text-blue-600 dark:text-blue-400",
    },
    {
        id: "talks",
        icon: <HiOutlineMicrophone className="w-8 h-8 md:w-20 md:h-20 text-white" />,
        title: "Expert Talks",
        tag: "Engage",
        description: "Engage with industry vanguards and revolutionary researchers driving real-world change through interactive keynotes.",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070",
        shadow: "shadow-purple-500/30 text-purple-600 dark:text-purple-400",
    },
    {
        id: "pitch",
        icon: <HiOutlineChartBar className="w-8 h-8 md:w-20 md:h-20 text-white" />,
        title: "Startup Pitch",
        tag: "Compete",
        description: "Watch brilliant teams compete for seed funding by pitching bold, scalable ideas to experienced angel investors.",
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=2532",
        shadow: "shadow-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    }
];

// Highlight Text Component to detect intersection safely
function HighlightTextRow({ item, index, activeIndex, setActiveIndex }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    // Update parent state when this comes perfectly into the middle of the viewport
    if (isInView && activeIndex !== index) {
        setActiveIndex(index);
    }

    const isActive = activeIndex === index;

    return (
        <div
            ref={ref}
            className={`flex flex-col justify-center min-h-0 md:min-h-screen transition-opacity duration-700 mb-16 md:mb-0 opacity-100 md:${isActive ? 'opacity-100' : 'opacity-30'}`}
        >
            {/* Mobile Graphic (Rendered inline for phone view) */}
            <div className={`md:hidden mb-6 w-full aspect-[2/1] rounded-[0.5rem] bg-slate-900 flex items-center justify-center shadow-lg relative overflow-hidden`}>
                <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />

                <div className="w-16 h-16 rounded-[0.5rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg z-10">
                    {item.icon}
                </div>
            </div>

            <span className={`text-xs md:text-base font-bold tracking-[0.2em] uppercase mb-3 md:mb-4 ${item.shadow.split(' ')[1]} ${item.shadow.split(' ')[2]}`}>
                {item.tag}
            </span>
            <h3 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">
                {item.title}
            </h3>
            <p className="text-lg md:text-2xl leading-relaxed text-slate-600 dark:text-slate-400 max-w-lg mb-6 md:mb-10">
                {item.description}
            </p>
            <button className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base font-bold px-6 py-3 md:px-8 md:py-4 rounded-[0.5rem] md:rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-all w-full md:w-fit shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95">
                Explore The Program <HiArrowRight className="w-5 h-5 ml-1 md:ml-2" />
            </button>
        </div>
    );
}

export default function Highlights() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative z-10 w-full">

            {/* Massive Header Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-left md:text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[3.5rem] leading-[1.1] md:text-[6rem] font-extrabold text-slate-900 dark:text-white tracking-tighter"
                >
                    The<br className="hidden md:block" /> Highlights.
                </motion.h2>
            </div>

            {/* Sticky Timeline Layout */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col md:flex-row items-start pb-20 md:pb-40">

                {/* Left Side: Scrolling Text Content */}
                <div className="w-full md:w-1/2 md:py-[20vh] relative z-20 flex flex-col gap-8 md:gap-0">
                    {highlights.map((item, index) => (
                        <HighlightTextRow
                            key={item.id}
                            item={item}
                            index={index}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    ))}
                </div>

                {/* Right Side: Sticky Visual Content (Hidden on Mobile) */}
                <div className="hidden md:flex w-1/2 sticky top-0 h-screen items-center justify-center pl-12 lg:pl-24">
                    <div className="w-full aspect-[9/16] lg:aspect-square relative rounded-[0.5rem] bg-slate-950 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-slate-200/50 dark:border-white/10 dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)]">

                        {/* Smooth Crossfade Image Background */}
                        <AnimatePresence mode="popLayout">
                            <motion.img
                                key={activeIndex + "-img"}
                                src={highlights[activeIndex].imageUrl}
                                alt="Highlight feature visually"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 0.6, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Dark Gradient Overlay for Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-slate-900/10 pointer-events-none" />

                        {/* Floating Icon Animation */}
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={activeIndex + "-icon"}
                                initial={{ opacity: 0, y: 80, scale: 0.8, rotate: -10 }}
                                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, y: -80, scale: 1.2, rotate: 10 }}
                                transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                                className="absolute margin-top-[-20px] top-0 right-0 inset-0  pointer-events-none"
                            >
                                {/* Premium Glass Morphism Icon Box */}
                                <div className="w-48 h-48 lg:w-32 lg:h-32 rounded-br-[3rem] backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-10">
                                    {highlights[activeIndex].icon}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    );
}
