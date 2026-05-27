"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type BlockedDate = {
  id: number;
  startDate: string;
  endDate: string;
  reason: string | null;
  bookingId: number | null;
  booking?: {
    id: number;
    guestName: string;
    status: string;
  } | null;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

export default function AdminBlockedDates() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  async function fetchBlockedDates() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/availability");

      if (!res.ok) {
        throw new Error("Failed to fetch blocked dates");
      }

      const data = await res.json();

      setBlockedDates(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadInitialBlockedDates() {
      try {
        const res = await fetch("/api/availability");

        if (!res.ok) {
          throw new Error("Failed to fetch blocked dates");
        }

        const data = await res.json();

        setBlockedDates(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    void loadInitialBlockedDates();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to block dates");
      }

      setForm({ startDate: "", endDate: "", reason: "" });
      fetchBlockedDates();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function deleteBlockedDate(id: number) {
    try {
      setError(null);

      const res = await fetch(`/api/availability?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to remove blocked date");
      }

      fetchBlockedDates();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black outline-none transition-all focus:border-[#2d4a3e]";

  return (
    <section className="min-h-screen bg-[#fafaf8] p-6 md:p-8">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
            Habitat Admin
          </span>
          <h1
            className="mt-3 text-4xl font-light text-[#1a1a18] md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Blocked Dates
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Manually close dates for maintenance, private stays, or unavailable periods.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/dashboard"
            className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition-all hover:bg-neutral-50"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/bookings"
            className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition-all hover:bg-neutral-50"
          >
            Bookings
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <h2
            className="text-2xl font-light text-[#1a1a18]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Add Manual Block
          </h2>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-neutral-600">Start date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-600">End date</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-600">Reason</label>
              <input
                type="text"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="Maintenance"
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-6 w-full rounded-2xl bg-[#2d4a3e] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[#243a31] disabled:opacity-60"
          >
            {saving ? "Blocking..." : "Block Dates"}
          </button>
        </form>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2
            className="text-2xl font-light text-[#1a1a18]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Current Blocked Dates
          </h2>

          {loading && <p className="mt-5 text-sm text-neutral-500">Loading dates...</p>}

          {!loading && blockedDates.length === 0 && (
            <p className="mt-5 text-sm text-neutral-500">No blocked dates yet.</p>
          )}

          <div className="mt-5 space-y-3">
            {blockedDates.map((blockedDate) => (
              <div
                key={blockedDate.id}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-[#fafaf8] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-[#1a1a18]">
                    {formatDate(blockedDate.startDate)} - {formatDate(blockedDate.endDate)}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {blockedDate.bookingId
                      ? `Booking #${blockedDate.bookingId}${blockedDate.booking?.guestName ? `, ${blockedDate.booking.guestName}` : ""}`
                      : blockedDate.reason || "Manual block"}
                  </p>
                </div>

                {blockedDate.bookingId ? (
                  <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
                    Booking
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => deleteBlockedDate(blockedDate.id)}
                    className="w-fit rounded-2xl bg-red-500 px-4 py-2 text-sm text-white transition-all hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
