import { fetchApi } from "./client";

export function getPosts(limit) {
  const query = limit ? `?limit=${limit}` : "";
  return fetchApi(`/blog${query}`, { tags: ["blog"] }).then((r) => r.data);
}

export function getPost(slug) {
  return fetchApi(`/blog/${slug}`, { tags: ["blog"] }).then((r) => r.data);
}

export function createPost(payload) {
  return fetchApi("/blog", { method: "POST", body: payload }).then(
    (r) => r.data
  );
}

export function updatePost(id, payload) {
  return fetchApi(`/blog/${id}`, { method: "PATCH", body: payload }).then(
    (r) => r.data
  );
}

export function deletePost(id) {
  return fetchApi(`/blog/${id}`, { method: "DELETE" });
}

export function getComments(slug) {
  return fetchApi(`/blog/${slug}/comments`).then((r) => r.data);
}

export function postComment(slug, body) {
  return fetchApi(`/blog/${slug}/comments`, {
    method: "POST",
    body: { body },
  }).then((r) => r.data);
}

export function deleteComment(commentId) {
  return fetchApi(`/blog/comments/${commentId}`, { method: "DELETE" });
}

export function getLikeStatus(slug) {
  return fetchApi(`/blog/${slug}/like`).then((r) => r.data);
}

export function toggleLike(slug) {
  return fetchApi(`/blog/${slug}/like`, { method: "POST" }).then((r) => r.data);
}
