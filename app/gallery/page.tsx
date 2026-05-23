import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Gallery() {
  return (
    <>
      <Navbar />
      <section className="bg-[#fafaf8] text-[#1a1a18] font-sans min-h-screen ">
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"
            alt="The Linden Apartment"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="text-white/90 text-xs tracking-[0.2em] uppercase font-light">
              The Linden Apartment
            </span>
            <h1
              className="text-white text-5xl font-light tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Gallery
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2
            className="text-4xl md:text-5xl font-light tracking-wide text-neutral-900"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Majestic Views
          </h2>

          <div className="w-16 h-px bg-neutral-300 mx-auto my-6" />

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Experience the breathtaking scenery from our luxurious apartments,
            where minimal design meets natural beauty and calm living spaces.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
              "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
              "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800",
              "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
              "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800",
              "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
            ].map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl h-64 group"
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <h3 className="text-xl font-light mb-6">What guests say</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Elena M.",
                text: "Absolutely stunning apartment. Everything felt premium and peaceful.",
              },
              {
                name: "Mark T.",
                text: "Perfect location and beautiful interior design. Would stay again.",
              },
              {
                name: "Sophie K.",
                text: "The atmosphere is incredible — very calm, clean, and luxurious.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-neutral-600 leading-relaxed">
                  “{t.text}”
                </p>
                <p className="mt-4 text-sm font-medium text-neutral-900">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
