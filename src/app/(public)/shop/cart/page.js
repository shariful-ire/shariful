"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { useSession } from "@/lib/auth/client";
import { validateCoupon } from "@/lib/api/coupons";
import { checkout } from "@/lib/api/orders";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotal, currency, hydrated } = useCart();
  const { data: session } = useSession();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [provider, setProvider] = useState("stripe");
  const [checkoutError, setCheckoutError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function applyCoupon() {
    setCouponError("");
    try {
      const { discountAmount } = await validateCoupon(couponCode, subtotal);
      setDiscount(discountAmount);
    } catch (err) {
      setDiscount(0);
      setCouponError(err.message || "Invalid coupon");
    }
  }

  async function handleCheckout() {
    setCheckoutError("");
    setIsCheckingOut(true);
    try {
      const { url } = await checkout({
        items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
        couponCode: couponCode || undefined,
        paymentProvider: provider,
      });
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err.message || "Checkout failed");
      setIsCheckingOut(false);
    }
  }

  if (!hydrated) return null;

  if (!lines.length) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/shop" className="btn btn-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  const total = Math.max(0, subtotal - discount);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">Your cart</h1>

      <ul className="flex flex-col gap-4 mb-8">
        {lines.map((line) => (
          <li key={line.productId} className="card bg-base-200">
            <div className="card-body flex-row items-center justify-between py-3">
              <div>
                <p className="font-semibold">{line.name}</p>
                <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                  {formatMoney(line.price, line.currency)} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  className="input input-bordered input-sm w-16"
                  value={line.quantity}
                  onChange={(e) => updateQuantity(line.productId, Number(e.target.value))}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-ghost text-error"
                  onClick={() => removeItem(line.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mb-4">
        <input
          className="input input-bordered flex-1"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button type="button" className="btn btn-outline" onClick={applyCoupon}>
          Apply
        </button>
      </div>
      {couponError ? <p className="text-error text-sm mb-4">{couponError}</p> : null}

      <div className="flex flex-col gap-1 mb-6 text-right">
        <p style={{ color: "var(--po-muted)" }}>
          Subtotal: {formatMoney(subtotal, currency)}
        </p>
        {discount > 0 ? (
          <p className="text-success">- Discount: {formatMoney(discount, currency)}</p>
        ) : null}
        <p className="text-xl font-bold">Total: {formatMoney(total, currency)}</p>
      </div>

      <div className="flex gap-4 mb-6">
        <label className="label cursor-pointer gap-2">
          <input
            type="radio"
            className="radio radio-primary"
            checked={provider === "stripe"}
            onChange={() => setProvider("stripe")}
          />
          <span className="label-text">Card (Stripe)</span>
        </label>
        <label className="label cursor-pointer gap-2">
          <input
            type="radio"
            className="radio radio-primary"
            checked={provider === "sslcommerz"}
            onChange={() => setProvider("sslcommerz")}
          />
          <span className="label-text">SSLCommerz</span>
        </label>
      </div>

      {!session?.user ? (
        <p className="text-sm mb-4" style={{ color: "var(--po-muted)" }}>
          <a href="/login" className="link">
            Sign in
          </a>{" "}
          to check out.
        </p>
      ) : null}

      {checkoutError ? <p className="text-error text-sm mb-4">{checkoutError}</p> : null}

      <button
        type="button"
        className="btn btn-primary w-full"
        disabled={!session?.user || isCheckingOut}
        onClick={handleCheckout}
      >
        {isCheckingOut ? "Redirecting..." : "Checkout"}
      </button>
    </div>
  );
}
