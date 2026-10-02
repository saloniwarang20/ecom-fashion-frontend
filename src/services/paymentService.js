import api from './api'

const paymentService = {
    makePayment(payment){
        return api.post("/payments",payment)
    },
    getPayment(id){
        return api.get(`/payments/${id}`)
    }
}

export default paymentService;