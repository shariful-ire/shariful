"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";
import { ProductForm } from "./ProductForm";

export function EditProductClient({ id }) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading...</p>;

  const product = products.find((p) => p._id === id);
  if (!product) return <p className="text-error">Product not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit product — {product.name}</h1>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
