"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUp } from "@/lib/auth/client";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values) {
    setServerError("");
    const { error } = await signUp.email(values);
    if (error) {
      setServerError(error.message || "Could not create account");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-sm bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Create an account</h1>
          <p className="text-sm" style={{ color: "var(--po-muted)" }}>
            New accounts start as viewers. An admin promotes you when needed.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <label className="form-control">
              <span className="label-text">Name</span>
              <input className="input input-bordered" {...register("name")} />
              {errors.name ? (
                <span className="text-error text-sm">{errors.name.message}</span>
              ) : null}
            </label>

            <label className="form-control">
              <span className="label-text">Email</span>
              <input
                type="email"
                className="input input-bordered"
                {...register("email")}
              />
              {errors.email ? (
                <span className="text-error text-sm">{errors.email.message}</span>
              ) : null}
            </label>

            <label className="form-control">
              <span className="label-text">Password</span>
              <input
                type="password"
                className="input input-bordered"
                {...register("password")}
              />
              {errors.password ? (
                <span className="text-error text-sm">
                  {errors.password.message}
                </span>
              ) : null}
            </label>

            {serverError ? (
              <p className="text-error text-sm">{serverError}</p>
            ) : null}

            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="link link-primary">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
