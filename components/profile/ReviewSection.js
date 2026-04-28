import { Star } from "lucide-react";

export default function ReviewSection({ onWrite }) {
  const reviews = [
    {
      name: "Alex Rivera",
      date: "March 2025",
      initials: "AR",
      color: "bg-rose-500",
      rating: 5,
      text: "Jordan is an amazing teacher. Very patient and structured.",
    },
    {
      name: "Maya Chen",
      date: "Feb 2025",
      initials: "MC",
      color: "bg-slate-800",
      rating: 5,
      text: "Excellent communicator and very knowledgeable.",
    },
  ];

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`p-6 ${
              index !== reviews.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${review.color}`}
                >
                  {review.initials}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    {review.name}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {review.date}
                  </span>
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

            <p className="text-gray-600 text-sm italic">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onWrite}
        className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 bg-white"
      >
        + Write a Review
      </button>
    </div>
  );
}