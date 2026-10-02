import { CircleCheck, Star } from "lucide-react";

const ReviewSection = ({ reviews }) => {

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / totalReviews
        ).toFixed(1)
      : 0;

  const ratingCount = [5, 4, 3, 2, 1].map((star) =>
    reviews.filter(
      (review) => review.rating === star
    ).length
  );

  const formatDate = (date) => {
    if (!date) return;

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <div className="mt-6 sm:mt-10 bg-white rounded-xl py-5 px-4 sm:px-6 shadow-xl">

      <h2 className="text-sm sm:text-md font-extrabold mb-5">
        RATING & REVIEWS
      </h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 border-b-2 border-gray-300 pb-5 px-2 sm:px-0">

        <div className="flex flex-col justify-center">

          <h1 className="text-xl font-bold font-playwrite">
            {averageRating}
          </h1>

          <div className="flex gap-1 mt-3 sm:mt-4">

            {[1, 2, 3, 4, 5].map((star) => (

              <Star
                key={star}
                size={17}
                fill={
                  star <= Math.round(averageRating)
                    ? "black"
                    : "none"
                }
              />

            ))}

          </div>

          <p className="text-gray-700 text-sm mt-3 sm:mt-4">
            Based on {totalReviews} reviews
          </p>

        </div>

        <div className="space-y-2">

          {[5, 4, 3, 2, 1].map((star, index) => {

            const count = ratingCount[index];

            const percentage =
              totalReviews === 0
                ? 0
                : (count / totalReviews) * 100;

            return (

              <div
                key={star}
                className="flex items-center gap-2 sm:gap-3"
              >

                <span className="w-8 flex gap-1 items-center font-bold text-sm shrink-0">

                  {star}

                  <Star
                    size={13}
                    fill="black"
                  />

                </span>

                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className="bg-black h-1.5 rounded-full"
                    style={{
                      width: `${percentage}%`
                    }}
                  />

                </div>

                <span className="w-6 text-sm text-right">
                  {count}
                </span>

              </div>

            );
          })}

        </div>

      </div>


      <div className="mt-3">

        {reviews.length === 0 ? (

          <div className="py-12 text-center">

            <p className="text-gray-700">
              No reviews yet
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Be the first to review this product
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {reviews.map((review) => (

              <div
                key={review.id}
                className="py-5 sm:py-7 px-4 sm:px-5 bg-taupe-300 rounded-lg hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700 shrink-0">
                      {review.userName?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-sm sm:text-base">
                          {review.userName || "Anonymous"}
                        </p>
                        <span className="flex items-center gap-1 bg-black text-white rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold">
                          <CircleCheck size={11} />
                          Verified Buyer
                        </span>
                      </div>

                      <div className="flex gap-0.5 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={15}
                            fill={
                              star <= Number(review.rating)
                                ? "black"
                                : "none"
                            }
                            className="text-black"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 font-bold sm:text-right">
                    {formatDate(review.createdAt)}
                  </p>
                </div>

                <div className="ml-0 sm:ml-15 mt-4">
                  <p className="font-bold text-sm sm:text-base leading-relaxed">
                    {review.comment}
                  </p>
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default ReviewSection;