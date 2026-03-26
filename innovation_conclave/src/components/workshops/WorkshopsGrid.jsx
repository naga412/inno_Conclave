import React from 'react';
import WorkshopCard from './WorkshopCard';

const WorkshopsGrid = ({ workshops }) => {
  if (workshops.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-bold text-slate-500 dark:text-slate-400">No workshops found matching your criteria.</h3>
        <p className="text-slate-400 dark:text-slate-500 mt-2">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {workshops.map((workshop) => (
        <WorkshopCard key={workshop.id} workshop={workshop} />
      ))}
    </div>
  );
};

export default WorkshopsGrid;
