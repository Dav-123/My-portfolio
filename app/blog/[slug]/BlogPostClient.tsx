"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/mdx";

// Custom MDX components for beautiful rendering
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="font-display text-4xl font-black text-stone-900 dark:text-white mt-12 mb-6 leading-tight"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="font-display text-2xl font-bold text-stone-900 dark:text-white mt-10 mb-4 border-l-4 border-brand-500 pl-4"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="font-display text-xl font-bold text-stone-900 dark:text-white mt-8 mb-3"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6 text-[1.05rem]"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="space-y-2 mb-6 ml-4" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className="text-stone-600 dark:text-stone-400 flex gap-2 before:content-['→'] before:text-brand-500 before:font-bold before:flex-shrink-0"
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="text-stone-900 dark:text-white font-bold" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="text-brand-500 not-italic font-medium" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      {...props}
      className="border-l-4 border-brand-500 pl-6 my-8 text-stone-500 dark:text-stone-400 italic text-lg"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="bg-stone-100 dark:bg-stone-900 text-brand-500 px-2 py-0.5 rounded-md text-sm font-mono"
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="bg-stone-900 dark:bg-stone-950 text-stone-300 p-6 rounded-2xl overflow-x-auto mb-8 text-sm font-mono border border-stone-800"
    />
  ),
  hr: () => (
    <hr className="border-stone-200 dark:border-stone-800 my-12" />
  ),
};

export default function BlogPostClient({ post }: { post: Post }) {
  return (
    <main className="min-h-screen bg-surface-light dark:bg-surface-dark px-6 py-28">
      <div className="fixed top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-500/6 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-500 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> All Posts
          </Link>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display text-4xl md:text-5xl font-black text-stone-900 dark:text-white leading-tight mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-5 text-stone-400 text-sm mb-10 pb-10 border-b border-stone-200 dark:border-stone-800"
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            ✍️ David Briggs
          </span>
        </motion.div>

        {/* MDX Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="prose-custom"
        >
          <MDXRemote source={post.content} components={mdxComponents} />
        </motion.div>

        {/* CTA at bottom of post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass rounded-3xl p-8 text-center border border-brand-500/20"
        >
          <p className="text-stone-500 dark:text-stone-400 mb-2 text-sm">Enjoyed this?</p>
          <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mb-4">
            Let's build something together.
          </h3>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
          >
            Get In Touch →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
