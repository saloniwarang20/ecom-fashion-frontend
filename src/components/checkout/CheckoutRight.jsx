import { useSelector } from "react-redux";
import CheckoutProductCard from "./CheckoutProductCard";

const CheckoutRight = () => {

  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  );

  const shipping = subtotal >= 1999 ? 0 : 99;

  const total = subtotal + shipping;

  return (
    <div className=" w-full min-w-0 bg-taupe-200 lg:sticky lg:top-0 lg:self-start lg:min-h-screen lg:pr-40">

      <div className=" w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-7 sm:py-8 lg:py-10">

        {/* Products */}
        <div className=" max-h-[45vh] lg:max-h-[60vh] overflow-y-auto pr-1 pt-2 ">

          {items.map((item) => (
            <CheckoutProductCard
              key={item.id}
              item={item}
            />
          ))}

        </div>


        {/* Price Summary */}
        <div className="space-y-4 border-t border-gray-400 py-4 mt-3 ">

          <div className=" flex justify-between gap-4 text-gray-600 font-bold text-sm ">

            <span>
              Subtotal
            </span>

            <span className="shrink-0">
              ₹{subtotal.toLocaleString()}
            </span>

          </div>


          <div className="flex justify-between gap-4 text-gray-600 font-bold text-sm ">

            <span>
              Shipping
            </span>

            <span className="shrink-0">
              {shipping === 0 ? "FREE" : `₹${shipping}`}
            </span>

          </div>


          <hr />


          <div className=" flex justify-between gap-4 text-base sm:text-lg font-extrabold ">

            <span>
              Total
            </span>

            <span className="shrink-0">
              ₹{total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckoutRight;