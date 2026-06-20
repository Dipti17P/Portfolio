import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BookOpen, GraduationCap, Cpu, Laptop } from "lucide-react";
import { RESUME_DATA } from "../data";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax layers tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const floatY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Cinematic drift light background orbs */}
      <motion.div 
        style={{ y: floatY }}
        className="absolute top-[25%] left-[-15%] w-[600px] h-[600px] bg-[var(--neon-purple)]/5 rounded-full blur-[130px] pointer-events-none" 
      />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-[var(--neon-cyan)]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 text-left">
          <div className="flex items-center space-x-2 text-[var(--neon-cyan)] mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">[ COGNITIVE_BIOMETRICS ]</span>
            <div className="h-0.5 w-12 bg-[var(--neon-cyan)]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
            WHO I AM & WHAT I DO
          </h2>
          <p className="text-slate-500 font-mono text-xs uppercase mt-2">DOS://IDENTITY_DECODER_INDEX</p>
        </div>

        {/* Narrative Flow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Who I Am Column (Narrative details) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >

              <p className="text-[#E0E0E0]/85 text-sm md:text-base leading-relaxed font-sans">
                {RESUME_DATA.personal.summary}
              </p>
              
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                Currently completing my B.Tech studies in <span className="text-[var(--neon-cyan)] font-bold">Computer Engineering</span> (2023 – 2027), my work centers on bridging foundational software development with state-of-the-art computational algorithms. I build secure user portals, design machine learning inference pipelines, and optimize backend throughput variables.
              </p>
            </motion.div>

            {/* Academic Track Bento Block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[var(--neon-cyan)]/30 transition-all duration-300 shadow-xl overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none">
                <GraduationCap className="w-24 h-24 text-white" />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-3 bg-[var(--neon-purple)]/10 text-[var(--neon-purple)] rounded-2xl border border-[var(--neon-purple)]/20 shrink-0">
                    <BookOpen className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[var(--neon-purple)] uppercase tracking-wider block">[ PRIMARY_ACADEMIC_LOG ]</span>
                    <h4 className="font-bold text-white text-base leading-tight md:text-lg">
                      {RESUME_DATA.education.degree}
                    </h4>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block px-3 py-1 bg-[var(--neon-purple)]/15 border border-[var(--neon-purple)]/30 text-[10px] font-mono font-bold text-[var(--neon-purple)] rounded-full">
                    {RESUME_DATA.education.period}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3.5 text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                <span className="text-white font-bold block">{RESUME_DATA.education.institution}</span>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[var(--neon-cyan)] rounded-full shrink-0" />
                  <span>Commanding abstract schema architecture, database management, and data structural analysis.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[var(--neon-cyan)] rounded-full shrink-0" />
                  <span>Integrating sentence embedding networks and geospatial clustering solutions.</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* What I Do Column (High-Contrast Bento Cards representation) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* System Architect Service card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[var(--neon-cyan)]/25 text-left relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--neon-cyan)]/5 rounded-full blur-2xl group-hover:bg-[var(--neon-cyan)]/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[var(--neon-cyan)]/5 border border-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] rounded-xl">
                  <Laptop className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[var(--neon-cyan)] bg-black/60 font-bold px-3 py-1 rounded-full border border-[var(--neon-cyan)]/30 uppercase">
                  System Engine
                </span>
              </div>
              
              <h4 className="text-lg font-black font-display text-white mb-2 uppercase tracking-tight">
                Full-Stack Systems
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Structuring ultra-fast user experiences inside React and Flutter, backed by resilient server frameworks (FastAPI, Node.js, Express) and robust OAuth portals.
              </p>
            </motion.div>

            {/* AI pipeline Service card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[var(--neon-purple)]/25 text-left relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--neon-purple)]/5 rounded-full blur-2xl group-hover:bg-[var(--neon-purple)]/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[var(--neon-purple)]/5 border border-[var(--neon-purple)]/20 text-[var(--neon-purple)] rounded-xl">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[var(--neon-purple)] bg-black/60 font-bold px-3 py-1 rounded-full border border-[var(--neon-purple)]/30 uppercase">
                  Intelligence Layer
                </span>
              </div>
              
              <h4 className="text-lg font-black font-display text-white mb-2 uppercase tracking-tight">
                AI & Machine Learning
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Formulating neural sentence embeddings for quick diagnostic lookups, as well as configuring geospatial cluster matrices using K-Means modeling.
              </p>
            </motion.div>

          </div>

        </div>



      </motion.div>
    </section>
  );
}
