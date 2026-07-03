import { useFieldArray } from "react-hook-form";

export function GalleryFields({ register, control }) {
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
          <div key={field.id} className="flex gap-2">
            <input
              className="input input-bordered input-sm flex-1"
              placeholder="Image URL"
              {...register(`content.items.${index}.imageUrl`)}
            />
            <input
              className="input input-bordered input-sm flex-1"
              placeholder="Caption"
              {...register(`content.items.${index}.caption`)}
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
        onClick={() => append({ imageUrl: "", caption: "" })}
      >
        + Add image
      </button>
    </div>
  );
}
