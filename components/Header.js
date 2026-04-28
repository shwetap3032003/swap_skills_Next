"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm text-sm">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 max-w-7xl mx-auto">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <Link href="/" className="text-lg md:text-xl font-semibold text-gray-800 font-serif">
            Skillswap
          </Link>
        </div>

        {/* Center: Nav Links (Hidden on mobile) */}
        {/* Removed ml-100 and used flex-1 with justify-center for better positioning */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-2 text-gray-600 px-4 ml-125">
          <Link href="/Explore" className="hover:bg-gray-200 p-2 rounded transition-colors">Explore</Link>
          <Link href="/Matches" className="hover:bg-gray-200 p-2 rounded transition-colors">Matches</Link>
          <Link href="/Requests" className="hover:bg-gray-200 p-2 rounded transition-colors relative">
            Requests
            <span className="bg-red-500 text-white text-[10px] px-1 rounded-full ml-1">2</span>
          </Link>
          <Link href="/Chat" className="hover:bg-gray-200 p-2 rounded transition-colors">Chat</Link>
          <Link href="/Search" className="hover:bg-gray-200 p-2 rounded transition-colors">Search</Link>
        </div>

        {/* Right Side: Auth Buttons & Profile */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <div className="hidden sm:flex gap-2">
            <Link href="/login?mode=login">
              <button className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs md:text-sm transition">
                Log in
              </button>
            </Link>

            <Link href="/login?mode=signup">
              <button className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs md:text-sm transition shadow-sm">
                Sign up
              </button>
            </Link>
          </div>

          {/* Profile Circle - Cleaned up spacing */}
          <Link href="/Profile" className="ml-1">
            <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold hover:opacity-90 transition shadow-inner">
              SP
            </div>
          </Link>
        </div>
        
      </div>
    </nav>
  );
}