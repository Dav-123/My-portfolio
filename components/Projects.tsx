"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Filter, Shield, BookOpen, MessageCircle, Palette, Gamepad2 } from "lucide-react";
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

const statusColors = {
  live: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  ongoing: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  upcoming: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

const projectIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  vora: { icon: Shield, color: "text-red-400", bg: "from-red-900/30 to-stone-900" },
  docvault: { icon: BookOpen, color: "text-amber-400", bg: "from-amber-900/30 to-stone-900" },
  bchat: { icon: MessageCircle, color: "text-blue-400", bg: "from-blue-900/30 to-stone-900" },
  "primetime-comics": { icon: Palette, color: "text-pink-400", bg: "from-pink-900/30 to-stone-900" },
  "game-buddy": { icon: Gamepad2, color: "text-green-400", bg: "from-green-900/30 to-stone-900" },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className="py-[100px] px-5 md:px-0" style={{ background: "rgba(255,255,255,0.015)" }} ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Selected Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real products solving real problems -- from Bluetooth mesh networks to government-grade safety platforms.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground border border-border"
            >
              <Filter size={14} />
              Filter
              {activeFilter !== "All" && (
                <span className="bg-primary text-black text-xs px-2 py-0.5 rounded-full">
                  {activeFilter}
                </span>
              )}
            </button>
          </div>

          <div className={`flex flex-wrap gap-2 justify-center ${showFilters ? "flex" : "hidden md:flex"}`}>
            {ALL_TECHS.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => {
                  setActiveFilter(tech);
                  setShowFilters(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeFilter === tech
                    ? "bg-primary text-black"
                    : "bg-white/5 text-muted-foreground border border-border-subtle hover:text-foreground"
                }`}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => {
            const iconData = projectIcons[project.id];
            const Icon = iconData?.icon || Shield;
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="reveal rounded-2xl bg-card overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer group hover-lift"
                onClick={() => setSelected(project)}
              >
                <div className={`h-52 bg-gradient-to-br ${iconData?.bg || "from-stone-800 to-stone-900"} flex items-center justify-center relative overflow-hidden`}>
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon size={40} className={iconData?.color || "text-white"} strokeWidth={1.5} />
                  </div>
                  {project.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      {project.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[project.status]}`}>
                      ● {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-border-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ExternalLink size={12} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Project detail modal */}
        <AnimatePresence>
          {selected && (() => {
            const iconData = projectIcons[selected.id];
            const Icon = iconData?.icon || Shield;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
                onClick={() => setSelected(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="rounded-3xl glass-panel max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${iconData?.bg || "from-stone-800 to-stone-900"} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={28} className={iconData?.color || "text-white"} strokeWidth={1.5} />
                      </div>
                      <div>
                        {selected.badge && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/25 mb-2">
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
                      className="p-2.5 rounded-xl hover:bg-white/5 transition-colors ml-4 flex-shrink-0"
                    >
                      <X size={20} className="text-muted-foreground" />
                    </button>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
                    {selected.longDescription}
                  </p>

                  <div className="mb-6">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-4 font-semibold">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-4 py-2 rounded-full bg-white/5 text-muted-foreground border border-border-subtle"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    {selected.liveUrl && (
                      <a
                        href={selected.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm flex-1 justify-center"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {selected.githubUrl && (
                      <a
                        href={selected.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm flex-1 justify-center"
                      >
                        <Github size={16} /> View Code
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
