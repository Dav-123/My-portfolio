"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Award } from "lucide-react";
import { SiPython } from "react-icons/si";

function SololearnLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#1AA7C1" />
      <path d="M32 14L44 22V38L32 46L20 38V22L32 14Z" fill="white" />
      <path d="M32 18L41 24V36L32 42L23 36V24L32 18Z" fill="#1AA7C1" />
      <path d="M28 26L32 22L36 26V34L32 38L28 34V26Z" fill="white" />
      <circle cx="32" cy="30" r="3" fill="#1AA7C1" />
    </svg>
  );
}

const certs = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    issuer: "Sololearn",
    date: "2025",
    credentialId: "66789js",
    verifyUrl: "#",
    logoElement: "sololearn" as const,
    gradient: "from-teal-500/20 to-emerald-600/20",
    border: "border-teal-500/30",
    tag: "AI / ML",
    tagColor: "text-teal-400 bg-teal-500/10",
    iconBg: "bg-teal-500/10",
  },
  {
    id: "python",
    title: "Python Programming Certification",
    issuer: "Sololearn",
    date: "2025",
    credentialId: "4457if",
    verifyUrl: "#",
    logoElement: "python" as const,
    gradient: "from-blue-500/20 to-cyan-600/20",
    border: "border-blue-500/30",
    tag: "Python",
    tagColor: "text-blue-400 bg-blue-500/10",
    iconBg: "bg-blue-500/10",
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-primary font-semibold text-xs sm:text-sm tracking-widest uppercase mb-4">
            Verified Credentials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Formal recognition of expertise in AI, machine learning, and Python programming.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative group rounded-2xl bg-card p-6 sm:p-8 border ${cert.border} hover:shadow-xl transition-all duration-500 overflow-hidden card-lift`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-50 rounded-2xl`} />

              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary flex items-center justify-center`}>
                    {cert.logoElement === "python" ? (
                      <SiPython size={36} className="sm:text-[44px] text-[#3776AB]" />
                    ) : (
                      <SololearnLogo size={40} />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${cert.tagColor}`}>
                    <Award size={10} />
                    {cert.tag}
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-xl font-bold text-foreground mb-2 leading-tight">
                  {cert.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-1">
                  Issued by
                </p>
                <p className="text-stone-700 dark:text-stone-300 font-medium text-sm mb-4">
                  {cert.issuer}
                </p>

                {cert.credentialId && (
                  <p className="text-stone-400 dark:text-stone-600 text-xs font-mono mb-5">
                    ID: {cert.credentialId}
                  </p>
                )}

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                >
                  Verify Certificate
                  <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          More certifications in progress -- always learning.
        </motion.p>
      </div>
    </section>
  );
}
