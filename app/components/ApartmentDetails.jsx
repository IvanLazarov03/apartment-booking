export default function ApartmentDetails() {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-1">The Linden Apartment</h1>

      <p className="text-sm text-neutral-500 mb-6">
        Mitte, Berlin · 3rd floor · East-facing
      </p>

      {/* Stats */}
      <div className="flex gap-8 border-b pb-6 mb-6">
        {[
          ["62", "sqm"],
          ["1", "bedroom"],
          ["2", "guests"],
          ["1", "bathroom"],
        ].map(([val, label]) => (
          <div key={label}>
            <div className="font-serif text-xl">{val}</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <h2 className="font-serif text-lg mb-2">About this place</h2>
      <p className="text-neutral-600 leading-relaxed mb-10">
        A light-filled apartment with oak floors, clean lines, and curated calm.
        Designed for those who appreciate the beauty of empty space.
      </p>
    </div>
  );
}
