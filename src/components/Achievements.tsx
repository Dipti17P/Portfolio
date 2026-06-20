import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Award, GitMerge, FileText, CheckCircle, Flame, Star } from "lucide-react";
import { RESUME_DATA } from "../data";
import ScrollCounter from "./ScrollCounter";

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Infinite, layered parallex displacement for background elements
  const layer1Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative min-h-screen py-24 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Scroll-tracked parallax backdrop highlights */}
      <motion.div
        style={{ y: layer1Y }}
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[var(--neon-cyan)]/5 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ y: layer2Y }}
        className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[var(--neon-purple)]/5 rounded-full blur-[140px] pointer-events-none"
      />
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 text-left">
          <div className="flex items-center space-x-2 text-[var(--neon-purple)] mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">[ DEPLOYED_TROPHIES_SHEETS ]</span>
            <div className="h-0.5 w-12 bg-[var(--neon-purple)]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
            HONORS & RECOGNITIONS
          </h2>
          <p className="text-slate-500 font-mono text-xs uppercase mt-2">ALGORITHM_EVALUATIONS_LOG</p>
        </div>

        {/* Major Achievements Dual Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* GATE 2026 Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[var(--neon-cyan)]/25 text-left relative group overflow-hidden flex flex-col justify-between"
          >
            {/* Hover card lighting glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-cyan)]/5 rounded-full blur-2xl group-hover:bg-[var(--neon-cyan)]/10 transition-all duration-500" />
            
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] rounded-2xl">
                  <Award className="w-8 h-8 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-[var(--neon-cyan)] bg-black/50 font-bold px-3 py-1 rounded-full border border-[var(--neon-cyan)]/30 uppercase tracking-wider">
                  National Index
                </span>
              </div>
              
              <h3 className="text-2xl font-black font-display text-white mb-4 uppercase tracking-tight">
                {RESUME_DATA.achievements[0].title}
              </h3>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {RESUME_DATA.achievements[0].description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">QUALIFIED STATUS:</span>
                <span className="text-[var(--neon-cyan)] font-extrabold tracking-widest uppercase">VERIFIED</span>
              </div>

              <div className="p-4 bg-[#050505]/40 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">SUBJECT SCHEME:</span>
                <span className="text-white font-bold">COMPUTER SCIENCE & IT</span>
              </div>
            </div>
          </motion.div>

          {/* GirlScript Summer of Code Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[var(--neon-purple)]/25 text-left relative group overflow-hidden flex flex-col justify-between"
          >
            {/* Hover card lighting glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-purple)]/5 rounded-full blur-2xl group-hover:bg-[var(--neon-purple)]/10 transition-all duration-500" />
            
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 text-[var(--neon-purple)] rounded-2xl">
                  <GitMerge className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-mono text-[var(--neon-purple)] bg-black/50 font-bold px-3 py-1 rounded-full border border-[var(--neon-purple)]/30 uppercase tracking-wider">
                  Global Open Source
                </span>
              </div>
              
              <h3 className="text-2xl font-black font-display text-white mb-4 uppercase tracking-tight">
                {RESUME_DATA.achievements[1].title}
              </h3>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {RESUME_DATA.achievements[1].description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">PARTICIPATING SYSTEM:</span>
                <span className="text-[var(--neon-purple)] font-extrabold tracking-widest uppercase">GSSOC CONTRIBUTOR</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase mb-0.5">AUTH ENGINES</span>
                  <span className="text-[var(--neon-cyan)] font-extrabold font-mono text-xs">RESETS IMPLEMENTED</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase mb-0.5">DEV WORKFLOWS</span>
                  <span className="text-white font-extrabold font-mono text-xs">COLLABORATIVE PRs</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Kinetic performance records footer panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          {[
            { label: "GATE Qualified Version", val: "2026", desc: "CS & Information Tech fundamentals", icon: Star, color: "text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5" },
            { label: "Contributors Collaboration", val: "GSSOC", desc: "Collaborating with maintainers", icon: Flame, color: "text-[var(--neon-purple)] bg-[var(--neon-purple)]/5" },
            { label: "Git Branching Operations", val: "100%", desc: "Clean merge conflict resolutions", icon: CheckCircle, color: "text-[var(--neon-blue)] bg-[var(--neon-blue)]/5" },
            { label: "Review Approvals", val: "Clean", desc: "Secure token encryption workflows", icon: FileText, color: "text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5" }
          ].map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col justify-between text-left hover:border-[var(--neon-cyan)]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.color} border border-white/5`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">HONOR_LOG_0{idx+1}</span>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-black font-display text-white mb-0.5 tracking-tight">{stat.val}</div>
                  <div className="text-xs font-semibold text-slate-400 font-sans mb-1">{stat.label}</div>
                  <div className="text-[10px] text-slate-500 font-mono italic leading-tight">{stat.desc}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
