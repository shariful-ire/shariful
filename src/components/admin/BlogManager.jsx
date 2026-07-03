"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, deletePost } from "@/lib/api/blog";

export function BlogManager() {
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: () => getPosts(),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-posts"] }),
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading posts...</p>;

  if (!posts.length) {
    return <p style={{ color: "var(--po-muted)" }}>No posts yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {posts.map((post) => (
        <li key={post._id} className="card bg-base-200">
          <div className="card-body flex-row items-center justify-between py-3">
            <div>
              <p className="font-semibold">{post.title}</p>
              <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                {post.status}
              </p>
            </div>
            <div className="flex gap-2">
              <a href={`/dashboard/blog/${post._id}/edit`} className="btn btn-sm btn-ghost">
                Edit
              </a>
              <button
                type="button"
                className="btn btn-sm btn-error btn-outline"
                onClick={() => {
                  if (confirm(`Delete "${post.title}"?`)) {
                    deleteMutation.mutate(post._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
