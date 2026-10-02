import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AdminLayout from "../layouts/AdminLayout"

import Home from "../pages/Home"
import Cart from "../pages/Cart"
import Search from "../pages/Search"
import Auth from "../pages/Auth"
import Profile from "../pages/Profile"
import Checkout from "../pages/Checkout"
import Product from "../pages/Product"
import ProductDetail from "../pages/ProductDetail"

import NotFound from "../pages/NotFound"

import Dashboard from "../admin/Dashboard"
import Categories from "../admin/Categories"
import SubCategory from "../admin/SubCategory"
import Products from "../admin/Products"
import Orders from "../admin/Orders"
import Users from "../admin/Users"
import Login from "../admin/Login"
import Reviews from "../admin/Reviews"
import AdminProtectedRoute from "./AdminProtectedRoute"
import Inventory from "../admin/Inventory"
import UserProtectedRoute from "./UserProtectedRoute"
import HomeLayout from "../layouts/HomeLayout"

const AppRoutes = () => {
  return (
    <Routes>

        <Route element={<HomeLayout/>}>
          <Route path="/" element={<Home/>} />
        </Route>


        <Route element={<MainLayout/>}>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/category/:categoryName" element={<Product/>}/>
            <Route path="/product/:id" element={<ProductDetail/>}/>

            <Route element={<UserProtectedRoute />}>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Route>
        </Route>
        <Route path="/checkout" element={<Checkout/>}/>

        <Route path="/admin">
            <Route index element={<Login/>}/>

            <Route element={
              <AdminProtectedRoute>
                <AdminLayout/>
              </AdminProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="categories" element={<Categories/>}/>
              <Route path="subcategories" element={<SubCategory/>}/>
              <Route path="products" element={<Products/>}/>
              <Route path="orders" element={<Orders/>}/>
              <Route path="users" element={<Users/>}/>
              <Route path="reviews" element={<Reviews/>}/>
              <Route path="inventory" element={<Inventory/>}/>
            </Route>
            
        </Route>

        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default AppRoutes
