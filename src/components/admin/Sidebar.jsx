import { FiGrid,FiTag,FiLayers,FiBox,FiShoppingCart,FiUsers,FiLogOut, FiMessageSquare} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { adminLogout } from "../../services/adminAuthService";
import { MdOutlineInventory2 } from "react-icons/md";

const Sidebar = () => {

  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FiGrid />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FiTag />,
    },
    {
      name: "Sub Categories",
      path: "/admin/subcategories",
      icon: <FiLayers />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FiBox />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FiShoppingCart />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FiUsers />,
    },
    {
      name: "Reviews",
      path:"/admin/reviews",
      icon: <FiMessageSquare/>
    },
    {
      name: "Inventory",
      path:"/admin/inventory",
      icon: <MdOutlineInventory2/>
    }
  ];

  const handleLogout = async () => {
    try{
      await adminLogout();
      navigate("/admin")
    }catch(err){
      alert(err.message);
    }
  }

  return (
    <div className="w-72 max-w-[18rem] h-full bg-zinc-900 text-white flex flex-col top-0 shrink-0 overflow-hidden">

      {/* Logo */}
      <div className="border-b border-zinc-800 p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white text-black flex items-center justify-center text-xl font-bold">
            A
          </div>

          <div>
            <h1 className="text-2xl font-playwrite">
              aria
            </h1>

            <p className="text-xs text-zinc-400">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-zinc-800 p-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;