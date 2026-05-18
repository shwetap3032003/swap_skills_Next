"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";
import MatchSkeletonCard from "./matchSkeletonCard";

export default function YourMatches() {
  const [matches, setMatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const normalizeSkill = (skill) => {
    return skill.trim().toLowerCase().replace(/\s+/g, " ").replace(/\./g, "");
  };

  async function fetchMatches() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const storedUserRaw = localStorage.getItem("user");
      const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

      if (!storedUser) {
        setMatches([]);
        return;
      }

      const usersRes = await fetch(
        "https://swap-skills.onrender.com/api/users",
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        },
      );

      const usersData = await usersRes.json();
      console.log("userdata", usersData);
      const users = Array.isArray(usersData)
        ? usersData
        : Array.isArray(usersData.data)
          ? usersData.data
          : [];
      console.log("userdata===", users);

      const skillsRes = await fetch(
        "https://swap-skills.onrender.com/api/edit-skills?populate=user",
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        },
      );

      const skillsData = await skillsRes.json();
      console.log("data", skillsData);
      const skillsList = Array.isArray(skillsData.data) ? skillsData.data : [];

      const formattedUsers = users.map((user) => {
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
          initials:
            displayName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase() || "U",
          color: user.color || "bg-purple-600",
          location: user.location || "No location",
          skills: Array.isArray(skillData.offerSkills)
            ? skillData.offerSkills
            : [],
          wants: Array.isArray(skillData.learnSkills)
            ? skillData.learnSkills
            : [],
        };
      });

      const currentUser = formattedUsers.find(
        (user) => user.id === storedUser.id,
      );

      if (!currentUser) {
        setMatches([]);
        return;
      }

      const matchedUsers = formattedUsers
        .filter((user) => user.id !== currentUser.id)
        .map((user) => {
          // const iCanTeach = currentUser.skills.filter((skill) =>
          //   user.wants
          //     .map((s) => s.toLowerCase())
          //     .includes(skill.toLowerCase()),
          // );

          // const theyCanTeach = user.skills.filter((skill) =>
          //   currentUser.wants
          //     .map((s) => s.toLowerCase())
          //     .includes(skill.toLowerCase()),
          // );
          const iCanTeach = currentUser.skills.filter((skill) =>
            user.wants.some(
              (want) => normalizeSkill(want) === normalizeSkill(skill),
            ),
          );

          const theyCanTeach = user.skills.filter((skill) =>
            currentUser.wants.some(
              (want) => normalizeSkill(want) === normalizeSkill(skill),
            ),
          );

          const totalMatches =
            (iCanTeach?.length || 0) + (theyCanTeach?.length || 0);

          const totalPossible = Math.max(
            (currentUser.skills?.length || 0) +
              (currentUser.wants?.length || 0),

            (user.skills?.length || 0) + (user.wants?.length || 0),

            1,
          );

          const matchPercent = Math.min(
            100,
            Math.round((totalMatches / totalPossible) * 100),
          );

          return {
            ...user,
            match: `${matchPercent}%`,
            iCanTeach,
            theyCanTeach,
          };
        })

        //BOTH SIDES MUST MATCH
        .filter(
          (user) => user.iCanTeach.length > 0 && user.theyCanTeach.length > 0,
        )

        .sort(
          (a, b) =>
            Number(b.match.replace("%", "")) - Number(a.match.replace("%", "")),
        );

      setMatches(matchedUsers);
    } catch (err) {
      console.error("Fetch matches error:", err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full min-h-screen bg-slate-50 px-4 sm:px-6 py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">🎯</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-serif">
              Your Matches
            </h2>
          </div>

          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Accepted skill swap matches
          </p>
        </div>

        {loading ? (
          <MatchSkeletonCard />
        ) : matches.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-slate-200">
            <p className="text-slate-400">No accepted matches found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {matches.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition hover:-translate-y-1"
              >
                <div className="p-5 sm:p-6 md:p-8 pb-4 relative">
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs sm:text-sm">
                    {person.match}
                  </div>

                  <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full ${person.color} flex items-center justify-center text-white text-sm sm:text-base md:text-lg font-bold`}
                    >
                      {person.initials}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-tight">
                        {person.name}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-1">
                        {person.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(person.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="bg-emerald-50 text-emerald-600 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold flex items-center"
                      >
                        ✓ {skill}
                      </span>
                    ))}

                    {(person.wants || []).map((want) => (
                      <span
                        key={want}
                        className="bg-orange-50 text-orange-700 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold flex items-center"
                      >
                        → {want}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-4 sm:px-6 md:px-8 py-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {/* <button className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50">
                    <MessageSquare size={16} />
                    Chat
                  </button> */}

                  <button
                    onClick={() => {
                      setSelectedUser(person);
                      setIsModalOpen(true);
                    }}
                    className="w-full sm:w-auto flex-[1.5] flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f43f5e] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-rose-600"
                  >
                    Send Request <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <SendRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skills={{
            offer: selectedUser?.iCanTeach || [],
            learn: selectedUser?.theyCanTeach || [],
          }}
          targetName={selectedUser?.name}
        />
      </div>
    </section>
  );
}
