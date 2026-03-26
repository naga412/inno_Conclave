import React from "react";
import { Layout, ExternalLink, MapPin } from "lucide-react";

export default function ExhibitorCard({ exhibitor }) {
  const { name, category, booth, logo, description, website } = exhibitor;

  return (
    <div className="group relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-black/50 flex flex-col p-6">
      {/* Category Tag */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-2 flex items-center justify-center group-hover:border-blue-300 dark:group-hover:border-blue-500/30 transition-colors duration-300 shadow-sm">
          {logo ? (
            <img src={logo} alt={name} className="w-full h-full object-contain" />
          ) : (
            <Layout className="text-blue-600 dark:text-blue-400" size={32} />
          )}
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-wider font-bold uppercase bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 transition-colors duration-300">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 transition-colors duration-300">
          {description}
        </p>

        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-sm mb-6 transition-colors duration-300">
          <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
          <span className="font-semibold tracking-wide">Booth: {booth}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button 
          onClick={() => window.open(website, "_blank")}
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
        >
          View Details
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
