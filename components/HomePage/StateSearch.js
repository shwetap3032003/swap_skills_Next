"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function StatsSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length > 2) {
      // simulate "result found" condition
      // router.push(`/Explore?query=${query}`);
      router.push(`/Explore`);
    }
  }, [query, router]);

  return (
    <section className="relative bg-linear-to-r from-[#0f172a] to-[#1e293b] text-white pb-20 px-4">
      <div className="max-w-3xl ml-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center font-serif">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">8,200+</h2>
          <p className="text-gray-300 mt-1 text-xs sm:text-sm">
            Active Members
          </p>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">340+</h2>
          <p className="text-gray-300 mt-1 text-xs sm:text-sm">Skills Listed</p>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            12,400+
          </h2>
          <p className="text-gray-300 mt-1 text-xs sm:text-sm">
            Swaps Completed
          </p>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">4.8★</h2>
          <p className="text-gray-300 mt-1 text-xs sm:text-sm">Avg. Rating</p>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-full px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-full shadow-lg flex items-center p-2 sm:p-3">
          <div className="flex items-center flex-1 px-2 sm:px-4">
            <span className="text-gray-400 text-sm sm:text-lg mr-2">🔍</span>
            {/* <input
              type="text"
              placeholder="Search skills..."
              className="w-full outline-none text-gray-700 text-sm sm:text-base"
            />
          </div> */}
            <input
              type="text"
              placeholder="Search skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent outline-none border-none focus:outline-none focus:ring-0 text-gray-700 text-sm sm:text-base"
            />
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium">
            Search
          </button>
          {/* <Link
            href="/Search"
            className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium text-center"
          >
            Search
          </Link> */}
        </div>
      </div>
    </section>
  );
}
