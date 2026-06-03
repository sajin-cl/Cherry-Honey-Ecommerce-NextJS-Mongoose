export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-pulse">
        {/* Left Side: Images Gallery Skeleton */}
        <div className="space-y-4">
          <div className="w-full aspect-square rounded-2xl bg-gray-900 border border-gray-800" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-gray-900 border border-gray-800" />
            ))}
          </div>
        </div>

        {/* Right Side: Info Skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-800 rounded" />
            <div className="h-10 w-3/4 bg-gray-800 rounded" />
          </div>
          
          <div className="h-20 w-full bg-gray-900 border border-gray-800 rounded-xl" />

          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-800 rounded" />
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 w-24 bg-gray-900 border border-gray-800 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="h-12 w-32 bg-gray-900 border border-gray-800 rounded-lg" />
            <div className="h-14 flex-1 bg-gray-800 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
