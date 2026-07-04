"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth/client";
import { contribute } from "@/lib/api/campaigns";

export function ContributeForm({ slug }) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("10.00");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [provider, setProvider] = useState("stripe");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const { url } = await contribute(slug, {
        amount: Math.round(Number(amount) * 100),
        message: message || undefined,
        isAnonymous,
        paymentProvider: provider,
      });
      window.location.href = url;
    } catch (err) {
      setError(err.message || "Something went wrong");
      setIsSubmitting(false);
    }
  }

  if (!session?.user) {
    return (
      <p style={{ color: "var(--po-muted)" }}>
        <a href="/login" className="link">
          Sign in
        </a>{" "}
        to contribute.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
      <label className="form-control">
        <span className="label-text">Amount</span>
        <input
          type="number"
          step="0.01"
          min="1"
          className="input input-bordered"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <label className="form-control">
        <span className="label-text">Message (optional)</span>
        <textarea
          className="textarea textarea-bordered"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <label className="label cursor-pointer gap-2 self-start">
        <span className="label-text">Contribute anonymously</span>
        <input
          type="checkbox"
          className="toggle"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
      </label>

      <div className="flex gap-4">
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

      {error ? <p className="text-error text-sm">{error}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Redirecting..." : "Contribute"}
      </button>
    </form>
  );
}
