export default function MatchSkeletonCard() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 overflow-hidden shadow-sm animate-pulse"
          >
            <div className="p-5 sm:p-6 md:p-8 pb-4 relative">
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200" />

              <div className="flex gap-3 sm:gap-4 mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-slate-200" />

                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-32 mb-3" />
                  <div className="h-3 bg-slate-200 rounded w-24" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-slate-200 rounded-full w-20" />
                <div className="h-6 bg-slate-200 rounded-full w-24" />
                <div className="h-6 bg-slate-200 rounded-full w-16" />
              </div>
            </div>

            <div className="px-4 sm:px-6 md:px-8 py-3 border-t border-slate-100">
              <div className="h-10 bg-slate-200 rounded-lg w-full" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
