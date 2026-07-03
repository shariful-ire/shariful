import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { ThemeToggle } from "@/components/providers/ThemeToggle";
import { getSections } from "@/lib/api/sections";

export async function generateMetadata() {
  const sections = await getSections().catch(() => []);
  const hero = sections.find((s) => s.type === "hero" && s.isPublished);

  if (!hero) {
    return {
      title: "PortfolioOS",
      description: "A database-driven, fully dynamic portfolio.",
    };
  }

  return {
    title: hero.content.headline,
    description: hero.content.subheadline || undefined,
    openGraph: {
      title: hero.content.headline,
      description: hero.content.subheadline || undefined,
      images: hero.content.imageUrl ? [hero.content.imageUrl] : undefined,
    },
  };
}

export default async function Home() {
  const sections = await getSections().catch(() => []);

  return (
    <div className="flex flex-col flex-1">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main className="flex-1">
        <SectionRenderer sections={sections} />
      </main>
    </div>
  );
}
