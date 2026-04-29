"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 0,
    label: "Welcome",
    content: (
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-4xl sm:text-6xl shadow-2xl animate-glow"
        >
          💻
        </motion.div>
        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-black text-white mb-3 sm:mb-4">
          David Briggs
        </h1>
        <p className="text-brand-400 text-base sm:text-xl md:text-2xl font-light tracking-wide">
          Software Developer · Builder · Problem Solver
        </p>
        <p className="text-stone-400 mt-3 sm:mt-4 text-sm sm:text-lg">
          From Abonnema to the World
        </p>
      </div>
    ),
  },
  {
    id: 1,
    label: "Philosophy",
    content: (
      <div className="text-center max-w-lg sm:max-w-2xl mx-auto">
        <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">✨</div>
        <blockquote className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
          &quot;The simplicity of something is in the complexity of another.&quot;
        </blockquote>
        <p className="text-stone-400 text-sm sm:text-lg">
          -- David Briggs, builder of elegant solutions
        </p>
      </div>
    ),
  },
  {
    id: 2,
    label: "Origin",
    content: (
      <div className="text-center max-w-sm sm:max-w-xl mx-auto">
        <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">🌊</div>
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
          A boy from the Niger Delta
        </h2>
        <p className="text-stone-300 text-sm sm:text-lg leading-relaxed">
          Born and raised in <span className="text-brand-400 font-semibold">Abonnema, Rivers State</span>,
          David is currently studying at the <span className="text-brand-400 font-semibold">University of Port Harcourt</span>. He
          turned his passion for technology into tools that solve real African problems --
          from transport safety to offline education.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    label: "Explore",
    content: (
      <div className="text-center">
        <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">🚀</div>
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
          Ready to explore?
        </h2>
        <p className="text-stone-400 text-sm sm:text-lg mb-6 sm:mb-10">
          Dive into projects, skills, and stories built with purpose.
        </p>
      </div>
    ),
  },
];

export default function Onboarding() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem("portfolio-onboarded");
    if (!seen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent((c) => c + 1);
    }
  };

  const finish = () => {
    localStorage.setItem("portfolio-onboarded", "true");
    setVisible(false);
    document.body.style.overflow = "";
  };

  const isLast = current === slides.length - 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0705] px-4"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-brand-500/15 blur-[100px] sm:blur-[150px]" />
          </div>

          <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-8 flex flex-col items-center min-h-[300px] sm:min-h-[400px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full"
              >
                {slides[current].content}

                {isLast && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mt-6 sm:mt-8"
                  >
                    <button
                      onClick={finish}
                      className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]"
                    >
                      Explore My Work →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 sm:w-8 bg-brand-500"
                      : "w-2 bg-stone-600 hover:bg-stone-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {!isLast && (
              <button
                onClick={next}
                className="text-stone-400 hover:text-brand-400 transition-colors font-medium text-sm sm:text-base"
              >
                Next →
              </button>
            )}
          </div>

          <button
            onClick={finish}
            className="absolute top-4 sm:top-6 right-4 sm:right-8 text-stone-500 hover:text-stone-300 transition-colors text-xs sm:text-sm"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
