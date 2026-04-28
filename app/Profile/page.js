"use client";

import React, { useState } from "react";
import {
  Settings,
  Send,
  Star,
  Repeat,
  Users,
  Check,
  ArrowRight,
  X,
} from "lucide-react";

// --- Leave a Review Modal ---
const LeaveReviewModal = ({ isOpen, onClose, targetName }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log({ rating, comment });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-2 sm:p-4">
      {/* Modal */}
      <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto rounded-t-2xl sm:rounded-3xl shadow-xl flex flex-col overflow-hidden">
        {/* Content */}
        <div className="p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Leave a Review
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-gray-400 mb-4">
            Rate your experience with{" "}
            <span className="font-semibold text-gray-600">{targetName}</span>
          </p>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">
              Rating
            </label>

            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={22}
                    className={
                      star <= (hover || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">
              Comment
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-lg text-sm font-semibold"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Send Skill Request Modal ---
const SendRequestModal = ({ isOpen, onClose, skills, targetName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-2 sm:p-4">
      {/* Modal */}
      <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto rounded-t-2xl sm:rounded-3xl shadow-xl flex flex-col overflow-hidden">
        {/* Content */}
        <div className="p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Send Skill Request
            </h2>

            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            You're sending a request to{" "}
            <span className="font-semibold text-gray-700">{targetName}</span>
          </p>

          {/* Form */}
          <div className="space-y-3">
            {/* Teach */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                I'll teach
              </label>

              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20">
                {skills.offer.map((skill, i) => (
                  <option key={i}>{skill}</option>
                ))}
              </select>
            </div>

            {/* Learn */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                I want to learn
              </label>

              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20">
                {skills.learn.map((skill, i) => (
                  <option key={i}>{skill}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Message
              </label>

              <textarea
                rows={3}
                placeholder="Introduce yourself..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-none"
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
    </div>
  );
};

// --- Edit Skills Modal Component ---
const EditSkillsModal = ({ isOpen, onClose, skills, setSkills }) => {
  const [offerInput, setOfferInput] = useState("");
  const [learnInput, setLearnInput] = useState("");

  if (!isOpen) return null;

  const addSkill = (type, value) => {
    if (!value.trim()) return;
    if (type === "offer") {
      setSkills((prev) => ({ ...prev, offer: [...prev.offer, value] }));
      setOfferInput("");
    } else {
      setSkills((prev) => ({ ...prev, learn: [...prev.learn, value] }));
      setLearnInput("");
    }
  };

  const removeSkill = (type, index) => {
    setSkills((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-2 sm:p-4">
      {/* Modal */}
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-3xl shadow-xl flex flex-col">
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="h-32 bg-linear-to-r from-rose-400 to-rose-600 relative">
            <div className="max-w-6xl mx-auto px-4 h-full flex items-end">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:translate-y-1/2">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-rose-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                    SP
                  </div>

                  <div>
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                      Shweta Patel
                    </h1>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      📍 Chikhli
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE BUTTONS */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white shadow-sm text-xs sm:text-sm font-medium"
                  >
                    <Settings size={16} />
                    <span className="hidden sm:inline">Edit Skills</span>
                  </button>

                  <button
                    onClick={() => setIsRequestModalOpen(true)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-rose-500 text-white rounded-lg shadow-lg text-xs sm:text-sm font-medium"
                  >
                    <Send size={16} />
                    <span className="hidden sm:inline">Send Request</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full bg-rose-500 text-white py-2.5 rounded-xl text-sm font-semibold"
          >
            Save Skills
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Review List Section ---
const ReviewSection = ({ onWriteReview }) => {
  const reviews = [
    {
      name: "Alex Rivera",
      date: "March 2025",
      initials: "AR",
      color: "bg-rose-500",
      rating: 5,
      text: '"Jordan is an amazing guitar teacher. Very patient and structured. After 3 sessions I could already play my first song!"',
    },
    {
      name: "Maya Chen",
      date: "Feb 2025",
      initials: "MC",
      color: "bg-slate-800",
      rating: 5,
      text: '"Excellent communicator and super knowledgeable. Learned so much about React in just 2 sessions."',
    },
    {
      name: "Sam Torres",
      date: "Jan 2025",
      initials: "ST",
      color: "bg-emerald-400",
      rating: 4,
      text: '"Great session overall. Very professional and well-prepared. Would definitely swap again."',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`p-6 ${index !== reviews.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${review.color}`}
                >
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 leading-none">
                    {review.name}
                  </h4>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={onWriteReview}
        className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm bg-white"
      >
        <span className="text-lg">+</span> Write a Review
      </button>
    </div>
  );
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [skills, setSkills] = useState({
    offer: ["Python Programming", "Graphic Design", "Photography"],
    learn: ["Guitar", "Spanish", "Cooking"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <EditSkillsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        skills={skills}
        setSkills={setSkills}
      />

      <SendRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        skills={skills}
        targetName="Jordan Smith"
      />

      <LeaveReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        targetName="Alex Rivera"
      />

      {/* Header Area */}
      <div className="h-32 bg-linear-to-r from-rose-400 to-rose-600 relative">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-end">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 translate-y-1/2 w-full">
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-rose-500 flex items-center justify-center text-white text-3xl font-bold">
                SP
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Shweta Patel
                </h1>
                <p className="text-gray-500 text-sm">📍 Chikhli</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white shadow-sm font-medium w-full sm:w-auto"
              >
                <Settings size={16} /> Edit Skills
              </button>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-rose-500 text-white rounded-lg shadow-lg font-medium w-full sm:w-auto"
              >
                <Send size={16} /> Send Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-24 sm:mt-20 md:mt-24pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg mb-3">About</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Full-stack developer and amateur photographer. Love teaching
                Python and always eager to learn new things.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                  <Star size={14} fill="currentColor" /> 4.8 avg
                </span>
                <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  <Repeat size={14} /> 23 swaps
                </span>
                <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  <Users size={14} /> 156 connections
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-emerald-500 font-bold mb-4">
                Skills Offered
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {skills.offer.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-100"
                  >
                    <Check size={12} /> {skill}
                  </span>
                ))}
              </div>
              <h3 className="text-orange-500 font-bold mb-4">Wants to Learn</h3>
              <div className="flex flex-wrap gap-2">
                {skills.learn.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-orange-100"
                  >
                    <ArrowRight size={12} /> {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex gap-8">
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 transition-all duration-200 font-medium ${activeTab === "reviews" ? "border-b-2 border-rose-500 text-rose-500 font-bold" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`pb-4 transition-all duration-200 font-medium ${activeTab === "activity" ? "border-b-2 border-rose-500 text-rose-500 font-bold" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Activity
                </button>
              </nav>
            </div>
            {activeTab === "reviews" ? (
              <ReviewSection onWriteReview={() => setIsReviewModalOpen(true)} />
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 flex items-center justify-center">
                <p className="text-gray-400 text-center">
                  Recent activity will appear here once you start swapping.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
