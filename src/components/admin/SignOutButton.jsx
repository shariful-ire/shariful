"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" className="btn btn-outline btn-sm" onClick={handleSignOut}>
      Sign out
    </button>
  );
}
