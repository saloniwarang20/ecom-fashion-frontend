import { Package } from "lucide-react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import ReviewModal from "./ReviewModal";

const OrderCard = ({ order, onClick }) => {

  const canReview = order.orderStatus === "DELIVERED";

  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">

      {/* Status */}
      <div className="text-sm font-black p-2 flex gap-2 items-center">

        <div className="bg-white rounded-md w-9 h-9 sm:w-10 sm:h-10 border-2 border-gray-200 flex items-center justify-center shrink-0">
          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </div>

        <p className="text-xs sm:text-sm">
          {order.orderStatus}
        </p>

      </div>

      {/* Order */}
      <div className="bg-gray-200 rounded-lg p-1">

        <div
          onClick={onClick}
          className="bg-white border-gray-100 rounded-lg p-3 sm:p-4 hover:shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 cursor-pointer"
        >

          {/* Items */}
          <div className="space-y-3 min-w-0 flex-1">

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 items-center min-w-0"
              >

                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="h-16 w-14 sm:h-20 sm:w-16 object-cover rounded-md shrink-0"
                />

                <div className="min-w-0">

                  <p className="font-bold text-xs sm:text-sm truncate">
                    {item.productName}
                  </p>

                  <p className="text-xs font-bold text-gray-500 mt-1">
                    Size: {item.size}
                  </p>

                </div>

              </div>
            ))}

          </div>

          <FiChevronRight
            size={22}
            className="self-end sm:self-center shrink-0"
          />

        </div>

        {/* Review */}
        {canReview && (
          <div className="p-3 sm:p-4">

            <p className="text-sm sm:text-base font-semibold text-gray-900">
              How was your experience?
            </p>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Your review helps other shoppers make a better choice.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowReviewModal(true);
              }}
              className="mt-3 sm:mt-4 text-xs sm:text-sm hover:underline text-zinc-900 cursor-pointer font-extrabold"
            >
              Write a Review
            </button>

          </div>
        )}

      </div>

      {showReviewModal && (
        <ReviewModal
          order={order}
          item={order.items[0]}
          onClose={() => setShowReviewModal(false)}
        />
      )}

    </div>
  );
};

export default OrderCard;