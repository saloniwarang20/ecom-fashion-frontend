import { useEffect, useState } from "react";
import orderService from "../../services/orderService";
import OrderCard from "./OrderCard";
import OrderDetails from "./OrderDetails";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await orderService.getMyOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 sm:py-20">

        <div className="flex items-center gap-3">

          <div className="w-6 h-6 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />

          <span className="text-gray-600 text-sm">
            Loading Orders...
          </span>

        </div>

      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">

        <h2 className="text-xl sm:text-2xl font-semibold">
          No Orders Yet.
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Looks like you haven't placed any orders
        </p>

      </div>
    );
  }

  return (
    <div>

      <div className="mb-6 sm:mb-8">

        <h2 className="text-lg sm:text-xl font-semibold">
          Orders
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          View and Track your recent purchases.
        </p>

      </div>

      <div className="space-y-3 min-w-0">

        {selectedOrder ? (
          <OrderDetails
            order={selectedOrder}
            onBack={() => setSelectedOrder(null)}
            refreshOrders={fetchOrders}
          />
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => setSelectedOrder(order)}
            />
          ))
        )}

      </div>

    </div>
  );
};

export default Orders;