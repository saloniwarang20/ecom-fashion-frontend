import { useState } from "react";
import CheckoutNav from "../components/checkout/CheckoutNav";
import CheckoutLeft from "../components/checkout/CheckoutLeft";
import CheckoutRight from "../components/checkout/CheckoutRight";

const Checkout = () => {

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  return (
    <div className="bg-white min-h-screen w-full">

      <CheckoutNav />

      <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="order-2 lg:order-1">
          <CheckoutLeft
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        <div className="order-1 lg:order-2">
          <CheckoutRight />
        </div>

      </div>

    </div>
  );
};

export default Checkout;