/** Shared by Startup and Business sections — both are the same {name, description, url, logoUrl} shape. */
export function VentureList({ content }) {
  const { heading, items } = content;

  if (!items?.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>Nothing added yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.name} className="card bg-base-200 shadow">
            <div className="card-body flex-row items-center gap-4">
              {item.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  className="w-12 h-12 object-contain rounded"
                />
              ) : null}
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                {item.description ? (
                  <p className="text-sm" style={{ color: "var(--po-body)" }}>
                    {item.description}
                  </p>
                ) : null}
                {item.url ? (
                  <a href={item.url} className="link link-primary text-sm">
                    Visit
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
