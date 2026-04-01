import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import AgendaCard from "./AgendaCard";

export default function AgendaTimeline({ sessions }) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    if (!sessions || sessions.length === 0) {
        return (
            <div className="max-w-4xl mx-auto text-center py-20 border border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] bg-slate-50 dark:bg-white/5 transition-colors">
                <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">No sessions scheduled for this day yet.</h3>
                <p className="text-slate-500 dark:text-slate-500 mt-2">Filter between Day 1 and Day 2 to see the full schedule.</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full pb-32">
            {sessions.map((session, i) => {
                const targetScale = 1 - ((sessions.length - i) * 0.05);
                // Scale range calculations based on how many cards are present
                const range = [i * (1 / (sessions.length || 1)), 1];
                return (
                    <AgendaCard
                        key={i}
                        i={i}
                        session={session}
                        progress={scrollYProgress}
                        range={range}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>
    );
}
