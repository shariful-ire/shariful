"use client";

import { createAuthClient } from "better-auth/react";

const API_ROOT_URL =
  process.env.NEXT_PUBLIC_API_ROOT_URL || "http://localhost:5000";

/** BetterAuth client — talks to the backend's /api/auth/* handlers. */
export const authClient = createAuthClient({
  baseURL: API_ROOT_URL,
});

export const { useSession, signIn, signOut, signUp } = authClient;
