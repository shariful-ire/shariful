import { cookies } from "next/headers";

const API_ROOT_URL =
  process.env.NEXT_PUBLIC_API_ROOT_URL || "http://localhost:5000";

/**
 * Server-side session lookup: forwards the incoming request's cookies to
 * the backend's BetterAuth handler. Used by Server Components/layouts —
 * never trust a client-only check for RBAC.
 * @returns {Promise<{ user: any, session: any } | null>}
 */
export async function getServerSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return null;

  const res = await fetch(`${API_ROOT_URL}/api/auth/get-session`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return data?.user ? data : null;
}
