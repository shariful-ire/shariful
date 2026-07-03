import { EditBlogPostClient } from "@/components/admin/EditBlogPostClient";

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;
  return <EditBlogPostClient id={id} />;
}
