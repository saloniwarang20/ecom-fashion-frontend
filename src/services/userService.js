import api from './api'

const userService = {
    getCurrentUser(){
        return api.get("/users/me")
    },
    updateProfile(user){
        return api.put("/users/me",user)
    },
    getAllUsers(){
        return api.get("/users")
    },
    deleteUser(id){
        return api.delete(`/users/${id}`)
    }
}

export default userService;