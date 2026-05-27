"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: number;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  status: "PENDING" | "CONFIRMED" | "EXPIRED" | "CANCELLED";
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchBookings() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/bookings");

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();

      setBookings(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function updateStatus(id: number, status: string) {
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    fetchBookings();
  }

  return (
    <section className="min-h-screen bg-[#fafaf8] p-8">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-4xl font-light text-[#1a1a18]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Admin Dashboard
        </h1>
        <p className="text-neutral-500 text-sm mt-2">
          Manage bookings and availability
        </p>
      </div>

      {/* States */}
      {loading && <p className="text-neutral-500">Loading bookings...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {/* Content */}
      <div className="grid gap-6">
        {!loading && !error && bookings.length === 0 && (
          <p className="text-neutral-500">No bookings yet.</p>
        )}

        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
          >
            {/* Info */}
            <div>
              <h2 className="text-lg font-medium">{b.guestName}</h2>
              <p className="text-sm text-neutral-500">{b.guestEmail}</p>

              <p className="text-sm mt-2 text-neutral-600">
                {new Date(b.checkIn).toDateString()} →{" "}
                {new Date(b.checkOut).toDateString()}
              </p>

              <p className="text-xs mt-1 text-neutral-400">
                Guests: {b.guestsCount}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full
                  ${
                    b.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : b.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.status === "EXPIRED"
                          ? "bg-red-100 text-red-600"
                          : "bg-neutral-100 text-neutral-600"
                  }`}
              >
                {b.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {b.status === "PENDING" && (
                <button
                  onClick={() => updateStatus(b.id, "CONFIRMED")}
                  className="px-4 py-2 rounded-xl bg-[#2d4a3e] text-white text-sm"
                >
                  Confirm
                </button>
              )}

              {b.status !== "CANCELLED" && (
                <button
                  onClick={() => updateStatus(b.id, "CANCELLED")}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
