export default function Calendar() {
  return (
    <div id="availability">
      <h2 className="font-serif text-lg mb-4">Availability</h2>

      <div className="grid grid-cols-7 gap-1 text-sm text-center mb-6">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="p-2 rounded-md bg-[#e4ede0] text-[#2d4a3e]">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
