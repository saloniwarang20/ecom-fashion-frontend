import { FiEye } from "react-icons/fi";

const statusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-700 text-white";

    case "CONFIRMED":
      return "bg-blue-700 text-white";

    case "SHIPPED":
      return "bg-purple-700 text-white";

    case "OUT_FOR_DELIVERY":
      return "bg-pink-700 text-white";

    case "DELIVERED":
      return "bg-green-700 text-white";

    case "CANCELLED":
      return "bg-red-700 text-white";

    case "RETURNED":
      return "bg-orange-700 text-white";

    default:
      return "bg-gray-700 text-white";
  }
};

const paymentColor = (payment) => {
  switch (payment) {
    case "PAID":
      return "bg-green-700 text-white";

    case "REFUNDED":
      return "bg-orange-700 text-white";

    case "FAILED":
      return "bg-red-700 text-white";

    case "PENDING":
      return "bg-yellow-700 text-white";

    default:
      return "bg-gray-700 text-white";
  }
};

const OrderTable = ({
  orders = [],
  loading = false,
  onView,
}) => {
  return (
    <div className="overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b-2 border-gray-700">
            <tr>
              <th className="text-center p-4 font-playwrite">Order No.</th>
              <th className="text-center p-4 font-playwrite">Date</th>
              <th className="text-center p-4 font-playwrite">Items</th>
              <th className="text-center p-4 font-playwrite">Shipping charge</th>
              <th className="text-center p-4 font-playwrite">Discount amount</th>
              <th className="text-center p-4 font-playwrite">Total amount</th>
              <th className="text-center p-4 font-playwrite">Payment</th>
              <th className="text-center p-4 font-playwrite">Status</th>
              <th className="text-center p-4 font-playwrite">View</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-12 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-7 h-7 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                    <span className="font-medium text-gray-600">Loading Orders...</span>
                  </div>
                </td>
              </tr>

            ) : orders.length === 0 ? (

              <tr>
                <td
                  colSpan={9}
                  className="py-12 text-center text-gray-500">
                  <div className="text-5xl mb-4">
                      📦
                  </div>
                  <p className="text-lg font-semibold">
                      No Orders Found
                  </p>
                  <p className="text-gray-500 mt-2">
                      Try changing the search or filters.
                  </p>
                </td>
              </tr>

            ) : (

              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-400"
                >

                  <td className="p-4 font-semibold">
                     <p className="font-semibold text-zinc-900">#{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">ID : {order.id}</p>
                  </td>

                  <td className="p-4">
                    <div className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold">
                        {order.items?.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                        ) ?? 0}
                    </span>
                    <span className="text-gray-500 text-sm">
                        {" "}Items
                    </span>
                  </td>

                  <td className="p-4 text-center font-semibold">
                    ₹{order.shippingCharge}
                  </td>

                  <td className="p-4 text-center text-lime-700">
                    -₹{order.discountAmount ?? 0}
                  </td>

                  <td className="p-4 text-center text-zinc-900 font-bold">
                    ₹{order.totalAmount ?? 0}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${paymentColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          onView(order.id)
                        }
                        className="bg-zinc-900 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <FiEye size={16}/>
                        View
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default OrderTable;