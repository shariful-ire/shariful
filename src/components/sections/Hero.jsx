export function Hero({ content }) {
  const { headline, subheadline, ctaLabel, ctaHref, imageUrl } = content;

  return (
    <section className="hero min-h-[70vh]">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={headline}
            className="max-w-sm rounded-box shadow-2xl"
          />
        ) : null}
        <div>
          <h1 className="text-5xl font-bold">{headline}</h1>
          {subheadline ? (
            <p className="py-6 text-lg" style={{ color: "var(--po-muted)" }}>
              {subheadline}
            </p>
          ) : null}
          {ctaLabel && ctaHref ? (
            <a href={ctaHref} className="btn btn-primary">
              {ctaLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
