import api from './api'

const orderService = {
    placeOrder(order){
        return api.post("/orders",order)
    },
    getMyOrders(){
        return api.get("/orders")
    },
    getOrder(id){
        return api.get(`/orders/${id}`)
    },
    cancelOrder(id){
        return api.put(`orders/${id}/cancel`)
    },
    getAllOrders(){
        return api.get("/orders/admin")
    },
    updateOrderStatus(id,status){
        return api.put(`/orders/admin/${id}?status=${status}`)
    },
    getAdminOrder(id){
        return api.get(`/orders/admin/${id}`)
    }
}

export default orderService;