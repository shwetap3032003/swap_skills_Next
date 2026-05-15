import React from "react";
import { Star } from "lucide-react";

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

export default function ReviewsSection() {
  return (
    <div className="space-y-6">
      {/* Reviews Container */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`p-6 ${index !== reviews.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
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

              {/* Star Rating */}
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

      {/* Action Button */}
      <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
        <span className="text-lg">+</span> Write a Review
      </button>
    </div>
  );
}
