import { fetchApi } from "./client";

export function getProducts() {
  return fetchApi("/products", { tags: ["products"] }).then((r) => r.data);
}

export function getProduct(slug) {
  return fetchApi(`/products/${slug}`, { tags: ["products"] }).then(
    (r) => r.data
  );
}

export function createProduct(payload) {
  return fetchApi("/products", { method: "POST", body: payload }).then(
    (r) => r.data
  );
}

export function updateProduct(id, payload) {
  return fetchApi(`/products/${id}`, { method: "PATCH", body: payload }).then(
    (r) => r.data
  );
}

export function deleteProduct(id) {
  return fetchApi(`/products/${id}`, { method: "DELETE" });
}

function getDigitalAssetUploadSignature() {
  return fetchApi("/products/upload/digital-asset-signature", {
    method: "POST",
  }).then((r) => r.data);
}

/**
 * Uploads a digital deliverable straight to Cloudinary as an "authenticated"
 * (never publicly guessable) asset, and returns the `digitalAsset` shape to
 * store on the product.
 * @param {File} file
 */
export async function uploadDigitalAsset(file) {
  const { timestamp, folder, type, signature, apiKey, cloudName } =
    await getDigitalAssetUploadSignature();

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", folder);
  form.append("type", type);
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: form,
  });
  const uploaded = await res.json();
  if (!res.ok) {
    throw new Error(uploaded?.error?.message || "Digital asset upload failed");
  }

  return {
    publicId: uploaded.public_id,
    resourceType: uploaded.resource_type,
    format: uploaded.format || "bin",
  };
}
