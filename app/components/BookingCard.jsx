export default function BookingCard() {
  return (
    <div
      id="booking"
      className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-lg h-fit sticky top-24"
    >
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-serif text-3xl">€120</span>
        <span className="text-sm text-neutral-400">/ night</span>
      </div>

      <div className="bg-[#e4ede0] text-[#2d4a3e] text-xs px-4 py-1 rounded-full mb-6 w-fit">
        Available to book
      </div>

      <div className="space-y-4">
        <input type="date" className="w-full border rounded-lg p-2" />
        <input type="date" className="w-full border rounded-lg p-2" />

        <select className="w-full border rounded-lg p-2">
          <option>2 guests</option>
        </select>

        <input
          placeholder="Full name"
          className="w-full border rounded-lg p-2"
        />
        <input placeholder="Email" className="w-full border rounded-lg p-2" />
      </div>

      <button className="mt-6 w-full bg-[#2d4a3e] text-white py-3 rounded-lg hover:bg-[#1e3329] transition">
        Reserve now
      </button>

      <p className="text-xs text-neutral-400 text-center mt-3">
        You won't be charged yet
      </p>
    </div>
  );
}
