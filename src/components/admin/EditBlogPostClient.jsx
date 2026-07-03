"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api/blog";
import { BlogPostForm } from "./BlogPostForm";

/**
 * Fetches the admin's own post list (browser fetch, so the session cookie
 * is attached and drafts are visible) and finds the one being edited —
 * avoids needing a dedicated get-by-id endpoint or server-side cookie
 * forwarding just for this one page.
 */
export function EditBlogPostClient({ id }) {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: () => getPosts(),
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading...</p>;

  const post = posts.find((p) => p._id === id);
  if (!post) return <p className="text-error">Post not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit post — {post.title}</h1>
      <BlogPostForm mode="edit" post={post} />
    </div>
  );
}
