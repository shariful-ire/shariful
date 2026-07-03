export function Testimonials({ content }) {
  const { heading, items } = content;

  if (!items?.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>No testimonials yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <blockquote key={item.name} className="card bg-base-200 shadow">
            <div className="card-body">
              <p className="italic" style={{ color: "var(--po-body)" }}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-4">
                {item.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="font-semibold">{item.name}</p>
                  {item.role ? (
                    <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                      {item.role}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
