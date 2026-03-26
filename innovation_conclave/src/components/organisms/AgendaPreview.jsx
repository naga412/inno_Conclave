// components/organisms/AgendaPreview.jsx
import { motion } from "framer-motion";

const agendaItems = [
    { time: "09:00 AM", title: "Registration & Welcome", tag: "Opening" },
    { time: "10:00 AM", title: "Keynote Address", tag: "Keynote" },
    { time: "11:30 AM", title: "Innovation Expo Opens", tag: "Expo" },
    { time: "02:00 PM", title: "Startup Pitch Competition", tag: "Compete" },
    { time: "04:30 PM", title: "Panel Discussion", tag: "Discussion" },
    { time: "06:00 PM", title: "Awards & Closing", tag: "Closing" },
];

export default function AgendaPreview() {
    return (
        <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300 relative z-10">
            <div className="max-w-5xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">Event Agenda</h2>
                    <p className="mt-1 text-base text-slate-500 dark:text-slate-400 transition-colors duration-300">A full day of learning, pitching, and connecting.</p>
                </div>

                {/* Agenda List */}
                <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-white/5 transition-colors duration-300 bg-white dark:bg-white/5 shadow-sm">
                    {agendaItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                             className="flex items-center gap-5 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors duration-300"
                        >
                            <span className="text-sm text-slate-400 font-mono w-24 shrink-0 transition-colors duration-300">{item.time}</span>
                            <div className="w-px h-6 bg-slate-200 shrink-0 transition-colors duration-300" />
                             <p className="flex-1 text-base font-medium text-slate-800 dark:text-slate-200 transition-colors duration-300">{item.title}</p>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 px-3 py-1 rounded-full shrink-0 transition-colors duration-300">
                                {item.tag}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
