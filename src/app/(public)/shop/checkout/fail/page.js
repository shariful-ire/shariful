import Link from "next/link";

export default function CheckoutFailPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment failed</h1>
      <p className="mb-8" style={{ color: "var(--po-muted)" }}>
        Something went wrong processing your payment. No charge should have
        been made — please try again.
      </p>
      <Link href="/shop/cart" className="btn btn-primary">
        Back to cart
      </Link>
    </div>
  );
}
