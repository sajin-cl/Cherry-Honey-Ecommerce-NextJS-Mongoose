export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6">
      <div className="max-w-7xl mx-auto text-center py-12 animate-pulse">
        <div className="h-4 w-24 bg-gray-800 rounded mx-auto mb-4" />
        <div className="h-14 w-80 bg-gray-800 rounded mx-auto mb-6" />
        <div className="h-4 w-96 bg-gray-800 rounded mx-auto mb-10" />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-900 border border-gray-800 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
