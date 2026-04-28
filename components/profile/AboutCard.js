import { Star, Repeat, Users } from "lucide-react";

export default function AboutCard() {
  return (
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
  );
}