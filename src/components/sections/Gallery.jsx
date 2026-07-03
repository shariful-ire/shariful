export function Gallery({ content }) {
  const { heading, items } = content;

  if (!items?.length) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>No images added yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <figure key={item.imageUrl} className="rounded-box overflow-hidden bg-base-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.caption || ""}
              className="h-48 w-full object-cover"
            />
            {item.caption ? (
              <figcaption
                className="p-2 text-sm text-center"
                style={{ color: "var(--po-muted)" }}
              >
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
