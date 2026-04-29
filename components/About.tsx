"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-brand-500 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Origin Story
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-white mb-6 sm:mb-8 leading-tight">
            A boy from the creeks who learned to build the internet.
          </h2>

          <div className="space-y-4 sm:space-y-5 text-stone-600 dark:text-stone-400 leading-relaxed text-[0.95rem] sm:text-[1.05rem]">
            <p>
              David Briggs grew up in <strong className="text-stone-800 dark:text-stone-200">Abonnema</strong>,
              a town in Akuku-Toru Local Government Area of Rivers State -- right in the heart of
              Nigeria&apos;s Niger Delta. Far from Silicon Valley, but full of real problems waiting for
              real solutions.
            </p>
            <p>
              He is currently studying at the <strong className="text-stone-800 dark:text-stone-200">University of Port Harcourt</strong>,
              where late nights with a low end device and an unstable internet connection became the training ground
              for what he does today. He didn&apos;t just learn to code -- he learned to build things that work
              <em> in spite of</em> broken infrastructure.
            </p>
            <p>
              Today, David builds full-stack applications, mobile apps, AI-powered platforms, and
              social impact tools -- all with the same mindset he developed in Abonnema:
              <strong className="text-brand-500"> &quot;The simplicity of something is in the complexity of another.&quot;</strong>
            </p>
            <p>
              His mission? To prove that world-class technology can be -- and should be --
              built from Africa, for Africa, and for the world.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {traits.map((trait, i) => {
            const Icon = trait.icon;
            return (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                className="glass-card p-5 sm:p-6 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-brand-500/20 transition-colors">
                  <Icon size={20} className="text-brand-500" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 dark:text-white mb-1.5 sm:mb-2">
                  {trait.title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm leading-relaxed">
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
