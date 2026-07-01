"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Shield, BookOpen, MessageCircle, Palette, Gamepad2, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

const projects: Project[] = [
  {
    id: "vora",
    title: "Vora",
    description: "AI-powered transport safety platform curbing one-chance vehicle kidnappings across Nigeria.",
    longDescription:
      "Vora is a flagship social impact project born from a real incident. The platform enables passengers to verify commercial vehicles before boarding via QR code scans, tracks rides in real-time, and alerts emergency contacts if something goes wrong.",
    tech: ["React Native", "Node.js", "Next.js", "AI/ML"],
    image: "/projects/vora.png",
    status: "ongoing",
    featured: true,
    badge: "Flagship",
  },
  {
    id: "docvault",
    title: "DocVault",
    description: "Offline-first educational PWA with AI tutoring, PDF readers, and spaced repetition flashcards.",
    longDescription:
      "DocVault is an offline-first educational platform targeting students in Nigeria and emerging markets with AI-powered tutoring and document management.",
    tech: ["Next.js", "FastAPI", "AI/ML"],
    image: "/projects/docvault.png",
    status: "ongoing",
    featured: true,
  },
  {
    id: "bchat",
    title: "B-Chat",
    description: "Bluetooth mesh messaging app for Android -- WhatsApp without internet.",
    longDescription:
      "B-Chat is an offline-first Bluetooth mesh messaging Android app with end-to-end encrypted P2P messaging, voice notes, and file sharing.",
    tech: ["React Native", "SQLite", "AI/ML"],
    image: "/projects/bchat.png",
    status: "ongoing",
    featured: true,
  },
  {
    id: "primetime-comics",
    title: "Primetime Comics",
    description: "Digital comics platform celebrating African storytelling and characters.",
    longDescription:
      "A creative platform showcasing African comic characters and stories.",
    tech: ["React", "Next.js"],
    image: "/projects/primetime.png",
    status: "live",
  },
  {
    id: "game-buddy",
    title: "Game Buddy Matcher",
    description: "Match with nearby gamers for real-time multiplayer sessions.",
    longDescription:
      "Find nearby players using location-based matching with real-time chat and tournament infrastructure.",
    tech: ["React Native", "Node.js"],
    image: "/projects/gamebuddy.png",
    status: "live",
  },
];

const ALL_TECHS = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tech))).sort()];

const statusLabel: Record<string, string> = {
  live: "Live",
  ongoing: "In Progress",
  upcoming: "Upcoming",
};

const statusDot: Record<string, string> = {
  live: "bg-emerald-400",
  ongoing: "bg-amber-400",
  upcoming: "bg-blue-400",
};

const projectIcons: Record<string, React.ElementType> = {
  vora: Shield,
  docvault: BookOpen,
  bchat: MessageCircle,
  "primetime-comics": Palette,
  "game-buddy": Gamepad2,
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className="py-24 sm:py-28 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight text-balance">
            Projects that solve real problems
          </h2>
          <p className="text-muted-foreground text-pretty">
            Real products solving real problems -- from Bluetooth mesh networks to government-grade safety platforms.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {ALL_TECHS.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 border ${
                activeFilter === tech
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const Icon = projectIcons[project.id] || Shield;
              return (
                <motion.button
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelected(project)}
                  className="group text-left rounded-2xl bg-card border border-border hover:border-foreground/25 transition-colors duration-300 overflow-hidden card-lift"
                >
                  {/* Visual header */}
                  <div className="relative h-44 border-b border-border bg-secondary/40 dot-grid flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background:
                          "radial-gradient(70% 60% at 50% 0%, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent 70%)",
                      }}
                    />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <Icon size={30} className="text-foreground" strokeWidth={1.5} />
                    </div>
                    {project.badge && (
                      <span className="absolute top-4 left-4 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/25">
                        {project.badge}
                      </span>
                    )}
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground bg-card/80 backdrop-blur px-2.5 py-1 rounded-full border border-border">
                      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} />
                      {statusLabel[project.status]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-secondary text-muted-foreground border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Project detail modal */}
        <AnimatePresence>
          {selected && (() => {
            const Icon = projectIcons[selected.id] || Shield;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
                onClick={() => setSelected(null)}
              >
                <motion.div
                  initial={{ scale: 0.97, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.97, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-card border border-border max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl border border-border bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon size={26} className="text-foreground" strokeWidth={1.5} />
                      </div>
                      <div>
                        {selected.badge && (
                          <span className="inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/25 mb-2">
                            {selected.badge}
                          </span>
                        )}
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                          {selected.title}
                        </h2>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      aria-label="Close"
                      className="p-2.5 rounded-xl hover:bg-secondary transition-colors ml-4 flex-shrink-0"
                    >
                      <X size={20} className="text-muted-foreground" />
                    </button>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
                    {selected.longDescription}
                  </p>

                  <div className="mb-2">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-4 font-semibold">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1.5 rounded-md bg-secondary text-muted-foreground border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(selected.liveUrl || selected.githubUrl) && (
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      {selected.liveUrl && (
                        <a
                          href={selected.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm flex-1"
                        >
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                      {selected.githubUrl && (
                        <a
                          href={selected.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm flex-1"
                        >
                          <Github size={16} /> View Code
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
