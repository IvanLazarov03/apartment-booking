"use client";

import { useEffect, useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    async function fetchAvailability() {
      const res = await fetch("/api/availability");
      const data = await res.json();

      setBlockedDates(data);
    }

    fetchAvailability();
  }, []);

  const now = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  // Prevent going to past months
  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  function prevMonth() {
    if (isCurrentMonth) return;

    setCurrentDate(new Date(year, month - 1, 1));
  }

  // Check blocked dates
  function isBlocked(day) {
    const current = new Date(year, month, day);

    return blockedDates.some((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      return current >= start && current <= end;
    });
  }

  // Disable past days
  function isPastDay(day) {
    const current = new Date(year, month, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return current < today;
  }

  return (
    <div id="availability" className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-3xl text-[#1a1a18]">Availability</h2>

          <p className="text-neutral-500 mt-2">
            {monthName} {year}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={prevMonth}
            disabled={isCurrentMonth}
            className={`
              px-4 py-2 rounded-xl border transition-all
              ${
                isCurrentMonth
                  ? "bg-neutral-100 text-neutral-300 border-neutral-200 cursor-not-allowed"
                  : "bg-white border-neutral-300 hover:bg-neutral-50"
              }
            `}
          >
            ←
          </button>

          <button
            onClick={nextMonth}
            className="
              px-4 py-2 rounded-xl border border-neutral-300
              bg-white hover:bg-neutral-50 transition-all
            "
          >
            →
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-xs uppercase tracking-wide text-neutral-400 text-center py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;

          const blocked = isBlocked(day);
          const past = isPastDay(day);

          return (
            <div
              key={i}
              className={`
                h-14 rounded-2xl border flex items-center justify-center
                text-sm transition-all select-none

                ${
                  blocked
                    ? "bg-red-100 text-red-500 border-red-200 line-through"
                    : past
                      ? "bg-neutral-100 text-neutral-300 border-neutral-200"
                      : "bg-[#e4ede0] text-[#2d4a3e] border-[#d6e4d0]"
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 mt-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#e4ede0] border border-[#d6e4d0]" />
          <span className="text-neutral-600">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
          <span className="text-neutral-600">Booked</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-neutral-100 border border-neutral-200" />
          <span className="text-neutral-600">Past</span>
        </div>
      </div>
    </div>
  );
}
