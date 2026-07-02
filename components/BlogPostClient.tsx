"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/mdx";

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="font-display text-2xl sm:text-4xl font-bold text-foreground mt-10 sm:mt-12 mb-4 sm:mb-6 leading-tight" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="font-display text-xl sm:text-2xl font-bold text-foreground mt-8 sm:mt-10 mb-3 sm:mb-4 border-l-4 border-primary pl-3 sm:pl-4" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="font-display text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-2 sm:mb-3" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-[1.05rem]" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 ml-3 sm:ml-4" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="text-muted-foreground text-sm sm:text-base flex gap-2 before:content-['→'] before:text-primary before:font-bold before:flex-shrink-0" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="text-foreground font-bold" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="text-primary not-italic font-medium" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote {...props} className="border-l-4 border-primary pl-4 sm:pl-6 my-6 sm:my-8 text-muted-foreground italic text-base sm:text-lg" />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} className="bg-muted text-primary px-1.5 sm:px-2 py-0.5 rounded-md text-xs sm:text-sm font-mono" />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="bg-foreground text-muted p-4 sm:p-6 rounded-2xl overflow-x-auto mb-6 sm:mb-8 text-xs sm:text-sm font-mono border border-border" />
  ),
  hr: () => (
    <hr className="border-border my-8 sm:my-12" />
  ),
};

export default function BlogPostClient({ post }: { post: Post }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 px-4 sm:px-6 py-24 sm:py-32">
      <div className="fixed top-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-primary/6 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> All Posts
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">{tag}</span>
          ))}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
          {post.title}
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-5 text-muted-foreground text-sm mb-10 pb-10 border-b border-border">
          <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(post.date).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
          <span className="flex items-center gap-1.5">David Briggs</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="prose-custom">
          <MDXRemote source={post.content} components={mdxComponents} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-16 bg-card border border-primary/20 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
          <p className="text-muted-foreground mb-2 text-sm">Enjoyed this?</p>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Let&apos;s build something together.</h3>
          <Link href="/#contact" className="btn-primary text-sm">
            Get In Touch →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
