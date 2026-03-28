import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Ticket, Presentation, ShieldAlert } from 'lucide-react';

const roles = [
    { key: "participant", label: "Participant", icon: Ticket },
    { key: "exhibitor", label: "Exhibitor", icon: Presentation },
    { key: "admin", label: "Admin", icon: ShieldAlert },
];

export default function LoginPage() {
    const [role, setRole] = useState("participant");
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-950 transition-colors duration-500 pt-16">

            {/* ── LEFT IMAGE PANEL ── */}
            <div className="hidden lg:flex relative w-[55%] overflow-hidden">
                <img
                    src="/login_panel.png"
                    alt="Innovation Conclave event"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                {/* Text overlay */}
                <div className="relative z-20 flex flex-col justify-center p-12 h-full">
                    {/* <div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              INNOVATION<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">CONCLAVE</span>
            </span>
          </div> */}
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={role}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-sm text-blue-300 font-bold uppercase tracking-widest mb-3">
                                    {role === "participant" ? "Attendee Portal" : role === "exhibitor" ? "Exhibitor Portal" : "Admin Control"}
                                </p>
                                <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
                                    {role === "participant" && "Your Front Row Seat to the Future"}
                                    {role === "exhibitor" && "Showcase Your Innovation"}
                                    {role === "admin" && "Command the Conclave"}
                                </h2>
                                <p className="text-white/60 text-base font-medium leading-relaxed max-w-sm">
                                    {role === "participant" && "Access your schedule, connect with speakers, and get the most out of Innovation Conclave 2026."}
                                    {role === "exhibitor" && "Manage your booth, engage with leads, and represent your organisation at the biggest conclave of the year."}
                                    {role === "admin" && "Full control over event management, exhibitor approvals, and attendee data."}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex gap-8 mt-8">
                            {[["500+", "Speakers"], ["120+", "Exhibitors"], ["5000+", "Attendees"]].map(([v, l]) => (
                                <div key={l}>
                                    <p className="text-2xl font-extrabold text-white">{v}</p>
                                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold mt-0.5">{l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-white/30 text-xs font-medium">March 28-29, 2026 · AITAM, Tekkali</p>
                </div>
            </div>

            {/* ── RIGHT FORM PANEL ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-2xl dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
                    <div className="p-8 md:p-10">

                        <div className="mb-8 text-center">
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-slate-400 dark:text-slate-500 mb-2">Innovation Conclave 2026</p>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome back</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Sign in to access your portal</p>
                        </div>

                        {/* Role Tabs */}
                        <div className="flex gap-1 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/10 mb-8">
                            {roles.map((r) => {
                                const Icon = r.icon;
                                const active = role === r.key;
                                return (
                                    <button
                                        key={r.key}
                                        onClick={() => setRole(r.key)}
                                        className={`relative flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors z-10 ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                            }`}
                                    >
                                        {active && (
                                            <motion.div
                                                layoutId="roleTab"
                                                className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-sm z-[-1] border border-slate-200 dark:border-white/10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                                            />
                                        )}
                                        <Icon className="w-4 h-4" strokeWidth={2} />
                                        {r.label}
                                    </button>
                                );
                            })}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={role}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="text-xs text-slate-400 dark:text-slate-500 text-center mb-6 font-medium"
                            >
                                {role === "participant" && "Sign in to manage your schedule & tickets"}
                                {role === "exhibitor" && "Sign in to manage your booth & leads"}
                                {role === "admin" && "Sign in to access the system dashboard"}
                            </motion.p>
                        </AnimatePresence>

                        <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
                                <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                    <input type="email" placeholder="you@example.com" className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Password</label>
                                    <a href="#" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</a>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                    <input type={showPass ? "text" : "password"} placeholder="••••••••" className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium tracking-widest" />
                                    <button type="button" onClick={() => setShowPass(v => !v)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.015 }}
                                whileTap={{ scale: 0.97 }}
                                className="mt-1 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-900/20 transition-all group"
                            >
                                Sign In as {roles.find(r => r.key === role)?.label}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </form>

                        {role === "participant" && (
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">
                                No account yet?{" "}
                                <a href="/participant-register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Register for the event</a>
                            </p>
                        )}
                        {role === "exhibitor" && (
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">
                                Not registered yet?{" "}
                                <a href="/exhibitor-register" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">Register as an Exhibitor →</a>
                            </p>
                        )}
                        {role === "admin" && (
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">
                                <a href="/admin-portal" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">→ Go to Admin Portal</a>
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
