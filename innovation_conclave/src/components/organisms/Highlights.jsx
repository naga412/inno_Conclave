// components/organisms/Highlights.jsx
import { motion } from "framer-motion";
import { HiOutlineLightBulb, HiOutlineMicrophone, HiOutlineChartBar } from "react-icons/hi";

const cards = [
    {
        icon: <HiOutlineLightBulb className="text-3xl text-blue-600 dark:text-blue-400" />,
        title: "Innovation Expo",
        description: "Discover projects and prototypes from students and startups shaping tomorrow's technology.",
    },
    {
        icon: <HiOutlineMicrophone className="text-3xl text-blue-600 dark:text-blue-400" />,
        title: "Expert Talks",
        description: "Learn directly from industry professionals and researchers driving real-world change.",
    },
    {
        icon: <HiOutlineChartBar className="text-3xl text-blue-600 dark:text-blue-400" />,
        title: "Startup Pitch",
        description: "Watch teams compete for funding by pitching bold ideas to experienced investors.",
    },
];

export default function Highlights() {
    return (
        <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300 relative z-10">
            <div className="max-w-5xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">Event Highlights</h2>
                    <p className="mt-1 text-base text-slate-500 dark:text-slate-400 transition-colors duration-300">Three experiences you won't want to miss.</p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.08 }}
                            className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 hover:border-blue-500/50 dark:hover:border-blue-500/30 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-black/50 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-5 transition-colors duration-300">
                                {card.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{card.title}</h3>
                            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">{card.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
