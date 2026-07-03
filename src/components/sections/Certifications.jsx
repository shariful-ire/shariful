export function Certifications({ content }) {
  const { heading, items } = content;

  if (!items?.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>No certifications yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="card bg-base-200 shadow">
            <div className="card-body flex-row items-center gap-4">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-12 h-12 object-contain"
                />
              ) : null}
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                  {[item.issuer, item.date].filter(Boolean).join(" · ")}
                </p>
                {item.credentialUrl ? (
                  <a href={item.credentialUrl} className="link link-primary text-sm">
                    View credential
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
