import { motion } from "motion/react";
import { GraduationCap, Award, CheckSquare, Target, Cpu, Flame, CheckCircle, Star } from "lucide-react";
import { RESUME_DATA } from "../data";

const CORE_COURSES = [
  "Core Computer Science & Engineering",
  "Machine Learning & Mathematical Modeling",
  "Natural Language Processing (NLP)",
  "Geospatial Clustering (K-Means / Decision Trees)",
  "Relational & Document Databases (Postgre, MongoDB)",
  "Distributed Asynchronous Backend Systems & JWT",
  "Design & Analysis of Algorithms",
  "Object-Oriented Programming"
];

const ACADEMIC_MILESTONES = [
  {
    year: "2023",
    title: "B.Tech Program Commenced",
    desc: "Enrolled in Computer Engineering major at SVKM's Institute of Technology, Dhule.",
    beacon: "ACADEMIC_INITIALIZE"
  },
  {
    year: "2024",
    title: "Enterprise Web Intern",
    desc: "Tackle real-world rendering cycles and asset payload updates under production frameworks.",
    beacon: "PRACTICAL_LOG_01"
  },
  {
    year: "2025",
    title: "Rule-Based Skin Recommender Built",
    desc: "Architected SkinSense system reducing SQL request overhead by ~25% through strategic index configuration.",
    beacon: "PROJECT_RELEASE_02"
  },
  {
    year: "2026",
    title: "GATE 2026 Qualified & NLP Deployed",
    desc: "Successfully passed GATE 2026. Engineered Sentence-BERT real-time analytics with low-latency FastAPI.",
    beacon: "COMPUTE_GRADUATION_READY"
  }
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative min-h-screen py-24 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-[30%] left-[-10%] w-[450px] h-[450px] bg-[#BC13FE]/5 rounded-full blur-[110px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-[#00F0FF]/5 rounded-full blur-[110px] pointer-events-none animate-pulse" />
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
          <div className="flex items-center space-x-2 text-[#00F0FF] mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">[ ACADEMIC_TRACK ]</span>
            <div className="h-0.5 w-12 bg-[#00F0FF]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
            EDUCATION & MILESTONES
          </h2>
          <p className="text-slate-500 font-mono text-xs uppercase mt-2">DIPTI_PATIL_CERTIFICATION_COEFFICIENTS</p>
        </div>

        {/* Dynamic Dual Grid Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Institution & Courses List */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Institute Detail Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 relative group overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <GraduationCap className="w-32 h-32 text-[#BC13FE]" />
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-[#BC13FE]/15 text-[#BC13FE] border border-[#BC13FE]/35 rounded-2xl">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#BC13FE] uppercase tracking-widest block">DECREE_PORTAL</span>
                  <h4 className="text-xl md:text-2xl font-extrabold text-white">{RESUME_DATA.education.degree}</h4>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="border-b border-white/5 pb-3">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">CAMPUS</span>
                  <span className="text-white font-bold text-base">{RESUME_DATA.education.institution}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] font-mono text-slate-500 uppercase">TIMEFRAME</span>
                    <span className="text-[#00F0FF] font-bold font-mono">{RESUME_DATA.education.period}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-500 uppercase">MAJOR ENCOMPASSED</span>
                    <span className="text-[#00F0FF] font-bold">Comp. Engineering</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Courses / Skills checklist */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-left"
            >
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-widest mb-6">
                <Target className="w-4 h-4" />
                <span>INTEGRATION_CURRICULUM_COMPREHENSION</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CORE_COURSES.map((course, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#050505]/40 border border-white/5 rounded-2xl flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-[#00F0FF] mt-0.5 shrink-0" />
                    <span className="text-xs font-sans text-slate-300 leading-normal font-medium">{course}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right panel: Milestone success ledger & Certificate render */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* National GATE validation badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#050505] to-[#111111] border border-white/15 rounded-3xl p-6 text-left relative overflow-hidden shadow-2xl group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00F0FF]/10 transition-colors" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-[#00F0FF] animate-bounce" />
                  <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest font-extrabold">GATE_2026_VALIDATION</span>
                </div>
                <span className="text-[8px] font-mono text-[#00F0FF] border border-[#00F0FF]/35 bg-[#00F0FF]/10 px-2 py-0.5 rounded-full font-bold">
                  VERIFIED
                </span>
              </div>

              <h4 className="text-xl font-bold font-display text-white mb-2">
                Certified GATE 2026 Qualifier
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Demonstrated strong engineering acumen, command over mathematical foundations, database indexing structures, computational graphs, and advanced networks.
              </p>

              <div className="p-3.5 bg-[#050505]/90 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Status coefficient:</span>
                <span className="text-[#00F0FF] font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#00F0FF] text-[#00F0FF]" />
                  PASS / REGISTERED
                </span>
              </div>
            </motion.div>

            {/* Micro-milestone visual line stack */}
            <div className="space-y-4">
              <span className="block text-left text-[9px] font-mono text-[#BC13FE] uppercase tracking-widest">[ ACTIVE_LEARNING_JOURNEY ]</span>
              
              <div className="relative pl-6 border-l border-[#BC13FE]/20 text-left space-y-6">
                {ACADEMIC_MILESTONES.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Glowing coordinate point */}
                    <div className="absolute -left-[30px] top-1.5 w-4 h-4 bg-[#050505] border-2 border-[#BC13FE] rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping" />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block tracking-wider">
                        {item.year} - {item.beacon}
                      </span>
                      <h5 className="font-extrabold text-[#BC13FE] text-sm mt-0.5">{item.title}</h5>
                      <p className="text-xs text-slate-400 leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
}
