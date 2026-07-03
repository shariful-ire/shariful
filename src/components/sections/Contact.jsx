export function Contact({ content }) {
  const { heading, email, phone, socials } = content;

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">{heading}</h2>
      <div className="flex flex-col items-center gap-2">
        {email ? (
          <a href={`mailto:${email}`} className="link link-primary">
            {email}
          </a>
        ) : null}
        {phone ? <p style={{ color: "var(--po-body)" }}>{phone}</p> : null}
      </div>
      {socials?.length ? (
        <div className="flex justify-center gap-4 mt-6">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              className="btn btn-outline btn-sm"
            >
              {social.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
