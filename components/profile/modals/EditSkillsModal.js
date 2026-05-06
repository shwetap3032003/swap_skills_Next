"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function EditSkillsModal({
  isOpen,
  onClose,
  skills,
  setSkills,
}) {
  const [offerInput, setOfferInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const addSkill = (type, value) => {
    if (!value.trim()) return;

    setSkills((prev) => ({
      ...prev,
      [type]: [...prev[type], value.trim()],
    }));

    type === "offer" ? setOfferInput("") : setLearnInput("");
  };

  const removeSkill = (type, index) => {
    setSkills((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      // 1. Fetch existing record to get the correct Document ID
      const checkRes = await fetch(
        `http://localhost:1337/api/edit-skills?filters[user][id][$eq]=${storedUser.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const checkData = await checkRes.json();

      let url = "http://localhost:1337/api/edit-skills";
      let method = "POST";

      // ✅ Strapi v5 Data Structure
      const body = {
        data: {
          offerSkills: skills.offer,
          learnSkills: skills.learn, // Ensure this matches your Strapi Field API ID exactly
          user: storedUser.id,
        },
      };

      // 2. Check if we should use PUT (Update) instead of POST (Create)
      if (checkData.data && checkData.data.length > 0) {
        // In Strapi v5, use documentId for the URL path
        const docId = checkData.data[0].documentId;

        // If documentId isn't available for some reason, fallback to id
        const identifier = docId || checkData.data[0].id;

        url = `http://localhost:1337/api/edit-skills/${identifier}`;
        method = "PUT";
      }

      // 3. Send the request
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log("skills saved successfully");
        alert("Skills Saved Successfully");
        onClose();
      } else {
        const errorData = await res.json();
        console.error("STRAPI ERROR DETAILS:", errorData.error);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-4 sm:p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Edit Skills
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-gray-600" size={20} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
            Skills I Offer
          </p>

          <div className="flex gap-2">
            <input
              value={offerInput}
              onChange={(e) => setOfferInput(e.target.value)}
              placeholder="e.g. Python, Photoshop..."
              className="flex-1 px-3 py-2 rounded-lg border bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <button
              onClick={() => addSkill("offer", offerInput)}
              className="px-3 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {skills.offer.map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs"
              >
                ✓ {skill}
                <button onClick={() => removeSkill("offer", i)}>✕</button>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
            Skills I Want to Learn
          </p>

          <div className="flex gap-2">
            <input
              value={learnInput}
              onChange={(e) => setLearnInput(e.target.value)}
              placeholder="e.g. Guitar, Spanish..."
              className="flex-1 px-3 py-2 rounded-lg border bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              onClick={() => addSkill("learn", learnInput)}
              className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {skills.learn.map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs"
              >
                → {skill}
                <button onClick={() => removeSkill("learn", i)}>✕</button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Skills"}
        </button>
      </div>
    </div>
  );
}
