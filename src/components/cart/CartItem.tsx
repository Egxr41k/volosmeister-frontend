import React from "react";
import {ICartItem} from "../../context/CartContext";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";

export const CartItem = (cartItem: ICartItem) => {
    const { removeFromCart } = useCart()
    const products = useProducts()

    const item = products.find(i => i.id === cartItem.id)
    if (!item) return null
    else return <div className='flex items-center mb-4'
                key={`cart item ${item.name}`}>
        <img src={item.imageSrc}
             alt={item.name}
             width='55'
             height='55'
             className='mr-3' />
        <div>
            <div>
                {item.name}
            </div>
            <div>
                {`${cartItem.quantity} x $${item.newPrice.toLocaleString()}`}
            </div>
            <button className='text-red-600 bg-transparent border-0'
                    onClick={() => removeFromCart(item.id)}>
                Удалить
            </button>
        </div>
    </div>
}