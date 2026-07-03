const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * @typedef {Object} FetchApiOptions
 * @property {string} [method]
 * @property {any} [body]
 * @property {string[]} [tags] - Next.js cache tags for this read
 * @property {number|false} [revalidate] - seconds, or false to cache indefinitely until revalidateTag
 * @property {RequestCredentials} [credentials]
 */

/**
 * Thin fetch wrapper around the backend API. Server Components get Next's
 * fetch cache (tags/revalidate); Client Components (TanStack Query) just
 * get a plain fetch with credentials for the session cookie.
 * @param {string} path
 * @param {FetchApiOptions} [options]
 */
export async function fetchApi(path, options = {}) {
  const { method = "GET", body, tags, revalidate, credentials = "include" } =
    options;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    ...(tags || revalidate !== undefined
      ? { next: { tags, revalidate } }
      : {}),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    const error = new Error(payload?.error?.message || `Request failed: ${res.status}`);
    error.status = res.status;
    throw error;
  }

  if (res.status === 204) return null;
  return res.json();
}
