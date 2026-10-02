const CheckoutProductCard = ({ item }) => {

  return (
    <div className="flex gap-3 sm:gap-4 mb-4 min-w-0">

      {/* Image */}
      <div className="relative shrink-0">

        <img
          src={item.imageUrl}
          alt={item.productName}
          className="w-16 h-20 sm:w-20 sm:h-24 object-cover border-4 border-white rounded-sm "
        />

        <span className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-zinc-900 text-white text-[10px] sm:text-xs flex items-center justify-center">
          {item.quantity}
        </span>

      </div>


      {/* Product Info */}
      <div className="flex-1 min-w-0 ">

        <h3 className=" font-semibold text-sm sm:text-base leading-5 wrap-break-word">
          {item.productName}
        </h3>

        <p className=" text-xs sm:text-sm text-gray-500 mt-1 wrap-break-word">
          {item.color} • {item.size}
        </p>

      </div>

      <p className="font-semibold text-sm sm:text-base shrink-0">
        ₹{Number(item.subtotal).toLocaleString()}
      </p>

    </div>
  );
};

export default CheckoutProductCard;