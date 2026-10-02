import { useState } from "react";
import reviewService from "../../services/reviewService";
import { Star, X } from "lucide-react";

const ReviewModal = ({ order, item, onClose }) => {

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      const review = {
        rating: rating,
        comment: comment.trim(),
      };

      await reviewService.addReview(item.productId, review);

      alert("Review submitted successfully");

      onClose();

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to submit review."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">

      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl p-4 sm:p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">

          <h2 className="text-sm sm:text-md font-bold">
            Write a Review
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer p-1"
          >
            <X size={20} />
          </button>

        </div>

        {/* Product */}
        <div className="flex gap-3 items-center mb-5 sm:mb-6">

          <img
            src={item.imageUrl}
            alt={item.productName}
            className="w-14 h-18 sm:w-16 sm:h-20 object-cover rounded-md shrink-0"
          />

          <div className="min-w-0">

            <p className="font-bold text-xs sm:text-sm break-words">
              {item.productName}
            </p>

            <p className="text-xs font-bold text-gray-500 mt-1">
              Size: {item.size}
            </p>

          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Rating */}
          <div>

            <p className="text-sm font-semibold mb-2">
              Your Rating
            </p>

            <div className="flex flex-wrap items-center gap-1">

              <div className="flex gap-1">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="cursor-pointer p-0.5"
                  >
                    <Star
                      size={22}
                      className={
                        star <= (hoverRating || rating)
                          ? "text-black"
                          : "text-gray-400"
                      }
                      fill={
                        star <= (hoverRating || rating)
                          ? "black"
                          : "none"
                      }
                    />
                  </button>
                ))}

              </div>

              <span className="text-xs text-gray-500 ml-1 sm:ml-2">
                {rating > 0
                  ? `${rating} out of 5`
                  : "Click to rate"}
              </span>

            </div>

          </div>

          {/* Review */}
          <div className="mt-5">

            <div className="flex justify-between mb-2 gap-2">

              <p className="text-sm font-semibold">
                Your Review
              </p>

              <span className="text-xs text-gray-400 shrink-0">
                {comment.length}/500
              </span>

            </div>

            <textarea
              value={comment}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setComment(e.target.value);
                }
              }}
              placeholder="Share your thoughts about this product..."
              className="w-full h-28 border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black"
            />

          </div>

          {/* Terms + Submit */}
          <div className="flex flex-col items-center gap-3 mt-5">

            <p className="text-[11px] sm:text-xs text-gray-700 leading-5">
              By submitting review you give us consent to publish and
              process personal information in accordance with{" "}
              <span className="text-zinc-900 font-bold">
                Terms of use
              </span>{" "}
              and{" "}
              <span className="text-zinc-900 font-bold">
                Privacy Policy
              </span>.
            </p>

            <button
              type="submit"
              className="w-full sm:w-auto bg-zinc-900 text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-zinc-700 cursor-pointer"
            >
              Submit Review
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ReviewModal;