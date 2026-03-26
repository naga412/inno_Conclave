import React from "react";

export default function SpeakerCard({ speaker }) {
  const { name, role, company, category, image, bio } = speaker;

  return (
    <div className="group relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-black/50 flex flex-col items-center p-6 text-center">
      {/* Category Tag */}
      <div className="absolute top-4 right-4">
        <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-wider font-bold uppercase bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 transition-colors duration-300">
          {category}
        </span>
      </div>

      {/* Speaker Image */}
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 dark:border-slate-800 group-hover:border-blue-200 dark:group-hover:border-blue-900 transition-colors duration-300 shadow-sm">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=0f172a&color=e2e8f0";
          }}
        />
      </div>

      {/* Content */}
      <div className="mb-6 grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-300">{name}</h3>
        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-1 transition-colors duration-300">{role}</p>
        <p className="text-slate-400 dark:text-slate-500 text-xs tracking-wide uppercase mb-4 transition-colors duration-300">{company}</p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 transition-colors duration-300">
          {bio}
        </p>
      </div>

      {/* View Profile Action */}
      <button 
        onClick={() => alert(`Opening profile for ${name}`)}
        className="w-full py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
      >
        View Profile
      </button>
    </div>
  );
}
