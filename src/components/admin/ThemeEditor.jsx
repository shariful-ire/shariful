"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listThemes, activateTheme } from "@/lib/api/theme";
import { ThemeForm } from "./ThemeForm";

export function ThemeEditor() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { data: themes = [], isLoading, error } = useQuery({
    queryKey: ["themes"],
    queryFn: listThemes,
  });

  const activateMutation = useMutation({
    mutationFn: (id) => activateTheme(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      queryClient.invalidateQueries({ queryKey: ["theme"] });
    },
  });

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading themes...</p>;

  if (error) {
    return (
      <p className="text-error">
        Couldn&apos;t load themes: {error.message}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {themes.length ? (
        <ul className="flex flex-col gap-2">
          {themes.map((theme) => (
            <li
              key={theme._id}
              className="card bg-base-200 flex-row items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold">{theme.name}</span>
                {theme.isActive ? (
                  <span className="badge badge-success">Active</span>
                ) : null}
                <div className="flex gap-1">
                  {[theme.light.primary, theme.light.secondary, theme.light.accent].map(
                    (c) => (
                      <span
                        key={c}
                        className="w-4 h-4 rounded-full border border-base-300"
                        style={{ background: c }}
                      />
                    )
                  )}
                </div>
              </div>
              {!theme.isActive ? (
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => activateMutation.mutate(theme._id)}
                >
                  Activate
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--po-muted)" }}>No themes yet — create one below.</p>
      )}

      {showForm ? (
        <ThemeForm
          onCreated={() => {
            setShowForm(false);
            queryClient.invalidateQueries({ queryKey: ["themes"] });
          }}
        />
      ) : (
        <button
          type="button"
          className="btn btn-outline self-start"
          onClick={() => setShowForm(true)}
        >
          + New theme
        </button>
      )}
    </div>
  );
}
