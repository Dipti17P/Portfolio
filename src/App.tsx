import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import ParticleBackground from "./components/ParticleBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { Terminal, Github, Linkedin, ArrowUp } from "lucide-react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hasPointer, setHasPointer] = useState(false);

  // Track scroll section heights to sync Navbar dynamically
  useEffect(() => {
    // Check if device supports fine pointers (like hover mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasPointer(mediaQuery.matches);

    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "projects", "achievements", "education", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;


      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track cursor coordinates for the smooth follow loop
  useEffect(() => {
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasPointer]);

  // Handle smooth scroll jumping to anchors safely
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`relative min-h-screen bg-[#050505] text-[#E0E0E0] selection:bg-[#00F0FF] selection:text-black overflow-hidden ${hasPointer ? "custom-cursor-active" : ""}`}
          >
            {/* Custom Interactive Follow Cursor (Only on Desktop pointing devices) */}
            {hasPointer && (
              <>
                <motion.div
                  className="fixed top-0 left-0 w-3 h-3 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] rounded-full pointer-events-none z-50 mix-blend-screen"
                  animate={{
                    x: cursorPos.x - 6,
                    y: cursorPos.y - 6,
                  }}
                  transition={{ type: "spring", stiffness: 1000, damping: 50 }}
                />
                <motion.div
                  className="fixed top-0 left-0 w-8 h-8 border-2 border-[#BC13FE] shadow-[0_0_12px_rgba(188,19,254,0.4)] rounded-full pointer-events-none z-50 mix-blend-screen"
                  animate={{
                    x: cursorPos.x - 16,
                    y: cursorPos.y - 16,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </>
            )}

            {/* Seamless Canvas Particle Engine */}
            <ParticleBackground />

            {/* Float Navigation */}
            <Navbar activeSection={activeSection} onNavigate={handleScrollToSection} />

            {/* Main scroll sheets */}
            <main className="relative z-10 w-full">
              <Hero onNavigate={handleScrollToSection} />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Achievements />
              <Education />
              <Contact />
            </main>

            {/* High-Contrast Interactive Footer */}
            <footer className="relative bg-[#050505]/95 border-t border-white/5 py-12 px-6 text-center z-10">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Brand and simple coordinates */}
                <div className="flex items-center space-x-1 font-display hover:scale-105 transition-transform duration-300">
                  <span className="text-[#BC13FE] font-mono font-bold">&lt;</span>
                  <span className="text-white font-extrabold tracking-widest font-sans">
                    DIPTI.P
                  </span>
                  <span className="text-[#00F0FF] font-mono font-bold">/&gt;</span>
                </div>

                {/* Secure human-facing credit footer info */}
                <div className="text-xs text-slate-500 font-mono">
                  <span>DIPTI PATIL PORTFOLIO</span>
                </div>

                {/* Back to top button */}
                <button
                  onClick={() => handleScrollToSection("hero")}
                  className="p-3 bg-white/5 hover:bg-[#00F0FF] hover:text-black border border-white/10 text-[#00F0FF] rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 group text-xs font-mono font-bold uppercase shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                >
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  Anchor To Top
                </button>

              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
