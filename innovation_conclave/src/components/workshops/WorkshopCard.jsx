import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineClock, HiOutlineCalendar, HiOutlineTicket } from 'react-icons/hi';

const WorkshopCard = ({ workshop }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-500/30 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 dark:hover:shadow-black/50"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/0 z-10 transition-colors duration-300"></div>
        <img 
          src={workshop.image || "https://images.unsplash.com/photo-1517245385169-d391a92e626e?q=80&w=800&auto=format&fit=crop"} 
          alt={workshop.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
            {workshop.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {workshop.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm mb-4 text-slate-600 dark:text-slate-400">
          <HiOutlineUser className="text-blue-500 dark:text-blue-400" />
          <span>{workshop.instructor}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
            <HiOutlineCalendar className="text-blue-500 dark:text-blue-400" />
            <span>{workshop.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
            <HiOutlineClock className="text-blue-500 dark:text-blue-400" />
            <span>{workshop.time} ({workshop.duration})</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
            <HiOutlineTicket className="text-lg" />
            <span>{workshop.seats} Seats Left</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-900/10">
            Register Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkshopCard;
