import { fetchApi } from "./client";

/** All sections, ordered — cached under the "sections" tag. */
export function getSections() {
  return fetchApi("/sections", { tags: ["sections"] }).then((r) => r.data);
}

export function getSection(slug) {
  return fetchApi(`/sections/${slug}`, { tags: ["sections"] }).then(
    (r) => r.data
  );
}

export function createSection(payload) {
  return fetchApi("/sections", { method: "POST", body: payload }).then(
    (r) => r.data
  );
}

export function updateSection(id, payload) {
  return fetchApi(`/sections/${id}`, { method: "PATCH", body: payload }).then(
    (r) => r.data
  );
}

export function deleteSection(id) {
  return fetchApi(`/sections/${id}`, { method: "DELETE" });
}

export function duplicateSection(id) {
  return fetchApi(`/sections/${id}/duplicate`, { method: "POST" }).then(
    (r) => r.data
  );
}

export function reorderSections(updates) {
  return fetchApi("/sections/reorder", {
    method: "POST",
    body: updates,
  }).then((r) => r.data);
}
