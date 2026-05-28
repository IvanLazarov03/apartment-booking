"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
export default function AdminLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin/dashboard");
  }

  const inputClass =
    "w-full rounded-2xl border border-neutral-200 bg-white text-black px-4 py-3 text-sm outline-none transition-all focus:border-[#2d4a3e]";

  return (
    <section className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-6">
      <div
        className="
          w-full max-w-md
          rounded-4xl
          border border-white/60
          bg-white/75
          backdrop-blur-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          p-8
        "
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
            Habitat Admin
          </span>

          <h1
            className="mt-3 text-5xl text-[#1a1a18] font-light"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Welcome Back
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Sign in to manage bookings and availability.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-neutral-600 mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@habitat.com"
              className={inputClass}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-neutral-600 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                rounded-2xl
                border border-red-200
                bg-red-50
                px-4 py-3
                text-sm text-red-500
              "
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-2xl
              bg-[#2d4a3e]
              px-5 py-3
              text-sm font-medium text-white
              transition-all
              hover:bg-[#243a31]
              disabled:opacity-60
              cursor-pointer
            "
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}
