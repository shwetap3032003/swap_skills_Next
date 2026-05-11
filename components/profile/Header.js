"use client";

import { Settings, Send } from "lucide-react";

export default function Header({ user, onEdit, onRequest }) {
  const name = user?.username || "User";
  // const email = user?.email || "";
  const location = user?.location || "No location";
  const contactNo = user?.contactNo || "No Contact";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="h-32 bg-linear-to-r from-rose-400 to-rose-600 relative">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-end">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 translate-y-1/2 w-full">
          <div className="flex items-center gap-3">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-rose-500 flex items-center justify-center text-white text-3xl font-bold">
              {initials}
            </div>

            <div className="pt-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {name}
              </h1>

              <p className="text-blue-500 text-sm">📍 {location}</p>
              <p className="text-sm  text-blue-500">
                📞 {contactNo || "No contact number"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={onEdit}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white shadow-sm font-medium"
            >
              <Settings size={16} /> Edit Skills
            </button>

            <button
              onClick={onRequest}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-rose-500 text-white rounded-lg shadow-lg font-medium"
            >
              <Send size={16} /> Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
