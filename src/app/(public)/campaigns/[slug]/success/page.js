import Link from "next/link";

export default async function ContributionSuccessPage({ params }) {
  const { slug } = await params;
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you! 🎉</h1>
      <p className="mb-8" style={{ color: "var(--po-muted)" }}>
        Your contribution is being confirmed — it can take a few seconds.
      </p>
      <Link href={`/campaigns/${slug}`} className="btn btn-primary">
        Back to campaign
      </Link>
    </div>
  );
}
