import { EditProductClient } from "@/components/admin/EditProductClient";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  return <EditProductClient id={id} />;
}
