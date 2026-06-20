import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, Github, BrainCircuit, Layers } from "lucide-react";

interface Project {
  id: string;
  title: string;
  year: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
  };
  description: string;
}

interface ProjectMeta {
  id: string;
  image: string;
  category: string;
  color: string;
  badge: string;
  metrics: {
    primary: string;
    secondary: string;
  };
}

interface ProjectCardProps {
  key?: string;
  project: Project;
  meta: ProjectMeta;
  idx: number;
}

export default function ProjectCard({ project, meta, idx }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords relative to card (-0.5 to 0.5 range)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spotlight circle mouse positions in pixels
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Smooth springs for 3D rotation angles
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 });

  // Smooth transition for cards glow position
  const glowSpringX = useSpring(glowX, { stiffness: 220, damping: 26 });
  const glowSpringY = useSpring(glowY, { stiffness: 220, damping: 26 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Center of card is (0, 0)
    const px = (e.clientX - rect.left) / width - 0.5;
    const py = (e.clientY - rect.top) / height - 0.5;

    x.set(px);
    y.set(py);

    // Pixel coords for ambient spotlight background indicator
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: "easeOut" }}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden glassmorphism-card flex flex-col justify-between relative group hover:border-[var(--neon-cyan)]/45 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(0,240,255,0.06)] h-full cursor-default"
    >
      {/* Dynamic Cursor tracking spotlight orb layer inside card */}
      <motion.div
        style={{
          left: glowSpringX,
          top: glowSpringY,
          opacity: isHovered ? 0.35 : 0,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-radial from-[var(--neon-cyan)]/30 to-transparent pointer-events-none blur-3xl z-10"
      />

      {/* Visual Image Banner */}
      <div className="h-48 relative overflow-hidden bg-black border-b border-white/5 select-none" style={{ transform: "translateZ(20px)" }}>
        <img
          src={meta.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-75 group-hover:brightness-95 grayscale group-hover:grayscale-0 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
        
        {/* Floating Absolute category tags */}
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          <span className="px-3 py-1 bg-[#050505]/85 border border-white/15 rounded-lg text-[9px] font-mono uppercase tracking-wider text-slate-300">
            {meta.category}
          </span>
          <span className="px-3 py-1 bg-[var(--neon-purple)]/25 border border-[var(--neon-purple)]/40 rounded-lg text-[9px] font-mono uppercase tracking-wider text-[var(--neon-purple)] font-bold">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-6 flex-1 flex flex-col justify-between text-left" style={{ transform: "translateZ(30px)" }}>
        
        <div>
          {/* Role / Tech group logo */}
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-[var(--neon-cyan)]/30 transition-all duration-300">
              <BrainCircuit className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-white transition-colors duration-300">{meta.badge}</span>
          </div>

          {/* Display Title */}
          <h3 className="text-xl font-black font-display text-white tracking-tight uppercase leading-snug mb-3 group-hover:text-gradient transition-all duration-500">
            {project.title}
          </h3>

          {/* Clean Descriptive Copy */}
          <p className="text-xs md:text-sm text-slate-350 leading-relaxed font-sans font-medium line-clamp-4 mb-4">
            {project.description}
          </p>
        </div>

        {/* Progressive Micro list deliverables and skill tag lists */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          
          {/* Performance Metrics strip */}
          <div className="grid grid-cols-2 gap-3 bg-[#050505]/60 p-3 rounded-xl border border-white/5 text-xs font-mono group-hover:border-[var(--neon-purple)]/15 transition-all duration-300">
            <div>
              <span className="block text-[8px] text-slate-500 uppercase">METRICS RANGE</span>
              <span className="text-[var(--neon-cyan)] font-extrabold">{meta.metrics.primary}</span>
            </div>
            <div>
              <span className="block text-[8px] text-slate-500 uppercase">BENCHMARK</span>
              <span className="text-white font-extrabold">{meta.metrics.secondary}</span>
            </div>
          </div>

          {/* Technology list tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 bg-[var(--neon-purple)]/10 text-[var(--neon-purple)] font-mono text-[9px] rounded-md border border-[var(--neon-purple)]/20 font-bold hover:bg-[var(--neon-purple)]/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* Bottom Interactive Links Toolbar */}
      <div className="px-6 py-4 bg-black/40 border-t border-white/5 flex items-center justify-between" style={{ transform: "translateZ(10px)" }}>
        <div className="flex items-center space-x-1 font-mono text-[9px] text-slate-500">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>LOG_COEF_PROJ0{idx+1}</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-350 hover:text-white border border-white/5 transition-all duration-300 cursor-pointer hover:border-[var(--neon-purple)]/30"
          >
            <Github className="w-4 h-4" />
          </a>
          {project.links.demo && project.links.demo !== "#" && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[var(--neon-cyan)] text-black rounded-lg text-xs font-mono font-bold uppercase hover:bg-white hover:scale-103 active:scale-97 transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-[var(--neon-cyan)]/15 cursor-pointer font-sans"
            >
              Launch
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
