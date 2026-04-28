import React from "react";
import Link from "next/link";

export default function FooterPage() {
  return (
    <>
      <footer className="bg-[#12122b] text-gray-400 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row  justify-between gap-8">
          <div className="flex flex-col md:items-start">
            <div className="text-white text-3xl font-black font-serif tracking-tighter mb-2">
              skillSwap
            </div>
            <p className="text-sm font-medium text-gray-400">
              Exchange skills, not money.
            </p>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/Explore"
              className="hover:text-white transition-colors"
            >
              Explore
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms
            </Link>
          </nav>

          <div className="text-sm text-gray-400 mt-5">
            © 2025 SkillSwap. Built with{" "}
            <span className="text-gray-300">♥</span>
          </div>
        </div>
      </footer>
    </>
  );
}
