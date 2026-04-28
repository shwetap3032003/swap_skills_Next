"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Explore", href: "/Explore" },
  { name: "Matches", href: "/Matches" },
  { name: "Requests", href: "/Requests", badge: 2 },
  // { name: "Chat", href: "/Chat" },
  { name: "Search", href: "/Search" },
];

const authLinks = [
  { name: "Log in", href: "/login?mode=login" },
  { name: "Sign up", href: "/login?mode=signup" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-lg md:text-xl font-semibold text-gray-800 font-serif">
            Skillswap
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-3 text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:bg-gray-200 px-3 py-2 rounded transition"
            >
              {link.name}

              {link.badge && (
                <span className="bg-red-500 text-white text-[10px] px-1 rounded-full ml-1">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Desktop Auth */}
          <div className="hidden sm:flex gap-2">
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs md:text-sm transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile */}
          <Link
            href="/Profile"
            className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold hover:opacity-90 transition shadow-inner"
          >
            SP
          </Link>

          {/* Mobile Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-xl">
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4 text-gray-600">
          <div className="flex flex-col gap-2 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2"
              >
                {link.name}

                {link.badge && (
                  <span className="bg-red-500 text-white text-[10px] px-1 rounded-full ml-1">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex-1 text-center px-3 py-2 bg-gray-100 rounded"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
