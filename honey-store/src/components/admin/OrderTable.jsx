"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_ORDERS = [
  {
    id: "#345918",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Ahmad Lipshutz", email: "ahmadlipshutz@gmail.com", avatar: "AL", color: "bg-gray-700" },
    payment: "Successful",
    status: "Scheduled",
    method: { type: "card", last4: "1234" },
  },
  {
    id: "#345817",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Kadin Kenter", email: "kadinkenter@gmail.com", avatar: "KK", color: "bg-green-600" },
    payment: "Successful",
    status: "Scheduled",
    method: { type: "paypal", email: "··· @gmail.com" },
  },
  {
    id: "#345716",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Ryan Mango", email: "ryanmango@gmail.com", avatar: "RM", color: "bg-red-400" },
    payment: "Successful",
    status: "Cancel",
    method: { type: "card", last4: "1234" },
  },
  {
    id: "#345615",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Charlie Botosh", email: "charliebotosh@gmail.com", avatar: "CB", color: "bg-gray-500" },
    payment: "Successful",
    status: "Delivered",
    method: { type: "paypal", email: "··· @gmail.com" },
  },
  {
    id: "#345514",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Phillip Culhane", email: "phillipculhane@gmail.com", avatar: "PC", color: "bg-purple-400" },
    payment: "Successful",
    status: "Delivered",
    method: { type: "paypal", email: "··· @gmail.com" },
  },
  {
    id: "#345613",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Adison Schleifer", email: "adisonschleifer@gmail.com", avatar: "AS", color: "bg-orange-500" },
    payment: "Successful",
    status: "Delivered",
    method: { type: "card", last4: "1234" },
  },
  {
    id: "#345612",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Giana Aminoff", email: "gianaaminoff@gmail.com", avatar: "GA", color: "bg-teal-500" },
    payment: "Successful",
    status: "Delivered",
    method: { type: "paypal", email: "··· @gmail.com" },
  },
  {
    id: "#345514",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Phillip Culhane", email: "phillipculhane@gmail.com", avatar: "PC", color: "bg-purple-400" },
    payment: "Successful",
    status: "Delivered",
    method: { type: "paypal", email: "··· @gmail.com" },
  },
];

const TOTAL_ENTRIES = 100;
const PER_PAGE = 8;
const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / PER_PAGE);

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const styles = {
    Scheduled: "border border-amber-400 text-amber-600 bg-amber-50",
    Cancel: "border border-red-300 text-red-500 bg-red-50",
    Delivered: "border border-green-400 text-green-600 bg-green-50",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11.5px] font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function MethodBadge({ method }) {
  if (method.type === "card") {
    return (
      <div className="flex items-center gap-2">
        <div className="flex">
          <div className="w-[18px] h-[18px] rounded-full bg-red-500" />
          <div className="w-[18px] h-[18px] rounded-full bg-yellow-400 -ml-2.5 opacity-90" />
        </div>
        <span className="text-[12.5px] text-gray-500">··· {method.last4}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1565c0">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
      </svg>
      <span className="text-[12.5px] text-gray-500">{method.email}</span>
    </div>
  );
}

function Avatar({ customer }) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 ${customer.color}`}>
      {customer.avatar}
    </div>
  );
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

function PaginationButton({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[32px] h-8 px-2 rounded text-[13px] font-medium flex items-center justify-center gap-0.5 transition-all duration-150 ${
        active
          ? "bg-gray-900 text-white"
          : disabled
          ? "text-gray-300 cursor-not-allowed"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OrderTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = ALL_ORDERS.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const from = (currentPage - 1) * PER_PAGE + 1;
  const to = Math.min(currentPage * PER_PAGE, TOTAL_ENTRIES);

  const pageNumbers = [1, 2, 3, 4, 5, "...", 15];

  return (
    <div className="max-w-full">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Order List</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">Track orders list across your store.</p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative w-full max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search order..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white transition-all"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Order</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Payment</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-4 py-3.5 text-right pr-5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order, idx) => (
                <tr key={`${order.id}-${idx}`} className="hover:bg-gray-50/60 transition-colors duration-100">
                  <td className="px-5 py-4 text-[13px] font-semibold text-gray-800">{order.id}</td>
                  <td className="px-4 py-4 text-[12.5px] text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar customer={order.customer} />
                      <div>
                        <p className="text-[13px] font-medium text-gray-800 leading-tight">{order.customer.name}</p>
                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{order.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-[12.5px] text-gray-700">{order.payment}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-4">
                    <MethodBadge method={order.method} />
                  </td>
                  <td className="px-4 py-4 pr-5">
                    <div className="flex items-center justify-end gap-1">
                      {idx === 0 && (
                        <>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                            <EditIcon />
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                            <DeleteIcon />
                          </button>
                        </>
                      )}
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <DotsIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[13px] text-gray-400">
                    No orders found matching &quot;{search}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: Entries + Pagination */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[12.5px] text-gray-400">
            Displaying {from} to {to} of {TOTAL_ENTRIES} entries
          </p>

          <div className="flex items-center gap-1">
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </PaginationButton>

            {pageNumbers.map((page, i) =>
              page === "..." ? (
                <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-[13px] text-gray-400">
                  ...
                </span>
              ) : (
                <PaginationButton
                  key={page}
                  active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationButton>
              )
            )}

            <PaginationButton
              disabled={currentPage === TOTAL_PAGES}
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            >
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </PaginationButton>
          </div>
        </div>
      </div>
    </div>
  );
}
