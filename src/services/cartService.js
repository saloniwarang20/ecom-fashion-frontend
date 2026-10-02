import api from './api'

const cartService = {
    getCart(){
        return api.get("/cart")
    },
    addToCart(item){
        return api.post("/cart/items",item)
    },
    updateQuantity(itemId,quantity){
        return api.put(`/cart/items/${itemId}`,{quantity})
    },
    removeFromCart(itemId){
        return api.delete(`/cart/items/${itemId}`)
    },
    clearCart(){
        return api.delete("/cart/clear")
    }
}

export default cartService;