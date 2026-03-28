import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Presentation, BookOpen,
  LogOut, CheckCircle2, XCircle, Clock, ChevronDown,
  Plus, Trash2, Edit3, Search, Bell, TrendingUp,
  ShieldAlert, Download, AlertCircle, Save, X, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MOCK_EXHIBITORS = [
  { id: 1, org: "TechNova Labs", type: "startup", contact: "Ravi Kumar", email: "ravi@technova.in", poster: "technova_poster.png", payment: "receipt_1.pdf", status: "pending" },
  { id: 2, org: "AITAM - CSE Dept", type: "college", year: "3rd", contact: "Priya S", email: "priya@aitam.in", poster: "aitam_poster.png", payment: "receipt_2.pdf", status: "approved" },
  { id: 3, org: "GreenBridge Solutions", type: "startup", contact: "Kiran M", email: "kiran@greenbridge.io", poster: "gb_poster.png", payment: "receipt_3.pdf", status: "pending" },
  { id: 4, org: "RGUKT - ECE Dept", type: "college", year: "2nd", contact: "Sai P", email: "sai@rgukt.ac.in", poster: "rgukt_poster.png", payment: "receipt_4.pdf", status: "rejected" },
  { id: 5, org: "HealthTech India", type: "startup", contact: "Meera D", email: "meera@healthtech.in", poster: "ht_poster.png", payment: "receipt_5.pdf", status: "pending" },
];

const MOCK_PARTICIPANTS = [
  { id: 1, name: "Arjun Reddy", email: "arjun@aitam.in", phone: "9876543210", college: "AITAM", dept: "CSE", lunch: true, lunchStatus: "pending", registered: "Mar 27" },
  { id: 2, name: "Sneha Rao", email: "sneha@gmail.com", phone: "9123456789", college: "RGUKT", dept: "IT", lunch: false, lunchStatus: null, registered: "Mar 27" },
  { id: 3, name: "Karthik Nair", email: "kn@kluniversity.in", phone: "9988776655", college: "KL University", dept: "ECE", lunch: true, lunchStatus: "confirmed", registered: "Mar 28" },
  { id: 4, name: "Divya Subramani", email: "divya@vitap.ac.in", phone: "8877665544", college: "VIT-AP", dept: "CSE", lunch: true, lunchStatus: "pending", registered: "Mar 28" },
  { id: 5, name: "Rohit Verma", email: "rohit@srm.edu.in", phone: "7766554433", college: "SRM", dept: "Mechanical", lunch: false, lunchStatus: null, registered: "Mar 28" },
];

const INITIAL_WORKSHOPS = [
  { id: 1, title: "AI & Machine Learning in Practice", speaker: "Dr. Arjun Mehta", time: "10:00 AM", duration: "2 hrs", day: "Day 1", seats: 50, category: "AI" },
  { id: 2, title: "Web3 & Blockchain for Beginners", speaker: "Priya Sharma", time: "02:00 PM", duration: "1.5 hrs", day: "Day 1", seats: 40, category: "Web3" },
  { id: 3, title: "Startup Pitch Masterclass", speaker: "Rahul Verma", time: "10:00 AM", duration: "2 hrs", day: "Day 2", seats: 60, category: "Entrepreneurship" },
  { id: 4, title: "Sustainable Tech & Green Innovation", speaker: "Dr. Meera Pillai", time: "01:00 PM", duration: "1.5 hrs", day: "Day 2", seats: 45, category: "GreenTech" },
];

