export function Projects({ content }) {
  const { heading, items } = content;

  if (!items?.length) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p style={{ color: "var(--po-muted)" }}>No projects added yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project) => (
          <div key={project.title} className="card bg-base-200 shadow">
            {project.imageUrl ? (
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-40 w-full object-cover"
                />
              </figure>
            ) : null}
            <div className="card-body">
              <h3 className="card-title">{project.title}</h3>
              {project.description ? (
                <p style={{ color: "var(--po-body)" }}>{project.description}</p>
              ) : null}
              {project.tags?.length ? (
                <div className="flex flex-wrap gap-2 my-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge badge-accent badge-outline">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="card-actions justify-end">
                {project.liveUrl ? (
                  <a href={project.liveUrl} className="btn btn-sm btn-primary">
                    Live
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a href={project.repoUrl} className="btn btn-sm btn-ghost">
                    Code
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
