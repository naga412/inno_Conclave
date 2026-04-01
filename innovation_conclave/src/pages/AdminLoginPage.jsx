import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldAlert, Loader2, Home, Sun, Moon } from 'lucide-react';
import { auth } from '../api/client';
import { useTheme } from '../hooks/useTheme';

export default function AdminLoginPage() {
    const { isDark, toggleTheme } = useTheme();
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
            const result = await auth.login(email, password, "admin");
            localStorage.setItem("ic_token", result.token);
            localStorage.setItem("ic_role", result.role);
            localStorage.setItem("ic_user", JSON.stringify(result.user));
            navigate("/admin-portal");
        } catch (err) {
            setError(err.message || "Access Denied");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-black text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
            {/* Background elements */}
            <div className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-70'}`}>
                <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full ${isDark ? 'bg-emerald-500/10 mix-blend-screen' : 'bg-emerald-500/20 mix-blend-multiply'}`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[100px] rounded-full ${isDark ? 'bg-indigo-500/10 mix-blend-screen' : 'bg-indigo-500/20 mix-blend-multiply'}`} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-sm shadow-xl dark:shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden relative z-10 transition-colors"
            >
                {/* Header line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-indigo-500" />

                <div className="p-8 md:p-10">
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <button onClick={() => navigate('/')} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Home">
                            <Home className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="absolute top-6 right-6">
                        <button onClick={toggleTheme} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Toggle theme">
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="text-center mb-10 mt-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-5 shadow-inner">
                            <ShieldAlert className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight">System Admin</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 font-bold">Innovation Conclave HQ</p>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/10 border border-red-500/30 rounded-sm p-3 mb-6"
                            >
                                <p className="text-xs font-bold text-red-400 text-center">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Admin ID (Email)</label>
                            <div className="flex items-center gap-3 px-4 py-4 rounded-sm bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus-within:border-emerald-400/50 focus-within:bg-white dark:focus-within:bg-white/10 transition-all">
                                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    type="email"
                                    placeholder="admin@innovationconclave.in"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Access Passphrase</label>
                            <div className="flex items-center gap-3 px-4 py-4 rounded-sm bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus-within:border-emerald-400/50 focus-within:bg-white dark:focus-within:bg-white/10 transition-all">
                                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-lg font-bold tracking-widest"
                                />
                                <button type="button" onClick={() => setShowPass(v => !v)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            className="mt-4 w-full flex items-center justify-center gap-2 py-4 rounded-sm bg-emerald-500 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin text-black" /> Authenticating…</>
                            ) : (
                                <>Authenticate Access <ArrowRight className="w-4 h-4" /></>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
