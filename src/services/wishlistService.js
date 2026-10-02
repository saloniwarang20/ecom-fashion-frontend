import api from './api'

const wishlistService = {
    getWishlist(){
        return api.get("/wishlist")
    },
    addItemToWishlist(item){
        return api.post("/wishlist/items",item)
    },
    removeItemWishlist(id){
        return api.delete(`/wishlist/items/${id}`)
    },
    clearWishlist(){
        return api.delete("/wishlist/clear")
    }
}

export default wishlistService;