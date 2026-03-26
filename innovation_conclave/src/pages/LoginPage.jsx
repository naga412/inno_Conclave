import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldAlert, Ticket, Presentation } from 'lucide-react';

export default function LoginPage() {
    const [role, setRole] = useState("participant");

    const roleConfig = {
        participant: {
            title: "Attendee Access",
            desc: "Sign in to manage your tickets, schedule, and networking profile.",
            icon: <Ticket className="w-6 h-6" />,
            color: "from-blue-600 to-cyan-500",
            glow: "bg-blue-500/20"
        },
        exhibitor: {
            title: "Exhibitor Portal",
            desc: "Manage your booth, track leads, and engage with the community.",
            icon: <Presentation className="w-6 h-6" />,
            color: "from-purple-600 to-pink-500",
            glow: "bg-purple-500/20"
        },
        admin: {
            title: "System Admin",
            desc: "Authenticate to access the Conclave management dashboard.",
            icon: <ShieldAlert className="w-6 h-6" />,
            color: "from-emerald-500 to-teal-400",
            glow: "bg-emerald-500/20"
        }
    };

    const activeConfig = roleConfig[role];

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-[#0b1120] transition-colors duration-700 pt-20 pb-20">
            {/* Animated Ambient Backgrounds */}
            <div className={`absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-colors duration-1000 ${activeConfig.glow}`} />
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-0" />

            {/* Floating Glass Container */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="relative z-10 w-full max-w-[26rem] mx-6 bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl dark:shadow-[0_0_80px_rgba(0,0,0,0.4)] overflow-hidden"
            >
                {/* Role Switcher Header */}
                <div className="p-6 md:p-8 pb-0">
                    <div className="flex items-center justify-center p-1.5 bg-slate-200/50 dark:bg-black/40 rounded-full mb-8 border border-slate-300/50 dark:border-white/5">
                        {["participant", "exhibitor", "admin"].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                className={`relative flex-1 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 z-10 rounded-full ${
                                    role === r ? "text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                }`}
                            >
                                {role === r && (
                                    <motion.div 
                                        layoutId="roleTab" 
                                        className={`absolute inset-0 bg-gradient-to-r ${activeConfig.color} rounded-full shadow-lg z-[-1]`} 
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {r}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Title */}
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={role}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${activeConfig.color} text-white mb-5 shadow-xl`}>
                                {activeConfig.icon}
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{activeConfig.title}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{activeConfig.desc}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Form Area */}
                <div className="p-6 md:p-8 pt-8">
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 relative z-20">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 relative z-20">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Password</label>
                                <a href="#" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-xs">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-lg leading-none"
                                />
                            </div>
                        </div>

                        <button 
                            type="button"
                            className={`group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold tracking-wide transition-all duration-300 hover:shadow-2xl overflow-hidden mt-4 shadow-lg`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${activeConfig.color} transition-transform duration-500 group-hover:scale-105`} />
                            <span className="relative z-10 flex items-center gap-2">
                                Authenticate Profile
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </form>
                    
                    {role === "participant" && (
                        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8 font-medium">
                            Don't have a pass? <br/><a href="#" className="text-blue-600 dark:text-blue-400 font-bold hover:underline mt-1 inline-block">Register for Event</a>
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
