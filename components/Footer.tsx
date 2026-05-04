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
    <footer className="border-t border-border bg-secondary/30 px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 mb-12 sm:mb-16">
          <div>
            <div className="font-display text-xl sm:text-2xl font-bold mb-4">
              <span className="gradient-text">David Briggs</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Building digital solutions that simplify complexity. From Abonnema, Rivers State, Nigeria -- to the world.
            </p>
            <blockquote className="mt-5 border-l-2 border-primary pl-4 text-muted-foreground text-xs italic">
              &quot;The simplicity of something is in the complexity of another.&quot;
            </blockquote>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm tracking-wide">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-muted-foreground hover:text-primary text-sm transition-colors py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm tracking-wide">
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
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              davidbriggd478@gmail.com
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Port Harcourt, Rivers State, Nigeria
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} David Briggs. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-xs sm:text-sm flex items-center gap-1">
              Built with <Heart size={14} className="text-primary fill-primary" /> in Nigeria
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
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
