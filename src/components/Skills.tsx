import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Terminal, Cpu, Database, Eye, CheckCircle2 } from "lucide-react";

// Extracted list of all skills with descriptive experience level percentages
const DIGITAL_SKILLS = [
  { name: "Python", category: "Languages", rating: 92, desc: "Primary language for ML modeling, NLP transformer pipelines, & APIs.", origin: "MediCheck AI, Hunger Hotspot Detection" },
  { name: "JavaScript", category: "Languages", rating: 88, desc: "Enables highly active frontends & dynamic Node.js middleware.", origin: "Unique Coders, Hunger Hotspot" },
  { name: "C++", category: "Languages", rating: 85, desc: "Used for high-speed algorithm engineering and computational modules.", origin: "Academic/GATE Fundamentals" },
  { name: "SQL", category: "Languages", rating: 88, desc: "Optimizing PostgreSQL relational database configurations.", origin: "SkinSense recommender query optimization" },
  
  { name: "React.js", category: "Frontend", rating: 90, desc: "Creating reactive context states and high-framerate dashboards.", origin: "Unique Coders, Hunger Hotspot Dashboard" },
  { name: "Flutter", category: "Frontend", rating: 85, desc: "Deploying secure, cross-platform Android & iOS clients with JWT.", origin: "MediCheck AI Patient Portal" },
  { name: "Tailwind CSS", category: "Frontend", rating: 95, desc: "Crafting beautiful glassmorphic visual themes and layouts.", origin: "SkinSense, Custom Portfolios" },

  { name: "FastAPI", category: "Backend", rating: 90, desc: "Developing asynchronous, microsecond APIs with automatic docs.", origin: "MediCheck AI low-latency node (~200ms)" },
  { name: "Node.js", category: "Backend", rating: 88, desc: "Providing fast, event-loop service boundaries and auth workflows.", origin: "Hunger Hotspot Backend" },
  { name: "Express.js", category: "Backend", rating: 87, desc: "Configuring REST endpoints with token-based router protection.", origin: "Full Stack REST APIs" },
  { name: "Django", category: "Backend", rating: 82, desc: "Structuring secure databases with built-in ORM mapping.", origin: "SkinSense product index scaling" },
  { name: "REST APIs", category: "Backend", rating: 92, desc: "Engineering granular endpoints with standard status response mapping.", origin: "All central core projects" },
  { name: "JWT", category: "Backend", rating: 90, desc: "Handling secure bearer tokens across stateful/stateless routes.", origin: "MediCheck AI & Hunger Hotspot" },

  { name: "MongoDB", category: "Databases", rating: 85, desc: "Writing geospatial document clusters and indexed query chains.", origin: "Hunger Hotspot geospatial records" },
  { name: "PostgreSQL", category: "Databases", rating: 86, desc: "Relational database schema updates and trigger tuning.", origin: "SkinSense database layer (~25% speedup)" },

  { name: "Scikit-learn", category: "Machine Learning", rating: 88, desc: "Applying unsupervised K-Means clusters and supervised Decision Trees.", origin: "Hunger Hotspot models (~10K dataset)" },
  { name: "Pandas & NumPy", category: "Machine Learning", rating: 87, desc: "High-throughput data parsing and matrix transformations.", origin: "ML data transformation pipelines" },
  { name: "NLP", category: "Machine Learning", rating: 85, desc: "Using S-BERT Sentence transformers for semantic text search.", origin: "MediCheck AI drug detection" },

  { name: "Git & GitHub", category: "Tools & DevOps", rating: 90, desc: "Collaborating with maintainers, GSSOC workflows, code reviews.", origin: "Unique Coders, Open Source" },
  { name: "Docker", category: "Tools & DevOps", rating: 80, desc: "Creating reproducible container boundaries for application suites.", origin: "Microservice isolation" },
  { name: "Vercel & Postman", category: "Tools & DevOps", rating: 89, desc: "Deploying web endpoints and verifying API schemas / structures.", origin: "Testing workflow endpoints" }
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(DIGITAL_SKILLS[0]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // Grouped list
  const categories = Array.from(new Set(DIGITAL_SKILLS.map(s => s.category)));

  // Framer Motion staggered grid definitions
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen py-24 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Scroll-tracked parallax background gradients */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[var(--neon-cyan)]/10 rounded-full blur-[130px] pointer-events-none glowing-orbs" 
      />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[var(--neon-purple)]/10 rounded-full blur-[130px] pointer-events-none glowing-orbs animate-pulse" />
      <div className="absolute inset-0 grid-background opacity-25 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

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
            <span className="font-mono text-xs font-bold uppercase tracking-widest">[ SKILL_GALAXY_ORBIT ]</span>
            <div className="h-0.5 w-12 bg-[var(--neon-purple)]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
            INTELLIGENCE MATRIX
          </h2>
          <p className="text-slate-500 font-mono text-xs uppercase mt-2">DYNAMICS_CONTROL_COEFFICIENTS</p>
        </div>

        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Left panel: Grouped Skills selection */}
          <div className="lg:col-span-8 space-y-8">
            {categories.map((cat, catIdx) => {
              const items = DIGITAL_SKILLS.filter(s => s.category === cat);
              return (
                <motion.div
                  key={cat}
                  variants={cardVariants}
                  className="space-y-4 text-left"
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[var(--neon-purple)] flex items-center gap-1.5">
                      <span className="text-[var(--neon-cyan)] font-normal">0{catIdx + 1}.</span> {cat}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      Nodes: {items.length}
                    </span>
                  </div>

                  {/* Progressive floating technology buttons tag-cloud */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {items.map((skill) => {
                      const isSelected = selectedSkill.name === skill.name;
                      return (
                        <motion.button
                          key={skill.name}
                          onClick={() => setSelectedSkill(skill)}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4.5 py-2.5 text-xs font-mono font-medium rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                            isSelected
                              ? "bg-[var(--neon-cyan)]/10 text-white border-[var(--neon-cyan)]/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                              : "bg-[#050505]/60 text-slate-300 border-white/10 hover:border-[var(--neon-cyan)]/25 hover:text-white"
                          }`}
                        >
                          {isSelected && (
                            <motion.span
                              layoutId="skillNodePulse"
                              className="absolute inset-0 bg-gradient-to-r from-[var(--neon-purple)]/10 to-[var(--neon-cyan)]/10 animate-pulse pointer-events-none"
                            />
                          )}
                          <div className="flex items-center gap-1.5 z-10 relative">
                            <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-[var(--neon-cyan)] animate-ping" : "bg-[var(--neon-purple)]/60"}`} />
                            {skill.name}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right panel: Premium Diagnostic HUD Panel (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <motion.div 
              variants={cardVariants}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-left relative overflow-hidden shadow-2xl"
            >
              {/* Mesh glowing decoration background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-purple)]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-[var(--neon-cyan)]" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">SYSTEM_DIAGNOSTICS</span>
                </div>
                <span className="text-[9px] font-mono text-[var(--neon-cyan)] bg-white/5 px-2.5 py-1 rounded-full border border-[var(--neon-cyan)]/30 uppercase animate-pulse">
                  ONLINE
                </span>
              </div>

              {/* Central Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[var(--neon-purple)] tracking-wider">
                      {selectedSkill.category}
                    </span>
                    <h3 className="text-3xl font-display font-black text-white mt-1">
                      {selectedSkill.name}
                    </h3>
                  </div>

                  {/* Circular Rating details with animated proficiency indicators */}
                  <div className="flex items-center space-x-6 bg-[#050505]/60 p-4 rounded-xl border border-white/5">
                    {/* Ring indicator */}
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        {/* Background grey track */}
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          className="stroke-slate-800"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        {/* Interactive cyan track */}
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          className="stroke-[var(--neon-cyan)]"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 28}
                          initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - selectedSkill.rating / 100) }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-xs font-mono font-bold text-white">
                        {selectedSkill.rating}%
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-slate-400">COEFFICIENT_RATING</div>
                      <div className="text-sm font-bold text-white mt-0.5">High Competency</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Calculated from project usage</div>
                    </div>
                  </div>

                  {/* Text statement */}
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">FUNCTIONAL_ROLE_DESCRIPTION</div>
                    <p className="text-xs text-slate-350 leading-relaxed font-sans">
                      {selectedSkill.desc}
                    </p>
                  </div>

                  {/* Associated project background proof */}
                  <div className="space-y-1 pt-1.5 border-t border-white/5">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">CORE_INTEGRATION_SOURCE</div>
                    <div className="flex items-start gap-2 text-xs text-slate-400 mt-1 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-[var(--neon-purple)] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-slate-200">{selectedSkill.origin}</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Code mock mockup */}
                  <div className="bg-[#050505]/95 p-3 rounded-lg border border-white/10 font-mono text-[9px] text-[var(--neon-cyan)] leading-tight select-none">
                    <div>
                      <span className="text-[var(--neon-purple)]">const</span> <span className="text-[var(--neon-cyan)]">diptiNode</span> = <span className="text-[var(--neon-purple)]">new</span> <span className="text-amber-300">DeveloperCell</span>({`{`}
                    </div>
                    <div className="pl-3">
                      name: <span className="text-emerald-400">"{selectedSkill.name}"</span>,
                    </div>
                    <div className="pl-3">
                      precision: <span className="text-amber-400">{selectedSkill.rating / 100}</span>,
                    </div>
                    <div className="pl-3 text-slate-500">
                      environment: <span className="text-emerald-400">"STABLE"</span>
                    </div>
                    <div>{`});`}</div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

        </motion.div>

      </motion.div>
    </section>
  );
}
