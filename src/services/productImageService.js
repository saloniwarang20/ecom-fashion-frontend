import api from "./api"

const productImageService = {
    addImage(productId, image){
        return api.post(`/product-images/product/${productId}`,image)
    },
    updateImage(id, image){
        return api.put(`/product-images/${id}`,image)
    },
    deleteImage(id){
        return api.delete(`/product-images/${id}`)
    },
    getAllImages(productId){
        return api.get(`/product-images/product/${productId}`)
    }
}

export default productImageService