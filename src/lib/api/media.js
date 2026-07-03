import { fetchApi } from "./client";

export function listMedia() {
  return fetchApi("/media").then((r) => r.data);
}

function getUploadSignature() {
  return fetchApi("/media/sign", { method: "POST" }).then((r) => r.data);
}

function registerMediaAsset(payload) {
  return fetchApi("/media", { method: "POST", body: payload }).then(
    (r) => r.data
  );
}

export function deleteMediaAsset(id) {
  return fetchApi(`/media/${id}`, { method: "DELETE" });
}

/**
 * Uploads a File directly to Cloudinary (bytes never pass through our
 * server) using a short-lived signature, then registers the resulting
 * asset in our own DB.
 * @param {File} file
 */
export async function uploadMedia(file) {
  const { timestamp, folder, signature, apiKey, cloudName } =
    await getUploadSignature();

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", folder);
  form.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    { method: "POST", body: form }
  );
  const uploaded = await uploadRes.json();
  if (!uploadRes.ok) {
    throw new Error(uploaded?.error?.message || "Upload to Cloudinary failed");
  }

  return registerMediaAsset({
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    type: uploaded.resource_type === "video" ? "video" : "image",
    width: uploaded.width,
    height: uploaded.height,
    bytes: uploaded.bytes,
    alt: file.name,
  });
}
