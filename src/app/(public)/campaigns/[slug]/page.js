import { notFound } from "next/navigation";
import { getCampaign } from "@/lib/api/campaigns";
import { formatMoney } from "@/lib/format";
import { ContributeForm } from "@/components/campaigns/ContributeForm";
import { SupporterWall } from "@/components/campaigns/SupporterWall";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const campaign = await getCampaign(slug).catch(() => null);
  if (!campaign) return { title: "Campaign not found" };
  return { title: campaign.title, description: campaign.description?.slice(0, 160) };
}

export default async function CampaignPage({ params }) {
  const { slug } = await params;
  const campaign = await getCampaign(slug).catch(() => null);
  if (!campaign) notFound();

  const pct = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {campaign.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={campaign.coverImageUrl}
          alt={campaign.title}
          className="w-full rounded-box mb-8 max-h-80 object-cover"
        />
      ) : null}

      <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
      <p className="mb-6 whitespace-pre-line" style={{ color: "var(--po-body)" }}>
        {campaign.description}
      </p>

      <progress className="progress progress-primary w-full mb-2" value={pct} max="100" />
      <p className="mb-8" style={{ color: "var(--po-muted)" }}>
        {formatMoney(campaign.raisedAmount, campaign.currency)} raised of{" "}
        {formatMoney(campaign.goalAmount, campaign.currency)} ({pct}%)
      </p>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold mb-4">Contribute</h2>
          <ContributeForm slug={slug} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Supporters</h2>
          <SupporterWall slug={slug} />
        </div>
      </div>
    </div>
  );
}
