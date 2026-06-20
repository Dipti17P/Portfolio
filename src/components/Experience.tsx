import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Briefcase, Calendar, ChevronDown, ChevronUp, MapPin, Network, Sparkles } from "lucide-react";
import { RESUME_DATA } from "../data";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("exp1");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll depth of the career timeline to grow the line dynamically
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the progress index to prevent scroll jittering
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-[var(--dark-bg)] overflow-hidden border-t border-white/5"
    >
      {/* Visual background layers */}
      <div className="absolute top-[40%] left-[-15%] w-[600px] h-[600px] bg-[var(--neon-purple)]/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] bg-[var(--neon-cyan)]/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto px-6 relative z-10"
      >
        
        {/* Section Header */}
        <div className="flex flex-col mb-20 text-left">
          <div className="flex items-center space-x-2 text-[var(--neon-cyan)] mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">[ HISTORIC_LOGS ]</span>
            <div className="h-0.5 w-12 bg-[var(--neon-cyan)]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
            CAREER CHRONOLOGY
          </h2>
          <p className="text-slate-500 font-mono text-xs uppercase mt-2">DEPLOYED_SESSIONS_INDEX</p>
        </div>

        {/* Timeline body columns */}
        <div className="relative">
          
          {/* Central Connecting Timeline Line - grows dynamically as you scroll */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-blue)] -translate-x-1/2 hidden md:block shadow-[0_0_8px_var(--neon-cyan)]"
          />

          <div className="space-y-12 md:space-y-20">
            {RESUME_DATA.experience.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, type: "spring", damping: 25 }}
                  className="relative flex flex-col md:flex-row items-stretch"
                >
                  
                  {/* Timeline Node Dot - Centered on desktop, left on mobile */}
                  <div className="absolute left-4 md:left-1/2 top-4 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 rounded-full bg-black border-2 border-[var(--neon-purple)] flex items-center justify-center cursor-pointer shadow-lg shadow-[var(--neon-purple)]/10"
                      onClick={() => toggleExpand(item.id)}
                    >
                      <Briefcase className="w-4 h-4 text-[var(--neon-cyan)]" />
                    </motion.div>
                  </div>
2
                  {/* Desktop alignment Columns */}
                  {/* Left Column (Content or Spacer) */}
                  <div className={`w-full md:w-1/2 pr-0 md:pr-12 pl-12 md:pl-0 text-left md:text-right flex flex-col ${isEven ? "" : "md:order-last"}`}>
                    
                    {/* Title Details */}
                    <div className={`${isEven ? "md:pr-2" : "md:pl-2"}`}>
                      <span className="inline-block px-3 py-1 bg-[var(--neon-purple)]/15 border border-[var(--neon-purple)]/30 rounded-md text-[9px] font-mono font-extrabold text-[var(--neon-purple)] uppercase tracking-widest mb-2 shadow-sm">
                        PROFESSIONAL_INTERNSHIP
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold text-white font-display">
                        {item.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-[var(--neon-cyan)] font-sans mt-0.5">
                        {item.company}
                      </h4>
                      
                      {/* Meta information row handles both alignments gracefully */}
                      <div className={`flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-xs mt-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        <span className="flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[var(--neon-purple)] shrink-0" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1.5 font-sans">
                          <MapPin className="w-3.5 h-3.5 text-[var(--neon-blue)] shrink-0" />
                          {item.location}
                        </span>
                      </div>

                      <p className="text-slate-400 text-xs md:text-sm mt-3 leading-relaxed font-sans">
                        Refined user experience mechanisms, frontend rendering pipelines, and responsive React modules under senior developer mentorship.
                      </p>
                    </div>

                  </div>

                  {/* Mobile spacer / Timeline padding column */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                </motion.div>
              );
            })}
          </div>

          {/* Inline Staggered Accordion Highlights */}
          <div className="mt-12 space-y-6">
            <h4 className="text-xs font-mono uppercase text-[var(--neon-purple)] tracking-widest font-bold text-left mb-4">
              [ COMPILATION_SPECS_AND_DELIVERABLES ]
            </h4>

            {RESUME_DATA.experience.map((item) => {
              const isExpanded = expandedId === item.id;
              
              return (
                <div
                  key={`accordion-${item.id}`}
                  className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[var(--neon-cyan)]/35 transition-colors duration-300 overflow-hidden shadow-xl"
                >
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full flex items-center justify-between p-5 bg-black/40 hover:bg-black/60 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-mono font-extrabold text-slate-500">01</div>
                      <div>
                        <h4 className="font-bold text-white text-sm md:text-base">{item.role}</h4>
                        <span className="text-xs text-[var(--neon-cyan)]">{item.company}</span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 animate-pulse" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/5 bg-black/20 overflow-hidden"
                      >
                        <div className="p-6 space-y-5 text-left">
                          
                          {/* Deliverable bullets as chapter metrics */}
                          <div className="space-y-3.5">
                            <span className="text-[9px] font-mono text-[var(--neon-purple)] tracking-wider uppercase block">[ KEY_DELIVERABLES_HIGHLIGHT ]</span>
                            {item.highlights.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
                                <span className="p-1.5 bg-[var(--neon-cyan)]/15 border border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] rounded-md mt-0.5 shrink-0">
                                  <Sparkles className="w-3 h-3" />
                                </span>
                                <span className="leading-relaxed">{bullet}</span>
                              </div>
                            ))}
                          </div>

                          {/* Skill badges for this chapter */}
                          <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center">
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mr-2">Core Tools:</span>
                            {["HTML5", "CSS3", "JavaScript", "React", "Git Workflows"].map(s => (
                              <span
                                key={s}
                                className="px-2.5 py-1 bg-[var(--neon-purple)]/10 text-[var(--neon-purple)] font-mono text-[10px] rounded-md border border-[var(--neon-purple)]/20 font-semibold"
                              >
                                {s}
                              </span>
                            ))}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* Cinematic summary footer badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-6 text-center max-w-xl mx-auto"
        >
          <Network className="w-6 h-6 text-[var(--neon-cyan)] mx-auto mb-3 animate-[spin_20s_linear_infinite]" />
          <p className="text-xs text-slate-400 italic">
            "Solving real-world, localized resource and medical optimization parameters using modern transformer sentence embeddings and high-fidelity clustering strategies."
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
