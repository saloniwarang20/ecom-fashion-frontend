import { useEffect, useMemo, useState } from "react"
import { FiSearch } from "react-icons/fi"
import UserStat from "../components/admin/user/UserStat"
import UserFilter from "../components/admin/user/UserFilter"
import UserTable from "../components/admin/user/UserTable"
import DeleteUserModal from "../components/admin/user/DeleteUserModal"
import userService from "../services/userService"

const Users = () => {

  const [users, setUsers] = useState([])

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")

  const [roleFilter, setRoleFilter] = useState("ALL")
  const [deleteUser, setDeleteUser] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    try{
      const response = await userService.getAllUsers();
      setUsers(response.data)
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  const filteredUsers = useMemo(()=>{
    return users.filter((user)=>{
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      const matchesSearch = fullName.includes(search.toLowerCase()) || 
        user.email.toLowerCase().includes(search.toLowerCase()) || 
        user.phoneNumber.includes(search);
      
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      return matchesSearch && matchesRole
    })
  },[users, search, roleFilter])

  const handleDelete = async () => {
    if(!deleteUser) return;
    try{
      await userService.deleteUser(deleteUser.id);
      setDeleteUser(null)
      fetchUsers()
    }catch(err){
      console.error(err);
      alert("Failed to delete user")
    }
  }

  return (
    <div className="p-6 min-h-screen">

      <div className="mb-10">
        <h1 className="font-playwrite text-xl font-bold">Users</h1>
        <p className="text-gray-500 mt-2">Manage all users</p>
      </div>

      <UserStat users={users}/>

      <div className="flex gap-4 mt-8 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-4 text-gray-400"/>
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
            />
        </div>

        <UserFilter
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          onReset={()=>{
            setSearch("")
            setRoleFilter("ALL")
          }} />
      </div>

      <UserTable 
        users={filteredUsers}
        loading={loading}
        onDelete={(user)=> setDeleteUser(user)} />

      {deleteUser && 
        <DeleteUserModal 
          user={deleteUser}
          onClose={()=> setDeleteUser(null)}
          onDelete={handleDelete}/>
      }
    </div>
  )
}

export default Users
