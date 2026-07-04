import Link from "next/link";
import { getCampaigns } from "@/lib/api/campaigns";
import { formatMoney } from "@/lib/format";

export const metadata = { title: "Campaigns — PortfolioOS" };

export default async function CampaignsPage() {
  const campaigns = await getCampaigns().catch(() => []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Campaigns</h1>
      {!campaigns.length ? (
        <p style={{ color: "var(--po-muted)" }}>No active campaigns right now.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {campaigns.map((c) => {
            const pct = Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100));
            return (
              <Link key={c._id} href={`/campaigns/${c.slug}`} className="card bg-base-200 shadow">
                <div className="card-body">
                  <h2 className="card-title">{c.title}</h2>
                  <progress className="progress progress-primary w-full" value={pct} max="100" />
                  <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                    {formatMoney(c.raisedAmount, c.currency)} raised of{" "}
                    {formatMoney(c.goalAmount, c.currency)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
