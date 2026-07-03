"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-os-cart";
const CartContext = createContext(null);

/**
 * @typedef {Object} CartLine
 * @property {string} productId
 * @property {string} name
 * @property {number} price
 * @property {string} currency
 * @property {string} slug
 * @property {number} quantity
 */

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setLines(Array.isArray(stored) ? stored : []);
    } catch {
      setLines([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  function addItem(product, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === product._id);
      if (existing) {
        return prev.map((l) =>
          l.productId === product._id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          slug: product.slug,
          quantity,
        },
      ];
    });
  }

  function updateQuantity(productId, quantity) {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, quantity } : l))
    );
  }

  function removeItem(productId) {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }

  function clear() {
    setLines([]);
  }

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const currency = lines[0]?.currency || "usd";

  return (
    <CartContext.Provider
      value={{ lines, addItem, updateQuantity, removeItem, clear, subtotal, currency, hydrated }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
