import React from "react";
import SpeakerCard from "./SpeakerCard";

export default function SpeakersGrid({ speakers }) {
  if (!speakers || speakers.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/5 backdrop-blur-sm transition-colors duration-300">
        <h3 className="text-xl text-slate-600 dark:text-slate-300 font-semibold mb-2 transition-colors duration-300">No speakers found</h3>
        <p className="text-slate-500 dark:text-slate-500 transition-colors duration-300">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {speakers.map((speaker, idx) => (
        <SpeakerCard key={speaker.id || idx} speaker={speaker} />
      ))}
    </div>
  );
}
