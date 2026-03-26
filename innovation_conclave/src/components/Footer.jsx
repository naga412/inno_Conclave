import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-6 shrink-0">
            <footer className="relative bg-white dark:bg-[#0b1120]  rounded-b-[1rem] md:rounded-b-[2rem] overflow-hidden w-full flex flex-col justify-between shadow-xl dark:shadow-2xl transition-colors duration-500">

                {/* Background Ambient Effects */}
                {/* <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 blur-[150px] rounded-full pointer-events-none" /> */}
                {/* <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" /> */}
                {/* <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" /> */}

                {/* Top Content Grid */}
                <div className="relative z-20 px-3 py-16 md:px-16 md:py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Column 1: Newsletter */}
                    <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-12">
                        <Link to="/" className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 hover:opacity-80 transition-opacity flex items-center gap-2">
                            INNOVATION<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-blue-500 to-cyan-500 dark:to-cyan-400">CONCLAVE</span>
                        </Link>

                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Stay in the loop.</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm text-sm md:text-base leading-relaxed transition-colors">
                            Sign up for early-bird tickets, speaker announcements, and exclusive workshop details delivered straight to your inbox.
                        </p>

                        <form className="relative flex items-center w-full max-w-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full p-1.5 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all hover:bg-slate-200 dark:hover:bg-white/10 backdrop-blur-md">
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full bg-transparent px-6 py-3 text-slate-900 dark:text-white outline-none placeholder:text-slate-400 font-medium"
                                required
                            />
                            <button className="flex items-center justify-center p-4 rounded-full bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 text-white transition-all shrink-0">
                                <HiArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-5 mt-4 md:mt-0">
                        <h4 className="text-slate-900 dark:text-white font-bold mb-4 tracking-widest text-sm uppercase transition-colors">Explore</h4>
                        <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:-translate-y-0.5 transition-all w-fit font-medium">Home</Link>
                        <Link to="/agenda" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:-translate-y-0.5 transition-all w-fit font-medium">Agenda</Link>
                        <Link to="/speakers" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:-translate-y-0.5 transition-all w-fit font-medium">Speakers</Link>
                        <Link to="/workshops" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:-translate-y-0.5 transition-all w-fit font-medium">Workshops</Link>
                        <Link to="/exhibitors" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:-translate-y-0.5 transition-all w-fit font-medium">Exhibitors</Link>
                    </div>

                    {/* Column 3: Social & Connect */}
                    <div className="flex flex-col gap-5 mt-4 md:mt-0">
                        <h4 className="text-slate-900 dark:text-white font-bold mb-4 tracking-widest text-sm uppercase transition-colors">Connect</h4>
                        <a href="#" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:-translate-y-0.5 transition-all w-fit font-medium">
                            <FaTwitter className="w-5 h-5" /> Twitter
                        </a>
                        <a href="#" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-600 hover:-translate-y-0.5 transition-all w-fit font-medium">
                            <FaLinkedin className="w-5 h-5" /> LinkedIn
                        </a>
                        <a href="#" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:-translate-y-0.5 transition-all w-fit font-medium">
                            <FaGithub className="w-5 h-5" /> GitHub
                        </a>
                        <a href="#" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:-translate-y-0.5 transition-all w-fit font-medium">
                            <FaDiscord className="w-5 h-5" /> Discord
                        </a>
                    </div>
                </div>

                {/* Massive Edge-to-Edge Typography Footer Logo */}
                <div className="relative w-full overflow-hidden  flex justify-center items-end md:mt-0 z-0 select-none pointer-events-none pb-48 md:pb-28">
                    <h1 className="text-[14vw] text-center font-black text-slate-900/[0.03] dark:text-white/[0.04] leading-[0.8] tracking-tighter whitespace-nowrap transition-colors duration-500">
                        INNOVATION <br />CONCLAVE
                    </h1>
                </div>

                {/* Final Absolute Bottom Bar */}
                <div className="absolute bottom-0 w-full px-8 md:px-16 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 dark:border-white/10 z-20 bg-white/80 dark:bg-[#0b1120]/80 backdrop-blur-2xl transition-colors duration-500">
                    <span className="text-slate-500 text-sm font-medium transition-colors">&copy; {new Date().getFullYear()} Designed and Developed by Nagalakshmi & Deedepya. All rights reserved.</span>
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-500 mt-4 md:mt-0 transition-colors">
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>

            </footer>
        </div>
    );
}
