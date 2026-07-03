"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrder, getDownloadHref } from "@/lib/api/orders";
import { formatMoney } from "@/lib/format";

export function OrderDetail({ id }) {
  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading order...</p>;
  if (error) return <p className="text-error">Couldn&apos;t load this order.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Order #{order._id.slice(-6).toUpperCase()}
        </h1>
        <a href={`/account/orders/${id}/invoice`} className="btn btn-outline btn-sm">
          View invoice
        </a>
      </div>

      <p className="mb-4">
        Status: <span className="badge capitalize">{order.status}</span>
      </p>

      <ul className="flex flex-col gap-3 mb-6">
        {order.items.map((item) => (
          <li key={item.product} className="card bg-base-200">
            <div className="card-body flex-row items-center justify-between py-3">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                  {item.quantity} × {formatMoney(item.price, order.currency)}
                </p>
              </div>
              {order.status === "paid" ? (
                <a
                  href={getDownloadHref(order._id, item.product)}
                  className="btn btn-sm btn-primary"
                >
                  Download
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right">
        <p style={{ color: "var(--po-muted)" }}>
          Subtotal: {formatMoney(order.subtotal, order.currency)}
        </p>
        {order.discountAmount > 0 ? (
          <p className="text-success">
            Discount: -{formatMoney(order.discountAmount, order.currency)}
          </p>
        ) : null}
        <p className="text-xl font-bold">
          Total: {formatMoney(order.total, order.currency)}
        </p>
      </div>
    </div>
  );
}
