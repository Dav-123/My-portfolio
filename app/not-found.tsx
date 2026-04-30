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
        <h1 className="font-display text-[6rem] sm:text-[8rem] md:text-[12rem] font-bold leading-none gradient-text">
          404
        </h1>
        <p className="text-lg sm:text-2xl font-display text-stone-600 dark:text-stone-400 mb-4">
          This page doesn&apos;t exist yet.
        </p>
        <p className="text-stone-500 text-sm sm:text-base mb-10 max-w-md">
          But give David enough time -- he&apos;ll probably build it.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          &larr; Back to Portfolio
        </Link>
      </motion.div>
    </div>
  );
}
