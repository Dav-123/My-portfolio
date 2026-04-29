"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Facebook, Heart, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Sponsor", href: "#sponsorship" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
          <div>
            <div className="font-display text-xl sm:text-2xl font-black mb-3">
              <span className="gradient-text">David Briggs</span>
            </div>
            <p className="text-stone-500 dark:text-stone-500 text-sm leading-relaxed max-w-xs">
              Building digital solutions that simplify complexity. From Abonnema, Rivers State, Nigeria -- to the world.
            </p>
            <blockquote className="mt-4 border-l-2 border-brand-500 pl-4 text-stone-400 text-xs italic">
              &quot;The simplicity of something is in the complexity of another.&quot;
            </blockquote>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 dark:text-white mb-4 text-sm tracking-wide">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-stone-500 dark:text-stone-500 hover:text-brand-500 text-sm transition-colors py-0.5"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 dark:text-white mb-4 text-sm tracking-wide">
              Connect
            </h4>
            <div className="flex gap-3 mb-5">
              {[
                { icon: Github, href: "https://github.com/dav-123", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/david-briggs-bb5b4a379", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/davidbriggs001?igsh=MXN1cG13ZGY4dDc0ZA==", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100089440026395", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-500/10 hover:text-brand-500 transition-all hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-stone-400 text-sm">
              davidbriggd478@gmail.com
            </p>
            <p className="text-stone-400 text-sm mt-1">
              Port Harcourt, Rivers State, Nigeria
            </p>
          </div>
        </div>

        <div className="border-t border-stone-200 dark:border-stone-800 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-400 dark:text-stone-600 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} David Briggs. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-stone-400 dark:text-stone-600 text-xs sm:text-sm flex items-center gap-1">
              Built with <Heart size={14} className="text-brand-500 fill-brand-500" /> in Nigeria
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 rounded-full glass hover:bg-brand-500/10 hover:text-brand-500 transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
