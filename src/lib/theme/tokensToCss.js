/**
 * @typedef {Object} ThemeTokenSet
 * @property {string} primary
 * @property {string} secondary
 * @property {string} accent
 * @property {string} base100
 * @property {string} base200
 * @property {string} base300
 * @property {string} heading
 * @property {string} body
 * @property {string} muted
 * @property {string} success
 * @property {string} warning
 * @property {string} error
 * @property {string} info
 *
 * @typedef {Object} ThemeDoc
 * @property {string} name
 * @property {{body: string, heading: string, mono: string}} fonts
 * @property {number} radius
 * @property {ThemeTokenSet} light
 * @property {ThemeTokenSet} dark
 */

/** DaisyUI reads white/black text-on-brand as a reasonable default for a CMS-generated palette. */
const CONTENT_ON_BRAND = "#FFFFFF";

/**
 * @param {ThemeTokenSet} t
 * @returns {string} declarations (no selector wrapper)
 */
function tokenSetToDeclarations(t) {
  return `
    --color-primary: ${t.primary};
    --color-primary-content: ${CONTENT_ON_BRAND};
    --color-secondary: ${t.secondary};
    --color-secondary-content: ${CONTENT_ON_BRAND};
    --color-accent: ${t.accent};
    --color-accent-content: ${CONTENT_ON_BRAND};
    --color-base-100: ${t.base100};
    --color-base-200: ${t.base200};
    --color-base-300: ${t.base300};
    --color-base-content: ${t.body};
    --color-success: ${t.success};
    --color-success-content: ${CONTENT_ON_BRAND};
    --color-warning: ${t.warning};
    --color-warning-content: ${CONTENT_ON_BRAND};
    --color-error: ${t.error};
    --color-error-content: ${CONTENT_ON_BRAND};
    --color-info: ${t.info};
    --color-info-content: ${CONTENT_ON_BRAND};
    --po-heading: ${t.heading};
    --po-body: ${t.body};
    --po-muted: ${t.muted};
  `.trim();
}

/**
 * Builds the full CSS text for a theme document: a `:root` block for the
 * light tokens and a `[data-theme="dark"]` override block for dark tokens,
 * plus font and radius variables shared by both.
 * @param {ThemeDoc} theme
 */
export function themeToCss(theme) {
  const radiusRem = `${(theme.radius ?? 10) / 16}rem`;
  // Font *names* are metadata for the admin UI; the actual font files are
  // loaded at build time via next/font (see layout.js) — swapping the
  // loaded family itself is a future admin feature, not wired up yet.
  const shared = `
    --po-font-heading-name: "${theme.fonts?.heading ?? "Inter"}";
    --po-font-body-name: "${theme.fonts?.body ?? "Inter"}";
    --po-font-mono-name: "${theme.fonts?.mono ?? "JetBrains Mono"}";
    --radius-box: ${radiusRem};
    --radius-field: ${radiusRem};
    --radius-selector: ${radiusRem};
  `.trim();

  return `
:root {
  ${shared}
  ${tokenSetToDeclarations(theme.light)}
}

[data-theme="dark"] {
  ${tokenSetToDeclarations(theme.dark)}
}
`.trim();
}

/**
 * Builds a `[data-section-theme="slug"]` override block from a section's
 * partial token overrides (only the keys the admin chose to override).
 * @param {string} slug
 * @param {Partial<ThemeTokenSet>} overrides
 */
export function sectionThemeOverrideToCss(slug, overrides) {
  const decls = Object.entries(overrides || {})
    .map(([key, value]) => {
      const cssVar = key.startsWith("base")
        ? `--color-${key.replace("base", "base-")}`
        : `--color-${key}`;
      return `${cssVar}: ${value};`;
    })
    .join("\n  ");
  if (!decls) return "";
  return `[data-section-theme="${slug}"] {\n  ${decls}\n}`;
}
