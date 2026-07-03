import { notFound } from "next/navigation";
import { getPost } from "@/lib/api/blog";
import { CommentsAndLikes } from "@/components/blog/CommentsAndLikes";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full rounded-box mb-8 max-h-96 object-cover"
        />
      ) : null}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.tags?.length ? (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="badge badge-accent badge-outline">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div
        className="whitespace-pre-line leading-relaxed"
        style={{ color: "var(--po-body)" }}
      >
        {post.body}
      </div>

      <CommentsAndLikes slug={slug} initialLikeCount={post.likeCount} />
    </article>
  );
}
