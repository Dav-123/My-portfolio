import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog | David Briggs",
  description:
    "Thoughts on software development, building for Africa, social impact tech, and lessons from real projects.",
  openGraph: {
    title: "Blog | David Briggs",
    description: "Thoughts on software, Africa, and building things that matter.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListClient posts={posts} />;
}
