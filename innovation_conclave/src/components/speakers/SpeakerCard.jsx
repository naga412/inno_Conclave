import React from "react";
import { motion } from "framer-motion";

export default function SpeakerCard({ speaker, index = 0 }) {
  const { name, role, company, category, image } = speaker;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group relative w-full aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Full Cover Image */}
      <img
        src={image || "https://i.pravatar.cc/300"}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        onError={(e) => {
          e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=0f172a&color=e2e8f0";
        }}
      />

      {/* Seamless Top Blur Gradient for Sharp Text */}
      <div className="absolute top-0 left-0 right-0 h-48 backdrop-blur-2xl bg-black/30 [mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

      {/* Bottom gradient matching the image vibe */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/95 transition-colors duration-500 pointer-events-none" />

      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-block px-3 py-1 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 text-white text-[10px] tracking-wider font-bold uppercase rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Top Text (Name) */}
      <div className="absolute top-12 w-full text-center px-4 opacity-0 -translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-[50ms]">
        <h3 className="text-[1.8rem] font-medium text-white tracking-wide drop-shadow-lg">{name}</h3>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        {/* Left: Little avatar and role info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-slate-200 overflow-hidden border-2 border-white/20 shrink-0">
            <img
              src={image || "https://i.pravatar.cc/300"}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=0f172a&color=e2e8f0";
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-white font-medium text-sm leading-tight truncate">@{company.toLowerCase().replace(/\s+/g, '')}</p>
            <p className="text-white/70 text-xs mt-0.5 truncate">{role}</p>
          </div>
        </div>

        {/* Right: Button */}
        <button className="bg-white text-slate-900 font-semibold px-5 py-2.5 rounded-sm shadow-lg flex items-center gap-2 hover:bg-slate-100 hover:scale-105 transition-all text-sm shrink-0">
          <span className="text-lg leading-none mb-0.5">+</span> Connect
        </button>
      </div>
    </motion.div>
  );
}
