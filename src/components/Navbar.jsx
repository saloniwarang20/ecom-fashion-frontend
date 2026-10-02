import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import icon from "../assets/icons/icons";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/ui/uiSlice";
import { Menu, X } from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  const items = useSelector((state) => state.cart.items || []);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const dispatch = useDispatch();

  const handleMobileNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className=" mt-2 bg-white px-4 py-2 rounded-lg shadow-md relative">

    
      <div className="hidden md:flex justify-around items-center">

        {/* Logo */}
        <div className="font-playwrite text-2xl font-black ">
          <Link to="/">
            aria
          </Link>
        </div>

        {/* Categories */}
        <div className="flex gap-8">
          <button
            className="cursor-pointer font-bold text-sm sm:text-xs"
            onClick={() => navigate("/category/men")}
          >
            MEN
          </button>

          <button
            className="cursor-pointer font-bold text-sm md:text-xs"
            onClick={() => navigate("/category/women")}
          >
            WOMEN
          </button>

          <button
            className="cursor-pointer font-bold text-sm md:text-xs"
            onClick={() => navigate("/category/accessories")}
          >
            ACCESSORIES
          </button>

          <button
            className="cursor-pointer font-bold text-sm md:text-xs"
            onClick={() => navigate("/category/best-sellers")}
          >
            BEST SELLERS
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">

          <button
            className="cursor-pointer"
            onClick={() => navigate("/search")}
          >
            <img src={icon.search}/>
          </button>

          <button
            className="cursor-pointer"
            onClick={handleProfileClick}
          >
            <img src={icon.profile} />
          </button>

          <button
            className="cursor-pointer"
            onClick={() => dispatch(toggleWishlist())}
          >
            <img src={icon.wishlist} />
          </button>

          <button
            className="cursor-pointer relative"
            onClick={() => navigate("/cart")}
          >
            <img src={icon.cart} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex justify-center items-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

        </div>
      </div>


      <div className="flex md:hidden items-center justify-between">

        {/* Hamburger */}
        <button
          className="cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={23} strokeWidth={2} />
          ) : (
            <Menu size={23} strokeWidth={2} />
          )}
        </button>


        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 font-playwrite text-2xl font-black pb-2">
          <Link to="/">
            aria
          </Link>
        </div>


        {/* Right Icons */}
        <div className="flex items-center gap-5 ml-auto">

          {/* Search */}
          <button
            className="cursor-pointer"
            onClick={() => navigate("/search")}
          >
            <img src={icon.search} />
          </button>

          <button
            className="cursor-pointer relative"
            onClick={() => handleMobileNavigate("/cart")}
          >
            <img src={icon.cart} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex justify-center items-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg z-50 px-6 py-5">

          <div className="flex flex-col gap-5">

            <button
              className="text-left font-bold text-sm"
              onClick={() => handleMobileNavigate("/category/men")}
            >
              MEN
            </button>

            <button
              className="text-left font-bold text-sm"
              onClick={() => handleMobileNavigate("/category/women")}
            >
              WOMEN
            </button>

            <button
              className="text-left font-bold text-sm"
              onClick={() => handleMobileNavigate("/category/accessories")}
            >
              ACCESSORIES
            </button>

            <button
              className="text-left font-bold text-sm"
              onClick={() => handleMobileNavigate("/category/best-sellers")}
            >
              BEST SELLERS
            </button>

            <div className="border-t border-zinc-200 pt-4 flex gap-6">

              {/* Wishlist */}
              <button
                className="cursor-pointer"
                onClick={() => {
                  dispatch(toggleWishlist());
                  setMobileMenuOpen(false);
                }}
              >
                <img src={icon.wishlist} />
              </button>

              <button
                className="cursor-pointer"
                onClick={handleProfileClick}
              >
                <img src={icon.profile} />
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
