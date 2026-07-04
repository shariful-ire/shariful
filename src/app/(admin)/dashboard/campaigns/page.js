import { CampaignManager } from "@/components/admin/CampaignManager";

export default function CampaignsDashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <a href="/dashboard/campaigns/new" className="btn btn-primary">
          New campaign
        </a>
      </div>
      <CampaignManager />
    </div>
  );
}
