import { ProductManager } from "@/components/admin/ProductManager";

export default function ProductsDashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <a href="/dashboard/products/new" className="btn btn-primary">
          New product
        </a>
      </div>
      <ProductManager />
    </div>
  );
}
