"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectionBaseSchema } from "@/lib/validation/section.schema";
import { createSection, updateSection } from "@/lib/api/sections";
import { HeroFields } from "./sections/HeroFields";
import { AboutFields } from "./sections/AboutFields";
import { SkillsFields } from "./sections/SkillsFields";
import { ProjectsFields } from "./sections/ProjectsFields";
import { ContactFields } from "./sections/ContactFields";

const CONTENT_FIELDS = {
  hero: HeroFields,
  about: AboutFields,
  skills: SkillsFields,
  projects: ProjectsFields,
  contact: ContactFields,
};

const DEFAULT_CONTENT = {
  hero: { headline: "", subheadline: "", ctaLabel: "", ctaHref: "", imageUrl: "" },
  about: { heading: "", body: "", imageUrl: "" },
  skills: { heading: "Skills", items: [] },
  projects: { heading: "Projects", items: [] },
  contact: { heading: "Contact", email: "", phone: "", socials: [] },
};

/** Splits "react, node, mongodb" into ["react","node","mongodb"], dropping empties. */
function splitTags(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function normalizeContentForSubmit(type, content) {
  if (type === "projects") {
    return {
      ...content,
      items: (content.items || []).map((item) => ({
        ...item,
        tags: splitTags(item.tags),
      })),
    };
  }
  if (type === "skills") {
    return {
      ...content,
      items: (content.items || []).map((item) => ({
        ...item,
        level: item.level === "" || item.level == null ? undefined : Number(item.level),
      })),
    };
  }
  return content;
}

/**
 * @param {{ mode: "create"|"edit", section?: any }} props
 */
const DEFAULT_OVERRIDE = { primary: "#4F46E5", secondary: "#64748B", accent: "#06B6D4" };

export function SectionForm({ mode, section }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [overrideEnabled, setOverrideEnabled] = useState(
    Boolean(section?.themeOverride)
  );
  const isEdit = mode === "edit";

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // .passthrough() so `content` (validated separately, per-type) survives
    // zod's default "strip unknown keys" behavior and reaches onSubmit.
    resolver: zodResolver(sectionBaseSchema.passthrough()),
    defaultValues: isEdit
      ? {
          type: section.type,
          slug: section.slug,
          order: section.order,
          isVisible: section.isVisible,
          isEnabled: section.isEnabled,
          isPublished: section.isPublished,
          content: section.content,
          themeOverride: section.themeOverride || DEFAULT_OVERRIDE,
        }
      : {
          type: "hero",
          slug: "",
          order: 0,
          isVisible: true,
          isEnabled: true,
          isPublished: false,
          content: DEFAULT_CONTENT.hero,
          themeOverride: DEFAULT_OVERRIDE,
        },
  });

  const type = watch("type");
  const ContentFields = CONTENT_FIELDS[type] || HeroFields;

  async function onSubmit(values) {
    setServerError("");
    const payload = {
      ...values,
      content: normalizeContentForSubmit(values.type, values.content || {}),
      themeOverride: overrideEnabled ? values.themeOverride : null,
    };

    try {
      if (isEdit) {
        await updateSection(section._id, payload);
      } else {
        await createSection(payload);
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setServerError(err.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <label className="form-control">
          <span className="label-text">Type</span>
          <select
            className="select select-bordered"
            disabled={isEdit}
            {...register("type")}
          >
            {Object.keys(CONTENT_FIELDS).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <span className="label-text">Slug</span>
          <input className="input input-bordered" {...register("slug")} />
          {errors.slug ? (
            <span className="text-error text-sm">{errors.slug.message}</span>
          ) : null}
        </label>
      </div>

      <div className="flex gap-6">
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Visible</span>
          <input type="checkbox" className="toggle toggle-primary" {...register("isVisible")} />
        </label>
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Enabled</span>
          <input type="checkbox" className="toggle toggle-primary" {...register("isEnabled")} />
        </label>
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Published</span>
          <input type="checkbox" className="toggle toggle-success" {...register("isPublished")} />
        </label>
      </div>

      <div className="divider">Content</div>
      <ContentFields register={register} control={control} />

      <div className="divider">Theme override</div>
      <label className="label cursor-pointer gap-2 self-start">
        <span className="label-text">Override theme colors for this section</span>
        <input
          type="checkbox"
          className="toggle toggle-accent"
          checked={overrideEnabled}
          onChange={(e) => setOverrideEnabled(e.target.checked)}
        />
      </label>
      {overrideEnabled ? (
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <span className="label-text text-sm">Primary</span>
            <input type="color" className="w-10 h-8 rounded" {...register("themeOverride.primary")} />
          </label>
          <label className="flex items-center gap-2">
            <span className="label-text text-sm">Secondary</span>
            <input type="color" className="w-10 h-8 rounded" {...register("themeOverride.secondary")} />
          </label>
          <label className="flex items-center gap-2">
            <span className="label-text text-sm">Accent</span>
            <input type="color" className="w-10 h-8 rounded" {...register("themeOverride.accent")} />
          </label>
        </div>
      ) : null}

      {serverError ? <p className="text-error text-sm">{serverError}</p> : null}

      <div className="flex gap-3">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save section"}
        </button>
        <a href="/dashboard" className="btn btn-ghost">
          Cancel
        </a>
      </div>
    </form>
  );
}
