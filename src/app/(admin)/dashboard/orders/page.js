import { AdminOrderList } from "@/components/admin/AdminOrderList";

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <AdminOrderList />
    </div>
  );
}
