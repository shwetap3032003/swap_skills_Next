"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Star, RefreshCcw, ChevronRight } from "lucide-react";
import { useState } from "react";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";

const swappers = [
  {
    name: "Alex Rivera",
    initials: "AR",
    color: "bg-rose-500",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 31,
    skills: ["React", "Python", "Node.js"],
    wants: ["Guitar", "Spanish"],
    swaps: 18,
  },
  {
    name: "Jordan Kim",
    initials: "JK",
    color: "bg-purple-700",
    location: "New York, NY",
    rating: 4.8,
    reviews: 24,
    skills: ["Guitar", "Piano", "Music Production"],
    wants: ["JavaScript", "React"],
    swaps: 9,
  },
  {
    name: "Devon Williamss",
    initials: "DW",
    color: "bg-cyan-500",
    location: "Seattle, WA",
    rating: 4.8,
    reviews: 22,
    skills: ["French", "Baking", "Pastry"],
    wants: ["React", "SQL"],
    swaps: 14,
  },
];

export default function FeaturedSwappers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-full bg-slate-50 py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif">
              Featured Swappers
            </h1>
            <p className="text-slate-500 mt-1 md:mt-2 text-sm sm:text-base md:text-lg">
              Highly rated members ready to swap
            </p>
          </div>

          <Link href="/Explore">
            <button className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl md:rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm text-sm md:text-base">
              View All <ChevronRight size={16} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {swappers.map((person, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition hover:-translate-y-1"
            >
              <div className="flex gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold ${person.color}`}
                >
                  {person.initials}
                </div>

                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                    {person.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500">
                    📍 {person.location}
                  </p>

                  <p className="text-xs sm:text-sm text-yellow-500 mt-1">
                    ★★★★★{" "}
                    <span className="text-gray-600">
                      {person.rating} ({person.reviews})
                    </span>
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                  >
                    ✓ {skill}
                  </span>
                ))}

                {person.wants.map((want) => (
                  <span
                    key={want}
                    className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full"
                  >
                    → {want}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-5">
                <p className="text-xs sm:text-sm text-gray-500">
                  🔁 {person.swaps} swaps
                </p>

                <div className="flex gap-2 w-full sm:w-auto pr-2">
                  {/* <button className="flex-1 sm:flex-none border px-3 py-1.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100">
                    Chat
                  </button> */}

                  <button
                    onClick={() => {
                      setSelectedUser(person);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 sm:flex-none bg-[#f43f5e] text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm hover:bg-red-500"
                  >
                    Request →
                  </button>
                </div>
              </div>
            </div>
          ))}
          <SendRequestModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            skills={{
              offer: selectedUser?.skills || [],
              learn: selectedUser?.wants || [],
            }}
            targetName={selectedUser?.name}
          />
        </div>
      </div>
    </div>
  );
}
