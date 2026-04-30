"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";

interface BlogCardProps {
  post: PostMeta;
  index: number;
  inView: boolean;
}

export default function BlogCard({ post, index, inView }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-7 h-full border border-stone-200 dark:border-stone-800 hover:border-brand-500/30 cursor-pointer transition-all duration-300 shadow-sm card-lift">
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 font-medium">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display text-base sm:text-xl font-bold text-stone-900 dark:text-white mb-3 group-hover:text-brand-500 transition-colors leading-tight">
            {post.title}
          </h3>

          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4 text-stone-400 text-xs">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {new Date(post.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>
            <span className="text-brand-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
