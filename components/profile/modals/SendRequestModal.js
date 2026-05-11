"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SendRequestModal({
  isOpen,
  onClose,
  skills,
  targetName,
}) {
  const [offerSkill, setOfferSkill] = useState("");
  const [wantSkill, setWantSkill] = useState("");
  const [message, setMessage] = useState("");

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Set default values
  useEffect(() => {
    if (skills?.offer?.length > 0) {
      setOfferSkill(skills.offer[0]);
    }

    if (skills?.learn?.length > 0) {
      setWantSkill(skills.learn[0]);
    }
  }, [skills]);

  if (!isOpen) return null;

  // ✅ API CALL
  async function handleSendRequest() {
    if (!message.trim()) {
      toast.error("Message is required");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        toast.error("Please login first");
        return;
      }

      const res = await fetch("http://localhost:1337/api/requests", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          data: {
            senderName: storedUser.username,

            receiverName: targetName,

            offerSkill: offerSkill,

            wantSkill: wantSkill,

            message: message,

            requestStatus: "pending",
          },
        }),
      });

      const result = await res.json();

      console.log("REQUEST RESULT:", result);

      if (!res.ok) {
        throw new Error("Failed to send request");
      }

      // ✅ SUCCESS TOAST
      toast.success("Request sent successfully 🎉");

      console.log("Request sent ✅");

      // Close modal after small delay
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Error:", err);

      // ❌ ERROR TOAST
      toast.error("Failed to send request");
    }
  }

  return (
    <>
      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Send Request</h2>

            <button onClick={onClose}>
              <X className="text-gray-400 hover:text-gray-600" size={20} />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 mb-5">
            You're sending a request to{" "}
            <span className="font-semibold text-gray-700">
              {targetName || "User"}
            </span>
          </p>

          {/* Form */}
          <div className="space-y-4">
            {/* Offer */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                I'll teach
              </label>

              <select
                value={offerSkill}
                onChange={(e) => setOfferSkill(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm"
              >
                {skills?.offer?.map((skill, i) => (
                  <option key={i}>{skill}</option>
                ))}
              </select>
            </div>

            {/* Learn */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                I want to learn
              </label>

              <select
                value={wantSkill}
                onChange={(e) => setWantSkill(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm"
              >
                {skills?.learn?.map((skill, i) => (
                  <option key={i}>{skill}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Message
              </label>

              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Introduce yourself..."
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm resize-none"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSendRequest}
            className="w-full mt-5 bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            Send Request <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
