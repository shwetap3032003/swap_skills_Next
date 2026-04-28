"use client";

import React, { useState } from "react";

export default function SkillRequests() {
  // 1. State to manage which tab is active
  const [activeTab, setActiveTab] = useState("incoming");

  // Incoming Data (from your original code)
  const incomingRequests = [
    {
      id: 1,
      name: "Jordan Kim",
      time: "2h ago",
      message: "Hi! I'd love to swap guitar lessons for React tutorials. Been playing guitar 15 years.",
      offer: "Guitar",
      want: "React",
      status: "pending",
      initials: "JK",
      color: "bg-purple-500",
    },
    {
      id: 2,
      name: "Riley Park",
      time: "5h ago",
      message: "I can teach ML basics, would love to learn your pasta skills!",
      offer: "Machine Learning",
      want: "Italian Cooking",
      status: "pending",
      initials: "RP",
      color: "bg-orange-400",
    },
    {
      id: 3,
      name: "Casey Johnson",
      time: "1 day ago",
      message: "Ready to get you fit in exchange for Python fundamentals!",
      offer: "Personal Training",
      want: "Python",
      status: "accepted",
      initials: "CJ",
      color: "bg-red-500",
    },
  ];

  // 2. Outgoing Data (matching your design image)
  const outgoingRequests = [
    {
      id: 101,
      name: "Alex Rivera",
      time: "3h ago",
      message: "I'm an amateur photographer offering lessons in exchange for Python.",
      offer: "Photography",
      want: "Python",
      status: "pending",
      initials: "AR",
      color: "bg-rose-500",
    },
    {
      id: 102,
      name: "Sam Torres",
      time: "2 days ago",
      message: "I can design your brand materials in exchange for 5 yoga sessions.",
      offer: "Graphic Design",
      want: "Yoga",
      status: "rejected",
      initials: "ST",
      color: "bg-emerald-400",
    },
  ];

  // Determine which list to show based on the active tab
  const currentRequests = activeTab === "incoming" ? incomingRequests : outgoingRequests;

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 py-8 md:py-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Skill Requests</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage incoming and outgoing swap requests
        </p>

        {/* Tab Navigation */}
        <div className="flex gap-8 mt-6 border-b">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`pb-2 transition-all font-medium text-sm sm:text-base relative ${
              activeTab === "incoming" ? "text-red-500" : "text-gray-400"
            }`}
          >
            Incoming
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] ml-1.5 align-middle">
              2
            </span>
            {activeTab === "incoming" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("outgoing")}
            className={`pb-2 transition-all font-medium text-sm sm:text-base relative ${
              activeTab === "outgoing" ? "text-red-500" : "text-gray-400"
            }`}
          >
            Outgoing
            {activeTab === "outgoing" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />
            )}
          </button>
        </div>

        {/* Request List */}
        <div className="mt-8 space-y-4">
          {currentRequests.map((req) => (
            <div
              key={req.id}
              className={`bg-white rounded-3xl p-5 shadow-sm border-l-4 transition-all hover:shadow-md ${
                req.status === "accepted" ? "border-green-400" : 
                req.status === "rejected" ? "border-rose-400" : 
                "border-amber-400"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${req.color}`}>
                    {req.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{req.name}</h3>
                    <p className="text-xs text-gray-400">{req.time}</p>
                  </div>
                </div>

                {/* Status Badge corrected for Outgoing styles */}
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  req.status === "accepted" ? "bg-green-50 text-green-600" :
                  req.status === "rejected" ? "bg-rose-50 text-rose-600" :
                  "bg-amber-50 text-amber-600"
                }`}>
                  {req.status}
                </span>
              </div>

              <p className="mt-4 text-gray-600 text-sm italic leading-relaxed">
                "{req.message}"
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-emerald-50 text-emerald-700 text-[11px] font-medium px-3 py-1 rounded-lg border border-emerald-100">
                  Offers: {req.offer}
                </span>
                <span className="bg-orange-50 text-orange-700 text-[11px] font-medium px-3 py-1 rounded-lg border border-orange-100">
                  Wants: {req.want}
                </span>
              </div>

              {/* Action buttons only show on Incoming + Pending */}
              {activeTab === "incoming" && req.status === "pending" && (
                <div className="flex gap-3 mt-5">
                  <button className="bg-green-500 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition shadow-sm">
                    ✓ Accept
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-500 px-5 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition">
                    ✕ Reject
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-500 px-5 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition">
                    Chat first
                  </button>
                </div>
              )}
            </div>
          ))}

          {currentRequests.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">No {activeTab} requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}