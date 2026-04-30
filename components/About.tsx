"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code2, Lightbulb, Globe, Heart } from "lucide-react";

const traits = [
  {
    icon: Code2,
    title: "12+ Languages",
    desc: "Fluent across the stack -- from C++ to React Native, from Python to TypeScript.",
  },
  {
    icon: Lightbulb,
    title: "Problem-First Thinker",
    desc: "Every project starts with a real problem. Code is just the tool; impact is the goal.",
  },
  {
    icon: Globe,
    title: "African by Design",
    desc: "Building for Nigeria's infrastructure realities: offline-first, lightweight, accessible.",
  },
  {
    icon: Heart,
    title: "Community-Driven",
    desc: "From transport safety apps to Bluetooth mesh networks -- tech for the people around him.",
  },
];

const paragraphs = [
  "David Briggs grew up in Abonnema, a town in Akuku-Toru Local Government Area of Rivers State -- right in the heart of Nigeria's Niger Delta. Far from Silicon Valley, but full of real problems waiting for real solutions.",
  "He is currently studying at the University of Port Harcourt, where late nights with a low end device and an unstable internet connection became the training ground for what he does today. He didn't just learn to code -- he learned to build things that work in spite of broken infrastructure.",
  "The simplicity of something is in the complexity of another.",
  "Today, David builds full-stack applications, mobile apps, AI-powered platforms, and social impact tools -- all with the same mindset he developed in Abonnema.",
  "His mission? To prove that world-class technology can be -- and should be -- built from Africa, for Africa, and for the world.",
];

function useMultiTypewriter(texts: string[], speed: number = 30, start: boolean = true) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    setDisplayed([]);
    setCurrentIdx(0);
    setAllDone(false);

    let idx = 0;
    let charIdx = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (idx >= texts.length) {
        setAllDone(true);
        return;
      }

      charIdx++;
      const partial = texts[idx].slice(0, charIdx);

      setDisplayed((prev) => {
        const next = [...prev];
        next[idx] = partial;
        return next;
      });

      if (charIdx >= texts[idx].length) {
        idx++;
        charIdx = 0;
        setCurrentIdx(idx);
      }

      setTimeout(tick, speed);
    };

    setTimeout(tick, speed);

    return () => {
      cancelled = true;
    };
  }, [start, speed]);

  return { displayed, currentIdx, allDone };
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { displayed, currentIdx, allDone } = useMultiTypewriter(paragraphs, 25, inView);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-brand-500 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-4">
            Origin Story
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-8 leading-tight">
            A boy from the creeks who learned to build the internet.
          </h2>

          <div className="space-y-5 text-stone-600 dark:text-stone-400 leading-relaxed text-[0.95rem] sm:text-[1.05rem]">
            <p>
              {displayed[0] || ""}
              <span className="typewriter-cursor" style={{ opacity: currentIdx === 0 && !allDone ? 1 : 0 }} />
            </p>
            <p>
              {displayed[1] || ""}
              <span className="typewriter-cursor" style={{ opacity: currentIdx === 1 && !allDone ? 1 : 0 }} />
            </p>

            <div className="my-8 py-6 px-6 sm:px-8 rounded-2xl bg-brand-500/5 border border-brand-500/20">
              <p className="text-stone-800 dark:text-stone-200 font-display text-lg sm:text-xl font-semibold leading-relaxed">
                &quot;{displayed[2] || ""}
                <span className="typewriter-cursor" style={{ opacity: currentIdx === 2 && !allDone ? 1 : 0 }} />
              </p>
              {displayed[2]?.length === paragraphs[2].length && (
                <p className="text-stone-400 text-xs sm:text-sm mt-3 font-medium">
                  -- David Briggs
                </p>
              )}
            </div>

            <p>
              {displayed[3] || ""}
              <span className="typewriter-cursor" style={{ opacity: currentIdx === 3 && !allDone ? 1 : 0 }} />
            </p>
            <p>
              {displayed[4] || ""}
              <span className="typewriter-cursor" style={{ opacity: currentIdx === 4 && !allDone ? 1 : 0 }} />
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {traits.map((trait, i) => {
            const Icon = trait.icon;
            return (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                className="glass-card p-6 sm:p-7 group card-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors duration-300">
                  <Icon size={22} className="text-brand-500" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 dark:text-white mb-2">
                  {trait.title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  {trait.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
