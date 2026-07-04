import { fetchApi } from "./client";

export function getCampaigns() {
  return fetchApi("/campaigns", { tags: ["campaigns"] }).then((r) => r.data);
}

export function getCampaign(slug) {
  return fetchApi(`/campaigns/${slug}`, { tags: ["campaigns"] }).then(
    (r) => r.data
  );
}

export function getContributions(slug) {
  return fetchApi(`/campaigns/${slug}/contributions`).then((r) => r.data);
}

export function contribute(slug, payload) {
  return fetchApi(`/campaigns/${slug}/contribute`, {
    method: "POST",
    body: payload,
  }).then((r) => r.data);
}

export function createCampaign(payload) {
  return fetchApi("/campaigns", { method: "POST", body: payload }).then(
    (r) => r.data
  );
}

export function updateCampaign(id, payload) {
  return fetchApi(`/campaigns/${id}`, { method: "PATCH", body: payload }).then(
    (r) => r.data
  );
}

export function deleteCampaign(id) {
  return fetchApi(`/campaigns/${id}`, { method: "DELETE" });
}
