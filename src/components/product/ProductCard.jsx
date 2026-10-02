import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const image = product.images[0].imageUrl;

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const wishlistItem = wishlist.find(
    (item) => item.productId === product.id
  );

  const isWishlisted = Boolean(wishlistItem);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className=" rounded-2xl cursor-pointer bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
    >

      {/* IMAGE */}
      <div
        className="relative h-52 sm:h-60 md:h-64 lg:h-70 w-full overflow-hidden flex items-center justify-center"
      >

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();

            if (isWishlisted) {
              dispatch(removeFromWishlist(wishlistItem.id));
            } else {
              dispatch(addToWishlist(product.id));
            }
          }}
          className=" absolute right-2 top-2 sm:right-3 sm:top-3 z-10 rounded-full bg-white p-1.5 sm:p-2 shadow hover:bg-gray-100 transition active:scale-95"
        >
          <Heart
            size={16}
            className="sm:w-4.5 sm:h-4.5"
            fill={isWishlisted ? "#C70036" : "none"}
            color={isWishlisted ? "#C70036" : "black"}
          />
        </button>

        <img
          src={image}
          alt={product.name}
          className="h-full w-full object-scale-down"
        />
      </div>


      {/* DETAILS */}
      <div
        className=" p-3 sm:p-4 pb-4 sm:pb-5"
      >

        <p className="text-[10px] sm:text-sm font-semibold uppercase tracking-wide truncate">
          {product.brand}
        </p>

        <h3 className="mt-1 text-sm sm:text-base text-gray-700 font-semibold truncate">
          {product.name}
        </h3>


        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">

          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={12}
              className="sm:w-3.5 sm:h-3.5"
              fill={
                star <= Math.round(product.averageRating)
                  ? "black": "none"
              }
              stroke="black"
            />
          ))}

          <span className="text-[10px] sm:text-sm text-gray-500">
            ({product.reviewCount})
          </span>

        </div>


        {/* Price */}
        <div className="mt-2 flex items-center gap-2 font-bold">
          <span className="text-sm sm:text-base">
            ₹{product.price}
          </span>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;