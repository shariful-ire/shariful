"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listMedia, uploadMedia, deleteMediaAsset } from "@/lib/api/media";

export function MediaLibrary() {
  const queryClient = useQueryClient();
  const [uploadError, setUploadError] = useState("");
  const [copiedId, setCopiedId] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: listMedia,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadMedia,
    onSuccess: () => {
      setUploadError("");
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
    onError: (err) => setUploadError(err.message || "Upload failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMediaAsset,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media"] }),
  });

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
    e.target.value = "";
  }

  function copyUrl(asset) {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset._id);
    setTimeout(() => setCopiedId(""), 1500);
  }

  return (
    <div className="flex flex-col gap-6">
      <label className="btn btn-primary self-start">
        {uploadMutation.isPending ? "Uploading..." : "Upload image"}
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploadMutation.isPending}
        />
      </label>

      {uploadError ? <p className="text-error text-sm">{uploadError}</p> : null}

      {isLoading ? (
        <p style={{ color: "var(--po-muted)" }}>Loading media...</p>
      ) : !assets.length ? (
        <p style={{ color: "var(--po-muted)" }}>No media uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div key={asset._id} className="card bg-base-200 shadow">
              <figure className="h-32 bg-base-300">
                {asset.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset.url}
                    alt={asset.alt || ""}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-sm">
                    {asset.type}
                  </span>
                )}
              </figure>
              <div className="card-body p-3 gap-2">
                <button
                  type="button"
                  className="btn btn-xs btn-outline"
                  onClick={() => copyUrl(asset)}
                >
                  {copiedId === asset._id ? "Copied!" : "Copy URL"}
                </button>
                <button
                  type="button"
                  className="btn btn-xs btn-error btn-outline"
                  onClick={() => {
                    if (confirm("Delete this asset?")) {
                      deleteMutation.mutate(asset._id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
