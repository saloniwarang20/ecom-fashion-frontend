import api from './api'

const productVariantService = {
    addVariant(productId, variant){
        return api.post(`/product-variants/product/${productId}`,variant)
    },
    updateVariant(id, variant){
        return api.put(`/product-variants/${id}`,variant)
    },
    deleteVariant(id){
        return api.delete(`/product-variants/${id}`)
    },
    getVariants(productId){
        return api.get(`/product-variants/product/${productId}`)
    },
    getAllVariants(){
        return api.get("/product-variants")
    }
}

export default productVariantService;