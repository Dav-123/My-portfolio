"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import type { PostMeta } from "@/lib/mdx";

export default function BlogListClient({ posts }: { posts: PostMeta[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <main className="min-h-screen bg-surface-light dark:bg-surface-dark px-4 sm:px-6 py-20 sm:py-28">
      <div className="fixed top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-brand-500/8 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mb-8 sm:mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-500 transition-colors text-xs sm:text-sm font-medium">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 sm:mb-14">
          <p className="text-brand-500 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">Writing</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 dark:text-white mb-4 sm:mb-5">The Blog</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-lg max-w-xl">Lessons from building real products, thoughts on African tech, and the philosophy behind writing code that actually matters.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          {allTags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTag === tag ? "bg-brand-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "glass text-stone-500 dark:text-stone-400 hover:text-brand-500 hover:border-brand-500/30"
              }`}>
              {tag}
            </button>
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-20 text-stone-400 text-sm sm:text-base">No posts in this category yet. Check back soon!</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
