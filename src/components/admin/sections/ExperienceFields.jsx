import { useFieldArray } from "react-hook-form";

export function ExperienceFields({ register, control }) {
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
                  placeholder="Company"
                  {...register(`content.items.${index}.company`)}
                />
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Role"
                  {...register(`content.items.${index}.role`)}
                />
              </div>
              <div className="flex gap-2">
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Start date"
                  {...register(`content.items.${index}.startDate`)}
                />
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="End date (blank = present)"
                  {...register(`content.items.${index}.endDate`)}
                />
              </div>
              <textarea
                className="textarea textarea-bordered textarea-sm"
                placeholder="Description"
                rows={2}
                {...register(`content.items.${index}.description`)}
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
          append({ company: "", role: "", startDate: "", endDate: "", description: "" })
        }
      >
        + Add experience
      </button>
    </div>
  );
}
