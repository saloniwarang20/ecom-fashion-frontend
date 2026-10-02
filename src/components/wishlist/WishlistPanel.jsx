import { useDispatch, useSelector } from "react-redux";
import { closeWishlist } from "../../features/ui/uiSlice";
import { X } from "lucide-react";
import WishlistItem from "./WishlistItem";
import { useEffect } from "react";
import { clearWishlist } from "../../features/wishlist/wishlistSlice";

const WishlistPanel = () => {

  const dispatch = useDispatch();

  const items = useSelector((state) => state.wishlist.items) || [];
  const isOpen = useSelector((state) => state.ui.wishlistOpen);

  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [isOpen]);

  return (
    <>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => dispatch(closeWishlist())}
          className=" fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Wishlist Panel */}
      <div
        className={` fixed top-0 right-0 h-screen w-[92vw] sm:w-[85vw] md:w-105 lg:w-105 bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-5 py-4 border-b-2 border-gray-300 shrink-0">

          <h2 className="text-base sm:text-lg font-bold">
            Wishlist ({items.length})
          </h2>

          <button
            className="cursor-pointer p-1"
            onClick={() => dispatch(closeWishlist())}
            aria-label="Close wishlist"
          >
            <X className="text-gray-500" size={21} />
          </button>

        </div>


        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 md:px-6 ">

          {items.length === 0 ? (

            <div className="flex flex-col items-center justify-center h-full text-center px-4">

              <p className="text-base sm:text-lg font-semibold">
                Your wishlist is empty.
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Save your favourite products here.
              </p>

            </div>

          ) : (

            items.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
              />
            ))

          )}

        </div>


        {/* Footer */}
        <div className="bg-white px-4 sm:px-5 md:px-6 py-4 sm:py-5 border-t-2 border-gray-300 shrink-0">

          <button
            onClick={() => dispatch(clearWishlist())}
            className="w-full bg-zinc-900 text-white font-bold cursor-pointer py-3 text-sm sm:text-base rounded-md transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            Clear Wishlist
          </button>

        </div>

      </div>

    </>
  );
};

export default WishlistPanel;