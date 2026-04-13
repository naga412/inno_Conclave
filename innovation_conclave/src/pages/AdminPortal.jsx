import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Presentation, BookOpen, FileText, CreditCard, Mic, Armchair,
  LogOut, CheckCircle2, XCircle, Clock, ChevronDown, ChevronLeft,
  Plus, Trash2, Edit3, Search, Bell, TrendingUp, Mail,
  ShieldAlert, Download, AlertCircle, Save, X, Sun, Moon, Loader2, CalendarDays, ArrowLeft, ExternalLink, ImageIcon
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { participants as partAPI, exhibitors as exAPI, workshops as wsAPI, agenda as agendaAPI, subscriptions as subscriptionAPI } from '../api/client';
// import NetworkBackground from '../components/NetworkBackground';
import Networktwo from '../components/Networktwo';
import ExhibitorIDCard from '../components/ExhibitorIDCard';


const STATUS_BADGE = {
  approved: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", label: "Approved" },
  pending: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500", label: "Pending" },
  rejected: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", dot: "bg-red-500", label: "Rejected" },
  confirmed: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", label: "Confirmed" },
};

// ─── STAT CARD ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, Icon, delay = 0, onClick, isActive }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      onClick={onClick}
      className={`bg-white dark:bg-black border rounded-sm p-5 transition-all cursor-pointer ${isActive ? 'border-orange-400 shadow-md ring-1 ring-orange-400' : 'border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/20'}`}
    >
      <div className='flex justify-between items-center'>
        <div className={`w-10 h-10 rounded-sm ${color} flex items-center justify-center mb-3`}>
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{value}</p>
      </div>
      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </motion.div>
  );
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
function Badge({ status }) {
  const s = STATUS_BADGE[status] || STATUS_BADGE.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab({ exhibitors, participants, workshops, setTab, subscriberCount }) {
  const [selectedTopic, setSelectedTopic] = useState("participants");

  const approved = exhibitors.filter(e => e.status === "approved").length;
  const pending = exhibitors.filter(e => e.status === "pending").length;
  const lunchPendingList = participants.filter(p => p.lunch && p.lunch_status === "pending");
  const lunchPending = lunchPendingList.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Participants" value={participants.length} sub={`Registered`} color="bg-orange-300 text-white dark:bg-transparent dark:text-orange-400" Icon={Users} delay={0} onClick={() => setSelectedTopic("participants")} isActive={selectedTopic === "participants"} />
        <StatCard label="Exhibitors" value={exhibitors.length} sub={`${approved} approved, ${pending} pending`} color="bg-purple-500 text-white dark:bg-transparent dark:text-purple-400" Icon={Presentation} delay={0.05} onClick={() => setSelectedTopic("exhibitors")} isActive={selectedTopic === "exhibitors"} />
        <StatCard label="Workshops" value={workshops.length} sub="2 per day" color="bg-indigo-500 text-white dark:bg-transparent dark:text-indigo-400" Icon={BookOpen} delay={0.1} onClick={() => setSelectedTopic("workshops")} isActive={selectedTopic === "workshops"} />
        <StatCard label="Lunch Pending" value={lunchPending} sub="Awaiting verification" color="bg-amber-500 text-white dark:bg-transparent dark:text-amber-400" Icon={AlertCircle} delay={0.15} onClick={() => setSelectedTopic("lunch")} isActive={selectedTopic === "lunch"} />
      </div>

      {pending > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-500/20 rounded-sm p-4 flex items-center gap-4">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-amber-700 dark:text-amber-400 text-sm">{pending} exhibitor{pending > 1 ? "s" : ""} awaiting approval</p>
            <p className="text-xs text-amber-600/70 dark:text-amber-300/60 mt-0.5">Review and approve or reject registrations to proceed.</p>
          </div>
        </div>
      )}

      {/* Dynamic Data Table */}
      <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm min-h-[350px]">
        {selectedTopic === "participants" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Recent Participant Registrations</h3>
              <button onClick={() => setTab("participants")} className="text-xs font-bold text-orange-400 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5">
                    {["Name", "College", "Lunch", "Registered"].map(h => (
                      <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {participants.slice(0, 8).map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 dark:border-white/5 last:border-0">
                      <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">{p.name}</td>
                      <td className="py-3 pr-4 text-slate-500 dark:text-slate-400">{p.college}</td>
                      <td className="py-3 pr-4">{p.lunch ? <Badge status={p.lunch_status} /> : <span className="text-slate-400 text-xs">No</span>}</td>
                      <td className="py-3 text-slate-400 text-xs">{new Date(p.registered_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {participants.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-slate-400 text-xs">No participants.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {selectedTopic === "exhibitors" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Recent Exhibitors</h3>
              <button onClick={() => setTab("exhibitors")} className="text-xs font-bold text-orange-400 hover:underline">Manage Exhibitors</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5">
                    {["Org Name", "Type", "Status", "Contact"].map(h => (
                      <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exhibitors.slice(0, 8).map((e) => (
                    <tr key={e.id} className="border-b border-slate-50 dark:border-white/5 last:border-0">
                      <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">{e.org_name}</td>
                      <td className="py-3 pr-4 text-slate-500 dark:text-slate-400 capitalize">{e.org_type}</td>
                      <td className="py-3 pr-4"><Badge status={e.status} /></td>
                      <td className="py-3 text-slate-400 text-xs">{e.email}</td>
                    </tr>
                  ))}
                  {exhibitors.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-slate-400 text-xs">No exhibitors.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {selectedTopic === "workshops" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Event Workshops</h3>
              <button onClick={() => setTab("workshops")} className="text-xs font-bold text-orange-400 hover:underline">Manage Workshops</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5">
                    {["Title", "Speaker", "Day", "Time"].map(h => (
                      <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workshops.slice(0, 8).map((w) => (
                    <tr key={w.id} className="border-b border-slate-50 dark:border-white/5 last:border-0">
                      <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">{w.title}</td>
                      <td className="py-3 pr-4 text-slate-500 dark:text-slate-400">{w.speaker}</td>
                      <td className="py-3 pr-4 text-slate-500 text-xs">{w.day}</td>
                      <td className="py-3 text-slate-400 text-xs">{w.time}</td>
                    </tr>
                  ))}
                  {workshops.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-slate-400 text-xs">No workshops.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {selectedTopic === "lunch" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Pending Lunch Requests</h3>
              <button onClick={() => setTab("participants")} className="text-xs font-bold text-orange-400 hover:underline">Go to Participants</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5">
                    {["Name", "College", "Phone", "Action"].map(h => (
                      <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lunchPendingList.length === 0 ? (
                    <tr><td colSpan={4} className="py-6 text-center text-slate-400 text-xs">All lunch requests are currently resolved.</td></tr>
                  ) : lunchPendingList.slice(0, 8).map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 dark:border-white/5 last:border-0">
                      <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">{p.name}</td>
                      <td className="py-3 pr-4 text-slate-500 dark:text-slate-400">{p.college}</td>
                      <td className="py-3 pr-4 text-slate-500 dark:text-slate-400">{p.phone}</td>
                      <td className="py-3 pr-4">
                        <button onClick={() => setTab("participants")} className="text-xs font-bold text-orange-400 hover:underline">Resolve Request</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── EXHIBITORS TAB ──────────────────────────────────────────────────────────
function ExhibitorsTab({ exhibitors, setExhibitors }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'projects' | 'team'
  const [subTab, setSubTab] = useState("projects"); // 'projects' | 'team'
  const [selectedExhibitor, setSelectedExhibitor] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [team, setTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [idCardMember, setIdCardMember] = useState(null);

  const setStatus = async (id, status) => {
    try {
      await exAPI.updateStatus(id, status);
      setExhibitors(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    } catch (err) { alert(err.message); }
  };

  const filtered = exhibitors.filter(e => {
    const matchFilter = filter === "all" || e.status === filter;
    const matchSearch = (e.org_name || '').toLowerCase().includes(search.toLowerCase()) || (e.email || '').toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const viewExhibitorDetail = async (e, tab = 'projects') => {
    setSelectedExhibitor(e);
    setViewMode("detail");
    setSubTab(tab);
    // Load both projects and team
    setLoadingProjects(true);
    setLoadingTeam(true);
    setProjects([]);
    setTeam([]);
    try {
      const data = await exAPI.getExhibitorProjects(e.id);
      setProjects(data);
    } catch { /* ignore */ } finally { setLoadingProjects(false); }
    try {
      const tData = await exAPI.getExhibitorTeam(e.id);
      setTeam(tData);
    } catch { /* ignore */ } finally { setLoadingTeam(false); }
  };

  const goBack = () => {
    setViewMode("list");
    setSelectedExhibitor(null);
    setProjects([]);
    setTeam([]);
    setIdCardMember(null);
  };

  // Premium Project Card Component
  const ProjectCard = ({ p, idx }) => {
    const [imgIdx, setImgIdx] = useState(0);
    const imgs = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images) : p.images) : [];
    const isWide = idx === 0 || idx % 7 === 0;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (idx % 8) * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative rounded-sm overflow-hidden bg-white dark:bg-slate-900 shadow-xl shadow-slate-100/50 dark:shadow-none border border-slate-100 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 flex flex-col ${isWide ? 'md:col-span-2 lg:col-span-2' : ''}`}
      >
        {imgs.length > 0 ? (
          <div className={`relative w-full ${isWide ? 'h-72 sm:h-96' : 'h-64 sm:h-72'} bg-slate-100 dark:bg-black overflow-hidden shrink-0`}>
            <img src={`http://localhost:4000/uploads/exhibitors/${imgs[imgIdx]}`} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-[1200ms] ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none mix-blend-multiply opacity-80" />
            {imgs.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i === 0 ? imgs.length - 1 : i - 1)); }} className="w-10 h-10 flex items-center justify-center rounded-sm bg-white/10 backdrop-blur-xl text-white hover:bg-white/30 border border-white/20 transition-all shadow-xl active:scale-90"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i === imgs.length - 1 ? 0 : i + 1)); }} className="w-10 h-10 flex items-center justify-center rounded-sm bg-white/10 backdrop-blur-xl text-white hover:bg-white/30 border border-white/20 transition-all shadow-xl active:scale-90 rotate-180"><ChevronLeft className="w-6 h-6" /></button>
              </div>
            )}
            {imgs.length > 1 && (<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">{imgs.map((_, i) => (<div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIdx ? 'w-5 bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,1)]' : 'w-2 bg-white/40'}`} />))}</div>)}
            <div className="absolute top-5 right-5 z-10"><span className="bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-sm text-[10px] font-extrabold uppercase tracking-widest border border-white/10 shadow-lg">Innovation</span></div>
          </div>
        ) : (
          <div className={`relative w-full ${isWide ? 'h-72 sm:h-96' : 'h-64 sm:h-72'} bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center gap-3 shrink-0`}>
            <div className="p-4 rounded-sm bg-white dark:bg-slate-950 shadow-sm opacity-50"><ImageIcon className="w-8 h-8 text-slate-400 dark:text-slate-600" /></div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Awaiting Media Uploads</p>
          </div>
        )}
        <div className="p-6 sm:p-8 flex-1 flex flex-col bg-white dark:bg-black z-10">
          <h4 className="font-extrabold text-slate-900 dark:text-white text-xl md:text-2xl mb-3 leading-tight tracking-tight group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2">{p.title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3 sm:line-clamp-4 flex-1">{p.description}</p>
        </div>
      </motion.div>
    );
  };

  if (viewMode === 'detail' && selectedExhibitor) {
    return (
      <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto min-h-[600px] pb-12">
        {/* Immersive Hero Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-sm overflow-hidden bg-slate-900 p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col lg:flex-row lg:items-end justify-between gap-10"
        >
          {selectedExhibitor.poster_path && (
            <div className="absolute inset-0 z-0">
              <img src={`http://localhost:4000/uploads/exhibitors/${selectedExhibitor.poster_path}`} alt="" className="w-full h-full object-cover object-top opacity-30 grayscale-[0.5] contrast-125 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_70%)]" />
            </div>
          )}
          {!selectedExhibitor.poster_path && (
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
              <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-indigo-600 rounded-full filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-orange-500 rounded-full filter blur-[120px] opacity-60 animate-pulse" style={{ animationDuration: '6s' }} />
            </div>
          )}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(15,23,42,0.8)_100%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl flex flex-col items-start">
            <button onClick={goBack} className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white text-xs font-bold transition-all mb-8 border border-white/5 active:scale-95">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 text-white text-[10px] uppercase font-extrabold tracking-widest leading-none shadow-lg">{selectedExhibitor.org_type} Showcase</span>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest px-3 border-l border-white/10">{projects.length} Innovations · {team.length} Members</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-tight tracking-tight mb-4 drop-shadow-sm">{selectedExhibitor.org_name}</h2>
            {selectedExhibitor.tagline && (<p className="text-orange-200 font-bold text-lg max-w-xl italic opacity-90 mb-2">"{selectedExhibitor.tagline}"</p>)}
            <p className="text-slate-300 font-medium text-sm lg:text-base opacity-70">POC: {selectedExhibitor.contact_name} · <a href={`mailto:${selectedExhibitor.email}`} className="hover:text-white transition-colors">{selectedExhibitor.email}</a></p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col gap-3">
            {selectedExhibitor.poster_path ? (
              <a href={`http://localhost:4000/uploads/exhibitors/${selectedExhibitor.poster_path}`} target="_blank" rel="noreferrer" className="group relative w-full lg:w-72 h-40 rounded-sm bg-slate-800 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center transition-all hover:border-orange-400/50">
                <img src={`http://localhost:4000/uploads/exhibitors/${selectedExhibitor.poster_path}`} alt="Registration Poster" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="relative z-10 flex flex-col items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"><ExternalLink className="w-5 h-5 text-white" /></div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-white drop-shadow-md">View Full Poster</span>
                </div>
              </a>
            ) : (
              <div className="w-full px-8 py-5 rounded-sm bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest text-center cursor-not-allowed">No Poster Provided</div>
            )}
          </div>
        </motion.div>

        {/* Sub Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-sm p-1 self-start">
          {[['projects', 'Projects', projects.length], ['team', 'Team Members', team.length]].map(([key, label, count]) => (
            <button key={key} onClick={() => setSubTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-bold transition-all ${subTab === key ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>
              {label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${subTab === key ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>{count}</span>
            </button>
          ))}
        </div>

        {/* Projects Sub-tab */}
        {subTab === 'projects' && (
          loadingProjects ? (
            <div className="flex flex-col items-center justify-center py-32 rounded-sm">
              <div className="w-20 h-20 relative">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-white/5" />
                <div className="absolute inset-0 rounded-full border-4 border-orange-400 border-t-transparent animate-spin" />
              </div>
              <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading Projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center py-32 bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10 shadow-inner">
              <div className="w-20 h-20 rounded-sm bg-white dark:bg-black shadow-xl border border-slate-100 dark:border-white/5 flex items-center justify-center mx-auto mb-6 rotate-3"><Presentation className="w-8 h-8 text-slate-300 dark:text-slate-600" /></div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Blank Canvas</h3>
              <p className="text-slate-500 max-w-sm mx-auto font-medium">No projects added yet.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 auto-rows-[max-content]">
              {projects.map((p, idx) => <ProjectCard key={p.id} p={p} idx={idx} />)}
            </div>
          )
        )}

        {/* Team Members Sub-tab */}
        {subTab === 'team' && (
          loadingTeam ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-black rounded-sm border border-slate-100 dark:border-white/10">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-sm animate-spin" />
              <p className="mt-6 text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Loading Team...</p>
            </div>
          ) : team.length === 0 ? (
            <div className="text-center py-20 bg-white/50 dark:bg-white/5 rounded-sm border border-dashed border-slate-200 dark:border-white/10">
              <div className="w-16 h-16 rounded-sm bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-slate-300 dark:text-slate-600" /></div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">No Team Members</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">This exhibitor hasn't added any team members yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {team.map((member) => {
                  const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
                  const photoUrl = member.photo ? `http://localhost:4000/uploads/exhibitors/${member.photo}` : null;
                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-sm hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:shadow-md transition-all"
                    >
                      {photoUrl ? (
                        <img src={photoUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 shadow-md" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center border-2 border-indigo-400 shadow-md">
                          <span className="text-white font-extrabold text-lg">{initials}</span>
                        </div>
                      )}
                      <div className="text-center">
                        <p className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight">{member.name}</p>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">{member.role}</span>
                        {member.email && <p className="text-[10px] text-slate-400 mt-1 truncate max-w-[140px]">{member.email}</p>}
                      </div>
                      <button
                        onClick={() => setIdCardMember(member)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-all hover:scale-105 active:scale-95 shadow-sm shadow-indigo-600/30"
                      >
                        <Download className="w-3 h-3" /> Download ID Card
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* ID Card Modal (Admin) */}
        {idCardMember && selectedExhibitor && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 dark:bg-black/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-sm overflow-hidden shadow-2xl">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-indigo-500" />
                  <h3 className="font-extrabold text-slate-900 dark:text-white">Exhibitor ID Card</h3>
                </div>
                <button onClick={() => setIdCardMember(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-sm transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <ExhibitorIDCard member={idCardMember} exhibitor={selectedExhibitor} />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-sm bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/20 text-sm"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          {["all", "pending", "approved", "rejected"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-wide transition-all ${filter === f ? "bg-orange-300 text-white shadow-lg shadow-orange-300/20" : "bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400"
                }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                {["Organisation", "Type", "Contact", "Files", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900 dark:text-white">{e.org_name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{e.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 capitalize">{e.org_type}{e.college_year ? ` · ${e.college_year}` : ""}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300 text-xs">{e.contact_name}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5">
                      {e.poster_path && (
                        <a href={`http://localhost:4000/uploads/exhibitors/${e.poster_path}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-orange-300 dark:text-orange-300 font-bold hover:underline hover:text-orange-300 dark:hover:text-orange-300 transition-colors">
                          <FileText className="w-3.5 h-3.5 inline mr-1" /> View Poster
                        </a>
                      )}
                      {e.payment_proof && (
                        <a href={`http://localhost:4000/uploads/exhibitors/${e.payment_proof}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors">
                          <CreditCard className="w-3.5 h-3.5 inline mr-1" /> View Payment
                        </a>
                      )}
                      {!e.poster_path && !e.payment_proof && (<span className="text-[10px] text-slate-400">No files</span>)}
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge status={e.status} /></td>
                  <td className="px-5 py-4">
                    {e.status === "pending" ? (
                      <div className="flex gap-2 flex-wrap">
                        <button onClick={() => setStatus(e.id, "approved")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-500 transition-colors"><CheckCircle2 className="w-3.5 h-3.5" /> Approve</button>
                        <button onClick={() => setStatus(e.id, "rejected")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"><XCircle className="w-3.5 h-3.5" /> Reject</button>
                      </div>
                    ) : (
                      <button onClick={() => setStatus(e.id, "pending")} className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline">Reset</button>
                    )}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <button onClick={() => viewExhibitorDetail(e, 'projects')} className="text-[11px] font-bold text-orange-400 hover:text-orange-500 underline">Projects</button>
                      <button onClick={() => viewExhibitorDetail(e, 'team')} className="text-[11px] font-bold text-indigo-400 hover:text-indigo-500 underline">Team</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm font-medium">No exhibitors match your search.</div>
        )}
      </div>
    </div>
  );
}

// ─── PARTICIPANTS TAB ─────────────────────────────────────────────────────────
function ParticipantsTab({ participants, setParticipants }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const setLunchStatus = async (id, status) => {
    try {
      await partAPI.confirmLunch(id, status);
      setParticipants(prev => prev.map(p => p.id === id ? { ...p, lunch_status: status } : p));
    } catch (err) { alert(err.message); }
  };

  const removeParticipant = async (id) => {
    if (!confirm('Remove this participant?')) return;
    try {
      await partAPI.remove(id);
      setParticipants(prev => prev.filter(p => p.id !== id));
    } catch (err) { alert(err.message); }
  };

  const filtered = participants.filter(p => {
    const matchFilter = filter === "all"
      ? true
      : filter === "lunch"
        ? p.lunch
        : filter === "no-lunch"
          ? !p.lunch
          : true;
    const matchSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) || (p.email || '').toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const downloadAll = async () => {
    try {
      const text = await partAPI.exportAll();
      const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'IC2026_Participants.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search participants…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-sm bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/20 text-sm" />
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap">
          {[["all", "All"], ["lunch", "Lunch"], ["no-lunch", "No Lunch"]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-wide transition-all ${filter === k ? "bg-orange-300 text-white shadow-lg shadow-orange-300/20" : "bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400"
                }`}>{l}</button>
          ))}
          <button onClick={downloadAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">
            <Download className="w-3.5 h-3.5" /> Export All
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                {["Name", "College / Dept", "Phone", "Lunch", "Registered", "Actions"].map(h => (
                  <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{p.email}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300 text-xs">
                    {p.college}<br /><span className="text-slate-400">{p.department}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300 text-xs">{p.phone}</td>
                  <td className="px-5 py-4">
                    {p.lunch ? (
                      <div className="flex flex-col gap-1.5">
                        <Badge status={p.lunch_status} />
                        {p.lunch_status === "pending" && (
                          <button onClick={() => setLunchStatus(p.id, "confirmed")}
                            className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Confirm Payment</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-xs">{p.registered_at ? new Date(p.registered_at).toLocaleDateString() : '—'}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => removeParticipant(p.id)}
                      className="p-1.5 rounded-sm text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── WORKSHOPS TAB ────────────────────────────────────────────────────────────
const EMPTY_WS = { title: "", speaker: "", time: "", duration: "", day: "Day 1", seats: "", category: "" };

function WorkshopsTab({ workshops, setWorkshops }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_WS);

  const [viewMode, setViewMode] = useState("list");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [registrants, setRegistrants] = useState([]);
  const [loadingRegistrants, setLoadingRegistrants] = useState(false);

  const openNew = () => { setForm(EMPTY_WS); setEditing(null); setShowForm(true); };
  const openEdit = (w) => { setForm({ ...w }); setEditing(w.id); setShowForm(true); };

  const save = async () => {
    if (!form.title || !form.speaker) return;
    try {
      if (editing) {
        const updated = await wsAPI.update(editing, form);
        setWorkshops(prev => prev.map(w => w.id === editing ? updated : w));
      } else {
        const created = await wsAPI.create(form);
        setWorkshops(prev => [...prev, created]);
      }
      setShowForm(false);
    } catch (err) { alert(err.message); }
  };

  const del = async (id) => {
    if (!confirm('Delete this workshop?')) return;
    try {
      await wsAPI.remove(id);
      setWorkshops(prev => prev.filter(w => w.id !== id));
    } catch (err) { alert(err.message); }
  };

  const viewRegistrants = async (w) => {
    setSelectedWorkshop(w);
    setViewMode("registrants");
    setLoadingRegistrants(true);
    setRegistrants([]);
    try {
      const data = await wsAPI.getRegistrants(w.id);
      setRegistrants(data);
    } catch (err) {
      alert("Failed to load registrants: " + err.message);
      setViewMode("list");
    } finally {
      setLoadingRegistrants(false);
    }
  };

  const goBack = () => {
    setViewMode("list");
    setSelectedWorkshop(null);
    setRegistrants([]);
  };

  const CATEGORY_COLORS = {
    AI: "bg-orange-50 dark:bg-orange-300/30 text-orange-300",
    Web3: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
    Entrepreneurship: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
    GreenTech: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600",
  };

  if (viewMode === "registrants" && selectedWorkshop) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="p-2.5 rounded-sm bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-500 hover:text-orange-300 transition-all hover:scale-105">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-xl">Registrants</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-orange-300 uppercase tracking-widest">{selectedWorkshop.title}</span>
              <span className="w-1 h-1 rounded-sm bg-slate-300 dark:bg-white/20" />
              <span className="text-xs font-medium text-slate-400">{registrants.length} Enrolled</span>
            </div>
          </div>
        </div>

        {loadingRegistrants ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-black rounded-sm border border-slate-100 dark:border-white/10">
            <div className="w-12 h-12 border-4 border-orange-300 border-t-transparent rounded-sm animate-spin"></div>
            <p className="mt-6 text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Loading Registrants...</p>
          </div>
        ) : registrants.length === 0 ? (
          <div className="text-center py-20 bg-white/50 dark:bg-white/5 rounded-sm border border-dashed border-slate-200 dark:border-white/10">
            <div className="w-16 h-16 rounded-sm bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Nobody Registered Yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">There are currently no participants signed up for this workshop.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                    {["Participant", "College / Dept", "Registered At"].map(h => (
                      <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registrants.map(p => (
                    <tr key={p.id} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{p.email}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300 text-xs">
                        {p.college}<br /><span className="text-slate-400">{p.department}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-xs">{new Date(p.registered_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{workshops.length} workshops registered</p>
        <button onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-orange-300 text-white text-sm font-bold hover:bg-orange-300 transition-all shadow-lg shadow-orange-300/20 hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4" /> Add Workshop
        </button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-black border border-orange-300 dark:border-orange-300/20 rounded-sm p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-slate-900 dark:text-white">{editing ? "Edit Workshop" : "New Workshop"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Workshop Title", key: "title", type: "text", placeholder: "e.g. AI in Healthcare", full: true },
                { label: "Speaker Name", key: "speaker", type: "text", placeholder: "e.g. Dr. Arjun Mehta" },
                { label: "Time", key: "time", type: "text", placeholder: "e.g. 10:00 AM" },
                { label: "Duration", key: "duration", type: "text", placeholder: "e.g. 2 hrs" },
                { label: "Seats", key: "seats", type: "number", placeholder: "e.g. 50" },
                { label: "Category", key: "category", type: "text", placeholder: "e.g. AI, Web3" },
              ].map(({ label, key, type, placeholder, full }) => (
                <div key={key} className={full ? "sm:col-span-2" : ""}>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">{label}</label>
                  <input type={type} placeholder={placeholder} value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-sm bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/20 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">Day</label>
                <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
                  className="w-full px-4 py-3 rounded-sm bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-300/20 text-sm">
                  <option>Day 1</option>
                  <option>Day 2</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={save}
                className="flex items-center gap-2 px-6 py-3 rounded-sm bg-orange-300 text-white font-bold text-sm hover:bg-orange-300 transition-all shadow-lg shadow-orange-300/20">
                <Save className="w-4 h-4" /> {editing ? "Save Changes" : "Add Workshop"}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-6 py-3 rounded-sm border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5">
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workshop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["Day 1", "Day 2"].map(day => (
          <div key={day}>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{day}</p>
            <div className="flex flex-col gap-3">
              {workshops.filter(w => w.day === day).map(w => (
                <motion.div key={w.id} layout
                  className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 rounded-sm p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{w.title}</h4>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => viewRegistrants(w)} className="p-1.5 text-xs font-bold rounded-sm text-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                        Users
                      </button>
                      <button onClick={() => openEdit(w)} className="p-1.5 rounded-sm text-slate-400 hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-300/20 transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => del(w.id)} className="p-1.5 rounded-sm text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mb-3 flex items-center gap-1"><Mic className="w-3.5 h-3.5" /> {w.speaker}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {w.category && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${CATEGORY_COLORS[w.category] || "bg-slate-100 dark:bg-slate-300 text-slate-600"}`}>{w.category}</span>
                    )}
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {w.time} · {w.duration}</span>
                    {w.seats && <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1"><Users className="w-3 h-3" /> {w.seats} seats</span>}
                  </div>
                </motion.div>
              ))}
              {workshops.filter(w => w.day === day).length === 0 && (
                <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-sm p-6 text-center text-slate-400 text-xs font-medium">
                  No workshops for {day} yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AGENDA TAB ──────────────────────────────────────────────────────────────
function AgendaTab({ agendaList, setAgendaList }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    day: 'Day 1', start_time: '', time_label: '', title: '',
    speaker: '', location: '', category: '', description: ''
  });

  const reset = () => {
    setForm({ day: 'Day 1', start_time: '', time_label: '', title: '', speaker: '', location: '', category: '', description: '' });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (a) => {
    setForm(a);
    setEditing(a.id);
    setShowForm(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await agendaAPI.update(editing, form);
        setAgendaList(prev => prev.map(a => a.id === editing ? { ...form, id: editing } : a).sort((a, b) => a.start_time.localeCompare(b.start_time)));
      } else {
        const { id } = await agendaAPI.create(form);
        setAgendaList(prev => [...prev, { ...form, id }].sort((a, b) => a.start_time.localeCompare(b.start_time)));
      }
      reset();
    } catch (err) { alert(err.message); }
  };

  const del = async (id) => {
    if (!confirm('Delete agenda event?')) return;
    try {
      await agendaAPI.remove(id);
      setAgendaList(prev => prev.filter(a => a.id !== id));
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold text-slate-900 dark:text-white text-xl">Event Agenda</h2>
        <button onClick={() => { reset(); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm hover:-translate-y-0.5 transition-all outline-none">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-slate-50 dark:bg-slate-900/50 rounded-sm p-6 border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{editing ? "Edit Agenda Event" : "New Agenda Event"}</h3>
              <button onClick={reset} className="p-1 rounded-sm text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">Day</label>
                <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
                  className="w-full px-4 py-3 rounded-sm bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-300/20 text-sm">
                  <option>Day 1</option>
                  <option>Day 2</option>
                </select>
              </div>
              {[
                { label: 'Start Time (for sorting e.g. 09:00:00)', key: 'start_time', type: 'time', step: '1' },
                { label: 'Display Time (e.g. 09:00 AM - 10:00 AM)', key: 'time_label', type: 'text' },
                { label: 'Event Title', key: 'title', type: 'text', full: true },
                { label: 'Speaker / Team (Optional)', key: 'speaker', type: 'text' },
                { label: 'Location (Optional)', key: 'location', type: 'text' },
                { label: 'Category Style (Optional)', key: 'category', type: 'text' },
                { label: 'Description (Optional)', key: 'description', type: 'text', full: true }
              ].map(({ label, key, type, step, full }) => (
                <div key={key} className={full ? "sm:col-span-2" : ""}>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">{label}</label>
                  <input type={type} step={step} value={form[key] || ''}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-sm bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/20 text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={save}
                className="flex items-center gap-2 px-6 py-3 rounded-sm bg-orange-300 text-white font-bold text-sm hover:bg-orange-300 transition-all shadow-lg shadow-orange-300/20">
                <Save className="w-4 h-4" /> {editing ? "Save Changes" : "Add Event"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {["Day 1", "Day 2"].map(day => (
          <div key={day}>
            <p className="text-sm font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">{day}</p>
            <div className="flex flex-col gap-3">
              {agendaList.filter(a => a.day === day).map(a => (
                <motion.div key={a.id} layout
                  className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 rounded-sm p-5 shadow-sm hover:shadow-md transition-shadow relative group"
                >
                  <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(a)} className="p-1.5 rounded-sm text-slate-400 hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-300/20"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => del(a.id)} className="p-1.5 rounded-sm text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <p className="text-xs font-bold text-orange-400 mb-1">{a.time_label}</p>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-1 pr-12">{a.title}</h4>
                  {a.speaker && <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1"><Mic className="w-3.5 h-3.5" /> {a.speaker}</p>}
                  {a.description && <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{a.description}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
const NAV = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "exhibitors", label: "Exhibitors", Icon: Presentation },
  { key: "participants", label: "Participants", Icon: Users },
  { key: "workshops", label: "Workshops", Icon: BookOpen },
  { key: "agenda", label: "Agenda", Icon: CalendarDays },
  { key: "subscriptions", label: "Subscriptions", Icon: Mail },
];

export default function AdminPortal() {
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [exhibitors, setExhibitors] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [agendaList, setAgendaList] = useState([]);
  const [subscriptionsList, setSubscriptionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ic_token');
    const role = localStorage.getItem('ic_role');
    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }
    Promise.all([
      partAPI.getAll().catch(() => []),
      exAPI.getAll().catch(() => []),
      wsAPI.getAll().catch(() => []),
      agendaAPI.getAll().catch(() => []),
      subscriptionAPI.getAll().catch(() => []),
    ]).then(([p, e, w, a, s]) => {
      setParticipantsList(p);
      setExhibitors(e);
      setWorkshops(w);
      setAgendaList(a);
      setSubscriptionsList(s);
    }).finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ic_token');
    localStorage.removeItem('ic_role');
    localStorage.removeItem('ic_user');
    navigate('/login');
  };

  const pendingCount = exhibitors.filter(e => e.status === 'pending').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-orange-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-black transition-colors duration-500">

      {/* ── SIDEBAR ── */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} shrink-0 bg-white dark:bg-black border-r border-slate-100 dark:border-white/10 flex flex-col transition-all duration-300 min-h-screen sticky top-0 z-40`}>
        <div className="p-4 border-b border-slate-100 dark:border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-orange-300 to-indigo-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && <span className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">Admin Portal</span>}
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-sm font-bold text-sm transition-all ${tab === key
                ? "bg-orange-300 dark:bg-orange-300/20 text-white "
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
              {key === "exhibitors" && pendingCount > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-sm flex items-center justify-center shrink-0">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100 dark:border-white/10">
          <button onClick={handleLogout} className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all`}>
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="bg-white dark:bg-black border-b border-slate-100 dark:border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-sm text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
              <ChevronDown className={`w-4 h-4 transition-transform ${sidebarOpen ? "rotate-0" : "-rotate-90"}`} />
            </button>
            <div>
              <h1 className="font-extrabold text-slate-900 dark:text-white text-base capitalize">{tab}</h1>
              <p className="text-xs text-slate-400 font-medium">Innovation Conclave 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-sm bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {pendingCount > 0 && (
              <button onClick={() => setTab("exhibitors")} className="relative p-2.5 rounded-sm bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-500/20 text-amber-500">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </button>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-300 to-indigo-600 flex items-center justify-center text-white text-[10px] font-extrabold">A</div>
              <span className="text-slate-900 dark:text-white font-bold text-sm">Admin</span>
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {tab === "overview" && <OverviewTab exhibitors={exhibitors} participants={participantsList} workshops={workshops} setTab={setTab} subscriberCount={subscriptionsList.length} />}
              {tab === "exhibitors" && <ExhibitorsTab exhibitors={exhibitors} setExhibitors={setExhibitors} />}
              {tab === "participants" && <ParticipantsTab participants={participantsList} setParticipants={setParticipantsList} />}
              {tab === "workshops" && <WorkshopsTab workshops={workshops} setWorkshops={setWorkshops} />}
              {tab === "agenda" && <AgendaTab agendaList={agendaList} setAgendaList={setAgendaList} />}
              {tab === "subscriptions" && <SubscriptionsTab subscriptions={subscriptionsList} />}
              {isDark && <Networktwo />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── SUBSCRIPTIONS TAB ────────────────────────────────────────────────────────
function SubscriptionsTab({ subscriptions }) {
  const exportEmails = () => {
    const csv = [
      "Email,Subscribed At",
      ...subscriptions.map(s => `${s.email},${new Date(s.subscribed_at).toLocaleString()}`)
    ].join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-black p-5 border border-slate-100 dark:border-white/10 rounded-sm shadow-sm transition-colors duration-500">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Newsletter Subscriptions</h2>
          <p className="text-xs text-slate-500 font-medium">Capture and manage email leads from the website footer</p>
        </div>
        <button
          onClick={exportEmails}
          disabled={subscriptions.length === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-sm bg-orange-300 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-orange-300 transition-all shadow-lg shadow-orange-300/20 disabled:opacity-50"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-black border border-slate-100 dark:border-white/10 rounded-sm overflow-hidden shadow-sm transition-colors duration-500">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
              <th className="text-left py-4 px-6 text-[10px] uppercase font-bold text-slate-400 tracking-widest">Subscriber Email</th>
              <th className="text-left py-4 px-6 text-[10px] uppercase font-bold text-slate-400 tracking-widest">Subscription Date</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan="2" className="py-20 text-center text-slate-400 font-bold italic">No subscriptions found yet.</td>
              </tr>
            ) : (
              subscriptions.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-400/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-orange-400" />
                      </div>
                      <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">{s.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold text-xs">
                    {new Date(s.subscribed_at).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
