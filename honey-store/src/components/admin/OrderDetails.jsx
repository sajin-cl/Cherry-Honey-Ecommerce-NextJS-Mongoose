import Image from "next/image";
import Link from "next/link";
import StatusDropdown from "@/components/admin/StatusDropdown";

// ─── Mock data shape (replace with real DB fetch) ────────────────────────────
const MOCK_ORDER = {
  id: "#32543",
  customer: {
    name: "Sajin",
    customerId: "#345918",
    avatar: "/honey-product.png",
    email: "ahmadlipshutz@gmail.com",
    phone: "+1 234 532 1332",
  },
  items: [
    { name: "Honey", price: 124, qty: 1, size: "US 45", color: "Black" },
    { name: "Honey", price: 130, qty: 1, size: "US 45", color: "Black" },
    { name: "Honey", price: 134, qty: 1, size: "US 45", color: "Black" },
  ],
  shipping: {
    carrier: "FedEx",
    service: "First class package",
    cost: 12,
  },
  payment: {
    subtotal: 388,
    delivery: 12,
    tax: 0,
    total: 400,
  },
  delivery: {
    name: "Ahmad Lipshutz",
    address: "14554 Friesen Pine Apt. 843",
    city: "Lake Ferneville",
    zip: "78464-4849",
    country: "United States",
  },
  shippingActivity: [
    { label: "Order was placed", sublabel: `Order ID: #32543`, note: "Pick-up scheduled with courier", done: true },
    { label: "Pick-up", note: "Pick-up scheduled with courier", done: true },
    { label: "Dispatched", note: "Item has been picked up by courier", done: true },
    { label: "Package arrived", note: "Package arrived at an Cherry Honey facility, NY", done: true },
    { label: "Dispatched for delivery", note: "Package has left an Cherry Honey facility, NY", done: false, current: true },
    { label: "Delivery", note: "Package will be delivered by tomorrow", done: false },
  ],
};

export default function OrderDetails({ orderId }) {
  const order = MOCK_ORDER; // Replace: const order = await fetchOrder(orderId);

  const subtotal = order.items.reduce((acc, i) => acc + i.price, 0);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Order Details</h1>
        </div>
        <Link
          href="/admin/orders"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── LEFT COLUMN ──────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Customer Details */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="text-[14px] font-semibold text-gray-700 mb-4">Customer Details</h2>

            {/* Avatar + Name */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-sm font-bold">
                  S
                </div>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-gray-900">{order.customer.name}</p>
                <p className="text-[12px] text-gray-400">Customer ID: {order.customer.customerId}</p>
              </div>
            </div>

            {/* Orders */}
            <p className="text-[13px] font-semibold text-gray-700 mb-3">{order.items.length} Orders</p>
            <div className="space-y-3 mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-amber-50 flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/honey-product.png"
                      alt={item.name}
                      width={56}
                      height={56}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-800">{item.name}</p>
                    <p className="text-[13px] text-gray-600">${item.price}</p>
                    <p className="text-[11.5px] text-gray-400 mt-0.5">
                      Qty: <span className="text-gray-600 font-medium">{item.qty}</span>
                      &nbsp;&nbsp;Size: <span className="text-gray-600 font-medium">{item.size}</span>
                      &nbsp;&nbsp;Color: <span className="text-gray-600 font-medium">{item.color}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-semibold text-gray-800">{order.shipping.carrier}</span>
                  <span className="text-[12px] text-gray-400 ml-2">({order.shipping.service})</span>
                </div>
                <span className="text-[13px] font-semibold text-gray-800">${order.shipping.cost.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-[13px] font-semibold text-gray-700 mb-3">Payment Summary</p>
              <div className="space-y-2">
                {[
                  { label: `Subtotal (${order.items.length} items)`, value: order.payment.subtotal },
                  { label: "Delivery", value: order.payment.delivery },
                  { label: "Tax", value: order.payment.tax },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-500">{label}</span>
                    <span className="text-[13px] text-gray-700">${value.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-2 mt-2 flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-gray-800">Total</span>
                  <span className="text-[13px] font-semibold text-gray-800">${order.payment.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Delivery Info */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="text-[14px] font-semibold text-gray-700 mb-4">Delivery</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Contact Info */}
              <div>
                <p className="text-[12px] font-semibold text-gray-500 mb-2">Contact Info</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[12.5px] text-gray-600">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {order.customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-[12.5px] text-gray-600">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {order.customer.phone}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <p className="text-[12px] font-semibold text-gray-500 mb-2">Shipping Address</p>
                <div className="text-[12.5px] text-gray-600 space-y-0.5">
                  <p>{order.delivery.name}</p>
                  <p>{order.delivery.address}</p>
                  <p>{order.delivery.city}</p>
                  <p>{order.delivery.zip}</p>
                  <p>{order.delivery.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Activity */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="text-[14px] font-semibold text-gray-700 mb-4">Shipping Activity</h2>

            {/* Update Status row */}
            <div className="flex items-center gap-3 bg-amber-50/60 border border-amber-100 rounded-lg px-4 py-2.5 mb-5">
              <span className="text-[13px] font-semibold text-gray-700 whitespace-nowrap">Update Status:</span>
              <StatusDropdown current="Dispatched for delivery" />
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {order.shippingActivity.map((step, i) => {
                const isLast = i === order.shippingActivity.length - 1;
                return (
                  <div key={i} className="flex gap-3">
                    {/* Icon + line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        step.done
                          ? "bg-green-600 border-2 border-green-600"
                          : step.current
                          ? "bg-white border-2 border-green-600"
                          : "bg-white border-2 border-gray-300"
                      }`}>
                        {step.done && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 h-8 mt-0.5 ${step.done ? "bg-green-200" : "bg-gray-100"}`} />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pb-4">
                      <p className={`text-[13px] font-semibold leading-tight ${
                        step.current ? "text-amber-600" : "text-gray-800"
                      }`}>
                        {step.sublabel
                          ? <>{step.label} <span className="font-bold">({step.sublabel})</span></>
                          : step.label
                        }
                      </p>
                      <p className={`text-[11.5px] mt-0.5 ${
                        step.current ? "text-amber-500" : "text-gray-400"
                      }`}>
                        {step.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Manage Activity button */}
            <div className="flex justify-end mt-2">
              <button className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-[13px] font-semibold rounded-lg transition-colors">
                Manage Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
