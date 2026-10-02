import { createContext, useEffect, useState } from "react";
import userService from "../services/userService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem("token")

        if(!token){
            setLoading(false)
            return;
        }

        try{
            const res = await userService.getCurrentUser();
            setUser(res.data)
        }catch(err){
            console.error("Authentication failed", err);
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setUser(null);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCurrentUser();
    },[])

    const login = async (loginResponse) => {
        localStorage.setItem("token", loginResponse.token);
        localStorage.setItem("role",loginResponse.role);

        await fetchCurrentUser();
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role")

        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser)
    }


    return (
        <AuthContext.Provider value={{user, login, logout, loading, isAuthenticated, fetchCurrentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
}