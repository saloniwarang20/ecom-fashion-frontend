import api from './api'

const addressService = {
    addAddress(address){
        return api.post("/addresses",address)
    },
    updateAddress(id, address){
        return api.put(`/addresses/${id}`,address)
    },
    deleteAddress(id){
        return api.delete(`/addresses/${id}`)
    },
    getMyAddresses(){
        return api.get("/addresses")
    },
    getAddress(id){
        return api.get(`/addresses/${id}`)
    },
    setDefaultAddress(id){
        return api.put(`/addresses/${id}/default`)
    }
}

export default addressService;