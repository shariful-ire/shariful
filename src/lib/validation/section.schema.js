import { z } from "zod";

/**
 * Mirrors the backend's `src/validation/section.schema.js`. Kept as a
 * separate copy since frontend and backend are independent deployments —
 * this is the client-side safety net for admin forms (React Hook Form);
 * the backend re-validates independently before touching the DB.
 */

const heroContentSchema = z.object({
  headline: z.string().min(1, "Headline is required").max(120),
  subheadline: z.string().max(240).optional().default(""),
  ctaLabel: z.string().max(40).optional().default(""),
  ctaHref: z.string().max(300).optional().default(""),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

const aboutContentSchema = z.object({
  heading: z.string().min(1, "Heading is required").max(120),
  body: z.string().min(1, "Body is required"),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

const skillItemSchema = z.object({
  name: z.string().min(1).max(60),
  level: z.coerce.number().min(0).max(100).optional(),
  icon: z.string().max(200).optional(),
});

const skillsContentSchema = z.object({
  heading: z.string().max(120).optional().default("Skills"),
  items: z.array(skillItemSchema).default([]),
});

const projectItemSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(500).optional().default(""),
  imageUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string().max(30)).default([]),
});

const projectsContentSchema = z.object({
  heading: z.string().max(120).optional().default("Projects"),
  items: z.array(projectItemSchema).default([]),
});

const contactContentSchema = z.object({
  heading: z.string().max(120).optional().default("Contact"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(30).optional().default(""),
  socials: z
    .array(z.object({ label: z.string().max(30), href: z.string().url() }))
    .default([]),
});

const researchItemSchema = z.object({
  title: z.string().min(1).max(200),
  publisher: z.string().max(120).optional().default(""),
  date: z.string().max(40).optional().default(""),
  description: z.string().max(500).optional().default(""),
  url: z.string().url().optional().or(z.literal("")),
});

const researchContentSchema = z.object({
  heading: z.string().max(120).optional().default("Research"),
  items: z.array(researchItemSchema).default([]),
});

const galleryItemSchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().max(200).optional().default(""),
});

const galleryContentSchema = z.object({
  heading: z.string().max(120).optional().default("Gallery"),
  items: z.array(galleryItemSchema).default([]),
});

const testimonialItemSchema = z.object({
  name: z.string().min(1).max(80),
  role: z.string().max(120).optional().default(""),
  quote: z.string().min(1).max(600),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

const testimonialsContentSchema = z.object({
  heading: z.string().max(120).optional().default("Testimonials"),
  items: z.array(testimonialItemSchema).default([]),
});

const experienceItemSchema = z.object({
  company: z.string().min(1).max(120),
  role: z.string().min(1).max(120),
  startDate: z.string().max(40).optional().default(""),
  endDate: z.string().max(40).optional().default(""),
  description: z.string().max(500).optional().default(""),
});

const experienceContentSchema = z.object({
  heading: z.string().max(120).optional().default("Experience"),
  items: z.array(experienceItemSchema).default([]),
});

const certificationItemSchema = z.object({
  title: z.string().min(1).max(150),
  issuer: z.string().max(120).optional().default(""),
  date: z.string().max(40).optional().default(""),
  credentialUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

const certificationsContentSchema = z.object({
  heading: z.string().max(120).optional().default("Certifications"),
  items: z.array(certificationItemSchema).default([]),
});

const ventureItemSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional().default(""),
  url: z.string().url().optional().or(z.literal("")),
  logoUrl: z.string().url().optional().or(z.literal("")),
});

const startupContentSchema = z.object({
  heading: z.string().max(120).optional().default("Startups"),
  items: z.array(ventureItemSchema).default([]),
});

const businessContentSchema = z.object({
  heading: z.string().max(120).optional().default("Business"),
  items: z.array(ventureItemSchema).default([]),
});

const blogContentSchema = z.object({
  heading: z.string().max(120).optional().default("Blog"),
  postCount: z.coerce.number().int().min(1).max(12).optional().default(3),
});

/** @type {Record<string, z.ZodTypeAny>} */
export const sectionContentSchemas = {
  hero: heroContentSchema,
  about: aboutContentSchema,
  skills: skillsContentSchema,
  projects: projectsContentSchema,
  contact: contactContentSchema,
  research: researchContentSchema,
  gallery: galleryContentSchema,
  testimonials: testimonialsContentSchema,
  experience: experienceContentSchema,
  certifications: certificationsContentSchema,
  startup: startupContentSchema,
  business: businessContentSchema,
  blog: blogContentSchema,
};

export const sectionTypeSchema = z.enum([
  "hero",
  "about",
  "skills",
  "projects",
  "contact",
  "blog",
  "research",
  "gallery",
  "testimonials",
  "experience",
  "certifications",
  "startup",
  "business",
]);

export const sectionBaseSchema = z.object({
  type: sectionTypeSchema,
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "slug must be lowercase kebab-case"),
  order: z.coerce.number().int().default(0),
  isVisible: z.boolean().default(true),
  isEnabled: z.boolean().default(true),
  isPublished: z.boolean().default(false),
});
