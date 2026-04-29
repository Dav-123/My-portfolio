"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import type { PostMeta } from "@/lib/mdx";

export default function BlogPreviewClient({ posts }: { posts: PostMeta[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-4">
              Latest Thinking
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-stone-900 dark:text-white">
              From the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-500 font-semibold hover:gap-3 transition-all group"
          >
            Read all posts
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
