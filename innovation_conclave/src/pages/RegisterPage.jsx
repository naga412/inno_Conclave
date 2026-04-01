import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Ticket, Presentation, ArrowRight, ShieldCheck, Zap, Users, BookOpen } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] pt-32 pb-20 relative flex flex-col justify-center overflow-hidden">

      {/* Background Ambient Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 flex justify-center items-center">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 flex flex-col items-center">

        <div className="text-center mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Secure Enrollment Portal</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Experience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium"
          >
            Join Innovation Conclave 2026. Whether you're here to learn and network, or to showcase your breaking technology to the world.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

          {/* Participant Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate('/participant-register')}
            className="group relative bg-white dark:bg-slate-900 rounded-sm p-8 lg:p-12 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-orange-300 dark:hover:border-orange-500/50 transition-all cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-orange-400/20 transition-all" />

            <div className="w-16 h-16 rounded-sm bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform">
              <Ticket className="w-8 h-8 text-orange-500" />
            </div>

            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 relative z-10">
              Register as an <span className="text-orange-500">Attendee</span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed relative z-10 flex-1">
              Secure your ticket to attend incredible workshops, learn from industry leaders, enjoy premium networking, and access the entire expo floor.
            </p>

            <ul className="space-y-4 mb-10 relative z-10">
              {[
                { icon: BookOpen, text: "Book seats in expert workshops" },
                { icon: Users, text: "Network with startups & peers" },
                { icon: Zap, text: "Full event schedule access" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <item.icon className="w-5 h-5 text-orange-400" />
                  {item.text}
                </li>
              ))}
            </ul>

            <button className="relative z-10 flex items-center justify-between w-full px-8 py-4 rounded-sm bg-orange-500 hover:bg-orange-400 text-white font-extrabold text-sm transition-colors shadow-lg shadow-orange-500/30">
              Start Participant Regstration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Exhibitor Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate('/exhibitor-register')}
            className="group relative bg-white dark:bg-slate-900 rounded-sm p-8 lg:p-12 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-all" />

            <div className="w-16 h-16 rounded-sm bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform">
              <Presentation className="w-8 h-8 text-indigo-500" />
            </div>

            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 relative z-10">
              Register as an <span className="text-indigo-500">Exhibitor</span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed relative z-10 flex-1">
              Set up a booth to showcase your college projects, startup prototypes, and research to investors, judges, and hundreds of attendees.
            </p>

            <ul className="space-y-4 mb-10 relative z-10">
              {[
                { icon: ShieldCheck, text: "Dedicated booth space" },
                { icon: Zap, text: "Pitch to industry leaders" },
                { icon: Users, text: "Upload & publish innovations" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <item.icon className="w-5 h-5 text-indigo-400" />
                  {item.text}
                </li>
              ))}
            </ul>

            <button className="relative z-10 flex items-center justify-between w-full px-8 py-4 rounded-sm bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm transition-colors shadow-lg shadow-indigo-600/30">
              Start Exhibitor Registration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
