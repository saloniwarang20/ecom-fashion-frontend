import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserProtectedRoute = () => {
    const {loading, user} = useAuth();

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/auth" replace />
    }

    if(user.role !== "USER"){
        return <Navigate to= "/" replace/>
    }
  return <Outlet/>
}

export default UserProtectedRoute;