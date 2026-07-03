import { useFieldArray } from "react-hook-form";

export function ResearchFields({ register, control }) {
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
                placeholder="Title"
                {...register(`content.items.${index}.title`)}
              />
              <div className="flex gap-2">
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Publisher"
                  {...register(`content.items.${index}.publisher`)}
                />
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Date"
                  {...register(`content.items.${index}.date`)}
                />
              </div>
              <textarea
                className="textarea textarea-bordered textarea-sm"
                placeholder="Description"
                rows={2}
                {...register(`content.items.${index}.description`)}
              />
              <input
                className="input input-bordered input-sm"
                placeholder="URL"
                {...register(`content.items.${index}.url`)}
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
        onClick={() =>
          append({ title: "", publisher: "", date: "", description: "", url: "" })
        }
      >
        + Add research entry
      </button>
    </div>
  );
}
