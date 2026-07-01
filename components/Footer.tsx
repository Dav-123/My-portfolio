"use client";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-20 px-5 border-t border-border bg-secondary">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="font-display text-xl font-semibold text-foreground mb-2">
            David Briggs
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} David Briggs. Designed for technical precision.
          </p>
        </div>
        <div className="flex gap-8 items-center">
          <a
            href="https://github.com/dav-123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/david-briggs-bb5b4a379"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
          >
            LinkedIn
          </a>
          <a
            href="mailto:davidbriggd478@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
