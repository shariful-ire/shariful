import { fetchApi } from "./client";

/** Active theme for public rendering, cached under the "theme" tag. */
export function getActiveTheme() {
  return fetchApi("/themes/active", { tags: ["theme"] }).then((r) => r.data);
}

export function listThemes() {
  return fetchApi("/themes", { tags: ["theme"] }).then((r) => r.data);
}

export function createTheme(payload) {
  return fetchApi("/themes", { method: "POST", body: payload }).then(
    (r) => r.data
  );
}

export function updateTheme(id, payload) {
  return fetchApi(`/themes/${id}`, { method: "PATCH", body: payload }).then(
    (r) => r.data
  );
}

export function activateTheme(id) {
  return fetchApi(`/themes/${id}/activate`, { method: "POST" }).then(
    (r) => r.data
  );
}
