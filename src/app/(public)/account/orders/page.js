import { OrderList } from "@/components/account/OrderList";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your orders</h1>
      <OrderList />
    </div>
  );
}
