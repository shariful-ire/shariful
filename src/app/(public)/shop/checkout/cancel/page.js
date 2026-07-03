import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Checkout cancelled</h1>
      <p className="mb-8" style={{ color: "var(--po-muted)" }}>
        Your cart is still saved — you can pick up checkout again anytime.
      </p>
      <Link href="/shop/cart" className="btn btn-primary">
        Back to cart
      </Link>
    </div>
  );
}
