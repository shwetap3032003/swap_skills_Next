"use client";

import React, { useEffect, useState } from "react";
import RequestsSkeleton from "./skeletonRequest";
import LeaveReviewModal from "@/components/profile/modals/LeaveReviewModal";

export default function SkillRequests() {
  const [activeTab, setActiveTab] = useState("incoming");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  // const currentUser = storedUser?.username || "";
  const currentUserId = storedUser?.id;

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        setLoading(false);
        return;
      }

      //FETCH REQUESTS
      const res = await fetch(`${API_URL}/api/requests?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Requests fetch failed: ${res.status}`);
      }

      const result = await res.json();

      // //FETCH USERS
      // const usersRes = await fetch(`${API_URL}/api/users`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // if (!usersRes.ok) {
      //   throw new Error(`Users fetch failed: ${usersRes.status}`);
      // }

      // const users = await usersRes.json();

      // // GET CONTACT NUMBER
      // const getContactByName = (name) => {
      //   const user = user.find((u) => u.username === name);

      //   return user?.contactNo || user?.contact_no || "No contact number";
      // };

      // const getUserByName = (name) => {
      //   return users.find((u) => u.username === name);
      // };

      // FORMAT REQUESTS
      const formatted = result.data.map((item) => {
        const data = item.attributes || item;

        const senderUser = data.sender;
        const receiverUser = data.receiver;

        const senderRealId = senderUser?.id;
        const receiverRealId = receiverUser?.id;

        const otherUser =
          Number(receiverRealId) === Number(currentUserId)
            ? senderUser
            : receiverUser;

        const otherName = otherUser?.username || "User";

        return {
          id: item.documentId || item.id,

          // senderName: data.senderName || "",
          // receiverName: data.receiverName || "",
          // // senderId: data.senderId,
          // // receiverId: data.receiverId,
          // senderId: data.senderId || getUserByName(data.senderName)?.id,
          // receiverId: data.receiverId || getUserByName(data.receiverName)?.id,

          // contactNo:
          //   data.receiverName === currentUser
          //     ? getContactByName(data.senderName)
          //     : getContactByName(data.receiverName),

          // name:
          //   data.receiverName === currentUser
          //     ? data.senderName
          //     : data.receiverName,

          sender: senderRealId,
          receiver: receiverRealId,

          // senderName: senderUser?.username || "",
          // receiverName: receiverUser?.username || "",
          senderName: senderUser?.username || "",
          receiverNameLocal: receiverUser?.username || "",

          contactNo:
            otherUser?.contactNo ||
            otherUser?.contact_no ||
            "No contact number",

          name: otherName,

          message: data.message || "",
          offer: data.offerSkill || "",
          want: data.wantSkill || "",
          status: data.requestStatus || "pending",

          time: data.createdAt
            ? new Date(data.createdAt).toLocaleString()
            : "Just now",

          initials:
            otherName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()
              .slice(0, 2) || "U",

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
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/requests/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            requestStatus: newStatus,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Update failed: ${res.status}`);
      }

      // fetchRequests();
      // window.dispatchEvent(new Event("requestUpdated"));
      setRequests((prev) =>
        prev.map((req) =>
          req.id === documentId ? { ...req, status: newStatus } : req,
        ),
      );

      window.dispatchEvent(new Event("requestUpdated"));
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  const incomingRequests = requests.filter(
    (req) => Number(req.receiver) === Number(currentUserId),
  );

  const outgoingRequests = requests.filter(
    (req) => Number(req.sender) === Number(currentUserId),
  );

  const currentRequests =
    activeTab === "incoming" ? incomingRequests : outgoingRequests;

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 py-8 md:py-12">
        <RequestsSkeleton />
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
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {currentRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-3xl p-5 shadow-sm">
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

                {/* <span
                  className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                    req.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : req.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {req.status}
                </span> */}
                <div className="flex items-center gap-3">
                  {req.status === "accepted" && (
                    <button
                      onClick={() => {
                        setSelectedRequest(req);
                        setIsReviewOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition"
                    >
                      Add Review
                    </button>
                  )}

                  <span
                    className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                      req.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : req.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-gray-600 text-sm italic">
                "{req.message}"
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-emerald-50 text-emerald-700 text-[11px] font-medium px-3 py-1 rounded-lg">
                  Offers: {req.offer}
                </span>

                <span className="bg-orange-50 text-orange-700 text-[11px] font-medium px-3 py-1 rounded-lg">
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

              {/* {req.status === "accepted" && (
                <div className="mt-4 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                  <p className="text-sm font-semibold text-green-700">
                    Contact Number
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    📞 {req.contactNo}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedRequest(req);
                      setIsReviewOpen(true);
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-pink-600 text-white text-sm font-semibold hover:bg-pink-700 transition"
                  >
                    Add Review
                  </button>
                </div>
              )} */}

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
      <LeaveReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        request={selectedRequest}
      />
    </div>
  );
}
