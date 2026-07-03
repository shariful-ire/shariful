export function Skills({ content }) {
  const { heading, items } = content;

  if (!items?.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>No skills added yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((skill) => (
          <div key={skill.name} className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">{skill.name}</h3>
              {typeof skill.level === "number" ? (
                <progress
                  className="progress progress-primary w-full"
                  value={skill.level}
                  max="100"
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
