export function AboutFields({ register }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="form-control">
        <span className="label-text">Heading</span>
        <input className="input input-bordered" {...register("content.heading")} />
      </label>
      <label className="form-control">
        <span className="label-text">Body</span>
        <textarea
          className="textarea textarea-bordered"
          rows={6}
          {...register("content.body")}
        />
      </label>
      <label className="form-control">
        <span className="label-text">Image URL</span>
        <input className="input input-bordered" {...register("content.imageUrl")} />
      </label>
    </div>
  );
}
