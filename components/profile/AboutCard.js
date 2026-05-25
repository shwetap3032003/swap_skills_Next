// import { Star, Repeat, Users } from "lucide-react";

// export default function AboutCard() {
//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100">
//       <h2 className="font-bold text-lg mb-3">About</h2>

//       <p className="text-gray-600 text-sm leading-relaxed mb-6">
//         Full-stack developer and amateur photographer. Love teaching
//         Python and always eager to learn new things.
//       </p>

//       <div className="flex flex-wrap gap-2">
//         <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
//           <Star size={14} fill="currentColor" /> 4.8 avg
//         </span>

//         <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
//           <Repeat size={14} /> 23 swaps
//         </span>

//         <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
//           <Users size={14} /> 156 connections
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AboutCard({ user, setUser }) {
  const [aboutText, setAboutText] = useState("");
  const [aboutId, setAboutId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    if (user?.aboutText) {
      setAboutText(user.aboutText.aboutText || "");
      setAboutId(user.aboutText.documentId || null);
    }
  }, [user]);

  useEffect(() => {
    resizeTextarea();
  }, [aboutText, isEditing]);

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const url = aboutId
        ? `${API_URL}/api/abouts/${aboutId}`
        : `${API_URL}/api/abouts`;

      const method = aboutId ? "PUT" : "POST";

      const bodyData = aboutId
        ? {
            data: {
              aboutText,
            },
          }
        : {
            data: {
              aboutText,
              user: user.id,
            },
          };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const result = await res.json();

      if (!res.ok) {
        console.log("Save about error:", result);
        toast.error("About not saved");
        return;
      }

      setAboutId(result?.data?.documentId);
      setAboutText(result?.data?.aboutText || aboutText);

      setUser?.((prev) => ({
        ...prev,
        aboutText: {
          ...(prev?.aboutText || {}),
          documentId: result?.data?.documentId || aboutId,
          aboutText: result?.data?.aboutText || aboutText,
        },
      }));

      setIsEditing(false);
      toast.success("Edited successfully");
    } catch (error) {
      console.log("Save about error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAboutText(user?.aboutText?.aboutText || "");
    setIsEditing(false);
  };

  const hasAbout = aboutText.trim() !== "";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 overflow-visible">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">About</h2>

        {!isEditing && hasAbout && (
          <button
            onClick={() => setIsEditing(true)}
            className="w-7 h-7 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-pink-500 transition"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>

      {!isEditing && !hasAbout && (
        <div>
          <p className="text-slate-500 text-sm mb-3">
            Write something about you
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
          >
            Add
          </button>
        </div>
      )}

      {!isEditing && hasAbout && (
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line wrap-break-word">
          {aboutText}
        </p>
      )}

      {isEditing && (
        <div>
          <textarea
            ref={textareaRef}
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            onInput={resizeTextarea}
            placeholder="Write something about you..."
            className="w-full min-h-25 overflow-hidden border border-gray-300 rounded-xl p-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-xl border border-gray-300 text-slate-700 font-semibold hover:bg-gray-50 transition disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}