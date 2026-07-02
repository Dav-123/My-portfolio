"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiPython, SiCplusplus, SiSharp, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiNodedotjs, SiHtml5, SiCss,
  SiKotlin, SiGit, SiTailwindcss, SiSqlite, SiPostgresql,
  SiGo, SiAmazon, SiDocker, SiKubernetes, SiPytorch, SiTensorflow,
  SiLangchain, SiHuggingface
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const allSkills = [
  { name: "Python", icon: SiPython, color: "#3776ab", category: "Languages" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", category: "Languages" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", category: "Languages" },
  { name: "C++", icon: SiCplusplus, color: "#00599c", category: "Languages" },
  { name: "C#", icon: SiSharp, color: "#239120", category: "Languages" },
  { name: "Java", icon: FaJava, color: "#ed8b00", category: "Languages" },
  { name: "Kotlin", icon: SiKotlin, color: "#7f52ff", category: "Languages" },
  { name: "React", icon: SiReact, color: "#61dafb", category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", category: "Frontend" },
  { name: "HTML5", icon: SiHtml5, color: "#e34f26", category: "Frontend" },
  { name: "CSS3", icon: SiCss, color: "#1572b6", category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4", category: "Frontend" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "Backend" },
  { name: "Go", icon: SiGo, color: "#00add8", category: "Backend" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", category: "Backend" },
  { name: "SQLite", icon: SiSqlite, color: "#003b57", category: "Backend" },
  { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c", category: "AI/ML" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00", category: "AI/ML" },
  { name: "LangChain", icon: SiLangchain, color: "#1c3ff3", category: "AI/ML" },
  { name: "Hugging Face", icon: SiHuggingface, color: "#ffd21e", category: "AI/ML" },
  { name: "AWS", icon: SiAmazon, color: "#ff9900", category: "Cloud" },
  { name: "Docker", icon: SiDocker, color: "#2496ed", category: "Cloud" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5", category: "Cloud" },
  { name: "Git", icon: SiGit, color: "#f05032", category: "Cloud" },
];

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allSkills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [mounted, isPlaying]);

  const currentSkill = allSkills[currentIndex];
  const CurrentIcon = currentSkill.icon;

  const goToSkill = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  return (
    <section className="py-[100px] px-5 md:px-0 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Selected tools and frameworks used to build high-performance systems.
          </p>
        </motion.div>

        {/* Featured Skill Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-50"
              style={{ background: `radial-gradient(circle, ${currentSkill.color}30 0%, transparent 70%)` }}
            />
            
            {/* Icon Card */}
            <div className="relative glass-panel rounded-3xl p-10 md:p-14">
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex flex-col items-center"
              >
                <CurrentIcon
                  size={80}
                  style={{ color: currentSkill.color }}
                  className="mb-6 drop-shadow-lg"
                />
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {currentSkill.name}
                </h3>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">
                  {currentSkill.category}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => goToSkill((currentIndex - 1 + allSkills.length) % allSkills.length)}
              className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors"
              aria-label="Previous skill"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors text-primary"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
            <button
              onClick={() => goToSkill((currentIndex + 1) % allSkills.length)}
              className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors"
              aria-label="Next skill"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-6">
            {allSkills.slice(0, 8).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSkill(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to skill ${i + 1}`}
              />
            ))}
            {allSkills.length > 8 && (
              <span className="text-muted-foreground text-xs">+{allSkills.length - 8}</span>
            )}
          </div>
        </motion.div>

        {/* Moving Marquee Skills Grid */}
        <div className="relative">
          {/* Top marquee */}
          <div className="overflow-hidden mb-8">
            <motion.div
              className="flex gap-4"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...allSkills, ...allSkills].map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <button
                    key={`${skill.name}-${i}`}
                    onClick={() => goToSkill(i % allSkills.length)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-300 whitespace-nowrap ${
                      currentIndex === (i % allSkills.length)
                        ? "glass-panel border-primary/50"
                        : "border-border hover:border-border/80 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} style={{ color: skill.color }} />
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom marquee (reverse) */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: [-1000, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...allSkills].reverse().map((skill, i) => {
                const Icon = skill.icon;
                const originalIndex = allSkills.findIndex(s => s.name === skill.name);
                return (
                  <button
                    key={`reverse-${skill.name}-${i}`}
                    onClick={() => goToSkill(originalIndex)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-300 whitespace-nowrap ${
                      currentIndex === originalIndex
                        ? "glass-panel border-primary/50"
                        : "border-border hover:border-border/80 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} style={{ color: skill.color }} />
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Gradient masks */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
