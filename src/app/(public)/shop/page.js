import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import { formatMoney } from "@/lib/format";

export const metadata = { title: "Shop — PortfolioOS" };

export default async function ShopPage() {
  const products = await getProducts().catch(() => []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        <Link href="/shop/cart" className="btn btn-outline btn-sm">
          Cart
        </Link>
      </div>

      {!products.length ? (
        <p style={{ color: "var(--po-muted)" }}>No products available yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <a
              key={product._id}
              href={`/shop/${product.slug}`}
              className="card bg-base-200 shadow hover:shadow-md transition-shadow"
            >
              {product.images?.[0] ? (
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-44 w-full object-cover"
                  />
                </figure>
              ) : null}
              <div className="card-body">
                <h2 className="card-title text-base">{product.name}</h2>
                <p className="font-semibold" style={{ color: "var(--po-heading)" }}>
                  {formatMoney(product.price, product.currency)}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
