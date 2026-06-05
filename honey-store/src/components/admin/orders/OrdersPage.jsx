"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { STATUS_COLORS } from "@/config/staticData";


const PAYMENT_COLORS = {
  paid: "text-green-600",
  pending: "text-amber-600",
  failed: "text-red-500",
};

export default function AdminOrdersClient({ orders, page, totalPages, total, search }) {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState(search);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchVal) params.set("search", searchVal);
    params.set("page", "1");
    router.push(`/admin/orders?${params.toString()}`);
  }

  function buildPage(p) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(p));
    return `/admin/orders?${params.toString()}`;
  }

  const from = total === 0 ? 0 : (page - 1) * 10 + 1;
  const to = Math.min(page * 10, total);

  return (
    <div className="max-w-full">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Order List</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">Track all orders across your store.</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-5 flex gap-2">
        <div className="relative max-w-sm flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search customer name..."
            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-[13px] font-semibold rounded-lg transition-colors">
          Search
        </button>
      </form>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Order</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Payment</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Total</th>
                <th className="px-4 py-3.5 text-right pr-5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.length === 0 && (
                <tr><td colSpan={7} className="py-12 text-center text-[13px] text-gray-400 whitespace-nowrap">No orders found.</td></tr>
              )}
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-4 text-[13px] font-semibold text-gray-800 whitespace-nowrap">{order.shortId}</td>
                  <td className="px-4 py-4 text-[12px] text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <p className="text-[13px] font-medium text-gray-800">{order.customer?.name}</p>
                    <p className="text-[11px] text-gray-400">{order.customer?.email}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`text-[12px] font-semibold ${PAYMENT_COLORS[order.paymentStatus] ?? "text-gray-500"}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold border ${STATUS_COLORS[order.orderStatus] ?? ""}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[13px] font-medium text-gray-700 whitespace-nowrap">
                    ₹{order.grandTotal?.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-4 pr-5 text-right whitespace-nowrap">
                    <Link href={`/admin/orders/${order.id}`} className="text-[12px] text-amber-600 hover:text-amber-700 font-semibold">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray-400 text-center sm:text-left">Showing {from}–{to} of {total} orders</p>
          <div className="flex items-center justify-center gap-1">
            {page > 1 && (
              <Link href={buildPage(page - 1)} className="px-3 py-1.5 rounded text-[12px] text-gray-500 hover:bg-gray-100 transition-colors">← Prev</Link>
            )}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={buildPage(p)} className={`min-w-[32px] h-8 flex items-center justify-center rounded text-[13px] transition-colors ${p === page ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={buildPage(page + 1)} className="px-3 py-1.5 rounded text-[12px] text-gray-500 hover:bg-gray-100 transition-colors">Next →</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
