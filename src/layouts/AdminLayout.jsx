import { Outlet } from "react-router-dom"
import Sidebar from "../components/admin/Sidebar"

const AdminLayout = () => {
  return (
    <div className="flex shrink-0 h-screen overflow-hidden">
        <Sidebar/>
        <div className="flex-1 overflow-y-auto h-full">
            <Outlet/>
        </div>
      
    </div>
  )
}

export default AdminLayout
