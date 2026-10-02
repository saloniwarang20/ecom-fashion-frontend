import api from "./api";

const categoryService = {
    createCategory(category){
        return api.post("/categories",category)
    },
    getAllCategories(){
        return api.get("/categories");
    },
    getCategory(id){
        return api.get(`/categories/${id}`)
    },
    updateCategory(id, category){
        return api.put(`/categories/${id}`,category)
    },
    deleteCategory(id){
        return api.delete(`/categories/${id}`)
    },
    getCategoryByName(name){
        return api.get(`/categories/name/${name}`)
    }
}

export default categoryService;