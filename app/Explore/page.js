"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";
import SkeletonCard from "@/app/Explore/skeletonCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const categories = [
//   { name: "All Skills", emoji: null },
//   { name: "Tech", emoji: "💻" },
//   { name: "Music", emoji: "🎵" },
//   { name: "Design", emoji: "🎨" },
//   { name: "Language", emoji: "🌐" },
//   { name: "Fitness", emoji: "💪" },
//   { name: "Cooking", emoji: "🍳" },
// ];

export default function ExploreSwappers() {
  const [swappers, setSwappers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Skills");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOption, setSortOption] = useState("rating");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const categories = [
    { name: "All Skills", emoji: null },
    { name: "Tech", emoji: "💻" },
    { name: "Music", emoji: "🎵" },
    { name: "Design", emoji: "🎨" },
    { name: "Fitness", emoji: "💪" },
    { name: "Language", emoji: "🌐" },
    { name: "Cooking", emoji: "🍳" },
    { name: "Gardening", emoji: "🌱" },
  ];

  useEffect(() => {
    async function fetchExploreUsers() {
      try {
        setLoading(true);

        // const usersRes = await fetch(`${API_URL}/api/users?populate=*`);
        // const users = await usersRes.json();

        let url = `${API_URL}/api/edit-skills?populate=user`;

        if (activeFilter !== "All Skills") {
          url = `${API_URL}/api/edit-skills?populate=user&filters[categories][$containsi]=${activeFilter}`;
        }

        const usersRes = await fetch(url);

        const result = await usersRes.json();

        const users = result.data || [];

        // console.log("explore userdata", users);

        if (!usersRes.ok || !Array.isArray(users)) {
          console.error("Users fetch error:", users);
          setSwappers([]);
          return;
        }

        // const formatted = users.map((user) => {
        //   const displayName = user.username || "User";

        //   const skillData =
        //     user.edit_skill ||
        //     user.editSkill ||
        //     user.edit_skills?.[0] ||
        //     user.editSkills?.[0] ||
        //     {};

        const formatted = users.map((item) => {
          const skillData = item.attributes || item;

          const user = skillData.user?.data?.attributes || skillData.user || {};

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
                .toUpperCase()
                .slice(0, 2) || "U",

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
  }, [API_URL, activeFilter]);

  const filteredSwappers = swappers.filter((person) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      search === "" ||
      person.name?.toLowerCase().includes(search) ||
      person.location?.toLowerCase().includes(search) ||
      (person.skills || []).some((skill) =>
        skill.toLowerCase().includes(search),
      ) ||
      (person.wants || []).some((skill) =>
        skill.toLowerCase().includes(search),
      );

    // const matchesCategory =
    //   activeFilter === "All Skills"
    //     ? true
    //     : (person.skills || []).some(
    //         (skill) => getSkillCategory(skill) === activeFilter,
    //       );
    const matchesCategory = true;

    return matchesSearch && matchesCategory;
  });

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

          <div className="mb-8">
            <p className="text-slate-500 text-lg mb-8">
              Find people by skill, name, or location
            </p>

            <div className="flex items-center bg-white border border-black rounded-3xl px-5 py-3 shadow-sm">
              <input
                type="text"
                placeholder="Search skill, name, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none bg-transparent text-slate-700 placeholder:text-slate-400 text-base"
              />

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-2xl"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
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

        <p className="text-slate-400 mb-4 ml-2 font-medium">
          {filteredSwappers.length} members found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : sortedSwappers.length === 0 ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <p className="text-slate-400 text-xl font-medium">
                No users found
              </p>
            </div>
          ) : (
            (sortedSwappers || []).map((person) => (
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
            ))
          )}
          {/* <ToastContainer position="top-right" autoClose={2500} theme="dark" /> */}
        </div>

        <SendRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skills={{
            offer: selectedUser?.wants || [],
            learn: selectedUser?.skills || [],
          }}
          targetName={selectedUser?.name}
          targetUser={selectedUser}
        />
      </div>
    </div>
  );
}
