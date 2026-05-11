"use client";

import React, { useEffect, useState } from "react";
import RequestsSkeleton from "./skeletonRequest";

export default function SkillRequests() {
  const [activeTab, setActiveTab] = useState("incoming");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // const currentUser = "Alex Rivera"; // later replace with logged-in user

  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const currentUser = storedUser?.username || "";

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      setLoading(true);

      // ✅ FETCH REQUESTS
      const res = await fetch("http://localhost:1337/api/requests");

      if (!res.ok) {
        throw new Error("Failed to fetch requests");
      }

      const result = await res.json();

      // ✅ FETCH USERS
      const usersRes = await fetch("http://localhost:1337/api/users");

      const users = await usersRes.json();

      // ✅ GET CONTACT NUMBER
      const getContactByName = (name) => {
        const user = users.find((u) => u.username === name);

        return user?.contactNo || user?.contactno || "No contact number";
      };

      // ✅ FORMAT REQUESTS
      const formatted = result.data.map((item) => {
        const data = item.attributes || item;

        return {
          id: item.documentId,

          senderName: data.senderName || "",
          receiverName: data.receiverName || "",

          // ✅ CONTACT NUMBER
          contactNo:
            data.receiverName === currentUser
              ? getContactByName(data.senderName)
              : getContactByName(data.receiverName),

          name:
            data.receiverName === currentUser
              ? data.senderName
              : data.receiverName,

          message: data.message || "",
          offer: data.offerSkill || "",
          want: data.wantSkill || "",
          status: data.requestStatus || "pending",

          time: data.createdAt
            ? new Date(data.createdAt).toLocaleString()
            : "Just now",

          initials:
            (data.receiverName === currentUser
              ? data.senderName
              : data.receiverName
            )
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase() || "",

          color: "bg-purple-500",
        };
      });

      setRequests(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateRequestStatus(documentId, newStatus) {
    try {
      const res = await fetch(
        `http://localhost:1337/api/requests/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              requestStatus: newStatus,
            },
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      fetchRequests();
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  const incomingRequests = requests.filter(
    (req) => req.receiverName === currentUser,
  );

  const outgoingRequests = requests.filter(
    (req) => req.senderName === currentUser,
  );

  const currentRequests =
    activeTab === "incoming" ? incomingRequests : outgoingRequests;

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 py-8 md:py-12">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif">
            Skill Requests
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Manage incoming and outgoing swap requests
          </p>

          <div className="flex gap-8 mt-6 border-b pb-2">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          <RequestsSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 py-8 md:py-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif">
          Skill Requests
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage incoming and outgoing swap requests
        </p>

        <div className="flex gap-8 mt-6 border-b">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`pb-2 transition-all font-medium text-sm sm:text-base relative ${
              activeTab === "incoming" ? "text-red-500" : "text-gray-400"
            }`}
          >
            Incoming
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] ml-1.5 align-middle">
              {incomingRequests.length}
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
            <span className="bg-gray-400 text-white px-2 py-0.5 rounded-full text-[10px] ml-1.5 align-middle">
              {outgoingRequests.length}
            </span>
            {activeTab === "outgoing" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />
            )}
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {currentRequests.map((req) => (
            <div
              key={req.id}
              className={`bg-white rounded-3xl p-5 shadow-sm border-l-4 transition-all hover:shadow-md ${
                req.status === "accepted"
                  ? "border-green-400"
                  : req.status === "rejected"
                    ? "border-rose-400"
                    : "border-amber-400"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${req.color}`}
                  >
                    {req.initials}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">{req.name}</h3>
                    <p className="text-xs text-gray-400">{req.time}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                    req.status === "accepted"
                      ? "bg-green-50 text-green-600"
                      : req.status === "rejected"
                        ? "bg-rose-50 text-rose-600"
                        : "bg-amber-50 text-amber-600"
                  }`}
                >
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

              {req.status === "accepted" && (
                <div className="mt-4 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                  <p className="text-sm font-semibold text-green-700">
                    Contact Number
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    📞 {req.contactNo}
                  </p>
                </div>
              )}

              {activeTab === "incoming" && req.status === "pending" && (
                <div className="flex flex-wrap gap-3 mt-5">
                  <button
                    onClick={() => updateRequestStatus(req.id, "accepted")}
                    className="bg-green-500 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition shadow-sm"
                  >
                    ✓ Accept
                  </button>

                  <button
                    onClick={() => updateRequestStatus(req.id, "rejected")}
                    className="bg-white border border-gray-200 text-gray-500 px-5 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition"
                  >
                    ✕ Reject
                  </button>

                  {/* <button className="bg-white border border-gray-200 text-gray-500 px-5 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition">
                    Chat first
                  </button> */}
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
