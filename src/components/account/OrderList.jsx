"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "@/lib/api/orders";
import { formatMoney } from "@/lib/format";

export function OrderList() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading orders...</p>;

  if (!orders.length) {
    return (
      <p style={{ color: "var(--po-muted)" }}>
        No orders yet. <a href="/shop" className="link">Visit the shop</a>.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => (
        <li key={order._id} className="card bg-base-200">
          <div className="card-body flex-row items-center justify-between py-4">
            <div>
              <p className="font-semibold">
                {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                <span className="capitalize">{order.status}</span>
              </p>
              <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                {order.items.length} item(s) — {formatMoney(order.total, order.currency)}
              </p>
            </div>
            <a href={`/account/orders/${order._id}`} className="btn btn-sm btn-ghost">
              View
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
