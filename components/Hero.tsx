"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Github, Linkedin, Instagram, Facebook, ArrowDown } from "lucide-react";

function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 48;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      ctx.strokeStyle = "rgba(0, 255, 194, 0.06)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * spacing, 0);
        ctx.lineTo(x * spacing, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < rows; y++) {
        const yPos = (y * spacing + offset) % canvas.height;
        ctx.globalAlpha = 1 - yPos / canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvas.width, yPos);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      offset = (offset + 0.3) % spacing;
      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-4 overflow-hidden">
      {/* Dark bg */}
      <div className="absolute inset-0 bg-[#090909]" />

      {/* Animated grid canvas */}
      <div className="absolute inset-0 -z-10">
        <GridCanvas />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="orb-teal"
          style={{ top: "10%", left: "-10%", animationDelay: "0s" }}
        />
        <div
          className="orb-blue"
          style={{ bottom: "10%", right: "-8%", animationDelay: "2s" }}
        />
        <div
          className="orb-teal"
          style={{ top: "50%", right: "20%", width: "300px", height: "300px", opacity: 0.5, animationDelay: "4s" }}
        />
      </div>

      {/* Vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#090909]/80 pointer-events-none" />

      <div className="container mx-auto max-w-6xl w-full flex flex-col items-center text-center relative z-10">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 80 }}
          className="flex justify-center mb-8 sm:mb-10"
        >
          <div className="relative">
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full scale-110 blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(0,255,194,0.2) 0%, transparent 70%)" }}
            />
            {/* Animated border ring */}
            <div
              className="absolute -inset-1 rounded-full animate-spin"
              style={{
                background: "conic-gradient(from 0deg, #00ffc2, transparent, #3b82f6, transparent, #00ffc2)",
                animationDuration: "6s",
                opacity: 0.5,
              }}
            />

            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-2 border-[#00ffc2]/20 animate-float shadow-2xl">
              <Image
                src="/profile.jpg"
                alt="David Briggs - Software Developer from Abonnema, Nigeria"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 240px"
              />
            </div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 sm:-bottom-3 -left-4 sm:-left-8 glass-card px-3 sm:px-4 py-2 sm:py-2.5"
              style={{ borderRadius: "12px" }}
            >
              <p className="text-white/40 text-[10px] sm:text-xs">Based in</p>
              <p className="font-semibold text-xs sm:text-sm text-white">Port Harcourt, NG</p>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-2 sm:-top-3 -right-4 sm:-right-8 glass-card px-3 sm:px-4 py-2 sm:py-2.5"
              style={{ borderRadius: "12px" }}
            >
              <p className="text-white/40 text-[10px] sm:text-xs">Languages</p>
              <p className="font-semibold text-xs sm:text-sm gradient-text">12+ mastered</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium mb-6"
          style={{
            background: "rgba(0, 255, 194, 0.06)",
            borderColor: "rgba(0, 255, 194, 0.2)",
            color: "#00ffc2",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00ffc2] animate-pulse" />
          Available for projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] max-w-4xl"
        >
          Building digital
          <br />
          solutions that{" "}
          <span className="gradient-text">simplify</span>
          <br />
          complexity.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/50 text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
        >
          Full-stack developer from{" "}
          <strong className="text-white/80">Abonnema, Rivers State</strong> —
          crafting elegant code and impactful products that solve real African problems.
          Uniport undergraduate. Builder. Problem solver.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <button onClick={scrollToProjects} className="btn-primary group">
            View My Projects
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </button>
          <button onClick={scrollToContact} className="btn-secondary">
            Let&apos;s Talk
          </button>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center gap-3 sm:gap-4"
        >
          <span className="text-white/30 text-xs sm:text-sm">Find me on</span>
          {[
            { icon: Github, href: "https://github.com/dav-123", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/david-briggs-bb5b4a379", label: "LinkedIn" },
            { icon: Instagram, href: "https://www.instagram.com/davidbriggs001?igsh=MXN1cG13ZGY4dDc0ZA==", label: "Instagram" },
            { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100089440026395", label: "Facebook" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-xl border border-white/8 bg-white/4 hover:border-[#00ffc2]/40 hover:bg-[#00ffc2]/8 hover:text-[#00ffc2] text-white/50 transition-all duration-300 hover:scale-110"
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs"
      >
        <span>Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
