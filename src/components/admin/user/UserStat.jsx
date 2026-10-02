const UserStat = ({users=[]}) => {

    const totalUsers = users.length;

    const adminCount = users.filter(
        (user) => user.role === "ADMIN"
    ).length

    const customerCount = users.filter(
        (user) => user.role === "USER"
    ).length

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="border rounded-2xl p-4 hover:shadow-xl transition bg-zinc-900 text-white">
            <p className="text-gray-400 text-sm font-playwrite">Total Users</p>
            <h2 className="text-2xl font-bold mt-3">{totalUsers}</h2>
        </div>

        <div className="border rounded-2xl p-4 hover:shadow-xl transition bg-zinc-900 text-white">
            <p className="text-gray-400 text-sm font-playwrite">Admins</p>
            <h2 className="text-2xl font-bold mt-3 ">{adminCount}</h2>
        </div>

        <div className="border rounded-2xl p-4 hover:shadow-xl transition bg-zinc-900 text-white">
            <p className="text-gray-400 text-sm font-playwrite">Customers</p>
            <h2 className="text-2xl font-bold mt-3">{customerCount}</h2>
        </div>
      
    </div>
  )
}

export default UserStat
