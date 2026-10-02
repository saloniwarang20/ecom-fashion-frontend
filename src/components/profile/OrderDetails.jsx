import {
  AlertCircle,
  Bell,
  CircleCheck,
  Clock3,
  Home,
  IndianRupee,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Truck,
  User,
  XCircle,
} from "lucide-react";

import { FiChevronLeft } from "react-icons/fi";
import paymentImages from "../../assets/payment/paymentImage";
import orderService from "../../services/orderService";

const paymentData = {
  UPI: {
    image: paymentImages.gpay,
    label: "UPI",
  },
  CARD: {
    image: paymentImages.visa,
    label: "Credit / Debit Card",
  },
  NET_BANKING: {
    image: paymentImages.sbi,
    label: "Net Banking",
  },
  COD: {
    image: paymentImages.cod,
    label: "Cash on Delivery",
  },
};

const paymentStatusData = {
  PAID: {
    icon: <CircleCheck className="text-green-600" size={18} />,
    text: "Paid Online",
  },
  PENDING: {
    icon: <Clock3 className="text-yellow-600" size={18} />,
    text: "Payment Pending",
  },
  FAILED: {
    icon: <XCircle className="text-red-600" size={18} />,
    text: "Payment Failed",
  },
  REFUNDED: {
    icon: <AlertCircle className="text-blue-600" size={18} />,
    text: "Refunded",
  },
};

const statusInfo = {
  PENDING: {
    icon: <Clock3 className="w-5 h-5" />,
    title: "Order Pending",
    message: "We're waiting to confirm your order.",
  },
  CONFIRMED: {
    icon: <CircleCheck className="w-5 h-5" />,
    title: "Order Confirmed",
    message: "Your order has been confirmed.",
  },
  SHIPPED: {
    icon: <Package className="w-5 h-5" />,
    title: "Shipped",
    message: "Your package is on its way.",
  },
  OUT_FOR_DELIVERY: {
    icon: <Truck className="w-5 h-5" />,
    title: "Out for Delivery",
    message: "Your package will arrive today.",
  },
  DELIVERED: {
    icon: <Home className="w-5 h-5" />,
    title: "Delivered",
    message: "Your order has been delivered.",
  },
  CANCELLED: {
    icon: <XCircle className="w-5 h-5" />,
    title: "Cancelled",
    message: "This order has been cancelled.",
  },
  RETURNED: {
    icon: <RotateCcw className="w-5 h-5" />,
    title: "Returned",
    message: "This order has been returned.",
  },
};

