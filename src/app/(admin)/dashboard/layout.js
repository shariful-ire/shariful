import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { SignOutButton } from "@/components/admin/SignOutButton";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Sections" },
  { href: "/dashboard/blog", label: "Blog" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/coupons", label: "Coupons" },
  { href: "/dashboard/theme", label: "Theme" },
  { href: "/dashboard/media", label: "Media" },
];

export default async function DashboardLayout({ children }) {
  const result = await getServerSession();

  if (!result?.user) {
    redirect("/login");
  }

  const { user } = result;
  const canAccess = user.role === "editor" || user.role === "admin";

  if (!canAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Access denied</h1>
          <p style={{ color: "var(--po-muted)" }}>
            Your account role (&quot;{user.role}&quot;) doesn&apos;t have
            dashboard access. Ask an admin to promote you to editor or admin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-base-200 flex flex-col p-4 gap-2">
        <h2 className="text-lg font-bold mb-4">PortfolioOS Admin</h2>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="btn btn-ghost justify-start">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <p className="text-sm" style={{ color: "var(--po-muted)" }}>
            {user.email} · {user.role}
          </p>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
