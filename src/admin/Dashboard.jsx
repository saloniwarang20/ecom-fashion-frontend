import { useEffect, useState } from "react";
import {FiBox,FiShoppingCart,FiUsers,FiTrendingUp,FiAlertCircle,} from "react-icons/fi";
import productService from "../services/productService"
import orderService from "../services/orderService"
import userService from "../services/userService"
import reviewService from "../services/reviewService"
import { TiStarFullOutline } from "react-icons/ti";

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchData = async () => {
    setLoading(true)
    setError(null)

    const [productResult, orderResult, userResult, reviewResult] = await Promise.allSettled([
      productService.getAllProduct(),
      orderService.getAllOrders(),
      userService.getAllUsers(),
      reviewService.getAllReviews(),
    ])

    if (productResult.status === "fulfilled") {
      setProducts(productResult.value?.data ?? [])
    } else {
      console.error("Dashboard product fetch failed", productResult.reason)
    }

    if (orderResult.status === "fulfilled") {
      setOrders(orderResult.value?.data ?? [])
    } else {
      console.error("Dashboard order fetch failed", orderResult.reason)
    }

    if (userResult.status === "fulfilled") {
      setUsers(
        (userResult.value?.data ?? []).filter((user) => user.role === "USER")
      )
    } else {
      console.error("Dashboard user fetch failed", userResult.reason)
    }

    if (reviewResult.status === "fulfilled") {
      setReviews(reviewResult.value?.data ?? [])
    } else {
      console.error("Dashboard review fetch failed", reviewResult.reason)
      setReviews([])
    }

    if (
      productResult.status === "rejected" ||
      orderResult.status === "rejected" ||
      userResult.status === "rejected"
    ) {
      setError("Failed to load dashboard data. Open the browser console for details.")
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const revenue = orders.reduce((sum, order) => {
    if(order.orderStatus === "CANCELLED"){
      return sum;
    }
    return sum + Number(order.totalAmount);
  },0)

  const latestReview = [...reviews].sort(
    (a,b) => new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0,5);

  const lowStockProducts = products.filter(
    (product) => product.stockQuantity <= 5
  )

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard data...
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="bg-zinc-900 text-white rounded-3xl p-10">
        <h1 className="text-4xl font-playwrite font-bold">Welcome back 👋</h1>
        <p className="mt-3 text-zinc-300">Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-4 gap-5">

        <div className="border rounded-2xl p-6 border-dashed">
          <FiShoppingCart size={34}className="text-zinc-800 mb-4"/>
          <p className="text-gray-500">Orders</p>
          <h2 className="text-3xl font-bold mt-2">{orders.length}</h2>
        </div>

        <div className="border rounded-2xl p-6 border-dashed">
          <FiBox size={34} className="text-zinc-800 mb-4"/>
          <p className="text-gray-500">Products</p>
          <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
        </div>

        <div className="border rounded-2xl p-6 border-dashed">
          <FiUsers size={34} className="text-zinc-800 mb-4"/>
          <p className="text-gray-500">Customers</p>
          <h2 className="text-3xl font-bold mt-2">{users.filter(user => user.role === "USER").length}</h2>
        </div>

        <div className="border rounded-2xl p-6 border-dashed">
          <FiTrendingUp size={34} className="text-zinc-800 mb-4"/>
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{revenue.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="border border-dashed rounded-2xl p-6">
          <h2 className="font-bold mb-6 font-playwrite">Order Status</h2>
          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Pending</span>
              <span className="font-semibold">{orders.filter(o => o.orderStatus === "PENDING").length}</span>
            </div>

            <div className="flex justify-between">
              <span>Confirmed</span>
              <span className="font-semibold">{orders.filter(o => o.orderStatus === "CONFIRMED").length}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipped</span>
              <span className="font-semibold">{orders.filter(o => o.orderStatus === "SHIPPED").length}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivered</span>
              <span className="font-semibold">{orders.filter(o => o.orderStatus === "DELIVERED").length}</span>
            </div>

            <div className="flex justify-between">
              <span>Cancelled</span>
              <span className="font-semibold text-red-600">{orders.filter(o => o.orderStatus === "CANCELLED").length}</span>
            </div>
          </div>
        </div>

        <div className="border border-dashed rounded-2xl p-6">

          <h2 className="font-bold mb-6 font-playwrite">Latest Reviews</h2>
          {latestReview.length > 0 ? (
            latestReview.map(review => (
              <div key={review.id} className="border-b pb-3 last:border-none">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{review.userName}</p>
                  <div className="flex">
                    {Array.from({length: review.rating}).map((_,i) => (
                      <TiStarFullOutline key={i} className="text-yellow-500"/>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{review.comment}</p>
              </div>
            ))
          ):(
            <p className="text-gray-500">No reviews yet</p>
          )}
        </div>

        <div className="border border-dashed rounded-2xl p-6">

          <div className="flex items-center gap-2 mb-6">
            <FiAlertCircle className="text-red-700" size={20}/>
            <h2 className="font-bold font-playwrite">Low Stock</h2>
          </div>

          <div className="space-y-4">
            {lowStockProducts.length>0 ? (
              lowStockProducts.slice(0,6).map(product => (
                <div key={product.id} className="flex justif-center items-center border-b pb-3">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <span className="text-red-700 font-bold">{product.stockQuantity}</span>
                </div>
              )
            )):(
              <div className="text-center py-8">
                <FiBox size={40} className="mx-auto text-zinc-900 mb-3"/>
                <p className="text-gray-500">All products are sufficiently stocked.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="border border-dashed rounded-2xl p-6">
          <h2 className="font-semibold mb-6 font-playwrite">Recent Orders</h2>
          <div className="space-y-4">
            {orders.length > 0 ? (
              [...orders].sort(
                  (a, b) =>new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border-b border-gray-400 pb-3">
                    <div>
                      <p className="font-semibold">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  <div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.orderStatus === "DELIVERED"
                            ? "bg-green-700 text-white"
                            : order.orderStatus === "CANCELLED"
                            ? "bg-red-700 text-white"
                            : "bg-yellow-700 text-white"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">
                No Orders Found
              </p>
            )}
          </div>
        </div>

        <div className="border border-dashed rounded-2xl p-6">
          <h2 className=" font-semibold mb-6 font-playwrite">Store Summary</h2>
          <div className="space-y-5">
            <div className="flex justify-between">
              <span>Total Products</span>
              <span className="font-bold">{products.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Customers</span>
              <span className="font-bold">{users.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Orders</span>
              <span className="font-bold">{orders.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Reviews</span>
              <span className="font-bold">{reviews.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Revenue</span>
              <span className="font-bold text-green-700">₹{revenue.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-semibold">Low Stock Products</span>
              <span className="font-bold text-red-600">{lowStockProducts.length}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;