const STATUS_BADGE = {
  approved:  { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", label: "Approved" },
  pending:   { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500", label: "Pending" },
  rejected:  { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", dot: "bg-red-500", label: "Rejected" },
  confirmed: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", label: "Confirmed" },
};

// ─── STAT CARD ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, Icon, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{value}</p>
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
function OverviewTab({ exhibitors, participants, workshops }) {
  const approved = exhibitors.filter(e => e.status === "approved").length;
  const pending = exhibitors.filter(e => e.status === "pending").length;
  const lunchPending = participants.filter(p => p.lunch && p.lunchStatus === "pending").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Participants" value={participants.length} sub={`+${participants.filter(p => p.registered === "Mar 28").length} today`} color="bg-blue-500" Icon={Users} delay={0} />
        <StatCard label="Exhibitors" value={exhibitors.length} sub={`${approved} approved, ${pending} pending`} color="bg-purple-500" Icon={Presentation} delay={0.05} />
        <StatCard label="Workshops" value={workshops.length} sub="2 per day" color="bg-indigo-500" Icon={BookOpen} delay={0.1} />
        <StatCard label="Lunch Pending" value={lunchPending} sub="Awaiting verification" color="bg-amber-500" Icon={AlertCircle} delay={0.15} />
      </div>

      {/* Quick action: pending exhibitors */}
      {pending > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-4 flex items-center gap-4">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-amber-700 dark:text-amber-400 text-sm">{pending} exhibitor{pending > 1 ? "s" : ""} awaiting approval</p>
            <p className="text-xs text-amber-600/70 dark:text-amber-300/60 mt-0.5">Review and approve or reject registrations to proceed.</p>
          </div>
        </div>
      )}

      {/* Recent registrations */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-6 shadow-sm">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-sm mb-4">Recent Participant Registrations</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/5">
              {["Name", "College", "Lunch", "Registered"].map(h => (
                <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold pb-3 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {participants.slice(0, 5).map((p, i) => (
              <tr key={p.id} className="border-b border-slate-50 dark:border-white/5 last:border-0">
                <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">{p.name}</td>
                <td className="py-3 pr-4 text-slate-500 dark:text-slate-400">{p.college}</td>
                <td className="py-3 pr-4">{p.lunch ? <Badge status={p.lunchStatus} /> : <span className="text-slate-400 text-xs">No</span>}</td>
                <td className="py-3 text-slate-400 text-xs">{p.registered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── EXHIBITORS TAB ──────────────────────────────────────────────────────────
function ExhibitorsTab({ exhibitors, setExhibitors }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const setStatus = (id, status) =>
    setExhibitors(prev => prev.map(e => e.id === id ? { ...e, status } : e));

  const filtered = exhibitors.filter(e => {
    const matchFilter = filter === "all" || e.status === filter;
    const matchSearch = e.org.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

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
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          {["all", "pending", "approved", "rejected"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-all ${
                filter === f ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50">
                {["Organisation", "Type", "Contact", "Files", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900 dark:text-white">{e.org}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{e.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 capitalize">{e.type}{e.year ? ` · ${e.year} yr` : ""}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300 text-xs">{e.contact}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-blue-500 font-bold">📄 {e.poster}</span>
                      <span className="text-[10px] text-emerald-500 font-bold">💳 {e.payment}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge status={e.status} /></td>
                  <td className="px-5 py-4">
                    {e.status === "pending" ? (
                      <div className="flex gap-2">
                        <button onClick={() => setStatus(e.id, "approved")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-500 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button onClick={() => setStatus(e.id, "rejected")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setStatus(e.id, "pending")}
                        className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline">
                        Reset
                      </button>
                    )}
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

  const setLunchStatus = (id, status) =>
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, lunchStatus: status } : p));

  const removeParticipant = (id) =>
    setParticipants(prev => prev.filter(p => p.id !== id));

  const filtered = participants.filter(p => {
    const matchFilter = filter === "all"
      ? true
      : filter === "lunch"
      ? p.lunch
      : filter === "no-lunch"
      ? !p.lunch
      : true;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const downloadAll = () => {
    const lines = [
      "INNOVATION CONCLAVE 2026 — ALL PARTICIPANTS",
      "============================================",
      ...participants.map((p, i) =>
        `${i + 1}. ${p.name} | ${p.email} | ${p.college} | ${p.dept} | Lunch: ${p.lunch ? "Yes (" + p.lunchStatus + ")" : "No"} | Registered: ${p.registered}`
      ),
      "",
      `Total: ${participants.length} participants`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "IC2026_Participants.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search participants…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap">
          {[["all","All"],["lunch","Lunch"],["no-lunch","No Lunch"]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-all ${
                filter === k ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400"
              }`}>{l}</button>
          ))}
          <button onClick={downloadAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">
            <Download className="w-3.5 h-3.5" /> Export All
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50">
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
                    {p.college}<br /><span className="text-slate-400">{p.dept}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300 text-xs">{p.phone}</td>
                  <td className="px-5 py-4">
                    {p.lunch ? (
                      <div className="flex flex-col gap-1.5">
                        <Badge status={p.lunchStatus} />
                        {p.lunchStatus === "pending" && (
                          <button onClick={() => setLunchStatus(p.id, "confirmed")}
                            className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                            ✔ Confirm Payment
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-xs">{p.registered}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => removeParticipant(p.id)}
                      className="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
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

  const openNew = () => { setForm(EMPTY_WS); setEditing(null); setShowForm(true); };
  const openEdit = (w) => { setForm({ ...w }); setEditing(w.id); setShowForm(true); };

  const save = () => {
    if (!form.title || !form.speaker) return;
    if (editing) {
      setWorkshops(prev => prev.map(w => w.id === editing ? { ...form, id: editing } : w));
    } else {
      setWorkshops(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const del = (id) => setWorkshops(prev => prev.filter(w => w.id !== id));

  const CATEGORY_COLORS = {
    AI: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    Web3: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
    Entrepreneurship: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
    GreenTech: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600",
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{workshops.length} workshops registered</p>
        <button onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4" /> Add Workshop
        </button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-6 shadow-sm"
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">Day</label>
                <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm">
                  <option>Day 1</option>
                  <option>Day 2</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={save}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
                <Save className="w-4 h-4" /> {editing ? "Save Changes" : "Add Workshop"}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5">
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
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{w.title}</h4>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => openEdit(w)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => del(w.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mb-3">🎤 {w.speaker}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {w.category && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[w.category] || "bg-slate-100 dark:bg-slate-700 text-slate-600"}`}>{w.category}</span>
                    )}
                    <span className="text-[10px] text-slate-400 font-medium">⏰ {w.time} · {w.duration}</span>
                    {w.seats && <span className="text-[10px] text-slate-400 font-medium">💺 {w.seats} seats</span>}
                  </div>
                </motion.div>
              ))}
              {workshops.filter(w => w.day === day).length === 0 && (
                <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center text-slate-400 text-xs font-medium">
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

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
const NAV = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "exhibitors", label: "Exhibitors", Icon: Presentation },
  { key: "participants", label: "Participants", Icon: Users },
  { key: "workshops", label: "Workshops", Icon: BookOpen },
];

export default function AdminPortal() {
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [exhibitors, setExhibitors] = useState(MOCK_EXHIBITORS);
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
  const [workshops, setWorkshops] = useState(INITIAL_WORKSHOPS);
  const { isDark, toggleTheme } = useTheme();

  const pendingCount = exhibitors.filter(e => e.status === "pending").length;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-500">

      {/* ── SIDEBAR ── */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} shrink-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-white/10 flex flex-col transition-all duration-300 min-h-screen sticky top-0 z-40`}>
        <div className="p-4 border-b border-slate-100 dark:border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && <span className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">Admin Portal</span>}
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all ${
                tab === key
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
              {key === "exhibitors" && pendingCount > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100 dark:border-white/10">
          <a href="/login" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all`}>
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && "Logout"}
          </a>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
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
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {pendingCount > 0 && (
              <button onClick={() => setTab("exhibitors")} className="relative p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-500/20 text-amber-500">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </button>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-extrabold">A</div>
              <span className="text-slate-900 dark:text-white font-bold text-sm">Admin</span>
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {tab === "overview" && <OverviewTab exhibitors={exhibitors} participants={participants} workshops={workshops} />}
              {tab === "exhibitors" && <ExhibitorsTab exhibitors={exhibitors} setExhibitors={setExhibitors} />}
              {tab === "participants" && <ParticipantsTab participants={participants} setParticipants={setParticipants} />}
              {tab === "workshops" && <WorkshopsTab workshops={workshops} setWorkshops={setWorkshops} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
