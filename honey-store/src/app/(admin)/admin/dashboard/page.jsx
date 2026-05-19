/**
 * SSR Admin Dashboard — real stats from DB.
 */
import { requireAdmin } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import User from "@/models/user.model";

export const metadata = {
  title: "Dashboard | Admin",
};

async function getStats() {
  await dbConnect();
  const [totalUsers, totalProducts, totalOrders, revenueData, recentOrders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } },
    ]),
    Order.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("user", "fullName email")
      .lean(),
  ]);
  return {
    totalUsers,
    totalProducts,
    totalOrders,
    revenue: revenueData[0]?.total ?? 0,
    recentOrders,
  };
}

function StatCard({ label, value, icon, change }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white flex-shrink-0">
          {icon}
        </div>
        <span className="text-[13px] text-gray-500 font-medium">{label}</span>
      </div>
      <p className="text-[22px] font-bold text-gray-900 mb-2">{value}</p>
      {change && (
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
            Live
          </span>
          <span className="text-[12px] text-gray-400">from database</span>
        </div>
      )}
    </div>
  );
}

const statusColors = {
  placed:      "bg-blue-50 text-blue-700 border-blue-200",
  processing:  "bg-amber-50 text-amber-700 border-amber-200",
  shipped:     "bg-purple-50 text-purple-700 border-purple-200",
  delivered:   "bg-green-50 text-green-700 border-green-200",
  cancelled:   "bg-red-50 text-red-600 border-red-200",
};

export default async function DashboardPage() {
  await requireAdmin();
  const { totalUsers, totalProducts, totalOrders, revenue, recentOrders } = await getStats();

  const stats = [
    {
      label: "Total Revenue",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    },
    {
      label: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    },
    {
      label: "Products",
      value: totalProducts.toLocaleString(),
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    },
    {
      label: "Customers",
      value: totalUsers.toLocaleString(),
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
  ];

  return (
    <div className="max-w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-[13px] text-gray-500 mt-0.5">Live data from your store.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => <StatCard key={s.label} {...s} change />)}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 pt-5 pb-4 border-b border-gray-50">
          <h2 className="text-[16px] font-bold text-gray-900">Recent Orders</h2>
          <p className="text-[12px] text-gray-400 mt-0.5">Latest {recentOrders.length} orders from your store.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Order</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.length === 0 && (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400 text-sm">No orders yet.</td></tr>
              )}
              {recentOrders.map((order) => (
                <tr key={order._id.toString()} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-4 text-[13px] font-medium text-gray-800">#{order._id.toString().slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-4">
                    <p className="text-[13px] font-medium text-gray-800">{order.user?.fullName ?? "—"}</p>
                    <p className="text-[11px] text-gray-400">{order.user?.email ?? ""}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold border ${statusColors[order.orderStatus] ?? ""}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-gray-700 font-medium">₹{order.grandTotal?.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-4 text-[12px] text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
