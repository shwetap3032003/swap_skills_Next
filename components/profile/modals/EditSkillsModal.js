"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function EditSkillsModal({
  isOpen,
  onClose,
  skills,
  setSkills,
}) {
  const [offerInput, setOfferInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //local temporary skills
  const [localSkills, setLocalSkills] = useState({
    offer: [],
    learn: [],
  });

  useEffect(() => {
    if (isOpen) {
      setLocalSkills({
        offer: skills?.offer || [],
        learn: skills?.learn || [],
      });
      setCategories(skills?.categories || []);
    }
  }, [isOpen, skills]);

  if (!isOpen) return null;

  const normalizeSkill = (skill = "") => {
    return (
      String(skill)
        .trim()
        .toLowerCase()

        // remove dots
        .replace(/\./g, "")

        // remove spaces
        .replace(/\s+/g, "")

        // remove dashes
        .replace(/-/g, "")
    );
  };

  const addSkill = (type, value) => {
    if (!value.trim()) return;

    const originalSkill = value.trim();
    const normalized = normalizeSkill(originalSkill);

    const alreadyExists = localSkills[type].some(
      (skill) => normalizeSkill(skill) === normalized,
    );

    if (alreadyExists) {
      toast.error("Skill already added");
      return;
    }

    setLocalSkills((prev) => ({
      ...prev,
      [type]: [...prev[type], originalSkill],
    }));

    type === "offer" ? setOfferInput("") : setLearnInput("");
  };

  const removeSkill = (type, index) => {
    setLocalSkills((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleCategoryChange = (value) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!token || !storedUser) {
        toast.error("Please login first");
        return;
      }

      if (categories.length === 0) {
        toast.error("Please select category");
        setLoading(false);
        return;
      }

      const checkRes = await fetch(`${API_URL}/api/edit-skills?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const checkData = await checkRes.json();

      // const existingSkill = checkData.data.find(
      //   (item) => item.user?.id === storedUser.id,
      // );

      const existingSkill = checkData.data.find((item) => {
        const user = item.user;

        return (
          user?.id === storedUser.id ||
          user?.documentId === storedUser.documentId ||
          user?.username === storedUser.username
        );
      });

      let url = `${API_URL}/api/edit-skills`;
      let method = "POST";

      const body = {
        data: {
          offerSkills: localSkills.offer,
          learnSkills: localSkills.learn,
          categories: categories,
          user: storedUser.id,
        },
      };

      // if (checkData.data && checkData.data.length > 0) {
      //   const docId = checkData.data[0].documentId;
      //   const identifier = docId || checkData.data[0].id;

      if (existingSkill) {
        const identifier = existingSkill.documentId || existingSkill.id;

        url = `${API_URL}/api/edit-skills/${identifier}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("STRAPI ERROR DETAILS:", result.error);
        toast.error("Skills not saved");
        return;
      }

      //update profile only after save success
      // setSkills(localSkills);
      setSkills({
        ...localSkills,
        categories,
      });

      toast.success("Skills Saved Successfully");
      onClose();
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Something went wrong");
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
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4 sm:p-5"
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
            {localSkills.offer.map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[11px]"
              >
                ✓ {skill}
                <button onClick={() => removeSkill("offer", i)}>✕</button>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
            Skills I Want to Learn
          </p>

          <div className="flex gap-2">
            <input
              value={learnInput}
              onChange={(e) => setLearnInput(e.target.value)}
              placeholder="e.g. Guitar, Spanish..."
              className="flex-1 px-3 py-1.5 rounded-lg border bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              onClick={() => addSkill("learn", learnInput)}
              className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {localSkills.learn.map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[11px]"
              >
                → {skill}
                <button onClick={() => removeSkill("learn", i)}>✕</button>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">
            Categories
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "Tech",
              "Music",
              "Design",
              "Fitness",
              "Language",
              "Cooking",
              "Gardening",
            ].map((cat) => (
              <label key={cat} className="flex items-center gap-1.5 text-xs sm:text-sm">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
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
