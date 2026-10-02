import { Heart, Star } from "lucide-react";
import { useState } from "react"
import { COLORS } from "../../constants/filterOptions";
import useAuth from "../../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../features/wishlist/wishlistSlice"

const ProductInfo = ({product}) => {
    
    const [selectedSize, setSelectedSize] = useState(null);

    const color = product.variants[0]?.color;

    const colorMap = Object.fromEntries(
        COLORS.map(color => [color.name, color.hex])
    );

    const sizes = [...new Set(product.variants.map(v => v.size))];

    const {isAuthenticated} = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedVariant = product.variants.find(
        variant => variant.size === selectedSize
    )

    const cartItems = useSelector(state => state.cart.items);
    const cartItem = cartItems.find(
        item => 
            item.productId === product.id && item.variantId === selectedVariant?.id
    )
    const isInCart = Boolean(cartItem)
    
    const handleAddToCart = () => {
        if(!isAuthenticated){
            navigate("/auth")
            return;
        }
        if (isInCart) {
            navigate("/cart");
            return;
        }
        dispatch(addToCart({
            productId: product.id,
            productVariantId: selectedVariant.id,
            quantity:1
        }))
    }

    const wishlist = useSelector(state => state.wishlist.items);
    const wishlistItem = wishlist.find(
        item => item.productId === product.id
    )
    const isWishlisted = Boolean(wishlistItem);

    const handleWishlist = () => {
        if(!isAuthenticated){
            navigate("/auth")
            return;
        }
        if(isWishlisted){
            dispatch(removeFromWishlist(wishlistItem.id));
        }else{
            dispatch(addToWishlist(product.id));
        }
    }

  return (
  <div>

    <div className="space-y-5 sm:space-y-6 bg-white p-5 sm:p-6 lg:p-8 rounded-2xl shadow-xl">

      <div>
        <p className="uppercase text-xs sm:text-sm font-semibold tracking-wider text-gray-700">
          {product.brand}
        </p>
        <h1 className="mt-2 text-xl sm:text-2xl font-semibold leading-tight">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <Star
            size={15}
            fill="black"
          />
          <span className="font-semibold text-sm sm:text-base">
            {product.averageRating}
          </span>

          <span className="text-gray-500 text-sm">
            ({product.reviewCount} Reviews)
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-xl sm:text-2xl font-bold">
            ₹{product.discountPrice || product.price}
          </span>
          {product.discountPrice && (
            <>
              <span className="text-gray-400 line-through text-sm sm:text-base">
                ₹{product.price}
              </span>
              <span className="text-red-600 font-semibold text-sm">
                {Math.round(
                  ((product.price - product.discountPrice) /
                    product.price) *
                    100
                )}
                % OFF
              </span>
            </>
          )}
        </div>

        <p className="mt-1 text-gray-500 text-xs sm:text-sm font-medium">
          Inclusive of all taxes
        </p>

      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">
          COLOR
        </h3>
        <div className="flex items-center gap-3">
          <span
            className="w-6 h-6 rounded-full border border-gray-700 shrink-0"
            style={{
              background: colorMap[color]
            }}
          />
          <span className="font-bold text-xs">
            {color.replaceAll("_", " ")}
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">
          SIZES
        </h3>
        <div className="mt-3 flex gap-2 sm:gap-3 flex-wrap">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              disabled={variant.stock === 0}
              onClick={() => setSelectedSize(variant.size)}
              className={`h-10 w-10 sm:h-11 sm:w-11 text-xs font-black border transition
                ${
                  selectedSize === variant.size
                    ? "bg-black text-white border-black"
                    : variant.stock === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                    : "border-gray-300 hover:border-black"
                }
              `}
            >
              {variant.size.replace("SIZE_", "")}
            </button>
          ))}
        </div>

      </div>

      <div className="flex gap-2 sm:gap-3">
        <button
          disabled={!selectedSize}
          onClick={handleAddToCart}
          className={`flex-1 font-bold py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95

            ${
              selectedSize
                ? "bg-zinc-900 text-white hover:bg-zinc-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >

          <span className="text-xs sm:text-sm">
            {!selectedSize
              ? "SELECT A SIZE"
              : isInCart
              ? "GO TO CART"
              : "ADD TO CART"}
          </span>

        </button>

        <button
          onClick={handleWishlist}
          className="w-11 sm:w-12 flex items-center justify-center transition active:scale-90 hover:scale-110 shrink-0"
        >
          <Heart
            size={22}
            fill={isWishlisted ? "#C70036" : "none"}
            color={isWishlisted ? "#C70036" : "gray"}
          />
        </button>

      </div>

      <p className="text-center text-[11px] sm:text-xs text-black font-bold">
        Free Shipping on Orders over ₹999
      </p>

      <div>
        <h2 className="text-sm sm:text-md font-bold mb-3">
          Description
        </h2>
        <p className="leading-6 sm:leading-7 text-gray-600 text-sm">
          {product.description}
        </p>
      </div>

      <div>
        <h2 className="text-sm sm:text-md font-bold mb-3">
          Material
        </h2>
        <p className="leading-6 sm:leading-7 text-gray-600 text-sm">
          {product.material}
        </p>
      </div>

    </div>

  </div>
)
}

export default ProductInfo;
