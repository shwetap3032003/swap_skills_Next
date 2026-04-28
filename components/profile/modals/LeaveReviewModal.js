"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

export default function LeaveReviewModal({ isOpen, onClose, targetName }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log({ rating, comment });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-5 sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17172a]">
            Leave a Review
          </h2>

          <button onClick={onClose}>
            <X size={24} className="hover:text-gray-600" />
          </button>
        </div>

        <p className="text-sm sm:text-base mb-4">
          Rate your experience with{" "}
          <span className="font-bold">{targetName || "User"}</span>
        </p>

        {/* Rating */}
        <div className="mb-5">
          <label className="block text-sm sm:text-base font-medium text-[#4b4b6b] mb-2">
            Rating
          </label>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={24}
                  className={
                    star <= (hover || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm sm:text-base font-medium text-[#4b4b6b] mb-2">
            Comment
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={3}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm sm:text-base text-gray-700  focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-2xl text-sm sm:text-base font-bold transition"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}