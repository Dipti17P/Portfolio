import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Terminal, Server, BrainCircuit, Globe } from "lucide-react";
import { RESUME_DATA } from "../data";
import profileImage from "../assets/images/dipti_original_photo_1781868524954.jpg";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [typedTitle, setTypedTitle] = useState("");
  const [titleIdx, setTitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const words = [
    "Full-Stack AI Developer",
    "AI & Backend Developer",
    "Software Engineer",
    "Machine Learning Enthusiast",
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight coords
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring effect for mouse cursor hover
  const spotlightX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Pinned/morph scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[titleIdx];
    
    const handleType = () => {
      if (!isDeleting) {
        setTypedTitle(currentWord.substring(0, typedTitle.length + 1));
        if (typedTitle === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), 1800);
        } else {
          timer = setTimeout(handleType, 70);
        }
      } else {
        setTypedTitle(currentWord.substring(0, typedTitle.length - 1));
        if (typedTitle === "") {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % words.length);
        } else {
          timer = setTimeout(handleType, 35);
        }
      }
    };

    timer = setTimeout(handleType, isDeleting ? 35 : 70);
    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, titleIdx]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Track mouse client relative to hero container
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-[#050505] select-none"
    >
      {/* Dynamic spotlight */}
      <motion.div
        style={{
          left: spotlightX,
          top: spotlightY,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[var(--neon-cyan)]/15 via-[var(--neon-purple)]/10 to-transparent pointer-events-none blur-[125px] mix-blend-screen z-10"
      />

      {/* Futuristic Mesh Background & Glowing Grid */}
      <div className="absolute inset-0 grid-background opacity-45 pointer-events-none z-0" />
      
      {/* Radial fade out overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[var(--dark-bg)]/60 to-[var(--dark-bg)] pointer-events-none z-0" />

      {/* Floating abstract orbs */}
      <div className="absolute top-[15%] left-[5%] w-80 h-80 bg-[var(--neon-purple)]/10 rounded-full blur-[100px] drift-orb-1" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[var(--neon-cyan)]/10 rounded-full blur-[120px] drift-orb-2" />

      <motion.div 
        style={{ y: textParallaxY, opacity: textOpacity, scale: scaleParallax }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20"
      >
        
        {/* Left column (Text content) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left justify-center">

          {/* Core Name */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white leading-[0.85] uppercase"
            >
              FULL-STACK<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>AI DEVELOPER</span><br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-cyan)]">{RESUME_DATA.personal.name}</span>
            </motion.h1>
            
            {/* Typewritten Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-lg md:text-xl font-mono text-slate-400 font-medium h-8 flex items-center"
            >
              <span className="text-[var(--neon-purple)] mr-2">&gt;</span>
              <span className="text-[var(--neon-cyan)] font-bold uppercase tracking-wider">
                {typedTitle}
              </span>
              <span className="inline-block w-2.5 h-5 ml-0.5 bg-[var(--neon-cyan)] animate-pulse" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-[#E0E0E0]/75 text-sm md:text-base max-w-xl leading-relaxed font-sans"
          >
            {RESUME_DATA.personal.summary}
          </motion.p>

          {/* Action buttons with extreme transitions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-wrap gap-4 pt-3"
          >
            <button
              onClick={() => onNavigate("projects")}
              className="px-6 py-3.5 text-xs uppercase font-mono font-bold tracking-wider border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/5 hover:bg-[var(--neon-cyan)] hover:text-black rounded-lg transition-all duration-500 shadow-xl shadow-[var(--neon-cyan)]/5 flex items-center gap-2 group cursor-pointer"
            >
              Examine Codebases
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => onNavigate("contact")}
              className="px-6 py-3.5 text-xs uppercase font-mono font-bold tracking-wider text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:border-[var(--neon-purple)]/40 hover:bg-[var(--neon-purple)]/10 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-[var(--neon-purple)]" />
              Contact Terminal
            </button>
          </motion.div>
        </div>

        {/* Right column (Visual portrait & Hologram effect) */}
        <div className="lg:col-span-5 flex justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1, type: "spring", damping: 25 }}
            className="relative w-72 h-72 md:w-96 md:h-96"
          >
            {/* Geometric visualizers & Rotating neon rings */}
            <div className="absolute inset-0 border border-dashed border-[var(--neon-purple)]/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute -inset-4 border border-dashed border-[var(--neon-cyan)]/15 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
            <div className="absolute -inset-8 border border-white/5 rounded-full" />

            {/* Glowing nodes on outer perimeter */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--neon-purple)] rounded-full blur-[4px] animate-pulse" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[var(--neon-cyan)] rounded-full blur-[4px] animate-pulse" />

            {/* Immersive Profile Image Frame with Glass Mask */}
            <div className="w-full h-full rounded-2xl overflow-hidden glassmorphism-card border border-[var(--neon-purple)]/30 p-2.5 relative group">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
  src={profileImage}
  alt="Dipti Patil Portrait"
  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-115 transition-all duration-700"
/>
                
                {/* Overlay diagnostic scan line */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[var(--neon-purple)]/10 to-transparent pointer-events-none animate-[bounce_8s_infinite] saturate-200" />
                
                {/* Holographic matrix color filter */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--neon-purple)]/20 via-transparent to-[var(--neon-cyan)]/25 opacity-40 mix-blend-color-dodge pointer-events-none" />
              </div>

            </div>

          </motion.div>
        </div>

      </motion.div>

      {/* Decorative indicator to scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2">
        <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">SYSTEM_FLOW</span>
        <motion.div 
          onClick={() => onNavigate("about")}
          className="w-5 h-8 border border-[var(--neon-purple)]/40 rounded-full flex justify-center p-1 cursor-pointer hover:border-[var(--neon-cyan)] transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 bg-[var(--neon-cyan)] rounded-full"
          />
        </motion.div>
      </div>

    </section>
  );
}
