import { useEffect, useState } from "react";
import { FiX, FiMapPin, FiPackage, FiCreditCard } from "react-icons/fi";

const OrderModal = ({ order, onClose, onStatusUpdate }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus);
    }
  }, [order]);

  if (!order) return null;

  const handleSave = async () => {
    await onStatusUpdate(order.id, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white w-225 max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">

        {/* Header */}

        <div className="px-8 py-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Order #{order.orderNumber}
            </h2>
            <p className="text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiX size={26} />
          </button>
        </div>

        {/* Scrollable */}

        <div className="overflow-y-auto flex-1 p-8 space-y-8">

          {/* Status */}

          <div className="grid grid-cols-2 gap-6">
            <div className="border-dashed  border rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2 font-playwrite text-sm">
                <FiPackage size={20}/>
                Order Status
              </h3>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="SHIPPED">Shipped</option>
                <option value="OUT_FOR_DELIVERY">
                  Out For Delivery
                </option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="RETURNED">Returned</option>
              </select>
            </div>

            <div className="border border-dashed rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2 font-playwrite text-sm">
                <FiCreditCard size={20}/>
                Payment Status
              </h3>
              <span className="inline-block px-5 py-2 rounded-full bg-green-700 text-white font-semibold">
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Shipping */}

          <div className="border border-dashed rounded-2xl p-6">
            <h3 className="font-semibold mb-5 flex items-center gap-2 font-playwrite text-sm">
              <FiMapPin size={20}/>
              Shipping Address
            </h3>
            <div className="space-y-1">
              <p className="font-semibold text-lg">
                {order.address.fullName}
              </p>
              <p>{order.address.phoneNumber}</p>
              <p>{order.address.addressLine1}</p>
              {order.address.addressLine2 && (
                <p>{order.address.addressLine2}</p>
              )}
              <p>
                {order.address.city}, {order.address.state}
              </p>
              <p>{order.address.postalCode}</p>
            </div>
          </div>

          {/* Products */}

          <div>
            <h3 className="font-semibold mb-5 font-playwrite text-sm">
              Ordered Products
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-dashed rounded-2xl p-4 flex gap-5 items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-24 h-24 rounded-xl object-cover border"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                      {item.productName}
                    </h4>
                    <div className="flex gap-6 mt-2 text-gray-600">
                      <span>
                        <strong>Size:</strong> {item.size}
                      </span>
                      <span>
                        <strong>Color:</strong> {item.color}
                      </span>
                      <span>
                        <strong>Qty:</strong> {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Unit Price
                    </p>
                    <p className="font-bold text-lg">
                      ₹{item.price}
                    </p>
                    <p className="text-sm mt-1 text-gray-500">
                      Total
                    </p>
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Summary */}

          <div className="border border-dashed rounded-2xl p-6">
            <h3 className="font-semibold mb-5 font-playwrite text-sm">
              Price Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Shipping Charge</span>
                <span>₹{order.shippingCharge}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">
                  - ₹{order.discountAmount}
                </span>
              </div>
              <hr />
              <div className="flex justify-between text-2xl font-bold">
                <span>Total Amount</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-8 py-5 flex justify-end gap-4 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl hover:bg-gray-100"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700"
          >
            Save Changes
          </button>
        </div>

      </div>

    </div>
  );
};

export default OrderModal;