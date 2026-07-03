import { SectionForm } from "@/components/admin/SectionForm";

export default function NewSectionPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New section</h1>
      <SectionForm mode="create" />
    </div>
  );
}
