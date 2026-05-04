"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import {
  SiPython, SiCplusplus, SiSharp, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiNodedotjs, SiHtml5, SiCss,
  SiKotlin, SiGit, SiTailwindcss, SiSqlite, SiPostgresql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const allSkills = [
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "C++", icon: SiCplusplus, color: "#00599c" },
  { name: "C#", icon: SiSharp, color: "#239120" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Kotlin", icon: SiKotlin, color: "#7f52ff" },
  { name: "Java", icon: FaJava, color: "#ed8b00" },
  { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS3", icon: SiCss, color: "#1572b6" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "React Native", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "SQLite", icon: SiSqlite, color: "#003b57" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Git", icon: SiGit, color: "#f05032" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [revealedSkills, setRevealedSkills] = useState<Set<number>>(new Set());

  const advanceSkill = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % allSkills.length;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!inView || !isPlaying) return;
    const timer = setInterval(advanceSkill, 1200);
    return () => clearInterval(timer);
  }, [inView, isPlaying, advanceSkill]);

  useEffect(() => {
    if (inView && !revealedSkills.has(currentIndex)) {
      setRevealedSkills((prev) => new Set(prev).add(currentIndex));
    }
  }, [currentIndex, inView, revealedSkills]);

  const current = allSkills[currentIndex];
  const Icon = current.icon;

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  return (
    <section className="py-20 px-4 bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-primary font-semibold text-xs sm:text-sm tracking-widest uppercase mb-4">
            Technical Arsenal
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Languages & Technologies
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Over 12 programming languages and a full-stack toolkit built through years of real project work.
          </p>
        </motion.div>

        {/* Central showcase area */}
        <div className="flex flex-col items-center mb-16 sm:mb-20">
          {/* Large current icon display */}
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 flex items-center justify-center mb-8">
            {/* Background glow ring */}
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${current.color}15 0%, transparent 70%)`,
              }}
            />
            <motion.div
              key={currentIndex + "-ring"}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-4 rounded-full border-2 border-stone-200/50 dark:border-stone-700/50"
            />

            {/* Icon */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center gap-4"
              >
                <Icon
                  size={72}
                  style={{ color: current.color }}
                  className="sm:text-[88px] md:text-[104px] drop-shadow-lg"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Skill name */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name + "-label"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {current.name}
              </h3>
              <p className="text-stone-400 text-sm">
                {currentIndex + 1} of {allSkills.length}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => goTo((currentIndex - 1 + allSkills.length) % allSkills.length)}
              className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-200 hover:scale-105"
              aria-label="Previous skill"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-primary transition-all duration-200 hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={() => goTo((currentIndex + 1) % allSkills.length)}
              className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-200 hover:scale-105"
              aria-label="Next skill"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Revealed skills grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-stone-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 text-center">
            Revealed Skills
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-3 sm:gap-4">
            {allSkills.map((skill, i) => {
              const SkillIcon = skill.icon;
              const isRevealed = revealedSkills.has(i);
              const isCurrent = i === currentIndex;
              return (
                <motion.button
                  key={skill.name}
                  onClick={() => goTo(i)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isRevealed
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0.3, scale: 0.85 }
                  }
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-primary/10 border-2 border-primary/40 shadow-lg shadow-primary/10"
                      : isRevealed
                      ? "bg-white/60 dark:bg-stone-800/40 border border-stone-200/50 dark:border-stone-700/50 hover:border-primary/30"
                      : "bg-stone-100/30 dark:bg-stone-900/30 border border-stone-200/20 dark:border-stone-800/20"
                  }`}
                >
                  <SkillIcon
                    size={24}
                    style={{ color: isRevealed ? skill.color : undefined }}
                    className={`sm:text-[28px] transition-all duration-300 ${
                      isRevealed ? "opacity-100" : "opacity-20 grayscale"
                    }`}
                  />
                  <span
                    className={`text-[10px] sm:text-xs font-medium text-center leading-tight transition-colors duration-300 ${
                      isRevealed
                        ? "text-stone-700 dark:text-stone-300"
                        : "text-stone-300 dark:text-stone-700"
                    }`}
                  >
                    {isRevealed ? skill.name : "???"}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
