import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api/products";
import { formatMoney } from "@/lib/format";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description?.slice(0, 160),
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="grid gap-8 md:grid-cols-2">
        {product.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-box object-cover"
          />
        ) : null}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-4" style={{ color: "var(--po-heading)" }}>
            {formatMoney(product.price, product.currency)}
          </p>
          <p className="mb-6 whitespace-pre-line" style={{ color: "var(--po-body)" }}>
            {product.description}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
