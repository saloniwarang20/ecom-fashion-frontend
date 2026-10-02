import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import WishlistPanel from "../components/wishlist/WishlistPanel"
import { useDispatch } from "react-redux"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"
import { fetchCart } from "../features/cart/cartSlice"

const HomeLayout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);
  
  return (
    <>
        <div className="absolute inset-x-0 top-0 z-50 px-8 py-6">
            <Navbar />
        </div>
        <Outlet />
        <WishlistPanel/>
        <Footer />
    </>
  )
}

export default HomeLayout
