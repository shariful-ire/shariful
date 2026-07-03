import { getPosts } from "@/lib/api/blog";

export const metadata = { title: "Blog — PortfolioOS" };

export default async function BlogListPage() {
  const posts = await getPosts().catch(() => []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {!posts.length ? (
        <p style={{ color: "var(--po-muted)" }}>No posts published yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <a key={post._id} href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
              {post.excerpt ? (
                <p style={{ color: "var(--po-body)" }}>{post.excerpt}</p>
              ) : null}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
