import { FiAlertTriangle } from "react-icons/fi"

const DeleteUserModal = ({user, onClose, onDelete}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

        <div className="bg-white w-112.5 rounded-2xl shadow-2xl overflow-hidden p-4">

            <div className="p-6 border-b border-dashed">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                        <FiAlertTriangle
                            size={28}
                            className="text-red-700" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Delete User</h2>
                        <p className="text-gray-500 mt-1">This action cannot be undone</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <p className="text-gray-700 leading-7">
                    Are you sure you want to delete
                    <span>{" "}{user.firstName}{" "}{user.lastName}</span> ?
                </p>

                <div className="mt-6 border rounded-xl p-4 bg-gray-50 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-700">User ID :</span>
                        <span className="font-medium">#{user.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Email :</span>
                        <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Role :</span>
                        <span className="font-medium">{user.role}</span>
                    </div>
                </div>

            </div>

            <div className="border-t border-dashed p-6 flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl border hover:bg-gray-200 transition"
                >Cancel</button>
                <button
                    onClick={onDelete}
                    className="px-6 py-3 rounded-xl bg-red-700 text-white hover:bg-red-900 transition"
                >Delete User</button>
                

            </div>

        </div>
      
    </div>
  )
}

export default DeleteUserModal
