export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200" />

            <div className="flex-1">
              <div className="h-6 w-48 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-32 bg-gray-200 rounded mb-4" />

              <div className="flex gap-3">
                <div className="h-9 w-24 bg-gray-200 rounded-xl" />
                <div className="h-9 w-28 bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="max-w-6xl mx-auto px-4 mt-24 grid md:grid-cols-12 gap-6">
        {/* Left Side */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="h-5 w-28 bg-gray-200 rounded mb-5" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="h-5 w-24 bg-gray-200 rounded mb-5" />

            <div className="flex flex-wrap gap-2 mb-5">
              <div className="h-7 w-20 bg-gray-200 rounded-full" />
              <div className="h-7 w-24 bg-gray-200 rounded-full" />
              <div className="h-7 w-16 bg-gray-200 rounded-full" />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="h-7 w-24 bg-gray-200 rounded-full" />
              <div className="h-7 w-20 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-8">
          <div className="flex gap-6 border-b mb-6">
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-20 bg-gray-200 rounded" />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="h-5 w-32 bg-gray-200 rounded mb-5" />

            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b last:border-b-0 py-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />

                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
                    <div className="h-3 w-full bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-4/5 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}