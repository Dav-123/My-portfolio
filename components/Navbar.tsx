"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", isActive: true },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    if (href.startsWith("/")) {
      router.push(href);
      setMobileOpen(false);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center px-4 w-[90%] max-w-[1200px]"
      >
        <div
          className={`w-full flex items-center justify-between transition-all duration-500 glass-panel shadow-2xl backdrop-blur-xl px-6 md:px-8 py-4 rounded-full ${
            scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.6)]" : ""
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-base md:text-lg font-semibold text-foreground tracking-tight"
          >
            David Briggs
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                  link.isActive
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Social links - visible on all sizes */}
            <a
              href="https://github.com/dav-123"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/david-briggs-bb5b4a379"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
            >
              <Linkedin size={18} />
            </a>

            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:inline-flex items-center gap-2 text-black text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #00ffc2, #00d4a3)" }}
            >
              Let&apos;s Talk
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={18} className="text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={18} className="text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-card border-l border-border lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-display text-base font-bold text-foreground">Navigation</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <X size={18} className="text-muted-foreground" />
                </button>
              </div>
              <div className="p-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollTo(link.href)}
                    className={`w-full text-left text-sm font-medium transition-all duration-200 py-3 px-4 rounded-xl ${
                      link.isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                
                {/* Social links in mobile drawer */}
                <div className="flex gap-4 pt-4 px-4 border-t border-border mt-4">
                  <a
                    href="https://github.com/dav-123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/david-briggs-bb5b4a379"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="w-full text-black px-6 py-3 rounded-xl font-semibold text-center text-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #00ffc2, #00d4a3)" }}
                  >
                    Let&apos;s Talk
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
