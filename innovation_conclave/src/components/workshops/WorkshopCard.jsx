import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineCalendar, HiArrowRight } from 'react-icons/hi';

const WorkshopCard = ({ workshop, index = 0, className = "", onEnroll }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-sm overflow-hidden bg-slate-950 shadow-2xl transition-all duration-700 hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] block w-full h-[400px] border border-white/10 ${className}`}
    >
      {/* Background Image that comes into focus on hover */}
      <img
        src={workshop.image || "https://images.unsplash.com/photo-1517245385169-d391a92e626e?q=80&w=800&auto=format&fit=crop"}
        alt={workshop.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 blur-[8px] group-hover:blur-0 scale-110 group-hover:scale-100 transition-all duration-[1200ms] ease-out"
      />

      {/* Gradients to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-orange-300/40 group-hover:bg-orange-300/10 mix-blend-overlay transition-colors duration-700 pointer-events-none" />

      {/* Content Container */}
      <div className="relative w-full h-full p-8 flex flex-col justify-between z-10">

        {/* Top: Category & Availability */}
        <div className="flex items-start justify-between w-full">
          <span className="inline-block px-4 py-2 rounded-sm bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xl">
            {workshop.category}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-white/90 font-bold text-xs sm:text-sm bg-black/50 backdrop-blur-xl px-4 py-2 rounded-sm border border-white/10 shadow-xl">
              {workshop.seats} Seats Left
            </span>
          </div>
        </div>

        {/* Bottom: Workshop Details */}
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
          <h3 className="text-3xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight group-hover:text-orange-300 transition-colors duration-500 drop-shadow-md">
            {workshop.title}
          </h3>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-white/80 text-xs sm:text-sm font-bold mb-6">
            <div className="flex items-center gap-1.5 bg-white/5 py-1.5 px-3 rounded-sm backdrop-blur-sm border border-white/10">
              <HiOutlineUser className="w-4 h-4 text-orange-300" />
              <span>{workshop.instructor}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 py-1.5 px-3 rounded-sm backdrop-blur-sm border border-white/10">
              <HiOutlineCalendar className="w-4 h-4 text-purple-400" />
              <span>{workshop.date}, {workshop.time}</span>
            </div>
          </div>

          {/* Action Button that fades in */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onEnroll) onEnroll(workshop);
              }}
              className="flex items-center justify-center gap-2 w-full py-4 bg-orange-300 hover:bg-orange-300 text-white rounded-sm font-bold shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95 transition-all text-sm uppercase tracking-wide">
              Enroll in Workshop <HiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkshopCard;
