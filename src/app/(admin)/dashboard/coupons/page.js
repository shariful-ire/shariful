import { CouponManager } from "@/components/admin/CouponManager";

export default function CouponsDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Coupons</h1>
      <CouponManager />
    </div>
  );
}
