import type { Metadata } from "next";
import { getAllPosts, getAllSettings } from "@/lib/db";
import Nav from "@/components/Nav";
import BlogClientPage from "@/components/BlogClientPage";
import BlogFooter from "@/components/BlogFooter";

export const metadata: Metadata = {
  title: "Blog | talpur.ai",
  description:
    "Insights on AI strategy, automation, and what's actually working in the real world.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const settings = getAllSettings();

  return (
    <>
      <Nav settings={settings} />
      <BlogClientPage posts={posts} />
      <BlogFooter />
    </>
  );
}
