export default function Hero() {
  return (
    <div
      id="gallery"
      className="grid grid-cols-1 md:grid-cols-[1fr_240px] md:grid-rows-2 gap-0.75 h-125"
    >
      <div className="relative row-span-2 overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-0 w-full p-10 bg-linear-to from-black/60 to-transparent text-white">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider mb-3 bg-white/10 border border-white/30 px-4 py-1 rounded-full w-fit">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available now
          </div>

          <h1 className="font-serif text-3xl leading-tight">
            A space to <em className="text-[#c8a96e]">breathe</em>
            <br />
            and belong.
          </h1>
        </div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&q=80"
        className="hidden md:block w-full h-full object-cover hover:scale-105 transition"
      />

      <img
        src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80"
        className="hidden md:block w-full h-full object-cover hover:scale-105 transition"
      />
    </div>
  );
}
