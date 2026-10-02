import { FiTrash2 } from "react-icons/fi"

const roleColor = (role) => {
    switch(role){
        case "ADMIN":
            return "bg-blue-700 text-white";
        case "USER":
            return "bg-green-700 text-white";
        default:
            return "bg-gray-700 text-white";
    }
}
const UserTable = ({users=[], loading, onDelete}) => {
  return (
    <div className="overflow-hidden">

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead className="border-b-2 border-gray-700">
                    <tr>
                        <th className="text-left p-4 font-playwrite">User</th>
                        <th className="text-left p-4 font-playwrite">Email</th>
                        <th className="text-left p-4 font-playwrite">Phone</th>
                        <th className="text-left p-4 font-playwrite">Role</th>
                        <th className="text-center p-4 font-playwrite">Action</th>
                    </tr>
                </thead>

                <tbody>

                    {loading ? (
                        <tr>
                            <td colSpan={5} className="py-12 text-center">
                                <div className="flex justify-center items-center gap-3">
                                    <div className="w-7 h-7 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                                    <span className="font-medium text-gray-600">
                                    Loading Users...
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        users.length === 0 ? (
                            <tr>
                                <td colSpan={5}
                                className="py-14 text-center text-gray-200">
                                    <p className="text-lg font-semibold">No Users Found</p>
                                    <p className="mt-2">Try changing your search or filter.</p>
                                </td>
                            </tr>
                        ) : (

                            users.map((user)=>(
                                <tr key={user.id} className="border-b border-gray-300">

                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-semibold text-lg">
                                                {user.firstName.charAt(0)}
                                                {user.lastName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-zinc-900">{user.firstName} {user.lastName}</p>
                                                <p className="text-xs text-gray-500">ID: {user.id}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <p className="text-gray-700">{user.email}</p>
                                    </td>

                                    <td className="p-4">{user.phoneNumber}</td>

                                    <td className="p-4">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${roleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            <button onClick={()=>onDelete(user)}
                                                className="bg-red-700 hover:bg-red-900 transition text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                                <FiTrash2/>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                    )}
                </tbody>

            </table>

        </div>
      
    </div>
  )
}

export default UserTable
