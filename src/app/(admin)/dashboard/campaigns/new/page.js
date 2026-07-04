import { CampaignForm } from "@/components/admin/CampaignForm";

export default function NewCampaignPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New campaign</h1>
      <CampaignForm mode="create" />
    </div>
  );
}
