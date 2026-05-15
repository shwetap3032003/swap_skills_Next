"use client";

import { useEffect, useState } from "react";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkeletonCard from "../Explore/skeletonCard";

export default function SearchSkills() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("Any Rating");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const usersRes = await fetch("https://swap-skills.onrender.com/api/users");

        const usersData = await usersRes.json();

        const users = Array.isArray(usersData)
          ? usersData
          : Array.isArray(usersData.data)
            ? usersData.data
            : [];

        const skillsRes = await fetch(
          "https://swap-skills.onrender.com/api/edit-skills?populate=user",
        );

        const skillsData = await skillsRes.json();

        const skillsList = Array.isArray(skillsData.data)
          ? skillsData.data
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

            name: displayName,

            initials:
              displayName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase() || "U",

            color: user.color || "bg-rose-500",

            location: user.location || "No location",

            rating: Number(user.rating || 0),

            reviews: Number(user.reviews || 0),

            offers: Array.isArray(skillData.offerSkills)
              ? skillData.offerSkills
              : [],

            wants: Array.isArray(skillData.learnSkills)
              ? skillData.learnSkills
              : [],

            swaps: Number(user.swaps || 0),
          };
        });

        setUsers(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.round(Number(rating || 0));
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  const filteredUsers = users.filter((user) => {
    const searchText = searchQuery.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.location.toLowerCase().includes(searchText) ||
      user.offers.some((skill) => skill.toLowerCase().includes(searchText)) ||
      user.wants.some((skill) => skill.toLowerCase().includes(searchText));

    const matchesRating =
      ratingFilter === "Any Rating" || user.rating >= Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 sm:px-6 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-serif">
          Search Skills
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Find people by skill, name, or location
        </p>

        <div className="mt-6 bg-white p-1 rounded-2xl shadow-sm border flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            placeholder="Search skill, name, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 outline-none text-sm sm:text-base"
          />

          {/* <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm text-gray-600 w-full sm:w-auto"
          >
            <option>Any Rating</option>
            <option value="4.9">4.9+</option>
            <option value="4.8">4.8+</option>
            <option value="4.7">4.7+</option>
            <option value="4.5">4.5+</option>
            <option value="4">4.0+</option>
          </select> */}

          <button
            onClick={() => {
              setSearchQuery("");
              setRatingFilter("Any Rating");
            }}
            className="bg-red-400 text-white px-4 py-1 rounded-xl hover:bg-red-600 text-sm sm:text-base w-full sm:w-auto"
          >
            Reset
          </button>
        </div>

        <p className="text-gray-500 mt-5 text-sm sm:text-base">
          {filteredUsers.length} results found
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SkeletonCard key={item} />
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition hover:-translate-y-1"
              >
                <div className="flex gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold ${user.color}`}
                  >
                    {user.initials}
                  </div>

                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                      {user.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500">
                      📍 {user.location}
                    </p>

                    <p className="text-xs sm:text-sm text-yellow-500 mt-1">
                      {renderStars(user.rating)}{" "}
                      <span className="text-gray-600">
                        {user.rating} ({user.reviews})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                  {(user.offers || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                    >
                      ✓ {skill}
                    </span>
                  ))}

                  {(user.wants || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full"
                    >
                      → {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-5">
                  <p className="text-xs sm:text-sm text-gray-500">
                    🔁 {user.swaps} swaps
                  </p>

                  <div className="flex gap-2 w-full sm:w-auto">
                    {/* <button className="flex-1 sm:flex-none border px-3 py-1.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100">
                      Chat
                    </button> */}

                    <button
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (!token) {
                          toast.error("Please login first");
                          return;
                        }
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      className="flex-1 sm:flex-none bg-[#f43f5e] text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm hover:bg-red-500"
                    >
                      Request →
                    </button>
                  </div>
                </div>
                <ToastContainer
                  position="top-right"
                  autoClose={2500}
                  theme="dark"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 bg-white rounded-2xl p-5 text-center shadow-sm">
            <p className="text-gray-500 text-sm sm:text-base">
              No users found.
            </p>
          </div>
        )}

        <SendRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skills={{
            offer: selectedUser?.wants || [],
            learn: selectedUser?.offers || [],
          }}
          targetName={selectedUser?.name}
        />
      </div>
    </div>
  );
}
