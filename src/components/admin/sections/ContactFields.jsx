import { useFieldArray } from "react-hook-form";

export function ContactFields({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content.socials",
  });

  return (
    <div className="flex flex-col gap-3">
      <label className="form-control">
        <span className="label-text">Heading</span>
        <input className="input input-bordered" {...register("content.heading")} />
      </label>
      <label className="form-control">
        <span className="label-text">Email</span>
        <input className="input input-bordered" {...register("content.email")} />
      </label>
      <label className="form-control">
        <span className="label-text">Phone</span>
        <input className="input input-bordered" {...register("content.phone")} />
      </label>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              className="input input-bordered input-sm flex-1"
              placeholder="Label (e.g. GitHub)"
              {...register(`content.socials.${index}.label`)}
            />
            <input
              className="input input-bordered input-sm flex-1"
              placeholder="https://..."
              {...register(`content.socials.${index}.href`)}
            />
            <button
              type="button"
              className="btn btn-sm btn-error btn-outline"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-sm btn-outline self-start"
        onClick={() => append({ label: "", href: "" })}
      >
        + Add social link
      </button>
    </div>
  );
}
