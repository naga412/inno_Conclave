import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

const categories = [
  "All",
  "Artificial Intelligence",
  "Web Development",
  "IoT",
  "Cybersecurity",
  "Design Thinking",
  "Entrepreneurship",
  "Data Science"
];

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const WorkshopFilter = ({ activeCategory, setActiveCategory, activeLevel, setActiveLevel, searchQuery, setSearchQuery }) => {
  return (
    <div className="space-y-8 mb-12">
      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search workshops by title or instructor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 rounded-2xl py-4 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-8">
        {/* Categories */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest font-bold ml-1 text-slate-400">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/10"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Levels */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest font-bold ml-1 text-slate-400">Skill Level</label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeLevel === level
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/10"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopFilter;
