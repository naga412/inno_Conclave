import React, { useState, useMemo } from 'react';
import WorkshopFilter from '../components/workshops/WorkshopFilter';
import WorkshopsGrid from '../components/workshops/WorkshopsGrid';

const mockWorkshops = [
  {
    id: 1,
    title: "AI for Beginners",
    instructor: "Dr. Rahul Sharma",
    category: "Artificial Intelligence",
    level: "Beginner",
    date: "March 28",
    time: "10:00 AM",
    duration: "2 Hours",
    seats: 25,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    instructor: "Sarah Jenkins",
    category: "Web Development",
    level: "Advanced",
    date: "March 28",
    time: "02:00 PM",
    duration: "3 Hours",
    seats: 12,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "IoT Security Essentials",
    instructor: "Mark Thompson",
    category: "Cybersecurity",
    level: "Intermediate",
    date: "March 29",
    time: "11:00 AM",
    duration: "2.5 Hours",
    seats: 18,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Design Thinking Workshop",
    instructor: "Emily Chen",
    category: "Design Thinking",
    level: "Beginner",
    date: "March 29",
    time: "03:00 PM",
    duration: "2 Hours",
    seats: 30,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Startup Fundamentals",
    instructor: "James Wilson",
    category: "Entrepreneurship",
    level: "Beginner",
    date: "March 30",
    time: "10:00 AM",
    duration: "4 Hours",
    seats: 40,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Neural Networks with Python",
    instructor: "Dr. Anita Gupta",
    category: "Data Science",
    level: "Advanced",
    date: "March 30",
    time: "01:00 PM",
    duration: "3 Hours",
    seats: 15,
    image: "https://images.unsplash.com/photo-1509228468518-180dd486490e?q=80&w=800&auto=format&fit=crop"
  }
];

const WorkshopsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkshops = useMemo(() => {
    return mockWorkshops.filter((workshop) => {
      const matchesCategory = activeCategory === "All" || workshop.category === activeCategory;
      const matchesLevel = activeLevel === "All" || workshop.level === activeLevel;
      const matchesSearch =
        workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [activeCategory, activeLevel, searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 blur-[120px] rounded-full dark:opacity-30"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-indigo-600/20 blur-[100px] rounded-full dark:opacity-20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
              Hands-On Learning
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Innovation <span className="text-blue-600 dark:text-blue-500">Workshops</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Learn directly from industry experts and build real-world skills.
              Join our interactive sessions to master technologies driving the future.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Grid Section */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <WorkshopFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <WorkshopsGrid workshops={filteredWorkshops} />
        </div>
      </section>

      {/* Featured CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-950 dark:to-[#0b1120] relative overflow-hidden text-center transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Ready to expand your horizons?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
            Limited seats available for premium workshops. Secure your spot now and be part of the innovation journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/10 transition-all active:scale-95">
              Register for Event
            </button>
            <button className="px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold rounded-2xl transition-all active:scale-95">
              View All Agenda
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;
