import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminProtectedRoute = ({children}) => {
    const {loading, user} = useAuth();
    
        if(loading){
            return <div>Loading...</div>
        }
    
        if(!user){
            return <Navigate to="/admin" replace />
        }
    
        if(user.role !== "ADMIN"){
            return <Navigate to= "/" replace/>
        }
  return children
}

export default AdminProtectedRoute
