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
        <div className="rounded-2xl bg-card p-6 sm:p-7 h-full border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm card-lift">
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20 font-medium">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display text-base sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {new Date(post.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>
            <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
