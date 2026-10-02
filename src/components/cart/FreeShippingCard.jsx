import { Gift } from "lucide-react";
import { useSelector } from "react-redux";

const FreeShippingCard = () => {

  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  );

  const FREE_SHIPPING_LIMIT = 1999;

  const remaining = Math.max(
    FREE_SHIPPING_LIMIT - subtotal,
    0
  );

  const progress = Math.min(
    (subtotal / FREE_SHIPPING_LIMIT) * 100,
    100
  );

  return (
    <div className="bg-zinc-900 rounded-lg p-4 sm:p-5 lg:p-6 shadow-md text-white">

      <div className=" flex gap-3 pb-2">

        <Gift
          size={20}
          className="shrink-0 mt-0.5"
        />

        <div className="min-w-0">

          {remaining > 0 ? (

            <p className="text-xs sm:text-sm leading-5">

              Add

              <span className="font-bold">
                {" "}₹{remaining.toLocaleString()}{" "}
              </span>

              more to unlock FREE Shipping.

            </p>

          ) : (

            <p className="text-xs sm:text-sm font-semibold leading-5">
              Congratulations! Free Shipping unlocked.
            </p>

          )}

        </div>

      </div>


      {/* Progress Bar */}
      <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden mt-3">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{
            width: `${progress}%`
          }}
        />
      </div>


      <div className="flex justify-between text-[11px] sm:text-xs mt-2">
        <span>₹0</span>
        <span>₹1999</span>
      </div>

    </div>
  );
};

export default FreeShippingCard;