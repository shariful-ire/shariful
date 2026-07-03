"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createPost, updatePost } from "@/lib/api/blog";

/**
 * @param {{ mode: "create"|"edit", post?: any }} props
 */
export function BlogPostForm({ mode, post }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: isEdit
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          coverImageUrl: post.coverImageUrl,
          body: post.body,
          tags: (post.tags || []).join(", "),
          status: post.status,
        }
      : {
          title: "",
          slug: "",
          excerpt: "",
          coverImageUrl: "",
          body: "",
          tags: "",
          status: "draft",
        },
  });

  async function onSubmit(values) {
    setServerError("");
    const payload = {
      ...values,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEdit) {
        await updatePost(post._id, payload);
      } else {
        await createPost(payload);
      }
      router.push("/dashboard/blog");
      router.refresh();
    } catch (err) {
      setServerError(err.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-2xl">
      <label className="form-control">
        <span className="label-text">Title</span>
        <input className="input input-bordered" {...register("title")} />
      </label>

      <label className="form-control">
        <span className="label-text">Slug</span>
        <input className="input input-bordered" {...register("slug")} />
      </label>

      <label className="form-control">
        <span className="label-text">Excerpt</span>
        <input className="input input-bordered" {...register("excerpt")} />
      </label>

      <label className="form-control">
        <span className="label-text">Cover image URL</span>
        <input className="input input-bordered" {...register("coverImageUrl")} />
      </label>

      <label className="form-control">
        <span className="label-text">Body (markdown/plain text)</span>
        <textarea
          className="textarea textarea-bordered"
          rows={12}
          {...register("body")}
        />
      </label>

      <label className="form-control">
        <span className="label-text">Tags (comma-separated)</span>
        <input className="input input-bordered" {...register("tags")} />
      </label>

      <label className="form-control max-w-xs">
        <span className="label-text">Status</span>
        <select className="select select-bordered" {...register("status")}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>

      {serverError ? <p className="text-error text-sm">{serverError}</p> : null}

      <div className="flex gap-3">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save post"}
        </button>
        <a href="/dashboard/blog" className="btn btn-ghost">
          Cancel
        </a>
      </div>
    </form>
  );
}
