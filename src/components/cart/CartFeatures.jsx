import {
  RotateCcw,
  ShieldCheck,
  Truck
} from "lucide-react";

const CartFeatures = () => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-gray-200 mt-5">

      {/* Free Shipping */}
      <div className=" p-4 sm:p-5 lg:p-6 flex gap-4 items-center border-b sm:border-b-0 sm:border-r border-gray-200">

        <Truck
          size={30}
          className="shrink-0 text-zinc-900"
        />

        <div>
          <h3 className="font-semibold text-sm sm:text-base">
            Free Shipping
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Free delivery on all orders above ₹1999.
          </p>
        </div>

      </div>


      {/* Easy Returns */}
      <div className="p-4 sm:p-5 lg:p-6 flex gap-4 items-center border-b sm:border-b-0 sm:border-r border-gray-200 ">

        <RotateCcw
          size={30}
          className="shrink-0 text-zinc-900"
        />

        <div>
          <h3 className="font-semibold text-sm sm:text-base">
            Easy Returns
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Hassle-free returns within 7 days.
          </p>
        </div>

      </div>


      {/* Secure Checkout */}
      <div className="p-4 sm:p-5 lg:p-6 flex gap-4 items-center">

        <ShieldCheck
          size={30}
          className="shrink-0 text-zinc-900"
        />

        <div>
          <h3 className="font-semibold text-sm sm:text-base">
            Secure Checkout
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            100% secure payments protected by encryption.
          </p>
        </div>

      </div>

    </div>
  );
};

export default CartFeatures;