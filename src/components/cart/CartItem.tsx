import {emptyProduct, IProduct} from "../../types/IProduct";
import React from "react";
import {ICartItem, useShoppingCart} from "../../context/ShoppingCartContext";
import {storeItems} from "../../App";

export const CartItem = (cartItem: ICartItem) => {

    const { removeFromCart } = useShoppingCart()

    const item = storeItems.find(i => i.id === cartItem.id)
    if (item == null) return null
    return <div className='flex items-center mb-4'
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