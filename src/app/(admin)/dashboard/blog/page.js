import { BlogManager } from "@/components/admin/BlogManager";

export default function BlogDashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog</h1>
        <a href="/dashboard/blog/new" className="btn btn-primary">
          New post
        </a>
      </div>
      <BlogManager />
    </div>
  );
}
