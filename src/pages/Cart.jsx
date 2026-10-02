import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import FreeShippingCard from "../components/cart/FreeShippingCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "../features/cart/cartSlice";

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-5 sm:py-8 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 sm:mb-6">

        <h1 className="text-lg sm:text-xl font-semibold">
          Your Cart ({items.length})
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 cursor-pointer font-bold text-sm sm:text-base w-fit"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </button>

      </div>


      {/* Cart Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2.5fr)_minmax(300px,1fr)] gap-4 ">

        {/* Cart Products */}
        <CartList />

        {/* Summary */}
        <div className="space-y-4">
          <CartSummary />
          <FreeShippingCard />
        </div>

      </div>

    </div>
  );
};

export default Cart;