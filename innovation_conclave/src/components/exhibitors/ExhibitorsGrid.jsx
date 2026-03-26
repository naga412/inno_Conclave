import React from "react";
import ExhibitorCard from "./ExhibitorCard";

export default function ExhibitorsGrid({ exhibitors }) {
  if (!exhibitors || exhibitors.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-slate-200 rounded-2xl bg-slate-50 backdrop-blur-sm transition-colors duration-300">
        <h3 className="text-xl text-slate-600 font-semibold mb-2 transition-colors duration-300">No exhibitors found</h3>
        <p className="text-slate-400 transition-colors duration-300">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {exhibitors.map((exhibitor, idx) => (
        <ExhibitorCard key={exhibitor.id || idx} exhibitor={exhibitor} />
      ))}
    </div>
  );
}
