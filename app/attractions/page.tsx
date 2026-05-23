import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const attractions = [
  {
    title: "Mount Olympus National Park",
    image:
      "https://www.touristmaker.com/wp-content/uploads/2020/01/mount-olympus-national-park.jpg",
    description:
      "Discover Greece’s legendary mountain with breathtaking hiking trails, waterfalls, forests, and panoramic views.",
  },
  {
    title: "Day trip to Meteora",
    image:
      "https://www.touristmaker.com/wp-content/uploads/2020/01/meteora.jpg",
    description:
      "Located about 2 hours and 40 minutes drive to the southwest of Paralia Katerinis, Meteora is considered one of the most interesting rock formations in Europe, one of Greece’s most spectacular UNESCO sites.",
  },
  {
    title: "Olympiaki Akti",
    image:
      "https://www.touristmaker.com/wp-content/uploads/2020/01/olympic-beach.jpg",
    description:
      "Cycle along the scenic coastal path connecting Paralia with the beautiful neighboring beach village.",
  },
  {
    title: "Platamon Castle",
    image:
      "https://www.touristmaker.com/wp-content/uploads/2020/01/platamon-castle.jpg",
    description:
      "Explore a preserved 13th-century castle overlooking the Aegean coastline and Mount Olympus.",
  },
  {
    title: "Saint Paraskevi Church",
    image:
      "https://www.touristmaker.com/wp-content/uploads/2020/01/st-paraskevi-church.jpg",
    description:
      "Visit the elegant seaside church known for its peaceful atmosphere and beautiful architecture.",
  },
  {
    title: "Jet Ski & Water Sports",
    image:
      "https://www.touristmaker.com/wp-content/uploads/2020/01/jet-skiing.jpg",
    description:
      "Enjoy exciting water activities on the calm crystal-clear waters of the Olympic Riviera.",
  },
];

const testimonials = [
  {
    name: "Sophia M.",
    text: "The attractions around Paralia made our vacation unforgettable. Mount Olympus was breathtaking.",
  },
  {
    name: "Daniel K.",
    text: "Beautiful beaches, incredible food, and amazing day trips. We loved every moment.",
  },
  {
    name: "Elena T.",
    text: "The perfect combination of relaxing seaside living and cultural exploration.",
  },
];

export default function AttractionsPage() {
  return (
    <>
      <Navbar />

      <section className="bg-[#fafaf8] text-[#1a1a18] min-h-screen">
        {" "}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/b1/e3/e6/aktaion.jpg?w=1000&h=-1&s=1"
            alt="Paralia Katerinis"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/60" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-white/70 text-xs tracking-[0.3em] uppercase">
              Olympic Riviera • Greece
            </span>

            <h1
              className="mt-4 text-white text-5xl md:text-7xl font-light tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Attractions
            </h1>

            <p className="mt-6 text-white/80 max-w-2xl text-lg leading-relaxed">
              Explore the natural beauty, cultural landmarks, and unforgettable
              experiences surrounding Paralia Katerinis.
            </p>
          </div>
        </div>
        {/* Intro */}
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2
            className="text-4xl md:text-5xl font-light tracking-wide text-neutral-900"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Discover Northern Greece
          </h2>

          <div className="w-16 h-px bg-neutral-300 mx-auto my-6" />

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            From the legendary peaks of Mount Olympus to golden beaches and
            seaside villages, Paralia Katerinis offers the perfect balance of
            relaxation, adventure, and culture.
          </p>
        </div>
        {/* Attractions Grid */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((item, index) => (
              <div
                key={index}
                className="
                  group overflow-hidden rounded-4xl
                  bg-white border border-neutral-200
                  shadow-sm hover:shadow-xl
                  transition-all duration-500
                "
              >
                <div className="overflow-hidden h-72">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-full h-full object-cover
                      group-hover:scale-105
                      transition duration-700
                    "
                  />
                </div>

                <div className="p-6">
                  <h3
                    className="text-2xl font-light text-neutral-900"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonials */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Guest Experiences
            </h2>

            <p className="mt-4 text-neutral-600">
              What travelers love most about Paralia Katerinis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="
                  rounded-4xl
                  border border-neutral-200
                  bg-white/80
                  backdrop-blur-xl
                  p-8
                  shadow-sm
                "
              >
                <p className="text-neutral-600 leading-relaxed text-sm">
                  “{item.text}”
                </p>

                <div className="mt-6">
                  <p className="text-neutral-900 font-medium">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
