/**
 * Renders a "custom" section: the admin defines `fieldSchema` (field builder)
 * and this component just walks it, rendering each field generically by
 * type — the same mechanism as every fixed section type, minus the fixed
 * shape. Adding a new field *value* type here is the only code change ever
 * needed for the field builder to support it.
 */
export function DynamicFields({ content, fieldSchema }) {
  if (!fieldSchema?.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p style={{ color: "var(--po-muted)" }}>
          This custom section has no fields defined yet.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-6">
        {fieldSchema.map((field) => (
          <DynamicField key={field.key} field={field} value={content?.[field.key]} />
        ))}
      </div>
    </section>
  );
}

function DynamicField({ field, value }) {
  if (value === undefined || value === null || value === "") {
    if (field.type !== "boolean") return null;
  }

  switch (field.type) {
    case "image":
      return value ? (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={field.label} className="rounded-box max-h-96 object-cover" />
        </figure>
      ) : null;
    case "url":
      return (
        <p>
          <a href={value} className="link link-primary">
            {field.label}
          </a>
        </p>
      );
    case "boolean":
      return (
        <p>
          <span className="font-semibold">{field.label}:</span>{" "}
          {value ? "Yes" : "No"}
        </p>
      );
    case "list":
      return (
        <div>
          <h3 className="font-semibold mb-2">{field.label}</h3>
          <ul className="list-disc list-inside" style={{ color: "var(--po-body)" }}>
            {(value || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case "richtext":
    case "textarea":
      return (
        <div>
          <h3 className="font-semibold mb-1">{field.label}</h3>
          <p className="whitespace-pre-line" style={{ color: "var(--po-body)" }}>
            {value}
          </p>
        </div>
      );
    default:
      return (
        <p>
          <span className="font-semibold">{field.label}:</span> {String(value)}
        </p>
      );
  }
}
