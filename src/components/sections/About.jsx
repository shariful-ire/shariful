export function About({ content }) {
  const { heading, body, imageUrl } = content;

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={heading}
            className="rounded-box shadow-xl w-full"
          />
        ) : null}
        <div>
          <h2 className="text-3xl font-bold mb-4">{heading}</h2>
          <p className="whitespace-pre-line" style={{ color: "var(--po-body)" }}>
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
