"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";

export default function YourMatches() {
  const [matches, setMatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = "Alex Rivera"; // later replace with logged-in user

  useEffect(() => {
    fetchMatches();
  }, []);

  function calculateMatch(currentUser, otherUser) {
    const mySkills = currentUser.skills || [];
    const myWants = currentUser.wants || [];
    const otherSkills = otherUser.skills || [];
    const otherWants = otherUser.wants || [];

    const ICanTeachThem = mySkills.filter((skill) =>
      otherWants.includes(skill),
    ).length;

    const TheyCanTeachMe = otherSkills.filter((skill) =>
      myWants.includes(skill),
    ).length;

    const totalPossible = myWants.length + otherWants.length;

    if (totalPossible === 0) return "0%";

    return (
      Math.round(((ICanTeachThem + TheyCanTeachMe) / totalPossible) * 100) + "%"
    );
  }

  async function fetchMatches() {
    try {
      const res = await fetch("http://localhost:1337/api/swappers");

      if (!res.ok) {
        throw new Error("Failed to fetch swappers");
      }

      const result = await res.json();

      const allUsers = result.data.map((item) => {
        const data = item.attributes || item;

        return {
          id: item.documentId || item.id,
          name: data.name || "",
          initials:
            data.initials ||
            data.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase() ||
            "",
          color: data.color || "bg-purple-600",
          location: data.location || "",
          skills: Array.isArray(data.skills) ? data.skills : [],
          wants: Array.isArray(data.wants) ? data.wants : [],
        };
      });

      const currentUser = allUsers.find((user) => user.name === "Alex Rivera");

      if (!currentUser) {
        setMatches([]);
        return;
      }

      const matchedUsers = allUsers
        .filter((user) => user.name !== currentUser.name)
        .map((user) => ({
          ...user,
          match: calculateMatch(currentUser, user),
        }))
        .filter((user) => user.match !== "0%")
        .sort(
          (a, b) =>
            Number(b.match.replace("%", "")) - Number(a.match.replace("%", "")),
        );

      setMatches(matchedUsers);
    } catch (err) {
      console.error("Fetch matches error:", err);
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

        {matches.length === 0 ? (
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
                    {person.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-emerald-50 text-emerald-600 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold flex items-center"
                      >
                        ✓ {skill}
                      </span>
                    ))}

                    {person.wants.map((want) => (
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
                  <button className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50">
                    <MessageSquare size={16} />
                    Chat
                  </button>

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
            offer: selectedUser?.skills || [],
            learn: selectedUser?.wants || [],
          }}
          targetName={selectedUser?.name}
        />
      </div>
    </section>
  );
}
