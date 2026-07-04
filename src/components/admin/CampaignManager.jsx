"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCampaigns, deleteCampaign } from "@/lib/api/campaigns";
import { formatMoney } from "@/lib/format";

export function CampaignManager() {
  const queryClient = useQueryClient();

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["admin-campaigns"],
    queryFn: getCampaigns,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-campaigns"] }),
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading campaigns...</p>;
  if (!campaigns.length) return <p style={{ color: "var(--po-muted)" }}>No campaigns yet.</p>;

  return (
    <ul className="flex flex-col gap-2">
      {campaigns.map((c) => (
        <li key={c._id} className="card bg-base-200">
          <div className="card-body flex-row items-center justify-between py-3">
            <div>
              <p className="font-semibold">{c.title}</p>
              <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                {formatMoney(c.raisedAmount, c.currency)} / {formatMoney(c.goalAmount, c.currency)}{" "}
                · {c.status}
              </p>
            </div>
            <div className="flex gap-2">
              <a href={`/dashboard/campaigns/${c._id}/edit`} className="btn btn-sm btn-ghost">
                Edit
              </a>
              <button
                type="button"
                className="btn btn-sm btn-error btn-outline"
                onClick={() => {
                  if (confirm(`Delete "${c.title}"?`)) deleteMutation.mutate(c._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
