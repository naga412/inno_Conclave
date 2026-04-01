import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { exhibitors as exhibitorsAPI } from "../api/client";
import { Loader2, ArrowLeft, Building2, MapPin, Mail, Calendar, User, LayoutGrid } from "lucide-react";

export default function ExhibitorDetailsPage() {
  const { id } = useParams();
  const [exhibitor, setExhibitor] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const [profileData, projectsData] = await Promise.all([
          exhibitorsAPI.getPublicDetails(id),
          exhibitorsAPI.getPublicProjects(id)
        ]);
        setExhibitor(profileData);
        setProjects(projectsData);
      } catch (err) {
        setError(err.message || "Failed to load exhibitor details.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0b1120] text-slate-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-orange-400" />
        <p className="font-medium animate-pulse">Loading exhibitor dashboard...</p>
      </div>
    );
  }

  if (error || !exhibitor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0b1120]">
        <div className="text-center p-8 bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 shadow-2xl rounded-sm max-w-md w-full">
          <p className="text-red-500 mb-6 font-medium text-lg">{error || "Exhibitor not found"}</p>
          <Link to="/exhibitors" className="inline-flex items-center px-6 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-sm transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exhibitors
          </Link>
        </div>
      </div>
    );
  }

  const getImageUrl = (path) => path ? `http://localhost:4000/uploads/exhibitors/${path}` : null;
  const posterUrl = getImageUrl(exhibitor.poster_path);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 font-sans selection:bg-orange-600 selection:text-white transition-colors duration-300 pb-24">
      {/* Dynamic Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Abstract Glowing Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-center pointer-events-none opacity-30 z-0">
          <div className="w-[800px] h-[800px] bg-indigo-500 rounded-full blur-[150px] mix-blend-multiply opacity-20 -top-64 absolute"></div>
          <div className="w-[600px] h-[600px] bg-orange-400 rounded-full blur-[120px] mix-blend-multiply opacity-20 right-0 top-0 absolute"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <Link to="/exhibitors" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors mb-12 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exhibitors
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Col: Poster / Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <div className="relative rounded-sm overflow-hidden bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 aspect-[4/5] group">
                {posterUrl ? (
                  <img src={posterUrl} alt={exhibitor.org_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                    <Building2 className="w-20 h-20 text-slate-300 dark:text-slate-600 mb-4" />
                    <span className="text-slate-400 text-sm tracking-widest uppercase font-bold">No Poster</span>
                  </div>
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Right Col: Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8 flex flex-col justify-center"
            >
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="inline-block px-4 py-1.5 rounded-sm bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs tracking-wider uppercase font-bold border border-orange-500/20 backdrop-blur-md hidden sm:inline-block">
                  Verified Exhibitor
                </span>
                <span className="inline-block px-4 py-1.5 rounded-sm bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs tracking-wider uppercase font-bold border border-indigo-500/20 backdrop-blur-md">
                  {exhibitor.org_type || "Startup"}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                {exhibitor.org_name}
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
                {exhibitor.tagline || "Innovating the future, today."}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-sm shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Contact Person</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{exhibitor.contact_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Email Address</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{exhibitor.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Joined In</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {new Date(exhibitor.registered_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Exhibition Booth</p>
                    <p className="font-semibold text-slate-900 dark:text-white">To Be Assigned</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 container mx-auto px-6 max-w-7xl pt-12">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-200 dark:border-slate-800 pb-6">
          <LayoutGrid className="w-8 h-8 text-orange-400" />
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Showcase Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="py-24 text-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-sm border border-dashed border-slate-300 dark:border-slate-700">
            <LayoutGrid className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">No projects have been uploaded yet.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {projects.map((project, pIdx) => {
              let parsedImages = [];
              try {
                parsedImages = typeof project.images === 'string' ? JSON.parse(project.images) : project.images;
              } catch(e) { console.error('Error parsing project images', e); }
              if (!Array.isArray(parsedImages)) parsedImages = [];

              return (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/[0.02]">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-4xl">{project.description}</p>
                  </div>

                  {parsedImages.length > 0 && (
                    <div className="p-6 md:p-8 bg-slate-100/50 dark:bg-slate-950/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {parsedImages.map((img, i) => (
                          <div key={i} className="relative aspect-video rounded-sm overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-sm">
                            <img 
                              src={getImageUrl(img)} 
                              alt={`${project.title} - Image ${i+1}`} 
                              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
