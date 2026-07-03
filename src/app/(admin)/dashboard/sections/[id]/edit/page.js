import { notFound } from "next/navigation";
import { getSections } from "@/lib/api/sections";
import { SectionForm } from "@/components/admin/SectionForm";

export default async function EditSectionPage({ params }) {
  const { id } = await params;
  const sections = await getSections().catch(() => []);
  const section = sections.find((s) => s._id === id);

  if (!section) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit section — {section.slug}</h1>
      <SectionForm mode="edit" section={section} />
    </div>
  );
}
