"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "@/lib/auth/client";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values) {
    setServerError("");
    const { error } = await signIn.email({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setServerError(error.message || "Invalid email or password");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-sm bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Sign in to PortfolioOS</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="divider">or</div>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              signIn.social({ provider: "google", callbackURL: "/dashboard" })
            }
          >
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4">
            No account?{" "}
            <a href="/register" className="link link-primary">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
