import { useFieldArray } from "react-hook-form";

export function ProjectsFields({ register, control }) {
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
              <textarea
                className="textarea textarea-bordered textarea-sm"
                placeholder="Description"
                rows={2}
                {...register(`content.items.${index}.description`)}
              />
              <input
                className="input input-bordered input-sm"
                placeholder="Image URL"
                {...register(`content.items.${index}.imageUrl`)}
              />
              <div className="flex gap-2">
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Live URL"
                  {...register(`content.items.${index}.liveUrl`)}
                />
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Repo URL"
                  {...register(`content.items.${index}.repoUrl`)}
                />
              </div>
              <input
                className="input input-bordered input-sm"
                placeholder="Tags (comma-separated)"
                {...register(`content.items.${index}.tags`)}
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
          append({
            title: "",
            description: "",
            imageUrl: "",
            liveUrl: "",
            repoUrl: "",
            tags: "",
          })
        }
      >
        + Add project
      </button>
    </div>
  );
}
