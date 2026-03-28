import React from "react";
import { Clock, User, MapPin, Tag } from "lucide-react";

export default function AgendaCard({ session }) {
  const { time, title, speaker, category, location, description } = session;

  return (
    <div className="relative pl-8 sm:pl-32 group">
      {/* Timeline Dot & Line */}
      <div className="absolute left-0 sm:left-22 top-10 flex flex-col items-center w-8">
        <div className="h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-950 z-10 shadow-sm transition-colors duration-300"></div>
        <div className="h-full w-px bg-slate-200 dark:bg-white/10 absolute top-4 group-last-of-type:hidden transition-colors duration-300"></div>
      </div>

      {/* Time for larger screens */}
      <div className="hidden sm:block absolute left-0 top-9 w-20 text-right">
        <span className="text-sm font-bold text-blue-500 dark:text-blue-400">{time.split(" - ")[0]}</span>
      </div>

      {/* Content Card */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/5 dark:hover:shadow-black/50">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:hidden text-blue-600 font-bold text-sm">
              <Clock size={16} />
              {time}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 transition-colors duration-300">
              {description}
            </p>
          </div>
          <div className="shrink-0 flex sm:flex-col gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
              <Tag size={12} className="mr-1" />
              {category}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-white/5 text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <User size={16} className="text-blue-500 dark:text-blue-400" />
            <span>{speaker}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="hidden sm:inline-block text-blue-500 dark:text-blue-400" />
            <span className="hidden sm:inline-block">{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-500 dark:text-blue-400" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
