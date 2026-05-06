"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userInitials, setUserInitials] = useState("U");

  useEffect(() => {
    function checkAuth() {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      setIsLoggedIn(!!token);

      if (storedUser) {
        const user = JSON.parse(storedUser);
        const name = user.username || user.email || "User";

        const initials = name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        setUserInitials(initials);
      } else {
        setUserInitials("U");
      }

      setMounted(true);
    }

    checkAuth();
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChange"));

    setIsLoggedIn(false);
    setOpen(false);
    router.replace("/login?mode=login");
  }

  return (
    <nav className="sticky top-0 z-999 bg-white shadow-sm text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-lg md:text-xl font-semibold text-gray-800 font-serif">
            Skillswap
          </span>
        </Link>

        <div className="hidden md:flex flex-1 justify-center items-center gap-3 text-gray-600">
          <Link href="/Explore" className="hover:bg-gray-200 px-3 py-2 rounded">
            Explore
          </Link>
          <Link href="/Matches" className="hover:bg-gray-200 px-3 py-2 rounded">
            Matches
          </Link>
          <Link
            href="/Requests"
            className="hover:bg-gray-200 px-3 py-2 rounded"
          >
            Requests
          </Link>
          <Link href="/Search" className="hover:bg-gray-200 px-3 py-2 rounded">
            Search
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {mounted && (
            <>
              {!isLoggedIn ? (
                <div className="hidden sm:flex gap-2">
                  <Link
                    href="/login?mode=login"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/login?mode=signup"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/Profile"
                    className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold hover:opacity-90 transition shadow-inner"
                  >
                    {userInitials}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-gray-800"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute left-0 top-full w-full bg-white border-t shadow-lg px-4 py-4 z-999">
          <div className="flex flex-col gap-3 text-gray-700">
            <Link
              href="/Explore"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              Explore
            </Link>

            <Link
              href="/Matches"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              Matches
            </Link>

            <Link
              href="/Requests"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              Requests
            </Link>

            <Link
              href="/Search"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              Search
            </Link>
          </div>

          <div className="mt-4 flex gap-2">
            {mounted && !isLoggedIn ? (
              <>
                <Link
                  href="/login?mode=login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-3 py-2 bg-gray-100 rounded-lg"
                >
                  Log in
                </Link>

                <Link
                  href="/login?mode=signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-3 py-2 bg-gray-100 rounded-lg"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/Profile"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-3 py-2 bg-purple-900 text-white rounded-lg"
                >
                  {userInitials}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex-1 text-center px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
