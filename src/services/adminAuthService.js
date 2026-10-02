import api from './api';

export const adminLogin = async (email, password) => {
    const response = await api.post("/auth/login",{
        email,
        password
    })

    const data = response.data;

    if(data.role != "ADMIN"){
        throw new Error("You are not an admin");
    }

    return data;
};

export const adminLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role")
}