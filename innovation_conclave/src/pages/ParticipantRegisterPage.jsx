import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, GraduationCap, ChevronRight, ChevronLeft,
  Upload, CheckCircle2, Copy, UtensilsCrossed, Utensils, Lock, Eye, EyeOff, Loader2, Camera, AlertTriangle, PartyPopper
} from 'lucide-react';
import { participants } from '../api/client';

const ACCOUNT_DETAILS = {
  name: "Innovation Conclave 2026",
  bank: "State Bank of India",
  account: "1234 5678 9012",
  ifsc: "SBIN0001234",
  upi: "innovationconclave@sbi",
};

// Step 1: Personal Details + Photo
function StepDetails({ data, setData }) {
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData(d => ({ ...d, photo: file, photoPreview: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Photo Upload */}
      <div className="flex flex-col items-center gap-3">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Passport Photo *</label>
        <label className="relative cursor-pointer group">
          <input type="file" accept="image/*" className="sr-only" onChange={handlePhoto} />
          <div className={`w-28 h-28 rounded-sm border-4 overflow-hidden flex items-center justify-center transition-all ${data.photoPreview
            ? 'border-orange-300 shadow-lg shadow-orange-300/20'
            : 'border-dashed border-slate-300 dark:border-white/20 hover:border-orange-300'
            }`}>
            {data.photoPreview ? (
              <img src={data.photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-orange-300 transition-colors">
                <Camera className="w-6 h-6" />
                <span className="text-[9px] font-bold">Upload</span>
              </div>
            )}
          </div>
          {data.photoPreview && (
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-sm bg-orange-300 flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </label>
        <p className="text-[10px] text-slate-400 font-medium">Used for your event ID card</p>
      </div>

      {[
        { label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
        { label: "Email Address", key: "email", type: "email", placeholder: "you@example.com" },
        { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 98765 43210" },
        { label: "College / Organisation", key: "college", type: "text", placeholder: "e.g. AITAM / TechCorp" },
        { label: "Department / Role", key: "dept", type: "text", placeholder: "e.g. CSE / Product Manager" },
      ].map(({ label, key, type, placeholder }) => (
        <div key={key}>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">{label} *</label>
          <input
            type={type}
            placeholder={placeholder}
            value={data[key]}
            onChange={e => setData(d => ({ ...d, [key]: e.target.value }))}
            className="w-full px-4 py-3.5 rounded-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/30 focus:border-orange-300 transition-all text-sm font-medium"
          />
        </div>
      ))}
    </div>
  );
}

// Step 2: Lunch Selection
function StepLunch({ data, setData }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        Would you like to opt in for the Innovation Conclave lunch? An additional fee of <span className="font-bold text-slate-900 dark:text-white">₹100</span> applies.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {[
          { key: true, label: "Yes, include lunch", Icon: Utensils, color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20", iconColor: "text-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400" },
          { key: false, label: "No, skip lunch", Icon: UtensilsCrossed, color: "border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800", iconColor: "text-slate-400", textColor: "text-slate-600 dark:text-slate-300" },
        ].map(({ key, label, Icon, color, iconColor, textColor }) => (
          <button
            key={String(key)}
            type="button"
            onClick={() => setData(d => ({ ...d, lunch: key, paymentScreenshot: null }))}
            className={`flex flex-col items-center gap-3 p-6 rounded-sm border-2 transition-all duration-300 ${data.lunch === key ? color : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-slate-800"
              }`}
          >
            <Icon className={`w-8 h-8 ${data.lunch === key ? iconColor : "text-slate-400"}`} />
            <span className={`text-sm font-bold text-center leading-snug ${data.lunch === key ? textColor : "text-slate-500 dark:text-slate-400"}`}>{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {data.lunch === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-sm p-5 shadow-lg shadow-emerald-500/20 mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Lunch Fee</p>
                <p className="text-3xl font-extrabold">₹100</p>
                <p className="text-xs opacity-70 mt-1">One-time · includes meals on both days</p>
              </div>
              <Utensils className="w-10 h-10 text-orange-200" />
            </div>

            {/* Account details */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-sm p-5 flex flex-col gap-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Pay to this account</p>
              {[
                ["Account Name", ACCOUNT_DETAILS.name],
                ["Account Number", ACCOUNT_DETAILS.account],
                ["IFSC Code", ACCOUNT_DETAILS.ifsc],
                ["UPI ID", ACCOUNT_DETAILS.upi],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 tracking-wider">{label}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{val}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(val)}
                    className="shrink-0 text-slate-400 hover:text-orange-300 transition-colors p-1.5 rounded-sm hover:bg-orange-300 dark:hover:bg-orange-300/20"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Upload Screenshot */}
            <div className="mt-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                Upload Payment Screenshot *
              </label>
              <label className={`flex items-center gap-4 border-2 border-dashed rounded-sm p-5 cursor-pointer transition-all ${data.paymentScreenshot ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10" : "border-slate-200 dark:border-white/10 hover:border-emerald-400"
                }`}>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="sr-only"
                  onChange={e => e.target.files[0] && setData(d => ({ ...d, paymentScreenshot: e.target.files[0] }))}
                />
                <div className={`w-11 h-11 rounded-sm flex items-center justify-center shrink-0 ${data.paymentScreenshot ? "bg-emerald-100 dark:bg-emerald-900/20" : "bg-slate-100 dark:bg-white/5"}`}>
                  {data.paymentScreenshot ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Upload className="w-6 h-6 text-slate-400" />}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">
                    {data.paymentScreenshot ? data.paymentScreenshot.name : "Upload payment screenshot"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{data.paymentScreenshot ? "Click to change" : "Image or PDF of your payment confirmation"}</p>
                </div>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Step 3: Summary + Confirm + Password
function StepSummary({ data, setData }) {
  const [showP, setShowP] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">Please review your details and create a password.</p>

      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-sm p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Registration Summary</p>
        {[
          ["Full Name", data.name || "—"],
          ["Email", data.email || "—"],
          ["Phone", data.phone || "—"],
          ["College / Org", data.college || "—"],
          ["Department", data.dept || "—"],
          ["Lunch Opt-In", data.lunch ? "Yes — ₹100 paid" : "No"],
          ["Payment Proof", data.lunch ? (data.paymentScreenshot?.name || "Not uploaded") : "N/A"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-start gap-3 py-2 border-b border-slate-100 dark:border-white/5 last:border-0">
            <span className="text-xs text-slate-400 w-32 shrink-0 font-medium">{k}</span>
            <span className={`text-xs font-bold break-all ${v === "Not uploaded" ? "text-red-500" : "text-slate-700 dark:text-slate-200"}`}>{v}</span>
          </div>
        ))}
      </div>

      {/* Password */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Create Password *</label>
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-300/20 transition-all">
          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type={showP ? "text" : "password"}
            placeholder="Min 6 characters"
            value={data.password || ""}
            onChange={e => setData(d => ({ ...d, password: e.target.value }))}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
          />
          <button type="button" onClick={() => setShowP(v => !v)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            {showP ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5 ml-1">You'll use this to sign in to your dashboard</p>
      </div>

      {data.lunch && !data.paymentScreenshot && (
        <p className="text-xs text-red-500 font-bold bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-sm px-4 py-3 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" /> Please go back and upload your payment screenshot before submitting.
        </p>
      )}
    </div>
  );
}

// Success screen
function SuccessScreen({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center gap-6 py-4"
    >
      <div className="w-20 h-20 rounded-sm bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shadow-xl shadow-emerald-500/20">
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2">Welcome, {data.name.split(" ")[0]}! <PartyPopper className="w-6 h-6 text-slate-900 dark:text-white" strokeWidth={2}/></h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          Your registration for Innovation Conclave 2026 is confirmed.
          {data.lunch && " Your lunch payment is under review."}
        </p>
      </div>
      <a
        href="/participant-dashboard"
        className="px-8 py-4 bg-gradient-to-r from-orange-300 to-indigo-600 text-white font-bold rounded-sm shadow-xl shadow-orange-300/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        View My Dashboard <ChevronRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

const STEPS = ["Details", "Lunch", "Confirm"];

export default function ParticipantRegisterPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "", email: "", phone: "", college: "", dept: "",
    lunch: null,
    paymentScreenshot: null,
    photo: null,
    photoPreview: null,
    password: "",
  });

  const submitRegistration = async () => {
    if (!data.password || data.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('email', data.email);
      fd.append('phone', data.phone);
      fd.append('college', data.college);
      fd.append('department', data.dept);
      fd.append('lunch', data.lunch ? 'true' : 'false');
      fd.append('password', data.password);
      if (data.paymentScreenshot) {
        fd.append('payment_screenshot', data.paymentScreenshot);
      }
      if (data.photo) {
        fd.append('photo', data.photo);
      }
      await participants.register(fd);
      setDone(true);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step < STEPS.length) {
      setStep(s => s + 1);
    } else {
      submitRegistration();
    }
  };
  const prev = () => step > 1 && setStep(s => s - 1);

  return (
    <div className="min-h-screen transition-colors duration-500 pb-16 flex flex-col items-center">

      {/* Top Image Banner */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden pt-16">
        <img
          src="/login_panel.png"
          alt="Innovation Conclave"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80 z-10" />
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-300 mb-2">Innovation Conclave 2026</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Participant Registration</h1>
          <p className="text-white/60 text-sm mt-2 font-medium">Register to attend the biggest innovation event of the year</p>
        </div>
      </div>

      <div className="w-full max-w-xl px-4 mt-8">

        {/* Step Indicators */}
        {!done && (
          <div className="flex items-center gap-1 mb-6">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const active = step === n;
              const completed = step > n;
              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-extrabold border-2 transition-all duration-300 ${completed ? "bg-orange-300 border-orange-300 text-white" :
                      active ? "border-orange-300 text-white bg-orange-300 dark:bg-orange-300/20" :
                        "border-slate-200 dark:border-white/10 text-slate-400"
                      }`}>
                      {completed ? <CheckCircle2 className="w-4 h-4" /> : n}
                    </div>
                    <span className={`text-[10px] font-bold tracking-wide hidden sm:block ${active ? "text-orange-300 dark:text-orange-300" : "text-slate-400"}`}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mb-3 rounded-sm transition-all duration-500 ${step > n ? "bg-orange-300" : "bg-slate-200 dark:bg-white/10"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Card */}
        <motion.div layout className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[0.5rem] shadow-2xl dark:shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-300 via-indigo-500 to-orange-600" />
          <div className="p-6 md:p-8">
            {done ? <SuccessScreen data={data} /> : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">
                      Step {step}: {STEPS[step - 1]}
                    </h2>
                    <p className="text-xs text-slate-400 mb-6 font-medium">
                      {step === 1 && "Fill in your personal information"}
                      {step === 2 && "Opt in for lunch at the event (optional, ₹100)"}
                      {step === 3 && "Review your registration before submitting"}
                    </p>
                    {step === 1 && <StepDetails data={data} setData={setData} />}
                    {step === 2 && <StepLunch data={data} setData={setData} />}
                    {step === 3 && <StepSummary data={data} setData={setData} />}
                  </motion.div>
                </AnimatePresence>

                {error && (
                  <p className="text-xs text-red-500 font-bold bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-sm px-4 py-2 mt-4">{error}</p>
                )}
                <div className="flex items-center justify-between mt-4 gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    className={`flex items-center gap-2 px-5 py-3 rounded-sm border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all ${step === 1 ? "invisible" : ""}`}
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={(step === 2 && data.lunch === null) || loading}
                    className="flex items-center gap-2 px-7 py-3 rounded-sm bg-gradient-to-r from-orange-300 to-indigo-600 hover:from-orange-300 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-orange-300/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                    ) : (
                      <>{step === STEPS.length ? "Submit Registration" : "Continue"} <ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
