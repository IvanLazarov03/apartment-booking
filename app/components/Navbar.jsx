"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="flex justify-between items-center px-4 sm:px-8 py-4">
        <span className="font-serif text-lg">Habitat</span>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-7 text-sm text-neutral-500">
          <a href="#gallery" className="hover:text-neutral-900">
            Gallery
          </a>
          <a href="#amenities" className="hover:text-neutral-900">
            Amenities
          </a>
          <a href="#availability" className="hover:text-neutral-900">
            Availability
          </a>
          <a href="#booking" className="hover:text-neutral-900">
            Book
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-5 h-[2px] bg-black" />
          <span className="w-5 h-[2px] bg-black" />
          <span className="w-5 h-[2px] bg-black" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${open ? "max-h-60 border-t border-neutral-200" : "max-h-0"}
        `}
      >
        <div className="flex flex-col px-4 py-4 gap-4 text-sm text-neutral-600 bg-white">
          <a href="#gallery" onClick={() => setOpen(false)}>
            Gallery
          </a>
          <a href="#amenities" onClick={() => setOpen(false)}>
            Amenities
          </a>
          <a href="#availability" onClick={() => setOpen(false)}>
            Availability
          </a>
          <a href="#booking" onClick={() => setOpen(false)}>
            Book
          </a>
        </div>
      </div>
    </nav>
  );
}
