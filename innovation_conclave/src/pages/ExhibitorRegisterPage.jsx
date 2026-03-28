import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, GraduationCap, ChevronRight, ChevronLeft,
  Upload, ImageIcon, Lock, Eye, EyeOff, CheckCircle2, Copy, FileText
} from 'lucide-react';

const TOTAL_STEPS = 4;

// --- Step 1: Entity Details ---
function StepDetails({ data, setData }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Organisation Name *</label>
        <input
          type="text"
          placeholder="e.g. TechNova Labs / AITAM"
          value={data.orgName}
          onChange={e => setData(d => ({ ...d, orgName: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm font-medium"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Type of Exhibitor *</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "startup", label: "Startup / Company", Icon: Building2 },
            { key: "college", label: "College / University", Icon: GraduationCap },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setData(d => ({ ...d, type: key, year: "" }))}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 ${
                data.type === key
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/10"
                  : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-slate-800"
              }`}
            >
              <Icon className={`w-7 h-7 ${data.type === key ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
              <span className={`text-sm font-bold ${data.type === key ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {data.type === "college" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Year of Study *</label>
            <div className="grid grid-cols-4 gap-2">
              {["1st", "2nd", "3rd", "4th"].map(y => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setData(d => ({ ...d, year: y }))}
                  className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                    data.year === y
                      ? "border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                      : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-blue-300"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Point of Contact Name *</label>
        <input
          type="text"
          placeholder="Full name"
          value={data.contact}
          onChange={e => setData(d => ({ ...d, contact: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm font-medium"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Email Address *</label>
        <input
          type="email"
          placeholder="contact@organisation.com"
          value={data.email}
          onChange={e => setData(d => ({ ...d, email: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm font-medium"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Project / Product Tagline</label>
        <input
          type="text"
          placeholder="One-line description of your exhibit"
          value={data.tagline}
          onChange={e => setData(d => ({ ...d, tagline: e.target.value }))}
          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm font-medium"
        />
      </div>
    </div>
  );
}

// --- Step 2: Poster Upload ---
function StepPoster({ data, setData }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData(d => ({ ...d, poster: file, posterUrl: URL.createObjectURL(file) }));
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-slate-500 dark:text-slate-400">Upload your exhibit poster or project banner. Accepted: JPG, PNG, PDF (max 5MB).</p>
      <label className={`group relative flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300 ${
        data.poster
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
          : "border-slate-200 dark:border-white/10 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
      }`}>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="sr-only" onChange={handleFile} />

        {data.posterUrl ? (
          <div className="flex flex-col items-center gap-3">
            {data.poster.type.startsWith("image/")
              ? <img src={data.posterUrl} alt="poster preview" className="w-48 h-32 object-cover rounded-xl shadow-md" />
              : <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold"><FileText className="w-8 h-8" />{data.poster.name}</div>
            }
            <span className="text-xs text-blue-500 dark:text-blue-400 font-bold">Click to change</span>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors">
              <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">Drop your poster here</p>
              <p className="text-xs text-slate-400 mt-1">or click to browse files</p>
            </div>
          </>
        )}
      </label>
    </div>
  );
}

// --- Step 3: Payment ---
const ACCOUNT_DETAILS = {
  name: "Innovation Conclave 2026",
  bank: "State Bank of India",
  account: "1234 5678 9012",
  ifsc: "SBIN0001234",
  upi: "innovationconclave@sbi",
};

function StepPayment({ data, setData }) {
  const [copied, setCopied] = useState("");

  const copy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleProof = (e) => {
    const file = e.target.files[0];
    if (file) setData(d => ({ ...d, paymentProof: file }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Fee Banner */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5 shadow-lg shadow-blue-500/20">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Registration Fee</p>
          <p className="text-4xl font-extrabold tracking-tight">₹500</p>
          <p className="text-xs opacity-70 mt-1">One-time · Non-refundable</p>
        </div>
        <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center">
          <span className="text-3xl">🎟️</span>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Account Details</p>
        {[
          ["Account Name", ACCOUNT_DETAILS.name],
          ["Bank", ACCOUNT_DETAILS.bank],
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
              onClick={() => copy(val, label)}
              className="shrink-0 text-slate-400 hover:text-blue-500 transition-colors p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              {copied === label ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      {/* Upload Proof */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Upload Payment Receipt (PDF) *</label>
        <label className={`flex items-center gap-4 border-2 border-dashed rounded-2xl p-5 cursor-pointer transition-all ${
          data.paymentProof
            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
            : "border-slate-200 dark:border-white/10 hover:border-blue-400"
        }`}>
          <input type="file" accept=".pdf" className="sr-only" onChange={handleProof} />
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${data.paymentProof ? "bg-emerald-100 dark:bg-emerald-900/20" : "bg-slate-100 dark:bg-white/5"}`}>
            {data.paymentProof ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Upload className="w-6 h-6 text-slate-400" />}
          </div>
          <div>
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              {data.paymentProof ? data.paymentProof.name : "Upload payment proof"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{data.paymentProof ? "Click to change file" : "PDF only · bank receipt or screenshot"}</p>
          </div>
        </label>
      </div>
    </div>
  );
}

// --- Step 4: Set Password ---
function StepPassword({ data, setData }) {
  const [show, setShow] = useState(false);
  const [showC, setShowC] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-slate-500 dark:text-slate-400">Create a secure password for your Exhibitor portal login.</p>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">New Password *</label>
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type={show ? "text" : "password"}
            placeholder="Minimum 8 characters"
            value={data.password}
            onChange={e => setData(d => ({ ...d, password: e.target.value }))}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
          />
          <button type="button" onClick={() => setShow(v => !v)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Confirm Password *</label>
        <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 focus-within:ring-2 transition-all ${
          data.confirmPassword && data.password !== data.confirmPassword
            ? "border-red-400 focus-within:ring-red-400/20"
            : "border-slate-200 dark:border-white/10 focus-within:border-blue-500 focus-within:ring-blue-500/20"
        }`}>
          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type={showC ? "text" : "password"}
            placeholder="Re-enter password"
            value={data.confirmPassword}
            onChange={e => setData(d => ({ ...d, confirmPassword: e.target.value }))}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
          />
          <button type="button" onClick={() => setShowC(v => !v)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            {showC ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {data.confirmPassword && data.password !== data.confirmPassword && (
          <p className="text-xs text-red-500 font-bold mt-2 ml-1">Passwords do not match</p>
        )}
      </div>

      {/* Summary */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Registration Summary</p>
        {[
          ["Organisation", data.orgName || "—"],
          ["Type", data.type ? (data.type === "college" ? `College — ${data.year} Year` : "Startup / Company") : "—"],
          ["Contact", data.email || "—"],
          ["Poster", data.poster?.name || "—"],
          ["Payment Receipt", data.paymentProof?.name || "—"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-start gap-2 py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
            <span className="text-xs text-slate-400 w-32 shrink-0 font-medium">{k}</span>
            <span className="text-xs text-slate-700 dark:text-slate-200 font-bold break-all">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Success screen ---
function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center gap-6 py-6"
    >
      <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shadow-xl shadow-emerald-500/20">
        <CheckCircle2 className="w-14 h-14 text-emerald-500" />
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">You're registered!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          Your exhibitor application has been submitted. Once payment is verified, your portal will be activated within 24 hours.
        </p>
      </div>
      <a
        href="/exhibitor-dashboard"
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        Go to Dashboard <ChevronRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

const STEP_LABELS = ["Details", "Poster", "Payment", "Password"];

export default function ExhibitorRegisterPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    orgName: "", type: "", year: "", contact: "", email: "", tagline: "",
    poster: null, posterUrl: null,
    paymentProof: null,
    password: "", confirmPassword: "",
  });

  const next = () => step < TOTAL_STEPS ? setStep(s => s + 1) : setDone(true);
  const prev = () => step > 1 && setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 pb-16 flex flex-col items-center">

      {/* ── TOP IMAGE HERO BANNER ── */}
      <div className="relative w-full h-56 md:h-72 overflow-hidden pt-16">
        <img
          src="/register_panel.png"
          alt="Innovation Expo"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80 z-10" />
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300 mb-2">Innovation Conclave 2026</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">Exhibitor Registration</h1>
          <p className="text-white/60 text-sm mt-2 font-medium">Complete 4 steps to secure your spot at the biggest conclave of the year</p>
        </div>
      </div>

      {/* ── WIZARD BELOW ── */}
      <div className="w-full max-w-xl px-4 mt-8">

        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400 mb-1">Set Up Your Booth</p>
        </div>

        {/* Step Indicator */}
        {!done && (
          <div className="flex items-center gap-1 mb-8">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const active = step === n;
              const done_ = step > n;
              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold border-2 transition-all duration-300 ${
                      done_ ? "bg-blue-600 border-blue-600 text-white" :
                      active ? "border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20" :
                      "border-slate-200 dark:border-white/10 text-slate-400"
                    }`}>
                      {done_ ? <CheckCircle2 className="w-4 h-4" /> : n}
                    </div>
                    <span className={`text-[10px] font-bold tracking-wide hidden sm:block ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>{label}</span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`flex-1 h-0.5 mb-3 rounded-full transition-all duration-500 ${step > n ? "bg-blue-600" : "bg-slate-200 dark:bg-white/10"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Card */}
        <motion.div
          layout
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-2xl dark:shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
          <div className="p-6 md:p-8">
            {done ? <SuccessScreen /> : (
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
                      Step {step}: {STEP_LABELS[step - 1]}
                    </h2>
                    <p className="text-xs text-slate-400 mb-6 font-medium">
                      {step === 1 && "Tell us about your exhibit"}
                      {step === 2 && "Upload your exhibit poster or banner"}
                      {step === 3 && "Pay the registration fee and upload proof"}
                      {step === 4 && "Create your login credentials"}
                    </p>

                    {step === 1 && <StepDetails data={data} setData={setData} />}
                    {step === 2 && <StepPoster data={data} setData={setData} />}
                    {step === 3 && <StepPayment data={data} setData={setData} />}
                    {step === 4 && <StepPassword data={data} setData={setData} />}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all ${step === 1 ? "invisible" : ""}`}
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    {step === TOTAL_STEPS ? "Submit Registration" : "Continue"}
                    <ChevronRight className="w-4 h-4" />
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
