export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 pb-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-8 animate-pulse">
        <div className="h-4 w-48 bg-gray-800 rounded" />
        <div className="h-10 w-24 bg-gray-800 rounded" />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-pulse">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden h-96 flex flex-col justify-between px-4 pt-4 pb-10">
            <div className="w-full aspect-square bg-gray-800 rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-2/3 bg-gray-800 rounded" />
              <div className="h-3 w-1/3 bg-gray-800 rounded" />
            </div>
            <div className="flex justify-between items-center mt-4 mb-4">
              <div className="h-4 w-1/4 bg-gray-800 rounded" />
              <div className="h-8 w-8 bg-gray-800 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
