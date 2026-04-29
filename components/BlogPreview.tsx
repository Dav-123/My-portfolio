import { getAllPosts } from "@/lib/mdx";
import BlogPreviewClient from "./BlogPreviewClient";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 2);

  if (posts.length === 0) return null;

  return <BlogPreviewClient posts={posts} />;
}
