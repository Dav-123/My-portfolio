"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-24 px-5 sm:px-8 overflow-hidden"
      id="home"
    >
      {/* Calm static background: dot grid + soft radial wash */}
      <div className="absolute inset-0 -z-10 dot-grid opacity-60" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 20%, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-background))" }}
      />

      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 mb-8 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for new projects
          </div>

          <h1
            className="font-display text-[34px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-bold text-foreground leading-[1.05] tracking-tight mb-6 text-balance"
            style={{ letterSpacing: "-0.035em" }}
          >
            Building the Future of{" "}
            <span className="text-gradient-primary">Offline-First</span> Technology.
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 text-pretty">
            I&apos;m David Briggs, a Full Stack Engineer, AI Engineer, Mobile Developer, and Startup Founder creating software that works everywhere—even without the internet.
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <button onClick={scrollToProjects} className="btn-primary">
              View My Work
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              Contact Me
            </button>
          </div>

          {/* Social links */}
          <div className="flex gap-5 items-center justify-center lg:justify-start mt-10">
            <a
              href="https://github.com/dav-123"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/david-briggs-bb5b4a379"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>

        {/* Right content - Profile image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div
            className="absolute -inset-4 -z-10 rounded-[2rem] blur-2xl opacity-50"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--color-primary) 22%, transparent), transparent 70%)",
            }}
          />
          <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="David Briggs - Software Developer from Abonnema, Nigeria"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
