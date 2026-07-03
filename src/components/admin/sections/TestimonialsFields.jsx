import { useFieldArray } from "react-hook-form";

export function TestimonialsFields({ register, control }) {
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
              <div className="flex gap-2">
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Name"
                  {...register(`content.items.${index}.name`)}
                />
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Role"
                  {...register(`content.items.${index}.role`)}
                />
              </div>
              <textarea
                className="textarea textarea-bordered textarea-sm"
                placeholder="Quote"
                rows={2}
                {...register(`content.items.${index}.quote`)}
              />
              <input
                className="input input-bordered input-sm"
                placeholder="Avatar URL"
                {...register(`content.items.${index}.avatarUrl`)}
              />
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
        onClick={() => append({ name: "", role: "", quote: "", avatarUrl: "" })}
      >
        + Add testimonial
      </button>
    </div>
  );
}
