"use client";
import { motion } from "framer-motion";
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
  "He is currently studying at the University of Port Harcourt, where late nights with a low end device and an unstable internet connection became the training ground for what he does today.",
  "The simplicity of something is in the complexity of another.",
  "Today, David builds full-stack applications, mobile apps, AI-powered platforms, and social impact tools -- all with the same mindset he developed in Abonnema.",
  "His mission? To prove that world-class technology can be -- and should be -- built from Africa, for Africa, and for the world.",
];

export default function About() {
  return (
    <section className="py-24 sm:py-28 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-4">
            Origin Story
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight tracking-tight text-balance">
            A boy from the creeks who learned to build the internet.
          </h2>

          <div className="space-y-5 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <p>{paragraphs[0]}</p>
            <p>{paragraphs[1]}</p>

            <div className="my-8 py-6 px-6 sm:px-8 rounded-2xl border border-border bg-secondary/40">
              <p className="text-foreground font-display text-lg sm:text-xl font-semibold leading-relaxed">
                &quot;{paragraphs[2]}&quot;
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-3 font-medium">
                -- David Briggs
              </p>
            </div>

            <p>{paragraphs[3]}</p>
            <p>{paragraphs[4]}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {traits.map((trait, i) => {
            const Icon = trait.icon;
            return (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl border border-border bg-card hover-lift group"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center mb-4 group-hover:border-primary/40 transition-colors duration-300">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-foreground mb-2">
                  {trait.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
