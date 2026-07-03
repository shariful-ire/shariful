import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";

export default async function AccountLayout({ children }) {
  const result = await getServerSession();
  if (!result?.user) redirect("/login");

  return <div className="max-w-3xl mx-auto px-6 py-16">{children}</div>;
}
