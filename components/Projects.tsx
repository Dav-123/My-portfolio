"use client";
import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Zap, Filter, Shield, BookOpen, MessageCircle, Palette, Gamepad2 } from "lucide-react";
import type { Project } from "@/types";

const projects: Project[] = [
  {
    id: "vora",
    title: "Vora",
    description: "AI-powered transport safety platform curbing one-chance vehicle kidnappings across Nigeria.",
    longDescription:
      "Vora is a flagship social impact project born from a real incident. The platform enables passengers to verify commercial vehicles before boarding via QR code scans, tracks rides in real-time, and alerts emergency contacts if something goes wrong. Includes a React Native passenger app, Node.js backend, and Next.js web portals for drivers and government agencies. Designed for a Rivers State pilot with plans to scale nationally through FRSC, Nigeria Police Force, and the Federal Ministry of Transportation.",
    tech: ["React Native", "Node.js", "Next.js", "Express", "PostgreSQL", "AI/ML"],
    image: "/projects/vora.png",
    status: "ongoing",
    featured: true,
    badge: "Flagship Social Impact",
  },
  {
    id: "docvault",
    title: "DocVault",
    description: "Offline-first educational PWA with AI tutoring, PDF readers, and spaced repetition flashcards.",
    longDescription:
      "DocVault is an offline-first educational platform targeting students in Nigeria and emerging markets. Built with Next.js 14 and FastAPI, it features a multi-provider AI failover system (Groq, Gemini, Together AI), a Grok-style streaming chat UI, PDF/EPUB readers, SM-2 spaced repetition flashcards, quiz generation, and document libraries spanning 30+ educational sources including JAMB, WAEC, and NECO past questions.",
    tech: ["Next.js", "FastAPI", "Python", "AI/ML", "PostgreSQL"],
    image: "/projects/docvault.png",
    status: "ongoing",
    featured: true,
  },
  {
    id: "bchat",
    title: "B-Chat",
    description: "Bluetooth mesh messaging app for Android -- WhatsApp without internet.",
    longDescription:
      "B-Chat is an offline-first Bluetooth mesh messaging Android app built in React Native. Features end-to-end encrypted P2P messaging, status updates, voice notes, file sharing, and an offline TensorFlow Lite AI assistant. Includes a full games module with Chess, Tic-Tac-Toe, and Ludo with tournament infrastructure.",
    tech: ["React Native", "SQLite", "AI/ML", "Node.js"],
    image: "/projects/bchat.png",
    status: "ongoing",
    featured: true,
  },
  {
    id: "primetime-comics",
    title: "Primetime Comics",
    description: "Digital comics platform celebrating African storytelling and characters.",
    longDescription:
      "Primetime Comics is a creative platform showcasing African comic characters and stories. A passion project blending David's love for storytelling with his technical skills.",
    tech: ["React", "Next.js", "TypeScript"],
    image: "/projects/primetime.png",
    status: "live",
  },
  {
    id: "game-buddy",
    title: "Game Buddy Matcher",
    description: "Match with nearby gamers for real-time multiplayer sessions.",
    longDescription:
      "Game Buddy Matcher helps gamers find nearby players using location-based matching. Features real-time chat, game session scheduling, player ratings, and a social feed.",
    tech: ["React Native", "Node.js", "PostgreSQL"],
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

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tech.includes(activeFilter));
  }, [activeFilter]);

  const featuredProject = filtered.find((p) => p.id === "vora");
  const gridProjects = filtered.filter((p) => p.id !== "vora");

  return (
    <section className="py-20 px-4 bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            What I&apos;ve Built
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
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
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground border border-border hover:border-primary/50"
            >
              <Filter size={14} />
              Filter by tech
              {activeFilter !== "All" && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFilter}
                </span>
              )}
            </button>
            {activeFilter !== "All" && (
              <button
                onClick={() => setActiveFilter("All")}
                className="text-xs text-primary font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <div className={`flex-wrap gap-2 justify-center ${showFilters ? "flex" : "hidden md:flex"}`}>
            {ALL_TECHS.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => {
                  setActiveFilter(tech);
                  setShowFilters(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeFilter === tech
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                    : "bg-card text-muted-foreground border border-border hover:text-primary hover:border-primary/50"
                }`}
              >
                {tech}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {activeFilter !== "All" && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-center text-muted-foreground text-sm mt-4"
              >
                Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""} using{" "}
                <span className="text-primary font-semibold">{activeFilter}</span>
                {" · "}
                <button
                  onClick={() => setActiveFilter("All")}
                  className="text-muted-foreground hover:text-primary underline transition-colors"
                >
                  show all
                </button>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
                <Filter size={28} className="text-stone-400" />
              </div>
              <p className="text-muted-foreground text-lg">
                No projects using <span className="text-primary">{activeFilter}</span> yet.
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                View all projects
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {featuredProject && (() => {
                const iconData = projectIcons[featuredProject.id];
                const Icon = iconData?.icon || Shield;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 rounded-2xl bg-card overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-500 cursor-pointer group shadow-sm"
                    onClick={() => setSelected(featuredProject)}
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="p-8 sm:p-10 flex flex-col justify-center">
                        {featuredProject.badge && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 w-fit mb-5">
                            <Zap size={10} />
                            {featuredProject.badge}
                          </span>
                        )}
                        <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                          {featuredProject.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {featuredProject.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featuredProject.tech.map((t) => (
                            <button
                              key={t}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveFilter(t);
                              }}
                              className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border w-fit ${statusColors[featuredProject.status]}`}>
                          ● {featuredProject.status.charAt(0).toUpperCase() + featuredProject.status.slice(1)}
                        </span>
                      </div>
                      <div className={`h-64 md:h-auto bg-gradient-to-br ${iconData?.bg || "from-stone-800 to-stone-900"} flex items-center justify-center`}>
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Icon size={48} className={`sm:text-[56px] ${iconData?.color || "text-white"}`} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {gridProjects.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {gridProjects.map((project, i) => {
                      const iconData = projectIcons[project.id];
                      const Icon = iconData?.icon || Shield;
                      return (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          whileHover={{ y: -6 }}
                          className="rounded-2xl bg-card overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer group shadow-sm"
                          onClick={() => setSelected(project)}
                        >
                          <div className={`h-48 bg-gradient-to-br ${iconData?.bg || "from-stone-800 to-stone-900"} flex items-center justify-center`}>
                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                              <Icon size={32} className={iconData?.color || "text-white"} strokeWidth={1.5} />
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[project.status]}`}>
                                ● {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </span>
                            </div>
                            <h3 className="font-display text-xl font-bold text-foreground mb-2">
                              {project.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.slice(0, 4).map((t) => (
                                <button
                                  key={t}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveFilter(t);
                                  }}
                                  className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                                >
                                  {t}
                                </button>
                              ))}
                              {project.tech.length > 4 && (
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                                  +{project.tech.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="rounded-2xl bg-card max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-border p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconData?.bg || "from-stone-800 to-stone-900"} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={24} className={iconData?.color || "text-white"} strokeWidth={1.5} />
                    </div>
                    <div>
                      {selected.badge && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-1">
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
                    className="p-2 rounded-xl hover:bg-secondary transition-colors ml-4 flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selected.longDescription}
                </p>

                <div className="mb-3">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest mb-3 font-semibold">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelected(null);
                          setActiveFilter(t);
                          document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs mt-2">
                    Click a tag to see other projects using that technology
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {selected.githubUrl && (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
