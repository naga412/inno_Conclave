import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays, MapPin, Download, LogOut,
  User, Mail, Phone, GraduationCap, Utensils, UtensilsCrossed,
  Sun, Moon, Loader2, CreditCard, Camera, Pencil, Check, X,
  BookOpen, Clock, CheckCircle2, Hand
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { participants as partAPI, agenda as agendaAPI, workshops as wsAPI } from '../api/client';
import IDCardPDF from '../components/IDCardPDF';

const TAG_COLORS = {
  Admin: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
  Keynote: "bg-orange-300 dark:bg-orange-300/20 text-orange-300 dark:text-orange-300",
  Expo: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  Lunch: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  Workshop: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  Panel: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  Awards: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
};

function downloadParticipantDetails(p) {
  const headers = [
    "Ticket ID",
    "Full Name",
    "Email",
    "Phone",
    "College / Org",
    "Department",
    "Lunch",
    "Lunch Status",
    "Registered On"
  ];

  const row = [
    `IC2026-${String(p.id).padStart(5, '0')}`,
    p.name,
    p.email,
    p.phone,
    p.college,
    p.department,
    p.lunch ? "Yes" : "No",
    p.lunch ? (p.lunch_status === "confirmed" ? "Confirmed" : "Pending Verification") : "N/A",
    new Date(p.registered_at).toLocaleDateString()
  ];

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvContent = headers.map(escapeCsv).join(",") + "\n" + row.map(escapeCsv).join(",");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `IC2026-${String(p.id).padStart(5, '0')}_Details.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ParticipantDashboard() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [myWorkshops, setMyWorkshops] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ic_token");
    const role = localStorage.getItem("ic_role");
    if (!token || role !== "participant") {
      navigate("/login");
      return;
    }

    Promise.all([
      partAPI.getMe(),
      agendaAPI.getAll().catch(() => []),
      wsAPI.getMyRegistrations().catch(() => [])
    ])
      .then(([data, agendaData, workshopsData]) => {
        setProfile({
          ...data,
          photo_url: data.photo_url ? `http://localhost:4000${data.photo_url}` : null
        });
        // Map agenda data to dashboard expected format
        const mapped = agendaData.map(a => ({
          time: a.time_label,
          event: a.title,
          tag: a.category || "Event",
          day: a.day
        }));
        setSchedule(mapped);
        setMyWorkshops(workshopsData);
      })
      .catch((err) => {
        setError(err.message);
        if (err.status === 401 || err.status === 403) {
          localStorage.clear();
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ic_token");
    localStorage.removeItem("ic_role");
    localStorage.removeItem("ic_user");
    navigate("/login");
  };

  const photoInputRef = useRef(null);
  const [photoUploading, setPhotoUploading] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      const fd = new FormData();
      fd.append('photo', file);
      const result = await partAPI.updatePhoto(fd);
      // Update profile with new photo
      setProfile(prev => ({ ...prev, photo: result.photo }));
    } catch (err) {
      console.error('Photo upload failed:', err);
    } finally {
      setPhotoUploading(false);
    }
  };

  // ── Edit Profile ──
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '', college: '', department: '' });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState('');

  const handleSaveProfile = async () => {
    setSaving(true);
    setEditError('');
    try {
      const updated = await partAPI.updateProfile(editData);
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      setEditError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
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

  const p = profile;
  const ticketId = `IC2026-${String(p.id).padStart(5, '0')}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">

      {/* App Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/10 px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
        <div className="flex items-center gap-3">
          {/* Clickable avatar with photo upload */}
          <input type="file" accept="image/*" ref={photoInputRef} className="hidden" onChange={handlePhotoChange} />
          <button
            onClick={() => photoInputRef.current?.click()}
            className="relative w-10 h-10 rounded-sm overflow-hidden shadow-lg group"
            title="Change photo"
          >
            {profile.photo ? (
              <img
                src={`http://localhost:4000/uploads/participants/${profile.photo}`}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-300 to-indigo-600 flex items-center justify-center font-extrabold text-white text-sm">
                {p.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            {/* Camera overlay on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {photoUploading ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Camera className="w-4 h-4 text-white" />
              )}
            </div>
          </button>
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight">{p.name}</p>
            <p className="text-[10px] text-slate-400 font-medium">Participant · {ticketId}</p>
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
          <button
            onClick={() => downloadParticipantDetails(p)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-bold bg-orange-300 text-white hover:bg-orange-300 transition-all shadow-lg shadow-orange-300/20 hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Details</span>
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-black rounded-sm p-7 overflow-hidden shadow-2xl shadow-orange-300/20"
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/30 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="text-xs text-orange-300 font-bold uppercase tracking-widest mb-1">Participant Dashboard</p>
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">Hey, {p.name.split(" ")[0]}! <Hand className="w-6 h-6 outline-none" strokeWidth={2} /></h1>
              <p className="text-orange-300 text-sm mt-1.5">Innovation Conclave 2026 · March 28–29 · AITAM, Tekkali</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-center">
                <p className="text-xs text-orange-300 font-bold mb-0.5">Ticket ID</p>
                <p className="text-sm font-extrabold text-white">{ticketId}</p>
              </div>
              {p.lunch ? (
                <div className={`border rounded-sm px-4 py-3 text-center ${p.lunch_status === "confirmed"
                  ? "bg-emerald-400/20 border-emerald-300/30"
                  : "bg-amber-400/20 border-amber-300/30"
                  }`}>
                  <p className="text-xs font-bold mb-0.5 text-white/70">Lunch</p>
                  <p className={`text-sm font-extrabold ${p.lunch_status === "confirmed" ? "text-emerald-300" : "text-amber-300"}`}>
                    {p.lunch_status === "confirmed" ? <span className="flex items-center gap-1 justify-center"><CheckCircle2 className="w-3.5 h-3.5 inline" /> Confirmed</span> : <span className="flex items-center gap-1 justify-center"><Clock className="w-3.5 h-3.5 inline" /> Pending</span>}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Participant Details Card — Editable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-300" />
                <h2 className="font-extrabold text-slate-900 dark:text-white text-base">My Details</h2>
              </div>
              {!editing ? (
                <button
                  onClick={() => {
                    setEditData({ name: p.name, phone: p.phone, college: p.college, department: p.department });
                    setEditing(true);
                    setEditError('');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold text-orange-300 dark:text-orange-300 bg-orange-300/20 dark:bg-orange-300/20 hover:bg-orange-300 dark:hover:bg-orange-300/30 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Save
                  </button>
                  <button
                    onClick={() => { setEditing(false); setEditError(''); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                </div>
              )}
            </div>

            {editError && (
              <div className="mb-4 px-3 py-2 rounded-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold">
                {editError}
              </div>
            )}

            <div className="flex flex-col gap-6">
              {/* Photo Edit Section */}
              <div className="flex items-center gap-4 p-4 rounded-sm border border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50">
                <div className="relative w-16 h-16 rounded-sm overflow-hidden shadow-md">
                  {profile.photo ? (
                    <img
                      src={`http://localhost:4000/uploads/participants/${profile.photo}`}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-300 to-indigo-600 flex items-center justify-center font-extrabold text-white text-xl">
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                  {photoUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Profile Photo</p>
                  <p className="text-xs text-slate-500 mb-2">Used for your event ID card</p>
                  <button
                    onClick={() => photoInputRef.current?.click()}
                    disabled={photoUploading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold text-orange-300 dark:text-orange-300 bg-orange-300/20 dark:bg-orange-300/20 hover:bg-orange-300 dark:hover:bg-orange-300/40 transition-colors disabled:opacity-50"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">

                {[
                  { Icon: User, label: "Full Name", key: "name", value: p.name, editable: true },
                  { Icon: Mail, label: "Email", key: "email", value: p.email, editable: false },
                  { Icon: Phone, label: "Phone", key: "phone", value: p.phone, editable: true },
                  { Icon: GraduationCap, label: "College / Org", key: "college", value: p.college, editable: true },
                  { Icon: GraduationCap, label: "Department", key: "department", value: p.department, editable: true },
                ].map(({ Icon, label, key, value, editable }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-sm bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{label}</p>
                      {editing && editable ? (
                        <input
                          type="text"
                          value={editData[key]}
                          onChange={e => setEditData(d => ({ ...d, [key]: e.target.value }))}
                          className="w-full mt-1 px-3 py-2 rounded-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-300/30 focus:border-orange-300 transition-all"
                        />
                      ) : (
                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Lunch badge */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    {p.lunch ? <Utensils className="w-4 h-4 text-emerald-500" /> : <UtensilsCrossed className="w-4 h-4 text-slate-400" />}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Lunch</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{p.lunch ? "Opted In (₹100)" : "Not selected"}</p>
                      {p.lunch ? (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${p.lunch_status === "confirmed"
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                          }`}>
                          {p.lunch_status === "confirmed" ? "Confirmed" : "Pending"}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => downloadParticipantDetails(p)}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-gradient-to-r from-orange-700 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-orange-300/20 hover:from-orange-300 hover:to-indigo-500 transition-all hover:scale-[1.02] active:scale-95"
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
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays className="w-4 h-4 text-indigo-500" />
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Day 1 Schedule</h2>
            </div>
            <div className="relative pl-6 border-l-2 border-slate-100 dark:border-white/10 flex flex-col gap-6">
              {schedule.filter(s => s.day === 'Day 1').slice(0, 7).map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[1.625rem] w-3.5 h-3.5 rounded-sm bg-emerald-500 border-4 border-white dark:border-slate-900 shadow transition-transform group-hover:scale-125" />
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">{item.time}</p>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm ${TAG_COLORS[item.tag] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{item.event}</p>
                </div>
              ))}
              {schedule.filter(s => s.day === 'Day 1').length === 0 && (
                <p className="text-xs text-slate-400 font-medium">No schedule available.</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* My Registered Workshops Section */}
        {myWorkshops.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.17 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-4 h-4 text-orange-400" />
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">My Registered Workshops</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myWorkshops.map(w => (
                <div key={w.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-sm p-5 border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-transparent rounded-bl-full pointer-events-none" />
                  <span className="inline-block px-2 py-1 mb-2 rounded bg-orange-100 dark:bg-orange-900/30 text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">{w.category || "Workshop"}</span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1 leading-tight">{w.title}</h3>
                  <p className="text-xs font-medium text-slate-500 mb-4">{w.speaker}</p>

                  <div className="flex items-center gap-4 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5 text-indigo-400" /> {w.day}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-pink-400" /> {w.time} ({w.duration})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ID Card Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-5">
            <CreditCard className="w-4 h-4 text-purple-500" />
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Your Event ID Card</h2>
          </div>
          <IDCardPDF participant={p} />
        </motion.div>

        {/* Venue Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm p-6 shadow-sm"
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
              <div key={k} className="bg-slate-50 dark:bg-slate-800/50 rounded-sm p-4">
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
