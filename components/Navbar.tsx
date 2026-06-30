"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 30);
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
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
      >
        <div
          className={`flex items-center gap-2 transition-all duration-500 ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 py-2.5 rounded-2xl"
              : "bg-transparent px-4 py-2.5"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-lg font-bold flex items-center gap-0.5 group mr-2"
          >
            <span className="gradient-text group-hover:scale-105 transition-transform">DB</span>
            <span className="text-white/40 text-xs font-body font-normal ml-0.5">.dev</span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3.5 py-2 text-sm font-medium text-white/60 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 transition-all duration-300 hover:scale-105"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun size={16} className="text-[#00ffc2]" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon size={16} className="text-white/60" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}

            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:inline-flex items-center gap-2 text-black text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,194,0.4)]"
              style={{ background: "linear-gradient(135deg, #00ffc2, #00d4a3)" }}
            >
              Hire Me
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={18} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={18} className="text-white/70" />
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
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0a0a0a] border-l border-white/8 lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/8">
                <span className="font-display text-base font-bold gradient-text">Navigation</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <X size={18} className="text-white/70" />
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
                    className="w-full text-left text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 py-3 px-4 rounded-xl"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="pt-4">
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="w-full text-black px-6 py-3 rounded-xl font-semibold text-center text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,194,0.3)]"
                    style={{ background: "linear-gradient(135deg, #00ffc2, #00d4a3)" }}
                  >
                    Hire Me
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
