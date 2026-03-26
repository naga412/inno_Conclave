import React from "react";
import { motion } from "framer-motion";
import { Layout, ExternalLink, MapPin } from "lucide-react";

export default function ExhibitorCard({ exhibitor, index = 0 }) {
  const { name, category, booth, logo, image, description, website } = exhibitor;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-none dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
      {/* Decorative Header Area (Uses Image if available) */}
      <div className="relative h-36 w-full bg-slate-50 dark:bg-slate-900/50 overflow-hidden group">
        {image && (
          <img 
            src={image} 
            alt={`${name} cover`} 
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent dark:from-[#0b1120] pointer-events-none" />
        
        {/* Category Pill */}
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-block px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] tracking-wider font-bold uppercase border border-white/20 text-white shadow-sm transition-colors">
            {category}
          </span>
        </div>
      </div>

      {/* Floating Logo Profile */}
      <div className="relative px-6 z-20 -mt-10 mb-4">
        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center p-3 transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3 overflow-hidden">
          {logo ? (
             <img src={logo} alt={name} className="w-full h-full object-contain" />
          ) : (
             <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-xl flex items-center justify-center transition-colors">
                 <Layout className="text-blue-500 dark:text-blue-400" size={28} />
             </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow transition-colors">
          {description}
        </p>

        {/* Footer Area */}
        <div className="pt-5 mt-auto border-t border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/50 transition-colors">
            <MapPin size={14} className="text-blue-500 dark:text-blue-400" />
            <span className="text-xs font-bold tracking-wide uppercase">Booth {booth}</span>
          </div>

          <button 
            onClick={() => window.open(website, "_blank")}
            aria-label={`Visit ${name} website`}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-500 text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-transparent cursor-pointer group/btn"
          >
            <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>

    </motion.div>
  );
}
