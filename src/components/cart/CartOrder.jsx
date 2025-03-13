import axios from 'axios'
import React from 'react'



const CartOrder = () => {

    const handleIncrease = async(id)=>{
        console.log(id)
        const productId = id
        const userId = localStorage.getItem("USERID")
        console.log(`Bearer ${localStorage.getItem("USERID")}`)
        try {
            const res = await axios.post(`http://localhost:8080/api/customer/${userId}/add/${id}`,null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                  }
              });
              console.log(res)
        } catch (error) {
            
        }
    }
  return (
    <div>
        <button onClick={()=>handleIncrease(5)}>+</button>
    </div>
  )
}

export default CartOrder