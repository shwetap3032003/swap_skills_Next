export default function SkeletonCard() {
  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 min-h-65 animate-pulse">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-slate-200"></div>

          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-32 mb-3"></div>
            <div className="h-3 bg-slate-200 rounded w-40 mb-3"></div>
            <div className="h-3 bg-slate-200 rounded w-24"></div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
          <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
          <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="h-4 w-20 bg-slate-200 rounded"></div>

          <div className="h-9 w-24 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </>
  );
}
