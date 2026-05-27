"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Booking = {
  id: number;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  status: string;
  createdAt: string;
};

type BlockedDate = {
  id: number;
  startDate: string;
  endDate: string;
  reason: string | null;
  bookingId: number | null;
};

const NIGHTLY_RATE = 50;

function normalizeStatus(status: string) {
  return status.toUpperCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function nightsBetween(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const [bookingsRes, availabilityRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/availability"),
        ]);

        if (!bookingsRes.ok || !availabilityRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const [bookingsData, availabilityData] = await Promise.all([
          bookingsRes.json(),
          availabilityRes.json(),
        ]);

        setBookings(bookingsData);
        setBlockedDates(availabilityData);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    void fetchDashboardData();
  }, []);

  const stats = useMemo(() => {
    const confirmedBookings = bookings.filter(
      (booking) => normalizeStatus(booking.status) === "CONFIRMED",
    );
    const pendingBookings = bookings.filter(
      (booking) => normalizeStatus(booking.status) === "PENDING",
    );
    const cancelledBookings = bookings.filter(
      (booking) => normalizeStatus(booking.status) === "CANCELLED",
    );
    const confirmedNights = confirmedBookings.reduce(
      (total, booking) =>
        total + nightsBetween(booking.checkIn, booking.checkOut),
      0,
    );

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthlyNights = confirmedBookings.reduce((total, booking) => {
      const checkIn = new Date(booking.checkIn);

      if (
        checkIn.getMonth() !== currentMonth ||
        checkIn.getFullYear() !== currentYear
      ) {
        return total;
      }

      return total + nightsBetween(booking.checkIn, booking.checkOut);
    }, 0);

    const nextThirtyDays = new Date();
    nextThirtyDays.setDate(now.getDate() + 30);

    const blockedNextThirty = blockedDates.reduce((total, blockedDate) => {
      const start = new Date(blockedDate.startDate);
      const end = new Date(blockedDate.endDate);
      const rangeStart = start > now ? start : now;
      const rangeEnd = end < nextThirtyDays ? end : nextThirtyDays;

      if (rangeEnd <= rangeStart) return total;

      return (
        total +
        Math.ceil(
          (rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24),
        )
      );
    }, 0);

    return {
      totalBookings: bookings.length,
      confirmedBookings: confirmedBookings.length,
      pendingBookings: pendingBookings.length,
      cancelledBookings: cancelledBookings.length,
      estimatedRevenue: confirmedNights * NIGHTLY_RATE,
      monthlyRevenue: monthlyNights * NIGHTLY_RATE,
      occupancyRate: Math.min(100, Math.round((blockedNextThirty / 30) * 100)),
      manuallyBlocked: blockedDates.filter((date) => !date.bookingId).length,
    };
  }, [bookings, blockedDates]);

  const recentBookings = bookings.slice(0, 5);
  const upcomingBlocks = blockedDates
    .filter((blockedDate) => new Date(blockedDate.endDate) >= new Date())
    .slice(0, 5);

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
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Revenue, bookings, and availability at a glance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/bookings"
            className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition-all hover:bg-neutral-50"
          >
            Bookings
          </Link>
          <Link
            href="/admin/blocked-dates"
            className="rounded-2xl bg-[#2d4a3e] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#243a31]"
          >
            Block Dates
          </Link>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-neutral-500">Loading dashboard...</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              [
                "Estimated Revenue",
                `$${stats.estimatedRevenue.toLocaleString()}`,
                `$${NIGHTLY_RATE}/night`,
              ],
              [
                "This Month",
                `$${stats.monthlyRevenue.toLocaleString()}`,
                "Confirmed stays",
              ],
              ["Occupancy", `${stats.occupancyRate}%`, "Next 30 days"],
              ["Pending", stats.pendingBookings.toString(), "Awaiting action"],
            ].map(([label, value, hint]) => (
              <div
                key={label}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                  {label}
                </p>
                <p className="mt-3 text-3xl font-light text-[#1a1a18]">
                  {value}
                </p>
                <p className="mt-2 text-sm text-neutral-500">{hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Total bookings", stats.totalBookings],
              ["Confirmed", stats.confirmedBookings],
              ["Cancelled", stats.cancelledBookings],
              ["Manual blocks", stats.manuallyBlocked],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <p className="text-sm text-neutral-500">{label}</p>
                <p className="mt-2 text-2xl font-light text-[#1a1a18]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2
                  className="text-2xl font-light text-[#1a1a18]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Recent Bookings
                </h2>
                <Link href="/admin/bookings" className="text-sm text-[#2d4a3e]">
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {recentBookings.length === 0 && (
                  <p className="text-sm text-neutral-500">No bookings yet.</p>
                )}

                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-[#fafaf8] p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-medium text-[#1a1a18]">
                        {booking.guestName}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {formatDate(booking.checkIn)} -{" "}
                        {formatDate(booking.checkOut)}
                      </p>
                    </div>
                    <span className="w-fit rounded-full bg-white px-3 py-1 text-xs text-neutral-600">
                      {normalizeStatus(booking.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2
                  className="text-2xl font-light text-[#1a1a18]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Upcoming Blocked Dates
                </h2>
                <Link
                  href="/admin/blocked-dates"
                  className="text-sm text-[#2d4a3e]"
                >
                  Manage
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingBlocks.length === 0 && (
                  <p className="text-sm text-neutral-500">
                    No upcoming blocked dates.
                  </p>
                )}

                {upcomingBlocks.map((blockedDate) => (
                  <div
                    key={blockedDate.id}
                    className="rounded-2xl border border-neutral-100 bg-[#fafaf8] p-4"
                  >
                    <p className="font-medium text-[#1a1a18]">
                      {formatDate(blockedDate.startDate)} -{" "}
                      {formatDate(blockedDate.endDate)}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {blockedDate.reason || "Blocked"}
                      {blockedDate.bookingId ? " from booking" : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
