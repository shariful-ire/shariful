import { Hero } from "./Hero";
import { About } from "./About";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { Blog } from "./Blog";
import { Research } from "./Research";
import { Gallery } from "./Gallery";
import { Testimonials } from "./Testimonials";
import { Experience } from "./Experience";
import { Certifications } from "./Certifications";
import { VentureList } from "./VentureList";
import { sectionThemeOverrideToCss } from "@/lib/theme/tokensToCss";

/**
 * Single source of truth mapping a section's `type` to its component.
 * Adding a new section type = registering it here once, never touching
 * the page that renders the list.
 * @type {Record<string, React.ComponentType<{content: any}>>}
 */
const SECTION_COMPONENTS = {
  hero: Hero,
  about: About,
  skills: Skills,
  projects: Projects,
  contact: Contact,
  blog: Blog,
  research: Research,
  gallery: Gallery,
  testimonials: Testimonials,
  experience: Experience,
  certifications: Certifications,
  startup: VentureList,
  business: VentureList,
};

function deviceVisibilityClassName(deviceVisibility) {
  if (!deviceVisibility) return "";
  const hiddenOn = [];
  if (deviceVisibility.desktop === false) hiddenOn.push("hidden lg:block");
  if (deviceVisibility.mobile === false) hiddenOn.push("max-sm:hidden");
  if (deviceVisibility.tablet === false) hiddenOn.push("sm:max-lg:hidden");
  return hiddenOn.join(" ");
}

/**
 * @param {{ sections: Array<import('@/lib/api/sections').Section> }} props
 */
export function SectionRenderer({ sections }) {
  const visible = (sections || []).filter(
    (s) => s.isVisible && s.isEnabled && s.isPublished
  );

  if (!visible.length) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 text-center">
        <p style={{ color: "var(--po-muted)" }}>
          No sections are published yet. Add and publish sections from the
          admin dashboard.
        </p>
      </div>
    );
  }

  return (
    <>
      {visible.map((section) => {
        const Component = SECTION_COMPONENTS[section.type];
        if (!Component) return null;

        const overrideCss = section.themeOverride
          ? sectionThemeOverrideToCss(section.slug, section.themeOverride)
          : "";

        return (
          <div
            key={section._id || section.slug}
            data-section-theme={section.themeOverride ? section.slug : undefined}
            className={deviceVisibilityClassName(section.deviceVisibility)}
          >
            {overrideCss ? (
              <style dangerouslySetInnerHTML={{ __html: overrideCss }} />
            ) : null}
            <Component content={section.content} />
          </div>
        );
      })}
    </>
  );
}
