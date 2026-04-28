"use client";

import { useEffect } from "react";
import { X, ArrowRight } from "lucide-react";

export default function SendRequestModal({
  isOpen,
  onClose,
  skills,
  targetName,
}) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-6 animate-[fadeIn_0.2s_ease]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Send Request
          </h2>
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
            <label className="block text-xs font-medium text-gray-600 mb-1">
              I'll teach
            </label>
            <select className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400">
              {skills?.offer?.map((skill, i) => (
                <option key={i}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Learn */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              I want to learn
            </label>
            <select className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400">
              {skills?.learn?.map((skill, i) => (
                <option key={i}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
              rows={3}
              placeholder="Introduce yourself..."
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full mt-5 bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
        >
          Send Request <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}