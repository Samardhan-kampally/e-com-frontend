import React from 'react'
import { useAuth } from '../services/auth-service/AuthContext'

const User = () => {

    if(!localStorage.getItem("TOKEN") || localStorage.getItem("USERROLE")==="ADMIN"){

        return(
            <div>
                <h1>Access Denied</h1>
            </div>
        )
    }

  return (
    <div>User</div>
  )
}

export default User