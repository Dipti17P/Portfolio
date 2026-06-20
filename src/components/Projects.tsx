import { motion } from "motion/react";
import { ExternalLink, Github, BrainCircuit, Layers } from "lucide-react";
import { RESUME_DATA } from "../data";
import ProjectCard from "./ProjectCard";
import hungerHotspot from "./assets/images/hunger_hotspot_dashboard_1781857814530.jpg";
import skinSense from "./assets/images/skinsense_interface_1781857829499.jpg";
import mediCheck from "./assets/images/medicheck_ai_terminal_1781857847058.jpg";
import ecommerce from "./assets/images/ecommerce_preview_1781863211413.jpg";
import creditScore from "./assets/images/credit_score_prev_1781863227208.jpg";
import ezLeave from "./assets/images/ezleave_preview_1781863242411.jpg";

const PROJECT_METAS = [
  {
    id: "proj1",
    image: hungerHotspot,
    category: "AI & ML",
    color: "from-[#BC13FE]/20 to-[#00F0FF]/20 text-[var(--neon-cyan)]",
    badge: "ML Detection System",
    metrics: { primary: "~10K+ Records", secondary: "~30% Speed Optimization" }
  },
  {
    id: "proj2",
    image: skinSense,
    category: "Systems & Fullstack",
    color: "from-[var(--neon-blue)]/20 to-[var(--neon-cyan)]/20 text-[var(--neon-blue)]",
    badge: "Smart Skin Engine",
    metrics: { primary: "Rule-Based Recommender", secondary: "~25% CPU Delta" }
  },
  {
    id: "proj3",
    image: mediCheck,
    category: "AI & ML",
    color: "from-[var(--neon-cyan)]/20 to-[#BC13FE]/20 text-[var(--neon-purple)]",
    badge: "Interactive Drug NLP",
    metrics: { primary: "Sentence-BERT model", secondary: "<200ms API Speed" }
  },
  {
    id: "proj4",
    image: ecommerce,
    category: "Full-Stack & Cloud",
    color: "from-[#00F0FF]/25 to-[#BC13FE]/15 text-[var(--neon-cyan)]",
    badge: "MERN E-commerce",
    metrics: { primary: "Express & Mongo", secondary: "Cloudinary CDN" }
  },
  {
    id: "proj5",
    image: creditScore,
    category: "Fintech & ML",
    color: "from-[var(--neon-blue)]/20 to-emerald-500/10 text-emerald-400",
    badge: "Inclusive Scoring Engine",
    metrics: { primary: "Python & SQLite", secondary: "Interactive Recharts" }
  },
  {
    id: "proj6",
    image: ezLeave,
    category: "Enterprise Security",
    color: "from-[var(--neon-purple)]/20 to-[#00F0FF]/15 text-[var(--neon-purple)]",
    badge: "HR Workflow Automator",
    metrics: { primary: "PHP & MySql Stack", secondary: "Role-Based RBAC" }
  }
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Subtle backing grid and ambient glow */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[var(--neon-cyan)]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[var(--neon-purple)]/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

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
            <span className="font-mono text-xs font-bold uppercase tracking-widest">[ DEPLOYED_PORTFOLIOS ]</span>
            <div className="h-0.5 w-12 bg-[var(--neon-cyan)]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
            FEATURED PRODUCTIONS
          </h2>
          <p className="text-slate-500 font-mono text-xs uppercase mt-2">
            DEVELOPMENT_CATALOGUE // ACTIVE PROJECTS : {RESUME_DATA.projects.length.toString().padStart(2, '0')}
          </p>
        </div>

        {/* Vertical Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {RESUME_DATA.projects.map((p, idx) => {
            const meta = PROJECT_METAS.find((m) => m.id === p.id)!;
            
            return (
              <ProjectCard
                key={p.id}
                project={p}
                meta={meta}
                idx={idx}
              />
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
