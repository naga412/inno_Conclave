import React from "react";

export default function FilterTabs({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-5 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${activeFilter === filter
              ? "bg-orange-300 text-white shadow-lg shadow-orange-300/20"
              : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
