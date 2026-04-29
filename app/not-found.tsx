"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-light dark:bg-surface-dark text-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-[6rem] sm:text-[8rem] md:text-[12rem] font-black leading-none gradient-text">
          404
        </h1>
        <p className="text-lg sm:text-2xl font-display text-stone-600 dark:text-stone-400 mb-3 sm:mb-4">
          This page doesn&apos;t exist yet.
        </p>
        <p className="text-stone-500 text-sm sm:text-base mb-8 sm:mb-10 max-w-md">
          But give David enough time -- he&apos;ll probably build it.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-105"
        >
          &larr; Back to Portfolio
        </Link>
      </motion.div>
    </div>
  );
}
