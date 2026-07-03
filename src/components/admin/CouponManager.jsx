"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { listCoupons, createCoupon, deleteCoupon } from "@/lib/api/coupons";

export function CouponManager() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [serverError, setServerError] = useState("");

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: listCoupons,
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      code: "",
      discountType: "percent",
      discountValue: 10,
      maxUses: "",
      expiresAt: "",
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["coupons"] }),
  });

  async function onSubmit(values) {
    setServerError("");
    try {
      await createCoupon({
        ...values,
        discountValue: Number(values.discountValue),
        maxUses: values.maxUses === "" ? null : Number(values.maxUses),
        expiresAt: values.expiresAt
          ? new Date(values.expiresAt).toISOString()
          : undefined,
      });
      reset();
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    } catch (err) {
      setServerError(err.message || "Could not create coupon");
    }
  }

  if (isLoading) return <p style={{ color: "var(--po-muted)" }}>Loading coupons...</p>;

  return (
    <div className="flex flex-col gap-6">
      {coupons.length ? (
        <ul className="flex flex-col gap-2">
          {coupons.map((coupon) => (
            <li key={coupon._id} className="card bg-base-200">
              <div className="card-body flex-row items-center justify-between py-3">
                <div>
                  <p className="font-semibold">{coupon.code}</p>
                  <p className="text-sm" style={{ color: "var(--po-muted)" }}>
                    {coupon.discountType === "percent"
                      ? `${coupon.discountValue}% off`
                      : `${coupon.discountValue} off`}{" "}
                    · used {coupon.usedCount}
                    {coupon.maxUses ? `/${coupon.maxUses}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-error btn-outline"
                  onClick={() => deleteMutation.mutate(coupon._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--po-muted)" }}>No coupons yet.</p>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-sm">
          <input className="input input-bordered" placeholder="CODE" {...register("code")} />
          <select className="select select-bordered" {...register("discountType")}>
            <option value="percent">Percent off</option>
            <option value="fixed">Fixed amount off (smallest unit)</option>
          </select>
          <input
            type="number"
            className="input input-bordered"
            placeholder="Discount value"
            {...register("discountValue")}
          />
          <input
            type="number"
            className="input input-bordered"
            placeholder="Max uses (blank = unlimited)"
            {...register("maxUses")}
          />
          <input type="date" className="input input-bordered" {...register("expiresAt")} />
          {serverError ? <p className="text-error text-sm">{serverError}</p> : null}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create coupon"}
          </button>
        </form>
      ) : (
        <button type="button" className="btn btn-outline self-start" onClick={() => setShowForm(true)}>
          + New coupon
        </button>
      )}
    </div>
  );
}
