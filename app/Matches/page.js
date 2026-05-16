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
          const iCanTeach = currentUser.skills.filter((skill) =>
            user.wants
              .map((s) => s.toLowerCase())
              .includes(skill.toLowerCase()),
          );

          const theyCanTeach = user.skills.filter((skill) =>
            currentUser.wants
              .map((s) => s.toLowerCase())
              .includes(skill.toLowerCase()),
          );

          const totalMatches = iCanTeach.length + theyCanTeach.length;

          // const totalPossible = currentUser.wants.length + user.wants.length;
          const totalPossible =
            currentUser.skills.length +
            currentUser.wants.length +
            user.skills.length +
            user.wants.length;
          const matchPercent =
            totalPossible === 0
              ? 0
              : Math.round((totalMatches / totalPossible) * 100);

          return {
            ...user,
            match: `${matchPercent}%`,
            iCanTeach,
            theyCanTeach,
          };
        })

        // ✅ BOTH SIDES MUST MATCH
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
  // async function fetchMatches() {
  //   try {
  //     console.log("=== FETCH MATCHES STARTED ===");

  //     setLoading(true);

  //     const token = localStorage.getItem("token");
  //     console.log("TOKEN:", token);

  //     const storedUserRaw = localStorage.getItem("user");
  //     console.log("RAW USER FROM LOCALSTORAGE:", storedUserRaw);

  //     const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
  //     console.log("PARSED STORED USER:", storedUser);

  //     if (!storedUser) {
  //       console.log("❌ NO STORED USER FOUND");
  //       setMatches([]);
  //       return;
  //     }

  //     console.log("=== FETCHING USERS API ===");

  //     const usersRes = await fetch(
  //       "https://swap-skills.onrender.com/api/users",
  //       {
  //         headers: token
  //           ? {
  //               Authorization: `Bearer ${token}`,
  //             }
  //           : {},
  //       },
  //     );

  //     console.log("USERS RESPONSE STATUS:", usersRes.status);
  //     console.log("USERS RESPONSE OK:", usersRes.ok);

  //     const usersData = await usersRes.json();

  //     console.log("USERS API RAW DATA:", usersData);

  //     const users = Array.isArray(usersData)
  //       ? usersData
  //       : Array.isArray(usersData.data)
  //         ? usersData.data
  //         : [];

  //     console.log("FORMATTED USERS ARRAY:", users);
  //     console.log("TOTAL USERS:", users.length);

  //     console.log("=== FETCHING EDIT SKILLS API ===");

  //     const skillsRes = await fetch(
  //       "https://swap-skills.onrender.com/api/edit-skills?populate=user",
  //       {
  //         headers: token
  //           ? {
  //               Authorization: `Bearer ${token}`,
  //             }
  //           : {},
  //       },
  //     );

  //     console.log("SKILLS RESPONSE STATUS:", skillsRes.status);
  //     console.log("SKILLS RESPONSE OK:", skillsRes.ok);

  //     const skillsData = await skillsRes.json();

  //     console.log("SKILLS API RAW DATA:", skillsData);

  //     const skillsList = Array.isArray(skillsData.data) ? skillsData.data : [];

  //     console.log("SKILLS LIST:", skillsList);
  //     console.log("TOTAL SKILLS RECORDS:", skillsList.length);

  //     console.log("=== FORMATTING USERS ===");

  //     const formattedUsers = users.map((user, index) => {
  //       console.log(`\n------ USER ${index + 1} ------`);
  //       console.log("CURRENT USER:", user);

  //       const userSkills = skillsList.find((item) => {
  //         const data = item.attributes || item || {};

  //         const relationUser =
  //           data.user?.data?.attributes || data.user?.data || data.user || {};

  //         console.log("CHECKING RELATION USER:", relationUser);
  //         console.log("RELATION USER ID:", relationUser.id);
  //         console.log("CURRENT USER ID:", user.id);

  //         return relationUser.id === user.id;
  //       });

  //       console.log("MATCHED USER SKILLS:", userSkills);

  //       const skillData = userSkills?.attributes || userSkills || {};

  //       console.log("SKILL DATA:", skillData);

  //       const displayName = user.username || "User";

  //       const formattedUser = {
  //         id: user.id,
  //         documentId: user.documentId,
  //         name: displayName,
  //         initials:
  //           displayName
  //             .split(" ")
  //             .map((word) => word[0])
  //             .join("")
  //             .toUpperCase() || "U",
  //         color: user.color || "bg-purple-600",
  //         location: user.location || "No location",
  //         skills: Array.isArray(skillData.offerSkills)
  //           ? skillData.offerSkills
  //           : [],
  //         wants: Array.isArray(skillData.learnSkills)
  //           ? skillData.learnSkills
  //           : [],
  //       };

  //       console.log("FORMATTED USER:", formattedUser);

  //       return formattedUser;
  //     });

  //     console.log("\n=== ALL FORMATTED USERS ===");
  //     console.log(formattedUsers);

  //     const currentUser = formattedUsers.find(
  //       (user) => user.id === storedUser.id,
  //     );

  //     console.log("CURRENT LOGGED IN USER:", currentUser);

  //     if (!currentUser) {
  //       console.log("❌ CURRENT USER NOT FOUND IN FORMATTED USERS");
  //       setMatches([]);
  //       return;
  //     }

  //     console.log("=== FINDING MATCHES ===");

  //     const matchedUsers = formattedUsers
  //       .filter((user) => {
  //         const notCurrentUser = user.id !== currentUser.id;

  //         console.log(`FILTER SELF USER: ${user.name} -> ${notCurrentUser}`);

  //         return notCurrentUser;
  //       })

  //       .map((user) => {
  //         console.log(`\n=== MATCHING WITH ${user.name} ===`);

  //         console.log("CURRENT USER SKILLS:", currentUser.skills);
  //         console.log(`${user.name} WANTS:`, user.wants);

  //         const iCanTeach = currentUser.skills.filter((skill) =>
  //           user.wants
  //             .map((s) => s.toLowerCase())
  //             .includes(skill.toLowerCase()),
  //         );

  //         console.log("I CAN TEACH:", iCanTeach);

  //         console.log(`${user.name} SKILLS:`, user.skills);
  //         console.log("CURRENT USER WANTS:", currentUser.wants);

  //         const theyCanTeach = user.skills.filter((skill) =>
  //           currentUser.wants
  //             .map((s) => s.toLowerCase())
  //             .includes(skill.toLowerCase()),
  //         );

  //         console.log("THEY CAN TEACH:", theyCanTeach);

  //         const totalMatches = iCanTeach.length + theyCanTeach.length;

  //         console.log("TOTAL MATCHES:", totalMatches);

  //         const totalPossible =
  //           currentUser.skills.length +
  //           currentUser.wants.length +
  //           user.skills.length +
  //           user.wants.length;

  //         console.log("TOTAL POSSIBLE:", totalPossible);

  //         const matchPercent =
  //           totalPossible === 0
  //             ? 0
  //             : Math.round((totalMatches / totalPossible) * 100);

  //         console.log("MATCH PERCENT:", matchPercent);

  //         const finalUser = {
  //           ...user,
  //           match: `${matchPercent}%`,
  //           iCanTeach,
  //           theyCanTeach,
  //         };

  //         console.log("FINAL MATCH USER:", finalUser);

  //         return finalUser;
  //       })

  //       .filter((user) => {
  //         const bothSideMatch =
  //           user.iCanTeach.length > 0 && user.theyCanTeach.length > 0;

  //         console.log(`BOTH SIDE MATCH FOR ${user.name}:`, bothSideMatch);

  //         return bothSideMatch;
  //       })

  //       .sort((a, b) => {
  //         const result =
  //           Number(b.match.replace("%", "")) - Number(a.match.replace("%", ""));

  //         console.log(`SORTING ${a.name} vs ${b.name}:`, result);

  //         return result;
  //       });

  //     console.log("\n=== FINAL MATCHED USERS ===");
  //     console.log(matchedUsers);

  //     setMatches(matchedUsers);

  //     console.log("✅ MATCHES SET SUCCESSFULLY");
  //   } catch (err) {
  //     console.error("❌ FETCH MATCHES ERROR:", err);
  //     setMatches([]);
  //   } finally {
  //     console.log("=== FETCH MATCHES FINISHED ===");
  //     setLoading(false);
  //   }
  // }

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
