export const metadata = {
  title: "Dashboard | Honey Bee Admin",
  description: "Monitor your store's progress and sales.",
};

const stats = [
  {
    id: "total-sales",
    label: "Total Sales",
    value: "120,452",
    change: "80%",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "customers",
    label: "Customers",
    value: "21,675.01",
    change: "90%",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "product",
    label: "Product",
    value: "1.423",
    change: "88%",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    id: "revenue",
    label: "Revenue",
    value: "$220,745,00",
    change: "88%",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const orders = [
  {
    id: "#345918",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Ahmad Lipshutz", email: "ahmadlipshutz@gmail.com", avatar: "AL", color: "bg-gray-700" },
    payment: "Successful",
    status: "Scheduled",
    statusColor: "bg-amber-100 text-amber-700",
    method: { type: "card", last4: "1234" },
  },
  {
    id: "#345817",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Kadin Kenter", email: "kadinkenter@gmail.com", avatar: "KK", color: "bg-green-600" },
    payment: "Successful",
    status: "Scheduled",
    statusColor: "bg-amber-100 text-amber-700",
    method: { type: "paypal", email: "···@gmail.com" },
  },
  {
    id: "#345716",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Ryan Mango", email: "ryanmango@gmail.com", avatar: "RM", color: "bg-red-500" },
    payment: "Successful",
    status: "Cancel",
    statusColor: "bg-red-100 text-red-600",
    method: { type: "card", last4: "1234" },
  },
  {
    id: "#345615",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Charlie Botosh", email: "charliebotosh@gmail.com", avatar: "CB", color: "bg-gray-600" },
    payment: "Successful",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-700",
    method: { type: "paypal", email: "···@gmail.com" },
  },
  {
    id: "#345514",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Phillip Culhane", email: "phillipculhane@gmail.com", avatar: "PC", color: "bg-purple-500" },
    payment: "Successful",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-700",
    method: { type: "paypal", email: "···@gmail.com" },
  },
  {
    id: "#345613",
    date: "Apr 15, 2024, 10:21",
    customer: { name: "Adison Schleifer", email: "adisonschleifer@gmail.com", avatar: "AS", color: "bg-orange-500" },
    payment: "Successful",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-700",
    method: { type: "card", last4: "1234" },
  },
];

function CardIcon({ icon }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white flex-shrink-0">
      {icon}
    </div>
  );
}

function MethodBadge({ method }) {
  if (method.type === "card") {
    return (
      <div className="flex items-center gap-1.5">
        {/* Mastercard icon */}
        <div className="flex">
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-90" />
          <div className="w-4 h-4 rounded-full bg-yellow-400 opacity-90 -ml-2" />
        </div>
        <span className="text-[12px] text-gray-500">··· {method.last4}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      {/* PayPal icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#003087">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
      </svg>
      <span className="text-[12px] text-gray-500">{method.email}</span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-[13px] text-gray-500 mt-0.5">Monitor your store's progress to increase your sales.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <CardIcon icon={stat.icon} />
              <span className="text-[13px] text-gray-500 font-medium">{stat.label}</span>
            </div>
            <p className="text-[22px] font-bold text-gray-900 mb-2">{stat.value}</p>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5 text-[12px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                {stat.change}
              </span>
              <span className="text-[12px] text-gray-400">vs last 7 days</span>
            </div>
          </div>
        ))}
      </div>

      {/* Order List Section */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 pt-5 pb-4 border-b border-gray-50">
          <h2 className="text-[16px] font-bold text-gray-900">Order List</h2>
          <p className="text-[12px] text-gray-400 mt-0.5">Track orders list across your store.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th>
                  
                </th>
                <th className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Order</th>
                <th className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Payment</th>
                <th className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-3 py-3 text-right pr-5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/60 transition-colors duration-100">
                  {/* Checkbox */}
                  <td className="pl-5 pr-3 py-4">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-gray-800" />
                  </td>
                  {/* Order ID */}
                  <td className="px-3 py-4 text-[13px] font-medium text-gray-800">{order.id}</td>
                  {/* Date */}
                  <td className="px-3 py-4 text-[12px] text-gray-500 whitespace-nowrap">{order.date}</td>
                  {/* Customer */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 ${order.customer.color}`}>
                        {order.customer.avatar}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-gray-800 leading-tight">{order.customer.name}</p>
                        <p className="text-[11px] text-gray-400 leading-tight">{order.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* Payment */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-[12px] text-gray-700">{order.payment}</span>
                    </div>
                  </td>
                  {/* Status */}
                  <td className="px-3 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold border ${
                      order.status === "Scheduled"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : order.status === "Delivered"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  {/* Method */}
                  <td className="px-3 py-4">
                    <MethodBadge method={order.method} />
                  </td>
                  {/* Actions */}
                  <td className="px-3 py-4 pr-5 text-right">
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ml-auto">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
