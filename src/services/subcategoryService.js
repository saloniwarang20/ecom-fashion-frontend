import api from './api';

const subcategoryService = {
    createSubcategory(subCategory, categoryId){
        return api.post(`/subcategories/categories/${categoryId}`,subCategory)
    },
    getAllSubcategories(){
        return api.get("/subcategories")
    },
    getSubcategoryByCategory(categoryId){
        return api.get(`/subcategories/category/${categoryId}`)
    },
    getSubcategory(id){
        return api.get(`/subcategories/${id}`)
    },
    updateSubcategory(id, categoryId, subCategory){
        return api.put(`/subcategories/${id}/categories/${categoryId}`,subCategory)
    },
    deleteSubcategory(id){
        return api.delete(`/subcategories/${id}`)
    }
}

export default subcategoryService;