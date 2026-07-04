import { EditCampaignClient } from "@/components/admin/EditCampaignClient";

export default async function EditCampaignPage({ params }) {
  const { id } = await params;
  return <EditCampaignClient id={id} />;
}
