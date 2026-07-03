"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/lib/api/orders";
import { formatMoney } from "@/lib/format";

export function AdminOrderList() {
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["all-orders"],
    queryFn: getAllOrders,
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading orders...</p>;
  if (error) {
    return (
      <p className="text-error">
        Couldn&apos;t load orders (admin role required): {error.message}
      </p>
    );
  }
  if (!orders.length) return <p style={{ color: "var(--po-muted)" }}>No orders yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Provider</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-6).toUpperCase()}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="capitalize">{order.status}</td>
              <td className="capitalize">{order.paymentProvider}</td>
              <td className="text-right">{formatMoney(order.total, order.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
