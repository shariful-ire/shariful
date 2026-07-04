"use client";

import { useQuery } from "@tanstack/react-query";
import { getAnalyticsSummary } from "@/lib/api/analytics";
import { ViewsBarChart } from "./charts/ViewsBarChart";
import { TopPagesChart } from "./charts/TopPagesChart";

export function AnalyticsDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: () => getAnalyticsSummary(30),
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading analytics...</p>;
  if (error) return <p className="text-error">Couldn&apos;t load analytics: {error.message}</p>;

  return (
    <div className="flex flex-col gap-10">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Views (last 30 days)</div>
          <div className="stat-value">{data.totalViews}</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Views per day</h2>
        <ViewsBarChart data={data.viewsByDay} />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Top pages</h2>
        <TopPagesChart data={data.topPaths} />
      </div>
    </div>
  );
}
