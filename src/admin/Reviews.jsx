import { useEffect, useState } from "react"
import { FiChevronDown, FiSearch } from "react-icons/fi"
import ReviewTable from "../components/admin/review/ReviewTable"
import reviewService from "../services/reviewService"

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [ filteredReview , setFilteredReview] = useState([])

    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [ratingFilter, setRatingFilter] = useState("ALL")

    const fetchReviews = async () => {
        setLoading(true);

        try{
            const response = await reviewService.getAllReviews();
            setReviews(response.data);
            setFilteredReview(response.data)
        }catch(err){
            console.error(err.message);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchReviews();
    },[])

    useEffect(()=>{
        let data = [...reviews]
        if(search.trim()){
            const keyword = search.toLowerCase();

            data = data.filter((review)=>
                review.productName?.toLowerCase().includes(keyword) || 
                review.userName?.toLowerCase().includes(keyword) || 
                review.comment?.toLowerCase().includes(keyword)  
            )
        }
        if(ratingFilter !== "ALL"){
            data = data.filter((review) => 
                review.rating === Number(ratingFilter))
        }
        setFilteredReview(data);
    },[search, ratingFilter, reviews])

    const handleDelete = async (id) => {
        const confirm = window.confirm("Delete this review?");
        if(!confirm) return;

        try{
            await reviewService.deleteReview(id);
            fetchReviews()
        }catch(err){
            console.error(err.message)
            alert("Failed to delete review")
        }
    }

  return (
    <div className="p-6 min-h-screen">

        <div className="mb-10">
            <h1 className="font-playwrite text-xl font-bold">Reviews</h1>
            <p className="text-gray-500 mt-2">Manage all reviews</p>
        </div>

        <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-4 text-gray-400"/>
                <input
                    type="text"
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
                    />
            </div>

            <div className="relative border rounded-2xl px-4 py-3 w-64 focus:ring-2 focus:ring-zinc-900">
                <select value={ratingFilter}
                    onChange={(e)=>{
                        setRatingFilter(e.target.value)
                    }}
                    className="appearance-none w-56 outline-none">
                    <option value="ALL">All Ratings</option>
                    <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                    <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                    <option value="3">⭐⭐⭐ (3 stars)</option>
                    <option value="2">⭐⭐ (2 stars)</option>
                    <option value="1">⭐ (1 stars)</option>
                </select>

                <FiChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
                />
            </div>

            <button onClick={()=>{
                setSearch("")
                setRatingFilter("ALL")
            }}
            className="px-5 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700">
                Reset
            </button>
        </div>

        <ReviewTable
            reviews={filteredReview}
            loading={loading}
            onDelete={handleDelete} />
      
    </div>
  )
}

export default Reviews
