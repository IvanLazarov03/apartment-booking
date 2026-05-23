export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-[#fafaf8]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="font-serif text-2xl text-neutral-900">Habitat</h2>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              A minimal luxury apartment experience designed for comfort, calm,
              and modern living.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-4">
              Navigation
            </h3>

            <div className="flex flex-col gap-2 text-sm text-neutral-600">
              <a href="#gallery" className="hover:text-neutral-900 transition">
                Gallery
              </a>
              <a
                href="#amenities"
                className="hover:text-neutral-900 transition"
              >
                Amenities
              </a>
              <a
                href="#availability"
                className="hover:text-neutral-900 transition"
              >
                Availability
              </a>
              <a href="#booking" className="hover:text-neutral-900 transition">
                Book Stay
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-4">
              Contact
            </h3>

            <div className="text-sm text-neutral-600 flex flex-col gap-2">
              <p>Strumica, North Macedonia</p>
              <p>+389 70 000 000</p>
              <p>hello@habitat.com</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Habitat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
