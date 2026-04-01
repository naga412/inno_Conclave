import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Ticket, Presentation, ShieldAlert, Loader2 } from 'lucide-react';
import { auth } from '../api/client';

const roles = [
    { key: "participant", label: "Participant", icon: Ticket },
    { key: "exhibitor", label: "Exhibitor", icon: Presentation }
];

const REDIRECT = {
    participant: "/participant-dashboard",
    exhibitor: "/exhibitor-dashboard"
};

export default function LoginPage() {
    const [role, setRole] = useState("participant");
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return setError("Please fill in all fields");

        setLoading(true);
        setError("");
        try {
            const result = await auth.login(email, password, role);
            // Store token + role + user in localStorage
            localStorage.setItem("ic_token", result.token);
            localStorage.setItem("ic_role", result.role);
            localStorage.setItem("ic_user", JSON.stringify(result.user));
            navigate(REDIRECT[role]);
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex transition-colors duration-500 relative">

            {/* ── LEFT IMAGE PANEL ── */}
            <div className="hidden lg:flex relative w-[50%] z-[200] overflow-hidden">
                <img
                    src="/login_panel.png"
                    alt="Innovation Conclave event"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                <div className="relative z-20 flex flex-col justify-center p-12 h-full">
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={role}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-sm text-orange-300 font-bold uppercase tracking-widest mb-3">
                                    {role === "participant" ? "Attendee Portal" : "Exhibitor Portal"}
                                </p>
                                <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
                                    {role === "participant" && "Your Front Row Seat to the Future"}
                                    {role === "exhibitor" && "Showcase Your Innovation"}
                                </h2>
                                <p className="text-white/60 text-sm leading-relaxed max-w-md">
                                    {role === "participant" && "Access your schedule, workshops, and tickets. Connect with speakers and exhibitors."}
                                    {role === "exhibitor" && "Manage your booth, upload posters, and track engagement with visitors."}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* ── RIGHT FORM PANEL ── */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-sm shadow-2xl dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                    <div className="h-1.5 w-full bg-gradient-to-r from-orange-300 to-orange-600" />
                    <div className="p-8 md:p-10">

                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome Back</h1>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">Sign in to Innovation Conclave 2026</p>
                        </div>

                        {/* Role Tabs */}
                        <div className="flex gap-1 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-white/10 mb-8">
                            {roles.map((r) => {
                                const Icon = r.icon;
                                const active = role === r.key;
                                return (
                                    <button
                                        key={r.key}
                                        onClick={() => { setRole(r.key); setError(""); }}
                                        className={`relative flex-1 flex flex-col items-center gap-1 py-3 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors z-10 ${active ? "text-orange-300 dark:text-orange-300" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                            }`}
                                    >
                                        {active && (
                                            <motion.div
                                                layoutId="roleTab"
                                                className="absolute inset-0 bg-white dark:bg-slate-700 rounded-sm shadow-sm z-[-1] border border-slate-200 dark:border-white/10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                                            />
                                        )}
                                        <Icon className="w-4 h-4" />
                                        <span>{r.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Role subtitle */}
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
                            </motion.p>
                        </AnimatePresence>

                        {/* Error message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-sm p-3 mb-5"
                                >
                                    <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
                                <div className="flex items-center gap-3 px-4 py-3.5 rounded-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-300/20 transition-all">
                                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Password</label>
                                    <a href="#" className="text-xs font-bold text-orange-300 dark:text-orange-300 hover:underline">Forgot password?</a>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3.5 rounded-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-300/20 transition-all">
                                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium tracking-widest"
                                    />
                                    <button type="button" onClick={() => setShowPass(v => !v)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.015 }}
                                whileTap={{ scale: loading ? 1 : 0.97 }}
                                className="mt-1 w-full flex items-center justify-center gap-2 py-4 rounded-sm bg-gradient-to-r from-orange-300 to-indigo-600 hover:from-orange-300 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-orange-300/20 transition-all group disabled:opacity-70"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                                ) : (
                                    <>Sign In as {roles.find(r => r.key === role)?.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </motion.button>
                        </form>

                        {role === "participant" && (
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">
                                No account yet?{" "}
                                <a href="/participant-register" className="text-orange-300 dark:text-orange-300 font-bold hover:underline">Register for the event</a>
                            </p>
                        )}
                        {role === "exhibitor" && (
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">
                                Not registered yet?{" "}
                                <a href="/exhibitor-register" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">Register as an Exhibitor →</a>
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
