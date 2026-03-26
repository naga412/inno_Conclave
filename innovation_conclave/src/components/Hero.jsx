import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlineArrowRight, HiOutlineLogin } from 'react-icons/hi';
// FIX: Added "../" to go up one directory level from /components to /src
import land from "../assets/land.png"; 

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="dark bg-slate-950 text-slate-200">
      <div className="relative min-h-screen w-full flex items-center overflow-hidden font-sans">
        
        {/* Background Section */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={land} 
            alt="Innovation Conclave Background" 
            className="w-full h-full object-cover transition-transform duration-1000 scale-105"
          /> 
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/80 to-transparent transition-all duration-500"></div>
        </div>

        {/* Main Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 px-8 md:px-20 max-w-4xl"
        >
          <motion.div 
            variants={fadeInUp}
            className="flex items-center gap-2 mb-6 w-fit px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-sm font-medium backdrop-blur-sm"
          >
            <HiOutlineLocationMarker className="text-lg" />
            <span>AITAM, Tekkali</span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 transition-colors duration-500"
          >
            Innovation <br />
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Conclave
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 leading-relaxed transition-colors duration-500"
          >
            Discover innovative ideas from students, startups, and industry experts. 
            Join us to explore technology and connect with future innovators.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-5">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-xl shadow-blue-900/20 transition-all"
            >
              Register Now
              <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button 
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-bold backdrop-blur-md transition-all duration-300"
            >
              <HiOutlineLogin />
              Login
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom Accent Decor */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-20 left-20 w-32 h-1 bg-blue-500 rounded-full origin-left"
        />
      </div>
    </div>
  );
};

export default Hero;