"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StatusDropdown from "@/components/admin/StatusDropdown";

export default function OrderDetails({ initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPayment, setUpdatingPayment] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.order) {
        setOrder((prev) => ({
          ...prev,
          orderStatus: data.order.orderStatus,
        }));
      } else {
        alert(data.error || "Failed to update order status");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handlePaymentChange = async (newPayment) => {
    setUpdatingPayment(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newPayment }),
      });
      const data = await res.json();
      if (res.ok && data.order) {
        setOrder((prev) => ({
          ...prev,
          paymentStatus: data.order.paymentStatus,
        }));
      } else {
        alert(data.error || "Failed to update payment status");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update payment status");
    } finally {
      setUpdatingPayment(false);
    }
  };

  const shippingActivity = [
    { label: "Order was placed", note: "Order successfully submitted by customer", done: true },
    { label: "Processing", note: "Preparing package for dispatch", done: ["processing", "shipped", "delivered"].includes(order.orderStatus) },
    { label: "Dispatched", note: "Item has been handed over to courier service", done: ["shipped", "delivered"].includes(order.orderStatus) },
    { label: "Delivered", note: "Package successfully delivered to the customer", done: order.orderStatus === "delivered" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Order Details</h1>
          <p className="text-xs text-gray-400 mt-1">Placed on: {order.createdAt}</p>
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
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h2 className="text-[14px] font-semibold text-gray-700 mb-4">Customer Details</h2>

            {/* Avatar + Name */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-[#C8A84B] to-amber-600 flex items-center justify-center text-white text-sm font-bold">
                  {order.customer.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-gray-900">{order.customer.name}</p>
                <p className="text-[12px] text-gray-400">Order ID: {order.customer.customerId}</p>
              </div>
            </div>

            {/* Orders */}
            <p className="text-[13px] font-semibold text-gray-700 mb-3">{order.items.length} Items ordered</p>
            <div className="space-y-3 mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-amber-50 flex-shrink-0 flex items-center justify-center border border-amber-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="object-contain w-full h-full p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-[13px] text-amber-700 font-semibold">₹{item.price.toFixed(2)}</p>
                    <p className="text-[11.5px] text-gray-400 mt-0.5">
                      Qty: <span className="text-gray-600 font-medium">{item.qty}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <p className="text-[13px] font-semibold text-gray-700 mb-3">Payment Summary</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">Subtotal ({order.items.length} items)</span>
                  <span className="text-[13px] text-gray-700">₹{order.payment.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">Delivery</span>
                  <span className="text-green-600 font-medium">
                    {order.payment.delivery === 0 ? "FREE" : `₹${order.payment.delivery.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">Tax</span>
                  <span className="text-[13px] text-gray-700">₹{order.payment.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-gray-900">Total</span>
                  <span className="text-[13px] font-bold text-amber-700">₹{order.payment.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Delivery Info */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h2 className="text-[14px] font-semibold text-gray-700 mb-4">Delivery & Payment Method</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div>
                <p className="text-[12px] font-semibold text-gray-500 mb-2">Contact Info</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[12.5px] text-gray-600 truncate">
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
                  <div className="pt-2 border-t border-gray-50 mt-2">
                    <p className="text-[12px] font-semibold text-gray-500 mb-1">Payment Type</p>
                    <span className="text-[12.5px] text-gray-700 capitalize">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <p className="text-[12px] font-semibold text-gray-500 mb-2">Shipping Address</p>
                <div className="text-[12.5px] text-gray-600 space-y-0.5">
                  <p className="font-semibold text-gray-900">{order.delivery.name}</p>
                  <p className="leading-relaxed">{order.delivery.address}</p>
                  <p>Phone: {order.delivery.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Activity */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h2 className="text-[14px] font-semibold text-gray-700 mb-4">Manage Order Status</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center bg-amber-50/60 border border-amber-100 rounded-lg px-4 py-3 mb-6">
              <div className="flex-1">
                <span className="text-[13px] font-semibold text-gray-700 block mb-1">Order Status:</span>
                <StatusDropdown
                  current={order.orderStatus}
                  options={["placed", "processing", "shipped", "delivered", "cancelled"]}
                  onChange={handleStatusChange}
                />
              </div>
              <div className="flex-1 border-t sm:border-t-0 sm:border-l border-amber-200/55 pt-3 sm:pt-0 sm:pl-4">
                <span className="text-[13px] font-semibold text-gray-700 block mb-1">Payment Status:</span>
                <StatusDropdown
                  current={order.paymentStatus}
                  options={["pending", "paid", "failed", "refunded"]}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0 pl-1 mt-2">
              {shippingActivity.map((step, i) => {
                const isLast = i === shippingActivity.length - 1;
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        step.done
                          ? "bg-green-600 border-2 border-green-600"
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

                    <div className="pb-4">
                      <p className={`text-[13px] font-semibold leading-tight ${step.done ? "text-gray-800" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                      <p className="text-[11.5px] mt-0.5 text-gray-400">
                        {step.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
