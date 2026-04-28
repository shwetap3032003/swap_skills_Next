"use client";

import React from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";

const matches = [
  {
    name: "Maya Chen",
    initials: "MC",
    color: "bg-[#0f2d52]",
    location: "Austin, TX",
    match: "50%",
    skills: ["UI/UX", "Figma", "Graphic Design"],
    wants: ["Python", "Machine Learning"],
  },
  {
    name: "Jordan Kim",
    initials: "JK",
    color: "bg-purple-800",
    location: "New York, NY",
    match: "50%",
    skills: ["Guitar", "Piano", "Music Production"],
    wants: ["JavaScript", "React"],
  },
  {
    name: "Riley Park",
    initials: "RP",
    color: "bg-orange-500",
    location: "Chicago, IL",
    match: "50%",
    skills: ["Machine Learning", "SQL", "Python"],
    wants: ["Italian Cooking", "Graphic Design"],
  },
  {
    name: "Casey Johnson",
    initials: "CJ",
    color: "bg-rose-500",
    location: "Boston, MA",
    match: "50%",
    skills: ["CrossFit", "Personal Training"],
    wants: ["Python", "Spanish"],
  },
];

export default function YourMatches() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <section className="w-full min-h-screen bg-slate-50 px-4 sm:px-6 py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">🎯</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Your Matches
            </h2>
          </div>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            People with complementary skills to yours — skill overlap scored
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {matches.map((person, idx) => (
            <div
              key={idx}
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

                {/* <button className="w-full sm:w-auto flex-[1.5] flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f43f5e] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-rose-600">
                  Send Request <ArrowRight size={16} />
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
    </section>
  );
}
