"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiPython, SiCplusplus, SiSharp, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiNodedotjs, SiHtml5, SiCss,
  SiKotlin, SiGit, SiTailwindcss, SiSqlite, SiPostgresql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776ab" },
      { name: "C++", icon: SiCplusplus, color: "#00599c" },
      { name: "C#", icon: SiSharp, color: "#239120" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "Kotlin", icon: SiKotlin, color: "#7f52ff" },
      { name: "Java", icon: FaJava, color: "#ed8b00" },
      { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", icon: SiCss, color: "#1572b6" },
    ],
  },
  {
    category: "Frameworks & Tools",
    skills: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "React Native", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
      { name: "SQLite", icon: SiSqlite, color: "#003b57" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Git", icon: SiGit, color: "#f05032" },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-stone-50/50 dark:bg-stone-950/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-brand-500 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Technical Arsenal
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-white mb-3 sm:mb-4">
            Languages & Technologies
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto text-sm sm:text-base">
            Over 12 programming languages and a full-stack toolkit built through years of real project work.
          </p>
        </motion.div>

        {skillCategories.map((cat, ci) => (
          <div key={cat.category} className="mb-10 sm:mb-14">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="text-stone-500 dark:text-stone-500 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 sm:mb-6"
            >
              {cat.category}
            </motion.h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 sm:gap-4">
              {cat.skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.04 + ci * 0.15 + 0.2 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 glass-card cursor-default group"
                  >
                    <Icon
                      size={28}
                      style={{ color: skill.color }}
                      className="drop-shadow-sm group-hover:scale-110 transition-transform sm:text-[32px]"
                    />
                    <span className="text-[10px] sm:text-xs font-medium text-stone-600 dark:text-stone-400 text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
