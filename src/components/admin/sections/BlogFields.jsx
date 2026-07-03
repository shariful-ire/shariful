export function BlogFields({ register }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="form-control">
        <span className="label-text">Heading</span>
        <input className="input input-bordered" {...register("content.heading")} />
      </label>
      <label className="form-control max-w-xs">
        <span className="label-text">Posts to show</span>
        <input
          type="number"
          min="1"
          max="12"
          className="input input-bordered"
          {...register("content.postCount")}
        />
      </label>
      <p className="text-sm" style={{ color: "var(--po-muted)" }}>
        Manage the actual posts from the{" "}
        <a href="/dashboard/blog" className="link link-primary">
          Blog
        </a>{" "}
        tab.
      </p>
    </div>
  );
}
