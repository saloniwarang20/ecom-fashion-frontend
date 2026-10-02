import { Outlet, ScrollRestoration } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import WishlistPanel from "../components/wishlist/WishlistPanel"
import { useDispatch } from "react-redux"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"
import { fetchCart } from "../features/cart/cartSlice"

const MainLayout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <div className="sticky top-0 z-50 px-8 py-4">
        <Navbar/>
      </div>
        <Outlet/>
        <WishlistPanel />
        <Footer/>
    </>
  )
}

export default MainLayout
