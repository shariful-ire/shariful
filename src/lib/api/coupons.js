import { fetchApi } from "./client";

export function listCoupons() {
  return fetchApi("/coupons").then((r) => r.data);
}

export function createCoupon(payload) {
  return fetchApi("/coupons", { method: "POST", body: payload }).then(
    (r) => r.data
  );
}

export function updateCoupon(id, payload) {
  return fetchApi(`/coupons/${id}`, { method: "PATCH", body: payload }).then(
    (r) => r.data
  );
}

export function deleteCoupon(id) {
  return fetchApi(`/coupons/${id}`, { method: "DELETE" });
}

export function validateCoupon(code, subtotal) {
  return fetchApi("/coupons/validate", {
    method: "POST",
    body: { code, subtotal },
  }).then((r) => r.data);
}
