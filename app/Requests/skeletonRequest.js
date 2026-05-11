export default function RequestsSkeleton() {
  return (
    <div className="mt-8 space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-white rounded-3xl p-5 shadow-sm border-l-4 border-gray-200 animate-pulse"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-200" />

              {/* Name & Time */}
              <div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
              </div>
            </div>

            {/* Status */}
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>

          {/* Message */}
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
          </div>

          {/* Skills */}
          <div className="flex gap-2 mt-4">
            <div className="h-7 w-24 bg-gray-200 rounded-lg" />
            <div className="h-7 w-24 bg-gray-200 rounded-lg" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <div className="h-10 w-24 bg-gray-200 rounded-xl" />
            <div className="h-10 w-24 bg-gray-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}