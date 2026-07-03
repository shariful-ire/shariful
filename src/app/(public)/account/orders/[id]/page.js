import { OrderDetail } from "@/components/account/OrderDetail";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  return <OrderDetail id={id} />;
}
