"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { status } = useSession();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [status, router]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    if (result?.error) {
      setLoading(false);
      setError("Invalid email or password");
      return;
    }

    // Sync server session to client first — useEffect handles the redirect
    // once status becomes "authenticated"
    router.refresh();
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
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Welcome Back
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Sign in to manage bookings and availability.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          method="POST"
          action="/api/auth/callback/credentials"
          className="space-y-5"
        >
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
          <div className="relative">
            <label className="block text-sm text-neutral-600 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass + " pr-10"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 top-7 flex items-center text-neutral-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
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
