"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";

export function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      {added ? "Added!" : "Add to cart"}
    </button>
  );
}
