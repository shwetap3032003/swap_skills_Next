"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
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

export default function ExploreSwappers() {
  const [swappers, setSwappers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Skills");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOption, setSortOption] = useState("rating");

  useEffect(() => {
    async function fetchSwappers() {
      try {
        const res = await fetch("http://localhost:1337/api/swappers");
        const result = await res.json();
        // console.log("swapper data", result);

        const formatted = result.data.map((item) => {
          const data = item.attributes || item;

          return {
            id: item.id,
            name: data.name || "",
            initials:
              data.initials ||
              data.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase() ||
              "",
            color: data.color || "bg-rose-500",
            location: data.location || "",
            rating: Number(data.rating || 0),
            reviews: Number(data.reviews || 0),
            skills: Array.isArray(data.skills) ? data.skills : [],
            wants: Array.isArray(data.wants) ? data.wants : [],
            swaps: Number(data.swaps || 0),
          };
        });

        setSwappers(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchSwappers();
  }, []);

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
          person.skills?.some((skill) =>
            skillCategories[activeFilter]?.includes(skill),
          ),
        );

  const sortedSwappers = [...filteredSwappers].sort((a, b) => {
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "name")
      return (a.name || "").localeCompare(b.name || "");
    if (sortOption === "swaps") return b.swaps - a.swaps;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif">
            Explore Swappers
          </h1>
          <p className="text-slate-400 mt-1 font-medium">
            {filteredSwappers.length} members found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveFilter(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm shadow-sm ${
                  activeFilter === cat.name
                    ? "bg-[#1e1e2e] text-white border-[#1e1e2e]"
                    : "bg-white text-slate-600 border-slate-300"
                }`}
              >
                {cat.emoji && <span>{cat.emoji}</span>}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-44">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none w-full bg-white border border-slate-300 text-slate-900 py-2.5 px-4 pr-10 rounded-xl text-sm cursor-pointer"
            >
              <option value="rating">Sort: Rating</option>
              <option value="name">Sort: Name</option>
              <option value="swaps">Sort: Most Swaps</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedSwappers.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between min-h-65 hover:shadow-md transition"
            >
              <div>
                <div className="flex gap-4 items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-semibold shrink-0 ${person.color}`}
                  >
                    {person.initials}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 truncate">
                      {person.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1 truncate">
                      📍 {person.location}
                    </p>

                    <p className="text-sm text-yellow-500 mt-1">
                      ★★★★★{" "}
                      <span className="text-slate-700">
                        {person.rating} ({person.reviews})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                    >
                      ✓ {skill}
                    </span>
                  ))}

                  {person.wants.map((skill) => (
                    <span
                      key={skill}
                      className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full"
                    >
                      → {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 mt-5">
                <p className="text-sm text-slate-500 whitespace-nowrap">
                  🔁 {person.swaps} swaps
                </p>

                <div className="flex gap-2">
                  <button className="border border-slate-900 text-slate-900 px-3 py-2 rounded-lg text-sm hover:bg-slate-100">
                    Chat
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUser(person);
                      setIsModalOpen(true);
                    }}
                    className="bg-[#f43f5e] text-white px-3 py-2 rounded-lg text-sm hover:bg-rose-500"
                  >
                    Request →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
  );
}
