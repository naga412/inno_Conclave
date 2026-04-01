import React, { useState, useMemo, useEffect } from 'react';
import WorkshopFilter from '../components/workshops/WorkshopFilter';
import WorkshopsGrid from '../components/workshops/WorkshopsGrid';
import { workshops as wsAPI, participants as partAPI, auth as authAPI } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { Loader2, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WorkshopsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allWorkshops, setAllWorkshops] = useState([]);

  // Enrollment State
  const [enrolling, setEnrolling] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'
  const [enrollError, setEnrollError] = useState("");

  // Embedded Auth States
  const [authMode, setAuthMode] = useState("confirm"); // "confirm", "login", "register"
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", college: "", department: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    wsAPI.getAll()
      .then(list => {
        // Map backend fields to what WorkshopCard expects
        const mapped = list.map(w => ({
          id: w.id,
          title: w.title,
          instructor: w.speaker,
          category: w.category || 'General',
          level: 'All',
          date: w.day,
          time: w.time,
          duration: w.duration,
          seats: w.seats,
          image: `https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop`,
        }));
        setAllWorkshops(mapped);
      })
      .catch(() => setAllWorkshops([]));
  }, []);

  const filteredWorkshops = useMemo(() => {
    return allWorkshops.filter((workshop) => {
      const matchesCategory = activeCategory === "All" || workshop.category === activeCategory;
      const matchesLevel = activeLevel === "All" || workshop.level === activeLevel;
      const matchesSearch =
        workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [activeCategory, activeLevel, searchQuery, allWorkshops]);

  const handleEnrollClick = async (workshop) => {
    setEnrolling(workshop);
    setEnrollStatus("idle");
    setEnrollError("");
    setAuthError("");

    const role = localStorage.getItem("ic_role");
    if (role === "participant") {
      setAuthMode("confirm");
      if (!profile) {
        setLoadingProfile(true);
        try {
          const p = await partAPI.getMe();
          setProfile(p);
        } catch (err) {
          console.error("Failed to load profile", err);
          setAuthMode("login");
          localStorage.removeItem("ic_token");
          localStorage.removeItem("ic_role");
        } finally {
          setLoadingProfile(false);
        }
      }
    } else {
      setAuthMode("register"); // Default to register for new unauthenticated users
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = await authAPI.login(loginForm.email, loginForm.password, "participant");
      localStorage.setItem("ic_token", result.token);
      localStorage.setItem("ic_role", result.role);
      localStorage.setItem("ic_user", JSON.stringify(result.user));
      
      const p = await partAPI.getMe();
      setProfile(p);
      setAuthMode("confirm");
    } catch (err) {
      setAuthError(err.message || "Invalid credentials");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const fd = new FormData();
      Object.entries(regForm).forEach(([k, v]) => fd.append(k, v));
      await partAPI.register(fd);
      
      const loginRes = await authAPI.login(regForm.email, regForm.password, "participant");
      localStorage.setItem("ic_token", loginRes.token);
      localStorage.setItem("ic_role", loginRes.role);
      localStorage.setItem("ic_user", JSON.stringify(loginRes.user));
      
      const p = await partAPI.getMe();
      setProfile(p);
      setAuthMode("confirm");
    } catch (err) {
      setAuthError(err.message || "Registration failed. Ensure email expands or try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const confirmEnrollment = async () => {
    setEnrollStatus("loading");
    setEnrollError("");
    try {
      await wsAPI.registerForWorkshop(enrolling.id);
      setEnrollStatus("success");
      // Decrease seats locally
      setAllWorkshops(prev => prev.map(w => w.id === enrolling.id ? { ...w, seats: Math.max(0, w.seats - 1) } : w));
    } catch (err) {
      setEnrollStatus("error");
      setEnrollError(err.message || "Failed to register for workshop");
    }
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 font-sans selection:bg-orange-600 selection:text-white transition-colors duration-300">


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-300/30 blur-[120px] rounded-full dark:opacity-30"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-indigo-600/20 blur-[100px] rounded-full dark:opacity-20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-sm bg-orange-300 dark:bg-orange-300/20 border border-orange-300 dark:border-orange-300 text-white dark:text-white text-sm font-bold mb-6">
              Hands-On Learning
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Innovation <span className="text-orange-300 dark:text-orange-300">Workshops</span>
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

          <WorkshopsGrid workshops={filteredWorkshops} onEnroll={handleEnrollClick} />
        </div>
      </section>

      {/* Featured CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent to-slate-200 dark:bg-gradient-to-b dark:from-transparent dark:to-[#0b1120] relative overflow-hidden text-center transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Ready to expand your horizons?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
            Limited seats available for premium workshops. Secure your spot now and be part of the innovation journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/participant-register')} className="px-8 py-4 bg-orange-300 hover:bg-orange-300 text-white font-bold rounded-sm shadow-xl shadow-orange-300/10 transition-all active:scale-95">
              Register for Event
            </button>
            <button onClick={() => navigate('/agenda')} className="px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold rounded-sm transition-all active:scale-95">
              View All Agenda
            </button>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {enrolling && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEnrolling(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {enrollStatus === "success" ? (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">You're In!</h3>
                  <p className="text-slate-500 font-medium mb-8">Successfully registered for <br/><span className="text-slate-900 dark:text-white font-bold">{enrolling.title}</span>.</p>
                  <button onClick={() => setEnrolling(null)} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold outline-none transition-all active:scale-95">
                    Return to Workshops
                  </button>
                </div>
              ) : authMode === "login" ? (
                <div className="py-2">
                  <button onClick={() => setEnrolling(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Authorization</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">Login to Enroll</h3>
                  
                  {authError && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 font-bold text-xs">{authError}</div>}
                  
                  <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                    <input type="email" placeholder="Email Address" required value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm font-medium" />
                    <input type="password" placeholder="Password" required value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm font-medium" />
                    <button type="submit" disabled={authLoading} className="w-full py-4 mt-2 rounded-xl bg-orange-400 text-white font-bold hover:bg-orange-500 disabled:opacity-50">
                      {authLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : "Sign In & Continue"}
                    </button>
                  </form>
                  <p className="text-center text-xs text-slate-500 mt-6 font-medium">
                    New to Conclave? <button onClick={() => setAuthMode('register')} className="text-orange-400 font-bold ml-1">Create an account</button>
                  </p>
                </div>
              ) : authMode === "register" ? (
                <div className="py-2 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                  <button onClick={() => setEnrolling(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">New Participant</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">Create Account</h3>
                  <p className="text-sm text-slate-500 mb-6">Register a profile to secure your workshop ticket.</p>
                  
                  {authError && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 font-bold text-xs">{authError}</div>}
                  
                  <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
                    <input type="text" placeholder="Full Name" required value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm font-medium" />
                    <input type="email" placeholder="Email Address" required value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm font-medium" />
                    <input type="tel" placeholder="Phone Number" required value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm font-medium" />
                    <div className="flex gap-3">
                        <input type="text" placeholder="College / Org" required value={regForm.college} onChange={e => setRegForm({...regForm, college: e.target.value})} className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm font-medium" />
                        <input type="text" placeholder="Dept" required value={regForm.department} onChange={e => setRegForm({...regForm, department: e.target.value})} className="w-1/3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm font-medium" />
                    </div>
                    <input type="password" placeholder="Create Password" required value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm font-medium" />
                    
                    <button type="submit" disabled={authLoading} className="w-full py-4 mt-2 rounded-xl bg-orange-400 text-white font-bold hover:bg-orange-500 disabled:opacity-50">
                      {authLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : "Register & Continue"}
                    </button>
                  </form>
                  <p className="text-center text-xs text-slate-500 mt-6 font-medium">
                    Already have an account? <button onClick={() => setAuthMode('login')} className="text-indigo-400 font-bold ml-1">Log in here</button>
                  </p>
                </div>
              ) : (
                <>
                  <button onClick={() => setEnrolling(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Review & Confirm</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">Workshop Registration</h3>

                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 mb-6">
                    <p className="text-xs text-slate-400 font-bold mb-1">{enrolling.date} • {enrolling.time}</p>
                    <p className="font-extrabold text-slate-900 dark:text-white text-lg mb-1">{enrolling.title}</p>
                    <p className="text-sm font-medium text-slate-500">Instructor: {enrolling.instructor}</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-white/10 pb-2">Participant Details</p>
                    {loadingProfile ? (
                       <div className="flex items-center gap-3 py-4 text-slate-500">
                          <Loader2 className="w-5 h-5 animate-spin text-orange-400" /> Fetching details...
                       </div>
                    ) : profile ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Name</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Email</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">College</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white text-right max-w-[200px] truncate" title={profile.college}>{profile.college}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {enrollStatus === "error" && (
                     <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm font-bold">
                       {enrollError}
                     </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setEnrolling(null)} className="flex-1 py-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                      Cancel
                    </button>
                    <button onClick={confirmEnrollment} disabled={!profile || enrollStatus === "loading"} className="flex-[2] flex items-center justify-center py-4 rounded-xl bg-orange-400 text-white font-bold shadow-xl shadow-orange-400/20 hover:bg-orange-500 transition-all active:scale-95 disabled:opacity-50">
                      {enrollStatus === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Enrollment"}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkshopsPage;
