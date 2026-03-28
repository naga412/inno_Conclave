import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays, Users, Upload,
  MapPin, QrCode, Bell, LogOut, Star, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const stats = [
  { label: "Visitors Today", value: "128", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { label: "Leads Collected", value: "34", icon: Star, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { label: "Days to Event", value: "3", icon: CalendarDays, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  { label: "Badge Scans", value: "67", icon: QrCode, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
];

const timeline = [
  { time: "09:00 AM", event: "Expo Floor Opens", day: "March 28" },
  { time: "11:30 AM", event: "Innovation Showcase Begins", day: "March 28" },
  { time: "02:00 PM", event: "Judges Walkthrough", day: "March 28" },
  { time: "04:30 PM", event: "Audience Voting Opens", day: "March 28" },
  { time: "06:00 PM", event: "Awards Ceremony", day: "March 28" },
];

const notices = [
  "Your payment has been verified. Booth details will be emailed within 24 hours.",
  "Please bring 3 printed copies of your project poster to the event.",
  "Booth setup window: 7:30 AM – 9:00 AM on Day 1.",
];

export default function ExhibitorDashboard() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Top App Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-sm shadow-lg">EX</div>
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight">TechNova Labs</p>
            <p className="text-[10px] text-slate-400 font-medium">Exhibitor — Booth #14</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button className="relative p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 flex flex-col gap-8">

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-7 md:p-10 overflow-hidden shadow-2xl shadow-blue-500/20"
        >
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute right-20 bottom-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/3 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-2">Exhibitor Dashboard</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">Welcome, TechNova Labs! 🎉</h1>
              <p className="text-blue-200 text-sm font-medium">Innovation Conclave 2026 · March 28–29 · AITAM, Tekkali</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center">
                <p className="text-white font-extrabold text-2xl">🏆</p>
                <p className="text-blue-200 text-xs font-bold mt-1">Registered</p>
              </div>
              <div className="bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/30 rounded-2xl px-5 py-3 text-center">
                <p className="text-emerald-300 font-extrabold text-sm">✔ Paid</p>
                <p className="text-emerald-200 text-xs font-bold mt-1">₹500</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Notices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <Bell className="w-4 h-4 text-blue-500" />
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Important Notices</h2>
            </div>
            <div className="flex flex-col gap-3">
              {notices.map((n, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{n}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Booth Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-4 h-4 text-purple-500" />
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Booth Details</h2>
            </div>
            <div className="flex flex-col gap-4">
              {[
                ["Booth Number", "#14"],
                ["Hall", "Innovation Expo Hall"],
                ["Location", "AITAM Ground Floor"],
                ["Setup Time", "7:30 AM – 9:00 AM"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{k}</p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{v}</p>
                </div>
              ))}
              <button className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold text-sm border border-purple-100 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <QrCode className="w-4 h-4" /> Download QR Badge
              </button>
            </div>
          </motion.div>
        </div>

        {/* Event Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays className="w-4 h-4 text-emerald-500" />
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Day 1 Schedule</h2>
          </div>
          <div className="relative pl-6 border-l-2 border-slate-100 dark:border-white/10 flex flex-col gap-5">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[1.625rem] w-3.5 h-3.5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow" />
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">{item.time}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{item.event}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upload More Docs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-4 h-4 text-blue-500" />
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Upload Additional Materials</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Updated Poster", "Project Report PDF", "Demo Video Link", "Team Photo"].map(label => (
              <label key={label} className="flex items-center gap-3 border border-dashed border-slate-200 dark:border-white/10 rounded-xl p-4 cursor-pointer hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                <input type="file" className="sr-only" />
                <Upload className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
