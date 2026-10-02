import { ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {

  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  );

  const shipping = subtotal >= 1999 ? 0 : 99;

  const total = subtotal + shipping;

  const isCartEmpty = items.length === 0;

  return (
    <div className=" bg-white rounded-lg px-4 sm:px-6 lg:px-8 py-5 shadow-md">

      <h2 className="text-base sm:text-lg font-semibold mb-2">
        Order Summary
      </h2>

      <hr className="text-gray-300 mb-3" />

      <div className="space-y-4">

        <div className=" flex justify-between gap-4 font-extrabold text-sm sm:text-md">
          <span>
            Subtotal ({items.length} items)
          </span>

          <span className="shrink-0">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>


        <div className="flex justify-between gap-4 font-extrabold text-sm sm:text-md">

          <span>
            Shipping
          </span>

          <span className="shrink-0">
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>

        </div>

        <hr className="my-4 text-gray-300" />

        <div className="flex justify-between gap-4 text-sm sm:text-md font-bold">

          <span>
            Total
          </span>

          <span className="shrink-0">
            ₹{total.toLocaleString()}
          </span>

        </div>

        <p className="text-xs text-gray-500">
          (Inclusive of all taxes)
        </p>

      </div>


      <button
        disabled={isCartEmpty}
        onClick={() => navigate("/checkout")}
        className={`mt-6 w-full py-3 text-sm sm:text-base rounded-md font-extrabold transition-all duration-300
          ${
            isCartEmpty
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-zinc-900 text-white cursor-pointer hover:shadow-lg active:scale-95"
          }
        `}
      >
        Proceed to Checkout
      </button>


      <div className="flex justify-center items-center gap-2 mt-5 text-xs sm:text-sm text-gray-500 font-bold">

        <ShieldCheck size={18} />

        Secure Checkout

      </div>

    </div>
  );
};

export default CartSummary; 