import AddressSection from "./AddressSection";
import PaymentSection from "./PaymentSection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";

const CheckoutLeft = ({
  selectedAddress,
  setSelectedAddress,
  paymentMethod,
  setPaymentMethod
}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {

    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    try {

      const order = await orderService.placeOrder({
        addressId: selectedAddress,
        paymentMethod
      });

      if (paymentMethod !== "COD") {

        await paymentService.makePayment({
          orderId: order.data.id,
          paymentMethod
        });

      }

      navigate("/");

    } catch (err) {

      console.error(err);
      alert("Failed to place order.");

    }
  };

  return (
    <div className="w-full min-w-0">

      <div className="border-gray-300 lg:border-r max-w-3xl mx-auto w-full lg:pl-40">

        {/* Address */}
        <AddressSection
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        {/* Payment */}
        <PaymentSection
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />


        {/* Place Order */}
        <div className="py-5 sm:py-6 px-4 sm:px-6 lg:px-8">

          <button
            onClick={handlePlaceOrder}
            className=" w-full bg-zinc-900 text-white py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-black transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            Place Order
          </button>

        </div>


        {/* Policies */}
        <div className="py-5 sm:py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 ">

          <div className=" flex flex-wrap gap-x-3 gap-y-2 ">

            <p className="font-bold text-xs sm:text-sm underline">
              Refund Policy.
            </p>

            <p className="font-bold text-xs sm:text-sm underline">
              Privacy Policy.
            </p>

            <p className="font-bold text-xs sm:text-sm underline">
              Terms of service.
            </p>

          </div>

          <div className=" text-gray-700 text-xs font-bold mt-3 leading-5">
            By placing this order, you agree our terms of service and
            understand our privacy policy.
          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckoutLeft;