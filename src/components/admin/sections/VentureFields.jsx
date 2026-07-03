import { useFieldArray } from "react-hook-form";

/** Shared by Startup and Business — both use the same {name, description, url, logoUrl} shape. */
export function VentureFields({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content.items",
  });

  return (
    <div className="flex flex-col gap-3">
      <label className="form-control">
        <span className="label-text">Heading</span>
        <input className="input input-bordered" {...register("content.heading")} />
      </label>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="card bg-base-100 border border-base-300">
            <div className="card-body gap-2 p-4">
              <input
                className="input input-bordered input-sm"
                placeholder="Name"
                {...register(`content.items.${index}.name`)}
              />
              <textarea
                className="textarea textarea-bordered textarea-sm"
                placeholder="Description"
                rows={2}
                {...register(`content.items.${index}.description`)}
              />
              <div className="flex gap-2">
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="URL"
                  {...register(`content.items.${index}.url`)}
                />
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Logo URL"
                  {...register(`content.items.${index}.logoUrl`)}
                />
              </div>
              <button
                type="button"
                className="btn btn-sm btn-error btn-outline self-start"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-sm btn-outline self-start"
        onClick={() => append({ name: "", description: "", url: "", logoUrl: "" })}
      >
        + Add
      </button>
    </div>
  );
}
