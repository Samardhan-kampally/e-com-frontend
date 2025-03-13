import React from 'react'
import Register from '../components/register/Register'
import App from '../App'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/login/Login'
import CartService from '../components/cart/CartService'
import Admin from '../admin/Admin'
import User from '../user/User'
import PostCategory from '../admin/PostCategory'
import AdminDashboard from '../admin/AdminDashboard'
import PostProduct from '../admin/PostProduct'
import ProductList from '../admin/ProductList'
import UpdateProduct from '../admin/UpdateProduct'
import Customer from '../user/Customer'
import Cart from '../components/cart/Cart'
import PlaceOrder from '../user/PlaceOrder'


const Router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children :[
          // {path :"/",element : <Home/>},
          // {path:"/search",element: <Search/>},
          // {path:"/shop", element :<ShopPage/>},
          // {path:"/shop/:id", element:<SingleProduct/>},
          {path:"/admin", element:<Admin/>,children:[
            {path:"dashboard", element:<AdminDashboard/>},
            {path:"category", element:<PostCategory/>},
            {path:"product", element:<PostProduct/>},
            {path:"products", element:<ProductList/>},
            {path:"product/:id", element:<UpdateProduct/>},
            
          ]},
          {path:"/user", element:<User/>,children:[
            {path:"dashboard",element:<Customer />},
            {path:"cart",element:<Cart/>},
            {path:"placeOrder",element:<PlaceOrder />}
          ]}
                    
      ]
    },
    {
      path: "/login", element: <Login />
    },
    {
      path: "/register", element: <Register />
    }
  ]
)

export default Router