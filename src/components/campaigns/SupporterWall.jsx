"use client";

import { useQuery } from "@tanstack/react-query";
import { getContributions } from "@/lib/api/campaigns";
import { formatMoney } from "@/lib/format";

export function SupporterWall({ slug }) {
  const { data: contributions = [], isLoading } = useQuery({
    queryKey: ["contributions", slug],
    queryFn: () => getContributions(slug),
  });

  if (isLoading) return null;
  if (!contributions.length) {
    return (
      <p style={{ color: "var(--po-muted)" }}>Be the first to contribute!</p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {contributions.map((c) => (
        <li key={c._id} className="flex justify-between text-sm">
          <span>
            {c.name}
            {c.message ? ` — "${c.message}"` : ""}
          </span>
          <span className="font-semibold">{formatMoney(c.amount, c.currency)}</span>
        </li>
      ))}
    </ul>
  );
}
