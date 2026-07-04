import { useFieldArray } from "react-hook-form";

const FIELD_TYPES = ["text", "textarea", "number", "boolean", "url", "image", "richtext", "list"];

/**
 * The "custom" section type's editor: a field builder (define the shape)
 * plus, for each defined field, the matching content input — both driven
 * by the same `fieldSchema` array so they can never drift apart.
 */
export function CustomSectionFields({ register, control, watch, setValue }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldSchema",
  });
  const currentFields = watch("fieldSchema") || [];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-semibold mb-3">Field builder</h3>
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="card bg-base-100 border border-base-300">
              <div className="card-body gap-2 p-4">
                <div className="flex gap-2">
                  <input
                    className="input input-bordered input-sm flex-1"
                    placeholder="Key (e.g. quote)"
                    {...register(`fieldSchema.${index}.key`)}
                  />
                  <input
                    className="input input-bordered input-sm flex-1"
                    placeholder="Label (e.g. Quote)"
                    {...register(`fieldSchema.${index}.label`)}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <select
                    className="select select-bordered select-sm"
                    {...register(`fieldSchema.${index}.type`)}
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text text-sm">Required</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-sm"
                      {...register(`fieldSchema.${index}.required`)}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-sm btn-error btn-outline ml-auto"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline mt-3"
          onClick={() =>
            append({ key: "", label: "", type: "text", required: false })
          }
        >
          + Add field
        </button>
      </div>

      {currentFields.length ? (
        <div>
          <h3 className="font-semibold mb-3">Content</h3>
          <div className="flex flex-col gap-3">
            {currentFields.map((field, index) =>
              field.key ? (
                <ContentInput
                  key={`${field.key}-${index}`}
                  field={field}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              ) : null
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ContentInput({ field, register, watch, setValue }) {
  const name = `content.${field.key}`;

  if (field.type === "boolean") {
    return (
      <label className="label cursor-pointer gap-2 self-start">
        <span className="label-text">{field.label}</span>
        <input type="checkbox" className="toggle" {...register(name)} />
      </label>
    );
  }

  if (field.type === "list") {
    const value = watch(name);
    const text = Array.isArray(value) ? value.join(", ") : value || "";
    return (
      <label className="form-control">
        <span className="label-text">{field.label} (comma-separated)</span>
        <input
          className="input input-bordered"
          defaultValue={text}
          onChange={(e) =>
            setValue(
              name,
              e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
            )
          }
        />
      </label>
    );
  }

  if (field.type === "textarea" || field.type === "richtext") {
    return (
      <label className="form-control">
        <span className="label-text">{field.label}</span>
        <textarea
          className="textarea textarea-bordered"
          rows={4}
          placeholder={field.placeholder}
          {...register(name)}
        />
      </label>
    );
  }

  return (
    <label className="form-control">
      <span className="label-text">{field.label}</span>
      <input
        type={field.type === "number" ? "number" : "text"}
        className="input input-bordered"
        placeholder={field.placeholder}
        {...register(name)}
      />
    </label>
  );
}