const OrderDetails = ({ order, onBack, refreshOrders }) => {
  const address = order.address;

  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      await orderService.cancelOrder(orderId);

      alert("Order cancelled successfully.");

      await refreshOrders();

      onBack();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order.");
    }
  };

  const canCancel =
    order.orderStatus === "PENDING" ||
    order.orderStatus === "CONFIRMED";

  return (
    <div className="w-full max-w-3xl mx-auto rounded-md bg-taupe-200 p-2 sm:p-4">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center text-sm font-semibold hover:underline mb-5 sm:mb-8 cursor-pointer"
      >
        <FiChevronLeft size={22} />
        Back
      </button>

      {/* Products */}
      <div>

        <div className="bg-white rounded-lg p-4 sm:p-6">

          <h2 className="text-sm sm:text-base font-bold mb-4">
            Ordered Products
          </h2>

          <div className="space-y-5">

            {order.items?.map((item, index) => (
              <div
                key={item.id || item.productId || index}
                className="flex gap-4 items-start"
              >

                {/* Product Image */}
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="h-32 w-24 sm:h-40 sm:w-28 rounded-md object-cover shrink-0"
                />

                {/* Product Information */}
                <div className="flex-1 min-w-0">

                  <p className="text-sm sm:text-base text-gray-700 font-bold break-words">
                    {item.productName}
                  </p>

                  <div className="mt-2 space-y-1 text-gray-600 font-bold text-xs sm:text-sm">

                    <p>
                      Size: {item.size}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                  </div>

                  <p className="mt-3 font-bold text-sm">
                    ₹{item.price}
                  </p>

                </div>

              </div>
            ))}

          </div>

          {/* Order ID */}
          <p className="mt-5 pt-4 border-t border-gray-300 text-xs sm:text-sm text-gray-600 break-all">
            Order ID:
            <span className="font-semibold ml-2 text-gray-800">
              #{order.orderNumber}
            </span>
          </p>

        </div>

        {/* Status */}
        <div
          className={`rounded-xl p-4 sm:p-6 mt-3 ${
            order.orderStatus === "DELIVERED"
              ? "bg-green-700 text-white"
              : "bg-white"
          }`}
        >
          <div className="flex items-start gap-3">

            <div className="shrink-0">
              {statusInfo[order.orderStatus]?.icon}
            </div>

            <div className="min-w-0">

              <p className="font-semibold text-sm">
                {statusInfo[order.orderStatus]?.title}
              </p>

              <p className="text-xs sm:text-sm mt-1">
                {statusInfo[order.orderStatus]?.message}
              </p>

            </div>

          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mt-3">

          <div className="flex gap-3 items-center border-b border-gray-300 p-2 sm:p-3">

            <div className="bg-taupe-100 rounded-md w-9 h-9 sm:w-10 sm:h-10 border-2 border-gray-200 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            </div>

            <div className="min-w-0">

              <p className="text-sm font-extrabold">
                Delivery To
              </p>

              <p className="text-sm break-words">
                {address.fullName}
              </p>

            </div>

          </div>

          <div className="p-2 sm:p-3">

            {/* Phone */}
            <div className="flex items-start gap-3">

              <Phone size={16} className="mt-1 shrink-0" />

              <div className="text-sm min-w-0">

                <p className="font-bold">
                  Contact Details
                </p>

                <p className="text-gray-500 font-bold mt-1 break-all">
                  {address.phoneNumber}
                </p>

              </div>

            </div>

            {/* Address */}
            <div className="flex items-start gap-3 mt-3">

              <MapPin size={16} className="mt-1 shrink-0" />

              <div className="text-sm min-w-0">

                <p className="font-bold">
                  Delivery Address
                </p>

                <p className="text-gray-500 font-bold mt-1 break-words leading-5">
                  {address.addressLine1},{" "}
                  {address.addressLine2},{" "}
                  {address.city} - {address.postalCode}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Price */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mt-3">

          <div className="flex gap-2 items-center">

            <div className="bg-taupe-100 rounded-md w-8 h-8 border-2 border-gray-200 flex items-center justify-center shrink-0">
              <IndianRupee className="w-5 h-5 text-gray-500" />
            </div>

            <p className="text-sm font-bold">
              Order Price
            </p>

          </div>

          <div className="mt-2 p-2 sm:p-3 space-y-2">

            {/* Products total */}
            <p className="font-bold text-sm flex justify-between gap-3">
              <span className="text-gray-500">
                Items:
              </span>

              <span>
                ₹
                {order.items
                  ?.reduce(
                    (total, item) =>
                      total + Number(item.price) * Number(item.quantity),
                    0
                  )
                  .toLocaleString("en-IN")}
              </span>
            </p>

            {/* Shipping */}
            <p className="font-bold text-sm flex justify-between gap-3">
              <span className="text-gray-500">
                Shipping:
              </span>

              <span>
                ₹{order.shippingCharge}
              </span>
            </p>

            {/* Total */}
            <p className="font-bold text-sm sm:text-md mt-2 pt-2 border-t border-gray-300 flex justify-between gap-3">
              <span className="text-gray-500">
                Total:
              </span>

              <span>
                ₹{order.totalAmount}
              </span>
            </p>

          </div>

        </div>

        {/* Payment */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mt-3">

          <div className="p-2 sm:p-3">

            <p className="text-sm font-bold">
              Payment Status
            </p>

            <div className="flex items-center gap-2 mt-3">

              {paymentStatusData[order.paymentStatus]?.icon}

              <span className="text-xs font-bold">
                {paymentStatusData[order.paymentStatus]?.text ||
                  order.paymentStatus}
              </span>

            </div>

          </div>

          <div className="border-t border-gray-300 p-2 sm:p-3">

            <p className="text-sm font-bold">
              Payment Method
            </p>

            <div className="flex items-center gap-3 mt-3">

              {paymentData[order.paymentMethod]?.image && (
                <img
                  src={paymentData[order.paymentMethod].image}
                  alt={paymentData[order.paymentMethod]?.label}
                  className="h-5 w-auto object-contain"
                />
              )}

              <span className="text-xs font-bold">
                {paymentData[order.paymentMethod]?.label ||
                  order.paymentMethod}
              </span>

            </div>

          </div>

        </div>

        {/* Updates */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mt-3">

          <div className="flex gap-2 items-center">

            <div className="bg-taupe-100 rounded-md w-8 h-8 border-2 border-gray-200 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-gray-500" />
            </div>

            <p className="text-sm font-bold">
              Updates sent to
            </p>

          </div>

          <div className="text-xs text-gray-600 font-bold mt-3">

            <p>Call</p>

            <p className="text-gray-800 break-all">
              {order.address.phoneNumber}
            </p>

          </div>

        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mt-3">

          <div className="flex gap-2 items-center">

            <div className="bg-taupe-100 rounded-md w-8 h-8 border-2 border-gray-200 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-gray-500" />
            </div>

            <p className="text-sm font-bold">
              Order Details
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">

            <div className="text-xs text-gray-600 font-bold">
              <p>Ordered on</p>

              <p className="text-gray-800 mt-1">
                {formattedDate}
              </p>
            </div>

            <div className="text-xs text-gray-600 font-bold">

              <p>Order ID</p>

              <p className="text-gray-800 mt-1 break-all">
                {order.orderNumber}
              </p>

            </div>

          </div>

        </div>

        {/* Cancel */}
        {canCancel && (
          <div className="bg-white rounded-lg p-4 sm:p-6 mt-3">

            <button
              onClick={() => handleCancelOrder(order.id)}
              className="w-full py-3 rounded-lg bg-red-500 text-white text-sm sm:text-base font-semibold hover:bg-red-400 transition"
            >
              Cancel Order
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default OrderDetails;