import Link from "next/link";

export default async function CheckoutSuccessPage({ searchParams }) {
  const { order } = await searchParams;

  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment received 🎉</h1>
      <p className="mb-8" style={{ color: "var(--po-muted)" }}>
        Thanks for your purchase. Your order is being confirmed — this can
        take a few seconds once the payment provider notifies us.
      </p>
      <div className="flex gap-3 justify-center">
        {order ? (
          <Link href={`/account/orders/${order}`} className="btn btn-primary">
            View order
          </Link>
        ) : null}
        <Link href="/shop" className="btn btn-outline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
