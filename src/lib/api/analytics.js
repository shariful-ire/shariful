import { fetchApi } from "./client";

export function trackPageView(path, referrer) {
  return fetchApi("/analytics/pageview", {
    method: "POST",
    body: { path, referrer },
  }).catch(() => null); // tracking must never break the page
}

export function getAnalyticsSummary(days = 30) {
  return fetchApi(`/analytics/summary?days=${days}`).then((r) => r.data);
}
