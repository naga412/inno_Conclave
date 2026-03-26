import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldAlert, Ticket, Presentation, ChevronLeft } from 'lucide-react';

const roles = [
  {
    key: "participant",
    label: "Participant",
    icon: Ticket,
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    glow: "shadow-blue-500/60",
    ring: "ring-blue-500",
    text: "text-blue-500",
    dot: "bg-blue-500",
    desc: "Access your schedule, tickets & networking",
    emoji: "🎟️",
  },
  {
    key: "exhibitor",
    label: "Exhibitor",
    icon: Presentation,
    gradient: "from-violet-400 via-purple-600 to-pink-600",
    glow: "shadow-purple-500/60",
    ring: "ring-purple-500",
    text: "text-purple-500",
    dot: "bg-purple-500",
    desc: "Manage your booth & lead connections",
    emoji: "🏢",
  },
  {
    key: "admin",
    label: "Admin",
    icon: ShieldAlert,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    glow: "shadow-emerald-500/60",
    ring: "ring-emerald-500",
    text: "text-emerald-500",
    dot: "bg-emerald-500",
    desc: "Full system dashboard & control panel",
    emoji: "🛡️",
  },
];

// First screen: giant role selector portals
function RoleSelector({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-12 w-full"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Who are you?
        </h1>
        <p className="text-white/50 mt-3 text-base font-medium">
          Choose your role to sign in to Innovation Conclave 2026
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-3xl px-4">
        {roles.map((role, i) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.key}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(role)}
              className={`group relative flex-1 flex flex-col items-center gap-5 p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 shadow-2xl ${role.glow} hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer`}
            >
              {/* Card glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[2rem]`} />

              <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-2xl ${role.glow} group-hover:scale-110 transition-transform duration-500`}>
                <Icon strokeWidth={1.5} className="w-9 h-9 text-white" />
              </div>

              <div className="text-center relative">
                <p className="text-white font-extrabold text-xl mb-1.5">{role.label}</p>
                <p className="text-white/50 text-sm leading-relaxed">{role.desc}</p>
              </div>

              <div className={`flex items-center gap-2 relative text-sm font-bold ${role.text} group-hover:gap-3 transition-all`}>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// Second screen: actual login form
function LoginForm({ role, onBack }) {
  const Icon = role.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-4"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-bold mb-8 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to roles
      </button>

      {/* Glassmorphic card */}
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">
        {/* Inner glow from role color */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br ${role.gradient} opacity-10 blur-[80px] pointer-events-none`} />

        <div className="relative z-10">
          {/* Role badge */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-xl`}>
              <Icon strokeWidth={1.5} className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white font-extrabold text-xl leading-tight">Sign in</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${role.dot} animate-pulse`} />
                <p className="text-white/50 text-sm font-medium">{role.label} Portal</p>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-5">
            <div className="group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 block mb-2">Email Address</label>
              <div className={`flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 group-focus-within:border-white/30 group-focus-within:bg-white/10 px-5 py-4 transition-all group-focus-within:${role.ring}`}>
                <Mail className="w-5 h-5 text-white/30 group-focus-within:text-white/70 transition-colors shrink-0" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent flex-1 text-white placeholder-white/25 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Password</label>
                <a href="#" className={`text-xs font-bold ${role.text} hover:opacity-70 transition-opacity`}>Forgot?</a>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 group-focus-within:border-white/30 group-focus-within:bg-white/10 px-5 py-4 transition-all">
                <Lock className="w-5 h-5 text-white/30 group-focus-within:text-white/70 transition-colors shrink-0" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-transparent flex-1 text-white placeholder-white/25 focus:outline-none font-medium text-lg tracking-widest"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative mt-2 w-full py-4 rounded-2xl font-bold text-white text-base tracking-wide overflow-hidden shadow-2xl ${role.glow}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${role.gradient}`} />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Authenticate <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </form>

          {role.key === "participant" && (
            <p className="text-center text-sm text-white/30 mt-8 font-medium">
              No account?{" "}
              <a href="#" className="text-white/70 hover:text-white font-bold transition-colors">Register for the event →</a>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden pt-20 pb-10">

      {/* Full-bleed aurora mesh background */}
      <div className="absolute inset-0 z-0 bg-[#070b14]" />
      <motion.div
        animate={{ background: selectedRole
          ? `radial-gradient(ellipse at 60% 40%, ${selectedRole.key === 'participant' ? '#1d4ed8' : selectedRole.key === 'exhibitor' ? '#7c3aed' : '#059669'}33 0%, #070b14 70%)`
          : "radial-gradient(ellipse at 50% 30%, #1e3a5f 0%, #070b14 60%)"
        }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      />
      {/* Static decorative orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* INNOVATION CONCLAVE wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-12 text-center"
      >
        <span className="text-lg font-extrabold text-white/80 tracking-[0.3em] uppercase">
          Innovation<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Conclave</span>
        </span>
      </motion.div>

      {/* Central content area */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!selectedRole
            ? <RoleSelector key="selector" onSelect={setSelectedRole} />
            : <LoginForm key={selectedRole.key} role={selectedRole} onBack={() => setSelectedRole(null)} />
          }
        </AnimatePresence>
      </div>
    </div>
  );
}
