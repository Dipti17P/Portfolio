import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Mail, Github, Linkedin, Smartphone } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Honors" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickItem = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
          scrolled 
            ? "py-3 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" 
            : "py-5 bg-transparent"
        }`}
      >
        {/* Dynamic Glowing Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-blue)] transition-all duration-75 ease-out shadow-[0_0_8px_var(--neon-cyan)] pointer-events-none" 
          style={{ width: `${scrollProgress}%` }} 
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo with magnetic effect */}
          <motion.button
            onClick={() => handleClickItem("hero")}
            className="flex items-center space-x-1 cursor-pointer font-display text-lg font-bold group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[var(--neon-purple)] font-mono font-bold group-hover:text-[var(--neon-cyan)] transition-colors duration-300">&lt;</span>
            <span className="text-white font-extrabold tracking-wide font-sans bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--neon-purple)] group-hover:to-[var(--neon-cyan)]">
              DIPTI.P
            </span>
            <span className="text-[var(--neon-cyan)] font-mono font-bold group-hover:text-[var(--neon-purple)] transition-colors duration-300">/&gt;</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 glassmorphism px-2.5 py-1.5 rounded-full border-white/5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClickItem(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide font-sans transition-all duration-300 relative cursor-pointer ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 border border-[var(--neon-cyan)]/30 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Connect Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/Dipti17P"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/5 bg-white/5 text-slate-300 hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]/30 transition-all duration-300"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/dipti-patil"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/5 bg-white/5 text-slate-300 hover:text-[var(--neon-purple)] hover:border-[var(--neon-purple)]/30 transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={() => handleClickItem("contact")}
              className="px-4 py-2 text-xs font-semibold tracking-wide uppercase font-display border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/5 text-[var(--neon-cyan)] rounded-lg hover:bg-[var(--neon-cyan)] hover:text-black hover:scale-[1.03] transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)] cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-300 hover:text-white bg-white/5 border border-white/5 rounded-lg"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer with premium reveal animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[62px] left-0 right-0 z-30 bg-[#050505]/95 border-b border-white/10 backdrop-blur-xl md:hidden overflow-hidden flex flex-col pt-3 pb-6 px-6 space-y-4"
          >
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleClickItem(item.id)}
                    className={`py-2 text-left text-sm font-medium border-b border-white/5 transition-all duration-200 ${
                      isActive ? "text-[#00F0FF] pl-2 border-[#00F0FF]/20" : "text-slate-300"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://github.com/Dipti17P"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
              >
                <Github className="w-4 h-4 text-[var(--neon-cyan)]" />
                Dipti17P
              </a>
              <a
                href="https://linkedin.com/in/dipti-patil"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
              >
                <Linkedin className="w-4 h-4 text-[var(--neon-purple)]" />
                dipti-patil
              </a>
            </div>
            <button
              onClick={() => handleClickItem("contact")}
              className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/5 text-[var(--neon-cyan)] rounded-lg cursor-pointer hover:bg-[var(--neon-cyan)] hover:text-black transition-colors duration-300"
            >
              Get In Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
