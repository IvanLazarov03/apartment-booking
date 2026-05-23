"use client";

import { useState } from "react";

export default function BookingPage() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    arrival: "",
    departure: "",
    adults: "1",
    children: "",
    specialRequest: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: connect to your database / API route
    // Example:
    // await fetch("/api/bookings", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    console.log("Booking submitted:", form);
  };

  const inputClass =
    "w-full bg-white border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors";

  const labelClass = "block text-sm text-gray-700 mb-1.5";

  return (
    <section className="min-h-screen bg-white">
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"
          alt="The Linden Apartment"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="text-white/70 text-xs tracking-[0.2em] uppercase font-light">
            The Linden Apartment
          </span>
          <h1
            className="text-white text-5xl font-light tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Book Now
          </h1>
          <span className="text-white text-xs tracking-[0.18em] uppercase border-b border-white/50 pb-0.5">
            Reserve your stay
          </span>
        </div>
      </div>

      {/* Form */}
      <div className=" bg-[#fafaf8] ">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <form onSubmit={handleSubmit}>
            {/* Row 1 — Email & Name */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 2 — Arrival & Departure */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass} htmlFor="arrival">
                  Arrival
                </label>
                <input
                  type="date"
                  id="arrival"
                  name="arrival"
                  value={form.arrival}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="departure">
                  Departure
                </label>
                <input
                  type="date"
                  id="departure"
                  name="departure"
                  value={form.departure}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 3 — Adults & Children */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass} htmlFor="adults">
                  Adults
                </label>
                <select
                  id="adults"
                  name="adults"
                  value={form.adults}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="children">
                  Children
                </label>
                <select
                  id="children"
                  name="children"
                  value={form.children}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special requests */}
            <div className="mb-8">
              <label className={labelClass} htmlFor="specialRequest">
                Special requests
              </label>
              <textarea
                id="specialRequest"
                name="specialRequest"
                value={form.specialRequest}
                onChange={handleChange}
                rows={8}
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#2d4a3e] hover:bg-[#1e3329] active:bg-[#4e7429] text-white text-sm font-medium px-8 py-2.5 rounded transition-colors cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
