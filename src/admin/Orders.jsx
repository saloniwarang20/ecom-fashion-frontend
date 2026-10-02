import { useEffect, useState } from "react";
import { FiChevronDown, FiPlus, FiSearch } from "react-icons/fi";
import orderService from "../services/orderService";
import OrderTable from "../components/admin/order/OrderTable";
import OrderModal from "../components/admin/order/OrderModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderService.getAllOrders();
      console.log(response.data)
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let data = [...orders];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((order) => {
        return(
          order.orderNumber?.toLowerCase().includes(keyword) || 
          order.id.toString().includes(keyword)
        );
      });
    }

    if (statusFilter !== "ALL") {
      data = data.filter(
        (order) => order.orderStatus === statusFilter
      );
    }

    if(paymentFilter != "ALL"){
      data = data.filter(
        (order) => order.paymentStatus ===  paymentFilter
      );
    }

    if (fromDate) {
        data = data.filter(order =>
            new Date(order.createdAt) >= new Date(fromDate)
        );
    }

    if (toDate) {
        const end = new Date(toDate);
        end.setHours(23, 59, 59, 999);

        data = data.filter(order =>
            new Date(order.createdAt) <= end
        );
    }

    setFilteredOrders(data);
  }, [search, statusFilter, orders, paymentFilter, fromDate, toDate]);

  const openOrder = async (id) => {
    try {
      const response = await orderService.getAdminOrder(id);
      setSelectedOrder(response.data);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);

      fetchOrders();

      setSelectedOrder(prev => ({
        ...prev,
        orderStatus: status
      }))
    } catch (err) {
      alert("Failed to update order status");
      console.error(err);
    }
  };

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-2xl font-bold font-playwrite">
            Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Manage customer orders
          </p>
        </div>

      </div>

      {/* Search & Filter */}

      <div className="flex gap-4 mb-8">

        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Order No. "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div className=" border rounded-xl px-4 py-3 relative w-64 focus:ring-2 focus:ring-zinc-900">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="appearance-none w-56 outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="RETURNED">Returned</option>
          </select>
          
          <FiChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={20}
          />
        </div>

        <div className=" border rounded-xl px-4 py-3 relative w-64 focus:ring-2 focus:ring-zinc-900">
          <select
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(e.target.value)
            }
            className="appearance-none w-56 outline-none"
          >
            <option value="ALL">All Payments</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
          <FiChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={20}
          />
        </div>

        <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded-xl px-4 py-3"
        />

        <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded-xl px-4 py-3"
        />

        <button 
          onClick={() => {
            setSearch("")
            setStatusFilter("ALL")
            setPaymentFilter("ALL")
            setFromDate("")
            setToDate("")
          }}
          className="bg-zinc-900 text-white px-5 rounded-xl">
          Reset
        </button>

      </div>

      <OrderTable
        orders={filteredOrders}
        loading={loading}
        onView={openOrder}
      />

      {showModal && (
        <OrderModal
          order={selectedOrder}
          onClose={() => {
            setShowModal(false)
            setSelectedOrder(null)
          }}
          onStatusUpdate={updateStatus}
        />
      )}

    </div>
  );
};

export default Orders;