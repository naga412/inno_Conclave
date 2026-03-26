// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Calendar,
  Mic,
  Sun,
  Moon,
  Users,
  BookOpen,
  MapPin,
  LogIn,
  UserPlus,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "pt-2" : "pt-4"
      }`}>
      <div className={`mx-auto w-[90%] lg:w-[80%] rounded-2xl transition-all duration-500 ${scrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-white/20 dark:border-white/10" : "bg-[#EBEBEB] dark:bg-slate-900 shadow-lg border border-transparent dark:border-white/5"
        }`}>
        {/* NAVBAR */}
        <div className="flex justify-between items-center px-6 lg:px-10 py-4">
          {/* LOGO */}
          <div className="group cursor-pointer">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#10367D] dark:text-white tracking-tight">
              Innovation Conclave
            </h1>
            <div className="h-0.5 w-0 group-hover:w-full bg-[#10367D] dark:bg-violet-500 transition-all duration-500"></div>
          </div>

          {/* TOGGLE & HAMBURGER */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-[#10367D] dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 focus:outline-none"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#10367D] dark:bg-slate-800 text-[#EBEBEB] dark:text-white hover:bg-[#10367D]/80 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* DROPDOWN MENU */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="border-t border-[#10367D]/10 dark:border-white/10 p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* COLUMN 1 */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-wider text-[#10367D]/50 dark:text-slate-500 mb-4">Navigation</h3>
                <MenuItem to="/" icon={<Home size={18} />} text="Home" onClick={() => setOpen(false)} />
                <MenuItem to="/agenda" icon={<Calendar size={18} />} text="Agenda" onClick={() => setOpen(false)} />
                <MenuItem to="/speakers" icon={<Mic size={18} />} text="Speakers" onClick={() => setOpen(false)} />
                <MenuItem to="/exhibitors" icon={<Users size={18} />} text="Exhibitors" onClick={() => setOpen(false)} />
                <MenuItem to="/workshops" icon={<BookOpen size={18} />} text="Workshops" onClick={() => setOpen(false)} />
              </div>

              {/* COLUMN 2 */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-wider text-[#10367D]/50 dark:text-slate-500 mb-4">Explore</h3>
                <MenuItem icon={<MapPin size={18} />} text="Venue" onClick={() => setOpen(false)} />
                <MenuItem icon={<LogIn size={18} />} text="Sign In" onClick={() => setOpen(false)} />
                <MenuItem icon={<UserPlus size={18} />} text="Register" onClick={() => setOpen(false)} />
              </div>

              {/* COLUMN 3 */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider text-[#10367D]/50 dark:text-slate-500 mb-4">Connect</h3>

                <div className="space-y-3">
                  <ContactItem icon={<Phone size={16} />} text="+91 98765 43210" />
                  <ContactItem icon={<Mail size={16} />} text="info@innovation.com" />
                  <ContactItem icon={<MapPin size={16} />} text="AITAM, Tekkali" />
                </div>

                {/* SOCIAL ICONS */}
                <div className="flex gap-3 pt-4">
                  <SocialIcon icon={<Linkedin size={20} />} />
                  <SocialIcon icon={<Instagram size={20} />} />
                  <SocialIcon icon={<Youtube size={20} />} />
                  <SocialIcon icon={<MessageCircle size={20} />} />
                </div>

                {/* CTA Button */}
                <button className="mt-6 bg-[#10367D] dark:bg-violet-600 text-[#EBEBEB] dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#10367D]/90 dark:hover:bg-violet-700 transition-all duration-300 flex items-center justify-center gap-2 group">
                  <span>Get Updates</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, text, to, onClick }) {
  const [hover, setHover] = useState(false);

  const content = (
    <>
      <span className={`text-[#10367D] dark:text-slate-300 transition-all duration-300 ${hover ? "opacity-100" : "opacity-70"
        }`}>
        {icon}
      </span>
      <span className="relative text-[#10367D] dark:text-slate-200">
        {text}
        <span className={`absolute bottom-0 left-0 h-0.5 bg-[#10367D] dark:bg-violet-500 transition-all duration-300 ${hover ? "w-full" : "w-0"
          }`}></span>
      </span>
    </>
  );

  const className = "flex items-center gap-3 border-0 cursor-pointer group relative py-2 focus:outline-none";

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {content}
    </div>
  );
}

function ContactItem({ icon, text }) {
  return (
    <p className="flex items-center gap-3 text-sm text-[#10367D]/70 dark:text-slate-400 hover:text-[#10367D] dark:hover:text-white transition-colors group cursor-pointer">
      <span className="p-2 bg-[#10367D]/10 dark:bg-white/5 rounded-lg group-hover:bg-[#10367D]/20 dark:group-hover:bg-white/10 transition-all">
        {icon}
      </span>
      {text}
    </p>
  );
}

function SocialIcon({ icon }) {
  return (
    <div className="p-3 bg-[#10367D]/10 dark:bg-white/5 rounded-xl text-[#10367D] dark:text-slate-300 hover:bg-[#10367D] dark:hover:bg-violet-600 hover:text-[#EBEBEB] dark:hover:text-white transition-all duration-300 cursor-pointer">
      {icon}
    </div>
  );
}