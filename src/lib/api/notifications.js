import { fetchApi } from "./client";

export function getNotifications() {
  return fetchApi("/notifications").then((r) => r.data);
}

export function markNotificationRead(id) {
  return fetchApi(`/notifications/${id}/read`, { method: "POST" });
}

export function markAllNotificationsRead() {
  return fetchApi("/notifications/read-all", { method: "POST" });
}
