"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Instagram, Facebook, ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 text-brand-500 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            Available for projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-stone-900 dark:text-white mb-6"
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
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-stone-500 dark:text-stone-400 text-lg max-w-lg leading-relaxed mb-10"
          >
            Full-stack developer from <strong className="text-stone-700 dark:text-stone-300">Abonnema, Rivers State</strong> — 
            crafting elegant code and impactful products that solve real African problems. 
            Uniport undergraduate. Builder. Problem solver.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
            >
              View My Projects
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 border border-stone-300 dark:border-stone-700 hover:border-brand-500 text-stone-700 dark:text-stone-300 hover:text-brand-500 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Let's Talk
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-4"
          >
            <span className="text-stone-400 text-sm">Find me on</span>
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
                className="p-2.5 rounded-full glass hover:bg-brand-500/10 hover:text-brand-500 transition-all hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 blur-xl opacity-30 scale-110 animate-pulse" />

            {/* Profile image container */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-brand-500/30 animate-float shadow-2xl">
              <Image
                src="/profile.jpg"
                alt="David Briggs - Software Developer from Abonnema, Nigeria"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 288px, 384px"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 to-transparent" />
            </div>

            {/* Floating badge — location */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-8 glass rounded-2xl px-4 py-3 shadow-xl border border-white/10"
            >
              <p className="text-xs text-stone-500 dark:text-stone-400">Based in</p>
              <p className="font-semibold text-sm text-stone-800 dark:text-white">🇳🇬 Port Harcourt, NG</p>
            </motion.div>

            {/* Floating badge — languages */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-8 glass rounded-2xl px-4 py-3 shadow-xl border border-white/10"
            >
              <p className="text-xs text-stone-500 dark:text-stone-400">Languages</p>
              <p className="font-semibold text-sm gradient-text">12+ mastered</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 text-xs"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
