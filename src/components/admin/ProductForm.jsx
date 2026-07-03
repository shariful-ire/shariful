"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct, uploadDigitalAsset } from "@/lib/api/products";

/**
 * @param {{ mode: "create"|"edit", product?: any }} props
 */
export function ProductForm({ mode, product }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [digitalAsset, setDigitalAsset] = useState(product?.digitalAsset || null);
  const [uploadingAsset, setUploadingAsset] = useState(false);
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: isEdit
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: (product.price / 100).toFixed(2),
          currency: product.currency,
          images: (product.images || []).join(", "),
          isDigital: product.isDigital,
          stock: product.stock ?? "",
          status: product.status,
          tags: (product.tags || []).join(", "),
        }
      : {
          name: "",
          slug: "",
          description: "",
          price: "0.00",
          currency: "usd",
          images: "",
          isDigital: true,
          stock: "",
          status: "draft",
          tags: "",
        },
  });

  async function handleDigitalFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAsset(true);
    try {
      const asset = await uploadDigitalAsset(file);
      setDigitalAsset(asset);
    } catch (err) {
      setServerError(err.message || "Digital file upload failed");
    } finally {
      setUploadingAsset(false);
    }
  }

  async function onSubmit(values) {
    setServerError("");
    const payload = {
      ...values,
      price: Math.round(Number(values.price) * 100),
      images: values.images.split(",").map((s) => s.trim()).filter(Boolean),
      stock: values.stock === "" ? null : Number(values.stock),
      tags: values.tags.split(",").map((s) => s.trim()).filter(Boolean),
      digitalAsset: values.isDigital ? digitalAsset : null,
    };

    try {
      if (isEdit) {
        await updateProduct(product._id, payload);
      } else {
        await createProduct(payload);
      }
      router.push("/dashboard/products");
      router.refresh();
    } catch (err) {
      setServerError(err.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-2xl">
      <label className="form-control">
        <span className="label-text">Name</span>
        <input className="input input-bordered" {...register("name")} />
      </label>

      <label className="form-control">
        <span className="label-text">Slug</span>
        <input className="input input-bordered" {...register("slug")} />
      </label>

      <label className="form-control">
        <span className="label-text">Description</span>
        <textarea className="textarea textarea-bordered" rows={4} {...register("description")} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="form-control">
          <span className="label-text">Price</span>
          <input type="number" step="0.01" className="input input-bordered" {...register("price")} />
        </label>
        <label className="form-control">
          <span className="label-text">Currency</span>
          <input className="input input-bordered" maxLength={3} {...register("currency")} />
        </label>
      </div>

      <label className="form-control">
        <span className="label-text">Image URLs (comma-separated)</span>
        <input className="input input-bordered" {...register("images")} />
      </label>

      <label className="label cursor-pointer gap-2 self-start">
        <span className="label-text">Digital product</span>
        <input type="checkbox" className="toggle toggle-primary" {...register("isDigital")} />
      </label>

      <div>
        <span className="label-text block mb-1">Digital file</span>
        {digitalAsset ? (
          <p className="text-sm text-success mb-2">
            Uploaded: {digitalAsset.publicId}
          </p>
        ) : null}
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          onChange={handleDigitalFileChange}
          disabled={uploadingAsset}
        />
        {uploadingAsset ? (
          <p className="text-sm" style={{ color: "var(--po-muted)" }}>
            Uploading...
          </p>
        ) : null}
      </div>

      <label className="form-control max-w-xs">
        <span className="label-text">Stock (blank = unlimited/digital)</span>
        <input type="number" className="input input-bordered" {...register("stock")} />
      </label>

      <label className="form-control">
        <span className="label-text">Tags (comma-separated)</span>
        <input className="input input-bordered" {...register("tags")} />
      </label>

      <label className="form-control max-w-xs">
        <span className="label-text">Status</span>
        <select className="select select-bordered" {...register("status")}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>

      {serverError ? <p className="text-error text-sm">{serverError}</p> : null}

      <div className="flex gap-3">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save product"}
        </button>
        <a href="/dashboard/products" className="btn btn-ghost">
          Cancel
        </a>
      </div>
    </form>
  );
}
