"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
    delay: 0
  },
  {
    title: "Backend",
    skills: ["Go", "Node.js", "Python", "PostgreSQL", "SQLite"],
    delay: 100
  },
  {
    title: "AI/ML",
    skills: ["PyTorch", "TensorFlow", "LangChain", "HuggingFace"],
    delay: 200
  },
  {
    title: "Cloud",
    skills: ["AWS", "Docker", "Kubernetes", "Git"],
    delay: 300
  },
  {
    title: "Languages",
    skills: ["Python", "C++", "C#", "JavaScript", "Kotlin", "Java"],
    delay: 400
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = true;

  return (
    <section className="py-[100px] px-5 md:px-0" style={{ background: "rgba(255,255,255,0.02)" }} ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Selected tools and frameworks used to build high-performance distributed systems.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: category.delay / 1000 }}
              className="reveal"
            >
              <h4 className="text-primary text-[10px] font-semibold uppercase tracking-widest mb-6">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 glass-panel rounded-full text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
