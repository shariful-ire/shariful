import { getSections } from "@/lib/api/sections";
import { SectionsManager } from "@/components/admin/SectionsManager";

export default async function DashboardSectionsPage() {
  const sections = await getSections().catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sections</h1>
        <a href="/dashboard/sections/new" className="btn btn-primary">
          New section
        </a>
      </div>
      <SectionsManager initialSections={sections} />
    </div>
  );
}
