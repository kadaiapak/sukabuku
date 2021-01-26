import React from 'react'
import { useSelector } from 'react-redux'
const Coba = () => {
    const cart = useSelector(state => state.cart)
    const { paymentMethod } = cart
    return (
        <div>
          <h1>{paymentMethod}</h1>
        </div>
    )
}

export default Coba
