import { TimerOff } from "lucide-react";
export default function BookingExpiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf8] px-6">
      <div className="max-w-md w-full text-center bg-white border border-neutral-200 rounded-2xl p-10 shadow-sm">
        <div className="text-5xl mb-4 flex items-center justify-center">
          <TimerOff color="black" />
        </div>

        <h1 className="text-2xl font-light text-[#1a1a18]">
          Booking link expired
        </h1>

        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
          This confirmation link is no longer valid because it has expired after
          30 minutes. Please create a new booking request to continue.
        </p>

        <a
          href="/book"
          className="inline-block mt-6 px-6 py-2.5 bg-[#2d4a3e] text-white text-sm rounded-lg hover:bg-[#1e3329] transition"
        >
          Make a new booking
        </a>
      </div>
    </div>
  );
}
