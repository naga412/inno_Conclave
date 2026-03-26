import React from "react";
import AgendaCard from "./AgendaCard";

export default function AgendaTimeline({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>No sessions found for this filter.</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Background timeline line for mobile */}
      <div className="absolute left-[0.9rem] sm:left-30 top-10 bottom-10 w-px bg-slate-200 transition-colors duration-300"></div>
      
      <div className="flex flex-col">
        {sessions.map((session, index) => (
          <AgendaCard key={index} session={session} />
        ))}
      </div>
    </div>
  );
}
