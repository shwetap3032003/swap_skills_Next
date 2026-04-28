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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-4 sm:p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Edit Skills
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-gray-600" size={20} />
          </button>
        </div>

        {/* Offer */}
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

        {/* Learn */}
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

        {/* Save */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600"
        >
          Save Skills
        </button>
      </div>
    </div>
  );
}