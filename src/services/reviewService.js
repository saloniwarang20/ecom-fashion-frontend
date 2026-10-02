import api from './api';

const reviewService = {
    addReview(productId, review){
        return api.post(`/reviews/product/${productId}`,review)
    },
    getProductReview(productId){
        return api.get(`/reviews/product/${productId}`)
    },
    deleteReview(id){
        return api.delete(`/reviews/${id}`)
    },
    getAllReviews(){
        return api.get("/reviews")
    },
    getReview(id){
        return api.get(`/reviews/${id}`)
    }
}

export default reviewService;