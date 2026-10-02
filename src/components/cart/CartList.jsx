import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartFeatures from "./CartFeatures";

const CartList = () => {

  const items = useSelector((state) => state.cart.items);

  return (
    <div className=" bg-white rounded-lg px-3 sm:px-5 lg:px-8 py-4 sm:py-5 shadow-md flex flex-col min-w-0 ">

      {/* Desktop Header */}
      <div className="hidden lg:grid grid-cols-[120px_minmax(180px,2fr)_100px_140px_90px_50px] gap-4 pb-5 border-b-2 border-gray-200 text-gray-600 text-sm font-extrabold ">

        <div>PRODUCT</div>
        <div></div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>TOTAL</div>
        <div></div>

      </div>


      {/* Cart Items */}
      <div className="lg:flex-1">

        {items.length === 0 ? (

          <p className="font-bold text-center py-12 sm:py-16 text-sm sm:text-base ">
            Your Cart is empty.
          </p>

        ) : (

          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))

        )}

      </div>


      {/* Features */}
      <CartFeatures />

    </div>
  );
};

export default CartList;