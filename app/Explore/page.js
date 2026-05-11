"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";
import SkeletonCard from "@/app/Explore/skeletonCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExploreUsers() {
      try {
        setLoading(true);
        // const token = localStorage.getItem("token");

        // if (!token) {
        //   console.log("No token found");
        //   setSwappers([]);
        //   return;
        // }

        // const usersRes = await fetch("http://localhost:1337/api/users", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const usersRes = await fetch("http://localhost:1337/api/users");

        const users = await usersRes.json();

        if (!usersRes.ok || !Array.isArray(users)) {
          console.error("Users fetch error:", users);
          setSwappers([]);
          return;
        }

        // const skillsRes = await fetch(
        //   "http://localhost:1337/api/edit-skills?populate=user",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   },
        // );

        const skillsRes = await fetch(
          "http://localhost:1337/api/edit-skills?populate=user",
        );

        const skillsResult = await skillsRes.json();

        if (!skillsRes.ok) {
          console.error("Skills fetch error:", skillsResult);
        }

        const skillsList = Array.isArray(skillsResult.data)
          ? skillsResult.data
          : [];

        const formatted = users.map((user) => {
          const userSkills = skillsList.find((item) => {
            const data = item.attributes || item || {};
            const relationUser =
              data.user?.data?.attributes || data.user?.data || data.user || {};

            return relationUser.id === user.id;
          });

          const skillData = userSkills?.attributes || userSkills || {};
          const displayName = user.username || "User";

          return {
            id: user.id,
            documentId: user.documentId,
            name: displayName,
            email: user.email || "",
            location: user.location || "No location",

            initials:
              displayName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase() || "U",

            color: user.color || "bg-rose-500",

            skills: Array.isArray(skillData.offerSkills)
              ? skillData.offerSkills
              : [],

            wants: Array.isArray(skillData.learnSkills)
              ? skillData.learnSkills
              : [],

            rating: Number(user.rating || 0),
            reviews: Number(user.reviews || 0),
            swaps: Number(user.swaps || 0),
          };
        });

        setSwappers(formatted);
      } catch (error) {
        console.error("Fetch explore users error:", error);
        setSwappers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchExploreUsers();
  }, []);

  const skillCategories = {
    Tech: [
      "React.js",
      "Python",
      "Next.js",
      "SQL",
      "Machine Learning",
      "JavaScript",
    ],
    Music: ["Guitar", "Piano", "Music Production"],
    Design: ["UI/UX", "Figma", "Design", "Illustrator"],
    Language: ["French", "Spanish", "English", "Japanese"],
    Fitness: ["Personal Training", "Nutrition", "Yoga", "CrossFit"],
    Cooking: ["Baking", "Pastry", "Cooking"],
  };

  const filteredSwappers =
    activeFilter === "All Skills"
      ? swappers
      : swappers.filter((person) =>
          (person.skills || []).some((skill) =>
            skillCategories[activeFilter]?.includes(skill),
          ),
        );

  const sortedSwappers = [...filteredSwappers].sort((a, b) => {
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "name") {
      return (a.name || "").localeCompare(b.name || "");
    }
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
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : (sortedSwappers || []).map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between min-h-65 hover:shadow-md transition hover:-translate-y-1"
                >
                  <div>
                    <div className="flex gap-4 items-start">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-base text-white font-semibold shrink-0 ${person.color}`}
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
                      {/* {(person.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                    >
                      ✓ {skill}
                    </span>
                  ))} */}
                      {person.skills &&
                      Array.isArray(person.skills) &&
                      person.skills.length > 0 ? (
                        person.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                          >
                            ✓ {skill}
                          </span>
                        ))
                      ) : (
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                          No offer skills
                        </span>
                      )}

                      {/* {(person.wants || []).map((skill) => (
                    <span
                      key={skill}
                      className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full"
                    >
                      → {skill}
                    </span>
                  ))} */}
                      {person.wants &&
                      Array.isArray(person.wants) &&
                      person.wants.length > 0 ? (
                        person.wants.map((skill) => (
                          <span
                            key={skill}
                            className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full"
                          >
                            → {skill}
                          </span>
                        ))
                      ) : (
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                          No wanted skills
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-5">
                    <p className="text-sm text-slate-500 whitespace-nowrap">
                      🔁 {person.swaps} swaps
                    </p>

                    {person.skills?.length > 0 && person.wants?.length > 0 && (
                      <button
                        onClick={() => {
                          const token = localStorage.getItem("token");

                          if (!token) {
                            toast.error("Please login first");
                            return;
                          }

                          setSelectedUser(person);
                          setIsModalOpen(true);
                        }}
                        className="bg-[#f43f5e] text-white px-3 py-2 rounded-lg text-sm hover:bg-rose-500"
                      >
                        Request →
                      </button>
                    )}
                  </div>
                </div>
              ))}
          <ToastContainer position="top-right" autoClose={2500} theme="dark" />
        </div>

        <SendRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skills={{
            offer: selectedUser?.wants || [],
            learn: selectedUser?.skills || [],
          }}
          targetName={selectedUser?.name}
        />
      </div>
    </div>
  );
}
