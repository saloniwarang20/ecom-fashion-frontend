import api from './api';

const authService = {
    register(data){
        return api.post("/auth/register",data);
    },

    login(data){
        return api.post("/auth/login",data);
    }
}

export default authService;