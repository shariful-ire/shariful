"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/lib/api/orders";
import { formatMoney } from "@/lib/format";

export function Invoice({ id }) {
  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading invoice...</p>;
  if (error) return <p className="text-error">Couldn&apos;t load this invoice.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 print:hidden">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      <div className="border border-base-300 rounded-box p-8">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold">PortfolioOS</h2>
            <p style={{ color: "var(--po-muted)" }}>Invoice</p>
          </div>
          <div className="text-right">
            <p>Order #{order._id.slice(-6).toUpperCase()}</p>
            <p style={{ color: "var(--po-muted)" }}>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <table className="table w-full mb-8">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.product}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td className="text-right">{formatMoney(item.price, order.currency)}</td>
                <td className="text-right">
                  {formatMoney(item.price * item.quantity, order.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col items-end gap-1">
          <p>Subtotal: {formatMoney(order.subtotal, order.currency)}</p>
          {order.discountAmount > 0 ? (
            <p>Discount: -{formatMoney(order.discountAmount, order.currency)}</p>
          ) : null}
          <p className="text-xl font-bold">
            Total: {formatMoney(order.total, order.currency)}
          </p>
          <p className="capitalize" style={{ color: "var(--po-muted)" }}>
            Payment status: {order.status}
          </p>
        </div>
      </div>
    </div>
  );
}
