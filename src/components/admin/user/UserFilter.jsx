import { FiChevronDown } from "react-icons/fi"

const UserFilter = ({roleFilter, setRoleFilter, onReset}) => {
  return (
    <div className="flex gap-4">
      <div className="relative border rounded-2xl px-4 py-3 w-64 focus:ring-2 focus:ring-zinc-900">

        <select value={roleFilter}
            onChange={(e)=>
                setRoleFilter(e.target.value)
            } className="appearance-none w-56 outline-none">
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">Customer</option>
        </select>

        <FiChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        size={20}
        />

      </div>
      <button
        onClick={onReset}
        className="px-5 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition"
      >Reset</button>
    </div>
  )
}

export default UserFilter
