"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, ArrowDown } from "lucide-react";

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
      const spacing = 60;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      ctx.strokeStyle = "rgba(0, 255, 194, 0.04)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * spacing, 0);
        ctx.lineTo(x * spacing, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < rows; y++) {
        const yPos = (y * spacing + offset) % canvas.height;
        ctx.globalAlpha = 0.3 - (yPos / canvas.height) * 0.3;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvas.width, yPos);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      offset = (offset + 0.2) % spacing;
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
      style={{ opacity: 0.5 }}
    />
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-5 md:px-0 overflow-hidden" id="home">
      {/* Dark bg */}
      <div className="absolute inset-0 bg-[#090909]" />

      {/* Animated grid canvas */}
      <div className="absolute inset-0 -z-10">
        <GridCanvas />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0, 112, 243, 0.15) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0, 255, 194, 0.1) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left content - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-bold text-foreground leading-[1.1] tracking-tight mb-8"
            style={{ letterSpacing: "-0.04em" }}
          >
            Building the Future of{" "}
            <span className="text-primary">Offline-First</span>{" "}
            Technology.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0"
          >
            I&apos;m David Briggs, a Full Stack Engineer, AI Engineer, Mobile Developer, and Startup Founder creating software that works everywhere—even without the internet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 sm:px-10 py-4 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105"
            >
              View My Work
            </button>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 border border-border-subtle text-foreground px-8 sm:px-10 py-4 rounded-full font-medium text-sm transition-all duration-300 hover:bg-white/5"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-6 items-center justify-center lg:justify-start mt-10"
          >
            <a
              href="https://github.com/dav-123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/david-briggs-bb5b4a379"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right content - Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative mt-12 lg:mt-0 reveal active"
        >
          {/* Floating ambient glows */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
            style={{ background: "rgba(0, 112, 243, 0.15)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
            style={{ background: "rgba(0, 255, 194, 0.1)" }}
          />

          <div
            className="glass-panel p-4 rounded-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700"
            style={{ transform: "rotate(2deg)" }}
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="David Briggs - Software Developer from Abonnema, Nigeria"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs"
      >
        <span className="uppercase tracking-widest text-[10px]">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
