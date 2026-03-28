import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays, MapPin, Download, Bell, LogOut,
  User, Mail, Phone, GraduationCap, Utensils, UtensilsCrossed,
  CheckCircle2, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

// Mock participant data — in production this would come from auth/API
const participant = {
  name: "Arjun Reddy",
  email: "arjun.reddy@aitam.in",
  phone: "+91 98765 43210",
  college: "AITAM, Tekkali",
  dept: "Computer Science & Engineering",
  lunch: true,
  ticketId: "IC2026-00345",
  registeredOn: "March 28, 2026",
  lunchStatus: "pending", // "pending" | "confirmed"
};

const schedule = [
  { time: "09:00 AM", event: "Registration & Badge Collection", tag: "Admin" },
  { time: "10:00 AM", event: "Opening Keynote", tag: "Keynote" },
  { time: "11:30 AM", event: "Innovation Showcase Opens", tag: "Expo" },
  { time: "01:00 PM", event: "Networking Lunch", tag: "Lunch" },
  { time: "02:30 PM", event: "Workshop: AI & The Future", tag: "Workshop" },
  { time: "04:00 PM", event: "Panel Discussion", tag: "Panel" },
  { time: "05:30 PM", event: "Awards & Closing Ceremony", tag: "Awards" },
];

const TAG_COLORS = {
  Admin: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
  Keynote: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  Expo: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  Lunch: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  Workshop: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  Panel: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  Awards: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
};

function downloadParticipantDetails(p) {
  const lines = [
    "INNOVATION CONCLAVE 2026 — PARTICIPANT DETAILS",
    "================================================",
    `Ticket ID       : ${p.ticketId}`,
    `Full Name       : ${p.name}`,
    `Email           : ${p.email}`,
    `Phone           : ${p.phone}`,
    `College / Org   : ${p.college}`,
    `Department      : ${p.dept}`,
    `Lunch           : ${p.lunch ? "Yes (₹100)" : "No"}`,
    `Lunch Status    : ${p.lunch ? (p.lunchStatus === "confirmed" ? "Confirmed" : "Pending Verification") : "N/A"}`,
    `Registered On   : ${p.registeredOn}`,
    "",
    "Event: March 28-29, 2026 · AITAM, Tekkali",
    "================================================",
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `IC2026_${p.ticketId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ParticipantDashboard() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">

      {/* App Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/10 px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-sm shadow-lg">
            {participant.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight">{participant.name}</p>
            <p className="text-[10px] text-slate-400 font-medium">Participant · {participant.ticketId}</p>
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
          <button
            onClick={() => downloadParticipantDetails(participant)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Details</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[2rem] p-7 overflow-hidden shadow-2xl shadow-blue-500/20"
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-1">Participant Dashboard</p>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Hey, {participant.name.split(" ")[0]}! 👋</h1>
              <p className="text-blue-200 text-sm mt-1.5">Innovation Conclave 2026 · March 28–29 · AITAM, Tekkali</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-center">
                <p className="text-xs text-blue-200 font-bold mb-0.5">Ticket ID</p>
                <p className="text-sm font-extrabold text-white">{participant.ticketId}</p>
              </div>
              {participant.lunch && (
                <div className={`border rounded-2xl px-4 py-3 text-center ${
                  participant.lunchStatus === "confirmed"
                    ? "bg-emerald-400/20 border-emerald-300/30"
                    : "bg-amber-400/20 border-amber-300/30"
                }`}>
                  <p className="text-xs font-bold mb-0.5 text-white/70">Lunch</p>
                  <p className={`text-sm font-extrabold ${participant.lunchStatus === "confirmed" ? "text-emerald-300" : "text-amber-300"}`}>
                    {participant.lunchStatus === "confirmed" ? "✔ Confirmed" : "⏳ Pending"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Participant Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <User className="w-4 h-4 text-blue-500" />
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">My Details</h2>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { Icon: User, label: "Full Name", value: participant.name },
                { Icon: Mail, label: "Email", value: participant.email },
                { Icon: Phone, label: "Phone", value: participant.phone },
                { Icon: GraduationCap, label: "College / Org", value: participant.college },
                { Icon: GraduationCap, label: "Department", value: participant.dept },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{label}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
                  </div>
                </div>
              ))}

              {/* Lunch badge */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  {participant.lunch ? <Utensils className="w-4 h-4 text-emerald-500" /> : <UtensilsCrossed className="w-4 h-4 text-slate-400" />}
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Lunch</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{participant.lunch ? "Opted In (₹100)" : "Not selected"}</p>
                    {participant.lunch && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        participant.lunchStatus === "confirmed"
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                      }`}>
                        {participant.lunchStatus === "confirmed" ? "Confirmed" : "Pending"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => downloadParticipantDetails(participant)}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download Participant Details
            </button>
          </motion.div>

          {/* Event Day Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays className="w-4 h-4 text-indigo-500" />
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Day 1 Schedule</h2>
            </div>
            <div className="relative pl-5 border-l-2 border-slate-100 dark:border-white/10 flex flex-col gap-4">
              {schedule.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[1.45rem] w-3 h-3 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-900" />
                  <div className="flex items-start gap-3">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{item.time}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{item.event}</p>
                    </div>
                    <span className={`shrink-0 mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[item.tag] || ""}`}>{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Venue Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-pink-500" />
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Venue & Event Info</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              ["Venue", "AITAM Auditorium"],
              ["Location", "Tekkali, AP"],
              ["Dates", "March 28–29, 2026"],
              ["Timing", "9:00 AM – 6:00 PM"],
            ].map(([k, v]) => (
              <div key={k} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <p className="text-[10px] uppercase text-slate-400 tracking-widest font-bold mb-1">{k}</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">{v}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
