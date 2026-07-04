/**
 * Horizontal ranking of top pages by view count — magnitude, one hue,
 * direct labels (path + count) since there are only ever ≤10 bars.
 * @param {{ data: Array<{path: string, count: number}> }} props
 */
export function TopPagesChart({ data }) {
  if (!data.length) {
    return <p style={{ color: "var(--po-muted)" }}>No page views recorded yet.</p>;
  }

  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <ul className="flex flex-col gap-2">
      {data.map((d) => (
        <li key={d.path} className="flex items-center gap-3">
          <span className="text-sm w-40 truncate" title={d.path}>
            {d.path}
          </span>
          <div className="flex-1 bg-base-300 rounded-box h-4 overflow-hidden">
            <div
              className="h-full rounded-box"
              style={{
                width: `${(d.count / max) * 100}%`,
                background: "var(--color-primary)",
              }}
            />
          </div>
          <span className="text-sm w-10 text-right">{d.count}</span>
        </li>
      ))}
    </ul>
  );
}
