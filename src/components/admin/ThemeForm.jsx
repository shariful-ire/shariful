"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { themeFormSchema, TOKEN_KEYS } from "@/lib/validation/theme.schema";
import { createTheme } from "@/lib/api/theme";

const MIDNIGHT_INDIGO_DEFAULTS = {
  name: "",
  radius: 10,
  light: {
    primary: "#4F46E5",
    secondary: "#64748B",
    accent: "#06B6D4",
    base100: "#F8FAFC",
    base200: "#FFFFFF",
    base300: "#E2E8F0",
    heading: "#0F172A",
    body: "#334155",
    muted: "#64748B",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
  dark: {
    primary: "#6366F1",
    secondary: "#94A3B8",
    accent: "#22D3EE",
    base100: "#0B1120",
    base200: "#1E293B",
    base300: "#334155",
    heading: "#F1F5F9",
    body: "#CBD5E1",
    muted: "#94A3B8",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
};

function TokenRow({ label, name, register }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="label-text text-sm">{label}</span>
      <input type="color" className="w-12 h-8 rounded" {...register(name)} />
    </label>
  );
}

export function ThemeForm({ onCreated }) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(themeFormSchema),
    defaultValues: MIDNIGHT_INDIGO_DEFAULTS,
  });

  async function onSubmit(values) {
    setServerError("");
    try {
      const theme = await createTheme({
        ...values,
        fonts: { body: "Inter", heading: "Inter", mono: "JetBrains Mono" },
      });
      onCreated?.(theme);
    } catch (err) {
      setServerError(err.message || "Could not create theme");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label className="form-control max-w-xs">
        <span className="label-text">Theme name</span>
        <input className="input input-bordered" {...register("name")} />
        {errors.name ? (
          <span className="text-error text-sm">{errors.name.message}</span>
        ) : null}
      </label>

      <label className="form-control max-w-xs">
        <span className="label-text">Radius (px)</span>
        <input type="number" className="input input-bordered" {...register("radius")} />
      </label>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Light</h3>
          <div className="flex flex-col gap-2">
            {TOKEN_KEYS.map((key) => (
              <TokenRow key={key} label={key} name={`light.${key}`} register={register} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Dark</h3>
          <div className="flex flex-col gap-2">
            {TOKEN_KEYS.map((key) => (
              <TokenRow key={key} label={key} name={`dark.${key}`} register={register} />
            ))}
          </div>
        </div>
      </div>

      {serverError ? <p className="text-error text-sm">{serverError}</p> : null}

      <button type="submit" className="btn btn-primary self-start" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create theme"}
      </button>
    </form>
  );
}
