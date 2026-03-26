import React from 'react';
import WorkshopCard from './WorkshopCard';

const WorkshopsGrid = ({ workshops }) => {
  if (workshops.length === 0) {
    return (
      <div className="py-24 text-center border border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] bg-slate-50 dark:bg-slate-900/20 transition-colors">
        <h3 className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-2 transition-colors">No workshops found</h3>
        <p className="text-slate-500 dark:text-slate-500 transition-colors">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {workshops.map((workshop, idx) => {
        // Bento layout logic: 0th and 3rd items seamlessly span 2 columns dynamically on large screens
        const isWide = idx % 4 === 0 || idx % 4 === 3;
        const colSpanClass = isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1";
        
        return (
          <WorkshopCard 
            key={workshop.id} 
            index={idx} 
            workshop={workshop} 
            className={colSpanClass}
          />
        );
      })}
    </div>
  );
};

export default WorkshopsGrid;
