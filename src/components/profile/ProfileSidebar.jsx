import {
  FiLogOut,
  FiMapPin,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const menuItems = [
  {
    id: "profile",
    title: "Profile",
    icon: FiUser,
  },
  {
    id: "orders",
    title: "Orders",
    icon: FiShoppingBag,
  },
  {
    id: "address",
    title: "Address",
    icon: FiMapPin,
  },
  {
    id: "logout",
    title: "Logout",
    icon: FiLogOut,
  },
];

const ProfileSidebar = ({ user, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logout();
    navigate("/");
  };

  return (
    <div className="w-full border-b lg:border-b-0 lg:border-r border-zinc-300 p-5 sm:p-7 lg:p-8">

      {/* Avatar */}
      <div className="flex flex-col items-center">

        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-zinc-100 flex items-center justify-center">
          <FiUser
            size={window.innerWidth < 640 ? 34 : 46}
            className="text-zinc-700"
          />
        </div>

        <h2 className="mt-4 sm:mt-5 text-sm sm:text-md font-semibold font-playwrite text-center">
          {user?.firstName} {user?.lastName}
        </h2>

        <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2 text-center break-all">
          {user?.email}
        </p>

      </div>

      <hr className="my-4 border-zinc-200" />

      {/* Navigation */}
      <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-1">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "logout") {
                  handleLogout();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`w-full flex items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm cursor-pointer transition-all duration-200
                ${
                  active
                    ? "bg-zinc-200 font-semibold"
                    : "hover:bg-zinc-50"
                }
              `}
            >
              <Icon className="text-lg sm:text-xl shrink-0" />

              <span>{item.title}</span>
            </button>
          );
        })}

      </nav>

    </div>
  );
};

export default ProfileSidebar;