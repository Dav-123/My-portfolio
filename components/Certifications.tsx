"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Award } from "lucide-react";

const certs = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    issuer: "Sololearn",
    date: "2025",
    credentialId: "66789js",
    verifyUrl: "#",
    emoji: "🤖",
    gradient: "from-violet-500/20 to-purple-600/20",
    border: "border-violet-500/30",
    tag: "AI / ML",
    tagColor: "text-violet-400 bg-violet-500/10",
  },
  {
    id: "python",
    title: "Python Programming Certification",
    issuer: "Programming Hero",
    date: "2025",
    credentialId: "4457if",
    verifyUrl: "#",
    emoji: "🐍",
    gradient: "from-blue-500/20 to-cyan-600/20",
    border: "border-blue-500/30",
    tag: "Python",
    tagColor: "text-blue-400 bg-blue-500/10",
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-4">
            Verified Credentials
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-stone-900 dark:text-white mb-4">
            Certifications
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            Formal recognition of expertise in AI, machine learning, and Python programming.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative group glass rounded-3xl p-8 border ${cert.border} hover:shadow-2xl transition-all duration-500 overflow-hidden`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-50 rounded-3xl`} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{cert.emoji}</div>
                    <div>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${cert.tagColor} mb-2`}>
                        <Award size={10} />
                        {cert.tag}
                      </span>
                    </div>
                  </div>
                  <span className="text-stone-500 dark:text-stone-500 text-sm font-medium">
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white mb-2 leading-tight">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-1">
                  Issued by
                </p>
                <p className="text-stone-700 dark:text-stone-300 font-medium text-sm mb-4">
                  {cert.issuer}
                </p>

                {/* Credential */}
                {cert.credentialId && (
                  <p className="text-stone-400 dark:text-stone-600 text-xs font-mono mb-5">
                    ID: {cert.credentialId}
                  </p>
                )}

                {/* Verify button */}
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-400 transition-colors group/link"
                >
                  Verify Certificate
                  <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add more certificates hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-stone-400 dark:text-stone-600 text-sm mt-8"
        >
          More certifications in progress — always learning. 📚
        </motion.p>
      </div>
    </section>
  );
}
