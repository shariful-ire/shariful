"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "@/lib/api/campaigns";
import { CampaignForm } from "./CampaignForm";

export function EditCampaignClient({ id }) {
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["admin-campaigns"],
    queryFn: getCampaigns,
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading...</p>;

  const campaign = campaigns.find((c) => c._id === id);
  if (!campaign) return <p className="text-error">Campaign not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit campaign — {campaign.title}</h1>
      <CampaignForm mode="edit" campaign={campaign} />
    </div>
  );
}
