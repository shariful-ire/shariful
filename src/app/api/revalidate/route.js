import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Called by the backend (or the admin dashboard) right after a write, so
 * Next's cached reads for that tag ("sections" | "theme") get refreshed.
 * Guarded by a shared secret — never by hidden UI alone.
 */
export async function POST(request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tag } = await request.json();
  if (!tag) {
    return NextResponse.json({ error: "Missing tag" }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag });
}
