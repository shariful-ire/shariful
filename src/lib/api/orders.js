import { fetchApi } from "./client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function checkout(payload) {
  return fetchApi("/orders/checkout", { method: "POST", body: payload }).then(
    (r) => r.data
  );
}

export function getMyOrders() {
  return fetchApi("/orders/mine").then((r) => r.data);
}

export function getAllOrders() {
  return fetchApi("/orders/all").then((r) => r.data);
}

export function getOrder(id) {
  return fetchApi(`/orders/${id}`).then((r) => r.data);
}

/** Not a fetchApi call — this is a real navigation (302 redirect to the signed Cloudinary URL). */
export function getDownloadHref(orderId, productId) {
  return `${API_URL}/orders/${orderId}/download/${productId}`;
}
