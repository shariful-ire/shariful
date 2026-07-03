import { getPosts } from "@/lib/api/blog";

export async function Blog({ content }) {
  const { heading, postCount } = content;
  const posts = await getPosts(postCount || 3).catch(() => []);

  if (!posts.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>No posts published yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{heading}</h2>
        <a href="/blog" className="link link-primary text-sm">
          View all
        </a>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <a
            key={post._id}
            href={`/blog/${post.slug}`}
            className="card bg-base-200 shadow hover:shadow-md transition-shadow"
          >
            <div className="card-body">
              <h3 className="card-title text-base">{post.title}</h3>
              {post.excerpt ? (
                <p style={{ color: "var(--po-body)" }}>{post.excerpt}</p>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
