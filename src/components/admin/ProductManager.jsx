"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "@/lib/api/products";
import { formatMoney } from "@/lib/format";

export function ProductManager() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: getProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading products...</p>;
  if (!products.length) return <p style={{ color: "var(--po-muted)" }}>No products yet.</p>;

  return (
    <ul className="flex flex-col gap-2">
      {products.map((product) => (
        <li key={product._id} className="card bg-base-200">
          <div className="card-body flex-row items-center justify-between py-3">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                {formatMoney(product.price, product.currency)} · {product.status}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={`/dashboard/products/${product._id}/edit`}
                className="btn btn-sm btn-ghost"
              >
                Edit
              </a>
              <button
                type="button"
                className="btn btn-sm btn-error btn-outline"
                onClick={() => {
                  if (confirm(`Delete "${product.name}"?`)) {
                    deleteMutation.mutate(product._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
