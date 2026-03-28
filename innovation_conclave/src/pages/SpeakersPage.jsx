import React, { useState } from "react";
import SpeakerFilter from "../components/speakers/SpeakerFilter";
import SpeakersGrid from "../components/speakers/SpeakersGrid";

const MOCK_SPEAKERS = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    role: "AI Research Lead",
    company: "Google",
    category: "Keynote Speakers",
    image: "https://i.pravatar.cc/300?u=rahul",
    bio: "Expert in AI and Machine Learning innovation. Leading the charge in next-generation neural networks."
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "VP of Engineering",
    company: "TechNova",
    category: "Guest Speakers",
    image: "https://i.pravatar.cc/300?u=jane",
    bio: "Scaling engineering teams and building high-performance decentralized systems."
  },
  {
    id: 3,
    name: "Alex Mercer",
    role: "Chief Information Security Officer",
    company: "CyberDefend",
    category: "Panelists",
    image: "https://i.pravatar.cc/300?u=alex",
    bio: "Over 15 years experience in navigating evolving threat landscapes and enterprise security strategies."
  },
  {
    id: 4,
    name: "David Lee",
    role: "Head of Product Design",
    company: "CreativeCloud",
    category: "Workshop Mentors",
    image: "https://i.pravatar.cc/300?u=david",
    bio: "Dedicated to the intersection of human psychology and digital interfaces. Award-winning designer."
  },
  {
    id: 5,
    name: "Dr. Sylvia Wright",
    role: "Quantum Computing Researcher",
    company: "IBM Research",
    category: "Keynote Speakers",
    image: "https://i.pravatar.cc/300?u=sylvia",
    bio: "Pioneering new algorithms in the quantum computing space with real-world applications."
  },
  {
    id: 6,
    name: "Mike Townsend",
    role: "Founder & CEO",
    company: "BuildFast.io",
    category: "Panelists",
    image: "https://i.pravatar.cc/300?u=mike",
    bio: "Serial entrepreneur discussing the startup ecosystem, raising capital, and building products quickly."
  },
  {
    id: 7,
    name: "Elena Rostova",
    role: "Lead Blockchain Engineer",
    company: "Web3 Global",
    category: "Workshop Mentors",
    image: "https://i.pravatar.cc/300?u=elena",
    bio: "Smart contract auditor and protocol developer. Passionate about decentralizing the internet."
  },
  {
    id: 8,
    name: "Samuel Jackson",
    role: "Cloud Architect",
    company: "Amazon Web Services",
    category: "Guest Speakers",
    image: "https://i.pravatar.cc/300?u=samuel",
    bio: "Designing massively scalable cloud infrastructures for Fortune 500 companies globally."
  }
];

const FILTERS = ["All", "Keynote Speakers", "Guest Speakers", "Workshop Mentors", "Panelists"];

export default function SpeakersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSpeakers = MOCK_SPEAKERS.filter((speaker) => {
    // Check search 
    const matchesSearch = speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.role.toLowerCase().includes(searchQuery.toLowerCase());

    // Check filter
    const matchesFilter = activeFilter === "All" || speaker.category === activeFilter;

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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 transition-opacity duration-300"></div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
            Meet Our <span className="text-blue-600 dark:text-blue-500">Speakers</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 transition-colors duration-300">
            Industry leaders, innovators, and visionaries shaping the future. Discover the brilliant minds behind Innovation Conclave 2026.
          </p>
        </div>
      </section>

      {/* FILTER & GRID SECTION */}
      <section className="relative z-10 container mx-auto px-6 pb-24 max-w-7xl">
        <SpeakerFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <SpeakersGrid speakers={filteredSpeakers} />
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 bg-gradient-to-b from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-950 dark:to-[#0b1120] py-24 transition-colors duration-300 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Want to hear them speak?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto transition-colors duration-300">
            Check out the agenda to see exactly when and where these industry experts will be taking the stage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
              Register Now
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-white/10 transition-all">
              View Agenda
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
