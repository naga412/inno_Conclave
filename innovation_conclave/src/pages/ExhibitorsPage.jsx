import React, { useState } from "react";
import ExhibitorFilter from "../components/exhibitors/ExhibitorFilter";
import ExhibitorsGrid from "../components/exhibitors/ExhibitorsGrid";

const MOCK_EXHIBITORS = [
  {
    id: 1,
    name: "TechNova Labs",
    category: "AI & Robotics",
    booth: "A12",
    logo: "https://ui-avatars.com/api/?name=TechNova+Labs&background=0D8ABC&color=fff&rounded=true&bold=true",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "Building intelligent automation solutions for the next generation of industrial manufacturing.",
    website: "https://technova.com"
  },
  {
    id: 2,
    name: "GreenEarth Systems",
    category: "Sustainability",
    booth: "C05",
    logo: "https://ui-avatars.com/api/?name=Green+Earth&background=059669&color=fff&rounded=true&bold=true",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
    description: "Eco-friendly energy management platforms focusing on reducing carbon footprint for urban cities.",
    website: "https://greenearth.io"
  },
  {
    id: 3,
    name: "QuantumBits",
    category: "Technology",
    booth: "B21",
    logo: "https://ui-avatars.com/api/?name=Quantum+Bits&background=7C3AED&color=fff&rounded=true&bold=true",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    description: "Pioneering the future of quantum cryptography and secure communications for enterprise grade security.",
    website: "https://quantumbits.com"
  },
  {
    id: 4,
    name: "BioHealth Innovate",
    category: "Healthcare",
    booth: "D14",
    logo: "https://ui-avatars.com/api/?name=Bio+Health&background=E11D48&color=fff&rounded=true&bold=true",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    description: "Telemedicine and wearable health tracking devices integrated with real-time patient analytics.",
    website: "https://biohealth.org"
  },
  {
    id: 5,
    name: "EduSphere",
    category: "Education",
    booth: "E08",
    logo: "https://ui-avatars.com/api/?name=Edu+Sphere&background=D97706&color=fff&rounded=true&bold=true",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    description: "Interactive learning environments using AR/VR to revolutionize classroom experiences globally.",
    website: "https://edusphere.edu"
  },
  {
    id: 6,
    name: "RoboFoundry",
    category: "AI & Robotics",
    booth: "A15",
    logo: "https://ui-avatars.com/api/?name=Robo+Foundry&background=2563EB&color=fff&rounded=true&bold=true",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
    description: "Humanoid robotics for domestic assistance and specialized rescue operations in hazardous environments.",
    website: "https://robofoundry.net"
  },
  {
    id: 7,
    name: "SmartCities Inc.",
    category: "Technology",
    booth: "B03",
    logo: "https://ui-avatars.com/api/?name=Smart+Cities&background=4F46E5&color=fff&rounded=true&bold=true",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    description: "IoT infrastructure for optimized traffic management and waste reduction in developing smart cities.",
    website: "https://smartcities.com"
  },
  {
    id: 8,
    name: "PureFlow Tech",
    category: "Sustainability",
    booth: "C12",
    logo: "https://ui-avatars.com/api/?name=Pure+Flow&background=0891B2&color=fff&rounded=true&bold=true",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    description: "Advanced water filtration systems using nanotechnology to provide clean drinking water to remote areas.",
    website: "https://pureflow.tech"
  }
];

const FILTERS = ["All", "Startups", "Technology", "AI & Robotics", "Education", "Healthcare", "Sustainability", "Sponsors"];

export default function ExhibitorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredExhibitors = MOCK_EXHIBITORS.filter((exhibitor) => {
    const matchesSearch = exhibitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibitor.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Simple filter logic: if activeFilter is "Startups" or "Sponsors", we don't have mock data for them yet, but we'll show empty or all
    const matchesFilter = activeFilter === "All" || exhibitor.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-center pointer-events-none opacity-20 z-0">
          <div className="w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px] mix-blend-multiply opacity-20 -top-64 absolute"></div>
        </div>

        {/* Soft Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 transition-opacity duration-3s"></div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
            Explore Our <span className="text-blue-600 dark:text-blue-500">Exhibitors</span>
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

        <ExhibitorsGrid exhibitors={filteredExhibitors} />
      </section>

      {/* HIGHLIGHTS SECTION (Optional info block) */}
      <section className="relative z-10 py-16 bg-white dark:bg-white/5 border-y border-slate-100 dark:border-white/5 transition-colors duration-300">

        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-400 mb-1">50+</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">Exhibitors</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-blue-900 mb-1">100+</p>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Innovations</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-blue-900 mb-1">12</p>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Categories</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-blue-900 mb-1">Booth A-E</p>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Floors</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-950 dark:to-[#0b1120] transition-colors duration-300 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Become an Exhibitor</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Want to showcase your innovation to thousands of attendees? Secure your booth and join the digital exhibition hall.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
              Apply Now
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-white/10 transition-all">
              Exhibition Pack
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
