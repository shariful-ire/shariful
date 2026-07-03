"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth/client";
import {
  getComments,
  postComment,
  deleteComment,
  getLikeStatus,
  toggleLike,
} from "@/lib/api/blog";

export function CommentsAndLikes({ slug, initialLikeCount }) {
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => getComments(slug),
  });

  const { data: likeStatus } = useQuery({
    queryKey: ["like", slug],
    queryFn: () => getLikeStatus(slug),
    initialData: { liked: false, likeCount: initialLikeCount },
  });

  const likeMutation = useMutation({
    mutationFn: () => toggleLike(slug),
    onSuccess: (data) => queryClient.setQueryData(["like", slug], data),
  });

  const commentMutation = useMutation({
    mutationFn: (body) => postComment(slug, body),
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments", slug] }),
  });

  return (
    <div className="mt-12 border-t border-base-300 pt-8">
      <button
        type="button"
        className={`btn btn-sm ${likeStatus.liked ? "btn-primary" : "btn-outline"}`}
        disabled={!user || likeMutation.isPending}
        onClick={() => likeMutation.mutate()}
      >
        {likeStatus.liked ? "♥ Liked" : "♡ Like"} ({likeStatus.likeCount})
      </button>
      {!user ? (
        <span className="text-sm ml-2" style={{ color: "var(--po-muted)" }}>
          <a href="/login" className="link">
            Sign in
          </a>{" "}
          to like
        </span>
      ) : null}

      <h2 className="text-xl font-bold mt-8 mb-4">
        Comments ({comments.length})
      </h2>

      {user ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (commentText.trim()) commentMutation.mutate(commentText.trim());
          }}
          className="flex flex-col gap-2 mb-6"
        >
          <textarea
            className="textarea textarea-bordered"
            rows={3}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm self-start"
            disabled={commentMutation.isPending}
          >
            {commentMutation.isPending ? "Posting..." : "Post comment"}
          </button>
        </form>
      ) : (
        <p className="text-sm mb-6" style={{ color: "var(--po-muted)" }}>
          <a href="/login" className="link">
            Sign in
          </a>{" "}
          to leave a comment.
        </p>
      )}

      <ul className="flex flex-col gap-4">
        {comments.map((comment) => {
          const canDelete =
            user && (user.id === comment.author?._id || user.role === "admin" || user.role === "editor");
          return (
            <li key={comment._id} className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">
                    {comment.author?.name || "Unknown"}
                  </p>
                  {canDelete ? (
                    <button
                      type="button"
                      className="btn btn-xs btn-ghost text-error"
                      onClick={() => deleteMutation.mutate(comment._id)}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
                <p style={{ color: "var(--po-body)" }}>{comment.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
