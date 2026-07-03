import { z } from "zod";

/** Mirrors the backend's theme schema — client-side safety net for the theme editor form. */
const hexColor = z
  .string()
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "must be a hex color");

const tokenSetSchema = z.object({
  primary: hexColor,
  secondary: hexColor,
  accent: hexColor,
  base100: hexColor,
  base200: hexColor,
  base300: hexColor,
  heading: hexColor,
  body: hexColor,
  muted: hexColor,
  success: hexColor,
  warning: hexColor,
  error: hexColor,
  info: hexColor,
});

export const themeFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(60),
  radius: z.coerce.number().min(0).max(32).default(10),
  light: tokenSetSchema,
  dark: tokenSetSchema,
});

export const TOKEN_KEYS = [
  "primary",
  "secondary",
  "accent",
  "base100",
  "base200",
  "base300",
  "heading",
  "body",
  "muted",
  "success",
  "warning",
  "error",
  "info",
];
