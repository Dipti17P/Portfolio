import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const getThemeColor = (cssVar: string, alpha: number) => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
      if (!hex) return `rgba(188, 19, 254, ${alpha})`;
      let cleanHex = hex.replace("#", "");
      if (cleanHex.length === 3) {
        cleanHex = cleanHex.split("").map((c) => c + c).join("");
      }
      const r = parseInt(cleanHex.substring(0, 2), 16) || 188;
      const g = parseInt(cleanHex.substring(2, 4), 16) || 19;
      const b = parseInt(cleanHex.substring(4, 6), 16) || 254;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const colorVars = ["--neon-purple", "--neon-cyan", "--neon-blue"];

    // Particle details
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      colorVarSelected: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        this.colorVarSelected = colorVars[Math.floor(Math.random() * colorVars.length)];
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        // Mouse interactive push/pull
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const angle = Math.atan2(dy, dx);
          // Gently push away from cursor
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const dynamicColor = getThemeColor(this.colorVarSelected, 0.45);
        c.fillStyle = dynamicColor;
        c.shadowBlur = 8;
        c.shadowColor = dynamicColor;
        c.fill();
        c.shadowBlur = 0; // reset
      }
    }

    const initParticles = (w: number, h: number) => {
      particles = [];
      const count = Math.min(Math.floor((w * h) / 10000), 120); // Responsive count
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles(canvas.width, canvas.height);
    };

    // Initialize dimensions
    handleResize();

    // Resize observer as requested in instructions
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(canvas.width, canvas.height);
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Draw neon connecting webs if close
          if (dist < 110) {
            const alpha = (110 - dist) / 110 * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Interactive color transition based on theme variables
            ctx.strokeStyle = getThemeColor("--neon-purple", alpha);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
