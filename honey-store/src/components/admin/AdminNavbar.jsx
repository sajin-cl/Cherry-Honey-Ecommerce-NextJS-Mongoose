"use client";

export default function AdminNavbar() {
  return (
    <header className="h-[60px] bg-white border-b border-gray-100 flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search product, customer, etc..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-[13px] font-semibold text-gray-900 leading-tight">Sajin</p>
          <p className="text-[11px] text-gray-400 leading-tight">Admin</p>
        </div>
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-100">
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold">
            S
          </div>
        </div>
      </div>
    </header>
  );
}
