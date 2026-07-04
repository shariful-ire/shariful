"use client";

import { useState } from "react";

const HEIGHT = 200;
const BAR_GAP = 2;

/**
 * A single-series magnitude-over-time chart (page views per day). One hue
 * (the theme's primary token) is enough — a single series needs no legend,
 * per the dataviz method. Thin bars, rounded data-ends, a recessive
 * baseline, and a hover tooltip; a plain-text table underneath so the data
 * is never color-only.
 * @param {{ data: Array<{date: string, count: number}> }} props
 */
export function ViewsBarChart({ data }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data.length) {
    return <p style={{ color: "var(--po-muted)" }}>No views recorded yet.</p>;
  }

  const max = Math.max(...data.map((d) => d.count), 1);
  const barWidth = 100 / data.length;

  return (
    <div>
      <div className="relative" style={{ height: HEIGHT }}>
        <svg
          viewBox={`0 0 100 ${HEIGHT}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="Page views per day"
        >
          <line
            x1="0"
            y1={HEIGHT - 1}
            x2="100"
            y2={HEIGHT - 1}
            stroke="var(--color-base-300)"
            strokeWidth="1"
          />
          {data.map((d, i) => {
            const barHeight = (d.count / max) * (HEIGHT - 16);
            const x = i * barWidth + BAR_GAP / 2;
            const width = Math.max(barWidth - BAR_GAP, 1);
            return (
              <rect
                key={d.date}
                x={x}
                y={HEIGHT - barHeight - 1}
                width={width}
                height={barHeight}
                rx="1.5"
                fill="var(--color-primary)"
                opacity={hoverIndex === null || hoverIndex === i ? 1 : 0.45}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              />
            );
          })}
        </svg>
        {hoverIndex !== null ? (
          <div
            className="absolute top-0 -translate-y-full rounded-box bg-neutral text-neutral-content text-xs px-2 py-1 pointer-events-none"
            style={{ left: `${hoverIndex * barWidth + barWidth / 2}%`, transform: "translate(-50%, -110%)" }}
          >
            {data[hoverIndex].date}: {data[hoverIndex].count}
          </div>
        ) : null}
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm" style={{ color: "var(--po-muted)" }}>
          View as table
        </summary>
        <table className="table table-sm mt-2">
          <thead>
            <tr>
              <th>Date</th>
              <th className="text-right">Views</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.date}>
                <td>{d.date}</td>
                <td className="text-right">{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
