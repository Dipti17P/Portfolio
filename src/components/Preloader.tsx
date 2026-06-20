import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
  key?: string;
}

const METRICS_STEPS = [
  "SYSTEM_INIT_PHASE_01_OK",
  "CONNECTING_TO_DATABASE_PORT::27017_OK",
  "PARSING_RESUME_BLOB_COMPLETED",
  "ML_PIPELINE_K_MEANS_ONLINE",
  "S_BERT_TRANSFORMERS_DEPLOYED",
  "RESOLVING_DIPTI_PATIL_PORTFOLIO_v2.6"
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Increment percent
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // give it some room
          return 100;
        }
        // Slightly random increments for tech loading feel
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Map percentages to terminal log steps
    const index = Math.min(
      Math.floor((percent / 100) * METRICS_STEPS.length),
      METRICS_STEPS.length - 1
    );
    setStepIndex(index);
  }, [percent]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#E0E0E0] font-mono px-6 select-none"
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#BC13FE] to-[#00F0FF] opacity-65" />

      {/* Futuristic ambient shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#BC13FE]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#00F0FF]/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Animated Bracket Logo */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2 text-2xl font-bold font-display"
          >
            <span className="text-[#BC13FE] font-mono">&lt;</span>
            <span className="text-white tracking-widest font-sans font-extrabold bg-clip-text bg-gradient-to-r from-white via-[#BC13FE] to-[#00F0FF]">
              DIPTI.P
            </span>
            <span className="text-[#00F0FF] font-mono">/&gt;</span>
          </motion.div>
        </div>

        {/* Console loading info */}
        <div className="glassmorphism rounded-lg border border-white/10 p-5 mb-6 text-xs text-slate-400 shadow-xl shadow-black/40 backdrop-blur-md">
          <div className="flex justify-between border-b border-white/5 pb-2 mb-3">
            <span className="text-[10px] uppercase text-[#00F0FF] font-bold tracking-wider">ENVIRONMENT_DIAGNOSTICS</span>
            <span className="text-[10px] text-[#BC13FE] font-bold">CORE v1.9</span>
          </div>
          
          <div className="space-y-1.5 h-16 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="text-[#00F0FF] flex items-center gap-2 font-mono"
              >
                <span className="text-[#BC13FE]">&gt;&gt;</span>
                {METRICS_STEPS[stepIndex]}
              </motion.div>
            </AnimatePresence>
            <div className="text-[10px] text-slate-500 mt-1">
              [SYSTEM OK] - MEMORY_ALLOCATED - RESOLUTION {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '1920x1080'}
            </div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between text-xs">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full bg-white/5 text-[#BC13FE] border border-[#BC13FE]/40">
                BOOT_SEQUENCE
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#00F0FF]">
                {percent}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2.5 text-xs flex rounded-full bg-slate-950 border border-white/10 relative">
            <motion.div
              style={{ width: `${percent}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#BC13FE] to-[#00F0FF] transition-all duration-75 relative rounded-full"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-white animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
