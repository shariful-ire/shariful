import { useFieldArray } from "react-hook-form";

export function SkillsFields({ register, control }) {
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
                  placeholder="Skill name"
                  {...register(`content.items.${index}.name`)}
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="input input-bordered input-sm w-24"
                  placeholder="Level %"
                  {...register(`content.items.${index}.level`)}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-error btn-outline"
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
        className="btn btn-sm btn-outline self-start"
        onClick={() => append({ name: "", level: 50 })}
      >
        + Add skill
      </button>
    </div>
  );
}
