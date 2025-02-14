import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'
import { Routes,Route } from "react-router-dom"
import Pagenotfound from './Pages/Pagenotfound'
import Signup from './Pages/Signup'
import Dashboard from './Pages/User/Dashboard'
import PrivateRoute from './Components/Routes/PrivateRoute'
import AdminRoute from './Components/Routes/AdminRoute'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateCategory from './Pages/Admin/CreateCategory'
import CreateProduct from './Pages/Admin/CreateProduct'
import User from './Pages/Admin/User'
import UserOrders from './Pages/User/UserOrders'
import Products from './Pages/Admin/Products'
import UpdateProduct from './Pages/Admin/UpdateProduct'
import Search from './Pages/Search'
import Productdetails from './Pages/Productdetails'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product/:name' element={<Productdetails/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/orders' element={<UserOrders/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-products' element={<CreateProduct/>}/>
      <Route path='admin/product/:name' element={<UpdateProduct/>}/>
      <Route path='admin/products' element={<Products/>}/>
      <Route path='admin/users' element={<User/>}/>
      </Route>
      <Route path='/contact-us' element={<Contact/>} />
      <Route path='/log-in' element={<Login/>} />  
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/*' element={<Pagenotfound/>} />
    </Routes>
    </>
  )
}

export default App
