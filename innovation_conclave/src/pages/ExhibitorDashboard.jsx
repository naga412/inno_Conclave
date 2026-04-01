import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays, Users, Upload, X, Image as ImageIcon,
  MapPin, QrCode, Bell, LogOut, Star, Sun, Moon, Loader2, Plus, ArrowRight,
  CheckCircle2, XCircle, Clock, PartyPopper, Trophy, FileText, ExternalLink
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { exhibitors as exAPI, agenda as agendaAPI } from '../api/client';

const notices = [
  "Please bring 3 printed copies of your project poster to the event.",
  "Booth setup window: 7:30 AM – 9:00 AM on Day 1.",
];

export default function ExhibitorDashboard() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', files: [] });
  const [submittingProject, setSubmittingProject] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ic_token");
    const role = localStorage.getItem("ic_role");
    if (!token || role !== "exhibitor") {
      navigate("/login");
      return;
    }
    Promise.all([
      exAPI.getMe(),
      exAPI.getMyProjects(),
      agendaAPI.getAll().catch(() => [])
    ])
      .then(([profData, projData, agendaData]) => {
        setProfile(profData);
        setProjects(projData || []);

        const mapped = agendaData.map(a => ({
          time: a.time_label,
          event: a.title,
          day: a.day
        }));
        setSchedule(mapped);
      })
      .catch(err => {
        setError(err.message);
        if (err.status === 401 || err.status === 403) {
          localStorage.clear();
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (projectForm.files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    setSubmittingProject(true);
    const fd = new FormData();
    fd.append('title', projectForm.title);
    fd.append('description', projectForm.description);
    projectForm.files.forEach(f => fd.append('images', f));

    try {
      await exAPI.addProject(fd);
      const updatedProjects = await exAPI.getMyProjects();
      setProjects(updatedProjects);
      setShowProjectModal(false);
      setProjectForm({ title: '', description: '', files: [] });
    } catch (err) {
      alert("Failed to add project: " + err.message);
    } finally {
      setSubmittingProject(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ic_token");
    localStorage.removeItem("ic_role");
    localStorage.removeItem("ic_user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-orange-300" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <p className="text-red-500 font-bold mb-3">{error || "Failed to load profile"}</p>
          <button onClick={() => navigate("/login")} className="text-orange-300 font-bold hover:underline">Go to Login</button>
        </div>
      </div>
    );
  }

  const e = profile;
  const statusColor = e.status === "approved"
    ? "bg-emerald-400/20 border-emerald-300/30 text-emerald-300"
    : e.status === "rejected"
      ? "bg-red-400/20 border-red-300/30 text-red-300"
      : "bg-amber-400/20 border-amber-300/30 text-amber-300";
  const statusLabel = e.status === "approved" ? <span className="flex items-center justify-center gap-1"><CheckCircle2 className="w-4 h-4" /> Approved</span>
    : e.status === "rejected" ? <span className="flex items-center justify-center gap-1"><XCircle className="w-4 h-4" /> Rejected</span>
      : <span className="flex items-center justify-center gap-1"><Clock className="w-4 h-4" /> Pending</span>;

  const dynamicNotices = [
    ...(e.status === "pending" ? ["Your application is under review. You'll be notified once approved."] : []),
    ...(e.status === "approved" ? ["Your payment has been verified. Booth details will be emailed within 24 hours."] : []),
    ...(e.status === "rejected" ? ["Your application was not approved. Please contact admin for details."] : []),
    ...notices,
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        {/* Top App Bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-orange-600 to-blue-600 flex items-center justify-center font-extrabold text-white text-sm shadow-lg">
              {e.org_name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight">{e.org_name}</p>
              <p className="text-[10px] text-slate-400 font-medium">Exhibitor · {e.org_type === "college" ? `College (${e.college_year} Year)` : "Startup / Company"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-sm bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="relative p-2.5 rounded-sm bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 flex flex-col gap-8">

          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-blue-300 to-blue-600 rounded-sm p-7 md:p-10 overflow-hidden shadow-2xl shadow-orange-300/20"
          >
            <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute right-20 bottom-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/3 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2">Exhibitor Dashboard</p>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Welcome, {e.org_name}!</h1>
                  <PartyPopper className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[2]" />
                </div>
                <p className=" text-sm font-medium">Innovation Conclave 2026 · March 28–29 · AITAM, Tekkali</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm px-5 py-3 text-center">
                  <div className="flex justify-center mb-1"><Trophy className="w-7 h-7 text-white stroke-[2.5]" /></div>
                  <p className="text-orange-400 text-xs font-bold mt-1">Registered</p>
                </div>
                <div className={`backdrop-blur-sm border rounded-sm px-5 py-3 text-center ${statusColor}`}>
                  <p className="font-extrabold text-sm">{statusLabel}</p>
                  <p className="text-xs font-bold mt-1">₹500</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Status", value: e.status.charAt(0).toUpperCase() + e.status.slice(1), icon: Star, color: "text-orange-600", bg: "bg-orange-600 dark:bg-orange-600/20" },
              { label: "Type", value: e.org_type === "college" ? "College" : "Startup", icon: Users, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
              { label: "Contact", value: e.contact_name, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
              { label: "Days to Event", value: "3", icon: CalendarDays, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-sm ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white truncate">{s.value}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400" />
                <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">My Projects</h2>
              </div>
              <button onClick={() => setShowProjectModal(true)} className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-400 text-white rounded-sm text-sm font-bold shadow-lg shadow-orange-600/20 transition-all hover:scale-105 active:scale-95">
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-sm border border-dashed border-slate-200 dark:border-white/10">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-sm flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <ImageIcon className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-slate-500 tracking-wide font-medium text-sm">No projects added yet.</p>
                <p className="text-xs text-slate-400 mt-1">Upload projects to showcase your innovation.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((p) => {
                  const imgs = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images) : p.images) : [];
                  return (
                    <div key={p.id} className="group relative bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 rounded-sm overflow-hidden hover:shadow-lg transition-all">
                      {imgs.length > 0 ? (
                        <div className="h-40 w-full bg-slate-200 dark:bg-slate-900 relative">
                          <img src={`http://localhost:4000/uploads/exhibitors/${imgs[0]}`} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur text-white text-[10px] font-bold rounded-sm shrink-0">
                            {imgs.length} image{imgs.length > 1 ? 's' : ''}
                          </div>
                        </div>
                      ) : (
                        <div className="h-40 w-full bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-2 group-hover:text-orange-400 transition-colors">{p.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{p.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <Bell className="w-4 h-4 text-orange-600" />
                <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Important Notices</h2>
              </div>
              <div className="flex flex-col gap-3">
                {dynamicNotices.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-orange-600 dark:bg-orange-300/10 border border-orange-600 dark:border-orange-300/20 rounded-sm">
                    <div className="w-6 h-6 rounded-sm bg-orange-600 text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{n}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Exhibitor Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-4 h-4 text-orange-600" />
                <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Dashboard Overveiw</h2>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  ["Organisation", e.org_name],
                  ["Type", e.org_type === "college" ? `College — ${e.college_year} Year` : "Startup / Company"],
                  ["Contact", e.contact_name],
                  ["Email", e.email],
                  ...(e.tagline ? [["Tagline", e.tagline]] : []),
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{k}</p>
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{v}</p>
                  </div>
                ))}
              </div>

              {/* Added Documents Preview Section */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-4">Registration Documents</p>
                <div className="grid grid-cols-1 gap-3">
                  {e.poster_path && (
                    <a href={`http://localhost:4000/uploads/exhibitors/${e.poster_path}`} target="_blank" rel="noreferrer" 
                      className="group relative h-32 rounded-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-hidden flex items-center justify-center transition-all hover:border-orange-600/50">
                      <img src={`http://localhost:4000/uploads/exhibitors/${e.poster_path}`} alt="Poster" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <ImageIcon className="w-3.5 h-3.5 text-white" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Registration Poster</span>
                      </div>
                    </a>
                  )}
                  {e.payment_proof && (
                    <a href={`http://localhost:4000/uploads/exhibitors/${e.payment_proof}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/30 transition-all group">
                      <div className="w-8 h-8 rounded-sm bg-emerald-500/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-slate-900 dark:text-white uppercase leading-none">Payment Proof</p>
                        <p className="text-[9px] text-slate-500 mt-1">Verified Transaction Receipt</p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Event Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="w-4 h-4 text-emerald-500" />
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Day 1 Schedule</h2>
            </div>
            <div className="relative pl-6 border-l-2 border-slate-100 dark:border-white/10 flex flex-col gap-5">
              {schedule.filter(s => s.day === 'Day 1').slice(0, 5).map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[1.625rem] w-3.5 h-3.5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow transition-transform group-hover:scale-125" />
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">{item.time}</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{item.event}</p>
                </div>
              ))}
              {schedule.filter(s => s.day === 'Day 1').length === 0 && (
                <p className="text-xs text-slate-400 font-medium">No schedule available.</p>
              )}
            </div>
          </motion.div>

          {/* Upload More Docs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-4 h-4 text-orange-600" />
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Upload Additional Materials</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Updated Poster", "Project Report PDF", "Demo Video Link", "Team Photo"].map(label => (
                <label key={label} className="flex items-center gap-3 border border-dashed border-slate-200 dark:border-white/10 rounded-sm p-4 cursor-pointer hover:border-orange-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                  <input type="file" className="sr-only" />
                  <Upload className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-colors" />
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-600 transition-colors">{label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-sm overflow-hidden shadow-2xl">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Add New Project</h3>
              <button onClick={() => setShowProjectModal(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-sm transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleProjectSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Project Title</label>
                <input type="text" required value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-600 focus:outline-none dark:text-white" placeholder="Enter project title" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Description</label>
                <textarea required value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-600 focus:outline-none min-h-[100px] resize-none dark:text-white" placeholder="Describe your project..."></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Images (Max 5)</label>
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-sm hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors cursor-pointer group">
                  <input type="file" required={projectForm.files.length === 0} multiple accept="image/*" className="hidden" onChange={e => {
                    const selected = Array.from(e.target.files);
                    if (selected.length > 5) alert("Max 5 images allowed");
                    else setProjectForm({ ...projectForm, files: selected });
                  }} />
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-sm flex items-center justify-center mb-3 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-sm">
                    <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Click to upload images</p>
                  <p className="text-xs text-slate-500 mt-1">{projectForm.files.length} selected</p>
                </label>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={submittingProject} className="w-full flex items-center justify-center gap-2 py-4 rounded-sm bg-orange-600 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-300/20 transition-all disabled:opacity-70 group">
                  {submittingProject ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Project"}
                  {!submittingProject && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
