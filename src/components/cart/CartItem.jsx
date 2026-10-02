import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity
} from "../../features/cart/cartSlice";
import { Minus, Plus, X } from "lucide-react";

const CartItem = ({ item }) => {

  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(
      updateQuantity({
        itemId: item.id,
        quantity: item.quantity + 1
      })
    );
  };

  const decreaseQuantity = () => {

    if (item.quantity === 1) {
      dispatch(removeFromCart(item.id));
      return;
    }

    dispatch(
      updateQuantity({
        itemId: item.id,
        quantity: item.quantity - 1
      })
    );
  };

  return (
    <div className="relative py-5 lg:py-7 border-b-2 border-gray-200">

    
      <div className="lg:hidden">

        <div className="flex gap-3 sm:gap-4">

          {/* Image */}
          <img
            src={item.imageUrl}
            alt={item.productName}
            className=" w-24 h-32 sm:w-28 sm:h-36 object-cover rounded-md shrink-0 "
          />

          {/* Product Info */}
          <div className="flex-1 min-w-0 pr-7">

            <p className=" text-[10px] sm:text-xs tracking-widest text-gray-700 uppercase font-extrabold ">
              ARIA
            </p>

            <h3 className=" font-bold text-sm sm:text-base mt-1 leading-5 wrap-break-word">
              {item.productName}
            </h3>

            <p className=" text-xs sm:text-sm text-gray-700 mt-2 font-black">
              Color : {item.color.replaceAll("_", " ")}
            </p>

            <p className="text-xs sm:text-sm text-gray-700 font-black">
              Size : {item.size.replace("SIZE", "")}
            </p>

            <p className="text-sm sm:text-base text-gray-900 mt-2 font-bold">
              ₹{item.price}
            </p>

          </div>

          {/* Remove */}
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="absolute top-4 right-0 p-1 cursor-pointer"
            aria-label="Remove item"
          >
            <X
              size={20}
              className="text-gray-600"
            />
          </button>

        </div>


        {/* Quantity + Total */}
        <div className=" flex justify-between items-center mt-4 pl-0 ">

          {/* Quantity */}
          <div className=" flex items-center border-2 border-gray-300 rounded-md overflow-hidden w-fit">

            <button
              onClick={decreaseQuantity}
              className="px-2 py-1.5 cursor-pointer"
            >
              <Minus
                size={15}
                className="text-gray-500"
              />
            </button>

            <span className=" text-zinc-900 font-extrabold px-3 text-sm">
              {item.quantity}
            </span>

            <button
              onClick={increaseQuantity}
              className="px-2 py-1.5 cursor-pointer"
            >
              <Plus
                size={15}
                className="text-gray-500"
              />
            </button>

          </div>

          {/* Total */}
          <div className="text-sm sm:text-base font-bold">
            Total: ₹{item.subtotal}
          </div>

        </div>

      </div>


      <div className="hidden lg:grid grid-cols-[120px_minmax(180px,2fr)_100px_140px_90px_50px] items-center gap-4">

        {/* Image */}
        <img
          src={item.imageUrl}
          alt={item.productName}
          className="w-24 h-32 object-cover rounded-md "
        />

        {/* Product */}
        <div className="min-w-0">

          <p className=" text-xs tracking-widest text-gray-700 uppercase font-extrabold">
            ARIA
          </p>

          <h3 className=" font-bold text-md wrap-break-word">
            {item.productName}
          </h3>

          <p className="text-sm text-gray-700 mt-2 font-black">
            Color : {item.color.replaceAll("_", " ")}
          </p>

          <p className="text-sm text-gray-700 font-black">
            Size : {item.size.replace("SIZE", "")}
          </p>

        </div>

        {/* Price */}
        <div className="font-semibold">
          ₹{item.price}
        </div>

        {/* Quantity */}
        <div className="flex items-center border-2 p-1 border-gray-300 rounded-md overflow-hidden w-fit">

          <button
            onClick={decreaseQuantity}
            className="px-1 py-1 cursor-pointer"
          >
            <Minus
              size={16}
              className="text-gray-400"
            />
          </button>

          <span className="text-zinc-900 font-extrabold px-3 ">
            {item.quantity}
          </span>

          <button
            onClick={increaseQuantity}
            className="px-1 py-1 cursor-pointer"
          >
            <Plus
              size={16}
              className="text-gray-400"
            />
          </button>

        </div>

        {/* Total */}
        <div className="font-bold">
          ₹{item.subtotal}
        </div>

        {/* Remove */}
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="cursor-pointer"
        >
          <X className="text-gray-600" />
        </button>

      </div>

    </div>
  );
};

export default CartItem;