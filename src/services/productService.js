import api from './api';

const productService = {
    createProduct(product){
        return api.post("/products",product)
    },
    updateProduct(id,product){
        return api.put(`/products/${id}`,product)
    },
    deleteProduct(id){
        return api.delete(`/products/${id}`)
    },
    getAllProduct(){
        return api.get("/products")
    },
    getProduct(id){
        return api.get(`/products/${id}`)
    },
    getProductsByCategory(subcategoryid){
        return api.get(`/products/subcategory/${subcategoryid}`)
    },
    searchProduct(keyword){
        return api.get("/products/search",{
            params: {
                keyword,
            }
        })
    },
    getProductByBrand(brand){
        return api.get("/products/brand",brand)
    },
    filterProduct(filters){
        return api.get("/products/filter",{
            params:{
                subCategoryId: filters.subCategoryId,
                brand: filters.brand,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                colors: filters.colors[0],
                sizes: filters.sizes[0]
            }
        })
    },
    getRecommendedProduct(){
        return api.get("/products/recommended")
    },
    getBestSellers(){
        return api.get("/products/best-sellers")
    }
}

export default productService;