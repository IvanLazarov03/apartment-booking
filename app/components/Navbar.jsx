"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = ["Home", "Gallery", "Attractions", "Book"];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 ">
      <div className="mx-auto max-w-7xl">
        {/* Glass Navbar */}
        <div
          className="
            rounded-3xl
            border border-neutral-200/80
            bg-white/75
            backdrop-blur-2xl
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          "
        >
          <div className="flex items-center justify-between px-5 sm:px-8 py-4">
            {/* Logo */}
            <span className="font-serif text-xl tracking-wide text-neutral-700">
              <Link href="/">Habitat</Link>
            </span>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3">
              {links.map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="
                    px-4 py-2
                    rounded-full
                    text-sm
                    text-neutral-600
                    bg-white/60
                    border border-white/80
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]
                    hover:bg-white
                    hover:text-neutral-900
                    hover:shadow-md
                    transition-all duration-300
                  "
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="
                md:hidden
                flex flex-col gap-1.5
                p-3
                rounded-full
                bg-white/70
                border border-neutral-200
                shadow-sm
              "
            >
              <span className="w-5 h-0.5 rounded-full bg-neutral-700" />
              <span className="w-5 h-0.5 rounded-full bg-neutral-700" />
              <span className="w-5 h-0.5 rounded-full bg-neutral-700" />
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`
              md:hidden overflow-hidden transition-all duration-300
              ${open ? "max-h-80 border-t border-neutral-200" : "max-h-0"}
            `}
          >
            <div className="flex flex-col gap-3 px-5 py-5">
              {links.map((item) => (
                <a
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="
                    px-4 py-3
                    rounded-2xl
                    text-sm
                    text-neutral-700
                    bg-white/70
                    border border-neutral-200/80
                    hover:bg-white
                    hover:text-black
                    transition-all duration-300
                  "
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
