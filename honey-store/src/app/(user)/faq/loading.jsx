export default function FAQLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 px-6">
      <div className="max-w-4xl mx-auto text-center animate-pulse">
        <div className="h-4 w-24 bg-gray-800 rounded mx-auto mb-4" />
        <div className="h-14 w-80 bg-gray-800 rounded mx-auto mb-6" />
        <div className="h-4 w-96 bg-gray-800 rounded mx-auto mb-16" />
      </div>
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-48 bg-gray-800 rounded" />
            <div className="h-12 w-full bg-gray-900 rounded" />
            <div className="h-12 w-full bg-gray-900 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
