import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FilterTabs from "../components/molecules/FilterTabs";
import AgendaTimeline from "../components/organisms/AgendaTimeline";

const MOCK_AGENDA = [
  {
    time: "09:00 AM - 10:00 AM",
    title: "Registration & Breakfast",
    speaker: "Event Team",
    category: "Day 1",
    location: "Main Lobby",
    description: "Check-in, collect your badges, and grab some breakfast before the event starts.",
  },
  {
    time: "10:00 AM - 11:00 AM",
    title: "AI & Future Innovation",
    speaker: "Dr. Rahul Sharma",
    category: "Keynote",
    location: "Hall A",
    description: "An engaging discussion on emerging AI technologies and how they will shape our future.",
  },
  {
    time: "11:30 AM - 01:00 PM",
    title: "Building Scalable Web Apps",
    speaker: "Jane Doe",
    category: "Workshops",
    location: "Room 101",
    description: "Hands-on workshop exploring best practices for building robust and scalable web applications.",
  },
  {
    time: "02:00 PM - 03:00 PM",
    title: "Cybersecurity in 2026",
    speaker: "Alex Mercer",
    category: "Day 1",
    location: "Hall B",
    description: "Understanding the evolving threat landscape and next-generation security strategies.",
  },
  {
    time: "09:30 AM - 10:30 AM",
    title: "The Future of Quantum Computing",
    speaker: "Dr. Sylvia Wright",
    category: "Keynote",
    location: "Main Auditorium",
    description: "A deep dive into quantum algorithms and their real-world applications.",
  },
  {
    time: "11:00 AM - 12:30 PM",
    title: "UI/UX Design Masterclass",
    speaker: "David Lee",
    category: "Workshops",
    location: "Room 205",
    description: "Learn how to craft beautiful, user-centric interfaces from industry leaders.",
  },
  {
    time: "02:00 PM - 03:00 PM",
    title: "Panel: Startup Ecosystem",
    speaker: "Various Founders",
    category: "Day 2",
    location: "Hall A",
    description: "A candid conversation with startup founders sharing their journey, challenges, and successes.",
  }
];

const FILTERS = ["All", "Day 1", "Day 2", "Workshops", "Keynotes"];

export default function AgendaPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredAgenda = MOCK_AGENDA.filter((session) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Day 1") return session.category.includes("Day 1");
    if (activeFilter === "Day 2") return session.category.includes("Day 2");
    if (activeFilter === "Workshops") return session.category === "Workshops";
    if (activeFilter === "Keynotes") return session.category === "Keynote";
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-center pointer-events-none opacity-20 z-0 text-slate-900">
          <div className="w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px] mix-blend-multiply opacity-20 -top-64 absolute"></div>
          <div className="w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] mix-blend-multiply opacity-10 top-32 left-0 absolute"></div>
        </div>

        {/* Soft Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 transition-opacity duration-300"></div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
            Event <span className="text-blue-600 dark:text-blue-500">Agenda</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 transition-colors duration-300">
            Explore sessions, workshops, and keynote talks. Plan your schedule to make the most out of Innovation Conclave 2026.
          </p>
        </div>
      </section>

      {/* AGENDA SECTION */}
      <section className="relative z-10 container mx-auto px-6 pb-20 max-w-5xl">
        <FilterTabs 
          filters={FILTERS} 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />
        
        <AgendaTimeline sessions={filteredAgenda} />
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 py-24 transition-colors duration-300 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Don't miss out on these insights</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto transition-colors duration-300">
            Join hundreds of innovators, founders, and creators at this year's most anticipated tech gathering.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
              Register Now
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-white/10 transition-all">
              View Speakers
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer Placeholder */}
      <footer className="border-t border-slate-100 dark:border-white/5 py-8 text-center text-slate-400 dark:text-slate-500 text-sm transition-colors duration-300">
        <p>&copy; 2026 Innovation Conclave. All rights reserved.</p>
      </footer>
    </div>
  );
}
