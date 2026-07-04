"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createCampaign, updateCampaign } from "@/lib/api/campaigns";

/**
 * @param {{ mode: "create"|"edit", campaign?: any }} props
 */
export function CampaignForm({ mode, campaign }) {
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
          title: campaign.title,
          slug: campaign.slug,
          description: campaign.description,
          coverImageUrl: campaign.coverImageUrl,
          goalAmount: (campaign.goalAmount / 100).toFixed(2),
          currency: campaign.currency,
          status: campaign.status,
        }
      : {
          title: "",
          slug: "",
          description: "",
          coverImageUrl: "",
          goalAmount: "100.00",
          currency: "usd",
          status: "draft",
        },
  });

  async function onSubmit(values) {
    setServerError("");
    const payload = {
      ...values,
      goalAmount: Math.round(Number(values.goalAmount) * 100),
    };

    try {
      if (isEdit) {
        await updateCampaign(campaign._id, payload);
      } else {
        await createCampaign(payload);
      }
      router.push("/dashboard/campaigns");
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
        <span className="label-text">Description</span>
        <textarea className="textarea textarea-bordered" rows={4} {...register("description")} />
      </label>

      <label className="form-control">
        <span className="label-text">Cover image URL</span>
        <input className="input input-bordered" {...register("coverImageUrl")} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="form-control">
          <span className="label-text">Goal amount</span>
          <input type="number" step="0.01" className="input input-bordered" {...register("goalAmount")} />
        </label>
        <label className="form-control">
          <span className="label-text">Currency</span>
          <input className="input input-bordered" maxLength={3} {...register("currency")} />
        </label>
      </div>

      <label className="form-control max-w-xs">
        <span className="label-text">Status</span>
        <select className="select select-bordered" {...register("status")}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="closed">Closed</option>
        </select>
      </label>

      {serverError ? <p className="text-error text-sm">{serverError}</p> : null}

      <div className="flex gap-3">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save campaign"}
        </button>
        <a href="/dashboard/campaigns" className="btn btn-ghost">
          Cancel
        </a>
      </div>
    </form>
  );
}
