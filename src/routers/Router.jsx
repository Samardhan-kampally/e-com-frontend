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


const Router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children :[
          // {path :"/",element : <Home/>},
          // {path:"/categor",element: <PostCategory/>},
          // {path:"/search",element: <Search/>},
          // {path:"/shop", element :<ShopPage/>},
          // {path:"/shop/:id", element:<SingleProduct/>},
          {path:"/admin/dashboard", element:<AdminDashboard/>,children:[
            {path:"category", element:<PostCategory/>}
          ]},
          {path:"/user/dashboard", element:<User/>}
                    
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