import { FiTrash2 } from "react-icons/fi"
import { TiStarFullOutline } from "react-icons/ti"

const renderStars = (rating) => {
    return (
        <div className="flex gap-0.5">
            {[1,2,3,4,5].map((star)=>(
                <span key={star} className={star <= rating ? "text-yellow-500" : "text-gray-300"}><TiStarFullOutline/></span>
            ))}
        </div>
    )
}

const ReviewTable = ({reviews=[], loading, onDelete}) => {
  return (
    <div className="overflow-hidden">

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead className="border-b-2 border-gray-700">
                    <tr>
                        <th className="text-left p-4 font-playwrite">Product</th>
                        <th className="text-left p-4 font-playwrite">Customer</th>
                        <th className="text-left p-4 font-playwrite">Rating</th>
                        <th className="text-left p-4 font-playwrite">Review</th>
                        <th className="text-left p-4 font-playwrite">Date</th>
                        <th className="text-center p-4 font-playwrite">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {loading ? (
                        <tr>
                            <td colSpan={5} className="py-12 text-center">
                                <div className="flex justify-center items-center gap-3">
                                    <div className="w-7 h-7 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                                    <span className="font-medium text-gray-600">
                                    Loading Reviews...
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        reviews.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-12 text-center text-gray-500">
                                    <p className="text-lg font-semibold">No Reviews Found</p>
                                    <p className="text-gray-500 mt-2">Try changing your filters.</p>
                                </td>
                            </tr>
                        ):(

                            reviews.map((review)=>(
                                <tr key={review.id}
                                    className="border-b border-gray-300">

                                    <td className="p-4">
                                        <p className="font-semibold ">{review.productName}</p>
                                        <p className="text-xs text-gray-500">ID: {review.productId}</p>
                                    </td>

                                    <td className="p-4">
                                        <div className="font-medium">
                                            {review.userName}
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {renderStars(review.rating)}
                                            <span className="text-sm text-gray-500">
                                                ({review.rating}/5)
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <p className="max-w-xs truncate">{review.comment}</p>
                                    </td>

                                    <td className="p-4">
                                        <div>
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    onDelete(review.id)
                                                }
                                                className="bg-red-700 hover:bg-red-900 text-white p-2 rounded-lg flex justify-center items-center gap-2"
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )

                    )}
                </tbody>

            </table>

        </div>
      
    </div>
  )
}

export default ReviewTable
