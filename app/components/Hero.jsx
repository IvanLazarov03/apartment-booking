// src/components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section id="gallery" className="relative h-130 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"
        alt="The Linden Apartment"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-black/10" />

      <div className="relative h-full max-w-6xl mx-auto px-8 flex items-center gap-12">
        {/* LEFT */}
        <div className="flex-1 text-white">
          <h1 className="font-serif text-5xl leading-[1.15] font-normal mb-4">
            A space to <em className="italic text-[#c8a96e]">breathe</em>
            <br />
            and belong.
          </h1>

          <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-8">
            A modern minimalist apartment steps from the sea in Paralia, Greece
            — cool interiors, warm light, and the sound of waves outside.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available now
          </div>
        </div>

        {/* RIGHT: CTA card */}
        <div className="hidden md:block w-75 shrink-0">
          <div className="bg-white rounded-2xl p-7 shadow-2xl">
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="font-serif text-4xl text-[#1a1a18]">€50</span>
              <span className="text-sm text-[#a8a8a0]">/ night</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#6b6b65] mb-5">
              <span className="text-[#c8a96e] tracking-wide">★★★★★</span>
              <span>
                <strong>4.97</strong>
              </span>
            </div>

            <hr className="border-[#e8e8e2] mb-4" />

            <div className="space-y-2.5 mb-4">
              {[
                ["Location", "Paralia, Greece"],
                ["Check-in", "From 15:00"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-[13px]">
                  <span className="text-[#6b6b65]">{label}</span>
                  <span className="text-[#1a1a18] font-medium">{value}</span>
                </div>
              ))}
            </div>

            <hr className="border-[#e8e8e2] mb-4" />

            <Link
              href="/book"
              className="block w-full text-center bg-[#2d4a3e] hover:bg-[#1e3329] text-white font-medium py-3.5 rounded-lg text-sm tracking-wide transition-colors mb-2.5"
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
