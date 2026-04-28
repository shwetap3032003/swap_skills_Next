"use client";

import React, { useState } from "react";
import {
  MapPin,
  Star,
  RefreshCcw,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";

const categories = [
  { name: "All Skills", emoji: null },
  { name: "Tech", emoji: "💻" },
  { name: "Music", emoji: "🎵" },
  { name: "Design", emoji: "🎨" },
  { name: "Language", emoji: "🌐" },
  { name: "Fitness", emoji: "💪" },
  { name: "Cooking", emoji: "🍳" },
];

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
    name: "Maya Chen",
    initials: "MC",
    color: "bg-[#0f2d52]",
    location: "Austin, TX",
    rating: 4.7,
    reviews: 19,
    skills: ["UI/UX", "Figma", "Graphic Design"],
    wants: ["Python", "Machine Learning"],
    swaps: 12,
  },
  {
    name: "Jordan Kim",
    initials: "JK",
    color: "bg-purple-800",
    location: "New York, NY",
    rating: 4.8,
    reviews: 24,
    skills: ["Guitar", "Piano", "Music Production"],
    wants: ["JavaScript", "React"],
    swaps: 9,
  },
  {
    name: "Sam Torres",
    initials: "ST",
    color: "bg-green-500",
    location: "Miami, FL",
    rating: 4.6,
    reviews: 15,
    skills: ["Personal Training", "Nutrition", "Yoga"],
    wants: ["Japanese", "Guitar"],
    swaps: 7,
  },
  {
    name: "Riley Park",
    initials: "RP",
    color: "bg-yellow-500",
    location: "Chicago, IL",
    rating: 4.5,
    reviews: 11,
    skills: ["Machine Learning", "SQL", "Python"],
    wants: ["Italian Cooking", "Graphic Design"],
    swaps: 5,
  },
  {
    name: "Devon Williams",
    initials: "DW",
    color: "bg-blue-500",
    location: "Seatle, CA",
    rating: 4.8,
    reviews: 22,
    skills: ["French", "Baking", "Pastry"],
    wants: ["React", "SQL"],
    swaps: 14,
  },
  {
    name: "Casey Johnson",
    initials: "CJ",
    color: "bg-rose-500",
    location: "Boston, MA",
    rating: 4.3,
    reviews: 8,
    skills: ["CrossFit", "Personal Training"],
    wants: ["Python", "Spanish"],
    swaps: 4,
  },
  {
    name: "Morgan Lee",
    initials: "ML",
    color: "bg-blue-500",
    location: "Denver, CO",
    rating: 4.7,
    reviews: 17,
    skills: ["Graphic Design", "Illustrator", "Yoga"],
    wants: ["Machine Learning", "Mandarin"],
    swaps: 11,
  },
];

export default function ExploreSwappers() {
  const [activeFilter, setActiveFilter] = useState("All Skills");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOption, setSortOption] = useState("rating");

  const skillCategories = {
    Tech: [
      "React",
      "Python",
      "Node.js",
      "SQL",
      "Machine Learning",
      "JavaScript",
    ],
    Music: ["Guitar", "Piano", "Music Production"],
    Design: ["UI/UX", "Figma", "Graphic Design", "Illustrator"],
    Language: ["French", "Spanish", "Mandarin", "Japanese"],
    Fitness: ["Personal Training", "Nutrition", "Yoga", "CrossFit"],
    Cooking: ["Baking", "Pastry", "Italian Cooking"],
  };

  const filteredSwappers =
    activeFilter === "All Skills"
      ? swappers
      : swappers.filter((person) =>
          person.skills.some((skill) =>
            skillCategories[activeFilter]?.includes(skill),
          ),
        );

  const sortedSwappers = [...filteredSwappers].sort((a, b) => {
  if (sortOption === "rating") {
    return b.rating - a.rating; // high → low
  }

  if (sortOption === "name") {
    return a.name.localeCompare(b.name); // A → Z
  }

  if (sortOption === "swaps") {
    return b.swaps - a.swaps; // high → low
  }

  return 0;
});

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Explore Swappers
          </h1>
          {/* <p className="text-slate-400 mt-1 font-medium">8 members found</p> */}
          <p className="text-slate-400 mt-1 font-medium">
            {filteredSwappers.length} members found
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveFilter(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium text-sm shadow-sm
                  ${
                    activeFilter === cat.name
                      ? "bg-[#1e1e2e] text-white border-[#1e1e2e]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
              >
                {cat.emoji && <span>{cat.emoji}</span>}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative min-w-35">
            {/* <select className="appearance-none w-full bg-white border border-slate-200 text-slate-700 py-2.5 px-4 pr-10 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-sm cursor-pointer">
              <option>Sort: Rating</option>
              <option>Sort: Newest</option>
              <option>Sort: Most Swaps</option>
            </select> */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none w-full bg-white border border-slate-200 text-slate-700 py-2.5 px-4 pr-10 rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-sm cursor-pointer"
            >
              <option value="rating">Sort: Rating</option>
              <option value="name">Sort: Name</option>
              <option value="swaps">Sort: Most Swaps</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSwappers.map((person, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2.5rem] p-6 border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-md transition hover:-translate-y-1"
            >
              <div>
                <div className="flex gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-full ${person.color} flex items-center justify-center text-white text-lg font-bold shrink-0`}
                  >
                    {person.initials}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">
                      {person.name}
                    </h2>
                    <div className="flex items-center text-slate-400 text-sm mt-1">
                      <MapPin size={14} className="text-rose-500 mr-1" />
                      {person.location}
                    </div>
                    <div className="flex items-center mt-1 gap-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-slate-600 ml-1">
                        {person.rating}
                      </span>
                      <span className="text-sm text-slate-400">
                        ({person.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {person.skills.map((s) => (
                    <span
                      key={s}
                      className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center"
                    >
                      <span className="mr-1">✓</span> {s}
                    </span>
                  ))}
                  {person.wants.map((w) => (
                    <span
                      key={w}
                      className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center"
                    >
                      <span className="mr-1">→</span> {w}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-2">
                <div className="flex items-center text-blue-500 font-semibold text-xs tracking-wide">
                  <RefreshCcw size={14} className="mr-2" />
                  {person.swaps} swaps
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50">
                    Chat
                  </button>
                  {/* <button className="px-4 py-2 bg-[#f43f5e] hover:bg-rose-600 text-white rounded-xl text-sm font-bold flex items-center gap-1 transition-colors">
                    Request →
                  </button> */}
                  <button
                    onClick={() => {
                      setSelectedUser(person);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#f43f5e] hover:bg-rose-600 text-white rounded-xl text-sm font-bold flex items-center gap-1 transition-colors"
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
