export function Experience({ content }) {
  const { heading, items } = content;

  if (!items?.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>No experience entries yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <ol className="relative border-s border-base-300 flex flex-col gap-8 ps-6">
        {items.map((item) => (
          <li key={`${item.company}-${item.role}`}>
            <h3 className="font-semibold">
              {item.role} · {item.company}
            </h3>
            <p className="text-sm" style={{ color: "var(--po-muted)" }}>
              {[item.startDate, item.endDate || "Present"].filter(Boolean).join(" — ")}
            </p>
            {item.description ? (
              <p className="mt-1" style={{ color: "var(--po-body)" }}>
                {item.description}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
