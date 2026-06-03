export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full animate-pulse">
        {/* Left text skeleton */}
        <div>
          <div className="h-4 w-32 bg-gray-800 rounded mb-4" />
          <div className="h-12 w-3/4 bg-gray-800 rounded mb-6" />
          <div className="h-4 w-full bg-gray-800 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-800 rounded mb-8" />
          <div className="flex gap-4">
            <div className="h-12 w-36 bg-gray-800 rounded" />
            <div className="h-12 w-36 bg-gray-800 rounded" />
          </div>
        </div>
        {/* Right image skeleton */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[500px] aspect-square rounded-2xl bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
