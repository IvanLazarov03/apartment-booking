import Link from "next/link";
export default function BookingCard() {
  return (
    <div
      id="booking"
      className="block lg:hidden bg-white border border-neutral-200 rounded-2xl p-6 shadow-lg h-fit top-24 mb-20"
    >
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-serif text-3xl">Plan your stay</span>
      </div>

      <p className="text-sm text-neutral-600 mb-6">
        Escape to comfort and nature — book your getaway today and enjoy a
        relaxing experience.
      </p>

      <button className="mt-6 w-full bg-[#2d4a3e] text-white py-3 rounded-lg hover:bg-[#1e3329] transition">
        <Link
          href="/book"
          className="block w-full text-center font-medium text-sm tracking-wide"
        >
          Book now
        </Link>
      </button>

      <p className="text-xs text-neutral-400 text-center mt-3">
        Limited availability — don’t miss out
      </p>
    </div>
  );
}
