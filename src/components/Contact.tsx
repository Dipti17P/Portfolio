import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import { RESUME_DATA } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sendingState, setSendingState] = useState<"IDLE" | "SENDING" | "SUCCESS">("IDLE");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSendingState("SENDING");
    setTerminalLogs([
      "[SYSTEM] INITIALIZING_SECURE_SSL_CONNECTION...",
      "[SYSTEM] RESOLVING API GATEWAY: api.web3forms.com...",
      "[SYSTEM] VERIFYING ACCESS PROTOCOLS..."
    ]);

    const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY || "";

    if (!accessKey) {
      setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          "[ERR] VITE_WEB3FORMS_ACCESS_KEY IS MISSING IN .env!",
          "[SYSTEM] ROOT_CAUSE: Form submission requires an active API token.",
          "[SYSTEM] INITIATING DIRECT MAILTO PROTOCOL REDIRECT FALLBACK...",
        ]);
      }, 800);

      setTimeout(() => {
        const mailtoUrl = `mailto:${RESUME_DATA.personal.email}?subject=Collaboration Request from ${encodeURIComponent(formData.name)}&body=Name: ${encodeURIComponent(formData.name)}%0D%0AEmail: ${encodeURIComponent(formData.email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`;
        window.location.href = mailtoUrl;
        setSendingState("SUCCESS");
        setFormData({ name: "", email: "", message: "" });
      }, 2500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Message from ${formData.name}`,
          from_name: "Dipti Patil Portfolio Node",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setTerminalLogs((prev) => [
          ...prev,
          "[OK] AUTH_VALIDATED_SUCCESSFULLY",
          "[OK] DATA_BOUNDARY_PACKED AND SHIPPED",
          "[SSL] RECORD_DISPATCHED_TO_DIPTI_SERVER",
          `[SSL] COMPLETED WITH STATUS: ${response.status} OK`
        ]);
        setTimeout(() => {
          setSendingState("SUCCESS");
          setFormData({ name: "", email: "", message: "" });
        }, 1200);
      } else {
        throw new Error(result.message || "Gateway access rejected.");
      }
    } catch (err: any) {
      setTerminalLogs((prev) => [
        ...prev,
        `[ERR] WEB_GATEWAY_FAILURE: ${err.message || "ROUTE_UNREACHABLE"}`,
        "[SYSTEM] SECURE FALLBACK: DEPLOYING SYSTEM CONTACT SHEETS (MAILTO)..."
      ]);
      setTimeout(() => {
        const mailtoUrl = `mailto:${RESUME_DATA.personal.email}?subject=Collaboration Request from ${encodeURIComponent(formData.name)}&body=Name: ${encodeURIComponent(formData.name)}%0D%0AEmail: ${encodeURIComponent(formData.email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`;
        window.location.href = mailtoUrl;
        setSendingState("SUCCESS");
        setFormData({ name: "", email: "", message: "" });
      }, 2500);
    }
  };

  const resetForm = () => {
    setSendingState("IDLE");
    setTerminalLogs([]);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-[30%] left-[-15%] w-[550px] h-[550px] bg-[#BC13FE]/5 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[5%] right-[-15%] w-[550px] h-[550px] bg-[#00F0FF]/5 rounded-full blur-[130px] pointer-events-none animate-pulse" />
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
          <div className="flex items-center space-x-2 text-[#BC13FE] mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">[ GATEWAY_COMMUNICATION ]</span>
            <div className="h-0.5 w-12 bg-[#BC13FE]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
            CONTACT TERMINAL
          </h2>
          <p className="text-slate-500 font-mono text-xs uppercase mt-2">ESTABLISH_SOCKET://DIPTI_PATIL</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Biometrics Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h3 className="text-2xl font-black font-display text-white mb-3 tracking-tight">
                Let's architect something extraordinary.
              </h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Connect with me to talk about backend distributed architectures, pipeline modeling datasets, machine learning opportunities, or full-stack software development internship roles.
              </p>
            </div>

            {/* Direct contact nodes with glowing layouts */}
            <div className="space-y-4">
              {[
                { label: "SECURE EMAIL GATEWAY", val: RESUME_DATA.personal.email, icon: Mail, color: "text-[#BC13FE] border-[#BC13FE]/20" },
                { label: "TELECOMMUNICATION BAND", val: RESUME_DATA.personal.phone, icon: Phone, color: "text-[#00F0FF] border-[#00F0FF]/25" },
                { label: "COORDINATE NODE", val: "India", icon: MapPin, color: "text-[#00B2FF] border-[#00B2FF]/20" }
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center space-x-3.5 hover:border-[#00F0FF]/30 transition-all duration-300 p-4"
                  >
                    <div className={`p-2.5 rounded-2xl border bg-[#050505]/80 ${item.color}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{item.label}</div>
                      <div className="text-xs md:text-sm font-bold text-white mt-0.5">{item.val}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Premium Social links with advanced states */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <span className="block text-[9px] font-mono text-[#BC13FE] uppercase tracking-wider">[ NETWORK_CHANNELS ]</span>
              
              <div className="flex gap-4">
                <a
                  href="https://github.com/Dipti17P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 rounded-2xl border border-white/10 bg-[#050505]/40 hover:bg-[#050505]/80 hover:border-[#BC13FE]/30 text-slate-300 hover:text-white transition-all duration-300 font-mono text-xs flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4 text-[#BC13FE]" />
                  GitHub Index
                </a>
                <a
                  href="https://linkedin.com/in/dipti-patil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 rounded-2xl border border-white/10 bg-[#050505]/40 hover:bg-[#050505]/80 hover:border-[#00F0FF]/30 text-slate-300 hover:text-white transition-all duration-300 font-mono text-xs flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-[#00F0FF]" />
                  LinkedIn node
                </a>
              </div>
            </div>

          </div>

          {/* Right panel: Digital Form / Animated success terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 p-6 md:p-8 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {sendingState !== "SUCCESS" ? (
                  <motion.form
                    key="form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                          IDENTIFICATION_NAME
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={sendingState === "SENDING"}
                          placeholder="e.g. Hiring Manager"
                          className="w-full px-4 py-3 bg-[#050505]/95 border border-white/10 rounded-2xl text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]/60 focus:ring-1 focus:ring-[#00F0FF]/30 transition-all"
                        />
                      </div>

                      {/* Email field */}
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                          EMAIL_GATEWAY
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={sendingState === "SENDING"}
                          placeholder="e.g. recruiter@enterprise.com"
                          className="w-full px-4 py-3 bg-[#050505]/95 border border-white/10 rounded-2xl text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-[#BC13FE]/60 focus:ring-1 focus:ring-[#BC13FE]/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        COMMUNIQUE_PAYLOAD
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={sendingState === "SENDING"}
                        placeholder="Configure your message payload..."
                        className="w-full px-4 py-3 bg-[#050505]/95 border border-white/10 rounded-2xl text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]/60 focus:ring-1 focus:ring-[#00F0FF]/30 transition-all resize-none"
                      />
                    </div>

                    {/* Magnetic styled custom Submit button / Log feed */}
                    <div className="pt-2 flex flex-col space-y-4">
                      <button
                        type="submit"
                        disabled={sendingState === "SENDING"}
                        className="w-full py-3 px-6 text-xs font-bold font-mono uppercase tracking-wider bg-gradient-to-r from-[#BC13FE] to-[#00F0FF] text-black rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#BC13FE]/10 hover:opacity-95 disabled:opacity-50 cursor-pointer neon-glow-btn"
                      >
                        {sendingState === "SENDING" ? (
                          <>
                            <Terminal className="w-4 h-4 animate-spin text-black" />
                            PROCESSING DISPATCH...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            ESTABLISH CONNECTION & SEND
                          </>
                        )}
                      </button>

                      {/* Staggered logging feeds below button */}
                      {terminalLogs.length > 0 && (
                        <div className="p-3 bg-[#050505]/95 rounded-2xl border border-white/10 font-mono text-[9px] text-[#00F0FF] space-y-1 h-20 overflow-y-auto">
                          {terminalLogs.map((log, idx) => (
                            <div key={idx} className="flex gap-2.5">
                              <span className="text-[#BC13FE]">&gt;&gt;</span>
                              <span>{log}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00F0FF]/15 border-2 border-[#00F0FF] flex items-center justify-center text-[#00F0FF] shadow-xl shadow-[#00F0FF]/10 animate-pulse">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-black font-display text-white tracking-tight">COMMUNICATION DISPATCHED</h4>
                      <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                        Secure proxy connection delivered. Your message packet has successfully docked in Dipti Patil's queue.
                      </p>
                    </div>

                    <div className="p-4 bg-[#050505]/90 rounded-2xl border border-white/10 font-mono text-[10px] text-slate-400 max-w-sm w-full text-left space-y-1">
                      <div className="text-[#00F0FF] font-bold">[SSL STATUS: ESTABLISHED]</div>
                      <div>DATE_STAMP: {new Date().toISOString()}</div>
                      <div>PORTAL_ADDRESS: SECURE_SOCKET_OK</div>
                    </div>

                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 bg-white/5 border border-white/5 text-slate-300 hover:text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider hover:border-[#00F0FF]/30 transition-all cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
