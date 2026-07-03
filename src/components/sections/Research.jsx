export function Research({ content }) {
  const { heading, items } = content;

  if (!items?.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>No research entries yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.title} className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">{item.title}</h3>
              <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                {[item.publisher, item.date].filter(Boolean).join(" · ")}
              </p>
              {item.description ? (
                <p style={{ color: "var(--po-body)" }}>{item.description}</p>
              ) : null}
              {item.url ? (
                <a href={item.url} className="link link-primary text-sm">
                  Read more
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
