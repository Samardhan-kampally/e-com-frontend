import React from 'react'
import { useAuth } from '../services/auth-service/AuthContext'
import { Link, Outlet } from 'react-router-dom'

const User = () => {

    if(!localStorage.getItem("TOKEN") || localStorage.getItem("USERROLE")==="ADMIN"){

        return(
            <div>
                <h1>Access Denied</h1>
            </div>
        )
    }

  return (
    <>
    {/* <div>User</div> */}
    <Link to="/user/dashboard">Dashboard</Link>
    <Link to="/user/cart">Cart</Link>
    <Outlet />
    </>
  )
}

export default User