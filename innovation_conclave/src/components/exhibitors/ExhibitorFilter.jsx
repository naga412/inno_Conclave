import React from "react";
import { Search } from "lucide-react";

export default function ExhibitorFilter({
  searchQuery,
  onSearchChange,
  filters,
  activeFilter,
  onFilterChange
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
      {/* Search Bar */}
      <div className="relative w-full md:max-w-md group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-500 group-focus-within:text-orange-300 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by company name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-sm py-3 pl-10 pr-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-end">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-5 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${activeFilter === filter
              ? "bg-orange-300 text-white shadow-lg shadow-orange-300/20"
              : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
