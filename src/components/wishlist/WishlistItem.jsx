import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { closeWishlist } from "../../features/ui/uiSlice";

const WishlistItem = ({ item }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMoveToCart = async () => {
    navigate(`/product/${item.productId}`);
    dispatch(closeWishlist());
  };

  return (
    <div className="relative flex gap-3 sm:gap-4 py-4 border-b border-gray-200">

      {/* Product Image */}
      <img
        src={item.primaryImage}
        alt={item.productName}
        className="w-20 h-24 sm:w-24 sm:h-30 object-cover rounded-md shrink-0"
      />

      <div className="flex-1 min-w-0 pr-8">

        <h3 className="font-semibold text-sm sm:text-base leading-5 wrap-break-word">
          {item.productName}
        </h3>

        <p className=" text-gray-500 text-sm mt-1 font-bold">
          ₹{item.price}
        </p>

        <button
          onClick={handleMoveToCart}
          className="mt-3 sm:mt-4 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold bg-zinc-900 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-black transition active:scale-95"
        >
          Move to Cart
        </button>

      </div>

      {/* Remove Wishlist */}
      <button
        onClick={() => dispatch(removeFromWishlist(item.id))}
        className="absolute top-1 right-0 p-2 sm:p-3 cursor-pointer transition hover:scale-110"
        aria-label="Remove from wishlist"
      >
        <Heart
          fill="#C70036"
          color="#C70036"
          size={17}
        />
      </button>

    </div>
  );
};

export default WishlistItem;