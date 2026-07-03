export function HeroFields({ register }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="form-control">
        <span className="label-text">Headline</span>
        <input className="input input-bordered" {...register("content.headline")} />
      </label>
      <label className="form-control">
        <span className="label-text">Subheadline</span>
        <input className="input input-bordered" {...register("content.subheadline")} />
      </label>
      <label className="form-control">
        <span className="label-text">CTA label</span>
        <input className="input input-bordered" {...register("content.ctaLabel")} />
      </label>
      <label className="form-control">
        <span className="label-text">CTA link</span>
        <input className="input input-bordered" {...register("content.ctaHref")} />
      </label>
      <label className="form-control">
        <span className="label-text">Image URL</span>
        <input className="input input-bordered" {...register("content.imageUrl")} />
      </label>
    </div>
  );
}
