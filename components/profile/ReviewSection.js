// import { Star } from "lucide-react";

// export default function ReviewSection({ onWrite }) {
//   const reviews = [
//     {
//       name: "Alex Rivera",
//       date: "March 2025",
//       initials: "AR",
//       color: "bg-rose-500",
//       rating: 5,
//       text: "Jordan is an amazing teacher. Very patient and structured.",
//     },
//     {
//       name: "Maya Chen",
//       date: "Feb 2025",
//       initials: "MC",
//       color: "bg-slate-800",
//       rating: 5,
//       text: "Excellent communicator and very knowledgeable.",
//     },
//   ];

//   return (
//     <div className="space-y-6">
      
//       <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className={`p-6 ${
//               index !== reviews.length - 1 ? "border-b" : ""
//             }`}
//           >
//             <div className="flex justify-between items-start mb-3">
              
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${review.color}`}
//                 >
//                   {review.initials}
//                 </div>

//                 <div>
//                   <h4 className="text-sm font-bold text-gray-800">
//                     {review.name}
//                   </h4>
//                   <span className="text-xs text-gray-400">
//                     {review.date}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex gap-0.5">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     size={14}
//                     className={
//                       i < review.rating
//                         ? "fill-amber-400 text-amber-400"
//                         : "text-gray-200"
//                     }
//                   />
//                 ))}
//               </div>

//             </div>

//             <p className="text-gray-600 text-sm italic">
//               "{review.text}"
//             </p>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={onWrite}
//         className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 bg-white"
//       >
//         + Write a Review
//       </button>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ReviewsSection({ user }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        if (!user?.id) return;

        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_URL}/api/reviews?filters[ratedTo][userId][$eq]=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();

        if (!res.ok) {
          console.log("Review fetch error:", result);
          return;
        }

        setReviews(result.data || []);
      } catch (err) {
        console.log("Fetch reviews error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-6 text-sm text-gray-400">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {reviews.length === 0 ? (
          <p className="p-6 text-sm text-gray-400 text-center">
            No reviews yet.
          </p>
        ) : (
          reviews.map((review, index) => {
            const data = review.attributes || review;

            return (
              <div
                key={review.id || index}
                className={`p-6 ${
                  index !== reviews.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-rose-500">
                      {data.ratedBy?.initials || "U"}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-800 leading-none">
                        {data.ratedBy?.username || "Unknown User"}
                      </h4>

                      <span className="text-xs text-gray-400">
                        {data.createdAt
                          ? new Date(data.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Number(data.ratingCount)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-sm italic leading-relaxed">
                  "{data.comment}"
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}