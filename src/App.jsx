import { useDispatch } from 'react-redux'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react';
import { fetchWishlist } from "./features/wishlist/wishlistSlice"
import ScrollToTop from './components/ScrollToTop';

function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchWishlist());
  },[dispatch])

  return (
    <>
      <ScrollToTop/>
      <AppRoutes/>
    </>
  )
}

export default App
