import React, { useState } from "react";
import ExhibitorFilter from "../components/exhibitors/ExhibitorFilter";
import ExhibitorsGrid from "../components/exhibitors/ExhibitorsGrid";

import { exhibitors as exhibitorsAPI } from "../api/client";
import { Loader2 } from "lucide-react";

const FILTERS = ["All", "Startups", "Technology", "AI & Robotics", "Education", "Healthcare", "Sustainability", "Sponsors"];

export default function ExhibitorsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [exhibitors, setExhibitors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    async function loadExhibitors() {
      try {
        const data = await exhibitorsAPI.getPublicAll();
        const mapped = data.map(e => ({
          id: e.id,
          name: e.org_name,
          category: e.org_type || "Startups", // fallback category if empty
          booth: "TBA",
          logo: null, // UI Avatars maybe?
          image: e.poster_path ? `http://localhost:4000/uploads/exhibitors/${e.poster_path}` : null,
          description: e.tagline || 'No description provided yet.',
          website: null
        }));
        setExhibitors(mapped);
      } catch (err) {
        setError(err.message || "Failed to load exhibitors.");
      } finally {
        setLoading(false);
      }
    }
    loadExhibitors();
  }, []);

  const filteredExhibitors = exhibitors.filter((exhibitor) => {
    const matchesSearch = exhibitor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibitor.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === "All" || exhibitor.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 font-sans selection:bg-orange-600 selection:text-white transition-colors duration-300">

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-center pointer-events-none opacity-20 z-0">
          <div className="w-[800px] h-[800px] bg-orange-300 rounded-full blur-[150px] mix-blend-multiply opacity-20 -top-64 absolute"></div>
        </div>

        {/* Soft Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 transition-opacity duration-3s"></div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
            Explore Our <span className="text-orange-300 dark:text-orange-300">Exhibitors</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 transition-colors duration-300">
            Discover groundbreaking innovations, industry leaders, and visionary startups shaping the future technology landscape.
          </p>
        </div>
      </section>

      {/* FILTER & GRID SECTION */}
      <section className="relative z-10 container mx-auto px-6 pb-24 max-w-7xl">
        <ExhibitorFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-orange-400" />
            <p>Loading exhibitors...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 border border-slate-200 rounded-sm hover:bg-slate-50 text-slate-700">Try Again</button>
          </div>
        ) : (
          <ExhibitorsGrid exhibitors={filteredExhibitors} />
        )}
      </section>

      {/* HIGHLIGHTS SECTION (Optional info block) */}
      <section className="relative z-10 py-16 bg-white dark:bg-white/5 border-y border-slate-100 dark:border-white/5 transition-colors duration-300">

        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-extrabold text-orange-300 dark:text-orange-300 mb-1">50+</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">Exhibitors</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-orange-300 mb-1">100+</p>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Innovations</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-orange-300 mb-1">12</p>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Categories</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-orange-300 mb-1">Booth A-E</p>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Floors</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent to-slate-200 dark:bg-gradient-to-b dark:from-transparent dark:to-[#0b1120] transition-colors duration-300 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Become an Exhibitor</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Want to showcase your innovation to thousands of attendees? Secure your booth and join the digital exhibition hall.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-orange-300 hover:bg-orange-300 text-white rounded-sm font-bold shadow-lg shadow-orange-300/20 transition-all hover:scale-105 active:scale-95">
              Apply Now
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-sm font-bold border border-slate-200 dark:border-white/10 transition-all">
              Exhibition Pack
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
