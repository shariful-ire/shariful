"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSections,
  updateSection,
  deleteSection,
  reorderSections,
} from "@/lib/api/sections";

/** Drag-reorder uses native HTML5 DnD — no extra dependency needed for this list size. */
export function SectionsManager({ initialSections }) {
  const queryClient = useQueryClient();
  const [dragId, setDragId] = useState(null);

  const { data: sections = [] } = useQuery({
    queryKey: ["sections"],
    queryFn: getSections,
    initialData: initialSections,
  });

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["sections"] });
  }

  const toggleMutation = useMutation({
    mutationFn: ({ id, patch }) => updateSection(id, patch),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSection(id),
    onSuccess: invalidate,
  });

  const reorderMutation = useMutation({
    mutationFn: (updates) => reorderSections(updates),
    onSuccess: invalidate,
  });

  function handleDrop(targetId) {
    if (!dragId || dragId === targetId) return;
    const ordered = [...sections].sort((a, b) => a.order - b.order);
    const fromIndex = ordered.findIndex((s) => s._id === dragId);
    const toIndex = ordered.findIndex((s) => s._id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const reordered = [...ordered];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);

    reorderMutation.mutate(
      reordered.map((s, index) => ({ id: s._id, order: index }))
    );
    setDragId(null);
  }

  if (!sections.length) {
    return (
      <p style={{ color: "var(--po-muted)" }}>
        No sections yet. Create your first one to get started.
      </p>
    );
  }

  const ordered = [...sections].sort((a, b) => a.order - b.order);

  return (
    <ul className="flex flex-col gap-2">
      {ordered.map((section) => (
        <li
          key={section._id}
          draggable
          onDragStart={() => setDragId(section._id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(section._id)}
          className="card bg-base-200 cursor-move"
        >
          <div className="card-body flex-row items-center justify-between py-3">
            <div>
              <p className="font-semibold capitalize">
                {section.type} — {section.slug}
              </p>
              <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                order: {section.order}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="label cursor-pointer gap-2">
                <span className="label-text text-xs">Visible</span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm toggle-primary"
                  checked={section.isVisible}
                  onChange={(e) =>
                    toggleMutation.mutate({
                      id: section._id,
                      patch: { isVisible: e.target.checked },
                    })
                  }
                />
              </label>

              <label className="label cursor-pointer gap-2">
                <span className="label-text text-xs">Published</span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm toggle-success"
                  checked={section.isPublished}
                  onChange={(e) =>
                    toggleMutation.mutate({
                      id: section._id,
                      patch: { isPublished: e.target.checked },
                    })
                  }
                />
              </label>

              <a
                href={`/dashboard/sections/${section._id}/edit`}
                className="btn btn-sm btn-ghost"
              >
                Edit
              </a>
              <button
                type="button"
                className="btn btn-sm btn-error btn-outline"
                onClick={() => {
                  if (confirm(`Delete "${section.slug}"?`)) {
                    deleteMutation.mutate(section._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
