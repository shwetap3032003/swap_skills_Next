"use client";

import React from "react";
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Featured Swappers
            </h1>
            <p className="text-slate-500 mt-1 md:mt-2 text-sm sm:text-base md:text-lg">
              Highly rated members ready to swap
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl md:rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm text-sm md:text-base">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {swappers.map((person, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl md:rounded-[2.5rem]  sm:p-6 md:p-8 border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-md transition hover:-translate-y-1"
            >
              <div>
                <div className="flex gap-3 sm:gap-4 p-3">
                  <div
                    className={`w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ${person.color} flex items-center justify-center text-white text-base sm:text-lg md:text-xl font-bold shrink-0`}
                  >
                    {person.initials}
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-tight">
                      {person.name}
                    </h2>

                    <div className="flex items-center text-slate-400 text-xs sm:text-sm mt-1">
                      <MapPin size={12} className="text-rose-500 mr-1" />
                      {person.location}
                    </div>

                    <div className="flex items-center  gap-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 ml-1">
                        {person.rating}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-400">
                        ({person.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 p-3">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-emerald-50 text-emerald-600 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center"
                    >
                      ✓ {skill}
                    </span>
                  ))}

                  {person.wants.map((want) => (
                    <span
                      key={want}
                      className="bg-orange-50 text-orange-600 px-2.5 sm:px-3 rounded-full text-xs sm:text-sm font-medium flex items-center"
                    >
                      → {want}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1  border-t border-slate-100">
                <div className="flex items-center text-blue-500 font-semibold text-xs sm:text-sm pl-3">
                  <RefreshCcw size={14} className="mr-2" />
                  {person.swaps} swaps
                </div>

                <div className="flex gap-2 w-full sm:w-auto p-2">
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
                    Chat
                  </button>

                  {/* <button className="flex-1 sm:flex-none px-4 py-2 bg-rose-500 text-white rounded-lg text-xs sm:text-sm font-bold hover:bg-rose-600 transition flex items-center justify-center gap-1">
                    Request <ChevronRight size={14} />
                  </button> */}
                  <button
                    onClick={() => {
                      setSelectedUser(person);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 bg-rose-500 text-white rounded-lg text-xs sm:text-sm font-bold hover:bg-rose-600 transition flex items-center justify-center gap-1"
                  >
                    Request <ChevronRight size={14} />
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
